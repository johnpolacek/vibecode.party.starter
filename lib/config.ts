export const siteConfig = {
  title: "Vibestarter Test9",
  description: "Testing vibecode party starter",
  shortDescription: "Testing vibecode party starter",
  url: "vibestarter-test9.vercel.app",
  shareImage: "",
  x: "johnpolacek",
  github: "johnpolacek/vibestarter-test9",
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