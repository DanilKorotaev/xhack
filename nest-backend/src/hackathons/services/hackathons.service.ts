import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Hackathon } from '../models/hackathon.entity';
import { AfterUpdate, Connection, getManager, In, LessThan, Like, MoreThanOrEqual, Repository } from 'typeorm';
import { ID } from '../../typings';
import { CreateHackathonDto } from '../dto/create-hackathon.dto';
import { PossibleHackParticipant } from '../models/possibleHackParticipant.entity';
import { User } from 'src/users/models/user.entity';
import { HackathonListFilterDto } from '../dto/hackathon-list-filter.dto';
import { UpdateHackathonDto } from '../dto/update-hackathon.dto';
import { Team } from 'src/teams/models/team.entity';
import { HackTeamListFilterDto } from '../dto/hackTeamListFilter.dto';
import { HackathonBookmarkEntity } from 'src/bookmarks/models/hackathon-bookmark.entity';
import { HackathonParticipationType } from '../primitives/hackathonParticipationType.enum';
import { UsersListFilterDto } from '../dto/usersListFilter.dto';
import { MoreThanOrEqualDate } from 'src/helpers';
import { paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class HackathonsService {
  constructor(
    @InjectRepository(Hackathon)
    private hackathonRepository: Repository<Hackathon>,

    @InjectRepository(HackathonBookmarkEntity)
    private hackBookmarksRepository: Repository<HackathonBookmarkEntity>,

    @InjectRepository(PossibleHackParticipant)
    private hackathonParticipantRepository: Repository<PossibleHackParticipant>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Team)
    private teamsRepository: Repository<Team>,

    @InjectRepository(PossibleHackParticipant)
    private possibleHackParticipantRepository: Repository<PossibleHackParticipant>,

    @InjectConnection()
    private typeormConnection: Connection,
  ) {}

  //should be rewrite
  async addTeamToHackathon(teamId: ID, hackathonId: ID) {
    const hack = await this.hackathonRepository.findOne({
      where: {
        id: hackathonId,
      },
      relations: ['teams'],
    });
    const teamAlreadyAttach = hack.teams.find(x => x.id === teamId);
    if (teamAlreadyAttach) return;

    return await this.typeormConnection
      .createQueryBuilder()
      .insert()
      .into('hackathon_team')
      .values({
        hackathonId,
        teamId,
      })
      .execute();
  }

  
  async removeTeamFromHackathon(userId: ID, hackathonId: ID) {
    await this.teamsRepository.update({
      hackathon:  (hackathonId as any) as Hackathon,
      captain: (userId as any) as User
    }, {hackathon: null})
  }

  async getHackathonById(userId: ID, hackId: ID) {
    const manager = getManager()
    const { raw, entities } =  await manager.createQueryBuilder(Hackathon, 'hackathon')
           .select()
           .addSelect(qb =>  {
              return qb.select('CAST(CASE WHEN COUNT(*) > 0 THEN 1 ELSE 0 END AS boolean)', 'isBookmarked')
              .from(HackathonBookmarkEntity, 'bookmark')
              .where(`bookmark.hackathon = :hackId AND bookmark.userId = :userId`,{
                hackId, userId
              })
           })
           .addSelect(qb =>  {
            return qb.select('CAST(CASE WHEN COUNT(*) > 0 THEN 1 ELSE 0 END AS boolean)', 'userWillGo')
              .from(PossibleHackParticipant, 'possibleParticipant')
              .where(`possibleParticipant.hackathon = :hackId AND possibleParticipant.userId = :userId`,{
                hackId, userId
              })
           })
           .addSelect(qb =>  {
            return qb.select('CAST(CASE WHEN COUNT(*) > 0 THEN 1 ELSE 0 END AS boolean)', 'goLikeTeamMember')
              .from(Team, 'team')
              .innerJoin('team.members', 'members')
              .innerJoin('team.captain', 'captain')
              .where(`team.hackathon = :hackId AND captain.id <> :userId AND members.id = :userId`,{
                hackId, userId
              })
           })
           .addSelect(qb =>  {
            return qb.select('CAST(CASE WHEN COUNT(*) > 0 THEN 1 ELSE 0 END AS boolean)', 'goLikeTeamCaptain')
              .from(Team, 'team')
              .innerJoin('team.members', 'members')
              .innerJoin('team.captain', 'captain')
              .where(`team.hackathon = :hackId AND captain.id = :userId`,{
                hackId, userId
              });
           })
           .leftJoinAndSelect('hackathon.tags', 'tags')
           .leftJoinAndSelect('hackathon.teams', 'teams')
           .leftJoinAndMapMany('hackathon.members', 'hackathon.possibleParticipants','members')
           .leftJoinAndSelect('members.user', 'user')
           .where({
             id: hackId
           })
           .getRawAndEntities();
    const hack = entities[0]
    const participationType = (() => {
      if (raw[0]['userWillGo'])
        return HackathonParticipationType.Single
      if (raw[0]['goLikeTeamMember'])
        return HackathonParticipationType.TeamMember
      if (raw[0]['goLikeTeamCaptain'])
        return HackathonParticipationType.TeamCaptain
      return HackathonParticipationType.None
    })()
    return {
      ...hack,
      teams: hack.teams.slice(0, 5),
      members: hack['members'].slice(0, 5).map(x => x.user),
      isBookmarked: raw[0]['isBookmarked'],
      participationType: participationType,
    }
  }

  async getHackathonByIdAdmin(hackId: ID) {
    return this.hackathonRepository.findOne(hackId, {
      relations: ['tags', 'teams'],
    });
  }

  async listHackathonsByFilterWithPaging(filterHackathonsDto: HackathonListFilterDto) {
    const queryBuilder = this.hackathonRepository.createQueryBuilder('hackathon')
          .select()
          .leftJoinAndSelect('hackathon.tags', 'tags')
          .where({
            name: Like(`%${filterHackathonsDto.filter}%`),
          endDate: MoreThanOrEqualDate(new Date()),
          })
    if(filterHackathonsDto.tagsIds && filterHackathonsDto.tagsIds.length > 0)
      queryBuilder.andWhere(`tags.id IN(${filterHackathonsDto.tagsIds})`)

    queryBuilder.orderBy('hackathon.startDate', 'ASC')
      
    return (await paginate(queryBuilder, {
      page: filterHackathonsDto.page,
      limit: filterHackathonsDto.take
    })).items
  }

  async createHackathon(createHackathonDto: CreateHackathonDto) {
    return await this.hackathonRepository.save(
      this.hackathonRepository.create({
        ...createHackathonDto,
      }),
    );
  }

  async updateHackathon(id: ID, updateHackathonDto: UpdateHackathonDto) {
    await this.hackathonRepository.update(id, updateHackathonDto);
    return await this.hackathonRepository.findOne(id);
  }

  async deleteHackathons() {
    return await this.hackathonRepository.clear();
  }

  async willGoHackathon(userId: ID, hackathonId: ID) {
    const existedRequest = await this.hackathonParticipantRepository.findOne({
      hackathon: (hackathonId as any) as Hackathon,
      user: (userId as any) as User,
    });
    if (existedRequest) return;

    return await this.hackathonParticipantRepository.save(
      this.hackathonParticipantRepository.create({
        hackathon: (hackathonId as any) as Hackathon,
        user: (userId as any) as User,
      }),
    );
  }

  async willNotGoHackathon(userId: ID, hackathonId: ID) {
    const existedRequest = await this.hackathonParticipantRepository.findOne({
      hackathon: (hackathonId as any) as Hackathon,
      user: (userId as any) as User,
    });
    if (!existedRequest) return;
    return await this.hackathonParticipantRepository.delete({
      hackathon: (hackathonId as any) as Hackathon,
      user: (userId as any) as User,
    });
  }

  async getPossibleHackForUserId(userId: ID): Promise<Hackathon[]> {
    return (
      await this.userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id: userId })
        .leftJoinAndSelect('user.possibleHackathons', 'possibleHackathons')
        .leftJoinAndSelect('possibleHackathons.hackathon', 'hackathon')
        .getOne()
    ).possibleHackathons.map(possibleHackathon => possibleHackathon.hackathon);
  }


  async getTemsForHackathon(hackId: ID, teamsListFilterDto: HackTeamListFilterDto) {
    return await this.teamsRepository.find({
      take: teamsListFilterDto.take,
      skip: (teamsListFilterDto.page - 1) * teamsListFilterDto.take,
      relations: ['members'],
      where: {
        hackathon: {id: hackId },
        name: Like(`%${teamsListFilterDto.filter}%`),
        isInActiveSearch: true
      }
    })
  }


  async getUsersForHackathon(hackId: ID, usersListFilterDto: UsersListFilterDto) {
    return (await this.possibleHackParticipantRepository.find({
      select: ["user"],
      relations: ['user', 'user.tags'],
      // take: usersListFilterDto.take,
      // skip: usersListFilterDto.page * usersListFilterDto.take,
      where: qb => {
        qb.where({
          hackathon: { id: hackId },
        }).andWhere('"PossibleHackParticipant__user"."isAvailableForSearching" = true')
        .andWhere(`"PossibleHackParticipant__user"."name" like :name`, {name: `%${usersListFilterDto.filter}%`});
        if (usersListFilterDto.tagIds && usersListFilterDto.tagIds.length > 0)
         qb.andWhere(`"PossibleHackParticipant__user__tags"."id" IN (${usersListFilterDto.tagIds})`)
      }
    })).map(x => x.user)
  }

  async leaveFromTeam(userId: ID, hackId: ID) {
    const team = await this.teamsRepository.createQueryBuilder('team')
      .select()
      .innerJoin('team.members', 'member')
      .where({
        hackathon: {id: hackId}
      })
      .andWhere('member.id = :userId', { userId: userId })
      .getOne()
    if (team == null)
      return

    await this.typeormConnection
      .createQueryBuilder()
      .delete()
      .from('team_user')
      .where({
        userId,
        teamId:  team.id
      })
      .execute();
  }
}
