import { forwardRef, Module } from '@nestjs/common';
import { TeamsController } from './controllers/teams.controller';
import { TeamsService } from './services/teams.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TeamRequest } from "./models/team-request.entity";
import { Team } from "./models/team.entity";
import { User } from "../users/models/user.entity";
import { TeamBookmarkEntity } from 'src/bookmarks/models/team-bookmark.entity';
import { PossibleHackParticipant } from 'src/hackathons/models/possibleHackParticipant.entity';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  imports: [
    forwardRef(() => ChatModule),
    TypeOrmModule.forFeature([
      TeamRequest,
      Team,
      User,
      TeamBookmarkEntity,
      PossibleHackParticipant
    ]),
  ],
  controllers: [TeamsController],
  providers: [TeamsService]
})
export class TeamsModule { }
