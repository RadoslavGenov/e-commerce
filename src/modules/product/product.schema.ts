import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

export class Product {
  @Prop({ require: true })
  name: string;

  @Prop({ require: true })
  price: number;

  @Prop({ default: 1 })
  amount: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);