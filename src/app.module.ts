import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';

import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CartModule } from './modules/cart/cart.module';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule, CartModule, ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
