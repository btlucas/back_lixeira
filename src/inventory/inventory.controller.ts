import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Get,
  Param
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InventoryService } from './inventory.service';
import { ReturnFullInventoryDto } from './dto/return-full-inventory.dto';
import { ReturnInventoryDto } from './dto/return-inventory.dto';
@Controller('inventory')
@UseGuards(AuthGuard(), RolesGuard)
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  @Post()
  async updateInventory(
    @Body(ValidationPipe) updateInventoryDto: UpdateInventoryDto,
  ): Promise<ReturnInventoryDto>{
    const retorno = await this.inventoryService.updateInventory(updateInventoryDto);
    return {
      inventory: retorno.inventory,
      totalPoints: retorno.totalPoints,
      totalDiscards: retorno.totalDiscards
    };
  }

  @Get(':userId')
  async findInventoryByUserId(@Param('userId') userId){
    const inventory = await this.inventoryService.findInventoryByUserId(userId);
    return {
      inventory
    };
  }
}