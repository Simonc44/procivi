import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const logStep = (step: string, details?: any) => {
  console.log(`[LINKEDIN-AUTH] ${step}${details ? ` - ${JSON.stringify(details)}` : ''}`);
};

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const checkRateLimit = (userId: string): boolean => {
  const now = Date.now();
  const key = `linkedin_auth:${userId}`;
  const current = rateLimitStore.get(key);
  
  // 5 requests per minute
  const limit = 5;
  const windowMs = 60 * 1000;
  
  if (!current || now > current.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (current.count >= limit) {
    return false;
  }
  
  current.count++;
  return true;
};

const createSecureState = (userId: string): string => {
  // In production, use a proper HMAC with secret key
  const timestamp = Date.now().toString();
  return btoa(`${userId}:${timestamp}`);
};

const verifyState = (state: string, userId: string): boolean => {
  try {
    const decoded = atob(state);
    const [stateUserId, timestamp] = decoded.split(':');
    
    // Verify user ID matches and state is not older than 10 minutes
    const isValidUser = stateUserId === userId;
    const isValidTime = (Date.now() - parseInt(timestamp)) < 10 * 60 * 1000;
    
    return isValidUser && isValidTime;
  } catch {
    return false;
  }
};

const auditLog = async (supabaseClient: any, userId: string, action: string, ip: string, userAgent: string) => {
  try {
    await supabaseClient.from('security_audit_logs').insert({
      user_id: userId,
      action: action,
      resource: 'linkedin_auth',
      ip_address: ip,
      user_agent: userAgent
    });
  } catch (error) {
    logStep('Audit log failed', { error: error.message });
  }
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Starting LinkedIn auth flow");

    // Use service role for all database operations
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Auth error: ${userError.message}`);
    const user = userData.user;
    if (!user) throw new Error("User not authenticated");

    logStep("User authenticated", { userId: user.id });

    // Check rate limit
    if (!checkRateLimit(user.id)) {
      throw new Error("Rate limit exceeded. Please try again later.");
    }

    // Get IP and User Agent for audit logging
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';

    const requestBody = await req.json();
    const { action, code, state } = requestBody;

    if (action === 'get_auth_url') {
      const clientId = Deno.env.get('LINKEDIN_CLIENT_ID');
      if (!clientId) throw new Error('LinkedIn client ID not configured');

      const origin = req.headers.get('origin');
      if (!origin) throw new Error('Origin header required');

      const redirectUri = `${origin}/linkedin-callback`;
      const scope = 'profile email';
      const secureState = createSecureState(user.id);

      const authUrl = `https://www.linkedin.com/oauth/v2/authorization?` +
        `response_type=code&` +
        `client_id=${clientId}&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        `scope=${encodeURIComponent(scope)}&` +
        `state=${encodeURIComponent(secureState)}`;

      logStep("Generated LinkedIn auth URL");
      await auditLog(supabaseClient, user.id, 'linkedin_auth_url_generated', clientIP, userAgent);

      return new Response(JSON.stringify({ authUrl }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    if (action === 'exchange_code') {
      const clientId = Deno.env.get('LINKEDIN_CLIENT_ID');
      const clientSecret = Deno.env.get('LINKEDIN_CLIENT_SECRET');
      
      if (!clientId || !clientSecret) {
        throw new Error('LinkedIn credentials not configured');
      }

      // Verify state parameter if provided
      if (state && !verifyState(state, user.id)) {
        throw new Error('Invalid or expired state parameter');
      }

      const origin = req.headers.get('origin');
      if (!origin) throw new Error('Origin header required');

      const redirectUri = `${origin}/linkedin-callback`;

      logStep("Exchanging code for access token");

      // Exchange authorization code for access token
      const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri
        })
      });

      if (!tokenResponse.ok) {
        throw new Error('Failed to exchange code for token');
      }

      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;

      logStep("Got access token");

      // Fetch LinkedIn profile with limited scope
      const profileResponse = await fetch('https://api.linkedin.com/v2/people/~?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))', {
        headers: { 
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json'
        }
      });

      if (!profileResponse.ok) {
        const errorText = await profileResponse.text();
        logStep("Profile fetch failed", { status: profileResponse.status, error: errorText });
        throw new Error('Failed to fetch LinkedIn profile');
      }

      const profileData = await profileResponse.json();
      logStep("Fetched LinkedIn profile", { profileId: profileData.id });

      // Sanitize profile data before storing
      const sanitizedProfileData = {
        id: profileData.id,
        firstName: profileData.firstName?.localized?.en_US || '',
        lastName: profileData.lastName?.localized?.en_US || '',
        profilePicture: profileData.profilePicture?.displayImage || null
      };

      // Save LinkedIn import data
      const { error: importError } = await supabaseClient
        .from('linkedin_imports')
        .insert({
          user_id: user.id,
          import_data: sanitizedProfileData,
          status: 'completed'
        });

      if (importError) {
        logStep("Database error", { error: importError.message });
        throw new Error(`Failed to save LinkedIn data: ${importError.message}`);
      }

      await auditLog(supabaseClient, user.id, 'linkedin_profile_imported', clientIP, userAgent);
      logStep("Saved LinkedIn import data");

      return new Response(JSON.stringify({
        success: true,
        profile: sanitizedProfileData
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    throw new Error('Invalid action');

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    
    // Don't leak sensitive information in error messages
    const publicErrorMessage = errorMessage.includes('LinkedIn credentials') 
      ? 'Authentication service temporarily unavailable'
      : errorMessage;

    return new Response(JSON.stringify({ error: publicErrorMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});