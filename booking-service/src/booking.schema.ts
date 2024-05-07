import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Booking extends Document {
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
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
