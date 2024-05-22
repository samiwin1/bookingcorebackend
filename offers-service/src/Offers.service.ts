import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Offer } from './offer.interface';

@Injectable()
export class OffersService {
  constructor(@InjectModel('Offer') private readonly offerModel: Model<Offer>) {}

  async create(offer: Offer): Promise<Offer> {
    const createdOffer = new this.offerModel(offer);
    return createdOffer.save();
  }

  async findAll(): Promise<Offer[]> {
    return this.offerModel.find().exec();
  }

  async findOne(id: string): Promise<Offer> {
    return this.offerModel.findById(id).exec();
  }

  async update(id: string, updatedOffer: Offer): Promise<Offer> {
    return this.offerModel.findByIdAndUpdate(id, updatedOffer, { new: true }).exec();
  }

  async delete(id: string): Promise<Offer> {
    return this.offerModel.findByIdAndDelete(id).exec();
  }
  async findByFilter(filter: any): Promise<Offer[]> {
    const query = {};
    console.log(filter)

    if (filter.price !== undefined) {
      query['price'] = filter.price;
    }

    if (filter.hotelStars !== undefined) {
      query['hotelStars'] = filter.hotelStars;
    }

    if (filter.place !== undefined) {
      query['place'] = { $regex: filter.place, $options: 'i' }; // Case-insensitive regex for partial match
    }

    return this.offerModel.find(query).exec();
  }
}
