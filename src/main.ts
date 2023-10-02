require('dotenv').config({path:__dirname+'/./../../.env'})
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Nestjs E-commerce App')
    .setDescription('Simple Nestjs E-commerce API which implements user authentication with JWT and protect certain endpoints using Passport.')
    .setVersion('1.0')
    .addTag('ecom-app')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors()
  await app.listen(3000);
}
bootstrap();
