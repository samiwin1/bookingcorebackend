import { NestFactory } from '@nestjs/core';
import { OffersModule } from './Offers.module';

async function bootstrap() {
  const app = await NestFactory.create(OffersModule);
  await app.listen(3000);
}
bootstrap();
