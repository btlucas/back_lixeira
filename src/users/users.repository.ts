import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from './user-roles.enum';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CredentialsDto } from '../auth/dto/credentials.dto';
import { FindUsersQueryDto } from './dto/find-users-query.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findUsers(
    queryDto: FindUsersQueryDto,
  ): Promise<{ users: User[]; total: number }> {
    queryDto.status = queryDto.status === undefined ? true : queryDto.status;
    queryDto.page = queryDto.page === undefined ? 1 : queryDto.page;
    queryDto.page = queryDto.page < 1 ? 1 : queryDto.page;
    queryDto.limit = queryDto.limit > 100 ? 100 : queryDto.limit;

    const { status} = queryDto;
    const query = this.createQueryBuilder('user');
    query.where('user.status = :status', { status });

    query.orderBy(queryDto.sort ? JSON.parse(queryDto.sort) : undefined);
    query.select(['user.id', 'user.name', 'user.email', 'user.role', 'user.status', 'user.points', 'user.discards', 'user.imageData', 'user.status', 'user.exp', 'user.monthlyExp']);

    const [users, total] = await query.getManyAndCount();

    return { users, total };
  }

  async findRankingByAllExp(
    queryDto: FindUsersQueryDto,
  ): Promise<{ users: User[]; total: number }> {
    queryDto.status = queryDto.status === undefined ? true : queryDto.status;
    queryDto.page = queryDto.page === undefined ? 1 : queryDto.page;
    queryDto.page = queryDto.page < 1 ? 1 : queryDto.page;
    queryDto.limit = queryDto.limit > 100 ? 100 : queryDto.limit;

    const { status} = queryDto;
    const query = this.createQueryBuilder('user');
    query.where('user.status = :status', { status });

    query.orderBy('user.exp', 'DESC');
    query.select(['user.name', 'user.discards', 'user.imageData', 'user.exp']);

    const [users, total] = await query.getManyAndCount();

    return { users, total };
  }

  async findRankingByMonthlyExp(
    queryDto: FindUsersQueryDto,
  ): Promise<{ users: User[]; total: number }> {
    queryDto.status = queryDto.status === undefined ? true : queryDto.status;
    queryDto.page = queryDto.page === undefined ? 1 : queryDto.page;
    queryDto.page = queryDto.page < 1 ? 1 : queryDto.page;
    queryDto.limit = queryDto.limit > 100 ? 100 : queryDto.limit;

    const { status} = queryDto;
    const query = this.createQueryBuilder('user');
    query.where('user.status = :status', { status });

    query.orderBy('user.monthlyExp', 'DESC');
    query.select(['user.name', 'user.discards', 'user.imageData', 'user.monthlyExp']);

    const [users, total] = await query.getManyAndCount();

    return { users, total };
  }

  async createUser(
    createUserDto: CreateUserDto,
    role: UserRole,
  ): Promise<User> {
    const { email, name, password, imageData } = createUserDto;

    const user = this.create();
    user.email = email;
    user.name = name;
    user.role = role;
    user.imageData = imageData;
    user.points = 0;
    user.exp = 0;
    user.monthlyExp = 0;
    user.discards = 0;
    user.status = true;
    user.confirmationToken = crypto.randomBytes(32).toString('hex');
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    try {
      await user.save();
      delete user.password;
      delete user.salt;
      return user;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('Endere??o de email j?? est?? em uso');
      } else {
        throw new InternalServerErrorException(
          'Erro ao salvar o usu??rio no banco de dados',
        );
      }
    }
  }

  async checkCredentials(credentialsDto: CredentialsDto): Promise<User> {
    const { email, password } = credentialsDto;
    const user = await this.findOne({ email, status: true });

    if (user && (await user.checkPassword(password))) {
      return user;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}