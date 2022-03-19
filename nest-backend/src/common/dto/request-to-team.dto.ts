import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequestToTeamDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  teamId: number;
}
