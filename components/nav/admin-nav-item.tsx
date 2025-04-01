"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { cn } from "@/lib/utils"
import { ShieldCheckIcon } from "lucide-react"

export function AdminNavItem() {
  const pathname = usePathname()
  const { user, isSignedIn, isLoaded } = useUser()
  const [isAdmin, setIsAdmin] = useState(false)

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

  // Only render the admin link if the user is an admin
  if (!isAdmin) {
    return null
  }

  return (
    <Link href="/admin" className={cn("text-sm font-medium transition-colors hover:text-primary flex items-center gap-1", pathname.startsWith("/admin") ? "text-primary" : "text-muted-foreground")}>
      <ShieldCheckIcon className="h-4 w-4" />
      Admin
    </Link>
  )
}
