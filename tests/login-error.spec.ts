import { test, expect } from '@playwright/test';

// Shows an error message on failed login

test('invalid credentials show error', async ({ page }) => {
  await page.route('**/api/login', async route => {
    await route.fulfill({
      status: 401,
      body: 'Invalid credentials',
    });
  });

  await page.goto('/login');
  await page.getByPlaceholder('Email').fill('john@example.com');
  await page.getByPlaceholder('Password').fill('wrongpass');
  await page.getByRole('button', { name: /login/i }).click();

  await expect(page.getByText('Invalid credentials')).toBeVisible();
});
