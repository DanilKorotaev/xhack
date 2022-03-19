import { NewRequestPushData } from './../../notification/models/new-request-push-data';
import { HttpCode, HttpException, HttpStatus, Injectable, OnModuleInit } from '@nestjs/common';
import { ID } from '../../typings';
import { InjectConnection, InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Team } from '../models/team.entity';
import { Connection, EntityManager, getManager, In, Repository } from 'typeorm';
import { RequestType, TeamRequest } from '../models/team-request.entity';
import { User } from '../../users/models/user.entity';
import { CreateTeamDto } from '../dto/create-team.dto';
import { IsNotEmpty } from 'class-validator';
import { TeamBookmarkEntity } from 'src/bookmarks/models/team-bookmark.entity';
import { PossibleHackParticipant } from 'src/hackathons/models/possibleHackParticipant.entity';
import { TeamParticipantType } from '../primitives/teamParticipantType.enum';
import { UpdateTeamDto } from '../dto/update-team.dto';
import { ModuleRef } from "@nestjs/core";
import { NotificationsService } from 'src/notification/services/notifications.service';
import { ChatService } from 'src/chat/services/chat.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const _ = require('lodash');

@Injectable()
export class TeamsService implements OnModuleInit {

  private notificationService: NotificationsService;
  private chatService: ChatService;

  constructor(
    @InjectRepository(Team)
    private teamsRepository: Repository<Team>,

    @InjectRepository(PossibleHackParticipant)
    private possibleHackParticipantRepository: Repository<PossibleHackParticipant>,

    @InjectRepository(TeamRequest)
    private teamRequestRepository: Repository<TeamRequest>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectConnection()
    private typeormConnection: Connection,

    private moduleRef: ModuleRef,
  ) { }

  async onModuleInit() {
    this.notificationService = this.moduleRef.get(NotificationsService, { strict: false });
    this.chatService = this.moduleRef.get(ChatService, { strict: false });
  }

  public async createTeam(userId: ID, createTeamDto: CreateTeamDto) {
    // todo check max users team
    // todo validate dto
    const team = await this.teamsRepository.save(
      this.teamsRepository.create({
        ...createTeamDto, // todo validation
        members: [(userId as any) as User],
        captain: (userId as any) as User,
      }),
    );
    await this.typeormConnection
      .createQueryBuilder()
      .insert()
      .into('team_user')
      .values({
        teamId: team.id,
        userId,
      })
      .execute();
    return team;
  }

  async updateTeam(userId: ID, teamId: ID, updateTeamDto: UpdateTeamDto) {
    if (await this.checkIsTeamCaptain(userId, teamId))
      throw new HttpException("You aren't captain", HttpStatus.FORBIDDEN);
    await this.teamsRepository.update(teamId, updateTeamDto);
  }

  public async getUserTeams(userId: ID) {
    const user = await this.usersRepository.findOne(userId, {
      relations: ['teams', 'teams.members'],
    });
    return user.teams;
  }

  async createRequestToTeam(userId: ID, teamId: ID) {
    const existedRequest = await this.teamRequestRepository.findOne({
      team: (teamId as any) as Team,
      user: (userId as any) as User,
      type: RequestType.UserToTeam,
    });
    if (existedRequest) {
      throw new HttpException(
        'You have already sent request to this team',
        400,
      );
    }
    await this.teamRequestRepository.save(
      this.teamRequestRepository.create({
        team: (teamId as any) as Team,
        user: (userId as any) as User,
        type: RequestType.UserToTeam,
      }),
    );

    const team = await this.teamsRepository.findOne(
      teamId as number, {
      relations: ['captain']
    });
    this.notificationService.sendNewToTeamRequestPush(team.captain.id, { userId });
  }

  /**
   * Creates request from a team to a user
   * @param userId - id of user to send request
   * @param currentUserId - id of user sending request (should be captain of the team)
   * @param teamId - id of team sending request to users
   */
  async createRequestToUser(userId: ID, currentUserId: ID, teamId: ID) {
    const request = await this.teamRequestRepository.findOne({
      user: (userId as any) as User,
      team: (teamId as any) as Team
    });

    if (await this.checkIsTeamCaptain(currentUserId, teamId)) {
      throw new HttpException('You arent team captain', 403);
    }

    if (request)
      await this.teamRequestRepository.remove(request);

    await this.teamRequestRepository.save(
      this.teamRequestRepository.create({
        team: (teamId as any) as Team,
        user: (userId as any) as User,
        type: RequestType.TeamToUser,
      }),
    );

    const data: NewRequestPushData = {
      teamId: teamId
    };

    this.notificationService.sendNewRequestPush(userId, data);
  }

