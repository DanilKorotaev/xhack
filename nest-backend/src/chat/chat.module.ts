import { forwardRef, Module } from '@nestjs/common';
import { ChatController } from './controllers/chat.controller';
import { ChatService } from './services/chat.service';
import { SocketIoModule } from "../socket-io/socket-io.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Hackathon } from "../hackathons/models/hackathon.entity";
import { PossibleHackParticipant } from "../hackathons/models/possibleHackParticipant.entity";
import { Tag } from "../tags/models/tag.entity";
import { User } from "../users/models/user.entity";
import { Team } from "../teams/models/team.entity";
import { HackathonBookmarkEntity } from "../bookmarks/models/hackathon-bookmark.entity";
import { Message } from "./models/message.entity";
import { Chat } from "./models/chat.entity";
import { LastReadMessage } from './models/last-read-message.entity';
import { NotificationsModule } from 'src/notification/notifications.module';

@Module({
  imports: [
    forwardRef(() => SocketIoModule),
    forwardRef(() => NotificationsModule),
    // SocketIoModule,
    TypeOrmModule.forFeature([
      Hackathon,
      PossibleHackParticipant,
      Tag,
      User,
      Team,
      LastReadMessage,
      HackathonBookmarkEntity,
      Message,
      Chat,
    ]),
  ],
  controllers: [ChatController],
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatModule { }
