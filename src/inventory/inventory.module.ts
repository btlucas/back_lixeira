import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryRepository } from './inventory.repository';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([InventoryRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [InventoryService],
  controllers: [InventoryController],
})
export class InventoryModule {}