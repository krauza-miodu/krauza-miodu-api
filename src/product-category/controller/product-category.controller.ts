import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes, ValidationPipe
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ProductCategoryEntity } from '../entity/product-category.entity';
import { ProductCategoryService } from '../service/product-category.service';
import { CreateProductCategoryDTO } from '../dto/create-product-category.dto';
import { EditProductCategoryDTO } from '../dto/edit-product-category.dto';

@Controller('product-category')
export class ProductCategoryController {

  constructor(private productCategoryService: ProductCategoryService) {}

  @Get(':id')
  async getCategory(@Param('id') id: number): Promise<ProductCategoryEntity> {
    const category = await this.productCategoryService.findOneById(id);

    if (category) {
      return category;
    } else {
      throw new NotFoundException();
    }
  }

  @Get()
  async getCategories(): Promise<ProductCategoryEntity[]> {
    return await this.productCategoryService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @Post()
  async createCategory(@Body() body: CreateProductCategoryDTO) {
    return this.productCategoryService.create(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async patchCategory(@Param('id') id: number, @Body() body: EditProductCategoryDTO) {
    return this.productCategoryService.edit(id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteCategory(@Param('id') id: number) {
    return this.productCategoryService.remove(id);
  }

}
