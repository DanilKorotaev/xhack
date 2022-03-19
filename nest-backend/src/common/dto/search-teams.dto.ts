import { PaginationDto } from './dto-utils/pagination.dto';
import { IsNotEmptyObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
/*
  {
      "filter": null,
      "paging": {
          "take": 200,
          "lastId": null
      }
  }
*/
export class SearchTeamsDto {
  @ApiProperty()
  filter?: string | null;

  @ApiProperty()
  @IsNotEmptyObject()
  paging: PaginationDto;
}
