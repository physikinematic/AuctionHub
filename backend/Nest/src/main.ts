import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
config({ path: __dirname + '/../../.env' });

import { AppModule } from './app.module';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(
    cookieSession({
      keys: [process.env.COOKIE_SECRET],
    }),
  );
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
