import { SponsorTier } from "@/types/hackathon"

export const defaultTiers: SponsorTier[] = [
  {
    id: crypto.randomUUID(),
    name: "Basic",
    description: "Support the event and get recognized",
    benefits: [
      "Company name & logo on event website",
      "Link to company website",
    ],
    minimumAmount: 0,
    available: null,
  },
  {
    id: crypto.randomUUID(),
    name: "Featured",
    description: "Enhanced visibility with featured placement",
    benefits: [
      "Featured placement on event website",
      "Link to company website",
      "Special callout in activity feed",
    ],
    minimumAmount: 50,
    available: 3,
  },
] 