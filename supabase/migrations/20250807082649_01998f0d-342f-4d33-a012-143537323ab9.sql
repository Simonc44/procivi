-- Fix app_config table policies for service access
CREATE POLICY "Service can access app config" ON public.app_config
FOR ALL USING (true);