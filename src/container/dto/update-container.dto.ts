import { IsString, IsOptional, IsJSON, MaxLength } from 'class-validator';
export class UpdateContainerDto {
  @IsOptional()
  @IsString({
    message: 'O código deve ser fornecido no formato string',
  })
  code: string;

  @IsOptional()
  @IsString({
    message: 'O nome deve ser fornecido no formato string',
  })
  name: string;

  @IsOptional()
  location: {
    cep: string,
    street: string,
    district: string,
    city: string,
    state: string
  }

  @IsOptional()
  @MaxLength(20, {
    message: 'O tipo do produto deve ter no maximo 20 caracteres.',
  })
  type: string;

  @IsOptional()
  totalCapacity: number;

  @IsOptional()
  usedCapacity: number;
}