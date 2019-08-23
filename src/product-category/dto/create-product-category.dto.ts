import { ProductCategoryName } from '../validation/product-category.validation';
import { IsString } from 'class-validator';

export class CreateProductCategoryDTO {

  parentId?: number;

  @IsString()
  name: string;

}
