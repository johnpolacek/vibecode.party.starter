import type { ActivityUpdate } from "@/types/activity"
import type { ActivityUpdateWithUser, CreateActivityUpdateInput } from "@/types/activity"
import { supabaseAdmin } from "@/lib/supabase"
import { clerkClient } from "@clerk/nextjs/server"
import type { Database } from "@/types/supabase"

type ActivityUpdateComment = Database["public"]["Tables"]["activity_update_comments"]["Row"] & {
  participant: {
    user_id: string
  } | null
}

interface ActivityUpdateResponse {
  id: string
  participant_id: string
  hackathon_id: string
  content: string
  created_at: string
  updated_at: string
  comments?: ActivityUpdateComment[]
}

export class ActivityUpdateService {
  static async createActivityUpdate(input: CreateActivityUpdateInput): Promise<ActivityUpdateResponse> {
    const { data, error } = await supabaseAdmin
      .from("activity_updates")
      .insert({
        participant_id: input.participant_id,
        hackathon_id: input.hackathon_id,
        content: input.content,
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    return data
  }

  static async getActivityUpdates(
    participantId: string
  ): Promise<ActivityUpdateWithUser[]> {
    const { data: updates, error } = await supabaseAdmin
      .from('activity_updates')
      .select(`
        *,
        comments:activity_update_comments(
          id,
          content,
          created_at,
          participant:hackathon_participants(
            user_id
          )
        )
      `)
      .eq('participant_id', participantId)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    // Get user data from Clerk for each unique user ID
    const client = await clerkClient()
    const { data: participant } = await supabaseAdmin
      .from('hackathon_participants')
      .select('user_id')
      .eq('id', participantId)
      .single();

    if (!participant) {
      throw new Error("Participant not found");
    }

    const user = await client.users.getUser(participant.user_id);

    // Get user data for comment authors
    const commentUserIds = new Set(
      updates.flatMap(update => 
        (update.comments as ActivityUpdateComment[])?.map(comment => 
          comment.participant?.user_id
        ).filter((id): id is string => typeof id === 'string') || []
      )
    );

    const commentUsers = await Promise.all(
      Array.from(commentUserIds).map(userId => 
        client.users.getUser(userId)
      )
    );

    const userMap = new Map(
      commentUsers.map(user => [user.id, user])
    );

    return updates.map((update) => ({
      ...update,
      participant: {
        name: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.username || 'Anonymous',
        avatar: user?.imageUrl || '',
        role: 'participant',
      },
      comments: ((update.comments || []) as ActivityUpdateComment[]).map(comment => {
        const userId = comment.participant?.user_id;
        const commentUser = userId ? userMap.get(userId) : undefined;
        return {
          id: comment.id,
          content: comment.content,
          created_at: comment.created_at,
          user: {
            name: commentUser?.firstName && commentUser?.lastName ? 
              `${commentUser.firstName} ${commentUser.lastName}` : 
              commentUser?.username || 'Anonymous',
            avatar: commentUser?.imageUrl || '',
          }
        };
      }),
    }));
  }

  static async addComment(input: {
    update_id: string
    participant_id: string
    content: string
  }): Promise<void> {
    const { error } = await supabaseAdmin
      .from("activity_update_comments")
      .insert({
        activity_update_id: input.update_id,
        participant_id: input.participant_id,
        content: input.content,
      })

    if (error) {
      throw error
    }
  }

  static async getRecentActivityUpdates(hackathonId?: string): Promise<ActivityUpdate[]> {
    let query = supabaseAdmin
      .from("activity_updates")
      .select(`
        *,
        comments:activity_update_comments(
          id,
          content,
          created_at,
          participant:hackathon_participants(
            user_id
          )
        ),
        participant:hackathon_participants(
          user_id,
          hackathon:hackathons(
            title,
            slug
          )
        )
      `)
      .order("created_at", { ascending: false })
      .limit(10)

    // If a hackathon ID is provided, filter updates for that hackathon
    if (hackathonId) {
      query = query.eq("hackathon_id", hackathonId)
    }

    const { data: updates, error } = await query

    if (error) {
      console.error("Error fetching activity updates:", error)
      return []
    }

    // Get user data from Clerk for each unique user ID
    const userIds = new Set(updates.map((update) => update.participant?.user_id).filter(Boolean))

    const client = await clerkClient()
    const users = await Promise.all(
      Array.from(userIds).map((userId) => client.users.getUser(userId))
    )

    const userMap = new Map(users.map((user) => [user.id, user]))

    return updates.map((update) => ({
      id: update.id,
      content: update.content,
      createdAt: update.created_at,
      user: {
        name: (() => {
          const updateUser = userMap.get(update.participant?.user_id)
          return updateUser?.firstName && updateUser?.lastName ? `${updateUser.firstName} ${updateUser.lastName}` : updateUser?.username || "Anonymous"
        })(),
        username: (() => {
          const updateUser = userMap.get(update.participant?.user_id)
          return updateUser?.username || ""
        })(),
        avatar: userMap.get(update.participant?.user_id)?.imageUrl || "",
        role: "participant",
      },
      hackathon: {
        title: update.participant?.hackathon?.title || "",
        slug: update.participant?.hackathon?.slug || "",
      },
      comments: (update.comments || []).map((comment: { id: string; content: string; created_at: string; participant?: { user_id?: string } }) => ({
        id: comment.id,
        content: comment.content,
        createdAt: comment.created_at,
        user: {
          name: (() => {
            const commentUser = userMap.get(comment.participant?.user_id || '')
            return commentUser?.firstName && commentUser?.lastName ? `${commentUser.firstName} ${commentUser.lastName}` : commentUser?.username || "Anonymous"
          })(),
          avatar: userMap.get(comment.participant?.user_id || '')?.imageUrl || "",
        },
      })),
    }))
  }
} 