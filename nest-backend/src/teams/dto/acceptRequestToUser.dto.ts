import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class AcceptRequestToUserDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  requestId: number;
}
