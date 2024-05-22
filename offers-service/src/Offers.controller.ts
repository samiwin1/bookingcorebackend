import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { Offer } from './offer.interface';
import { OffersService } from './offers.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public',
        filename: (req, file, cb) => {
          cb(null, file.originalname+(Math.random()*1000).toString()+'.jpg');
        },
      }),
    }),
  )
  async create(@Body() offer: Offer, @UploadedFile() file: Express.Multer.File): Promise<Offer> {
    console.log(file)
    offer.imageUrl = file.filename
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
  @Get('/search/filter')
  async findByFilter(@Query() filter){
    return await this.offersService.findByFilter(filter);
  }
}
