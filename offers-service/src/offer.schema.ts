import * as mongoose from 'mongoose';

export const OfferSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  imageUrl: String,
  hotelStars : String,
  startDate: Date,
  endDate: Date,
  place: String,
  transport: String,
  goingOutTimesPerWeek: String,
  goingOutType: String,
  // Field for storing image URL
  // You can also use Buffer for storing image files directly in the database
  // image: Buffer,
  // contentType: String, // If storing image as Buffer, you may also want to store the content type
  // Add any other properties as needed
});
