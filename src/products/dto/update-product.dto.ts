import { IsString, MinLength, IsOptional, IsInt, Min, MaxLength } from 'class-validator';
export class UpdateProductDto {
  @IsOptional()
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

  @IsOptional()
  @MaxLength(200, {
    message: 'O nome do produto deve ter no maximo 200 caracteres.',
  })
  name: string;

  @IsOptional()
  @MaxLength(20, {
    message: 'O tipo do produto deve ter no maximo 20 caracteres.',
  })
  type: string;

  @IsOptional()
  imageData: string;

  @IsOptional()
  @IsInt({
    message: 'Informe um valor inteiro de pontos, maior ou igual a 0',
  })
  @Min(0)
  points: number;

  @IsOptional()
  @IsInt({
    message: 'Informe um valor inteiro de exp, maior ou igual a 0',
  })
  @Min(0)
  exp: number;

  @IsOptional()
  @IsInt({
    message: 'Informe um número de inteiro descartes, maior ou igual a 0',
  })
  @Min(0)
  discards: number;
}