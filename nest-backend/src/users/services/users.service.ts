import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import {Connection, getManager, Like, Repository} from 'typeorm';
import { User } from '../models/user.entity';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { ID } from '../../typings';
import { UserListFilterDto } from '../dto/user-list-filter.dto';
import { RequestType, TeamRequest } from 'src/teams/models/team-request.entity';
import { Team } from 'src/teams/models/team.entity';
import { UserBookmarkEntity } from 'src/bookmarks/models/user-bookmark.entity';
import { TeamParticipantType } from 'src/teams/primitives/teamParticipantType.enum';
import { Chat } from 'src/chat/models/chat.entity';

const _ = require('lodash')

/**
 * UsersService
 *
 * Responsible for users management
 */
@Injectable()
export class UsersService {
  /**
   * @constructor
   *
   * @param {Repository<User>} userRepository
   */
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Team)
    private teamsRepository: Repository<Team>,

    @InjectConnection()
    private typeormConnection: Connection,
    
    @InjectRepository(TeamRequest)
    private teamRequestRepository: Repository<TeamRequest>,
  ) {}

  /**
   * Returns user by id
   *
   * @param {ID} userId
   * @return {Promise<User | null>}
   */
  async getUserById(userId: ID): Promise<User> {
    return this.userRepository.findOne(userId, { relations: ['tags', 'teams']});
  }

  async getUserDetails(currentUserId: ID, userId: ID) {
    const manager = getManager()
    const { raw, entities } =  await manager.createQueryBuilder(User, 'user')
      .select()
      .addSelect(qb =>  {
        return qb.select('CAST(CASE WHEN COUNT(*) > 0 THEN 1 ELSE 0 END AS boolean)', 'isBookmarked')
        .from(UserBookmarkEntity, 'bookmark')
        .where(`bookmark.bookmarkedUser = :userId AND bookmark.owner = :currentUserId`,{
            userId, currentUserId
        })
      })
      .addSelect(qb => {
        return qb.select('chat.id', 'chatId')
          .from(Chat, 'chat')
          .where(`chat.firstUser = ${currentUserId} AND chat.secondUser = ${userId}`)
          .orWhere(`chat.firstUser = ${userId} AND chat.secondUser = ${currentUserId}`)
      })
      .addSelect(qb =>  {
        return qb.select('CAST(CASE WHEN COUNT(*) > 0 THEN 1 ELSE 0 END AS boolean)', 'isTeamMember')
        .from(Team, 'team')
        .innerJoin('team.members', 'member')
        .where(`member.id = :userId AND team.captain = :currentUserId`,{
            userId, currentUserId
        })
      })
      .addSelect(qb =>  {
        return qb.select('CAST(CASE WHEN COUNT(*) > 0 THEN 1 ELSE 0 END AS boolean)', 'hasOutgoingRequest')
        .from(TeamRequest, 'request')
        .where(`request.userId = :userId AND request.type = :userToTeam AND request.team IN (${
          this.teamsRepository.createQueryBuilder("team")
            .select('id')
            .where(`team.captainId = ${currentUserId}`)
            .getQuery()
        })`,{
          userId, userToTeam: RequestType.UserToTeam
        })
       })
       .addSelect(qb =>  {
        return qb.select('CAST(CASE WHEN COUNT(*) > 0 THEN 1 ELSE 0 END AS boolean)', 'hasIncomingRequest')
        .from(TeamRequest, 'request')
        .where(`request.userId = :userId AND request.type = :teamToUser AND request.team IN (${
          this.teamsRepository.createQueryBuilder("team")
            .select('id')
            .where(`team.captainId = ${currentUserId}`)
            .getQuery()
        })`, {
           userId, teamToUser: RequestType.TeamToUser
        })
       })
       .leftJoinAndSelect('user.requests', 'request', `request.isCanceled = false AND request.team IN (${
            this.teamsRepository.createQueryBuilder("team")
              .select('id')
              .where(`team.captainId = ${currentUserId}`)
              .getQuery()
            })`, {
            userId
            }
      )
      .leftJoinAndSelect('request.team', 'team')
      .where({
        id: userId
      })
      .leftJoinAndSelect('user.tags', 'tags')
      .getRawAndEntities()
    const user = entities[0]

    const participantType = (() => {
      if (raw[0]['isTeamMember'])
        return TeamParticipantType.Member
      if (raw[0]['hasOutgoingRequest'])
        return TeamParticipantType.OutgoingRequest
      if (raw[0]['hasIncomingRequest'])
        return TeamParticipantType.IncomingRequest
      return TeamParticipantType.None
    })()

    return {
      ...user,
      isBookmarked: raw[0]['isBookmarked'],
      participantType: participantType,
      chatId: raw[0]['chatId']
    }
  }

  /**
   * Updates user profile with UpdateProfileDto
   *
   * @param {ID} userId
   * @param {UpdateProfileDto} updateProfileDTO
   *
   * @return {User}
   */
  async updateUserProfileById(
    userId: ID,
    updateProfileDTO: UpdateProfileDto,
  ): Promise<User> {
    const user = await this.userRepository.findOne(userId, {
      relations: ['tags'],
    });
    if (!!updateProfileDTO.tags 
      && (user.tags.length !== updateProfileDTO.tags.length 
      || !user.tags.every(existedTag => updateProfileDTO.tags.includes(existedTag)))) {

        const tagsForRemove = user.tags.filter(x => !updateProfileDTO.tags.includes(x)).map(tag => ({
          userTagId: tag.id,
          userId,
        }));
        if (tagsForRemove.length > 0)
          await this.typeormConnection.query(`DELETE FROM user_to_tag WHERE "user_to_tag"."tagId" IN (${tagsForRemove.map(x => x.userTagId)}) AND "user_to_tag"."userId" = ${userId}`)

        const tagsForAdd = updateProfileDTO.tags.filter(x => !user.tags.includes(x)).map(tag => ({
          tagId: tag.id,
          userId,
        }));

        if (tagsForAdd.length > 0)
          await this.typeormConnection
            .createQueryBuilder()
            .insert()
            .into('user_to_tag')
            .values(tagsForAdd)
            .execute();
    }
    await this.userRepository.update(userId, _.omit(updateProfileDTO,['tags']));
    return this.userRepository.findOne(userId);
  }

  async getUsersInActiveSearching(userId: ID, take: number, page: number) {    
    return await this.userRepository.find({
      where: {
        isAvailableForSearching: true,
      },
      take: take,
      skip: page * take,
      relations: ['tags']
    })
  }

  async getUsersByFilterWithPaging(filterUsersDto: UserListFilterDto) {
    return await this.userRepository.find({
      where: {
        name: Like(`%${filterUsersDto.filter}%`)
      },
      take: filterUsersDto.take,
      skip: filterUsersDto.page * filterUsersDto.take,
    });
  }

  async getOutgoingRequests(userId: ID) {

    const requests = await this.teamRequestRepository.createQueryBuilder('request')
        .select()
        .where({
          user: {id : userId},
          type: RequestType.UserToTeam
        })
        .innerJoinAndSelect('request.user', 'user')
        .innerJoinAndSelect('request.team', 'team')
        .orWhere(`request.type = :userToTeam AND request.teamId IN (
        ${
          this.teamsRepository.createQueryBuilder()
            .select('id')
            .where(`team.captainId = ${userId}`).getQuery()
        })`, 
        { userToTeam: RequestType.TeamToUser})
        .getMany()
    const toUsers = requests.filter(x => x.type === RequestType.TeamToUser)
    const toTeams = requests.filter(x => x.type === RequestType.UserToTeam)
    return {
      toUsers: toUsers,
      toTeams: toTeams
    }
  }

  async setSearchingStatus(userId: ID,  isAvailableForSearching: boolean) {
    this.userRepository.update(userId, {
      isAvailableForSearching: isAvailableForSearching 
    })
  }

  async checkUserExists(userId: ID, email: string) {
    return !!(await this.userRepository.findOne({
      id: userId as number,
      email: email
    }))
  }
}

