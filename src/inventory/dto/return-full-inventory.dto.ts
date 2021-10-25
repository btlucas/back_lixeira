import { Inventory } from "../inventory.entity";

export class ReturnFullInventoryDto {
  inventory: Inventory[];
  totalPoints: number;
  totalDiscards: number;
}
