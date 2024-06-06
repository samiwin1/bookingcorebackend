import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';
import { OfferSchema } from './offer.schema'; // Import OfferSchema if needed
import { PicturesController } from './picture.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Offer', schema: OfferSchema }]),
  ],
  controllers: [OffersController, PicturesController],
  providers: [OffersService],
})
export class OffersModule {}
