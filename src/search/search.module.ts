import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/product.entity';

@Module({
  controllers: [SearchController],
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [SearchService],
})
export class SearchModule {}
