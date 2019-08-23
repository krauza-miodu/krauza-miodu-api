import { ProductCategoryName } from '../validation/product-category.validation';
import { IsString } from 'class-validator';

export class EditProductCategoryDTO {

  @ProductCategoryName()
  name?: string;

}
