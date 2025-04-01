"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { sendHackathonNotification } from "@/app/_actions/notifications"
import { getHackathonsForNotification } from "@/app/_actions/hackathon"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

type NotificationTemplate = {
  id: string
  label: string
  getTitle: (hackathonTitle: string) => string
  getMessage: (hackathonTitle: string, options?: { hasVoting?: boolean; votingDuration?: string }, hackathon?: Hackathon) => string
}

type Hackathon = {
  id: string
  title: string
  slug: string
  has_voting: boolean
  voting_duration?: string
  voting_categories?: string[]
  start_date: string
  end_date: string
  location: string
  location_type: string
  max_participants: number
  rules: string
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  })
}

const getHackathonUrl = (slug: string) => {
  // Use window.location.origin in client components to get the current domain
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://vibecode.party"
  return `${baseUrl}/hackathons/${slug}`
}

const NOTIFICATION_TEMPLATES: NotificationTemplate[] = [
  {
    id: "going-live",
    label: "Hackathon Going Live",
    getTitle: (hackathonTitle) => `${hackathonTitle} is Now Live`,
    getMessage: (hackathonTitle, _, hackathon?: Hackathon) => {
      if (!hackathon) return ""
      const hackathonUrl = getHackathonUrl(hackathon.slug)
      return `The ${hackathonTitle} hackathon has officially begun!

Time to start building!
• You can now create your project and start submitting code
• You can connect your project to your GitHub repository
• Make sure you post project updates so they show up on the activity feed!

View the hackathon and submit your project here:
${hackathonUrl}

Good luck and happy hacking!`
    },
  },
  {
    id: "hackathon-ended-with-voting",
    label: "Hackathon Ended",
    getTitle: (hackathonTitle) => `${hackathonTitle} - Submissions Closed`,
    getMessage: (hackathonTitle, options, hackathon?: Hackathon) => {
      if (!hackathon) return ""
      const hackathonUrl = getHackathonUrl(hackathon.slug)
      const votingCategories = hackathon.voting_categories?.length ? `\n\nVoting Categories:\n${hackathon.voting_categories.map((cat) => `• ${cat}`).join("\n")}` : ""

      return `The ${hackathonTitle} hackathon has officially ended and submissions are now closed!

What happens next:
• Community voting is now open${options?.votingDuration ? ` and will run for ${options.votingDuration} hours` : ""}
• Review and vote on other projects to support the community${votingCategories}
• Winners will be announced after the voting period
• Stay tuned for the results announcement

Vote for your favorite projects here:
${hackathonUrl}

Thank you for participating and good luck in the voting phase!`
    },
  },
  {
    id: "hackathon-ended-no-voting",
    label: "Hackathon Ended",
    getTitle: (hackathonTitle) => `${hackathonTitle} - Submissions Closed`,
    getMessage: (hackathonTitle, _, hackathon?: Hackathon) => {
      if (!hackathon) return ""
      const hackathonUrl = getHackathonUrl(hackathon.slug)
      return `The ${hackathonTitle} hackathon has officially ended and submissions are now closed!

What happens next:
• Our judges will begin reviewing all submissions
• Winners will be announced soon
• Stay tuned for the results announcement

View all submissions here:
${hackathonUrl}

Thank you for participating and making this hackathon a success!

Final Statistics:
• Hackathon Duration: ${formatDate(hackathon.start_date)} to ${formatDate(hackathon.end_date)}
• Location Type: ${hackathon.location_type}${hackathon.location ? `\n• Location: ${hackathon.location}` : ""}`
    },
  },
]

export function SendNotificationForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [selectedHackathon, setSelectedHackathon] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [hackathons, setHackathons] = useState<Hackathon[]>([])
  const router = useRouter()

  // Fetch hackathons on component mount
  useEffect(() => {
    async function fetchHackathons() {
      const result = await getHackathonsForNotification()

      if (result.success) {
        setHackathons(result.data)
      } else {
        toast.error(result.error || "Failed to fetch hackathons")
      }
    }

    fetchHackathons()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedHackathon) {
      toast.error("Please select a hackathon")
      return
    }

    if (!title || !message) {
      toast.error("Please fill in all fields")
      return
    }

    try {
      setIsLoading(true)
      const result = await sendHackathonNotification({
        hackathonId: selectedHackathon,
        title,
        message,
      })

      if (result.success) {
        toast.success(`Notification sent to ${result.notificationsSent} participants`)
        // Reset form
        setTitle("")
        setMessage("")
        setSelectedHackathon("")
        setSelectedTemplate("")
        // Refresh the page to show new notification
        router.refresh()
      } else {
        toast.error(result.error || "Failed to send notification")
      }
    } catch {
      toast.error("An error occurred while sending the notification")
    } finally {
      setIsLoading(false)
    }
  }

  const applyTemplate = (templateId: string) => {
    const selectedHackathonData = hackathons.find((h) => h.id === selectedHackathon)
    if (!selectedHackathon || !selectedHackathonData) {
      toast.error("Please select a hackathon first")
      return
    }

    const template = NOTIFICATION_TEMPLATES.find((t) => t.id === templateId)
    if (!template) return

    setTitle(template.getTitle(selectedHackathonData.title))
    setMessage(
      template.getMessage(
        selectedHackathonData.title,
        {
          hasVoting: selectedHackathonData.has_voting,
          votingDuration: selectedHackathonData.voting_duration,
        },
        selectedHackathonData
      )
    )
  }

  // Update template when selection changes
  useEffect(() => {
    if (selectedTemplate) {
      applyTemplate(selectedTemplate)
    }
  }, [selectedTemplate])

  // Get available templates based on hackathon settings
  const getAvailableTemplates = () => {
    const hackathon = hackathons.find((h) => h.id === selectedHackathon)
    if (!hackathon) return []

    return NOTIFICATION_TEMPLATES.filter((template) => {
      if (template.id === "going-live") return true
      if (template.id === "hackathon-ended-with-voting") return hackathon.has_voting
      if (template.id === "hackathon-ended-no-voting") return !hackathon.has_voting
      return true
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send Notification</CardTitle>
        <CardDescription>Send a notification to all participants of a hackathon</CardDescription>
      </CardHeader>
      <CardContent>
        {hackathons.length === 0 ? (
          <div className="flex items-center justify-center h-full text-primary py-8">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="w-full">
                <label htmlFor="hackathon" className="text-sm font-medium">
                  Hackathon
                </label>
                <Select
                  value={selectedHackathon}
                  onValueChange={(value) => {
                    setSelectedHackathon(value)
                    setSelectedTemplate("")
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a hackathon" />
                  </SelectTrigger>
                  <SelectContent>
                    {hackathons.map((hackathon) => (
                      <SelectItem key={hackathon.id} value={hackathon.id}>
                        {hackathon.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 space-y-2">
                <label htmlFor="template" className="text-sm font-medium">
                  Message Template
                </label>
                <Select value={selectedTemplate} onValueChange={setSelectedTemplate} disabled={!selectedHackathon}>
                  <SelectTrigger>
                    <SelectValue placeholder={selectedHackathon ? "Select a template" : "Select a hackathon first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {getAvailableTemplates().map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Notification title" required />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write your message here..." required rows={4} />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Notification"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
