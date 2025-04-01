import { requireAdmin } from "@/lib/auth-utils"
import { AdminBreadcrumb } from "@/components/nav/admin-breadcrumb"
import { AdminCommentList } from "@/components/comment/admin/comment-list"

export default async function AdminCommentsPage() {
  // Check if the user is an admin
  await requireAdmin()

  return (
    <div className="container py-8">
      <AdminBreadcrumb items={[{ label: "Comments" }]} />

      <div className="mb-8">
        <h1 className="text-4xl font-bold">Comments</h1>
        <p className="text-muted-foreground">Manage and moderate user comments</p>
      </div>

      <AdminCommentList />
    </div>
  )
}
