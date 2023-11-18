import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/product.entity';

@Module({
  controllers: [CategoryController],
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [CategoryService,],
})
export class CategoryModule {}
