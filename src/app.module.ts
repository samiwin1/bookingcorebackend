import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OffersModule } from 'offers-service/src/offers.module'; 
import { UsersModule } from 'user-management-service/src/Users.module'; 
import { BookingsModule } from 'booking-service/src/app.module';
import { ContactModule } from 'contact-service/src/app.module';




@Module({
  imports: [ 
    OffersModule,
    UsersModule,
    MongooseModule.forRoot('mongodb+srv://sam:GWliJTLJ8zJSLUjP@cluster0.7ir6kpe.mongodb.net/PFE', {
     
    }),
    BookingsModule,
    ContactModule
  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}
