import { IsString } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class AddUserTagDto {
  @ApiProperty()
  @IsString()
  tagName: string;
}
