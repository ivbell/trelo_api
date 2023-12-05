import fastifyCookie from '@fastify/cookie';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import 'winston-daily-rotate-file';
import { AppModule } from './app.module';
import { winstonFactory } from './config/factory/winston.factory';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger: WinstonModule.createLogger({ ...winstonFactory() }),
    },
  );
  const config = app.get(ConfigService);

  await app.register(fastifyCookie, {
    secret: config.get('cookie.secret'), // for cookies signature
  });

  app.useGlobalPipes(new ValidationPipe());

  const doc = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, doc);
  SwaggerModule.setup('api', app, document);
  const { ADDRESS = 'localhost', PORT = '3000' } = process.env;
  await app.listen(PORT, ADDRESS);
}

bootstrap();
