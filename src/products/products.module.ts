import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './products.repository';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}