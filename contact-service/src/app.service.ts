import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact } from './contact.schema';

@Injectable()
export class ContactService {
    constructor(
        @InjectModel('Contact') private readonly contactModel: Model<Contact>
    ) {}

    // Method to create a new contact
    async createContact(contactData: Contact): Promise<Contact> {
        const newContact = new this.contactModel(contactData);
        return newContact.save();
    }

    // Method to get all contacts
    async getAllContacts(): Promise<Contact[]> {
        return this.contactModel.find().exec();
    }

    // Method to get a contact by ID
    async getContactById(contactId: string): Promise<Contact> {
        return this.contactModel.findById(contactId).exec();
    }

    // Method to update a contact
    async updateContact(contactId: string, updateData: Contact): Promise<Contact> {
        return this.contactModel.findByIdAndUpdate(contactId, updateData, { new: true }).exec();
    }

    // Method to delete a contact
    async deleteContact(contactId: string): Promise<Contact> {
        return this.contactModel.findByIdAndDelete(contactId).exec();
    }
}
