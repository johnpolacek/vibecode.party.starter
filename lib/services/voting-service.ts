import { supabaseAdmin } from "@/lib/supabase"
import type { VoteCount } from "@/types/supabase"

export class VotingService {
  /**
   * Get vote counts for all participants in a hackathon
   */
  static async getVoteCounts(hackathonId: string): Promise<VoteCount[]> {
    const { data, error } = await supabaseAdmin
      .from("hackathon_votes")
      .select("category, participant_id")
      .eq("hackathon_id", hackathonId)

    if (error) {
      console.error("Error fetching vote counts:", error)
      return []
    }

    // Group votes by category and participant_id
    const voteCounts = data.reduce((acc: VoteCount[], vote) => {
      const existingVote = acc.find(
        (v) => v.category === vote.category && v.participant_id === vote.participant_id
      )

      if (existingVote) {
        existingVote.vote_count++
      } else {
        acc.push({
          category: vote.category,
          participant_id: vote.participant_id,
          vote_count: 1,
        })
      }

      return acc
    }, [])

    return voteCounts
  }

  /**
   * Get user's votes in a hackathon
   */
  static async getUserVotes(hackathonId: string, userId: string) {
    const { data, error } = await supabaseAdmin
      .from("hackathon_votes")
      .select("*")
      .eq("hackathon_id", hackathonId)
      .eq("voter_id", userId)

    if (error) {
      console.error("Error fetching user votes:", error)
      return []
    }

    return data
  }
} 