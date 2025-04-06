"use client"

import { useUser } from "@clerk/nextjs"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function BioSection() {
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
