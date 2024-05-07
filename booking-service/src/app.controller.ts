import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { BookingsService } from './app.service'; 
import { Booking } from './booking.interface';

@Controller('bookings')
export class BookingsController {
    constructor(private readonly bookingsService: BookingsService) {}

    @Post()
    async create(@Body() booking: Booking): Promise<Booking> {
        return this.bookingsService.create(booking);
    }

    @Get()
    async findAll(): Promise<Booking[]> {
        return this.bookingsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Booking> {
        return this.bookingsService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updatedBooking: Booking): Promise<Booking> {
        return this.bookingsService.update(id, updatedBooking);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Booking> {
        return this.bookingsService.delete(id);
    }
}
