import { EntityRepository, Repository, Transaction } from 'typeorm';

import { ProductCategoryEntity } from '../entity/product-category.entity';

@EntityRepository(ProductCategoryEntity)
export class ProductCategoryRepository extends Repository<ProductCategoryEntity> {

  async hasDescendants(category: ProductCategoryEntity): Promise<boolean> {
    return await this.manager
      .getTreeRepository(ProductCategoryEntity)
      .countDescendants(category) > 1;
  }

  /**
   * This should be replaced with TypeORM's native implementation as soon as available.
   * It should be used only on leaf-nodes to ensure data integrity.
   */
  async deleteNode(id: number): Promise<boolean> {
    return await this.manager.transaction<boolean>(async () => {
      const closureTableMetadata = this.metadata.closureJunctionTable;

      const closureTableName = closureTableMetadata.tableName;
      const closureDescendantColumnName = closureTableMetadata.foreignKeys[1].columnNames[0];

      const removeClosure = await this.manager.query(
        `DELETE FROM \`${closureTableName}\` WHERE \`${closureDescendantColumnName}\` = ${id};`
      );
      const removeEntity = await this.delete(id);

      if (removeClosure && removeEntity) {
        return true;
      } else {
        throw new Error();
      }
    });
  }

}
