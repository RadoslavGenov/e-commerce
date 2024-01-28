import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ require: true })
  @ApiProperty({ example: 1, description: 'Name of a product' })
  name: string;

  @Prop({ require: true })
  @ApiProperty({ example: 1, description: 'Price of a product' })
  price: number;

  @Prop({ require: false })
  @ApiProperty({ example: '', description: 'Image url of the product' })
  imageUrl: string;

  @Prop({ default: 1 })
  @ApiProperty({ example: 1, description: 'Amount or a product' })
  amount: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
