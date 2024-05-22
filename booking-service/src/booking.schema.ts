import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Booking extends Document {
    @Prop({ type: String, required: true })
    _id: string; // Explicitly add the _id field

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    checkInDate: Date;

    @Prop({ required: true })
    checkOutDate: Date;

    @Prop({ required: true })
    adults: number;

    @Prop({ required: true })
    children: number;

    @Prop({ type: String, required: false })
    specialRequests?: string;

    @Prop({ required: true })
    offername:string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
