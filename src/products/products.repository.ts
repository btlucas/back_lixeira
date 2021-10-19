import { EntityRepository, Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductRole } from './product-roles.enum';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CredentialsDto } from '../auth/dto/credentials.dto';
import { FindProductsQueryDto } from './dto/find-products-query.dto';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async findProducts(
    queryDto: FindProductsQueryDto,
  ): Promise<{ products: Product[]; total: number }> {
    queryDto.page = queryDto.page < 1 ? 1 : queryDto.page;
    queryDto.limit = queryDto.limit > 100 ? 100 : queryDto.limit;

    const { code, name, type, points, discards, imageData } = queryDto;
    const query = this.createQueryBuilder('product');
    query.where('product.status = :status', { status });

    if (code) {
      query.andWhere('product.code ILIKE :code', { code: `%${code}%` });
    }

    if (name) {
      query.andWhere('product.name ILIKE :name', { name: `%${name}%` });
    }

    if (type) {
      query.andWhere('product.type ILIKE :type', { type: `%${type}` });
    }

    if (points) {
      query.andWhere('product.points ILIKE :points', { points: `%${points}` });
    }

    if (discards) {
      query.andWhere('product.discards ILIKE :discards', { discards: `%${discards}` });
    }

    if (imageData) {
      query.andWhere('product.imageData ILIKE :imageData', { imageData: `%${imageData}` });
    }

    query.skip((queryDto.page - 1) * queryDto.limit);
    query.take(+queryDto.limit);
    query.orderBy(queryDto.sort ? JSON.parse(queryDto.sort) : undefined);
    query.select(['product.code', 'product.name', 'product.type', 'product.points', 'product.discards', 'product.imageData']);

    const [products, total] = await query.getManyAndCount();

    return { products, total };
  }

  async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<Product> {
    const { code, name, type, imageData, points } = createProductDto;

    const product = this.create();
    product.code = code;
    product.name = name;
    product.type = type;
    product.points = points;
    product.imageData = imageData;
    try {
      await product.save();
      return product;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('O código de barras ja está sendo utilizado');
      } else {
        throw new InternalServerErrorException(
          'Erro ao salvar o produto no banco de dados',
        );
      }
    }
  }
}