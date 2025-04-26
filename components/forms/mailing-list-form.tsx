"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { subscribe, updatePreferences } from "@/app/_actions/mailing-list"
import { toast } from "sonner"
import { MailingListPreferences } from "@/types/mailing-list"
import { useRouter } from "next/navigation"

export function MailingListForm({ initialEmail }: { initialEmail?: string }) {
  const router = useRouter()
  const { user, isSignedIn, isLoaded } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [preferences, setPreferences] = useState<MailingListPreferences>({
    marketing: true,
    updates: true,
  })

  if (!isLoaded) {
    return null
  }

  const handleSubscribe = async () => {
    if (!isSignedIn || !user?.emailAddresses?.[0]?.emailAddress) {
      toast.error("Please sign in to subscribe")
      return
    }

    try {
      setIsLoading(true)
      await subscribe({
        userId: user.id,
        email: initialEmail || user.emailAddresses[0].emailAddress,
        name: user.fullName || user.firstName || null,
        preferences,
      })
      toast.success("Successfully subscribed to the mailing list!")
      router.refresh()
    } catch (error) {
      console.error("Error subscribing:", error)
      toast.error("Failed to subscribe. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePreferenceChange = async (key: keyof MailingListPreferences) => {
    const newPreferences = {
      ...preferences,
      [key]: !preferences[key],
    }
    setPreferences(newPreferences)

    if (isSignedIn) {
      try {
        await updatePreferences({ preferences: newPreferences })
        toast.success("Preferences updated successfully")
        router.refresh()
      } catch (error) {
        console.error("Error updating preferences:", error)
        toast.error("Failed to update preferences")
        setPreferences(preferences)
      }
    }
  }

  return (
    <Card className="w-full max-w-[500px] p-4 md:mt-4">
      <CardHeader className="md:pt-4">
        <CardTitle className="text-lg">Subscribe to Our Mailing List</CardTitle>
        <CardDescription>Stay updated with our latest news and updates</CardDescription>
      </CardHeader>
      <CardContent className="md:pb-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Email Preferences</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="marketing" checked={preferences.marketing} onCheckedChange={() => handlePreferenceChange("marketing")} />
                <label htmlFor="marketing" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Marketing emails
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="updates" checked={preferences.updates} onCheckedChange={() => handlePreferenceChange("updates")} />
                <label htmlFor="updates" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Product updates
                </label>
              </div>
            </div>
          </div>

          {isSignedIn ? (
            <div className="flex gap-4">
              <Button onClick={handleSubscribe} disabled={isLoading || !isSignedIn}>
                Subscribe
              </Button>
            </div>
          ) : (
            <p className="border p-4 rounded-lg mt-6">
              Please{" "}
              <a href="/sign-in" className="text-primary hover:underline">
                sign in
              </a>{" "}
              to subscribe to our mailing list.
            </p>
          )}
          <p className="text-sm text-muted-foreground pt-4">We respect your privacy and will never share your information. You can unsubscribe at any time.</p>
        </div>
      </CardContent>
    </Card>
  )
}
