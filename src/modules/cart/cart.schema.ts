import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Product } from '../product/product.schema';
import mongoose, { HydratedDocument } from 'mongoose';

export type CartDocument = HydratedDocument<Cart>;

export class Cart {
  @Prop({ required: true })
  total: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
  orders: Product[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
