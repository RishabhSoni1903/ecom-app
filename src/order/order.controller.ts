import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Order } from './order.entity';

@Controller('order')
export class OrderController {
    constructor( private orderService: OrderService ){}

    @UseGuards(JwtAuthGuard)
    @Post()
    async placeOrder(@Request() req): Promise<any> {
        return this.orderService.placeOrder(req.user.username)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getOrders(@Request() req): Promise<Order[]> {
        return await this.orderService.getOrders(req.user.username)
    }
}
