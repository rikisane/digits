
'use server';

import { Condition, Contact, Stuff } from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';
import { auth } from './auth';

/**
 * Adds a new stuff to the database.
 * @param stuff, an object with the following properties: name, quantity, owner, condition.
 */
export async function addStuff(stuff: { name: string; quantity: number; owner: string; condition: string }) {
  // console.log(`addStuff data: ${JSON.stringify(stuff, null, 2)}`);
  let condition: Condition = 'good';
  if (stuff.condition === 'poor') {
    condition = 'poor';
  } else if (stuff.condition === 'excellent') {
    condition = 'excellent';
  } else {
    condition = 'fair';
  }
  await prisma.stuff.create({
    data: {
      name: stuff.name,
      quantity: stuff.quantity,
      owner: stuff.owner,
      condition,
    },
  });
  // After adding, redirect to the list page
  redirect('/list');
}

/**
 * Edits an existing stuff in the database.
 * @param stuff, an object with the following properties: id, name, quantity, owner, condition.
 */
export async function editStuff(stuff: Stuff) {
  // console.log(`editStuff data: ${JSON.stringify(stuff, null, 2)}`);
  await prisma.stuff.update({
    where: { id: stuff.id },
    data: {
      name: stuff.name,
      quantity: stuff.quantity,
      owner: stuff.owner,
      condition: stuff.condition,
    },
  });
  // After updating, redirect to the list page
  redirect('/list');
}

/**
 * Deletes an existing stuff from the database.
 * @param id, the id of the stuff to delete.
 */
export async function deleteStuff(id: number) {
  // console.log(`deleteStuff id: ${id}`);
  await prisma.stuff.delete({
    where: { id },
  });
  // After deleting, redirect to the list page
  redirect('/list');
}

/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function createUser(credentials: { email: string; password: string }) {
  // console.log(`createUser data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.create({
    data: {
      email: credentials.email,
      password,
    },
  });
}

/**
 * Changes the password of an existing user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function changePassword(credentials: { email: string; password: string }) {
  // console.log(`changePassword data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password,
    },
  });
}

// added this to save new contacts
export async function addContact(contact: {
  firstName: string;
  lastName: string;
  address: string;
  image: string;
  description: string;
  owner: string;
}) {
  const session = await auth();
  const currentUser = session?.user?.email;

  // make sure the user is signed in
  if (!currentUser) {
    redirect('/auth/signin');
  }

  await prisma.contact.create({
    data: {
      firstName: contact.firstName,
      lastName: contact.lastName,
      address: contact.address,
      image: contact.image,
      description: contact.description,
      owner: currentUser,
    },
  });

  // go back to the list after adding
  redirect('/list');
}

// added this to update contacts already in the database
export async function editContact(contact: Contact) {
  const session = await auth();
  const currentUser = session?.user?.email;

  // make sure the user is signed in
  if (!currentUser) {
    redirect('/auth/signin');
  }

  // only update contacts owned by this user
  const existingContact = await prisma.contact.findUnique({
    where: { id: contact.id },
  });

  if (!existingContact || existingContact.owner !== currentUser) {
    throw new Error('Contact not found or access denied');
  }

  await prisma.contact.update({
    where: { id: contact.id },
    data: {
      firstName: contact.firstName,
      lastName: contact.lastName,
      address: contact.address,
      image: contact.image,
      description: contact.description,
    },
  });

  // go back to the list after editing
  redirect('/list');
}

// added this to save timestamped notes for contacts
export async function addNote(note: {
  note: string;
  contactId: number;
  owner: string;
}) {
  const session = await auth();
  const currentUser = session?.user?.email;

  // make sure the user is signed in
  if (!currentUser) {
    redirect('/auth/signin');
  }

  // make sure the contact belongs to the signed-in user
  const contact = await prisma.contact.findUnique({
    where: { id: note.contactId },
  });

  if (!contact || contact.owner !== currentUser) {
    throw new Error('Contact not found or access denied');
  }

  // save the note and connect it to the right contact
  await prisma.note.create({
    data: {
      note: note.note,
      contactId: note.contactId,
      owner: currentUser,
    },
  });

  // go back to the list after saving the note
  redirect('/list');
}
