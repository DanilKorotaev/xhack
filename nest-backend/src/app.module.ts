import { CacheModule, Module } from '@nestjs/common';
import { AppService } from './common/services/app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users/models/user.entity";
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './common/config/configuration';
import databaseConfig, { IDatabaseConfig } from './common/config/databaseConfig';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TeamsModule } from './teams/teams.module';
import { HackathonsModule } from './hackathons/hackathons.module';
import { ChatModule } from './chat/chat.module';
import { NewsModule } from './news/news.module';
import { AuthService } from "./auth/services/auth.service";
import { Team } from "./teams/models/team.entity";
import { Hackathon } from "./hackathons/models/hackathon.entity";
import { News } from "./news/models/news.entity";
import { TeamRequest } from "./teams/models/team-request.entity";
import { Chat } from "./chat/models/chat.entity";
import { Message } from "./chat/models/message.entity";
import { PossibleHackParticipant } from './hackathons/models/possibleHackParticipant.entity';
import { Tag } from './tags/models/tag.entity';
import { TagsModule } from './tags/tags.module';
import { UserBookmarkEntity } from './bookmarks/models/user-bookmark.entity';
import { TeamBookmarkEntity } from './bookmarks/models/team-bookmark.entity';
import { HackathonBookmarkEntity } from './bookmarks/models/hackathon-bookmark.entity';
import { MinioClientModule } from './minio-client/minio-client.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { SocketIoModule } from './socket-io/socket-io.module';
import { LastReadMessage } from './chat/models/last-read-message.entity';
import { NotificationsModule } from './notification/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development', '.env'],
      load: [configuration, databaseConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): any => configService.get<IDatabaseConfig>('databaseConfig'),
    }),
    TypeOrmModule.forFeature([User, Team, Hackathon, TeamRequest, Message, Chat, News, PossibleHackParticipant, Tag, UserBookmarkEntity, TeamBookmarkEntity, HackathonBookmarkEntity, LastReadMessage]),
    CacheModule.register(),
    BookmarksModule,
    UsersModule,
    AuthModule,
    TeamsModule,
    HackathonsModule,
    NewsModule,
    TagsModule,
    MinioClientModule,
    FileUploadModule,
    SocketIoModule,
    ChatModule,
    NotificationsModule
  ],
  controllers: [],
  providers: [AppService, AuthService],
})
export class AppModule { }
