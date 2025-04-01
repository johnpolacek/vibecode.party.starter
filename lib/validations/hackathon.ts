import { z } from "zod"

// Judge validation schema
export const judgeSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  bio: z.string().optional().nullable(),
  picture: z.string().url().optional().nullable(),
  links: z.array(z.string().url()).optional().nullable(),
})

// Sponsor tier validation schema
export const sponsorTierSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  benefits: z.array(z.string()).min(1, "At least one benefit is required"),
  fixedAmount: z.number().nullable().optional(),
  minimumAmount: z.number().nullable().optional(),
  available: z.number().nullable().optional(),
}).refine(
  (data) => {
    // At least one of fixedAmount or minimumAmount must be specified
    return data.fixedAmount != null || data.minimumAmount != null;
  },
  {
    message: "Must specify either a fixed amount or minimum amount",
    path: ["fixedAmount"]
  }
)

// Sponsor validation schema
export const sponsorSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  tier: z.string().min(1, "Tier is required"),
  logo: z.string().optional().nullable(),
  link: z.string().url("Link must be a valid URL").min(1, "Link is required"),
})

// Prize validation schema
export const prizeSchema = z.object({
  id: z.string().optional(),
  hackathon_id: z.string().optional(),
  name: z.string().min(1, "Prize name is required"),
  description: z.string().min(1, "Prize description is required"),
  value: z.string().optional().nullable(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
})

// Hackathon creation validation schema
export const createHackathonSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens"),
  category: z.string().min(1, "Category is required"),
  coverImage: z.string().url().optional().nullable(),
  startDate: z.date({
    required_error: "Start date is required",
    invalid_type_error: "Start date must be a valid date",
  }),
  endDate: z.date({
    required_error: "End date is required",
    invalid_type_error: "End date must be a valid date",
  }),
  locationType: z.enum(["online", "in-person", "hybrid"], {
    required_error: "Location type is required",
  }),
  location: z.string().optional().nullable(),
  maxParticipants: z.number().int().positive().optional().nullable(),
  useJudgingPanel: z.boolean().default(false),
  judges: z.array(judgeSchema).optional(),
  rules: z.string().optional().nullable(),
  sponsorTiers: z.array(sponsorTierSchema).optional(),
  sponsors: z.array(sponsorSchema).optional(),
  prizes: z.array(prizeSchema).min(1, "At least one prize is required"),
  votingDuration: z.number().int().min(1).max(168).default(24),
  votingCategories: z.array(z.string().min(1, "Category name is required")).min(1, "At least one voting category is required").default(["Best Overall"]),
})
  .refine(
    (data) => {
      return data.endDate > data.startDate
    },
    {
      message: "End date must be after start date",
      path: ["endDate"],
    }
  )
  .refine(
    (data) => {
      if (data.locationType !== "online" && !data.location) {
        return false
      }
      return true
    },
    {
      message: "Location is required for in-person or hybrid events",
      path: ["location"],
    }
  )
  .refine(
    (data) => {
      if (data.useJudgingPanel && (!data.judges || data.judges.length === 0)) {
        return false
      }
      return true
    },
    {
      message: "At least one judge is required when using a judging panel",
      path: ["judges"],
    }
  )
  .refine(
    (data) => {
      if (data.prizes.some((prize) => !prize.name || !prize.description)) {
        return false
      }
      return true
    },
    {
      message: "All prizes must have a name and description",
      path: ["prizes"],
    }
  )

// Type for the validated hackathon creation input
export type CreateHackathonInput = z.infer<typeof createHackathonSchema>

// Type for the judge input
export type JudgeInput = z.infer<typeof judgeSchema>

// Type for the sponsor tier input
export type SponsorTierInput = z.infer<typeof sponsorTierSchema>

// Type for the sponsor input
export type SponsorInput = z.infer<typeof sponsorSchema>

// Type for the prize input
export type PrizeInput = z.infer<typeof prizeSchema> 