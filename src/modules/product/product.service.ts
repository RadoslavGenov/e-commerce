import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './product.schema';
import { Error, Model } from 'mongoose';
import { CreateProductDto } from './product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async getProducts(
    page: number,
    itemsPerPage: number,
  ): Promise<ProductDocument[]> {
    const products = await this.productModel
      .find()
      .sort({ _id: -1 })
      .skip(page > 0 ? (page - 1) * itemsPerPage : 0)
      .limit(itemsPerPage);

    return products;
  }

  async getProduct(id: string): Promise<Product> {
    const product = await this.productModel.findById(id);

    if (!product) {
      throw new NotFoundException(`No product with id: ${id}`);
    }

    return product;
  }

  async createProduct(createProdoctDto: CreateProductDto): Promise<Product> {
    try {
      this.productModel.validate(createProdoctDto, ['price', 'name']);
    } catch (error) {
      if (error instanceof Error.ValidationError) {
        const fields = Object.keys(error.errors);
        throw new Error(`Missing fields: ${fields.join(',')}`);
      }
    }

    const newProduct = new this.productModel(createProdoctDto);

    return newProduct.save();
  }
}
