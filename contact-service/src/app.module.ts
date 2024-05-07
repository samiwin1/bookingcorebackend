import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactController } from './app.controller';
import { ContactService } from './app.service'; 
import { Contact, ContactSchema } from './contact.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Contact', schema: ContactSchema }]),
],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
