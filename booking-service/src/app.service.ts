import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from './booking.interface';
import { Booking as BookingModel } from './booking.schema';

@Injectable()
export class BookingsService {
    constructor(
        @InjectModel(BookingModel.name) private readonly bookingModel: Model<BookingModel>,
    ) {}

    async create(booking: Booking): Promise<Booking> {
        const newBooking = new this.bookingModel(booking);
        return newBooking.save();
    }

    async findAll(): Promise<Booking[]> {
        return this.bookingModel.find().exec();
    }

    async findOne(id: string): Promise<Booking> {
        return this.bookingModel.findById(id).exec();
    }

    async update(id: string, updatedBooking: Booking): Promise<Booking> {
        return this.bookingModel.findByIdAndUpdate(id, updatedBooking, { new: true }).exec();
    }

    async delete(id: string): Promise<Booking> {
        return this.bookingModel.findByIdAndDelete(id).exec();
    }
}
