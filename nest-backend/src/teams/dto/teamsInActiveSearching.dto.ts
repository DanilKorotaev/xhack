import { IsInt, Max, Min } from 'class-validator';

export class TeamsInActiveSearchingDto {
  @IsInt()
  @Min(1)
  @Max(200)
  take: number;

  @IsInt()
  @Min(0)
  page: number;
}
