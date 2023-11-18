import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Users } from 'src/auth/user.entity';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>
  ) {}

  async create(product: Product, user: Users): Promise<Product> {
    if (user.role === 'admin') {
      try {
        return await this.productRepository.save(product);
      } catch (error) {
        throw new InternalServerErrorException('Failed to create the product.');
      }
    } else {
      throw new UnauthorizedException('You are not authorized to create a product.');
    }
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne(id: number) {
    return await this.productRepository.findOne({where: {id}});
  }

  async update(id: number, product: Product, user: Users) {
    if(user.role == 'admin') {
          return await this.productRepository.update(id, product);
      } throw new UnauthorizedException();
  }

  async remove(id: number, user: Users) {
    if(user.role == 'admin') {
      return await this.productRepository.delete(id);
        } throw new UnauthorizedException();
  }

  async searchProducts(keyword: string): Promise<Product[]> {

    return this.productRepository
      .createQueryBuilder('product')
      .where('LOWER(product.product_name) LIKE LOWER(:keyword)', { keyword: `%${keyword}%` })
      .orWhere('LOWER(product.description) LIKE LOWER(:keyword)', { keyword: `%${keyword}%` })
      .getMany();
  }
}