  async acceptRequestUserToTeam(userId: ID, requestId: ID) {
    const request = await this.getRequest(requestId);
    const team = await this.teamsRepository.findOne(
      (request.team as any) as number, {
      relations: ['members']
    }
    );
    if (!team) {
      throw new HttpException('No such team', 400);
    }
    if (team.members.every(x => x.id != (request.user as any) as number))
      await this.typeormConnection
        .createQueryBuilder()
        .insert()
        .into('team_user')
        .values({ userId: (request.user as any) as number, teamId: team.id })
        .execute();
    await this.teamRequestRepository.remove(request);
    await this.possibleHackParticipantRepository.delete({
      user: request.user,
      hackathon: { id: (team.hackathon as any) as number }
    });
    return;
  }

  async declineRequestToUser(userId: ID, requestId: ID) {
    const request = await this.getRequest(requestId);
    await this.teamRequestRepository.remove(request);
    return;
  }

  async withDrawRequestToUser(captainId: ID, userId: ID) {
    await this.teamRequestRepository.createQueryBuilder()
      .delete()
      .where(`userId = :userId AND type = :teamToUser AND teamId IN (
      ${this.teamsRepository.createQueryBuilder()
          .select('id')
          .where(`Team.captainId = ${captainId}`).getQuery()
        })`,
        { userId, teamToUser: RequestType.TeamToUser }
      )
      .execute();
    return;
  }

  async getActiveIncomingRequests(userId: ID) {
    const userTeams = await this.teamsRepository.find({
      captain: (userId as any) as User,
    });
    const requests = await this.teamRequestRepository.find({
      where: [
        {
          user: (userId as any) as User,
          isCanceled: false
        },
        {
          team: In(userTeams.map(x => x.id)),
          isCanceled: false
        },
      ],
      relations: ['team', 'user'],
    });
    const fromUsers = requests.filter(
      request =>
        request.type === RequestType.UserToTeam &&
        userTeams.some(team => team.id === request.team.id),
    );
    const fromTeams = requests.filter(
      x => x.type === RequestType.TeamToUser && x.user.id === userId,
    );
    return { fromUsers, fromTeams };
  }

  private async getRequest(requestId: ID) {
    const request = await this.teamRequestRepository.findOne({
      id: requestId as number,
    });
    if (!request) {
      throw new HttpException('No such request', 400);
    }
    return request;
  }

  private async checkIsTeamCaptain(userId: ID, teamId: ID) {
    const team = await this.teamsRepository.findOne(teamId);
    return ((team.captain as any) as number) !== (userId as number);
  }

  public async setSearchingStatus(userId: ID, teamId: ID, isInActiveSearch: boolean) {
    if (
      await this.checkIsTeamCaptain(userId, (teamId as any) as number)
    ) {
      throw new HttpException('You arent team captain', 403);
    }

    const team = await this.teamsRepository.findOne(teamId);
    this.teamsRepository.update(teamId, {
      ...team,
      isInActiveSearch: isInActiveSearch
    });
  }

  async getTeamsInActiveSearching(userId: ID, take: number, page: number) {
    return await this.teamsRepository.find({
      where: {
        isInActiveSearch: true,
      },
      take: take,
      skip: page * take,
      relations: ['hackathon', 'hackathon.tags']
    });
  }

  async createTeamForHack(userID: ID, hackID: ID, createTeamDto: CreateTeamDto) {
    const team = await this.createTeam(userID, createTeamDto);
    this.teamsRepository.update(team.id, {
      hackathon: { id: hackID as number }
    });
  }

