import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(compression());
  await app.listen(process.env.NODE_ENV === 'production' ? 80 : 3000);
}
bootstrap();
