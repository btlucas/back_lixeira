import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateInventoryDto {
  @IsNotEmpty({
    message: 'Informe o id do usuário',
  })
  userId: string;

  @IsNotEmpty({
    message: 'Informe o id do produto',
  })
  productId: string;

  @IsOptional()
  @IsNotEmpty({
    message: 'Informe a quantidade a ser descartada',
  })
  quantity: number;
}
