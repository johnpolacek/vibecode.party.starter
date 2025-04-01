export const navItems = [
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
] as const

export type NavItem = (typeof navItems)[number] 