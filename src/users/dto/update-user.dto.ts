import { UserRole } from '../user-roles.enum';
import { IsString, IsEmail, IsOptional, IsInt, Min } from 'class-validator';
export class UpdateUserDto {
  @IsOptional()
  @IsString({
    message: 'Informe um nome de usuário válido',
  })
  name: string;

  @IsOptional()
  @IsEmail(
    {},
    {
      message: 'Informe um endereço de email válido',
    },
  )
  email: string;

  @IsOptional()
  imageData: string;

  @IsOptional()
  role: UserRole;

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
    message: 'Informe um valor inteiro de exp mensal, maior ou igual a 0',
  })
  @Min(0)
  monthlyExp: number;

  @IsOptional()
  @IsInt({
    message: 'Informe um número de inteiro descartes, maior ou igual a 0',
  })
  @Min(0)
  discards: number;

  @IsOptional()
  status: boolean;
}