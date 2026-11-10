
import { test, expect } from './auth-utils';

test.slow();

test('can authenticate a specific user', async ({ getUserPage }) => {
  // sign in with john's account
  const customUserPage = await getUserPage('john@foo.com', 'changeme');

  // go to the home page
  await customUserPage.goto('http://localhost:3000/');

  // check that john is signed in
  await expect(
    customUserPage.getByRole('button', { name: 'john@foo.com' }),
  ).toBeVisible({ timeout: 10000 });

  // check the contact navigation links
  await expect(
    customUserPage.getByRole('link', { name: 'Add Contact' }),
  ).toBeVisible();

  await expect(
    customUserPage.getByRole('link', { name: 'List Contacts' }),
  ).toBeVisible();

  // regular users should not see the admin link
  await expect(
    customUserPage.getByRole('link', { name: 'Admin', exact: true }),
  ).toHaveCount(0);

  // check the add contact page
  await customUserPage.getByRole('link', { name: 'Add Contact' }).click();
  await expect(customUserPage).toHaveURL(/\/add$/);

  // check the list contacts page
  await customUserPage.getByRole('link', { name: 'List Contacts' }).click();
  await expect(customUserPage).toHaveURL(/\/list$/);

  // check that john can see his contacts
  await expect(
    customUserPage.getByText('Philip Johnson').first(),
  ).toBeVisible();

  await expect(
    customUserPage.getByText('Henri Casanova').first(),
  ).toBeVisible();

  // john should not see the admin's contact
  await expect(
    customUserPage.getByText('Kim Binsted'),
  ).toHaveCount(0);
});
