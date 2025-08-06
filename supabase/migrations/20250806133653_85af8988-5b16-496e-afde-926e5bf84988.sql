-- Create ProCivi database schema for CV generation platform

-- User profiles table for additional user information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  location TEXT,
  linkedin_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- CVs table to store generated CVs
CREATE TABLE public.cvs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content JSONB NOT NULL,
  template_type TEXT NOT NULL DEFAULT 'modern',
  generated_content TEXT,
  pdf_url TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- LinkedIn imports table to store LinkedIn profile data
CREATE TABLE public.linkedin_imports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  import_data JSONB NOT NULL,
  parsed_data JSONB,
  status TEXT NOT NULL DEFAULT 'pending',
  imported_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Cover letters table for premium feature
CREATE TABLE public.cover_letters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  job_title TEXT NOT NULL,
  company_name TEXT NOT NULL,
  content TEXT NOT NULL,
  generated_content TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Recruitment emails table for premium feature
CREATE TABLE public.recruitment_emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_name TEXT,
  company_name TEXT NOT NULL,
  position TEXT NOT NULL,
  content TEXT NOT NULL,
  generated_content TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Subscriptions table to track Stripe subscriptions
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  status TEXT NOT NULL DEFAULT 'inactive',
  plan_type TEXT NOT NULL DEFAULT 'free',
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Generation logs table to track AI generations
CREATE TABLE public.generation_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'cv', 'cover_letter', 'recruitment_email'
  model_used TEXT NOT NULL DEFAULT 'gemini-2.0-flash',
  prompt_tokens INTEGER,
  completion_tokens INTEGER,
  cost DECIMAL(10,4),
  status TEXT NOT NULL DEFAULT 'pending',
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cvs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.linkedin_imports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cover_letters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recruitment_emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generation_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for CVs
CREATE POLICY "Users can view own CVs" ON public.cvs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own CVs" ON public.cvs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own CVs" ON public.cvs
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own CVs" ON public.cvs
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for LinkedIn imports
CREATE POLICY "Users can view own LinkedIn imports" ON public.linkedin_imports
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own LinkedIn imports" ON public.linkedin_imports
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for cover letters
CREATE POLICY "Users can view own cover letters" ON public.cover_letters
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own cover letters" ON public.cover_letters
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own cover letters" ON public.cover_letters
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own cover letters" ON public.cover_letters
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for recruitment emails
CREATE POLICY "Users can view own recruitment emails" ON public.recruitment_emails
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own recruitment emails" ON public.recruitment_emails
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own recruitment emails" ON public.recruitment_emails
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own recruitment emails" ON public.recruitment_emails
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for subscriptions
CREATE POLICY "Users can view own subscription" ON public.subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service can manage subscriptions" ON public.subscriptions
  FOR ALL USING (true);

-- RLS Policies for generation logs
CREATE POLICY "Users can view own generation logs" ON public.generation_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service can create generation logs" ON public.generation_logs
  FOR INSERT WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX idx_profiles_email ON public.profiles(email);
CREATE INDEX idx_cvs_user_id ON public.cvs(user_id);
CREATE INDEX idx_cvs_created_at ON public.cvs(created_at DESC);
CREATE INDEX idx_linkedin_imports_user_id ON public.linkedin_imports(user_id);
CREATE INDEX idx_cover_letters_user_id ON public.cover_letters(user_id);
CREATE INDEX idx_recruitment_emails_user_id ON public.recruitment_emails(user_id);
CREATE INDEX idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe_customer_id ON public.subscriptions(stripe_customer_id);
CREATE INDEX idx_generation_logs_user_id ON public.generation_logs(user_id);
CREATE INDEX idx_generation_logs_created_at ON public.generation_logs(created_at DESC);

-- Create function to update updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cvs_updated_at
  BEFORE UPDATE ON public.cvs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cover_letters_updated_at
  BEFORE UPDATE ON public.cover_letters
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_recruitment_emails_updated_at
  BEFORE UPDATE ON public.recruitment_emails
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
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
$$ language 'plpgsql' security definer;

-- Trigger to create profile and subscription on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();