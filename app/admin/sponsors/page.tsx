import { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { requireAdmin } from "@/lib/auth-utils"
import { supabaseAdmin } from "@/lib/supabase"
import { Badge } from "@/components/ui/badge"
import { AdminBreadcrumb } from "@/components/nav/admin-breadcrumb"
import { SponsorCard } from "@/components/admin/sponsor-card"
import type { SponsorWithRelations } from "@/types/hackathon"

export const metadata: Metadata = {
  title: "Manage Sponsors",
  description: "Review and manage hackathon sponsors",
}

export default async function AdminSponsorsPage() {
  // Check if the user is an admin
  await requireAdmin()

  // Fetch all sponsors with hackathon and tier info
  const { data: sponsors } = await supabaseAdmin
    .from("hackathon_sponsors")
    .select(
      `
      *,
      hackathons (
        id,
        title,
        slug
      ),
      hackathon_sponsor_tiers (
        id,
        name,
        fixed_amount,
        minimum_amount
      )
    `
    )
    .order("created_at", { ascending: false })

  // Group sponsors by approval status
  const pendingSponsors = ((sponsors as SponsorWithRelations[]) || []).filter((s) => s.approval_status === "pending")
  const approvedSponsors = ((sponsors as SponsorWithRelations[]) || []).filter((s) => s.approval_status === "approved")
  const rejectedSponsors = ((sponsors as SponsorWithRelations[]) || []).filter((s) => s.approval_status === "rejected")

  return (
    <div className="container py-10">
      <AdminBreadcrumb items={[{ label: "Sponsors" }]} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Manage Sponsors</h1>
        <p className="text-muted-foreground">Review and manage hackathon sponsors.</p>
      </div>

      {/* Pending Sponsors Section */}
      {pendingSponsors.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-semibold">Pending Approval</h2>
            <Badge variant="outline" className="h-6">
              {pendingSponsors.length}
            </Badge>
          </div>
          <div className="space-y-4">
            {pendingSponsors.map((sponsor) => (
              <SponsorCard key={sponsor.id} sponsor={sponsor} showApprovalActions />
            ))}
          </div>
        </div>
      )}

      {/* Approved Sponsors Section */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Approved Sponsors</h2>
        <div className="space-y-4">
          {approvedSponsors.length > 0 ? (
            approvedSponsors.map((sponsor) => <SponsorCard key={sponsor.id} sponsor={sponsor} />)
          ) : (
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">No approved sponsors yet.</CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Rejected Sponsors Section */}
      {rejectedSponsors.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Rejected Sponsors</h2>
          <div className="space-y-4">
            {rejectedSponsors.map((sponsor) => (
              <SponsorCard key={sponsor.id} sponsor={sponsor} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
