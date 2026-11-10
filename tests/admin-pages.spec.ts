
import { test, expect } from './auth-utils';

test.slow();

test('test access to admin page', async ({ getUserPage }) => {
  // sign in with the admin account
  const adminPage = await getUserPage('admin@foo.com', 'changeme');

  // go to the home page
  await adminPage.goto('http://localhost:3000/');

  // check that the admin is signed in
  await expect(
    adminPage.getByRole('button', { name: 'admin@foo.com' }),
  ).toBeVisible({ timeout: 10000 });

  // check the digits navigation links
  await expect(
    adminPage.getByRole('link', { name: 'Digits' }),
  ).toBeVisible();

  await expect(
    adminPage.getByRole('link', { name: 'Add Contact' }),
  ).toBeVisible();

  await expect(
    adminPage.getByRole('link', { name: 'List Contacts' }),
  ).toBeVisible();

  await expect(
    adminPage.getByRole('link', { name: 'Admin' }),
  ).toBeVisible();

  // check the add contact page
  await adminPage.getByRole('link', { name: 'Add Contact' }).click();
  await expect(adminPage).toHaveURL(/\/add$/);

  // check the list contacts page
  await adminPage.getByRole('link', { name: 'List Contacts' }).click();
  await expect(adminPage).toHaveURL(/\/list$/);

  // check the admin page
  await adminPage.getByRole('link', { name: 'Admin' }).click();
  await expect(adminPage).toHaveURL(/\/admin$/);

  // make sure the admin can see contacts from different users
  await expect(
    adminPage.getByText('Philip Johnson').first(),
  ).toBeVisible();

  await expect(
    adminPage.getByText('Kim Binsted').first(),
  ).toBeVisible();
});
