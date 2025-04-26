import { Card } from "@/components/ui/card"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { Heading } from "@/components/typography/heading"
import { siteConfig } from "@/lib/config"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, AlertCircle } from "lucide-react"

const defaultSiteConfig = {
  title: "Vibecode Party Starter",
  description: "A modern Next.js starter with authentication, database, storage, AI, and more.",
  shortDescription: "Next.js Starter with Clerk, Convex, AWS & AI",
  url: "https://starter.vibecode.party",
  shareImage: "https://starter.vibecode.party/screenshot.png",
  x: "",
  github: "",
  logo: "",
}

type ConfigStatus = {
  value: string
  isDefault: boolean
  label: string
  suggestion: string
  required?: boolean
}

export default async function GetStartedConfig() {
  // Check if we're on localhost
  const headersList = await headers()
  const host = headersList.get("host") || ""
  const isLocalhost = host.includes("localhost") || host.includes("127.0.0.1")

  // If not localhost, redirect to home
  if (!isLocalhost) {
    redirect("/")
  }

  const configStatus: Record<string, ConfigStatus> = {
    title: {
      value: siteConfig.title,
      isDefault: siteConfig.title === defaultSiteConfig.title,
      label: "Site Title",
      suggestion: "Your site name",
      required: true,
    },
    description: {
      value: siteConfig.description,
      isDefault: siteConfig.description === defaultSiteConfig.description,
      label: "Description",
      suggestion: "Your site description",
      required: true,
    },
    shortDescription: {
      value: siteConfig.shortDescription,
      isDefault: siteConfig.shortDescription === defaultSiteConfig.shortDescription,
      label: "Short Description",
      suggestion: "Brief tagline for your site",
      required: true,
    },
    url: {
      value: siteConfig.url,
      isDefault: siteConfig.url === defaultSiteConfig.url,
      label: "URL",
      suggestion: "https://yoursite.com",
      required: false,
    },
    shareImage: {
      value: siteConfig.shareImage,
      isDefault: siteConfig.shareImage === defaultSiteConfig.shareImage,
      label: "Share Image",
      suggestion: "https://yoursite.com/screenshot.png",
      required: false,
    },
  }

  const defaultCount = Object.values(configStatus).filter((status) => status.required && status.isDefault).length
  const needsUpdate = defaultCount > 0

  return (
    <div className="max-w-4xl mx-auto px-4 w-full mb-4">
      <Card className="p-6 mt-4 w-full">
        <div className="flex items-center gap-2 mb-3">
          <Heading variant="h4" className={`text-base ${needsUpdate ? "text-yellow-600" : "text-green-600"}`}>
            {needsUpdate ? "Setup Required: Site Configuration" : "Site Configuration"}
          </Heading>
          {needsUpdate ? (
            <Badge variant="outline" className="text-yellow-600 border-yellow-600">
              <AlertCircle className="w-3 h-3 mr-1" />
              {defaultCount} required
            </Badge>
          ) : (
            <Badge variant="outline" className="text-green-600 border-green-600">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Complete
            </Badge>
          )}
        </div>

        <div className="rounded-lg border bg-card divide-y -mt-6">
          {Object.entries(configStatus).map(([key, status]) => (
            <div key={key} className="flex items-center justify-between p-2 gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="font-medium text-sm">{status.label}</span>
                  {!status.required && (
                    <Badge variant="secondary" className="text-[10px] px-1 py-0 h-4">
                      Optional
                    </Badge>
                  )}
                </div>
                <div className="text-xs text-muted-foreground truncate">{status.value || "(none provided)"}</div>
              </div>
              {status.isDefault && (
                <Badge variant="outline" className={`text-[10px] px-1.5 py-0 h-4 shrink-0 ${status.required ? "text-yellow-600 border-yellow-600" : "text-muted-foreground border-muted"}`}>
                  {status.required ? "Needs Update" : "Default"}
                </Badge>
              )}
            </div>
          ))}
        </div>

        {needsUpdate && (
          <>
            <p className="text-sm text-muted-foreground -mb-4">
              Update in <code className="px-1.5 py-0.5 bg-muted rounded text-xs">lib/config.ts</code>
            </p>
            <pre className="text-xs p-3 bg-muted rounded-md overflow-x-auto">
              <code>{`export const siteConfig = {
  title: "Your Site Name",
  description: "Your site description",
  shortDescription: "Brief tagline",
  url: "https://yoursite.com",      // Optional
  shareImage: "https://yoursite.com/og.png"  // Optional
} as const`}</code>
            </pre>
          </>
        )}
      </Card>
    </div>
  )
}
