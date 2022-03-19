import { Injectable, OnModuleInit } from '@nestjs/common';
import * as socketio from "socket.io";
import { ID } from 'src/typings';
import { IoIncomingEvents, IoOutcomingEvents } from "./IoEvents.enum";
import { IAuthorizeEvent } from "./events/incoming/authorize.event";
import { ISendMessageData } from "./events/incoming/send-message.event";
import { AuthService } from "../auth/services/auth.service";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const io = require("socket.io");

export interface IInternalSocket extends socketio.Socket {
  userId?: ID;
}

@Injectable()
export class SocketIoService implements OnModuleInit {
  private sockets: IInternalSocket[];

  constructor(

  ) {}

  broadcast(event: string, data: any) {

  }

  emitToUser(userId: ID, event: string, data: any) {

  }

  authorizeSocket(socket: IInternalSocket, userId: ID) {
    socket.userId = userId;
  }

  onModuleInit() {
    // const ioServer: socketio.Server = io({
    //   cors: {
    //     origin: '*',
    //   }
    // });
    //
    // ioServer.listen(+process.env.IO_PORT);
    // ioServer.on(IoIncomingEvents.Authorize, (data: IAuthorizeEvent) => {
    //   const token = data.token;
    //
    // });
    // ioServer.on(IoIncomingEvents.SendMessage, (data: ISendMessageData) => {
    //
    // });
    //
    // global.setInterval(() => {
    //   ioServer.emit(IoOutcomingEvents.Test, {
    //     data: '123 supertest',
    //   })
    // }, 3000);
  }
}
