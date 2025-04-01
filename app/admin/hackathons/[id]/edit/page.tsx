import { Metadata } from "next"
import { HackathonForm } from "@/components/hackathon/create-form/hackathon-create-form"
import { getHackathonById } from "@/app/_actions/hackathon"
import { notFound } from "next/navigation"
import { requireAdmin } from "@/lib/auth-utils"
import { AdminBreadcrumb } from "@/components/nav/admin-breadcrumb"

export const metadata: Metadata = {
  title: "Edit Hackathon | vibecode.party",
  description: "Edit an existing hackathon event on vibecode.party",
}

export default async function EditHackathonPage({ params }: { params: Promise<{ id: string }> }) {
  // Check if the user is an admin
  await requireAdmin()

  const { id } = await params
  const result = await getHackathonById(id)

  if (!result.success || !result.hackathon) {
    notFound()
  }

  return (
    <div className="container py-10 max-w-5xl mx-auto">
      <AdminBreadcrumb items={[{ label: "Hackathons", href: "/admin/hackathons" }, { label: "Edit" }]} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Edit Hackathon</h1>
        <p className="text-muted-foreground">Update the details of your hackathon event.</p>
      </div>

      <HackathonForm hackathon={result.hackathon} isEditing={true} />
    </div>
  )
}
