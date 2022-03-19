import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddTagForHackDto {
  @ApiProperty()
  @IsNumber()
  tagId: number;

  @ApiProperty()
  @IsNumber()
  hackathonId: number;
}
