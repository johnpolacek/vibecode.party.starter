"use client"

import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"
import { trackVisit } from "@/app/_actions/track-visit"

export function RouteTracker() {
  const pathname = usePathname()
  const isFirstMount = useRef(true)

  useEffect(() => {
    // Don't track the initial page load since that's handled by the server component
    if (isFirstMount.current) {
      isFirstMount.current = false
      return
    }

    // Track subsequent route changes
    trackVisit(pathname)
  }, [pathname])

  return null // This is a utility component that doesn't render anything
}
