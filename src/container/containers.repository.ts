import { EntityRepository, Repository } from 'typeorm';
import { Container } from './container.entity';
import { CreateContainerDto } from './dto/create-container.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { FindContainersQueryDto } from './dto/find-containers-query.dto';

@EntityRepository(Container)
export class ContainerRepository extends Repository<Container> {
  async findContainers(
    queryDto: FindContainersQueryDto,
  ): Promise<{ containers: Container[]; total: number }> {
    queryDto.status = queryDto.status === undefined ? true : queryDto.status;
    queryDto.page = queryDto.page === undefined ? 1 : queryDto.page;
    queryDto.page = queryDto.page < 1 ? 1 : queryDto.page;
    queryDto.limit = queryDto.limit > 100 ? 100 : queryDto.limit;    

    const { status } = queryDto;
    const query = this.createQueryBuilder('container');
    query.where('container.status = :status', { status });

    // query.skip((queryDto.page - 1) * queryDto.limit);
    // query.take(+queryDto.limit);
    query.orderBy(queryDto.sort ? JSON.parse(queryDto.sort) : undefined);
    query.select(['container.id', 'container.name', 'container.code', 'container.location', 'container.type', 'container.totalCapacity', 'container.usedCapacity']);

    const [containers, total] = await query.getManyAndCount();

    return { containers, total };
  }

  async createContainer(
    createContainerDto: CreateContainerDto,
  ): Promise<Container> {
    const { name, code, location, type, totalCapacity, usedCapacity } = createContainerDto;

    const container = this.create();
    container.name = name;
    container.code = code;
    container.location = location;
    container.type = type;
    container.totalCapacity = totalCapacity;
    container.usedCapacity = usedCapacity;
    switch (true) {
      case container.usedCapacity < 60:
        container.capacityStatus = "ok";
        break;
      case container.usedCapacity <= 85:
        container.capacityStatus = "warning";
        break;
      default:
        container.capacityStatus = "alert";
        break;
    }  
    try {
      await container.save();
      return container;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('O código de identificação ja está sendo utilizado');
      } else {
        throw new InternalServerErrorException(
          'Erro ao salvar o container no banco de dados',
        );
      }
    }
  }
}