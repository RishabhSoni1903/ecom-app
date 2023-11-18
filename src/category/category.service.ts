import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>
  ) {}

  findByCategory(category: string) {
    return this.productRepository.find({where: {category}});
  }
}
