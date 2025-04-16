import { RoadmapView, type Feature, type FeatureRequest } from "@/components/admin/roadmap-view"
import initialFeatures from "./data/features.json"
import initialRequests from "./data/featureRequests.json"

export default function RoadmapPage() {
  const features = initialFeatures as Feature[]
  const featureRequests = initialRequests as FeatureRequest[]

  return <RoadmapView features={features} featureRequests={featureRequests} />
}
