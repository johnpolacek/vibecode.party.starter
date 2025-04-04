-- Create user_visits table
CREATE TABLE user_visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT,
  path TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add indexes for common queries
CREATE INDEX idx_user_visits_user_id ON user_visits(user_id);
CREATE INDEX idx_user_visits_path ON user_visits(path);
CREATE INDEX idx_user_visits_timestamp ON user_visits(timestamp);

-- Enable RLS to restrict access to service role only
ALTER TABLE user_visits ENABLE ROW LEVEL SECURITY; 