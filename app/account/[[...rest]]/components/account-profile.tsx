"use client"

import { UserProfile, useUser } from "@clerk/nextjs"
import { BookText } from "lucide-react"
import { BioSection } from "./bio-section"

export function AccountProfile() {
  const { isLoaded, isSignedIn } = useUser()

  if (!isLoaded) {
    return null // or a loading spinner
  }

  if (!isSignedIn) {
    return null // we already handle this case in the parent
  }

  return (
    <UserProfile
      appearance={{
        elements: {
          rootBox: "mx-auto max-w-3xl",
          card: "shadow-none",
        },
      }}
      path="/account"
    >
      <UserProfile.Page label="Bio" url="bio" labelIcon={<BookText className="h-4 w-4" />}>
        <BioSection />
      </UserProfile.Page>
    </UserProfile>
  )
}
