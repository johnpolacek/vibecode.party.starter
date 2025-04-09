export const siteConfig = {
  title: "Vibecode Party Starter",
  description: "A modern Next.js starter with authentication, database, storage, AI, and more.",
  shortDescription: "Next.js Starter with Clerk, Supabase, AWS & AI",
  url: "https://starter.vibecode.party",
  shareImage: "https://starter.vibecode.party/screenshot.png",
  logo: ""
} as const

export type SiteConfig = {
    title: string
    description: string
    shortDescription: string
    url: string
    shareImage: string
    logo: string
}