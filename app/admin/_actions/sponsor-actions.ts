"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs/server"
import { supabaseAdmin } from "@/lib/supabase"
import { requireAdmin } from "@/lib/auth-utils"

export async function approveSponsor(sponsorId: string) {
  // Ensure user is admin
  await requireAdmin()
  const { userId } = await auth()

  try {
    const { error } = await supabaseAdmin
      .from("hackathon_sponsors")
      .update({
        approval_status: "approved",
        approved_at: new Date().toISOString(),
        approved_by: userId,
      })
      .eq("id", sponsorId)

    if (error) throw error

    // Revalidate the admin sponsors page and hackathon page
    revalidatePath("/admin/sponsors")
    revalidatePath("/hackathons/[slug]", "page")

    return { success: true }
  } catch (error) {
    console.error("Error approving sponsor:", error)
    return { success: false, error: "Failed to approve sponsor" }
  }
}

export async function rejectSponsor(sponsorId: string, rejectionReason: string) {
  // Ensure user is admin
  await requireAdmin()
  const { userId } = await auth()

  try {
    const { error } = await supabaseAdmin
      .from("hackathon_sponsors")
      .update({
        approval_status: "rejected",
        approved_at: new Date().toISOString(),
        approved_by: userId,
        rejection_reason: rejectionReason,
      })
      .eq("id", sponsorId)

    if (error) throw error

    // Revalidate the admin sponsors page and hackathon page
    revalidatePath("/admin/sponsors")
    revalidatePath("/hackathons/[slug]", "page")

    return { success: true }
  } catch (error) {
    console.error("Error rejecting sponsor:", error)
    return { success: false, error: "Failed to reject sponsor" }
  }
} 