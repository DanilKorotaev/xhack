import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";
import {ID} from "../../typings";

export class BookmarkMessageDTO {
  @ApiProperty({
    type: 'number',
    description: 'Message id',
  })
  @IsNotEmpty({ message: 'Message id cannot be empty!' })
  messageId!: ID;
}
