import { IsOptional, IsString } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";
import { Tag } from 'src/tags/models/tag.entity';

export class UpdateProfileDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsString()
  email?: string;  

  @ApiProperty()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsString()
  specialization?: string;

  @ApiProperty()
  networks?: string[];

  @ApiProperty()
  tags: Tag[];
}
