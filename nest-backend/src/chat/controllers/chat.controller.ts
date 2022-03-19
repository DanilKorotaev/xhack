import { ID } from 'src/typings';
import { Controller, Get, Param, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from "../../common/guards/auth.guard";
import { LoggingInterceptor } from "../../common/interceptors/logging.interceptor";
import { ChatService } from "../services/chat.service";
import { UserJwt } from "../../common/decorators/user-jwt.decorator";
import { IUserPayload } from "../../typings";

@Controller('chat')
@UseGuards(AuthGuard)
@UseInterceptors(LoggingInterceptor)
export class ChatController {
  constructor(
    private chatService: ChatService,
  ) { }

  @Get('chats')
  async getChats(
    @UserJwt() userJwt: IUserPayload,
  ) {
    return this.chatService.getChats(userJwt.id);
  }

  @Get('getHistorySince/:chatId/:messageId/:take')
  async getHistorySince(
    @UserJwt() userJwt: IUserPayload,
    @Param('messageId') messageId,
    @Param('chatId') chatId,
    @Param('take') take
  ) {
    return this.chatService.getHistorySince(userJwt.id, chatId, messageId, take);
  }

  @Get('getChatInfo/:chatId')
  async getChatInfo(
    @UserJwt() userJwt: IUserPayload,
    @Param('chatId') chatId: ID,
  ) {
    return this.chatService.getChatInfo(userJwt.id, chatId);
  }
}
