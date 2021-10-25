import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryRepository } from './inventory.repository';
import { getRepository, getConnection } from "typeorm";
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Inventory } from './inventory.entity';
import { User } from 'src/users/user.entity';
import { ReturnInventoryDto } from './dto/return-inventory.dto';
import { ReturnFullInventoryDto } from './dto/return-full-inventory.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(InventoryRepository)
    private inventoryRepository: InventoryRepository,
  ) {}

  async updateInventory(updateInventoryDto: UpdateInventoryDto): Promise<ReturnInventoryDto> {
    return this.inventoryRepository.updateInventory(updateInventoryDto);
  }

  async findInventoryByUserId(userId: string): Promise<ReturnFullInventoryDto> {
    const inventory = await getRepository(Inventory)
      .createQueryBuilder('inventory')
      .leftJoinAndSelect("inventory.product","product")
      .where("inventory.user = :userId", { userId: userId })
      .getMany();  
    const user = await getConnection()
      .createQueryBuilder()
      .select("user")
      .from(User, "user")
      .where("user.id = :id", { id: userId })
      .getOne();
    if (!inventory) throw new NotFoundException('Nenhum inventario encontrado');
    return {
      inventory,
      totalPoints: user.points,
      totalDiscards: user.discards
    }
  }
}