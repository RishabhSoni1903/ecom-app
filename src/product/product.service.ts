import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/auth/user.entity';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>
  ) {}

  async create(product: Product, user: Users): Promise<Product> {
    // console.log(user)
    if(user.role == 'admin'){
          return await this.productRepository.save(product);
        } throw new UnauthorizedException()
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
}
