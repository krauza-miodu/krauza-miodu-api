import { Column, Entity, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from 'typeorm';

@Entity('product-category')
@Tree('closure-table')
export class ProductCategoryEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    nullable: false,
    unique: true
  })
  name: string;

  @TreeChildren()
  children: ProductCategoryEntity[];

  @TreeParent()
  parent: ProductCategoryEntity;

}
