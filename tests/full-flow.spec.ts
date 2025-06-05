import { test, expect } from '@playwright/test';

// End-to-end flow: login then search for calories and render result

test('login, search, and view calorie result', async ({ page }) => {
  // Mock the /api/login response
  await page.route('**/api/login', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        token: 'fake-token',
        user: { first_name: 'John', last_name: 'Doe', email: 'john@example.com' }
      })
    });
  });

  // Mock the /api/get-calories response
  await page.route('**/api/get-calories', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        dish_name: 'Pizza',
        servings: 1,
        calories_per_serving: 300,
        total_calories: 300,
        source: 'Test'
      })
    });
  });

  // Login flow
  await page.goto('/login');
  await page.getByPlaceholder('Email').fill('john@example.com');
  await page.getByPlaceholder('Password').fill('password');
  await page.getByRole('button', { name: /login/i }).click();
  // After login redirect to dashboard and use CTA to reach calories page
  await page.waitForURL('/dashboard');
  await expect(page.getByText('Community Feed')).toBeVisible();
  await page.getByRole('link', { name: /check your food calories now/i }).click();
  await page.waitForURL('/calories');

  // Search for a dish and display the result
  await page.getByPlaceholder('Dish Name').fill('Pizza');
  await page.getByPlaceholder('Servings').fill('1');
  await page.getByRole('button', { name: /get calories/i }).click();

  // Expect result card to show total calories and success toast
  await expect(page.getByText('Total calories: 300')).toBeVisible();
  await expect(page.getByText('Calories fetched successfully')).toBeVisible();
});
