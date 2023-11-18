import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get(':keyword')
  searchProducts( @Param('keyword') keyword: string) {
    return this.searchService.searchProducts(keyword);
  }
}
