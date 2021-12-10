import { EntityRepository, Repository } from 'typeorm';
import { Inventory } from './inventory.entity';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import {
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { Product } from 'src/products/product.entity';
import { getConnection } from "typeorm";
import { ReturnInventoryDto } from './dto/return-inventory.dto';
@EntityRepository(Inventory)
export class InventoryRepository extends Repository<Inventory> {
  async updateInventory(
    updateInventoryDto: UpdateInventoryDto,
  ): Promise<ReturnInventoryDto> {
    const { userId, productId } = updateInventoryDto;
    const user = await getConnection()
      .createQueryBuilder()
      .select("user")
      .from(User, "user")
      .where("user.id = :id", { id: userId })
      .getOne();
    if(!user){
      throw new NotFoundException(
              'Não foi encontrado um usuario com o ID informado',
            )
    }
    const product = await getConnection()
      .createQueryBuilder()
      .select("product")
      .from(Product, "product")
      .where("product.id = :id", { id: productId })
      .getOne();
    if(!product){
      throw new NotFoundException(
              'Não foi encontrado um produto com o ID informado',
            )
    }
    let inventory = await getConnection()
      .createQueryBuilder()
      .select("inventory")
      .from(Inventory, "inventory")
      .where("inventory.product = :product and inventory.user = :user", { product: product.id, user: user.id })
      .getOne();     
    if(!inventory){
      inventory = this.create();
      inventory.user = user;
      user.points += product.points;
      user.exp += product.exp;
      user.monthlyExp += product.exp;
      user.discards += 1;
      inventory.product = product;
      inventory.discards = 1;
      inventory.points = inventory.product.points;
      inventory.exp = inventory.product.exp;
      delete inventory.user.password
      delete inventory.user.salt
      delete inventory.user.confirmationToken
      delete inventory.user.recoverToken
    }else{
      inventory.discards += 1;
      inventory.points += product.points;
      user.points += product.points;
      inventory.exp += product.exp;
      user.exp += product.exp;
      user.monthlyExp += product.exp;
      user.discards += 1;
    }
    try {
      await inventory.save();
      await user.save();
      return {
        inventory,
        totalPoints: user.points,
        totalDiscards: user.discards,
        totalExp: user.exp
      }
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar o produto no banco de dados',
      );      
    }
  }
}