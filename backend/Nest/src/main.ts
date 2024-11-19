import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
config({ path: __dirname + '/../../.env' });

import { AppModule } from './app.module';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });
  app.use(
    cookieSession({
      keys: [process.env.COOKIE_SECRET],
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      secure: false, // development
      sameSite: 'lax', // development
    }),
  );
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
