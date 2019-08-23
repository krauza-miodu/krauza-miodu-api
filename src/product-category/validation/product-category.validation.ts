import { IsString } from 'class-validator';

export function ProductCategoryName(): any {
  return target => {
    IsString(target);
  };
}
