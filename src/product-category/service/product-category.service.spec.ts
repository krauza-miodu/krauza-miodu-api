import { Test, TestingModule } from '@nestjs/testing';
import { ProductCategoryService } from './product-category.service';
import { ProductCategoryRepository } from '../repository/product-category.repository';

describe('ProductCategoryService', () => {
  let productCategoryService: ProductCategoryService;
  let productCategoryRepository: ProductCategoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductCategoryService,
        {
          provide: ProductCategoryRepository,
          useValue: {
            findOne: () => null
          }
        }
      ]
    }).compile();

    productCategoryService = module.get<ProductCategoryService>(ProductCategoryService);
    productCategoryRepository = module.get<ProductCategoryRepository>(ProductCategoryRepository);
  });

  it('should be defined', () => {
    expect(productCategoryService).toBeDefined();
  });
});
