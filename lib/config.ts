export const siteConfig = {
  title: "Vibecode Party Starter",
  description: "The full stack Next.js starter project for vibe coding.",
  shortDescription: "The full stack Next.js starter project for vibe coding.",
  url: "https://starter.vibecode.party",
  shareImage: "https://starter.vibecode.party/screenshot.png",
  x: "johnpolacek",
  github: "https://github.com/johnpolacek/vibecode.party.starter",
  logo: ""
} as const

export type SiteConfig = {
    title: string
    description: string
    shortDescription: string
    url: string
    shareImage: string
    x: string
    github: string
    logo: string
}