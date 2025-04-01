import { Heading } from "@/components/typography/heading"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { Blocks } from "lucide-react"
import Link from "next/link"
import { Icon } from "@/components/graphics/icon"

export default function AboutPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <Heading variant="h2" as="h1">
            About
          </Heading>
        </div>

        <div className="mb-8 space-y-6">
          <p>Replace this with your about page content...</p>
        </div>
      </div>
    </div>
  )
}
