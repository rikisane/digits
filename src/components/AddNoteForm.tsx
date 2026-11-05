
'use client';

import { useSession } from 'next-auth/react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType } from 'yup';
import { addNote } from '@/lib/dbActions';
import { AddNoteSchema } from '@/lib/validationSchemas';

// added this form so users can save notes for each contact
const AddNoteForm = ({ contactId }: { contactId: number }) => {
  const { data: session } = useSession();
  const currentUser = session?.user?.email || '';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InferType<typeof AddNoteSchema>>({
    resolver: yupResolver(AddNoteSchema),
    values: {
      note: '',
      contactId,
      owner: currentUser,
    },
  });

  // saves the note for the contact we're viewing
  const onSubmit = async (data: InferType<typeof AddNoteSchema>) => {
    await addNote({
      note: data.note,
      contactId,
      owner: currentUser,
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="p-3">
      {/* added this so the user can type their note */}
      <Form.Group>
        <Form.Label>Add Timestamped Note</Form.Label>
        <textarea
          {...register('note')}
          rows={3}
          className={`form-control ${errors.note ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">
          {errors.note?.message}
        </div>
      </Form.Group>

      {/* automatically stores the contact and owner */}
      <input
        type="hidden"
        {...register('contactId', { valueAsNumber: true })}
      />
      <input type="hidden" {...register('owner')} />

      {/* submits the new note to the database */}
      <Button
        type="submit"
        variant="primary"
        className="mt-3"
        disabled={isSubmitting || !currentUser}
      >
        Submit
      </Button>
    </Form>
  );
};

export default AddNoteForm;
