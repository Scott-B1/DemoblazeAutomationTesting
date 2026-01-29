import { test, expect } from '@playwright/test';

test('Smoke: Home page loads and core navigation is present', async ({ page }) => {
  const startTime = performance.now(); //Also checking the performance of the load
  await page.goto('https://www.demoblaze.com/');
  //Check the navigation is present and products load
  await expect(page.locator('#nava')).toContainText('PRODUCT STORE');
  await expect(page.getByRole('link', { name: 'Samsung galaxy s6' })).toBeVisible();
  await expect(page.locator('#navbarExample')).toBeVisible();
  //Output the page loading times
  const endTime = performance.now();
  console.log(`Page load time: ${(endTime - startTime).toFixed(2)} ms`);
});

test('Smoke: Browsing, Category filter updates product list', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/');
  // Choose one category to keep suite stable and quick
  await page.getByRole('link', { name: 'Laptops' }).click();
  await expect(page.getByRole('link', { name: 'Sony vaio i5' })).toBeVisible();
});

test('Smoke: Navigation buttons work and new page loads', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/');
  await page.getByRole('link', { name: 'Cart' }).click();
  //Check the cart page loads
  await expect(page.getByText('Products Pic Title Price x')).toBeVisible();
});
