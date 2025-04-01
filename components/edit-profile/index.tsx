"use client"

import { useState } from "react"
import { toast } from "sonner"
import { useUser } from "@clerk/nextjs"
import { Edit2, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { updateProfile } from "@/app/_actions/profile"

interface UserData {
  id: string
  username: string | null
  firstName: string | null
  lastName: string | null
  imageUrl: string
  unsafeMetadata?: Record<string, unknown>
}

interface Link {
  label: string
  url: string
}

interface EditProfileProps {
  user: UserData
  bio: string
  onUpdate: () => void
  isEditing: boolean
  onCancel: () => void
  onStartEdit: () => void
}

export function EditProfile({ user, bio, onUpdate, isEditing, onCancel, onStartEdit }: EditProfileProps) {
  const { user: currentUser } = useUser()
  const [loading, setLoading] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    bio: bio || "",
    website: {
      label: "Website",
      url: (user.unsafeMetadata?.website as string) || "",
    },
    twitter: {
      label: "Twitter",
      url: (user.unsafeMetadata?.twitter as string) || "",
    },
    github: {
      label: "GitHub",
      url: (user.unsafeMetadata?.github as string) || "",
    },
    customLinks: ((user.unsafeMetadata?.customLinks as Link[]) || []).map((link) => ({
      label: link.label || "",
      url: link.url || "",
    })),
  })

  const addCustomLink = () => {
    setProfileData((prev) => ({
      ...prev,
      customLinks: [...prev.customLinks, { label: "", url: "" }],
    }))
  }

  const removeCustomLink = (index: number) => {
    setProfileData((prev) => ({
      ...prev,
      customLinks: prev.customLinks.filter((_, i) => i !== index),
    }))
  }

  const updateCustomLink = (index: number, field: "label" | "url", value: string) => {
    setProfileData((prev) => ({
      ...prev,
      customLinks: prev.customLinks.map((link, i) => (i === index ? { ...link, [field]: value } : link)),
    }))
  }

  const isOwnProfile = currentUser?.username?.toLowerCase() === user.username?.toLowerCase()

  const handleSave = async () => {
    if (!currentUser || !isOwnProfile) return

    setLoading(true)
    try {
      const result = await updateProfile(currentUser.id, {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        bio: profileData.bio,
        website: profileData.website.url,
        twitter: profileData.twitter.url,
        github: profileData.github.url,
        customLinks: profileData.customLinks,
      })

      if (!result.success) {
        throw new Error(result.error)
      }

      toast.success("Profile updated", {
        description: "Your profile has been successfully updated.",
      })

      onUpdate()
    } catch (error) {
      console.error("Error updating profile:", error)
      toast.error("Error", {
        description: "Failed to update profile. Please try again.",
      })
    }
    setLoading(false)
  }

  if (!isOwnProfile) {
    return null
  }

  if (!isEditing) {
    return (
      <Button variant="outline" size="sm" onClick={onStartEdit}>
        <Edit2 className="mr-2 h-4 w-4" />
        Edit Profile
      </Button>
    )
  }

  return (
    <div className="space-y-4 w-full -mt-6">
      <h3 className="text-lg font-medium">Edit Profile</h3>
      <div>
        <Input placeholder="First Name" value={profileData.firstName} onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })} className="mb-2" />
        <Input placeholder="Last Name" value={profileData.lastName} onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })} />
      </div>
      <div>
        <h2 className="font-medium mb-2">About</h2>
        <Textarea placeholder="Tell us about yourself..." value={profileData.bio} onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })} rows={4} />
      </div>
      <div>
        <div className="space-y-4">
          <div className="space-y-2 pt-2">
            <Label>Website</Label>
            <Input
              data-testid="website-url"
              value={profileData.website.url}
              onChange={(e) => setProfileData({ ...profileData, website: { ...profileData.website, url: e.target.value } })}
              placeholder="URL (e.g. https://example.com)"
            />
          </div>

          <div className="space-y-2">
            <Label>Twitter/X</Label>
            <Input
              data-testid="twitter-username"
              value={profileData.twitter.url}
              onChange={(e) => setProfileData({ ...profileData, twitter: { ...profileData.twitter, url: e.target.value } })}
              placeholder="Username (without @)"
            />
          </div>

          <div className="space-y-2">
            <Label>GitHub</Label>
            <Input
              data-testid="github-username"
              value={profileData.github.url}
              onChange={(e) => setProfileData({ ...profileData, github: { ...profileData.github, url: e.target.value } })}
              placeholder="Username"
            />
          </div>

          {profileData.customLinks.map((link, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="h-4" />
                <Button type="button" variant="ghost" size="sm" onClick={() => removeCustomLink(index)} className="h-8 w-8 p-0">
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2">
                <Input data-testid={`custom-link-${index}-label`} value={link.label} onChange={(e) => updateCustomLink(index, "label", e.target.value)} placeholder="Label" className="w-1/3" />
                <Input data-testid={`custom-link-${index}-url`} value={link.url} onChange={(e) => updateCustomLink(index, "url", e.target.value)} placeholder="URL" className="flex-1" />
              </div>
            </div>
          ))}

          <Button type="button" variant="outline" size="sm" onClick={addCustomLink} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Custom Link
          </Button>
        </div>
      </div>
      <div className="flex justify-end gap-6 pt-4">
        <Button variant="ghost" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button id="saveProfileChanges" onClick={handleSave} disabled={loading} className="w-1/2">
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  )
}
