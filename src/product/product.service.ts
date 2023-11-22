import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/auth/user.entity';
import { CartService } from 'src/cart/cart.service';
import { Cart } from 'src/cart/cart.entity';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
    // private cartService: CartService
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
    const itemId = id;
    if(user.role == 'admin') {
      await this.cartRepository
  .createQueryBuilder()
  .delete()
  .from(Cart)
  .where('itemId = :itemId', { itemId })
  .execute();
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
