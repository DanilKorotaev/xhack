import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty()
  @IsNotEmpty()
  take: number;

  @ApiProperty()
  lastId?: number | null;
}
