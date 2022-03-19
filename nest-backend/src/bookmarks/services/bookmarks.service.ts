import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../../users/models/user.entity";
import {Repository} from "typeorm";
import {Hackathon} from "../../hackathons/models/hackathon.entity";
import {Team} from "../../teams/models/team.entity";
import {ID} from "../../typings";
import {Chat} from "../../chat/models/chat.entity";
import { UserBookmarkEntity } from '../models/user-bookmark.entity';
import { TeamBookmarkEntity } from '../models/team-bookmark.entity';
import { HackathonBookmarkEntity } from '../models/hackathon-bookmark.entity';
const _ = require('lodash');

@Injectable()
export class BookmarksService {
  constructor(
    @InjectRepository(User)
    public usersRepository: Repository<User>,

    @InjectRepository(UserBookmarkEntity)
    public userBookmarkRepository: Repository<UserBookmarkEntity>,

    @InjectRepository(TeamBookmarkEntity)
    public teamBookmarkRepository: Repository<TeamBookmarkEntity>,

    @InjectRepository(HackathonBookmarkEntity)
    public hackathonBookmarkRepository: Repository<HackathonBookmarkEntity>,

    @InjectRepository(Team)
    public teamsRepository: Repository<Team>,

    @InjectRepository(Hackathon)
    public hackathonRepository: Repository<Hackathon>,

    @InjectRepository(Chat)
    public chatRepository: Repository<Chat>,
  ) {}

  async hackathons(currentUserId: ID) {
    return (await this.hackathonBookmarkRepository.find({where: 
      {
        user: currentUserId as any as User
      }, 
      relations: ['hackathon', 'hackathon.tags']
    })).map(x => x.hackathon)
  }

  async teams(currentUserId: ID) {
    return (await this.teamBookmarkRepository.find({where: 
      {
        user: currentUserId as any as User
      }, 
      relations: ['team', 'team.members', 'team.captain'],
    })).map(x => x.team)
  }

  async users(currentUserId: ID) {
    return (await this.userBookmarkRepository.find({where: 
      {
        owner: currentUserId as any as User
      }, 
      relations: ['bookmarkedUser']
    })).map(x => x.bookmarkedUser)
  }

  async messages(currentUserId: ID) {
    return;
  }

  async chats(currentUserId: ID) {
    return;
  }

  async bookmarkHackathon(currentUserId: ID, hackathonId: ID) {
    return await this.hackathonBookmarkRepository.save(
      this.hackathonBookmarkRepository.create({
        hackathon: hackathonId as any as Hackathon,
        user: currentUserId as any as User,
      })
    )
  }

  async removeHackathonBookmark(currentUserId: ID, hackathonId: ID) {
    return await this.hackathonBookmarkRepository.remove(
      await this.hackathonBookmarkRepository.findOne({
        where: {
          hackathon: hackathonId as any as Hackathon,
          user: currentUserId as any as User, 
        }
      })
    )
  }

  async bookmarkUser(currentUserId: ID, userToBookmarkId: ID) {
    return await this.userBookmarkRepository.save(
      this.userBookmarkRepository.create({
        bookmarkedUser: userToBookmarkId as any as User,
        owner: currentUserId as any as User,
      })
    )
  }

  async removeUserBookmark(currentUserId: ID, userToBookmarkId: ID) {
    return await this.userBookmarkRepository.remove(
      await this.userBookmarkRepository.findOne({
        where: {
          bookmarkedUser: userToBookmarkId as any as User,
          owner: currentUserId as any as User,
        }
      })
    )
  }

  async bookmarkTeam(currentUserId: ID, teamId: ID) {
    return await this.teamBookmarkRepository.save(
      this.teamBookmarkRepository.create({
        team: teamId as any as Team,
        user: currentUserId as any as User,
      })
    )
  }

  async removeTeamBookmark(currentUserId: ID, teamId: ID) {
    return await this.teamBookmarkRepository.remove(
      await this.teamBookmarkRepository.findOne({
        where: {
          team: teamId as any as Team,
        user: currentUserId as any as User,
        }
      })
    )
  }

  async bookmarkMessage(currentUserId: ID, messageId: ID): Promise<void> {
    return;
  }

  async removeMessageBookmark(currentUserId: ID, message: ID): Promise<void> {
    return;
  }

  async bookmarkChat(currentUserId: ID, chatId: ID): Promise<void> {
    return;
  }

  async removeChatBookmark(currentUserId: ID, chatId: ID): Promise<void> {
    return;
  }

}