  async getTeamDetails(userId: ID, teamId: ID) {
    const manager = getManager();
    const { raw, entities } = await manager.createQueryBuilder(Team, 'team')
      .select()
      .addSelect(qb => {
        return qb.select('CAST(CASE WHEN COUNT(*) > 0 THEN 1 ELSE 0 END AS boolean)', 'isBookmarked')
          .from(TeamBookmarkEntity, 'bookmark')
          .where(`bookmark.team = :teamId AND bookmark.userId = :userId`, {
            teamId, userId
          });
      })
      .addSelect(qb => {
        return qb.select('CAST(CASE WHEN COUNT(*) > 0 THEN 1 ELSE 0 END AS boolean)', 'hasOutgoingRequest')
          .from(TeamRequest, 'request')
          .where(`request.team = :teamId AND request.userId = :userId AND request.type = :userToTeam`, {
            teamId, userId, userToTeam: RequestType.UserToTeam
          });
      })
      .addSelect(qb => {
        return qb.select('CAST(CASE WHEN COUNT(*) > 0 THEN 1 ELSE 0 END AS boolean)', 'hasIncomingRequest')
          .from(TeamRequest, 'request')
          .where(`request.team = :teamId AND request.userId = :userId AND request.type = :teamToUser`, {
            teamId, userId, teamToUser: RequestType.TeamToUser
          });
      })
      .where({
        id: teamId
      })
      .leftJoinAndSelect('team.members', 'members')
      .leftJoinAndSelect('team.captain', 'captain')
      .leftJoinAndSelect('team.requests', 'requests', `requests.userId = ${userId}`)
      .getRawAndEntities();
    const team = entities[0];
    const participantType = (() => {
      if (team.captain.id === userId)
        return TeamParticipantType.Captain;
      if (team.members.find(x => x.id === userId))
        return TeamParticipantType.Member;
      if (raw[0]['hasOutgoingRequest'])
        return TeamParticipantType.OutgoingRequest;
      if (raw[0]['hasIncomingRequest'])
        return TeamParticipantType.IncomingRequest;
      return TeamParticipantType.None;
    })();
    return {
      ...team,
      isBookmarked: raw[0]['isBookmarked'],
      participantType: participantType
    };
  }

  async withDrawRequestToTeam(userId: ID, teamId: ID) {
    const request = await this.teamRequestRepository.findOne({
      user: { id: userId as number },
      team: { id: teamId as number },
      type: RequestType.UserToTeam,
    });
    if (!request) {
      throw new HttpException('No such request', 403);
    }
    await this.teamRequestRepository.remove(request);
  }

  async acceptRequestFromTeam(userId: ID, teamId: ID) {
    const team = await this.teamsRepository.findOne(
      teamId as number,
    );
    if (!team) {
      throw new HttpException('No such team', 400);
    }
    const request = await this.teamRequestRepository.findOne({
      user: { id: userId as number },
      team: { id: teamId as number },
      type: RequestType.TeamToUser,
    });
    if (!request) {
      throw new HttpException('No such request', 403);
    }
    await this.typeormConnection
      .createQueryBuilder()
      .insert()
      .into('team_user')
      .values({ userId, teamId: teamId })
      .execute();
    await this.teamRequestRepository.delete({
      user: { id: userId as number },
      team: { id: teamId as number },
      type: RequestType.TeamToUser,
    });
    await this.possibleHackParticipantRepository.delete({
      user: { id: userId as number },
      hackathon: { id: (team.hackathon as any) as number }
    });
  }

  async leaveFromTeam(userId: ID, teamId: ID) {
    await this.typeormConnection
      .createQueryBuilder()
      .delete()
      .from('team_user')
      .where({
        userId, teamId
      })
      .execute();
  }


  async declineRequestUserToTeam(userId: ID, requestId: ID) {
    //TODO add vadidate
    await this.teamRequestRepository.update(requestId, {
      isCanceled: true
    });
  }

  async withdrawRequest(userId: ID, requestId: ID) {
    //TODO add vadidate
    await this.teamRequestRepository.delete(requestId);
  }


  async removeTeammate(currentUserId: ID, teamId: ID, removeUserId: ID) {
    const team = await this.teamsRepository.findOne(
      teamId as number
    );

    if (!team) {
      throw new HttpException('No such team', HttpStatus.BAD_REQUEST);
    }

    if ((team.captain as any) as number !== (currentUserId as number)) {
      throw new HttpException('You arent team captain', HttpStatus.FORBIDDEN);
    }

    this.chatService.teammateRemoved(teamId, (team.chat as any) as number, removeUserId);

    await this.typeormConnection
      .createQueryBuilder()
      .delete()
      .from('team_user')
      .where({
        userId: removeUserId,
        teamId
      })
      .execute();

    this.notificationService.sendRemoveFromTeam(removeUserId, {
      teamId: teamId,
      teamName: team.name
    });
  }


  async removeTeam(userId: ID, teamId: ID) {
    const team = await this.teamsRepository.findOne(
      teamId as number, { relations: ['members'] }
    );

    if (!team) {
      throw new HttpException('No such team', HttpStatus.BAD_REQUEST);
    }

    if ((team.captain as any) as number !== (userId as number)) {
      throw new HttpException('You arent team captain', HttpStatus.FORBIDDEN);
    }

    await this.chatService.removeTeamChat(team, (team.chat as any) as number);

    await this.typeormConnection
      .createQueryBuilder()
      .delete()
      .from('team_user')
      .where({
        userId: In(team.members.map(x => x.id)),
        teamId: teamId
      })
      .execute();

    await this.teamsRepository.delete({ id: team.id });
  }
}
