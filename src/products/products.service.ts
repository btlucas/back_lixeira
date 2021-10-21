import {
  Injectable,
  UnprocessableEntityException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from './products.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindProductsQueryDto } from './dto/find-products-query.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    return this.productRepository.createProduct(createProductDto);
  }

  async findProductById(productId: string): Promise<Product> {
    const product = await this.productRepository.findOne(productId, {
      select: ['code', 'name', 'type', 'id', 'points', 'discards', 'imageData', 'image'],
    });
    if (!product) throw new NotFoundException('Produto não encontrado');
    product.image = product.imageData.toString('base64')
    delete product.imageData
    return product;
  }

  async updateProduct(updateProductDto: UpdateProductDto, id: string): Promise<Product> {
    const product = await this.findProductById(id);
    const { code, name, type, imageData, points, discards } = updateProductDto;
    product.code = code ? code : product.code;
    product.name = name ? name : product.name;
    product.type = type ? type : product.type;
    product.points = points ? points : product.points;
    product.discards = discards ? discards : product.discards;     
    product.imageData = imageData ? Buffer.from(imageData, 'base64') : product.imageData;
    product.image = ""
    try {
      await product.save();
      product.image = product.imageData.toString('base64')
      delete product.imageData
      return product;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar os dados no banco de dados',
      );
    }
  }

  async deleteProduct(productId: string) {
    const result = await this.productRepository.delete({ id: productId });
    if (result.affected === 0) {
      throw new NotFoundException(
        'Não foi encontrado um produto com o ID informado',
      );
    }
  }

  async findProducts(
    queryDto: FindProductsQueryDto,
  ): Promise<{ products: Product[]; total: number }> {
    const products = await this.productRepository.findProducts(queryDto);
    return products;
  }
}