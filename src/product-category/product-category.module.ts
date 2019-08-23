import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductCategoryRepository } from './repository/product-category.repository';
import { ProductCategoryController } from './controller/product-category.controller';
import { ProductCategoryService } from './service/product-category.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductCategoryRepository
    ])
  ],
  controllers: [
    ProductCategoryController
  ],
  providers: [
    ProductCategoryService
  ],
  exports: [
  ]
})
export class ProductCategoryModule {}
