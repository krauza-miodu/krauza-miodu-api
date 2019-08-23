import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

import { ProductCategoryRepository } from '../repository/product-category.repository';
import { ProductCategoryEntity } from '../entity/product-category.entity';
import { CreateProductCategoryDTO } from '../dto/create-product-category.dto';
import { EditProductCategoryDTO } from '../dto/edit-product-category.dto';
import { EntityNotFoundException } from '../../shared/exception/entity-not-found.exception';
import { UniqueConstraintViolationException } from '../../shared/exception/unique-constraint-violation.exception';
import { EntityIntegrityViolationException } from '../../shared/exception/entity-integrity-violation.exception';

@Injectable()
export class ProductCategoryService {

  constructor(
    private productCategoryRepository: ProductCategoryRepository,
    @InjectEntityManager() private readonly entityManager: EntityManager
  ) {}

  async findAll(): Promise<ProductCategoryEntity[]> {
    return await this.entityManager.getTreeRepository(ProductCategoryEntity).findTrees();
  }

  async findOneById(id: number): Promise<ProductCategoryEntity | null> {
    return await this.productCategoryRepository.findOne({id});
  }

  async findOneByName(name: string): Promise<ProductCategoryEntity | null> {
    return await this.productCategoryRepository.findOne({name});
  }

  async create(dto: CreateProductCategoryDTO): Promise<ProductCategoryEntity> {
    const category = new ProductCategoryEntity();
    category.name = dto.name;

    if (await this.findOneByName(dto.name)) {
      throw new UniqueConstraintViolationException('Category\'s name must be unique.');
    }

    if (dto.parentId) {
      const parent = await this.findOneById(dto.parentId);

      if (parent) {
        category.parent = parent;
      } else {
        throw new EntityNotFoundException('Invalid parentId.');
      }
    }

    return await this.entityManager.save(category);
  }

  async edit(id: number, dto: EditProductCategoryDTO): Promise<ProductCategoryEntity> {
    const category: ProductCategoryEntity = await this.findOneById(id);

    if (!category) {
      throw new EntityNotFoundException('Category not found.');
    }

    if (dto.name && dto.name !== category.name) {
      if (!(await this.findOneByName(dto.name))) {
        category.name = dto.name;
      } else {
        throw new UniqueConstraintViolationException('Category\'s name must be unique.');
      }
    }

    await this.entityManager.save(category);

    return category;
  }

  async remove(id: number): Promise<boolean> {
    const category = await this.findOneById(id);

    if (!category) {
      throw new EntityNotFoundException('Category not found.');
    }

    if (await this.productCategoryRepository.hasDescendants(category)) {
      throw new EntityIntegrityViolationException('Category with descendant categories cannot be removed.');
    }

    return await this.productCategoryRepository.deleteNode(category.id);
  }

}
