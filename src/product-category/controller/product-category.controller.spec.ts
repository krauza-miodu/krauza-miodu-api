import { Test, TestingModule } from '@nestjs/testing';

import { ProductCategoryController } from './product-category.controller';

describe('ProductCategoryController', () => {
  let productCategoryController: ProductCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductCategoryController],
      providers: [
      ]
    }).compile();

    productCategoryController = module.get<ProductCategoryController>(ProductCategoryController);
  });

  it('should be defined', () => {
    expect(ProductCategoryController).toBeDefined();
  });
});
