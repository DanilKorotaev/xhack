import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { User } from '../users/models/user.entity';
import { Tag } from './models/tag.entity';
import { Hackathon } from '../hackathons/models/hackathon.entity';
import { TagsController } from './controllers/tags.controllers';
import { TagsService } from './services/tags.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Hackathon,
      Tag,
      User
    ]),
  ],
  controllers: [TagsController],
  providers: [TagsService]
})
export class TagsModule {}
