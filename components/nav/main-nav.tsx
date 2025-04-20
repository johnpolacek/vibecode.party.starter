"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogoLockup } from "@/components/graphics/logo-lockup"
import { cn } from "@/lib/utils"
import { navItems } from "@/lib/config/navigation"
import { siteConfig } from "@/lib/config"
import Image from "next/image"
import { Icon } from "@radix-ui/react-select"
interface MainNavProps {
  isAdmin: boolean
}

export function MainNav({ isAdmin }: MainNavProps) {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex md:gap-6 items-center">
      <Link href="/" className="mr-4">
        {siteConfig.title === ("Vibecode Party Starter" as string) ? (
          <LogoLockup />
        ) : (
          <div className="flex items-center gap-3">
            {siteConfig.logo ? <Image src={siteConfig.logo} alt={siteConfig.title + " logo"} width={32} height={32} /> : <Icon />}
            <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-br dark:bg-linear-to-br from-blue-500 via-purple-700 to-indigo-500 dark:from-blue-300 dark:via-purple-500 dark:to-indigo-500">
              {siteConfig.title}
            </span>
          </div>
        )}
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
