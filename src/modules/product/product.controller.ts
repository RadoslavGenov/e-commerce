import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './product.dto';
import { PageDto } from 'src/dto/page.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(@Query() pagination: PageDto) {
    return this.productService.getProducts(
      pagination.page,
      pagination.itemsPerPage,
    );
  }

  @Get(':id')
  async getProduct(@Param() { id }: { id: string }) {
    return this.productService.getProduct(id);
  }

  @Post('create')
  async createProduct(@Body() createProdoctDto: CreateProductDto) {
    return this.productService.createProduct(createProdoctDto);
  }
}
