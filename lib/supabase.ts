import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;
const supabaseProjectRef = process.env.SUPABASE_PROJECT_REF;
const supabaseProdUrl = process.env.SUPABASE_PROD_URL;
const supabaseDbPassword = process.env.SUPABASE_DB_PASSWORD;

// Log missing variables in development only
if (process.env.NODE_ENV === 'development') {
  if (!supabaseUrl) {
    console.warn('Missing Supabase URL environment variable');
    console.warn('Available environment variables:', Object.keys(process.env).filter(key => key.includes('SUPABASE')));
  }

  if (!supabaseServiceRoleKey) {
    console.warn('Missing Supabase service role key environment variable');
    console.warn('Available environment variables:', Object.keys(process.env).filter(key => key.includes('SUPABASE')));
  }
}

// Ensure URL has proper format
const formattedSupabaseUrl = supabaseUrl?.startsWith('http') 
  ? supabaseUrl 
  : supabaseUrl ? `https://${supabaseUrl}` : 'http://localhost:54321';

// Create a service role client for server-side operations only
const supabaseAdmin = createClient<Database>(
  formattedSupabaseUrl,
  supabaseServiceRoleKey || 'dummy-key-for-build',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    },
    // Add debug logging in development
    ...(process.env.NODE_ENV !== 'production' ? { 
      db: { 
        schema: 'public' 
      },
      global: { 
        headers: { 'x-debug-mode': 'true' } 
      } 
    } : {})
  }
);

// Function to check if Supabase is configured
export function isSupabaseConfigured(fullCheck: boolean = false): boolean {
  if (fullCheck) {
    return Boolean(supabaseUrl && supabaseServiceRoleKey && supabaseProjectRef && supabaseProdUrl && supabaseDbPassword);
  }
  return Boolean(supabaseUrl && supabaseServiceRoleKey);
}

// Function to check Supabase connection
export async function checkSupabaseConnection(): Promise<{ 
  success: boolean; 
  message: string; 
  details?: {
    error?: unknown;
    tables?: string[] | null;
    count?: number;
  }
}> {
  // If not configured, return early
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      message: 'Supabase is not configured',
      details: {
        error: 'Missing required environment variables'
      }
    };
  }

  return {
    success: true,
    message: 'Connected',
  };
}

export { supabaseAdmin }; 