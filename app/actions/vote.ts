'use server'

import { auth } from "@clerk/nextjs/server"
import { supabaseAdmin } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function submitVote(hackathonSlug: string, category: string, participantId: string) {
  try {
    const { userId } = await auth()
    if (!userId) {
      throw new Error("Authentication required to vote")
    }

    // Get hackathon ID from slug
    const { data: hackathon, error: hackathonError } = await supabaseAdmin
      .from("hackathons")
      .select("id")
      .eq("slug", hackathonSlug)
      .single()

    if (hackathonError || !hackathon) {
      console.error("Error fetching hackathon:", hackathonError)
      throw new Error("Hackathon not found")
    }

    // Check if user has already voted in this category
    const { data: existingVote, error: voteCheckError } = await supabaseAdmin
      .from("hackathon_votes")
      .select("id, participant_id")
      .eq("hackathon_id", hackathon.id)
      .eq("category", category)
      .eq("voter_id", userId)
      .single()

    if (voteCheckError && voteCheckError.code !== "PGRST116") {
      // PGRST116 means no rows returned, which is what we want if they haven't voted
      console.error("Error checking existing vote:", voteCheckError)
      throw new Error("Failed to check existing vote")
    }

    if (existingVote) {
      // If voting for the same participant, remove the vote
      if (existingVote.participant_id === participantId) {
        const { error: deleteError } = await supabaseAdmin
          .from("hackathon_votes")
          .delete()
          .eq("id", existingVote.id)

        if (deleteError) {
          console.error("Error removing vote:", deleteError)
          throw new Error("Failed to remove vote")
        }

        // Get updated vote count
        const { data: voteCount, error: countError } = await supabaseAdmin
          .from("hackathon_votes")
          .select("*", { count: "exact" })
          .eq("hackathon_id", hackathon.id)
          .eq("category", category)
          .eq("participant_id", participantId)

        if (countError) {
          console.error("Error getting vote count:", countError)
          throw new Error("Failed to get vote count")
        }

        revalidatePath(`/hackathons/${hackathonSlug}`)
        return { message: "Vote removed successfully", hasVoted: false, voteCount: voteCount?.length || 0 }
      } else {
        // If voting for a different participant, update the vote
        const { error: updateError } = await supabaseAdmin
          .from("hackathon_votes")
          .update({ participant_id: participantId, updated_at: new Date().toISOString() })
          .eq("id", existingVote.id)

        if (updateError) {
          console.error("Error updating vote:", updateError)
          throw new Error("Failed to update vote")
        }

        // Get updated vote count
        const { data: voteCount, error: countError } = await supabaseAdmin
          .from("hackathon_votes")
          .select("*", { count: "exact" })
          .eq("hackathon_id", hackathon.id)
          .eq("category", category)
          .eq("participant_id", participantId)

        if (countError) {
          console.error("Error getting vote count:", countError)
          throw new Error("Failed to get vote count")
        }

        revalidatePath(`/hackathons/${hackathonSlug}`)
        return { message: "Vote updated successfully", hasVoted: true, voteCount: voteCount?.length || 0 }
      }
    }

    // Create new vote
    const { error: insertError } = await supabaseAdmin.from("hackathon_votes").insert({
      hackathon_id: hackathon.id,
      category,
      voter_id: userId,
      participant_id: participantId,
    })

    if (insertError) {
      console.error("Error inserting vote:", insertError)
      throw new Error("Failed to submit vote")
    }

    // Get updated vote count
    const { data: voteCount, error: countError } = await supabaseAdmin
      .from("hackathon_votes")
      .select("*", { count: "exact" })
      .eq("hackathon_id", hackathon.id)
      .eq("category", category)
      .eq("participant_id", participantId)

    if (countError) {
      console.error("Error getting vote count:", countError)
      throw new Error("Failed to get vote count")
    }

    revalidatePath(`/hackathons/${hackathonSlug}`)
    return { message: "Vote submitted successfully", hasVoted: true, voteCount: voteCount?.length || 0 }
  } catch (error) {
    console.error("Unexpected error:", error)
    throw error
  }
} 