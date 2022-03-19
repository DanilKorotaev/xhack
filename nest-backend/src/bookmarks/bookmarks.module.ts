import { Module } from '@nestjs/common';
import { BookmarksController } from './controllers/bookmarks.controller';
import { BookmarksService } from './services/bookmarks.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../users/models/user.entity";
import {Team} from "../teams/models/team.entity";
import {Hackathon} from "../hackathons/models/hackathon.entity";
import {Chat} from "../chat/models/chat.entity";
import { UserBookmarkEntity } from './models/user-bookmark.entity';
import { TeamBookmarkEntity } from './models/team-bookmark.entity';
import { HackathonBookmarkEntity } from './models/hackathon-bookmark.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User, Hackathon, Team, Chat, UserBookmarkEntity, TeamBookmarkEntity, HackathonBookmarkEntity
    ]),
  ],
  controllers: [BookmarksController],
  providers: [BookmarksService],
  exports: [BookmarksService],
})
export class BookmarksModule {}
