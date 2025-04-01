"use client"

import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"

export default function AuthButtons() {
  const { isSignedIn } = useAuth()

  return (
    <div className={`flex items-center overflow-hidden transition-[width] duration-300 ease-in-out ${isSignedIn === undefined ? "w-[40px]" : isSignedIn ? "w-[40px]" : "w-[180px] sm:w-[180px]"}`}>
      <SignedOut>
        <div className="flex gap-2 whitespace-nowrap">
          <SignInButton mode="modal">
            <Button variant="outline">Sign In</Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button variant="outline">Sign Up</Button>
          </SignUpButton>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="flex items-center">
          <UserButton afterSignOutUrl="/" userProfileUrl="/account" />
        </div>
      </SignedIn>
    </div>
  )
}
