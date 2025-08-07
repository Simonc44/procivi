import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const logStep = (step: string, details?: any) => {
  console.log(`[CREATE-CHECKOUT] ${step}${details ? ` - ${JSON.stringify(details)}` : ''}`);
};

const auditLog = async (supabaseClient: any, userId: string, action: string, ip: string, userAgent: string) => {
  try {
    await supabaseClient.from('security_audit_logs').insert({
      user_id: userId,
      action: action,
      resource: 'stripe_checkout',
      ip_address: ip,
      user_agent: userAgent
    });
  } catch (error) {
    logStep('Audit log failed', { error: error.message });
  }
};

const getStripePrice = async (supabaseClient: any, planType: string): Promise<string> => {
  try {
    const { data: config } = await supabaseClient
      .from('app_config')
      .select('value')
      .eq('key', 'stripe_prices')
      .single();
      
    if (!config) {
      throw new Error('Stripe price configuration not found');
    }
    
    const prices = config.value as Record<string, string>;
    const priceId = prices[planType];
    
    if (!priceId) {
      throw new Error(`Price ID not found for plan: ${planType}`);
    }
    
    return priceId;
  } catch (error) {
    logStep('Failed to get price from config', { error: error.message });
    // Fallback to default price ID for premium monthly
    return 'price_1Rp4L5FMe63wZBKKVBgzGNfi';
  }
};

const checkSubscriptionEligibility = async (supabaseClient: any, userId: string): Promise<boolean> => {
  try {
    const { data: subscription } = await supabaseClient
      .from('subscriptions')
      .select('status, plan_type')
      .eq('user_id', userId)
      .single();
      
    // User can create checkout if they don't have an active subscription
    return !subscription || subscription.status !== 'active' || subscription.plan_type === 'free';
  } catch (error) {
    logStep('Subscription check failed', { error: error.message });
    return true; // Allow checkout on error
  }
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Starting checkout creation");

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
    if (!user?.email) throw new Error("User not authenticated or email not available");

    logStep("User authenticated", { userId: user.id });

    // Get IP and User Agent for audit logging
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';

    // Validate request payload
    const requestBody = await req.json();
    const planType = requestBody.plan_type || 'premium_monthly';

    // Check subscription eligibility
    const isEligible = await checkSubscriptionEligibility(supabaseClient, user.id);
    if (!isEligible) {
      throw new Error("User already has an active subscription");
    }

    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) throw new Error('Stripe secret key not configured');

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    // Check for existing Stripe customer
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Found existing customer", { customerId });
    } else {
      // Create new customer
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { user_id: user.id }
      });
      customerId = customer.id;
      logStep("Created new customer", { customerId });
    }

    // Get price ID from configuration
    const priceId = await getStripePrice(supabaseClient, planType);

    // Create checkout session
    const origin = req.headers.get("origin") || "https://procivi.lovable.app";
    const successUrl = requestBody.success_url || `${origin}/dashboard?checkout=success`;
    const cancelUrl = requestBody.cancel_url || `${origin}/pricing?checkout=cancelled`;

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [{
        price: priceId,
        quantity: 1,
      }],
      mode: "subscription",
      success_url: successUrl,
      cancel_url: cancelUrl,
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      metadata: {
        user_id: user.id,
        plan_type: planType
      }
    });

    logStep("Created checkout session", { sessionId: session.id });

    // Update subscription record
    await supabaseClient
      .from('subscriptions')
      .upsert({
        user_id: user.id,
        stripe_customer_id: customerId,
        status: 'pending',
        plan_type: 'free' // Will be updated after successful payment
      }, { onConflict: 'user_id' });

    await auditLog(supabaseClient, user.id, 'stripe_checkout_created', clientIP, userAgent);
    logStep("Database updated");

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    
    // Don't leak sensitive information
    const publicErrorMessage = errorMessage.includes('Stripe secret') 
      ? 'Payment service temporarily unavailable'
      : errorMessage;

    return new Response(JSON.stringify({ error: publicErrorMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});