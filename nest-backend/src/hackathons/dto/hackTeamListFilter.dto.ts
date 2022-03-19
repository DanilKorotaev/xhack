import { IsInt, Max, Min } from 'class-validator';

export class HackTeamListFilterDto {
  
  filter: string

  @IsInt()
  @Min(1)
  @Max(200)
  take: number;

  @IsInt()
  @Min(0)
  page: number;
}
