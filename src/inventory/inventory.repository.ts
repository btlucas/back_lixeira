import { EntityRepository, Repository } from 'typeorm';
import { Inventory } from './inventory.entity';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { Product } from 'src/products/product.entity';
import { getConnection, getRepository, Connection } from "typeorm";

@EntityRepository(Inventory)
export class InventoryRepository extends Repository<Inventory> {
  async updateInventory(
    updateInventoryDto: UpdateInventoryDto,
  ): Promise<Inventory> {
    const { userId, productId } = updateInventoryDto;

    const inventory = this.create();
    await getConnection()
      .getRepository(User)
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.inventory", "inventory")
      .getMany();
    await getConnection()
      .getRepository(Product)
      .createQueryBuilder("product")
      .leftJoinAndSelect("product.inventory", "inventory")
      .getMany();
    try {
      await inventory.save();
      return inventory;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar o produto no banco de dados',
      );      
    }
  }
}