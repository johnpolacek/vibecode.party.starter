import { test, expect } from '@playwright/test';
import { setupAuthenticatedUser, setupCleanDatabase } from './utils/test-helpers';

test('should have to sign in to subscribe', async ({ page }) => {
  await page.goto('http://localhost:3000/mailing-list');
  await expect(page.getByText('Please sign in to subscribe')).toBeVisible();
});

test('should be able to subscribe to the mailing list when signed in', async ({ page }) => {
  // Reset database before this test
  await setupCleanDatabase();
  
  // Login as test user
  await setupAuthenticatedUser(page);

  // Subscribe
  await page.goto('http://localhost:3000/mailing-list');
  await page.getByRole('button', { name: 'Subscribe' }).click();
  await page.getByText('You are currently subscribed').click();
  await page.getByRole('link', { name: 'Admin' }).click();
  await page.getByRole('button', { name: 'Manage Subscribers' }).click();
  await expect(page.getByRole('heading', { name: 'Mailing List Subscribers' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'john.polacek@gmail.com' })).toBeVisible();

  // Unsubscribe
  await page.goto('http://localhost:3000/mailing-list');
  await page.getByRole('button', { name: 'Unsubscribe' }).click();
  await expect(page.getByText('Unsubscribed', { exact: true })).toBeVisible();
  await page.goto('http://localhost:3000/admin/mailing-list');
  await expect(page.getByRole('cell', { name: 'john.polacek@gmail.com' })).toBeVisible();
  await expect(page.getByText('Unsubscribed')).toBeVisible();
});
