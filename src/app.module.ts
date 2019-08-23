import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { SharedServicesModule } from './shared/services/shared-services.module';
import { CONFIG } from './shared/config/config.provider';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductCategoryModule } from './product-category/product-category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: CONFIG.DATABASE_HOST,
      port: CONFIG.DATABASE_PORT,
      username: CONFIG.DATABASE_USER,
      password: CONFIG.DATABASE_PASSWORD,
      database: CONFIG.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: CONFIG.isDevEnvironment()
    }),
    SharedServicesModule,
    AuthModule,
    UserModule,
    ProductCategoryModule
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule {}
