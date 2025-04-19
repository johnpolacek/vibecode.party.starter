import { Page, expect } from '@playwright/test';
import { clerk, clerkSetup } from '@clerk/testing/playwright';

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
  // Navigate to an unprotected page that loads Clerk
  await page.goto('/');

  // Setup Clerk for testing
  await clerkSetup();

  // Use Clerk's testing utilities to sign in
  await clerk.signIn({
    page,
    signInParams: {
      strategy: 'password',
      identifier: TEST_USER.email,
      password: TEST_USER.password
    }
  });

  // Navigate to the home page and verify we're logged in
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Open user button' })).toBeVisible({timeout: 30000});
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
  // Navigate to an unprotected page that loads Clerk
  await page.goto('/');
  
  await clerk.signOut({ page });
  await page.waitForTimeout(500);
} 