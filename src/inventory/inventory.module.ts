// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ProductRepository } from './inventory.repository';
// import { ProductsService } from './inventory.service';
// import { ProductsController } from './inventory.controller';
// import { PassportModule } from '@nestjs/passport';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([ProductRepository]),
//     PassportModule.register({ defaultStrategy: 'jwt' }),
//   ],
//   providers: [ProductsService],
//   controllers: [ProductsController],
// })
// export class ProductsModule {}