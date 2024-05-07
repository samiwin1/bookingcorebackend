
export interface Offer {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: String,
    // Add any other properties as needed
  }


import { ObjectId } from 'mongoose';

export interface OfferDocument {
  _id: ObjectId; // MongoDB ObjectID
  id: string; // Unique identifier for the offer
  name: string;
  description: string;
  price: number;
  imageUrl: String,
  // Other properties if needed
}