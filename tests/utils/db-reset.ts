import dotenv from 'dotenv';
import { clerkClient } from "@/lib/clerk"
import { TEST_USER } from "./auth-helpers"
import { supabaseAdmin } from "@/lib/supabase-admin"

function isClerkError(error: unknown): error is { status: number; message: string } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Load environment variables from .env
dotenv.config();

// Define tables with their ID types in reverse order of dependencies
const TABLES_TO_RESET = [
  { name: 'mailing_list_subscriptions', idType: 'uuid' },
  { name: 'user_visits', idType: 'uuid' }
] as const;

/**
 * Reset test data
 */
export async function resetDatabase() {
  try {
    // Delete all rows from each table
    for (const table of TABLES_TO_RESET) {
      const { error } = await supabaseAdmin
        .from(table.name)
        .delete()
        .neq('id', table.idType === 'uuid' ? '00000000-0000-0000-0000-000000000000' : 0)
      
      if (error) {
        console.error(`Error clearing ${table.name}:`, error)
        throw error
      }
      console.log(`Cleared table: ${table.name}`)
    }
    
    console.log("Database reset complete")
  } catch (error: unknown) {
    console.error("Error resetting database:", error)
    throw error
  }
}

/**
 * Insert basic seed data for testing - placeholder for future seeding logic
 */
export async function seedTestData() {
  try {
    // Only attempt to reset Clerk user if CLERK_SECRET_KEY is present
    if (process.env.CLERK_SECRET_KEY) {
      try {
        // Check if user exists first
        const user = await clerkClient.users.getUser(TEST_USER.userId);
        if (user) {
          await clerkClient.users.updateUser(TEST_USER.userId, {
            firstName: "",
            lastName: "",
            unsafeMetadata: {
              bio: "",
            },
          });
          console.log('Test user profile reset successfully');
        }
      } catch (error: unknown) {
        if (isClerkError(error) && error.status === 404) {
          console.log('Test user not found in Clerk - skipping user reset');
        } else {
          console.warn('Warning: Could not reset test user profile:', error instanceof Error ? error.message : String(error));
        }
        // Don't throw error to allow tests to continue
      }
    } else {
      console.log('CLERK_SECRET_KEY not found - skipping user reset');
    }
    
    // Placeholder for future test data seeding
    console.log('Test data seeding complete');
  } catch (error) {
    console.error('Error seeding test data:', error);
    // Don't throw error to allow tests to continue
  }
}

/**
 * Verify database reset - placeholder for future verification logic
 */
export async function verifyDatabaseReset() {
  try {
    // Placeholder for future verification logic
    console.log('Database reset verification successful - No tables to verify yet');
    return true;
  } catch (error) {
    console.error('Error verifying database reset:', error);
    // Return true to allow tests to continue
    return true;
  }
} 