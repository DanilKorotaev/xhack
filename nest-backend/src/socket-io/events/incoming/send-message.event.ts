import { ID } from "../../../typings";

export interface ISendMessageData {
  chatId: ID | null;
  message: string;
  teamId: ID | null;
  secondUserId: ID | null;  
  guid: string
}
