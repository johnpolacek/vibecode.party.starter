"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogoLockup } from "@/components/graphics/logo-lockup"
import { cn } from "@/lib/utils"
import { navItems } from "@/lib/config/navigation"

interface MainNavProps {
  isAdmin: boolean
}

export function MainNav({ isAdmin }: MainNavProps) {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex md:gap-6 items-center">
      <Link href="/" className="mr-4">
        <LogoLockup />
      </Link>

      {navItems.map((item) => (
        <Link key={item.href} href={item.href} className={cn("text-sm mt-1 font-medium transition-colors hover:text-primary", pathname === item.href ? "text-primary" : "text-muted-foreground")}>
          {item.title}
        </Link>
      ))}

      {isAdmin && (
        <Link href="/admin" className={cn("text-sm mt-1 font-medium transition-colors hover:text-primary", pathname?.startsWith("/admin") ? "text-primary" : "text-muted-foreground")}>
          Admin
        </Link>
      )}
    </nav>
  )
}
