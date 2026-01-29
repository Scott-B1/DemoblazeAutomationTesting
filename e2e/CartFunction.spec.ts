import { test, expect } from '@playwright/test';

test('Cart: Add product to the cart and verify it appears in the cart', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/');
  //Add the first product
  await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
  await page.getByRole('link', { name: 'Add to cart' }).click();
  //Load the cart page and check it is there
  await page.getByRole('link', { name: 'Cart', exact: true }).click();
  await expect(page.getByRole('cell', { name: 'Samsung galaxy s6' })).toBeVisible();
});

test('Cart: Delete item removes it from the cart', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/');
  //Add the first product
  await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
  await page.getByRole('link', { name: 'Add to cart' }).click();
  //Load the cart then delete the product
  await page.getByRole('link', { name: 'Cart', exact: true }).click();
  await page.getByRole('link', { name: 'Delete' }).click();
  //Verify the product is not present anymore
  await expect(page.getByRole('cell', { name: 'Samsung galaxy s6' })).not.toBeVisible;
});

test('Cart: Add two different products to the cart and verify they appear in the cart', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/');
  //Add the first product
  await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
  await page.getByRole('link', { name: 'Add to cart' }).click();
  //Add the second product
  await page.getByRole('link', { name: 'Home (current)' }).click();
  await page.getByRole('link', { name: 'Nokia lumia' }).click();
  await page.getByRole('link', { name: 'Add to cart' }).click();
  //Load the cart page and check they are both there
  await page.getByRole('link', { name: 'Cart', exact: true }).click();
  await expect(page.getByRole('cell', { name: 'Samsung galaxy s6' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Nokia lumia' })).toBeVisible();
});

