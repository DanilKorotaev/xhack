import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./models/user.entity";
import { Tag } from '../tags/models/tag.entity';
import { TeamRequest } from 'src/teams/models/team-request.entity';
import { Team } from 'src/teams/models/team.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Tag,
      Team,
      TeamRequest
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
