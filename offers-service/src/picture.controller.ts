import { Controller, Get, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { OffersService } from './offers.service';
import { Offer } from './offer.interface';
import { diskStorage } from 'multer';

@Controller('pictures')
export class PicturesController {
  constructor(private readonly offersService: OffersService) {}

  @Get()
  async findAll(): Promise<Offer[]> {
    return await this.offersService.findAll();
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public',
        filename: (req, file, cb) => {
          cb(null, '.jpg');
        },
      }),
    }),
  )
  async local(@UploadedFile() file: Express.Multer.File) {
    return {
      statusCode: 200,
      data: file,
    };
  }

  /*@Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return 'File uploaded successfully!';
  }*/
}
