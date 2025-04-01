import { test, expect, Page } from '@playwright/test';
import { resetDatabase, seedTestData } from './db-reset';
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