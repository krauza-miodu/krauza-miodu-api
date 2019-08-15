import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import * as compression from 'compression';
import * as rateLimit from 'express-rate-limit';

import { AppModule } from './app.module';
import { CONFIG } from './shared/config/config.provider';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());
  app.use(cookieParser());
  app.use(csurf({cookie: {key: 'XSRF-TOKEN', path: '/'}}));
  app.use(compression());
  app.use(rateLimit({
    windowMs: 60 * 1000, // max 100 requests per minute
    max: 100
  }));
  await app.listen(CONFIG.APP_PORT, CONFIG.APP_HOST);
}
bootstrap();
