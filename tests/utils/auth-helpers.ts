import { Page, expect } from '@playwright/test';

/**
 * Login credentials for test user
 */
export const TEST_USER = {
  email: process.env.TEST_USER_EMAIL!,
  password: process.env.TEST_USER_PASSWORD!,
  fullName: process.env.TEST_USER_FULL_NAME!,
  username: process.env.TEST_USER_USERNAME!,
  userId: process.env.TEST_USER_ID!
};

/**
 * Login a test user using Clerk authentication
 * @param page - Playwright page object
 */
export async function loginTestUser(page: Page): Promise<void> {
  // Navigate to the sign-in page
  await page.goto('/');
  await page.getByRole('button', { name: 'Sign In' }).first().click();
  await fillLoginCredentials(page);
  await page.waitForTimeout(500);
}

/**
 * Helper function to fill in login credentials and wait for successful login
 */
export async function fillLoginCredentials(page: Page): Promise<void> {
  await page.getByRole('textbox', { name: 'Email address' }).fill(TEST_USER.email);
  await page.waitForTimeout(500);
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.waitForTimeout(500);
  await page.getByRole('textbox', { name: 'Password' }).fill(TEST_USER.password);
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByRole('button', { name: 'Open user button' })).toBeVisible({timeout: 30000});
}

/**
 * Logout the current user
 * @param page - Playwright page object
 */
export async function logoutUser(page: Page): Promise<void> {
  await page.getByRole('button', { name: 'Open user button' }).click();
  await page.getByRole('menuitem', { name: 'Sign out' }).click();
  await page.waitForTimeout(500);
} 