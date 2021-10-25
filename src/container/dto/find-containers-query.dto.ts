import { BaseQueryParametersDto } from '../../shared/dto/base-query-parameters.dto';

export class FindContainersQueryDto extends BaseQueryParametersDto {
  name: string;
  code: string;
  location: {
    cep: string,
    street: string,
    district: string,
    city: string,
    state: string
  }
  type: string;
  totalCapacity: number;
  usedCapacity: number;
  status: boolean;
}