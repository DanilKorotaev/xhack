import { IsArray, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddTagForUserDto {
  @ApiProperty()
  @IsNumber({}, { each: true })
  tagIds: number[];
}
