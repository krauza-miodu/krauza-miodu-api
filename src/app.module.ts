import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { SharedServicesModule } from './shared/services/shared-services.module';
import { ConfigService } from './shared/services/config/config.service';
import { ConfigModule } from './shared/services/config/config.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.config.DATABASE_HOST,
        port: configService.config.DATABASE_PORT,
        username: configService.config.DATABASE_USER,
        password: configService.config.DATABASE_PASSWORD,
        database: configService.config.DATABASE_NAME,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.isDevEnvironment()
      }),
      inject: [ConfigService]
    }),
    SharedServicesModule
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule {}
