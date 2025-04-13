-- Create user visits table
CREATE TABLE user_visits (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT,
    path TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for user visits
CREATE INDEX idx_user_visits_user_id ON user_visits(user_id);
CREATE INDEX idx_user_visits_path ON user_visits(path);
CREATE INDEX idx_user_visits_created_at ON user_visits(created_at);

-- Create mailing list subscriptions table
CREATE TABLE mailing_list_subscriptions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL,
    email TEXT NOT NULL,
    name TEXT,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at TIMESTAMP WITH TIME ZONE,
    preferences JSONB DEFAULT '{"marketing": true, "updates": true}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(email),
    UNIQUE(user_id)
);

-- Add indexes for mailing list
CREATE INDEX idx_mailing_list_user_id ON mailing_list_subscriptions(user_id);
CREATE INDEX idx_mailing_list_email ON mailing_list_subscriptions(email);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_user_visits_updated_at
    BEFORE UPDATE ON user_visits
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_mailing_list_subscriptions_updated_at
    BEFORE UPDATE ON mailing_list_subscriptions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Note: We handle authentication and authorization through Clerk and server-side actions
-- using supabaseAdmin, so we don't need RLS policies.
