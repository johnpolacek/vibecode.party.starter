import { test, expect } from '@playwright/test';

test('should be able to fill out the contact form', async ({ page }) => {
  await page.goto('http://localhost:3000/contact');
  await expect(page.getByText('Contact Us')).toBeVisible();
  await page.getByRole('textbox', { name: 'Name' }).fill('Kickin Poppin');
  await page.getByRole('textbox', { name: 'Email' }).fill('kickin@poppin.com');
  await page.getByRole('textbox', { name: 'Message' }).fill('Hey Yo');
});
