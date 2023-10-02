import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Product } from 'src/product/product.entity';
import { Cart } from 'src/cart/cart.entity';
import { Users } from 'src/auth/user.entity';
import { CartService } from 'src/cart/cart.service';
import { ProductService } from 'src/product/product.service';
import { OrderController } from './order.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Product, Cart, Users])],
  // controllers: [OrderController],
  providers: [OrderService, CartService, ProductService],
  controllers: [OrderController]
})
export class OrderModule {}
