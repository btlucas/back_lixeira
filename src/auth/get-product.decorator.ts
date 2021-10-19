import { createParamDecorator } from '@nestjs/common';
import { Product } from 'src/products/product.entity';

export const GetProduct = createParamDecorator(
  (data, req): Product => {
    const product = req.args[0].product;
    return product;
  },
);