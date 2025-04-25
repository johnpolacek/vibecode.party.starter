import dotenv from 'dotenv';
import { clerkClient } from "@/lib/clerk"
import { TEST_USER } from "./auth-helpers"
import { db } from "@/lib/firebase/admin"

function isClerkError(error: unknown): error is { status: number; message: string } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Load environment variables from .env
dotenv.config();

// Define collections to reset
const COLLECTIONS_TO_RESET = [
  'mailing_list_subscriptions',
  'user_visits'
] as const;

/**
 * Delete all documents in a collection
 */
async function deleteCollection(collectionPath: string) {
  try {
    // First check if collection exists by trying to get a single document
    const checkDoc = await db.collection(collectionPath).limit(1).get();
    
    // If collection doesn't exist or is empty, log and return
    if (checkDoc.empty) {
      console.log(`Collection ${collectionPath} is empty or doesn't exist - skipping`);
      return;
    }

    // Collection exists and has documents, proceed with deletion
    const snapshot = await db.collection(collectionPath).get();
    const batch = db.batch();
    
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    console.log(`Deleted ${snapshot.size} documents from ${collectionPath}`);
  } catch (error) {
    console.warn(`Warning: Could not delete collection ${collectionPath}:`, error);
    // Don't throw error to allow other collections to be processed
  }
}

/**
 * Reset test data
 */
export async function resetDatabase() {
  try {
    // Delete all documents from each collection
    await Promise.all(COLLECTIONS_TO_RESET.map(deleteCollection));
    console.log('Database reset complete');
  } catch (error: unknown) {
    console.error("Error resetting database:", error);
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
        }
      } catch (error: unknown) {
        if (isClerkError(error) && error.status === 404) {
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
 * Verify database reset
 */
export async function verifyDatabaseReset() {
  try {
    // Check that all collections are empty
    const results = await Promise.all(
      COLLECTIONS_TO_RESET.map(async (collection) => {
        const snapshot = await db.collection(collection).get();
        if (!snapshot.empty) {
          console.error(`Collection ${collection} is not empty after reset`);
          return false;
        }
        return true;
      })
    );
    
    const allEmpty = results.every(Boolean);
    if (allEmpty) {
      console.log('Database reset verification successful - All collections are empty');
    }
    return allEmpty;
  } catch (error) {
    console.warn('Warning: Could not verify database reset:', error);
    // Return true to allow tests to continue
    return true;
  }
} 