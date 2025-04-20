"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, ShieldCheck } from "lucide-react"
import { LogoLockup } from "@/components/graphics/logo-lockup"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useUser } from "@clerk/nextjs"
import { useEffect } from "react"
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import { navItems } from "@/lib/config/navigation"
import { siteConfig } from "@/lib/config"
import Image from "next/image"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const pathname = usePathname()
  const { user, isSignedIn, isLoaded } = useUser()

  useEffect(() => {
    // Check if the user is an admin when the component mounts or user changes
    const checkAdminStatus = async () => {
      if (!isLoaded || !isSignedIn || !user?.id) {
        setIsAdmin(false)
        return
      }

      try {
        // Fetch admin status from the server
        const response = await fetch("/api/check-admin")
        if (response.ok) {
          const data = await response.json()
          setIsAdmin(data.isAdmin)
        } else {
          setIsAdmin(false)
        }
      } catch (error) {
        console.error("Error checking admin status:", error)
        setIsAdmin(false)
      }
    }

    checkAdminStatus()
  }, [isLoaded, isSignedIn, user?.id])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <div className="flex items-center justify-between border-b pb-4">
          <Link href="/" className="flex items-center space-x-2 pl-4 pt-4" onClick={() => setOpen(false)}>
            {siteConfig.title === ("Vibecode Party Starter" as string) ? (
              <LogoLockup />
            ) : (
              <div className="flex items-center gap-3">
                {siteConfig.logo && <Image src={siteConfig.logo} alt={siteConfig.title + " logo"} width={32} height={32} />}
                <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-br dark:bg-linear-to-br from-blue-500 via-purple-700 to-indigo-500 dark:from-blue-300 dark:via-purple-500 dark:to-indigo-500">
                  {siteConfig.title}
                </span>
              </div>
            )}
          </Link>
        </div>
        <nav className="mt-6 flex flex-col gap-4 pl-10">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn("text-lg font-medium transition-colors hover:text-primary", pathname === item.href ? "text-primary" : "text-muted-foreground")}
              onClick={() => setOpen(false)}
            >
              {item.title}
            </Link>
          ))}

          {/* Admin link - only visible to admin users */}
          {isAdmin && (
            <Link
              href="/admin"
              className={cn("text-lg font-medium transition-colors hover:text-primary flex items-center gap-2", pathname.startsWith("/admin") ? "text-primary" : "text-muted-foreground")}
              onClick={() => setOpen(false)}
            >
              <ShieldCheck className="h-5 w-5" />
              Admin
            </Link>
          )}
        </nav>
        <div className="mt-auto flex flex-col gap-4 p-8">
          <SignedOut>
            <SignUpButton mode="modal">
              <Button className="w-full" onClick={() => setOpen(false)}>
                Sign Up
              </Button>
            </SignUpButton>
            <SignInButton mode="modal">
              <Button variant="outline" className="w-full" onClick={() => setOpen(false)}>
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <div className="flex items-center justify-center">
              <UserButton afterSignOutUrl="/" userProfileUrl="/settings/profile" />
            </div>
          </SignedIn>
        </div>
      </SheetContent>
    </Sheet>
  )
}
