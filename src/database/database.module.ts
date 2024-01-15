import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { configService } from 'src/config/config.service';

@Module({
  imports: [MongooseModule.forRoot(configService.getDbConfig())],
})
export class DatabaseModule {}
