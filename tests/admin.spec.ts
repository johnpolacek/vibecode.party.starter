import { test, expect } from '@playwright/test';
import { setupAuthenticatedUser, setupCleanDatabase } from './utils/test-helpers';

test('should not be public', async ({ page }) => {
  await page.goto('/admin');
  await expect(page.getByRole('heading', { name: 'Access Denied' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Development Environment' })).toBeVisible();
});

test('should load the admin dashboard', async ({ page }) => {
  // Reset database before this test
    await setupCleanDatabase();
    
    // Login as test user
    await setupAuthenticatedUser(page);
    
    // Navigate to the page
    await page.goto('/admin');
    await expect(page.getByRole('heading', { name: 'Admin Dashboard' })).toBeVisible();
});
  