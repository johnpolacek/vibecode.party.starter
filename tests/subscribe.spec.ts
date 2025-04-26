import { test, expect } from '@playwright/test';
import { setupAuthenticatedUser, setupCleanDatabase } from './utils/test-helpers';
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";

type MailingListSubscription = Doc<"mailing_list_subscriptions">;

// Initialize Convex client for test verification
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// Helper function to safely cast Convex response
async function getSubscriptions() {
  const response = await convex.query(api.mailingList.getSubscriptions);
  return response as unknown as MailingListSubscription[];
}

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
  
  // Wait for the form to be ready
  await page.waitForSelector('button:has-text("Subscribe")');

  // Click subscribe and wait for navigation/refresh
  await page.getByRole('button', { name: 'Subscribe' }).click();
  await page.waitForLoadState('networkidle');
  
  // Check for success message
  const toastText = await page.getByText('Successfully subscribed').textContent();
  console.log('Toast message:', toastText);
  
  // Check subscription status
  const statusText = await page.getByText('You are currently subscribed').textContent();
  console.log('Status message:', statusText);

  // Verify the document in Convex
  const subscriptions = await getSubscriptions();
  const subscription = subscriptions.find(s => s.email === 'john.polacek@gmail.com');
  expect(subscription).toBeTruthy();
  expect(subscription?.email).toBe('john.polacek@gmail.com');
  expect(subscription?.subscribedAt).toBeTruthy();
  expect(subscription?.unsubscribedAt).toBeNull();

  // Navigate to admin and check list
  await page.goto('http://localhost:3000/admin/mailing-list');
  await page.waitForLoadState('networkidle');

  // Wait for page to load and data to be fetched
  await expect(page.getByRole('heading', { name: 'Mailing List Subscribers' })).toBeVisible();
  
  // Check if email is in the list
  const emailCell = page.getByRole('cell', { name: 'john.polacek@gmail.com' });
  const isEmailVisible = await emailCell.isVisible();
  console.log('Email visible in admin list:', isEmailVisible);
  await expect(emailCell).toBeVisible();
  
  // Unsubscribe
  await page.goto('http://localhost:3000/mailing-list');
  await page.getByRole('button', { name: 'Unsubscribe' }).click();
  await expect(page.getByText('Subscribe to Our Mailing List')).toBeVisible();
  await page.goto('http://localhost:3000/admin/mailing-list');
  await expect(page.getByRole('cell', { name: 'john.polacek@gmail.com' })).toBeVisible();
  await expect(page.getByText('Unsubscribed')).toBeVisible();

  // Verify unsubscribe in Convex
  const updatedSubscriptions = await getSubscriptions();
  const unsubscription = updatedSubscriptions.find(s => s.email === 'john.polacek@gmail.com');
  expect(unsubscription).toBeTruthy();
  expect(unsubscription?.unsubscribedAt).toBeTruthy();
});
