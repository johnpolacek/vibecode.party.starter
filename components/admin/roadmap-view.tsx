"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heading } from "@/components/typography/heading"

export type Feature = {
  id: string
  title: string
  votes: number // Keeping this in the type for data compatibility
  status: "backlog" | "planned" | "in-progress" | "completed"
  description?: string
}

export type FeatureRequest = {
  id: string
  title: string
  votes: number // Keeping this in the type for data compatibility
  description?: string
}

interface RoadmapViewProps {
  features: Feature[]
  featureRequests: FeatureRequest[]
}

export function RoadmapView({ features, featureRequests }: RoadmapViewProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    backlog: false,
    planned: false,
    "in-progress": false,
    completed: false,
  })

  // Group features by status
  const backlogFeatures = features.filter((f) => f.status === "backlog").sort((a, b) => b.votes - a.votes)
  const plannedFeatures = features.filter((f) => f.status === "planned").sort((a, b) => b.votes - a.votes)
  const inProgressFeatures = features.filter((f) => f.status === "in-progress").sort((a, b) => b.votes - a.votes)
  const completedFeatures = features.filter((f) => f.status === "completed").sort((a, b) => b.votes - a.votes)

  // Sort feature requests by votes
  const sortedRequests = [...featureRequests].sort((a, b) => b.votes - a.votes)

  const toggleExpand = (section: string) => {
    setExpanded((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Function to limit and display cards
  const renderFeatureCards = (featureList: Feature[], status: string) => {
    const isExpanded = expanded[status]
    const displayedFeatures = isExpanded ? featureList : featureList.slice(0, 4)
    const hasMore = featureList.length > 4

    return (
      <>
        <div className="space-y-3">
          {displayedFeatures.map((feature) => (
            <Card key={feature.id} className="gap-2">
              <CardHeader>
                <CardTitle className="font-bold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>{feature.description && <p className="text-xs text-muted-foreground">{feature.description}</p>}</CardContent>
            </Card>
          ))}
        </div>
        {hasMore && (
          <Button variant="ghost" size="sm" className="w-full mt-2 text-xs" onClick={() => toggleExpand(status)}>
            {isExpanded ? (
              <>
                Show Less <ChevronUp className="ml-1 h-3 w-3" />
              </>
            ) : (
              <>
                Show More ({featureList.length - 4} more) <ChevronDown className="ml-1 h-3 w-3" />
              </>
            )}
          </Button>
        )}
      </>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-8 space-y-2">
          <Heading variant="h2">Product Roadmap</Heading>
          <p className="text-muted-foreground">See what features are coming next and share your ideas</p>
        </div>

        <div className="mb-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 p-4 gap-6">
            <div>
              <div className="font-medium text-lg mb-2 flex items-center gap-2">
                Backlog{" "}
                <Badge variant="outline" className="bg-gray-100 text-gray-700 hover:bg-gray-100 border-gray-200">
                  {backlogFeatures.length}
                </Badge>
              </div>
              {renderFeatureCards(backlogFeatures, "backlog")}
            </div>

            <div>
              <div className="font-medium text-lg mb-2 flex items-center gap-2">
                Up Next{" "}
                <Badge variant="outline" className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200">
                  {plannedFeatures.length}
                </Badge>
              </div>
              {renderFeatureCards(plannedFeatures, "planned")}
            </div>

            <div>
              <div className="font-medium text-lg mb-2 flex items-center gap-2">
                In Progress{" "}
                <Badge variant="secondary" className="bg-sky-100 text-sky-700 hover:bg-sky-100 border-sky-200">
                  {inProgressFeatures.length}
                </Badge>
              </div>
              {renderFeatureCards(inProgressFeatures, "in-progress")}
            </div>

            <div>
              <div className="font-medium text-lg mb-2 flex items-center gap-2">
                Completed <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200">{completedFeatures.length}</Badge>
              </div>
              {renderFeatureCards(completedFeatures, "completed")}
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-[2fr_1fr] container border-t-2 border-dashed border-primary/50 pt-12">
          <Card>
            <CardHeader>
              <CardTitle>Feature Ideas</CardTitle>
              <CardDescription>Community suggestions that may be added to the roadmap.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sortedRequests.map((request) => (
                  <div key={request.id} className="flex items-start gap-4 p-3 rounded-lg border">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{request.title}</span>
                        <Badge variant="outline" className="bg-foreground/10 text-foreground">
                          Idea
                        </Badge>
                      </div>
                      {request.description && <p className="text-sm text-muted-foreground">{request.description}</p>}
                    </div>
                  </div>
                ))}
                {featureRequests.length === 0 && (
                  <p className="text-sm text-muted-foreground border border-dashed border-foreground/10 rounded-md px-4 py-12 justify-center items-center flex">
                    No feature requests yet. Be the first to suggest a feature!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Suggest a Feature</CardTitle>
                <CardDescription>What would you like to see in our product?</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <a href="/contact">
                    Suggest a Feature <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Get Updates</CardTitle>
                <CardDescription>Subscribe to be notified when features are released</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <a href="/subscribe">
                    Subscribe to Updates <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
