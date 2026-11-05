
import * as Yup from 'yup';

export const AddStuffSchema = Yup.object({
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const EditStuffSchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

// added this to store the info for each contact
export interface Contact {
  id?: number; // added so saved contacts can have an edit link
  firstName: string;
  lastName: string;
  address: string;
  image: string;
  description: string;
  owner?: string; // added for contacts saved in the database
}

// added this to check new contact information
export const AddContactSchema = Yup.object({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  address: Yup.string().required(),
  image: Yup.string().required(),
  description: Yup.string().required(),
  owner: Yup.string().required(),
});

// added this to check contact information when editing
export const EditContactSchema = Yup.object({
  id: Yup.number().required(),
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  address: Yup.string().required(),
  image: Yup.string().required(),
  description: Yup.string().required(),
  owner: Yup.string().required(),
});

// added this to check the note before saving it
export const AddNoteSchema = Yup.object({
  note: Yup.string().required(),
  contactId: Yup.number().integer().positive().required(),
  owner: Yup.string().required(),
});
