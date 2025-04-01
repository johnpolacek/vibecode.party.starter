import { test, expect, Page } from '@playwright/test';
import { resetDatabase, seedTestData, seedHackathonTestData } from './db-reset';
import { loginTestUser, logoutUser } from './auth-helpers';

/**
 * Reset the database before a test or group of tests
 */
export async function setupCleanDatabase() {
  await resetDatabase();
}

/**
 * Reset the database and seed it with test data
 */
export async function setupSeededDatabase() {
  await resetDatabase();
  await seedTestData();
}

/**
 * Reset the database and seed it with both regular and hackathon test data
 * @param options - Configuration options for seeding the hackathon
 * @param options.isLive - Whether the hackathon should be live (true) or completed (false)
 * @param options.withActivity - Whether to include activity updates in the seeded data
 * @param options.isCompleted - Whether the hackathon should be completed (true) or not (false)
 */
export async function setupSeededDatabaseWithHackathon({ isLive = true, withActivity = false, isCompleted = false } = {}) {
  await resetDatabase();
  await seedTestData();
  await seedHackathonTestData({ isLive, withActivity, isCompleted });
}

/**
 * Login a test user
 * @param page - Playwright page object
 */
export async function setupAuthenticatedUser(page: Page) {
  await loginTestUser(page);
}

/**
 * Logout a user
 * @param page - Playwright page object
 */
export async function teardownAuthenticatedUser(page: Page) {
  await logoutUser(page).catch(e => console.warn('Failed to logout:', e));
}

// Export test and expect for convenience
export { test, expect }; 