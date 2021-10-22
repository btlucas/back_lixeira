import { User } from '../user.entity';

export class ReturnInventoryDto {
  inventory: User["inventory"];
  message: string;
}
