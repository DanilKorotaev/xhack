import { Module } from '@nestjs/common';
import { HackathonsController } from './controllers/hackathons.controller';
import { HackathonsService } from './services/hackathons.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Hackathon} from "./models/hackathon.entity";
import { PossibleHackParticipant } from './models/possibleHackParticipant.entity';
import { User } from '../users/models/user.entity';
import { Tag } from 'src/tags/models/tag.entity';
import { Team } from 'src/teams/models/team.entity';
import { HackathonBookmarkEntity } from 'src/bookmarks/models/hackathon-bookmark.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Hackathon,
      PossibleHackParticipant,
      Tag,
      User,
      Team,
      HackathonBookmarkEntity
    ]),
  ],
  controllers: [HackathonsController],
  providers: [HackathonsService]
})
export class HackathonsModule {}
