import { resetDatabase, verifyDatabaseReset, seedTestData } from "./utils/db-reset";

/**
 * Global setup function that runs before all tests
 */
async function globalSetup() {
  try {
    // Reset the database (clear all tables)
    await resetDatabase();
    
    // Verify that the database was reset correctly
    const isReset = await verifyDatabaseReset();
    if (!isReset) {
      console.warn('Database may not have been reset correctly. Tests may fail or have unexpected results.');
    }
    
    // Seed with test data
    await seedTestData();
  } catch (error) {
    console.error('Error during global setup:', error);
    throw error;
  }
}

export default globalSetup; 