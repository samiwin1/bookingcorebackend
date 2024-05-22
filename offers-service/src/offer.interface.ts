// offer.interface.ts

import { ObjectId } from 'mongoose';

export interface Offer {
    name: string;
    description: string;
    price: number;
    startDate: Date;
    endDate: Date;
    hotelStars: number;
    place: string;
    transport: string;
    goingOutTimesPerWeek: number;
    goingOutType: string;
    imageUrl: string;
}

export interface OfferDocument {
    _id: ObjectId; // MongoDB ObjectID
    name: string;
    price: number;
    startDate: Date;
    endDate: Date;
    hotelStars: number;
    place: string;
    transport: string;
    goingOutTimesPerWeek: number;
    goingOutType: string;
    imageUrl: string;
    // Other properties if needed
}
