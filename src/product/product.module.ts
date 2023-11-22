import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Cart } from 'src/cart/cart.entity';
import { CartService } from 'src/cart/cart.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Cart,])],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
