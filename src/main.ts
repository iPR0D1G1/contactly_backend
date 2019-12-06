import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  const options = new DocumentBuilder()
    .setTitle('Contact test')
    .setDescription('This is the open api specification for this api')
    .setVersion('1.0')
    .addBearerAuth()
    // .setBasePath('api/v1')
    // .addTag('Contacts api')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/v1/docs', app, document);

  await app.listen(3000);
}
bootstrap();
