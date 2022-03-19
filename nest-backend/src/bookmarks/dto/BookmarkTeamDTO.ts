import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";
import {ID} from "../../typings";

export class BookmarkTeamDTO {
  @ApiProperty({
    type: 'number',
    description: 'Team id',
  })
  @IsNotEmpty({ message: 'Team id cannot be empty!' })
  teamId!: ID;
}
