import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContainerRepository } from './containers.repository';
import { ContainersService } from './containers.service';
import { ContainersController } from './containers.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContainerRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [ContainersService],
  controllers: [ContainersController],
})
export class ContainersModule {}