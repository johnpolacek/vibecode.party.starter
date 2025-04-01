import { requireAdmin } from "@/lib/auth-utils"
import { AdminBreadcrumb } from "@/components/nav/admin-breadcrumb"
import { AdminPostList } from "@/components/post/admin/post-list"

export default async function AdminPostsPage() {
  // Check if the user is an admin
  await requireAdmin()

  return (
    <div className="container py-8">
      <AdminBreadcrumb items={[{ label: "Posts" }]} />

      <div className="mb-8">
        <h1 className="text-4xl font-bold">Posts</h1>
        <p className="text-muted-foreground">Manage and moderate user posts</p>
      </div>

      <AdminPostList />
    </div>
  )
}
