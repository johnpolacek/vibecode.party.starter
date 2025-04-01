"use client"

import { useCallback, useState } from "react"
import { Button } from "@/components/ui/button"
import { ImagePlus, X } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"
import { useFileUpload } from "@/lib/upload-utils"

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  onRemove: () => void
  folder?: string
  id?: string
}

export function ImageUpload({ id, value, onChange, onRemove, folder = "uploads" }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const { upload } = useFileUpload({
    folder,
    allowedTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  })

  const handleUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(true)
        const imageUrl = await upload(file)
        onChange(imageUrl)
        toast.success("Image uploaded successfully!")
      } catch (error) {
        console.error("Error uploading image:", error)
        toast.error(error instanceof Error ? error.message : "Failed to upload image")
      } finally {
        setIsUploading(false)
      }
    },
    [onChange, upload]
  )

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border">
        {value ? (
          <>
            <Image src={value} alt="Project Cover" fill className="object-cover" />
            <Button variant="destructive" size="icon" className="absolute right-2 top-2" onClick={onRemove}>
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <label className="flex h-full w-full cursor-pointer items-center justify-center bg-muted">
            <div className="flex flex-col items-center gap-2">
              <ImagePlus className="h-8 w-8 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Upload Cover Image</span>
            </div>
            <input id={id} type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={isUploading} />
          </label>
        )}
      </div>
    </div>
  )
}
