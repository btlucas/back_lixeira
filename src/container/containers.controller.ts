import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Get,
  Param,
  Patch,
  ForbiddenException,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateContainerDto } from './dto/create-container.dto';
import { ContainersService } from './containers.service';
import { ReturnContainerDto } from './dto/return-container.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../auth/role.decorator';
import { UserRole } from '../users/user-roles.enum';
import { UpdateContainerDto } from './dto/update-container.dto';
import { User } from '../users/user.entity';
import { GetUser } from '../auth/get-user.decorator';
import { FindContainersQueryDto } from './dto/find-containers-query.dto';

@Controller('containers')
@UseGuards(AuthGuard(), RolesGuard)
export class ContainersController {
  constructor(private containersService: ContainersService) {}

  @Post()
  @Role(UserRole.ADMIN)
  async createContainer(
    @Body(ValidationPipe) createContainerDto: CreateContainerDto,
  ): Promise<ReturnContainerDto> {
    const container = await this.containersService.createContainer(createContainerDto);
    return {
      container,
      message: 'Container cadastrado com sucesso',
    };
  }

  @Get(':id')
  async findContainerById(
    @Param('id') id,
  ): Promise<ReturnContainerDto> {
    const container = await this.containersService.findContainerById(id);
    return {
      container,
      message: 'Container encontrado',
    };
  }

  @Get('/code/:code')
  async findContainerByCode(
    @Param('code') code, 
  ): Promise<ReturnContainerDto> {
    const container = await this.containersService.findContainerByCode(code);
    return {
      container,
      message: 'Container encontrado',
    };
  }

  @Patch(':id')
  async updateContainer(
    @Body(ValidationPipe) updateContainerDto: UpdateContainerDto,
    @GetUser() user: User,
    @Param('id') id: string,
  ) {
    if (user.role != UserRole.ADMIN && user.role != UserRole.GARBAGE_HUB ) {
      throw new ForbiddenException(
        'Você não tem autorização para acessar esse recurso',
      );
    } else {
      return this.containersService.updateContainer(updateContainerDto, id);
    }
  }

  @Delete(':id')
  @Role(UserRole.ADMIN)
  async deleteContainer(@Param('id') id: string) {
    await this.containersService.deleteContainer(id);
    return {
      message: 'Container removido com sucesso',
    };
  }

  @Get()
  async findContainers(
    @Query() query: FindContainersQueryDto
  ) {  
    const found = await this.containersService.findContainers(query);
    return {
      found,
      message: 'Containers encontrados',
    };
  }
}