import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SearchService {

  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>
  ) {}

  async searchProducts(keyword: string): Promise<Product[]> {

    return this.productRepository
      .createQueryBuilder('product')
      .where('LOWER(product.name) LIKE LOWER(:keyword)', { keyword: `%${keyword}%` })
      .orWhere('LOWER(product.brand) LIKE LOWER(:keyword)', { keyword: `%${keyword}%` })
      .getMany();
  }
}
