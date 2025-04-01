import { Metadata } from "next"
import { requireAdmin } from "@/lib/auth-utils"
import { HackathonCreateForm } from "@/components/hackathon/create-form/hackathon-create-form"
import { AdminBreadcrumb } from "@/components/nav/admin-breadcrumb"

export const metadata: Metadata = {
  title: "Create Hackathon | vibecode.party",
  description: "Create a new hackathon event on vibecode.party",
}

export default async function CreateHackathonPage() {
  // Check if the user is an admin
  await requireAdmin()

  return (
    <div className="container py-10 max-w-5xl mx-auto">
      <AdminBreadcrumb items={[{ label: "Hackathons", href: "/admin/hackathons" }, { label: "Create" }]} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create New Hackathon</h1>
        <p className="text-muted-foreground">Fill out the form below to create a new hackathon event.</p>
      </div>

      <HackathonCreateForm />
    </div>
  )
}
