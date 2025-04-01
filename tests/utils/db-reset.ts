import dotenv from 'dotenv';
import { clerkClient } from "@/lib/clerk"
import { TEST_USER } from "./auth-helpers"

// Load environment variables from .env
dotenv.config();

/**
 * Reset test data - placeholder for future table clearing logic
 */
export async function resetDatabase() {
  try {
    // Placeholder for future database reset logic
    console.log('Database reset complete - No tables to reset yet');
  } catch (error) {
    console.error('Error resetting database:', error);
    // Don't throw error to allow tests to continue
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
      } catch (clerkError: any) {
        if (clerkError?.status === 404) {
          console.log('Test user not found in Clerk - skipping user reset');
        } else {
          console.warn('Warning: Could not reset test user profile:', clerkError.message);
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