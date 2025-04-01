import { test, expect } from '@playwright/test';

test('should be able to fill out the sign up form', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.getByRole('button', { name: 'Sign Up' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('hey@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('GoodVibrations');
  await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();
});
