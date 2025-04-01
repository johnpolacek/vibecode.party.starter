import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { auth } from '@clerk/nextjs/server';
import { CommunitySuggestionUpdate } from '@/types/supabase';

// PATCH: Update a community suggestion
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    console.log(`PATCH /api/community-suggestions/${(await params).id} - Starting request`);
    
    const { userId } = await auth();
    console.log("Auth userId:", userId);
    
    // Only authenticated users can access this endpoint
    if (!userId) {
      console.log("Authentication required - no user ID found");
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // In a real app, you would check if the user has admin permissions
    // For now, we'll just use a hardcoded list of admin user IDs
    const adminUserIds = process.env.ADMIN_USER_IDS?.split(",") || [];
    console.log("Admin user IDs:", adminUserIds);
    console.log("Is user admin:", adminUserIds.includes(userId));
    
    // If the user is not an admin, return unauthorized
    if (!adminUserIds.includes(userId)) {
      console.log("Unauthorized - user is not an admin");
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
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

    const suggestionId = (await params).id;
    const body = await request.json();
    console.log(`Attempting to update suggestion with ID: ${suggestionId}`);
    console.log("Request body:", JSON.stringify(body, null, 2));
    
    // Validate required fields
    if (!body.title || !body.description || !body.category) {
      console.log("Missing required fields");
      return NextResponse.json(
        { error: 'Title, description, and category are required' },
        { status: 400 }
      );
    }

    // Prepare data for update
    const updateData: CommunitySuggestionUpdate = {
      title: body.title,
      description: body.description,
      category: body.category,
      updated_at: new Date().toISOString(),
    };
    console.log("Update data:", JSON.stringify(updateData, null, 2));

    // Update the suggestion using the admin client (service role)
    const { data, error, status, statusText } = await supabaseAdmin
      .from('community_suggestions')
      .update(updateData)
      .eq('id', suggestionId)
      .select()
      .single();

    console.log("Supabase response status:", status, statusText);
    
    if (error) {
      console.error('Error updating community suggestion:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      console.error('Error details:', error.details);
      
      return NextResponse.json(
        { 
          error: 'Failed to update community suggestion',
          details: error.message || 'Unknown error',
          code: error.code || 'unknown',
          hint: error.hint || '',
          details_obj: error.details || {}
        },
        { status: 500 }
      );
    }

    console.log("Successfully updated suggestion:", data?.id);
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error('Unexpected error in PATCH /api/community-suggestions/[id]:', error);
    
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

// DELETE: Delete a community suggestion
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    console.log(`DELETE /api/community-suggestions/${(await params).id} - Starting request`);
    
    const { userId } = await auth();
    console.log("Auth userId:", userId);
    
    // Only authenticated users can access this endpoint
    if (!userId) {
      console.log("Authentication required - no user ID found");
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // In a real app, you would check if the user has admin permissions
    // For now, we'll just use a hardcoded list of admin user IDs
    const adminUserIds = process.env.ADMIN_USER_IDS?.split(",") || [];
    console.log("Admin user IDs:", adminUserIds);
    console.log("Is user admin:", adminUserIds.includes(userId));
    
    // If the user is not an admin, return unauthorized
    if (!adminUserIds.includes(userId)) {
      console.log("Unauthorized - user is not an admin");
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
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

    const suggestionId = (await params).id;
    console.log(`Attempting to delete suggestion with ID: ${suggestionId}`);

    // Delete the suggestion using the admin client (service role)
    const { error, status, statusText } = await supabaseAdmin
      .from('community_suggestions')
      .delete()
      .eq('id', suggestionId);

    console.log("Supabase response status:", status, statusText);
    
    if (error) {
      console.error('Error deleting community suggestion:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      console.error('Error details:', error.details);
      
      return NextResponse.json(
        { 
          error: 'Failed to delete community suggestion',
          details: error.message || 'Unknown error',
          code: error.code || 'unknown',
          hint: error.hint || '',
          details_obj: error.details || {}
        },
        { status: 500 }
      );
    }

    console.log("Successfully deleted suggestion:", suggestionId);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Unexpected error in DELETE /api/community-suggestions/[id]:', error);
    
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