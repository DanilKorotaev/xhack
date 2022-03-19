import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';
import { IncomingMessage } from "http";
import { IoIncomingEvents, IoOutcomingEvents } from "./IoEvents.enum";
import { ID, IUserPayload } from "../typings";
import { forwardRef, Inject, OnModuleDestroy, OnModuleInit, UnauthorizedException, UseGuards } from "@nestjs/common";
import { IAuthorizeEvent } from "./events/incoming/authorize.event";
import { AuthService } from "../auth/services/auth.service";
import { ChatService } from "../chat/services/chat.service";
import { AuthGuard } from "../common/guards/auth.guard";
import { ISendMessageData } from "./events/incoming/send-message.event";
import { UserJwt } from "../common/decorators/user-jwt.decorator";
import { DeleteMessageEvent } from "./events/incoming/delete-message.event";
import { ModuleRef } from "@nestjs/core";
import { IReadMessageData } from './events/incoming/read-message.event';

interface IAuthorizedSocket {
  socket: Socket;
  userId: ID;
}

@WebSocketGateway()
export class SocketIoGateway implements OnModuleInit {
  constructor(
    private moduleRef: ModuleRef,
  ) {}

  @WebSocketServer()
  server: Server;

  authorizedSockets: IAuthorizedSocket[] = [];

  private chatService: ChatService;

  async onModuleInit() {
    this.chatService = this.moduleRef.get(ChatService, { strict: false });
  }

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }

  static async verifyAuthorization(client: Socket, data: IAuthorizeEvent): Promise<boolean> {
    return await AuthService.isValidToken(data.token);
  }

  unAuthorizeSocket(socket: Socket) {
    this.authorizedSockets = this.authorizedSockets.filter((as) => as.socket.id !== socket.id);
  }

  authorizeSocket(socket: Socket, userId: ID) {
    this.authorizedSockets.push({
      userId,
      socket,
    });
  }

  @SubscribeMessage(IoIncomingEvents.ReadMessage)
  async readMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() readMessageEventData: IReadMessageData,
  ) {
    const userId = await this.getIdAndCheckToken(client)
    this.chatService.readMessage(userId, readMessageEventData);
  }

  @SubscribeMessage(IoIncomingEvents.SendMessage)
  async sendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() sendMessageEventData: ISendMessageData,
  ) {
    const userId = await this.getIdAndCheckToken(client)
    this.chatService.sendMessage(userId, sendMessageEventData);
  }

  @SubscribeMessage(IoIncomingEvents.DeleteMessage)
  @UseGuards(AuthGuard)
  async deleteMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() deleteMessageEventData: DeleteMessageEvent,
    @UserJwt() userJwt: IUserPayload,
  ) {
    await this.chatService.deleteMessage(userJwt.id, deleteMessageEventData.messageId);
  }

  @SubscribeMessage(IoIncomingEvents.Authorize)
  async authorize(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: IAuthorizeEvent,
  ): Promise<{ success: boolean }> {
    if (!await SocketIoGateway.verifyAuthorization(client, data)) {
      return {
        success: false,
      };
    }
    this.authorizeSocket(client, await AuthService.getUserIdFromToken(data.token));

    client.on('disconnect', () => {
      this.unAuthorizeSocket(client);
    });

    return {
      success: true,
    };
  }

  public hasConnectedUser(userId: ID): boolean {
    return !!this.getSocketsForUserId(userId);
  }

  private getSocketsForUserId(userId: ID) {
    return this.authorizedSockets.filter((as) => as.userId === userId);
  }

  public emitToUser(userId: ID, event: IoOutcomingEvents, data: any) {
    const userSockets = this.getSocketsForUserId(userId);
    if (!userSockets) {
      throw new Error('User not connected');
    }
    userSockets.forEach(client => client.socket.emit(event, data));
  }

  private async getIdAndCheckToken(client: Socket): Promise<ID> {
    const auth_token = client.handshake.headers.authorization
    if (!await AuthService.isValidToken(auth_token))
      throw new UnauthorizedException()
    const userId =  await AuthService.getUserIdFromToken(auth_token)
    return userId
  }
}
