import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Offer } from './offer.interface';
import { OffersService } from './offers.service';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  async create(@Body() offer: Offer): Promise<Offer> {
    return await this.offersService.create(offer);
  }

  @Get()
  async findAll(): Promise<Offer[]> {
    return await this.offersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Offer> {
    return await this.offersService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatedOffer: Offer): Promise<Offer> {
    return await this.offersService.update(id, updatedOffer);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Offer> {
    return await this.offersService.delete(id);
  }
}
