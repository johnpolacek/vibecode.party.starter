import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

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

// Function to check if Supabase is properly configured
export function isSupabaseConfigured(): boolean {
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

  try {
    console.log('Checking Supabase connection...');
    console.log('Using URL:', formattedSupabaseUrl);
    
    // Try to directly check if the hackathons table exists
    const { data, error } = await supabaseAdmin
      .from('hackathons')
      .select('id')
      .limit(1);
    
    if (error) {
      console.error('Error accessing hackathons table:', error);
      return { 
        success: false, 
        message: `Connection error: ${error.message}`,
        details: {
          error
        }
      };
    }
    
    return {
      success: true,
      message: 'Successfully connected to Supabase',
      details: {
        tables: ['hackathons'],
        count: data?.length || 0
      }
    };
  } catch (err) {
    console.error('Unexpected error checking Supabase connection:', err);
    return {
      success: false,
      message: `Unexpected error: ${err instanceof Error ? err.message : String(err)}`,
      details: { error: err }
    };
  }
}

// Test the connection in development
if (process.env.NODE_ENV !== 'production') {
  const testConnection = async () => {
    try {
      const { error } = await supabaseAdmin
        .from('hackathons')
        .select('count', { count: 'exact', head: true });
        
      if (error) {
        console.error('Supabase connection test failed:', error);
      }
    } catch (err) {
      console.error('Supabase connection test error:', err);
    }
  };
  
  void testConnection();
}

export { supabaseAdmin }; 