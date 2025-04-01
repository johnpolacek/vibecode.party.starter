 

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      activity_update_comments: {
        Row: {
          id: string
          activity_update_id: string
          participant_id: string
          content: string
          reply_to_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          activity_update_id: string
          participant_id: string
          content: string
          reply_to_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          activity_update_id?: string
          participant_id?: string
          content?: string
          reply_to_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      activity_updates: {
        Row: {
          id: string
          participant_id: string
          hackathon_id: string
          content: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          participant_id: string
          hackathon_id: string
          content: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          participant_id?: string
          hackathon_id?: string
          content?: string
          created_at?: string
          updated_at?: string
        }
      }
      hackathon_participants: {
        Row: {
          id: string
          user_id: string
          hackathon_id: string
          role: string
          status: string
          created_at: string
          updated_at: string
          github_repository_url: string | null
          github_repository_name: string | null
          github_repository_owner: string | null
          github_webhook_id: string | null
          github_webhook_secret: string | null
          github_access_token: string | null
          project_title: string | null
          project_description: string | null
          project_url: string | null
          username: string | null
          notifications_enabled: boolean
        }
        Insert: {
          id?: string
          user_id: string
          hackathon_id: string
          role: string
          status: string
          created_at?: string
          updated_at?: string
          github_repository_url?: string | null
          github_repository_name?: string | null
          github_repository_owner?: string | null
          github_webhook_id?: string | null
          github_webhook_secret?: string | null
          github_access_token?: string | null
          project_title?: string | null
          project_description?: string | null
          project_url?: string | null
          username?: string | null
          notifications_enabled?: boolean
        }
        Update: {
          id?: string
          user_id?: string
          hackathon_id?: string
          role?: string
          status?: string
          created_at?: string
          updated_at?: string
          github_repository_url?: string | null
          github_repository_name?: string | null
          github_repository_owner?: string | null
          github_webhook_id?: string | null
          github_webhook_secret?: string | null
          github_access_token?: string | null
          project_title?: string | null
          project_description?: string | null
          project_url?: string | null
          username?: string | null
          notifications_enabled?: boolean
        }
      }
      hackathons: {
        Row: {
          id: string
          name: string
          slug: string
          description: string
          start_date: string
          end_date: string
          created_at: string
          updated_at: string
          voting_duration: number
          voting_categories: string[]
          voting_status: 'disabled' | 'pending' | 'open' | 'closed'
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description: string
          start_date: string
          end_date: string
          created_at?: string
          updated_at?: string
          voting_duration?: number
          voting_categories?: string[]
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string
          start_date?: string
          end_date?: string
          created_at?: string
          updated_at?: string
          voting_duration?: number
          voting_categories?: string[]
        }
      }
      hackathon_votes: {
        Row: {
          id: string
          hackathon_id: string
          category: string
          voter_id: string
          participant_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          hackathon_id: string
          category: string
          voter_id: string
          participant_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          hackathon_id?: string
          category?: string
          voter_id?: string
          participant_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: string
          name: string
          username: string
          avatar: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          username: string
          avatar: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          username?: string
          avatar?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_voting_open: {
        Args: { hackathon_row: Database['public']['Tables']['hackathons']['Row'] }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Helper types for database tables
export type ActivityUpdateComment = Database['public']['Tables']['activity_update_comments']['Row']
export type ActivityUpdateCommentInsert = Database['public']['Tables']['activity_update_comments']['Insert']
export type ActivityUpdateCommentUpdate = Database['public']['Tables']['activity_update_comments']['Update']

export type ActivityUpdate = Database['public']['Tables']['activity_updates']['Row']
export type ActivityUpdateInsert = Database['public']['Tables']['activity_updates']['Insert']
export type ActivityUpdateUpdate = Database['public']['Tables']['activity_updates']['Update']

export type HackathonParticipant = Database['public']['Tables']['hackathon_participants']['Row']
export type HackathonParticipantInsert = Database['public']['Tables']['hackathon_participants']['Insert']
export type HackathonParticipantUpdate = Database['public']['Tables']['hackathon_participants']['Update']

export type HackathonBase = Database['public']['Tables']['hackathons']['Row']
export type HackathonInsert = Database['public']['Tables']['hackathons']['Insert']
export type HackathonUpdate = Database['public']['Tables']['hackathons']['Update']

export type User = Database['public']['Tables']['users']['Row']
export type UserInsert = Database['public']['Tables']['users']['Insert']
export type UserUpdate = Database['public']['Tables']['users']['Update']

// Extended types for the application
export interface CommunitySuggestion {
  id: string
  title: string
  description: string
  votes: number
  votes_count?: number
  category: string
  author_name?: string
  hasVoted?: boolean
  voter_ids?: string[]
  created_at: string
  updated_at: string
  user: {
    name: string
    avatar: string
  }
}

export interface CommunitySuggestionUpdate {
  title?: string
  description?: string
  category?: string
  updated_at?: string
}

export interface CommunitySuggestionInsert {
  title: string
  description: string
  category: string
  author_id?: string
  author_name?: string
  votes?: number
  created_at?: string
  updated_at?: string
}

export interface Hackathon extends HackathonBase {
  title: string
  name: string
  slug: string
  description: string
  start_date: string
  end_date: string
  cover_image?: string
  location?: string
  location_type: "online" | "in-person" | "hybrid"
  participants?: number
  max_participants?: number
  tags: string[]
  status: "live" | "upcoming" | "completed"
  use_judging_panel: boolean
  category: string
  rules?: string
  isUserRegistered?: boolean
}

export interface HackathonJudge {
  id: string
  hackathon_id: string
  name: string
  bio: string | null
  picture: string | null
  links: string[] | null
  created_at: string
  updated_at: string
}

export interface HackathonJudgeInsert {
  hackathon_id: string
  name: string
  bio: string | null
  picture: string | null
  links: string[] | null
}

export type SponsorApprovalStatus = 'pending' | 'approved' | 'rejected'

export interface HackathonSponsor {
  id: string
  hackathon_id: number
  tier_id: string
  name: string
  logo?: string
  link: string
  created_at: string
  updated_at: string
  stripe_session_id?: string
  stripe_payment_intent_id?: string
  amount: number
  payment_status: 'pending' | 'paid' | 'failed'
  paid_at?: string
  prize_name?: string
  prize_description?: string
  created_by: string
  approval_status: SponsorApprovalStatus
  approved_at?: string
  approved_by?: string
  rejection_reason?: string
}

export interface HackathonSponsorInsert {
  hackathon_id: string
  tier_id: string
  name: string
  logo: string | null
  link: string
}

export interface HackathonSponsorTier {
  id: string
  hackathonId: number
  name: string
  description: string | null
  benefits: string[]
  fixedAmount: number | null
  minimumAmount: number | null
  available: number | null
  prizeName: string | null
  prizeDescription: string | null
  createdAt: string
  updatedAt: string
}

export interface HackathonSponsorTierInsert extends Omit<HackathonSponsorTier, 'id' | 'createdAt' | 'updatedAt'> {
  id?: string
  createdAt?: string
  updatedAt?: string
}

export interface HackathonPrize {
  id: string
  hackathon_id: string
  name: string
  description: string
  value?: string | null
  created_at: string
  updated_at: string
}

export interface HackathonPrizeInsert {
  hackathon_id: string
  name: string
  description: string
  value?: string | null
  created_at?: string
  updated_at?: string
}

export interface HackathonPrizeUpdate {
  name?: string
  description?: string
  value?: string | null
  updated_at?: string
}

export interface HackathonParticipantWithUser extends HackathonParticipant {
  name?: string
  avatar?: string
  username: string | null
}

export interface HackathonWithRelations extends Hackathon {
  judges?: HackathonJudge[]
  sponsorTiers?: HackathonSponsorTier[]
  sponsors?: HackathonSponsor[]
  sponsorsByTier?: Record<string, HackathonSponsor[]>
  participantsList?: HackathonParticipantWithUser[]
  prizes?: HackathonPrize[]
}

export type HackathonVote = Database['public']['Tables']['hackathon_votes']['Row']
export type HackathonVoteInsert = Database['public']['Tables']['hackathon_votes']['Insert']
export type HackathonVoteUpdate = Database['public']['Tables']['hackathon_votes']['Update']

// Helper type for vote counts
export interface VoteCount {
  category: string
  participant_id: string
  vote_count: number
}

// Extended type for hackathon with vote counts
export interface HackathonWithVotes extends HackathonBase {
  vote_counts?: VoteCount[]
  user_votes?: HackathonVote[]
} 