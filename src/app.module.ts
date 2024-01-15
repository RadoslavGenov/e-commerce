import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';

import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
