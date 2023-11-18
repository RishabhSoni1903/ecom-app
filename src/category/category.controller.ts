import { Controller, Get, Param } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get(':category')
  async findByCategory(@Param('category') category: string) {
    return await this.categoryService.findByCategory(category);
  }
}
