import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddHackTagDto {
  @ApiProperty()
  @IsString()
  tagName: string;
}
