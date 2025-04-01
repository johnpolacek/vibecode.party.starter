 

import { supabaseAdmin } from "@/lib/supabase"
import { 
  Hackathon, 
  HackathonJudge,
  HackathonJudgeInsert, 
  HackathonSponsor,
  HackathonSponsorInsert, 
  HackathonSponsorTier,
  HackathonSponsorTierInsert,
  HackathonParticipant,
  HackathonPrize,
  HackathonPrizeInsert
} from "@/types/supabase"
import { CreateHackathonInput } from "@/lib/validations/hackathon"
import { clerkClient } from "@clerk/nextjs/server"
import { PostgrestError } from "@supabase/supabase-js"

// Add interface before class definition
interface RawHackathonSponsorTier {
  id: string
  hackathon_id: string | number
  name: string
  description: string | null
  benefits: string[] | null
  fixed_amount: number | null
  minimum_amount: number | null
  available: number | null
  prize_name: string | null
  prize_description: string | null
  created_at: string
  updated_at: string
}

export class HackathonService {
  /**
   * Check if the hackathons table exists
   */
  static async ensureTablesExist(): Promise<boolean> {
    try {
      // Directly query the hackathons table to see if it exists
      const { error } = await supabaseAdmin
        .from('hackathons')
        .select('id')
        .limit(1);
      
      if (error) {
        console.error("Error accessing hackathons table:", error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error("Error ensuring tables exist:", error);
      return false;
    }
  }

  /**
   * Calculate the status of a hackathon based on its dates
   */
  static calculateHackathonStatus(startDate: Date, endDate: Date): "upcoming" | "live" | "completed" {
    const now = new Date()
    
    if (now < startDate) {
      return "upcoming"
    } else if (now >= startDate && now <= endDate) {
      return "live"
    } else {
      return "completed"
    }
  }

  /**
   * Create a new hackathon with related judges, sponsor tiers, and sponsors
   */
  static async createHackathon(data: CreateHackathonInput): Promise<Hackathon> {
    try {
      // Start a transaction
      const { data: hackathon, error: hackathonError } = await supabaseAdmin
        .from("hackathons")
        .insert({
          title: data.title,
          description: data.description,
          slug: data.slug,
          category: data.category,
          cover_image: data.coverImage || null,
          start_date: data.startDate.toISOString(),
          end_date: data.endDate.toISOString(),
          location_type: data.locationType,
          use_judging_panel: data.useJudgingPanel,
          rules: data.rules || null,
          tags: [data.category], // Initialize tags with the category
          // Temporarily set created_by to null until we resolve the UUID format issue
          created_by: null,
          // We don't need to set status as we'll calculate it on-the-fly
        })
        .select()
        .single()

      if (hackathonError) {
        console.error("Error creating hackathon:", hackathonError)
        console.error("Error details:", JSON.stringify(hackathonError, null, 2))
        throw new Error(`Failed to create hackathon: ${hackathonError.message}`)
      }

      if (!hackathon) {
        console.error("No hackathon data returned after insert")
        throw new Error("Failed to create hackathon: No data returned from insert operation")
      }

      // Add judges if provided
      if (data.judges && data.judges.length > 0 && hackathon) {
        const judgesData: HackathonJudgeInsert[] = data.judges.map((judge) => ({
          hackathon_id: hackathon.id,
          name: judge.name,
          bio: judge.bio || null,
          picture: judge.picture || null,
          links: judge.links || null,
        }))

        const { error: judgesError } = await supabaseAdmin
          .from("hackathon_judges")
          .insert(judgesData)

        if (judgesError) {
          console.error("Error adding judges:", judgesError)
          console.error("Error details:", JSON.stringify(judgesError, null, 2))
          // We don't throw here to avoid rolling back the hackathon creation
        }
      }

      // Add sponsor tiers if provided
      if (data.sponsorTiers && data.sponsorTiers.length > 0 && hackathon) {
        const tierData: HackathonSponsorTierInsert[] = data.sponsorTiers.map((tier) => ({
          hackathonId: hackathon.id,
          name: tier.name,
          description: tier.description || null,
          benefits: tier.benefits || [],
          fixedAmount: tier.fixedAmount ? tier.fixedAmount / 100 : null,
          minimumAmount: tier.minimumAmount ? tier.minimumAmount / 100 : null,
          available: tier.available || null,
          prizeName: null,
          prizeDescription: null
        }))

        const { data: insertedTiers, error: tiersError } = await supabaseAdmin
          .from("hackathon_sponsor_tiers")
          .insert(tierData.map(tier => ({
            hackathon_id: tier.hackathonId,
            name: tier.name,
            description: tier.description,
            benefits: tier.benefits,
            fixed_amount: tier.fixedAmount,
            minimum_amount: tier.minimumAmount,
            available: tier.available,
            prize_name: tier.prizeName,
            prize_description: tier.prizeDescription
          })))
          .select()

        if (tiersError) {
          console.error("Error adding sponsor tiers:", tiersError)
          console.error("Error details:", JSON.stringify(tiersError, null, 2))
          // We don't throw here to avoid rolling back the hackathon creation
        } else {
          console.log("Sponsor tiers added successfully:", insertedTiers)
        }

        // Add sponsors if provided
        if (data.sponsors && data.sponsors.length > 0 && insertedTiers) {
          console.log(`Adding ${data.sponsors.length} sponsors to hackathon`)
          // Create a map of tier names to tier IDs
          const tierMap = new Map<string, string>()
          
          // Map the inserted tiers to their IDs
          for (let i = 0; i < data.sponsorTiers.length; i++) {
            if (insertedTiers[i]) {
              tierMap.set(data.sponsorTiers[i].name, insertedTiers[i].id)
            }
          }

          console.log("Tier map:", Object.fromEntries(tierMap))

          const sponsorsData: HackathonSponsorInsert[] = data.sponsors
            .filter((sponsor) => tierMap.has(sponsor.tier)) // Only include sponsors with valid tiers
            .map((sponsor) => ({
              hackathon_id: hackathon.id,
              tier_id: tierMap.get(sponsor.tier)!,
              name: sponsor.name,
              logo: sponsor.logo || null,
              link: sponsor.link,
            }))

          if (sponsorsData.length > 0) {
            console.log("Sponsors data to insert:", JSON.stringify(sponsorsData, null, 2))
            const { error: sponsorsError } = await supabaseAdmin
              .from("hackathon_sponsors")
              .insert(sponsorsData)

            if (sponsorsError) {
              console.error("Error adding sponsors:", sponsorsError)
              console.error("Error details:", JSON.stringify(sponsorsError, null, 2))
              // We don't throw here to avoid rolling back the hackathon creation
            } else {
              console.log("Sponsors added successfully")
            }
          }
        }
      }

      // Add prizes
      if (data.prizes && data.prizes.length > 0 && hackathon) {
        console.log(`Adding ${data.prizes.length} prizes to hackathon`)
        const prizesData: HackathonPrizeInsert[] = data.prizes.map((prize) => ({
          hackathon_id: hackathon.id,
          name: prize.name,
          description: prize.description,
          value: prize.value || null,
        }))

        const { error: prizesError } = await supabaseAdmin
          .from("hackathon_prizes")
          .insert(prizesData)

        if (prizesError) {
          console.error("Error adding prizes:", prizesError)
          console.error("Error details:", JSON.stringify(prizesError, null, 2))
          // We don't throw here to avoid rolling back the hackathon creation
        } else {
          console.log("Prizes added successfully")
        }
      }

      // Calculate and add the status to the returned hackathon
      const calculatedStatus = this.calculateHackathonStatus(
        new Date(hackathon.start_date),
        new Date(hackathon.end_date)
      )
      
      console.log("Returning hackathon with calculated status:", calculatedStatus)
      
      return {
        ...hackathon,
        status: calculatedStatus
      }
    } catch (error) {
      console.error("Error in createHackathon:", error)
      throw error
    }
  }

  /**
   * Get a hackathon by slug with optional related data
   */
  static async getHackathonBySlug(
    slug: string, 
    options?: { 
      includeJudges?: boolean
      includeSponsors?: boolean
      includeParticipants?: boolean
      includePrizes?: boolean
    }
  ): Promise<Hackathon | null> {
    const { data, error } = await supabaseAdmin
      .from("hackathons_with_counts")
      .select("*, participant_count")
      .eq("slug", slug)
      .single()

    if (error) {
      if (error.code === "PGRST116") {
        // PGRST116 is the error code for "no rows returned"
        return null
      }
      
      console.error("Error fetching hackathon by slug:", error)
      throw new Error(`Failed to fetch hackathon: ${error.message}`)
    }

    if (!data) {
      return null
    }

    // Fetch related data if requested
    const [judges, sponsorTiers, sponsors, participants, prizes] = await Promise.all([
      options?.includeJudges ? this.getHackathonJudges(data.id) : Promise.resolve([]),
      options?.includeSponsors ? this.getHackathonSponsorTiers(data.id) : Promise.resolve([]),
      options?.includeSponsors ? this.getHackathonSponsors(data.id) : Promise.resolve([]),
      options?.includeParticipants ? this.getHackathonParticipants(data.id) : Promise.resolve({ participants: [], count: 0 }),
      options?.includePrizes ? this.getHackathonPrizes(data.id) : Promise.resolve([]),
    ])

    // Calculate the status
    const status = this.calculateHackathonStatus(
      new Date(data.start_date),
      new Date(data.end_date)
    )

    // Return the hackathon with related data
    return {
      ...data,
      status,
      judges: options?.includeJudges ? judges : undefined,
      sponsorTiers: options?.includeSponsors ? sponsorTiers : undefined,
      sponsors: options?.includeSponsors ? sponsors : undefined,
      participants_list: options?.includeParticipants ? participants.participants : undefined,
      prizes: options?.includePrizes ? prizes : undefined,
    }
  }

  /**
   * Get all hackathons with optional filtering
   */
  static async getHackathons(options?: {
    status?: "upcoming" | "live" | "completed"
    category?: string
    limit?: number
    offset?: number
  }): Promise<{ hackathons: Hackathon[]; count: number }> {
    let query = supabaseAdmin.from("hackathons_with_counts").select("*, participant_count")

    // Apply category filter if provided
    if (options?.category) {
      query = query.eq("category", options.category)
    }

    // Get all hackathons first
    const { data, error } = await query

    if (error) {
      console.error("Error fetching hackathons:", error)
      throw new Error(`Failed to fetch hackathons: ${error.message}`)
    }

    if (!data) {
      return { hackathons: [], count: 0 }
    }

    // Convert participant_count to participants for backwards compatibility
    const hackathonsWithParticipants = data.map(h => ({
      ...h,
      participants: h.participant_count
    }))

    // Calculate status for each hackathon
    const hackathonsWithStatus = hackathonsWithParticipants.map(hackathon => {
      const status = this.calculateHackathonStatus(
        new Date(hackathon.start_date),
        new Date(hackathon.end_date)
      )
      return { ...hackathon, status }
    })

    // Apply status filter if provided
    let filteredHackathons = hackathonsWithStatus
    if (options?.status) {
      filteredHackathons = hackathonsWithStatus.filter(
        hackathon => hackathon.status === options.status
      )
    }

    // Sort by start date (upcoming first)
    filteredHackathons.sort((a, b) => 
      new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
    )

    // Calculate the new count after filtering
    const filteredCount = filteredHackathons.length

    // Apply pagination
    let paginatedHackathons = filteredHackathons
    if (options?.limit) {
      const start = options.offset || 0
      const end = start + options.limit
      paginatedHackathons = filteredHackathons.slice(start, end)
    }

    return { 
      hackathons: paginatedHackathons, 
      count: filteredCount 
    }
  }

  /**
   * Get judges for a hackathon
   */
  static async getHackathonJudges(hackathonId: string): Promise<HackathonJudge[]> {
    const { data, error } = await supabaseAdmin
      .from("hackathon_judges")
      .select("*")
      .eq("hackathon_id", hackathonId)
      .order("name", { ascending: true })

    if (error) {
      console.error("Error fetching hackathon judges:", error)
      throw new Error(`Failed to fetch hackathon judges: ${error.message}`)
    }

    return (data || []).map(judge => ({
      id: judge.id,
      hackathon_id: judge.hackathon_id,
      name: judge.name,
      bio: judge.bio,
      picture: judge.picture,
      links: judge.links,
      created_at: judge.created_at,
      updated_at: judge.updated_at
    }))
  }

  /**
   * Get sponsor tiers for a hackathon
   */
  static async getHackathonSponsorTiers(hackathonId: string): Promise<HackathonSponsorTier[]> {
    const { data, error } = await supabaseAdmin
      .from("hackathon_sponsor_tiers")
      .select("*")
      .eq("hackathon_id", hackathonId)
      .order("name", { ascending: true }) as { 
        data: RawHackathonSponsorTier[] | null
        error: PostgrestError | null 
      }

    if (error) {
      console.error("Error fetching hackathon sponsor tiers:", error)
      throw new Error(`Failed to fetch hackathon sponsor tiers: ${error.message}`)
    }
    
    // Transform database column names to match frontend types
    return (data || []).map(tier => ({
      id: tier.id,
      hackathonId: Number(tier.hackathon_id), // Convert to number and use camelCase
      name: tier.name,
      description: tier.description,
      benefits: tier.benefits || [],
      fixedAmount: tier.fixed_amount,
      minimumAmount: tier.minimum_amount,
      available: tier.available,
      prizeName: tier.prize_name,
      prizeDescription: tier.prize_description,
      createdAt: tier.created_at,
      updatedAt: tier.updated_at
    }))
  }

  /**
   * Get sponsors for a hackathon
   */
  static async getHackathonSponsors(hackathonId: string): Promise<HackathonSponsor[]> {
    const { data, error } = await supabaseAdmin
      .from("hackathon_sponsors")
      .select("*")
      .eq("hackathon_id", hackathonId)
      .order("name", { ascending: true })

    if (error) {
      console.error("Error fetching hackathon sponsors:", error)
      throw new Error(`Failed to fetch hackathon sponsors: ${error.message}`)
    }

    return (data || []).map(sponsor => ({
      id: sponsor.id,
      hackathon_id: sponsor.hackathon_id,
      tier_id: sponsor.tier_id,
      name: sponsor.name,
      logo: sponsor.logo,
      link: sponsor.link,
      amount: sponsor.amount,
      payment_status: sponsor.payment_status,
      stripe_session_id: sponsor.stripe_session_id,
      stripe_payment_intent_id: sponsor.stripe_payment_intent_id,
      paid_at: sponsor.paid_at,
      created_at: sponsor.created_at,
      updated_at: sponsor.updated_at,
      prize_name: sponsor.prize_name,
      prize_description: sponsor.prize_description,
      created_by: sponsor.created_by,
      approval_status: sponsor.approval_status || "pending",
      approved_at: sponsor.approved_at,
      approved_by: sponsor.approved_by,
      rejection_reason: sponsor.rejection_reason,
      rejected_at: sponsor.rejected_at,
      rejected_by: sponsor.rejected_by
    }))
  }

  /**
   * Get participants for a hackathon
   */
  static async getHackathonParticipants(hackathonId: string): Promise<{ 
    participants: HackathonParticipant[],
    count: number 
  }> {
    try {
      // Fetch participants from the hackathon_participants table
      const { data, error, count } = await supabaseAdmin
        .from("hackathon_participants")
        .select("*", { count: 'exact' })
        .eq("hackathon_id", hackathonId)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching hackathon participants:", error)
        throw new Error(`Failed to fetch hackathon participants: ${error.message}`)
      }

      // Get user information for each participant
      if (data) {
        const client = await clerkClient()
        const participantsWithUserInfo = await Promise.all(data.map(async (participant) => {
          const user = await client.users.getUser(participant.user_id)
          const enrichedParticipant = {
            ...participant,
            name: user.firstName && user.lastName ? 
              `${user.firstName} ${user.lastName}` : 
              user.firstName || 
              user.username || 
              'Anonymous',
            username: user.username,
            avatar: user.imageUrl
          }
          return enrichedParticipant
        }))

        return { 
          participants: participantsWithUserInfo,
          count: count || 0
        }
      }

      return { participants: [], count: 0 }
    } catch (error) {
      console.error("Error in getHackathonParticipants:", error)
      return { participants: [], count: 0 }
    }
  }

  /**
   * Get prizes for a hackathon
   */
  static async getHackathonPrizes(hackathonId: string): Promise<HackathonPrize[]> {
    const { data, error } = await supabaseAdmin
      .from("hackathon_prizes")
      .select("*")
      .eq("hackathon_id", hackathonId)
      .order("created_at", { ascending: true })

    if (error) {
      console.error("Error fetching hackathon prizes:", error)
      throw new Error(`Failed to fetch hackathon prizes: ${error.message}`)
    }

    return data || []
  }
} 