import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.enableCors();

    // Serve static assets from the 'pics' folder
    app.useStaticAssets(join(__dirname, 'pics'));

    await app.listen(3000);
}

bootstrap();
