import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './product.dto';
import { PageDto } from 'src/dto/page.dto';
import { Product } from './product.schema';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Get Products' })
  async getProducts(@Query() pagination: PageDto) {
    return this.productService.getProducts(
      pagination.page,
      pagination.itemsPerPage,
    );
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The product record',
    type: Product,
  })
  async getProduct(@Param() { id }: { id: string }) {
    return this.productService.getProduct(id);
  }

  @Post('create')
  async createProduct(@Body() createProdoctDto: CreateProductDto) {
    return this.productService.createProduct(createProdoctDto);
  }
}
