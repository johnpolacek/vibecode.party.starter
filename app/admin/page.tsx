import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { requireAdmin } from "@/lib/auth-utils"
import { AdminConfigMessage } from "@/components/admin/admin-config-message"
import { DevEnvNotice } from "@/components/admin/dev-env-notice"
import { SupabaseStatusCard } from "@/components/admin/supabase-status-card"

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Vibecode.party Admin Dashboard",
}

export default async function AdminPage() {
  const { isAdmin, requiresSetup } = await requireAdmin()
  const isDev = process.env.NODE_ENV === "development"

  if (requiresSetup) {
    return (
      <div className="container max-w-2xl py-8 md:py-12">
        <AdminConfigMessage />
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="container py-8 md:py-12">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground text-balance mb-8">You don’t have permission to access this page. Please contact an administrator if you believe this is an error.</p>
          {isDev && <DevEnvNotice />}
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>Manage user accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">View user information and manage admin access.</p>
            </CardContent>
            <CardFooter>
              <Link href="/admin/users" className="w-full">
                <Button className="w-full">Manage Users</Button>
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>View site analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Track user visits and monitor site activity.</p>
            </CardContent>
            <CardFooter>
              <Link href="/admin/analytics" className="w-full">
                <Button className="w-full">View Analytics</Button>
              </Link>
            </CardFooter>
          </Card>
          <SupabaseStatusCard />
        </div>
      </div>
    </div>
  )
}
