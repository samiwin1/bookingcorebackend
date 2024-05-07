import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ContactService } from './app.service'; 
import { Contact } from './contact.schema';

@Controller('contacts')
export class ContactController {
    constructor(private readonly contactService: ContactService) {}

    // Endpoint to create a new contact
    @Post()
    async create(@Body() contactData: Contact): Promise<Contact> {
        return this.contactService.createContact(contactData);
    }

    // Endpoint to get all contacts
    @Get()
    async getAllContacts(): Promise<Contact[]> {
        return this.contactService.getAllContacts();
    }

    // Endpoint to get a contact by ID
    @Get(':id')
    async getContactById(@Param('id') contactId: string): Promise<Contact> {
        return this.contactService.getContactById(contactId);
    }

    // Endpoint to update a contact by ID
    @Patch(':id')
    async updateContact(@Param('id') contactId: string, @Body() updateData: Contact): Promise<Contact> {
        return this.contactService.updateContact(contactId, updateData);
    }

    // Endpoint to delete a contact by ID
    @Delete(':id')
    async deleteContact(@Param('id') contactId: string): Promise<Contact> {
        return this.contactService.deleteContact(contactId);
    }
}
