import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
const cookieSession = require('cookie-session');

async function bootstrap() {
  config({ path: __dirname + '/../../.env' });
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys: [process.env.COOKIE_SECRET]
  }))
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();