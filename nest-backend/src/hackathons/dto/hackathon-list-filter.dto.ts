import { IsInt, Max, Min } from 'class-validator';
import { ID } from 'src/typings';

export class HackathonListFilterDto {
  
  filter: string

  tagsIds: ID[];

  @IsInt()
  @Min(1)
  @Max(200)
  take: number;

  @IsInt()
  @Min(0)
  page: number;
}
