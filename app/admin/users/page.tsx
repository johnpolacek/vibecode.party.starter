import { requireAdmin } from "@/lib/auth-utils"
import { AdminBreadcrumb } from "@/components/nav/admin-breadcrumb"
import { AdminUserList } from "@/components/admin/user-list"
import { clerkClient } from "@clerk/nextjs/server"
import type { User } from "@clerk/nextjs/server"

async function getInitialUsers() {
  const client = await clerkClient()
  const { data: users } = await client.users.getUserList()
  const adminUserIds = process.env.ADMIN_USER_IDS?.split(",") || []

  return users.map((user: User) => ({
    id: user.id,
    email: user.emailAddresses[0]?.emailAddress,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    imageUrl: user.imageUrl,
    createdAt: new Date(user.createdAt).toLocaleDateString(),
    isAdmin: adminUserIds.includes(user.id),
    banned: user.banned,
    publicMetadata: user.publicMetadata,
  }))
}

export default async function AdminUsersPage() {
  // Check if the user is an admin
  await requireAdmin()

  // Fetch initial users data
  const initialUsers = await getInitialUsers()

  return (
    <div className="container py-8">
      <AdminBreadcrumb items={[{ label: "Users" }]} />

      <div className="mb-8">
        <h1 className="text-4xl font-bold">Users</h1>
        <p className="text-muted-foreground">Manage and view user information</p>
      </div>

      <AdminUserList initialUsers={initialUsers} />
    </div>
  )
}
