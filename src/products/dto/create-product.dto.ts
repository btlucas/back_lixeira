import { IsNotEmpty, MaxLength, MinLength, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({
    message: 'Informe um código de barras.',
  })
  @IsString({
    message: 'O código deve ser fornecido no formato string',
  })
  @MaxLength(13, {
    message: 'O código deve ser uma string de no máximo 13 caracteres.',
  })
  @MinLength(1, {
    message: 'O código deve possuir pelo menos 1 caractere.',
  })
  code: string;

  @IsNotEmpty({
    message: 'Informe o nome do produto.',
  })
  @MaxLength(200, {
    message: 'O nome do produto deve ter no maximo 200 caracteres.',
  })
  name: string;

  @IsNotEmpty({
    message: 'Informe o tipo do produto.',
  })
  @MaxLength(20, {
    message: 'O tipo do produto deve ter no maximo 20 caracteres.',
  })
  type: string;

  @IsNotEmpty({
    message: 'Envie a imagem do produto.',
  })
  imageData: string;

  @IsNotEmpty({
    message: 'Informe os pontos que valem este produto.',
  })
  points: number;

  @IsNotEmpty({
    message: 'Informe a exp que vale este produto.',
  })
  exp: number;
}
