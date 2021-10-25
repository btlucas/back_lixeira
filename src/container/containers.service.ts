import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContainerRepository } from './containers.repository';
import { CreateContainerDto } from './dto/create-container.dto';
import { Container } from './container.entity';
import { UpdateContainerDto } from './dto/update-container.dto';
import { FindContainersQueryDto } from './dto/find-containers-query.dto';

@Injectable()
export class ContainersService {
  constructor(
    @InjectRepository(ContainerRepository)
    private containerRepository: ContainerRepository,
  ) {}

  async createContainer(createContainerDto: CreateContainerDto): Promise<Container> {
    return this.containerRepository.createContainer(createContainerDto);
  }

  async findContainerById(containerId: string): Promise<Container> {
    const container = await this.containerRepository.findOne(containerId, {
      select: ['code', 'location', 'type', 'id', 'totalCapacity', 'usedCapacity', 'status'],
    });
    if (!container) throw new NotFoundException('Container não encontrado');
    return container;
  }

  async findContainerByCode(containerCode: string): Promise<Container> {
    const container = await this.containerRepository.findOne({ 
      select: ['code', 'location', 'type', 'id', 'totalCapacity', 'usedCapacity', 'status'], 
      where: { 
        code: containerCode 
      }
    });
    if (!container) throw new NotFoundException('Container não encontrado');
    return container;
  }

  async updateContainer(updateContainerDto: UpdateContainerDto, id: string): Promise<Container> {
    const container = await this.findContainerById(id);
    const { code, location, type, totalCapacity, usedCapacity } = updateContainerDto;
    container.code = code ? code : container.code;
    container.location = location ? location : container.location;
    container.type = type ? type : container.type;
    container.totalCapacity = totalCapacity ? totalCapacity : container.totalCapacity;
    container.usedCapacity = usedCapacity ? usedCapacity : container.usedCapacity;
    try {
      await container.save();
      return container;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar os dados no banco de dados',
      );
    }
  }

  async deleteContainer(containerId: string) {
    const result = await this.containerRepository.delete({ id: containerId });
    if (result.affected === 0) {
      throw new NotFoundException(
        'Não foi encontrado um container com o ID informado',
      );
    }
  }

  async findContainers(
    queryDto: FindContainersQueryDto,
  ): Promise<{ containers: Container[]; total: number }> {
    const containers = await this.containerRepository.findContainers(queryDto);
    return containers;
  }
}