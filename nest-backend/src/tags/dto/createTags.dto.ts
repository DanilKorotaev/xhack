import { IsArray } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateTagsDto {
  @ApiProperty()
  @IsArray()
  names: string[];
}
