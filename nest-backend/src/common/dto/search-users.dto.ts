import { IsNotEmptyObject } from 'class-validator';
import { PaginationDto } from './dto-utils/pagination.dto';
import { ApiProperty } from '@nestjs/swagger';
import {CityType} from "./commonTypes";

export class SearchUsersFilterDto {
  text?: string | null;
  skills?: string[] | null;
  city?: CityType;
}

export class SearchUsersDto {
  @ApiProperty()
  filter?: SearchUsersFilterDto;

  @ApiProperty()
  @IsNotEmptyObject()
  paging: PaginationDto;
}
