import {
  Injectable,
  UnprocessableEntityException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryRepository } from './inventory.repository';
import { getConnection } from "typeorm";
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Inventory } from './inventory.entity';

@Injectable()
export class InventorysService {
  constructor(
    @InjectRepository(InventoryRepository)
    private inventoryRepository: InventoryRepository,
  ) {}

  async updateInventory(updateInventoryDto: UpdateInventoryDto): Promise<Inventory> {
    return this.inventoryRepository.updateInventory(updateInventoryDto);
  }

  // async findInventoryById(inventoryId: string): Promise<Inventory> {
  //   const inventory = await this.inventoryRepository.findOne(inventoryId, {
  //     select: ['code', 'name', 'type', 'id', 'points', 'discards', 'imageData', 'status'],
  //   });
  //   if (!inventory) throw new NotFoundException('Produto não encontrado');
  //   return inventory;
  // }

  // async findInventoryByCode(inventoryCode: string): Promise<Inventory> {
  //   const inventory = await this.inventoryRepository.findOne({ 
  //     select: ['code', 'name', 'type', 'id', 'points', 'discards', 'imageData', 'status'], 
  //     where: { 
  //       code: inventoryCode 
  //     }
  //   });
  //   if (!inventory) throw new NotFoundException('Produto não encontrado');
  //   return inventory;
  // }

  // async updateInventory(updateInventoryDto: UpdateInventoryDto, id: string): Promise<Inventory> {
  //   const inventory = await this.findInventoryById(id);
  //   const { code, name, type, imageData, points, discards } = updateInventoryDto;
  //   inventory.code = code ? code : inventory.code;
  //   inventory.name = name ? name : inventory.name;
  //   inventory.type = type ? type : inventory.type;
  //   inventory.points = points ? points : inventory.points;
  //   inventory.discards = discards ? discards : inventory.discards;     
  //   inventory.imageData = imageData ? imageData : inventory.imageData;
  //   try {
  //     await inventory.save();
  //     return inventory;
  //   } catch (error) {
  //     throw new InternalServerErrorException(
  //       'Erro ao salvar os dados no banco de dados',
  //     );
  //   }
  // }

  // async deleteInventory(inventoryId: string) {
  //   const result = await this.inventoryRepository.delete({ id: inventoryId });
  //   if (result.affected === 0) {
  //     throw new NotFoundException(
  //       'Não foi encontrado um produto com o ID informado',
  //     );
  //   }
  // }

  // async findInventorys(
  //   queryDto: FindInventorysQueryDto,
  // ): Promise<{ inventorys: Inventory[]; total: number }> {
  //   const inventorys = await this.inventoryRepository.findInventorys(queryDto);
  //   return inventorys;
  // }
}