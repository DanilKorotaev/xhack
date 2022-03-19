import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class SetSearchingStatusDto {
  @ApiProperty()
  @IsNotEmpty()
  teamId: number;

  @ApiProperty()
  @IsNotEmpty()
  isInActiveSearch: boolean;
}
