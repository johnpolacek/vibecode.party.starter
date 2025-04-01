import { Metadata } from "next"
import { AdminCommunityTable } from "@/components/admin/community-suggestions-table"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { AdminBreadcrumb } from "@/components/nav/admin-breadcrumb"

export const metadata: Metadata = {
  title: "Admin - Community Suggestions",
  description: "Manage community hackathon suggestions",
}

export default async function AdminCommunitySuggestionsPage() {
  // Get the user's ID from Clerk
  const { userId } = await auth()

  // If not authenticated, redirect to sign-in
  if (!userId) {
    redirect("/sign-in")
  }

  // In a real app, you would check if the user has admin permissions
  // For now, we'll just use a hardcoded list of admin user IDs
  const adminUserIds = process.env.ADMIN_USER_IDS?.split(",") || []

  // If the user is not an admin, redirect to the homepage
  if (!adminUserIds.includes(userId)) {
    redirect("/")
  }

  return (
    <div className="container py-10">
      <AdminBreadcrumb items={[{ label: "Community Suggestions" }]} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Community Suggestions Admin</h1>
        <p className="text-muted-foreground">Review and manage community hackathon suggestions.</p>
      </div>

      <AdminCommunityTable />
    </div>
  )
}
