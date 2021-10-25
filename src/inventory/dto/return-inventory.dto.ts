import { Inventory } from "../inventory.entity";

export class ReturnInventoryDto {
  inventory: Inventory;
  totalPoints: number;
  totalDiscards: number;
}
