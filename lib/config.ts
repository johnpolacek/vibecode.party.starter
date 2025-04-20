export const siteConfig = {
  title: "VibeCademy",
  description: "Get the resources you need to learn how to vibecode",
  shortDescription: "Get the resources you need to learn how to vibecode",
  url: "vibecademy.vercel.app",
  shareImage: "https://starter.vibecode.party/screenshot.png",
  x: "",
  github: "",
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