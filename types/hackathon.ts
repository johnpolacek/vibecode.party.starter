import type { HackathonBase, HackathonParticipant, HackathonPrize, HackathonSponsor } from "./supabase"

export type HackathonStatus = "live" | "upcoming" | "completed"

export interface Judge {
  id: string
  name: string
  bio: string
  picture?: string
  links?: string[]
}

export interface Sponsor {
  id: string
  hackathon_id: number
  tier_id: string
  name: string
  logo: string
  link: string
  amount: number
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
  stripe_session_id?: string
  stripe_payment_intent_id?: string
  paid_at?: string
  created_at: string
  updated_at: string
  prize_name?: string | null
  prize_description?: string | null
  created_by: string
}

export interface SponsorWithTierName extends Sponsor {
  tier: string // The name of the tier, derived from tier_id
}

export interface SponsorWithRelations extends HackathonSponsor {
  hackathons?: {
    id: number
    title: string
    slug: string
  }
  hackathon_sponsor_tiers?: {
    id: string
    name: string
    fixed_amount: number | null
    minimum_amount: number | null
  }
}

export interface SponsorTier {
  id: string
  name: string
  description?: string
  benefits: string[]
  fixedAmount?: number | null
  minimumAmount?: number | null
  available?: number | null
}

export type PricingType = "fixed" | "minimum" | "custom"

// Extended HackathonParticipant type with user information
export interface HackathonParticipantWithUser extends HackathonParticipant {
  name?: string
  avatar?: string
  username: string | null
  status: string
  project_cover_image?: string | null
}

// Extended Hackathon type with computed status and additional fields
export interface HackathonExtendedData {
  title?: string // Optional since we'll use name from HackathonBase
  cover_image?: string
  location?: string
  location_type: "online" | "in-person" | "hybrid"
  participants?: number
  max_participants?: number
  tags: string[]
  status: HackathonStatus
  use_judging_panel: boolean
  category: string
  rules?: string
}

// Combine the base database type with our extended fields
export type Hackathon = HackathonBase & HackathonExtendedData

// Extended Hackathon type with related data
export interface HackathonWithRelations extends Hackathon {
  judges?: Judge[]
  sponsorTiers?: SponsorTier[]
  sponsors?: Sponsor[]
  sponsorsByTier?: Record<string, Sponsor[]>
  isUserRegistered?: boolean
  participants_list?: HackathonParticipantWithUser[]
  prizes?: HackathonPrize[]
}

export interface CreateHackathonInput {
  title: string
  description: string
  slug: string
  category: string
  coverImage: string
  startDate: Date
  endDate: Date
  locationType: "online" | "in-person" | "hybrid"
  useJudgingPanel: boolean
  judges: Judge[]
  sponsors: Sponsor[]
  sponsorTiers: SponsorTier[]
  rules: string
  prizes: HackathonPrize[]
  votingDuration: number
  votingCategories: string[]
} 