import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  password: string; // You can hash this password for security

  @Prop()
  role: string; // You can define roles for users, e.g., 'admin', 'user', etc.
}

export const UserSchema = SchemaFactory.createForClass(User);
