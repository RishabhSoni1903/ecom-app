import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { Product } from 'src/product/product.entity';
import { Users } from 'src/auth/user.entity';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ProductService } from 'src/product/product.service';

@Module({
    imports: [TypeOrmModule.forFeature([Cart, Product, Users])],
    providers: [CartService, ProductService],
    controllers: [CartController],
    exports: [CartService]
})
export class CartModule {}
