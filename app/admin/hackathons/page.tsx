import { requireAdmin } from "@/lib/auth-utils"
import { AdminHackathonList } from "@/components/hackathon/admin/hackathon-list"
import { AdminBreadcrumb } from "@/components/nav/admin-breadcrumb"

export default async function AdminHackathonsPage() {
  // Check if the user is an admin
  await requireAdmin()

  return (
    <div className="container py-10">
      <AdminBreadcrumb items={[{ label: "Hackathons" }]} />

      <AdminHackathonList />
    </div>
  )
}
