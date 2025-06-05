import { test, expect } from '@playwright/test';

// Ensure the back button on the login page navigates home
test('login back button returns to home', async ({ page }) => {
  await page.goto('/login');
  await page.getByRole('link', { name: /back/i }).click();
  await page.waitForURL('/');
});

// Register page back button goes home
test('register back button returns to home', async ({ page }) => {
  await page.goto('/register');
  await page.getByRole('link', { name: /back/i }).click();
  await page.waitForURL('/');
});

