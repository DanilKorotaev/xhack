import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";
import {ID} from "../../typings";

export class BookmarkUserDTO {
  @ApiProperty({
    type: 'number',
    description: 'User id',
  })
  @IsNotEmpty({ message: 'User id cannot be empty!' })
  userId!: ID;
}
