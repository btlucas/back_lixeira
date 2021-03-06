import {
  Injectable,
  UnprocessableEntityException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserRole } from './user-roles.enum';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUsersQueryDto } from './dto/find-users-query.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async createAdminUser(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password != createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      return this.userRepository.createUser(createUserDto, UserRole.ADMIN);
    }
  }

  async findUserById(userId: string): Promise<User> {
    const user = await this.userRepository.findOne(userId, {
      select: ['email', 'name', 'role', 'id', 'points', 'discards', 'imageData', 'exp', 'monthlyExp'],
    });

    if (!user) throw new NotFoundException('Usuário não encontrado');

    return user;
  }

  async updateUser(updateUserDto: UpdateUserDto, id: string): Promise<User> {
    const user = await this.findUserById(id);
    const { name, email, role, status, points, discards, imageData, exp, monthlyExp } = updateUserDto;
    user.name = name ? name : user.name;
    user.email = email ? email : user.email;
    user.points = points ? points : user.points;
    user.exp = exp ? exp : user.exp;
    user.monthlyExp = monthlyExp ? monthlyExp : user.monthlyExp;
    user.discards = discards ? discards : user.discards;
    user.role = role ? role : user.role; 
    user.status = status === undefined ? user.status : status;
    user.imageData = imageData ? imageData : user.imageData;
    try {
      await user.save();
      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar os dados no banco de dados',
      );
    }
  }

  async deleteUser(userId: string) {
    const result = await this.userRepository.delete({ id: userId });
    if (result.affected === 0) {
      throw new NotFoundException(
        'Não foi encontrado um usuário com o ID informado',
      );
    }
  }

  async findUsers(
    queryDto: FindUsersQueryDto,
  ): Promise<{ users: User[]; total: number }> {
    const users = await this.userRepository.findUsers(queryDto);
    return users;
  }

  async findRankingByAllPoints(
    queryDto: FindUsersQueryDto,
  ): Promise<{ users: User[]; total: number }> {
    const users = await this.userRepository.findRankingByAllExp(queryDto);
    return users;
  }

  async findRankingByMonthlyExp(
    queryDto: FindUsersQueryDto,
  ): Promise<{ users: User[]; total: number }> {
    const users = await this.userRepository.findRankingByMonthlyExp(queryDto);
    return users;
  }
}