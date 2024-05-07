import { Document, Schema, model } from 'mongoose';

export interface Contact extends Document {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export const ContactSchema = new Schema<Contact>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
});

// Add `export` keyword to `ContactSchema` declaration
export const ContactModel = model<Contact>('Contact', ContactSchema);
