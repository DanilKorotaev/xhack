import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';
import * as rateLimit from 'express-rate-limit';
import * as cookieParser from 'cookie-parser';

const PORT = process.env.SERVER_PORT ?? 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(cookieParser());
  app.use(
    rateLimit({
      windowMs: 60 * 1000, // 1 minute
      max: 200, // limit each IP to 100 requests per windowMs
    }),
  );
  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .setTitle('xHack.dev swagger documentation')
    .setDescription('This documents is api documentation for xHack.dev')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options, {

  });

  SwaggerModule.setup('swagger', app, document);

  await app.listen(PORT);
}
bootstrap();
