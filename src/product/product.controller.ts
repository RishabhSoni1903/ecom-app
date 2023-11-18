import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() product: Product) {
    return await this.productService.create(product, req.user);
  }

  @Get()
  async findAll() {
    return await this.productService.findAll();
  }
  
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.productService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() product: Product, @Request() req) {
    return this.productService.update(id, product, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    return await this.productService.remove(id, req.user);
  }
}
