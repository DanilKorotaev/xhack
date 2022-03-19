import { ChatModule } from './../chat/chat.module';
import { PushToken } from './models/push-token.entity';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { NotificationsService } from './services/notifications.service';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PushToken,
    ]),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService]
})
export class NotificationsModule { }
