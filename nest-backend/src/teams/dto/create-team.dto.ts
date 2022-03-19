import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  avatarUrl?: string;
}
