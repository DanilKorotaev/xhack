import { ID } from "../../../typings";
import { User } from "../../../users/models/user.entity";

export interface INewMessageData {
  id: ID;
  chatId: ID;
  chatName: string;
  fromId: ID;
  guid: string;
  sender: User;
  message: string;
  createdAt: Date;
}
