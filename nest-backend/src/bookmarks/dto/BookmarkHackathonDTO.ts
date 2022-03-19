import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";
import {ID} from "../../typings";

export class BookmarkHackathonDTO {
  @ApiProperty({
    type: 'number',
    description: 'Hackathon id',
  })
  @IsNotEmpty({ message: 'Hackathon id cannot be empty!' })
  hackathonId!: ID;
}
