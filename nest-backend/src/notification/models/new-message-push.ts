import { Message } from './../../chat/models/message.entity';
import { ChatTypeEnum } from './../../chat/models/chat.entity';
import { ID } from "src/typings";

export class NewMessagePushData {
    chatId: ID;
    fromUserId: ID;
    fromUserName: string;
    chatType: ChatTypeEnum;
    message: string;
}