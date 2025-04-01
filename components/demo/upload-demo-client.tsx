"use client"

import { useState } from "react"
import { ImageUpload } from "@/components/ui/image-upload"
import { Card } from "@/components/ui/card"
import { SignInButton, useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"

export function UploadDemoClient() {
  const [imageUrl, setImageUrl] = useState("")
  const { isSignedIn, isLoaded } = useUser()

  if (!isLoaded) {
    return null // or a loading spinner
  }

  return (
    <Card className="p-6">
      {isSignedIn ? (
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-medium mb-2">Upload an Image</h3>
            <p className="text-sm text-muted-foreground mb-4">Drag and drop an image file or click to select one from your computer.</p>
            <ImageUpload value={imageUrl} onChange={setImageUrl} onRemove={() => setImageUrl("")} />
          </div>
          {imageUrl && (
            <div>
              <h3 className="text-lg font-medium mb-2">Uploaded Image URL</h3>
              <code className="block w-full p-4 bg-muted rounded-lg text-sm break-all">{imageUrl}</code>
            </div>
          )}
        </div>
      ) : (
        <div className="py-12 text-center space-y-4">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <LogIn className="w-6 h-6 text-primary" />
            </div>
          </div>
          <h3 className="text-lg font-medium">Sign in to Upload Files</h3>
          <p className="text-sm text-muted-foreground mb-6">You need to be signed in to use the file upload system.</p>
          <SignInButton mode="modal">
            <Button size="lg">Sign in to Continue</Button>
          </SignInButton>
        </div>
      )}
    </Card>
  )
}
