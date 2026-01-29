import { test, expect } from '@playwright/test';

test('Purchase: Make a valid purchase of one product', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/');
  //Add the product
  await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
  await page.getByRole('link', { name: 'Add to cart' }).click();
  await page.getByRole('link', { name: 'Cart', exact: true }).click();
  //Place the order and fill out valid details
  await page.getByRole('button', { name: 'Place Order' }).click();
  await page.getByRole('textbox', { name: 'Total: 360 Name:' }).click();
  await page.getByRole('textbox', { name: 'Total: 360 Name:' }).fill('Test');
  await page.getByRole('textbox', { name: 'Country:' }).click();
  await page.getByRole('textbox', { name: 'Country:' }).fill('UK');
  await page.getByRole('textbox', { name: 'City:' }).click();
  await page.getByRole('textbox', { name: 'City:' }).fill('London');
  await page.getByRole('textbox', { name: 'Credit card:' }).click();
  await page.getByRole('textbox', { name: 'Credit card:' }).fill('4123456789101234');
  await page.getByRole('textbox', { name: 'Month:' }).click();
  await page.getByRole('textbox', { name: 'Month:' }).fill('January');
  await page.getByRole('textbox', { name: 'Year:' }).click();
  await page.getByRole('textbox', { name: 'Year:' }).fill('2026');
  //The purchase should complete and display successfully
  await page.getByRole('button', { name: 'Purchase' }).click();
  await expect(page.locator('body')).toContainText('Thank you for your purchase!');
});

test('Purchase: Make an invalid purchase with incorrect details', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/');
    //Add the product
  await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
  await page.getByRole('link', { name: 'Add to cart' }).click();
  await page.getByRole('link', { name: 'Cart', exact: true }).click();
    //Place the order and fill out invalid details with missing fields
  await page.getByRole('button', { name: 'Place Order' }).click();
  await page.getByRole('textbox', { name: 'Total: 360 Name:' }).click();
  await page.getByRole('textbox', { name: 'Total: 360 Name:' }).fill('A');
  await page.getByRole('textbox', { name: 'Credit card:' }).click();
  await page.getByRole('textbox', { name: 'Credit card:' }).fill('A');
  //Attempt to make the purchase and it should not display a success message
  await page.getByRole('button', { name: 'Purchase' }).click();
  await expect(page.getByRole('heading', { name: 'Thank you for your purchase!' })).not.toBeVisible();
});

test('Purchase: Make an invalid purchase with no product added', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/');
  //Go straight to cart without adding a product
  await page.getByRole('link', { name: 'Cart' }).click();
  //Place the order and fill out valid details
  await page.getByRole('button', { name: 'Place Order' }).click();
  await page.getByRole('textbox', { name: 'Total: Name:' }).click();
  await page.getByRole('textbox', { name: 'Total: Name:' }).fill('Test');
  await page.getByRole('textbox', { name: 'Country:' }).click();
  await page.getByRole('textbox', { name: 'Country:' }).fill('UK');
  await page.getByRole('textbox', { name: 'City:' }).click();
  await page.getByRole('textbox', { name: 'City:' }).fill('London');
  await page.getByRole('textbox', { name: 'Credit card:' }).click();
  await page.getByRole('textbox', { name: 'Credit card:' }).fill('4123456789101234');
  await page.getByRole('textbox', { name: 'Month:' }).click();
  await page.getByRole('textbox', { name: 'Month:' }).fill('January');
  await page.getByRole('textbox', { name: 'Year:' }).click();
  await page.getByRole('textbox', { name: 'Year:' }).fill('2026');
  //Attempting to make a purchase should not display a success message
  await page.getByRole('button', { name: 'Purchase' }).click();
  await expect(page.getByRole('heading', { name: 'Thank you for your purchase!' })).not.toBeVisible();
});