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
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { ReturnProductDto } from './dto/return-product.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../auth/role.decorator';
import { UserRole } from '../users/user-roles.enum';
import { UpdateProductDto } from './dto/update-product.dto';
import { User } from '../users/user.entity';
import { GetUser } from '../auth/get-user.decorator';
import { FindProductsQueryDto } from './dto/find-products-query.dto';

@Controller('products')
@UseGuards(AuthGuard(), RolesGuard)
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  @Role(UserRole.ADMIN)
  async createProduct(
    @Body(ValidationPipe) createProductDto: CreateProductDto,
  ): Promise<ReturnProductDto> {
    const product = await this.productsService.createProduct(createProductDto);
    return {
      product,
      message: 'Produto cadastrado com sucesso',
    };
  }

  @Get(':id')
  @Role(UserRole.ADMIN)
  async findProductById(@Param('id') id): Promise<ReturnProductDto> {
    const product = await this.productsService.findProductById(id);
    return {
      product,
      message: 'Produto encontrado',
    };
  }

  @Get('/code/:code')
  async findProductByCode(@Param('code') code): Promise<ReturnProductDto> {
    const product = await this.productsService.findProductByCode(code);
    return {
      product,
      message: 'Produto encontrado',
    };
  }

  @Patch(':id')
  async updateProduct(
    @Body(ValidationPipe) updateProductDto: UpdateProductDto,
    @GetUser() user: User,
    @Param('id') id: string,
  ) {
    if (user.role != UserRole.ADMIN) {
      throw new ForbiddenException(
        'Você não tem autorização para acessar esse recurso',
      );
    } else {
      return this.productsService.updateProduct(updateProductDto, id);
    }
  }

  @Delete(':id')
  @Role(UserRole.ADMIN)
  async deleteProduct(@Param('id') id: string) {
    await this.productsService.deleteProduct(id);
    return {
      message: 'Produto removido com sucesso',
    };
  }

  @Get()
  async findProducts(@Query() query: FindProductsQueryDto) {
    const found = await this.productsService.findProducts(query);
    return {
      found,
      message: 'Produtos encontrados',
    };
  }
}