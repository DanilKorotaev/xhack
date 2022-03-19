import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';
import { ApiOperation } from '@nestjs/swagger';
import { LoggingInterceptor } from '../../common/interceptors/logging.interceptor';
import { TeamsService } from '../services/teams.service';
import { UserJwt } from '../../common/decorators/user-jwt.decorator';
import { ID, IUserPayload } from '../../typings';
import { CreateRequestToTeamDto } from '../dto/create-request-to-team.dto';
import { CreateTeamDto } from '../dto/create-team.dto';
import { CreateRequestToUserDto } from '../dto/create-request-to-user.dto';
import { User } from '../../users/models/user.entity';
import { AcceptRequestToUserDto } from '../dto/acceptRequestToUser.dto';
import { DeclineRequestToUserDto } from '../dto/declineRequestToUser.dto';
import { WithDrawRequestToUserDto } from '../dto/withDrawRequestToUser.dto';
import { SetSearchingStatusDto } from '../dto/setSearchingStatus.dto';
import { TeamsInActiveSearchingDto } from '../dto/teamsInActiveSearching.dto';
import { CuttingInterceptor } from 'src/common/interceptors/cutting.interceptor';
import { UserListFilterDto } from 'src/users/dto/user-list-filter.dto';
import { UpdateTeamDto } from '../dto/update-team.dto';

/**
 * TeamsController
 *
 * handles teams management - create team, update team, delete team, and sending requests to users and teams
 */
@Controller('teams')
@UseInterceptors(LoggingInterceptor)
@UseInterceptors(CuttingInterceptor)
export class TeamsController {
  constructor(private teamsService: TeamsService) { }

