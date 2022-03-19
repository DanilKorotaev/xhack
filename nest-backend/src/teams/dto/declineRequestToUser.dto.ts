import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeclineRequestToUserDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  requestId: number;
}
