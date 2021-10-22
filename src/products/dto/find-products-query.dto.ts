import { BaseQueryParametersDto } from '../../shared/dto/base-query-parameters.dto';

export class FindProductsQueryDto extends BaseQueryParametersDto {
  code: string;
  name: string;
  type: string;
  points: number;
  discards: number;
  imageData: string;
  status: boolean;
}