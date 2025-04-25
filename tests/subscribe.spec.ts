import { test, expect } from '@playwright/test';
import { setupAuthenticatedUser, setupCleanDatabase } from './utils/test-helpers';
import { getFirestore } from 'firebase-admin/firestore';
import { db } from '@/lib/firebase/admin';

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

  // Verify the document in Firebase
  const subscriptionsRef = db.collection('mailing_list_subscriptions');
  const snapshot = await subscriptionsRef.where('email', '==', 'john.polacek@gmail.com').get();
  expect(snapshot.empty).toBe(false);
  const doc = snapshot.docs[0];
  expect(doc.data().email).toBe('john.polacek@gmail.com');
  expect(doc.data().subscribed_at).toBeTruthy();
  expect(doc.data().unsubscribed_at).toBeNull();

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
  await expect(page.getByText('Unsubscribed', { exact: true })).toBeVisible();
  await page.goto('http://localhost:3000/admin/mailing-list');
  await expect(page.getByRole('cell', { name: 'john.polacek@gmail.com' })).toBeVisible();
  await expect(page.getByText('Unsubscribed')).toBeVisible();

  // Verify unsubscribe in Firebase
  const unsubSnapshot = await subscriptionsRef.where('email', '==', 'john.polacek@gmail.com').get();
  expect(unsubSnapshot.empty).toBe(false);
  const unsubDoc = unsubSnapshot.docs[0];
  expect(unsubDoc.data().unsubscribed_at).toBeTruthy();
});
