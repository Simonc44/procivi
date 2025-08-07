-- Phase 1: Critical Database Security Fixes

-- Fix database functions search_path vulnerability
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
  );
  
  INSERT INTO public.subscriptions (user_id, status, plan_type)
  VALUES (NEW.id, 'inactive', 'free');
  
  RETURN NEW;
END;
$$;

-- Fix update function search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Create audit logging table for security monitoring
CREATE TABLE public.security_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  resource TEXT NOT NULL,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on audit logs
ALTER TABLE public.security_audit_logs ENABLE ROW LEVEL SECURITY;

-- Only service role can write audit logs
CREATE POLICY "Service can write audit logs" ON public.security_audit_logs
FOR INSERT WITH CHECK (true);

-- Users can only view their own audit logs
CREATE POLICY "Users can view own audit logs" ON public.security_audit_logs
FOR SELECT USING (user_id = auth.uid());

-- Create secure configuration table for API settings
CREATE TABLE public.app_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS - only service role can access
ALTER TABLE public.app_config ENABLE ROW LEVEL SECURITY;

-- Insert secure stripe price configuration
INSERT INTO public.app_config (key, value, description) VALUES 
('stripe_prices', '{"premium_monthly": "price_premium_monthly_id", "premium_yearly": "price_premium_yearly_id"}', 'Stripe price IDs for subscription plans');

-- Add trigger for audit logs
CREATE TRIGGER update_app_config_updated_at
BEFORE UPDATE ON public.app_config
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();