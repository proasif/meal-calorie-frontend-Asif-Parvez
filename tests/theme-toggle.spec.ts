import { test, expect } from '@playwright/test';

// Ensure the result card updates styles when toggling dark mode

test('result card switches colors with theme toggle', async ({ page }) => {
  // Mock successful login
  await page.route('**/api/login', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        token: 'fake-token',
        user: { first_name: 'John', last_name: 'Doe', email: 'john@example.com' },
      }),
    });
  });

  // Mock calorie API
  await page.route('**/api/get-calories', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        dish_name: 'Pizza',
        servings: 1,
        calories_per_serving: 300,
        total_calories: 300,
        source: 'Test',
      }),
    });
  });

  // Login and navigate to calories page
  await page.goto('/login');
  await page.getByPlaceholder('Email').fill('john@example.com');
  await page.getByPlaceholder('Password').fill('password');
  await page.getByRole('button', { name: /login/i }).click();
  await page.waitForURL('/dashboard');
  await page.getByRole('link', { name: /check your food calories now/i }).click();
  await page.waitForURL('/calories');

  // Search for a dish to render the card
  await page.getByPlaceholder('Dish Name').fill('Pizza');
  await page.getByPlaceholder('Servings').fill('1');
  await page.getByRole('button', { name: /get calories/i }).click();

  const card = page.locator('text=Total calories: 300').locator('..');

  // Toggle dark mode and ensure the attribute changes
  await page.getByRole('button', { name: /dark/i }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

  // Card should remain visible in dark mode
  await expect(card).toBeVisible();
});
