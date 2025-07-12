import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { ValidationException } from 'src/core/exceptions/validation.exception';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { GlobalExceptionFilter } from 'src/core/filters/global.filter';
import * as express from 'express';
import { AuthModule } from './api/auth/auth.module';
import { AuthGuard } from './api/auth/guards/auth.guard';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
   const app = await NestFactory.create<NestExpressApplication>(AppModule);

   app.use(cookieParser())

   app.use(express.json({ limit: '50mb' }));
   app.use(express.urlencoded({ extended: false, limit: '50mb' }));
   app.disable('x-powered-by');
   app.use(helmet());

   const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');
   app.enableCors({
      origin: allowedOrigins,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
   });

   app.useGlobalPipes(
      new ValidationPipe({
         transform: true, whitelist: true, forbidNonWhitelisted: true,
         exceptionFactory(errors) {
            return new ValidationException(errors);
         },
      }),
   );

   const httpAdapterHost = app.get(HttpAdapterHost);
   app.useGlobalFilters(new GlobalExceptionFilter(httpAdapterHost));

   const authGuard = app.select(AuthModule).get(AuthGuard);
   app.useGlobalGuards(authGuard);

   const swaggerConfig = new DocumentBuilder()
      .setTitle('TradeHub API🏬')
      .setDescription('Welcome to the TradeHub API, your gateway to building powerful integrations with our dynamic e-commerce platform. This API enables developers to seamlessly interact with TradeHub’s ecosystem supporting buyers, merchants, products, orders, payments, authentication, and more.')
      .setVersion('1.0.0')
      .addCookieAuth()
      .addServer('https://tradehub-be-dev.onrender.com')
      .addServer('http://localhost:4000')
      .build();

   const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig);
   SwaggerModule.setup('api/docs', app, swaggerDoc);

   const expressApp = app.getHttpAdapter().getInstance();
   expressApp.get('/health-check', (_, res: express.Response) => {
      res.json({ status: 'OK' });
   });

   const configService = app.get(ConfigService);
   const PORT = configService.get('PORT') || 3000;

   await app.listen(PORT);
   console.info(`Server running on: port ${PORT}`);
}
bootstrap();
