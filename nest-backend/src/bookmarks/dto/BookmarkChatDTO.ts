import {ApiProperty} from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';
import {ID} from "../../typings";

export class BookmarkChatDTO {
  @ApiProperty({
    type: 'number',
    description: 'Chat id',
  })
  @IsNotEmpty({
    message: 'Chat id cannot be empty!',
  })
  chatId!: ID;
}
