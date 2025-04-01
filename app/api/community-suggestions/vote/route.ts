import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { auth } from '@clerk/nextjs/server';

// POST: Toggle vote on a community suggestion
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    // Only authenticated users can vote
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required to vote' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { suggestionId } = body;

    if (!suggestionId) {
      return NextResponse.json(
        { error: 'Suggestion ID is required' },
        { status: 400 }
      );
    }

    // Call the toggle vote function
    const { error } = await supabaseAdmin.rpc(
      'toggle_community_suggestion_vote',
      {
        suggestion_id: suggestionId,
        voter_id: userId
      }
    );

    if (error) {
      console.error('Error toggling vote:', error);
      return NextResponse.json(
        { error: 'Failed to toggle vote' },
        { status: 500 }
      );
    }

    // Fetch the updated suggestion to return the new vote count
    const { data: updatedSuggestion, error: fetchError } = await supabaseAdmin
      .from('community_suggestions')
      .select('id, votes_count, voter_ids')
      .eq('id', suggestionId)
      .single();

    if (fetchError) {
      console.error('Error fetching updated suggestion:', fetchError);
      return NextResponse.json(
        { error: 'Failed to fetch updated suggestion' },
        { status: 500 }
      );
    }

    // Check if the user has voted
    const hasVoted = updatedSuggestion.voter_ids.includes(userId);

    return NextResponse.json({
      id: updatedSuggestion.id,
      votes_count: updatedSuggestion.votes_count,
      hasVoted
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 