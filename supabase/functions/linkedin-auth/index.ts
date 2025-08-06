import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const logStep = (step: string, details?: any) => {
  console.log(`[LINKEDIN-AUTH] ${step}${details ? ` - ${JSON.stringify(details)}` : ''}`);
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Starting LinkedIn auth flow");

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Auth error: ${userError.message}`);
    const user = userData.user;
    if (!user) throw new Error("User not authenticated");

    logStep("User authenticated", { userId: user.id });

    const { action, code } = await req.json();

    if (action === 'get_auth_url') {
      const clientId = Deno.env.get('LINKEDIN_CLIENT_ID');
      if (!clientId) throw new Error('LinkedIn client ID not configured');

      const redirectUri = `${req.headers.get('origin')}/linkedin-callback`;
      const scope = 'profile email w_member_social';
      const state = user.id; // Use user ID as state for security

      const authUrl = `https://www.linkedin.com/oauth/v2/authorization?` +
        `response_type=code&` +
        `client_id=${clientId}&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        `scope=${encodeURIComponent(scope)}&` +
        `state=${state}`;

      logStep("Generated LinkedIn auth URL");

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

      const redirectUri = `${req.headers.get('origin')}/linkedin-callback`;

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

      // Fetch LinkedIn profile
      const profileResponse = await fetch('https://api.linkedin.com/v2/people/~?projection=(id,firstName,lastName,emailAddress,positions,educations,skills)', {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });

      if (!profileResponse.ok) {
        throw new Error('Failed to fetch LinkedIn profile');
      }

      const profileData = await profileResponse.json();

      logStep("Fetched LinkedIn profile", { profileId: profileData.id });

      // Save LinkedIn import data
      const { error: importError } = await supabaseClient
        .from('linkedin_imports')
        .insert({
          user_id: user.id,
          import_data: profileData,
          status: 'completed'
        });

      if (importError) throw new Error(`Database error: ${importError.message}`);

      logStep("Saved LinkedIn import data");

      return new Response(JSON.stringify({
        success: true,
        profile: profileData
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    throw new Error('Invalid action');

  } catch (error) {
    logStep("ERROR", { message: error.message });
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});