"use client"

import { UserProfile, useUser } from "@clerk/nextjs"
import { Container } from "@/components/ui/container"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { BookText } from "lucide-react"

function BioSection() {
  const { user } = useUser()
  const [bio, setBio] = useState((user?.unsafeMetadata?.bio as string) || "")
  const [isSaving, setIsSaving] = useState(false)

  const saveBio = async () => {
    if (!user) return
    setIsSaving(true)
    try {
      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          bio,
        },
      })
    } catch (error) {
      console.error("Error saving bio:", error)
    }
    setIsSaving(false)
  }

  return (
    <div className="rounded-lg border p-4">
      <h2 className="text-lg font-semibold mb-4">Your Bio</h2>
      <Textarea placeholder="Tell us about yourself..." value={bio} onChange={(e) => setBio(e.target.value)} className="mb-4" rows={4} />
      <Button onClick={saveBio} disabled={isSaving}>
        {isSaving ? "Saving..." : "Save Bio"}
      </Button>
    </div>
  )
}

export default function AccountPage() {
  return (
    <>
      <Container>
        <div className="py-16">
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
        </div>
      </Container>
    </>
  )
}
