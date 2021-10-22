import { EntityRepository, Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { FindProductsQueryDto } from './dto/find-products-query.dto';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async findProducts(
    queryDto: FindProductsQueryDto,
  ): Promise<{ products: Product[]; total: number }> {
    queryDto.status = queryDto.status === undefined ? true : queryDto.status;
    queryDto.page = queryDto.page === undefined ? 1 : queryDto.page;
    queryDto.page = queryDto.page < 1 ? 1 : queryDto.page;
    queryDto.limit = queryDto.limit > 100 ? 100 : queryDto.limit;    

    const { code, name, type, points, discards, imageData, status } = queryDto;
    const query = this.createQueryBuilder('product');
    query.where('product.status = :status', { status });

    // query.skip((queryDto.page - 1) * queryDto.limit);
    // query.take(+queryDto.limit);
    query.orderBy(queryDto.sort ? JSON.parse(queryDto.sort) : undefined);
    query.select(['product.id', 'product.code', 'product.name', 'product.type', 'product.points', 'product.discards', 'product.imageData', 'product.status']);

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