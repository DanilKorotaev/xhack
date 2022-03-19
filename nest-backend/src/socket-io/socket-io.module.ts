import { forwardRef, Module } from '@nestjs/common';
import { SocketIoService } from './socket-io.service';
import { SocketIoGateway } from "./socket-io.gateway";
import { ChatModule } from "../chat/chat.module";

@Module({
  imports: [forwardRef(() => ChatModule)],
  providers: [/*SocketIoService,*/ SocketIoGateway],
  exports: [/*SocketIoService, */SocketIoGateway],
})
export class SocketIoModule {}
