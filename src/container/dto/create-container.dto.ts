import { IsNotEmpty, MaxLength, IsString, IsJSON, IsNumber } from 'class-validator';

export class CreateContainerDto {
  @IsNotEmpty({
    message: 'Informe um código de identificação para a lixeira.',
  })
  @IsString({
    message: 'O código deve ser fornecido no formato string',
  })
  code: string;

  @IsNotEmpty({
    message: 'Informe um nome de identificação para a lixeira.',
  })
  @IsString({
    message: 'O nome deve ser fornecido no formato string',
  })
  name: string;

  @IsNotEmpty({
    message: 'Informe o endereço da lixeira.',
  })
  location: {
    cep: string,
    street: string,
    district: string,
    city: string,
    state: string
  }

  @IsNotEmpty({
    message: 'Informe o tipo de lixo que a lixeira aceita.',
  })
  @MaxLength(20, {
    message: 'O tipo do produto deve ter no maximo 20 caracteres.',
  })
  type: string;

  @IsNotEmpty({
    message: 'Informe a capacidade total da lixeira.',
  })
  totalCapacity: number;

  @IsNotEmpty({
    message: 'Informe a capacidade ocupada da lixeira.',
  })
  usedCapacity: number;
}
