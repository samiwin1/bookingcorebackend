import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingsService } from './app.service'; 
import { BookingsController } from './app.controller'; 
import { Booking, BookingSchema } from './booking.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }])],
    controllers: [BookingsController],
    providers: [BookingsService],
})
export class BookingsModule {}
