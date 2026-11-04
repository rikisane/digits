
import { notFound } from 'next/navigation';
import { Contact } from '@prisma/client';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import EditContactForm from '@/components/EditContactForm';

// changed this page to load contacts instead of stuff
export default async function EditContactPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Protect the page, only logged in users can access it.
  const session = await auth();
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; name: string };
    } | null,
  );

  // use the id from the url to find the contact
  const editID: number = Number(id);

  if (!Number.isInteger(editID) || editID < 1) {
    return notFound();
  }

  const contact: Contact | null = await prisma.contact.findUnique({
    where: {
      id: editID,
    },
  });

  if (!contact) {
    return notFound();
  }

  // only let users edit their own contacts
  if (contact.owner !== session?.user?.email) {
    return notFound();
  }

  return (
    <main>
      <EditContactForm contact={contact} />
    </main>
  );
}