  /**
   * Returns all users teams
   */
  @Get('get-my-teams')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get authorized user teams',
    tags: [TeamsController.name],
  })
  @UseGuards(AuthGuard)
  async getMyTeams(@UserJwt() userJwt: IUserPayload) {
    return this.teamsService.getUserTeams(userJwt.id);
  }

  /**
   * Creates a team and sets current users as captain
   *
   * @param createTeamDto
   * @return {void}
   */
  @Post('create-team')
  @HttpCode(201)
  @ApiOperation({
    summary: 'Creates team', // TODO
    tags: [TeamsController.name],
  })
  @UseGuards(AuthGuard)
  async createTeam(
    @UserJwt() userJwt: IUserPayload,
    @Body(ValidationPipe) createTeamDto: CreateTeamDto,
  ) {
    // TODO
    return this.teamsService.createTeam(userJwt.id, createTeamDto);
  }

  @Post('updateTeam/:teamId')
  @HttpCode(201)
  @ApiOperation({
    summary: 'Update team', // TODO
    tags: [TeamsController.name],
  })
  @UseGuards(AuthGuard)
  async updateTeam(
    @UserJwt() userJwt: IUserPayload,
    @Param('teamId') teamId: ID,
    @Body(ValidationPipe) updateTeamDto: UpdateTeamDto,
  ) {
    return this.teamsService.updateTeam(userJwt.id, teamId, updateTeamDto);
  }

  /**
   * Creates request from user to team
   *
   * @param userJwt
   * @param sendRequestToTeamDto
   * @return {void}
   */
  @Post('send-request-to-team')
  @HttpCode(201)
  @ApiOperation({
    summary: 'Creates request from user to team',
    tags: [TeamsController.name],
  })
  @UseGuards(AuthGuard)
  async sendRequestToTeam(
    @UserJwt() userJwt: IUserPayload,
    @Body(ValidationPipe) sendRequestToTeamDto: CreateRequestToTeamDto,
  ) {
    await this.teamsService.createRequestToTeam(
      userJwt.id,
      sendRequestToTeamDto.teamId,
    );
  }

  /**
   * Creates request from team captain to user
   *
   * @param userJwt
   * @param createRequestToUserDto
   * @return {void}
   */
  @Post('send-request-to-user')
  @HttpCode(201)
  @ApiOperation({
    summary: 'Creates request from team captain to user',
    tags: [TeamsController.name],
  })
  @UseGuards(AuthGuard)
  async sendRequestToUser(
    @UserJwt() userJwt: IUserPayload,
    @Body(ValidationPipe) createRequestToUserDto: CreateRequestToUserDto,
  ) {
    await this.teamsService.createRequestToUser(
      createRequestToUserDto.userId,
      userJwt.id,
      createRequestToUserDto.teamId,
    );
  }

  @Post('acceptRequestUserToTeam/:requestId')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Accept request for user',
    tags: [TeamsController.name],
  })
  async acceptRequestUserToTeam(
    @UserJwt() userJwt: IUserPayload,
    @Param('requestId') requestId: ID
  ) {
    this.teamsService.acceptRequestUserToTeam(userJwt.id, requestId);
  }

  @Post('declineRequestUserToTeam/:requestId')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Decline request for user',
    tags: [TeamsController.name],
  })
  async declineRequestUserToTeam(
    @UserJwt() userJwt: IUserPayload,
    @Param('requestId') requestId: ID
  ) {
    this.teamsService.declineRequestUserToTeam(userJwt.id, requestId);
  }

  @Post('withdrawRequest/:requestId')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Withdraw request',
    tags: [TeamsController.name],
  })
  async withdrawRequest(
    @UserJwt() userJwt: IUserPayload,
    @Param('requestId') requestId: ID
  ) {
    this.teamsService.withdrawRequest(userJwt.id, requestId);
  }

  @Post('declineRequestToUser')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Decline request to user',
    tags: [TeamsController.name],
  })
  async declineRequestToUser(
    @UserJwt() userJwt: IUserPayload,
    @Body(ValidationPipe) declineRequestToUserDto: DeclineRequestToUserDto,
  ) {
    await this.teamsService.declineRequestToUser(
      userJwt.id,
      declineRequestToUserDto.requestId,
    );
  }

  @Post('withDrawRequestToUser/:userId')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Withdraw request to user',
    tags: [TeamsController.name],
  })
  async withDrawRequestToUser(
    @UserJwt() userJwt: IUserPayload,
    @Param('userId') userId: ID,
  ) {
    await this.teamsService.withDrawRequestToUser(
      userJwt.id,
      userId
    );
  }

  @Post('withDrawRequestToTeam/:teamId')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Withdraw request to team',
    tags: [TeamsController.name],
  })
  async withDrawRequestToTeam(
    @UserJwt() userJwt: IUserPayload,
    @Param('teamId') teamId: ID,
  ) {
    await this.teamsService.withDrawRequestToTeam(
      userJwt.id,
      teamId,
    );
  }

  @Post('acceptRequestFromTeam/:teamId')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Accept request from team',
    tags: [TeamsController.name],
  })
  async acceptRequestFromTeam(
    @UserJwt() userJwt: IUserPayload,
    @Param('teamId') teamId: ID,
  ) {
    await this.teamsService.acceptRequestFromTeam(
      userJwt.id,
      teamId,
    );
  }

  @Get('getActiveIncomingRequests')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Get active incoming requests',
    tags: [TeamsController.name],
  })
  async getActiveRequests(@UserJwt() userJwt: IUserPayload) {
    return await this.teamsService.getActiveIncomingRequests(userJwt.id);
  }

  @Post('setSearchingStatus')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async setSearchingStatus(@UserJwt() userJwt: IUserPayload, @Body(ValidationPipe) setSearchingStatusDto: SetSearchingStatusDto) {
    return await this.teamsService.setSearchingStatus(userJwt.id, setSearchingStatusDto.teamId, setSearchingStatusDto.isInActiveSearch);
  }

  @Post('getTeamsInActiveSearching')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async getTeamsInActiveSearching(@UserJwt() userJwt: IUserPayload, @Body(ValidationPipe) teamsInActiveSearchingDto: TeamsInActiveSearchingDto) {
    return this.teamsService.getTeamsInActiveSearching(
      userJwt.id,
      teamsInActiveSearchingDto.take,
      teamsInActiveSearchingDto.page
    );
  }

  @Post('createTeamForHack/:hackId')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async createTeamForHack(@UserJwt() userJwt: IUserPayload,
    @Param('hackId') hackId: ID,
    @Body(ValidationPipe) createTeamDto: CreateTeamDto) {
    await this.teamsService.createTeamForHack(userJwt.id, hackId, createTeamDto);
  }


  @Get('getDetails/:id')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async getTeamDetails(@UserJwt() userJwt: IUserPayload, @Param('id') teamId: ID,) {
    return await this.teamsService.getTeamDetails(userJwt.id, teamId);
  }

  @Post('leaveFromTeam/:teamId')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async leaveFromTeam(@UserJwt() userJwt: IUserPayload,
    @Param('teamId') teamId: ID) {
    await this.teamsService.leaveFromTeam(userJwt.id, teamId);
  }

  @Post('removeTeammate/:teamId/:userId')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async removeTeammate(@UserJwt() userJwt: IUserPayload,
    @Param('teamId') teamId: ID,
    @Param('userId') userId: ID) {
    await this.teamsService.removeTeammate(userJwt.id, teamId, userId);
  }

  @Post('removeTeam/:teamId')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async removeTeam(@UserJwt() userJwt: IUserPayload,
    @Param('teamId') teamId: ID) {
    await this.teamsService.removeTeam(userJwt.id, teamId);
  }
}

