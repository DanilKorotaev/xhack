import { ID } from "../../../typings";
import { IsNotEmpty, IsNumber } from "class-validator";

export class DeleteMessageEvent {
  @IsNotEmpty()
  @IsNumber()
  messageId: ID;
}
