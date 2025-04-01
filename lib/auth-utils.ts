import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

/**
 * Checks if a user is an admin
 * @param userId - Optional user ID to check. If not provided, checks the current user.
 * @returns Promise<boolean> - True if the user is an admin, false otherwise
 */
export async function isAdmin(userId?: string): Promise<boolean> {
  try {
    // If userId is not provided, get the current user's ID
    let userIdToCheck = userId;
    
    if (!userIdToCheck) {
      const { userId: currentUserId } = await auth();
      userIdToCheck = currentUserId || undefined;
    }
    
    // If no user is authenticated, they're not an admin
    if (!userIdToCheck) {
      return false;
    }
    
    // Get the list of admin user IDs from environment variables
    const adminUserIds = process.env.ADMIN_USER_IDS?.split(",") || [];
    
    // Check if the user's ID is in the admin list
    return adminUserIds.includes(userIdToCheck);
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
}

/**
 * Checks if the provided user ID is an admin
 * @param userId - The user ID to check
 * @returns boolean - True if the user is an admin, false otherwise
 */
export function isUserAdmin(userId: string | null): boolean {
  if (!userId) {
    return false;
  }
  
  // Get the list of admin user IDs from environment variables
  const adminUserIds = process.env.ADMIN_USER_IDS?.split(",") || [];
  
  // Check if the provided user ID is in the admin list
  return adminUserIds.includes(userId);
}

export type AdminCheckResult = {
  isAdmin: boolean
  userId: string | null
  requiresSetup: boolean
}

/**
 * Checks if the current user is an admin and redirects if not
 * @returns The user ID if the user is an admin
 */
export async function requireAdmin(): Promise<AdminCheckResult> {
  // Get the user's ID from Clerk
  const { userId } = await auth()

  // If not authenticated, redirect to sign-in in production, return status in development
  if (!userId) {
    if (process.env.NODE_ENV === "production") {
      redirect("/sign-in")
    }
    return { isAdmin: false, userId: null, requiresSetup: false }
  }

  // Get the list of admin user IDs
  const adminUserIds = process.env.ADMIN_USER_IDS?.split(",") || []

  // In development, if no admin IDs are configured, return a special status
  if (process.env.NODE_ENV === "development" && (!adminUserIds.length || adminUserIds[0] === "")) {
    return { isAdmin: false, userId, requiresSetup: true }
  }

  // If the user is not an admin, redirect in production, return status in development
  if (!adminUserIds.includes(userId)) {
    if (process.env.NODE_ENV === "production") {
      redirect("/")
    }
    return { isAdmin: false, userId, requiresSetup: false }
  }

  return { isAdmin: true, userId, requiresSetup: false }
} 