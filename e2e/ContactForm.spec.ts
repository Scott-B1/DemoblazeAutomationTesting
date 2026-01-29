import { test, expect } from '@playwright/test';

test('Contact: Open and Close form', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/');
  //Open and close the form
  await page.getByRole('link', { name: 'Contact' }).click();
  await page.getByRole('dialog', { name: 'New message' }).getByLabel('Close').click();
});

test('Contact: Fill out a valid form and submit', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/');
  //Open form and fill out valid details
  await page.getByRole('link', { name: 'Contact' }).click();
  await page.locator('#recipient-email').click();
  await page.locator('#recipient-email').fill('qa@example.com');
  await page.getByRole('textbox', { name: 'Contact Email: Contact Name:' }).click();
  await page.getByRole('textbox', { name: 'Contact Email: Contact Name:' }).fill('QA');
  await page.getByRole('textbox', { name: 'Message:' }).click();
  await page.getByRole('textbox', { name: 'Message:' }).fill('Hello this is an Automated QA Test.');
  //Submit and check that the dialog disappears
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect(page.getByRole('dialog', { name: 'New message' })).not.toBeVisible();
});

test('Contact: Fill out invalid email and submit', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/');
  //Open form and fill out valid details, but an invalid email address without the @
  await page.getByRole('link', { name: 'Contact' }).click();
  await page.locator('#recipient-email').click();
  await page.locator('#recipient-email').fill('notavalidemail');
  await page.getByRole('textbox', { name: 'Contact Email: Contact Name:' }).click();
  await page.getByRole('textbox', { name: 'Contact Email: Contact Name:' }).fill('QA');
  await page.getByRole('textbox', { name: 'Message:' }).click();
  await page.getByRole('textbox', { name: 'Message:' }).fill('Hello, this is an Automated QA Test.');

  //Submit and check that the dialog box is still present, preferably with some kind of error
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect(page.getByRole('dialog', { name: 'New message' })).toBeVisible();
});

test('Contact: Submit an empty form', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/');
  //Open form and click submit without inputting any information
  await page.getByRole('link', { name: 'Contact' }).click();

  //Submit and check that the dialog box is still present, preferably with some kind of error
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect(page.getByRole('dialog', { name: 'New message' })).toBeVisible();
});

