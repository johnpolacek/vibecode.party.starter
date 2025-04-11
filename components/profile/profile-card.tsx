"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Calendar, CheckCircle, Globe, Twitter, Github, Link as LinkIcon } from "lucide-react"
import { EditProfile } from "@/components/edit-profile"
import { refreshProfile } from "@/app/_actions/profile"
import { Heading } from "@/components/typography/heading"

interface Link {
  label: string
  url: string
}

interface ProfileCardProps {
  user: {
    id: string
    username: string | null
    firstName: string | null
    lastName: string | null
    imageUrl: string
    unsafeMetadata?: Record<string, unknown>
  }
  bio: string
  status: string
  joinedDate: string
  path: string
}

export function ProfileCard({ user, bio, status, joinedDate, path }: ProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const name = user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.firstName || user.username || "Anonymous"
  const website = user.unsafeMetadata?.website as string
  const twitter = user.unsafeMetadata?.twitter as string
  const github = user.unsafeMetadata?.github as string
  const customLinks = (user.unsafeMetadata?.customLinks as Link[]) || []

  const handleUpdate = async () => {
    setIsEditing(false)
    await refreshProfile(path)
  }

  if (isEditing) {
    return (
      <Card>
        <CardContent className="pt-6">
          <EditProfile user={user} bio={bio} onUpdate={handleUpdate} isEditing={true} onCancel={() => setIsEditing(false)} onStartEdit={() => setIsEditing(true)} />
        </CardContent>
      </Card>
    )
  }

  const hasLinks = website || twitter || github || customLinks.length > 0

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center">
          <Link href={`/participants/${user.username}`} className="block hover:opacity-80 transition-opacity">
            <Avatar className="h-24 w-24 mb-4">
              {user.imageUrl && <AvatarImage src={user.imageUrl} alt={name} />}
              <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="space-y-2">
            <Link href={`/participants/${user.username}`} className="block hover:text-primary transition-colors">
              <Heading variant="h1" className="text-2xl font-bold">
                {name}
              </Heading>
            </Link>
            <div className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
              <CheckCircle className="mr-1 h-3 w-3" />
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </div>
          </div>

          {hasLinks && (
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {website && (
                <Button size="sm" variant="outline" asChild>
                  <a href={website.startsWith("http") ? website : `https://${website}`} target="_blank" rel="noopener noreferrer">
                    <Globe className="mr-2 h-4 w-4" />
                    Website
                  </a>
                </Button>
              )}
              {twitter && (
                <Button size="sm" variant="outline" asChild>
                  <a href={`https://x.com/${twitter}`} target="_blank" rel="noopener noreferrer">
                    <Twitter className="mr-2 h-4 w-4" />
                    Twitter/X
                  </a>
                </Button>
              )}
              {github && (
                <Button size="sm" variant="outline" asChild>
                  <a href={`https://github.com/${github}`} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </a>
                </Button>
              )}
              {customLinks.map((link, index) => (
                <Button key={index} size="sm" variant="outline" asChild>
                  <a href={link.url.startsWith("http") ? link.url : `https://${link.url}`} target="_blank" rel="noopener noreferrer">
                    <LinkIcon className="mr-2 h-4 w-4" />
                    {link.label}
                  </a>
                </Button>
              ))}
            </div>
          )}
        </div>

        <Separator className="my-6" />

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Heading variant="h2" className="font-medium">
                About
              </Heading>
              <EditProfile user={user} bio={bio} onUpdate={handleUpdate} isEditing={false} onCancel={() => setIsEditing(false)} onStartEdit={() => setIsEditing(true)} />
            </div>
            <p className={cn("text-sm", bio ? "text-foreground" : "text-muted-foreground italic")}>{bio || "No bio created yet"}</p>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Joined on {joinedDate}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
