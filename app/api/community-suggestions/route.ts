import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { auth, currentUser } from '@clerk/nextjs/server';
import { CommunitySuggestionInsert } from '@/types/supabase';
import { verifyCaptcha } from '@/app/_actions/verifyCaptcha';

// GET: Fetch all community suggestions
export async function GET() {
  try {
    // Validate Supabase connection
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.SUPABASE_URL) {
      console.error('Missing Supabase URL environment variable');
      return NextResponse.json(
        { 
          error: 'Server configuration error', 
          details: 'Missing Supabase URL environment variable'
        },
        { status: 500 }
      );
    }
    
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY && !process.env.SUPABASE_SERVICE_KEY) {
      console.error('Missing Supabase service role key environment variable');
      return NextResponse.json(
        { 
          error: 'Server configuration error', 
          details: 'Missing Supabase service role key environment variable'
        },
        { status: 500 }
      );
    }
    
    const { data, error } = await supabaseAdmin
      .from('community_suggestions')
      .select('*')
      .order('votes_count', { ascending: false });

    if (error) {
      console.error('Error fetching community suggestions:', error);
      return NextResponse.json(
        { 
          error: 'Failed to fetch community suggestions',
          details: error.message,
          code: error.code
        }, 
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error('Unexpected error:', error);
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : String(error);
      
    const errorStack = error instanceof Error && process.env.NODE_ENV === 'development'
      ? error.stack
      : undefined;
      
    return NextResponse.json(
      { 
        error: 'An unexpected error occurred',
        details: errorMessage,
        stack: errorStack
      },
      { status: 500 }
    );
  }
}

// POST: Create a new community suggestion
export async function POST(request: NextRequest) {
  try {
    console.log("POST /api/community-suggestions - Starting request");
    
    const body = await request.json();
    console.log("Request body:", JSON.stringify(body));
    
    const { userId } = await auth();
    console.log("Auth userId:", userId);

    if (!userId) {
      if (!body.captchaToken) { 
        return NextResponse.json({ error: "Captcha token is required" }, { status: 400 });
      }
      const isCaptchaValid = await verifyCaptcha(body.captchaToken);
      if (!isCaptchaValid) {
        return NextResponse.json({ error: "reCAPTCHA validation failed" }, { status: 400 });
      }
    }
    
    // Validate required fields
    if (!body.title || !body.description || !body.category) {
      console.log("Missing required fields");
      return NextResponse.json(
        { error: 'Title, description, and category are required' },
        { status: 400 }
      );
    }

    // Prepare data for insertion
    const suggestionData: CommunitySuggestionInsert = {
      title: body.title,
      description: body.description,
      category: body.category,
    };

    // Handle authenticated vs guest submissions
    if (userId) {
      // If user is authenticated, always use their user ID
      suggestionData.author_id = userId;
      
      // Get the user's name from Clerk
      const user = await currentUser();
      if (user) {
        // Use the user's full name, or fallback to first name, username, or email
        const authorName = user.fullName || 
                          user.firstName || 
                          user.username || 
                          user.emailAddresses[0]?.emailAddress || 
                          'User';
        
        suggestionData.author_name = authorName;
        console.log("Using authenticated user's name:", authorName);
      }
      
      console.log("Using authenticated user ID:", userId);
    } else if (body.guestName) {
      // Guest submission with name
      suggestionData.author_name = body.guestName;
      console.log("Using guest name:", body.guestName);
    } else {
      console.log("No authentication or guest name provided");
      return NextResponse.json(
        { error: 'Authentication or guest name is required' },
        { status: 400 }
      );
    }

    // Validate Supabase connection
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.SUPABASE_URL) {
      console.error('Missing Supabase URL environment variable');
      return NextResponse.json(
        { 
          error: 'Server configuration error', 
          details: 'Missing Supabase URL environment variable'
        },
        { status: 500 }
      );
    }
    
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY && !process.env.SUPABASE_SERVICE_KEY) {
      console.error('Missing Supabase service role key environment variable');
      return NextResponse.json(
        { 
          error: 'Server configuration error', 
          details: 'Missing Supabase service role key environment variable'
        },
        { status: 500 }
      );
    }

    console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL);
    console.log("Supabase service key available:", !!process.env.SUPABASE_SERVICE_ROLE_KEY || !!process.env.SUPABASE_SERVICE_KEY);
    console.log("Attempting to insert data:", JSON.stringify(suggestionData, null, 2));

    // Insert the suggestion using the admin client (service role)
    const { data, error, status, statusText } = await supabaseAdmin
      .from('community_suggestions')
      .insert(suggestionData)
      .select()
      .single();

    console.log("Supabase response status:", status, statusText);
    
    if (error) {
      console.error('Error creating community suggestion:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      console.error('Error details:', error.details);
      
      return NextResponse.json(
        { 
          error: 'Failed to create community suggestion',
          details: error.message || 'Unknown error',
          code: error.code || 'unknown',
          hint: error.hint || '',
          details_obj: error.details || {}
        },
        { status: 500 }
      );
    }

    console.log("Successfully created suggestion:", data?.id);
    return NextResponse.json(data, { status: 201 });
  } catch (error: unknown) {
    console.error('Unexpected error in POST /api/community-suggestions:', error);
    
    // Log the full error object for debugging
    try {
      console.error('Full error object:', JSON.stringify(error, null, 2));
    } catch (e) {
      console.error('Error stringifying error object:', e);
      console.error('Error object keys:', Object.keys(error as object));
    }
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : String(error);
      
    const errorStack = error instanceof Error
      ? error.stack
      : undefined;
      
    console.error('Error message:', errorMessage);
    console.error('Error stack:', errorStack);
    
    return NextResponse.json(
      { 
        error: 'An unexpected error occurred',
        details: errorMessage,
        stack: process.env.NODE_ENV === 'development' ? errorStack : undefined
      },
      { status: 500 }
    );
  }
} 