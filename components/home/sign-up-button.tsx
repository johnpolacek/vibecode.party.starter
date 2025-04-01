"use client"

import { Button } from "@/components/ui/button"
import { useUser, SignUpButton } from "@clerk/nextjs"

export function ParticipationButton() {
  const { isSignedIn, isLoaded } = useUser()

  if (!isLoaded || isSignedIn) {
    return null
  }

  return (
    <SignUpButton mode="modal">
      <Button size="xl">Sign Up to Participate</Button>
    </SignUpButton>
  )
}
