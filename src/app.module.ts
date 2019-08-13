import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { SharedServicesModule } from './shared/services/shared-services.module';

@Module({
  imports: [SharedServicesModule],
  controllers: [AppController],
  providers: []
})
export class AppModule {}
