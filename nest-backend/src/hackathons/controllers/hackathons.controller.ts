import {Body, Controller, Get, Param, Post, HttpCode, UseInterceptors, ValidationPipe, Req, UseGuards, Request} from '@nestjs/common';
import {ID} from "../../typings";
import {HackathonsService} from "../services/hackathons.service";
import {HackathonListFilterDto} from "../dto/hackathon-list-filter.dto";
import {LoggingInterceptor} from "../../common/interceptors/logging.interceptor";
import {ApiOperation} from "@nestjs/swagger";
import { CreateHackathonDto } from '../dto/create-hackathon.dto';
import {AuthGuard} from "../../common/guards/auth.guard";
import {UserJwt} from "../../common/decorators/user-jwt.decorator";
import {IUserPayload} from "../../typings";
import { AdminGuard } from '../../common/guards/admin.guard';
import { UpdateHackathonDto } from '../dto/update-hackathon.dto';
import { CuttingInterceptor } from 'src/common/interceptors/cutting.interceptor';
import { HackTeamListFilterDto } from '../dto/hackTeamListFilter.dto';
import { UsersListFilterDto } from '../dto/usersListFilter.dto';

@Controller('hackathons')
@UseInterceptors(LoggingInterceptor)
@UseInterceptors(CuttingInterceptor)
export class HackathonsController {
  constructor(
    private hackathonService: HackathonsService,
  ) {}

  @ApiOperation({
    summary: 'Get hacks list',
    tags: [HackathonsController.name],
  })
  @HttpCode(200)
  @Post('get-list')
  async listHackathons(@Body(ValidationPipe) hackathonListFilterDto: HackathonListFilterDto) {
    return this.hackathonService.listHackathonsByFilterWithPaging(hackathonListFilterDto);
  }

  @Post('getTeamsForHackathon/:id')
  async getTeamsForHackathon(@Body(ValidationPipe) teamsListFilterDto: HackTeamListFilterDto,
  @Param('id') id: ID ) {
    return this.hackathonService.getTemsForHackathon(id, teamsListFilterDto);
  }

  @UseGuards(AdminGuard)
  @Post('create-hackathon')
  @HttpCode(201)
  @ApiOperation({
    summary: 'Creates hackathon',
    tags: [HackathonsController.name],
  })
  async createHackathon(@Body(ValidationPipe) createHackathonDto: CreateHackathonDto) {
    return this.hackathonService.createHackathon(createHackathonDto);
  }

  @UseGuards(AdminGuard)
  @Post('update-hackathon/:id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Updates hackathon',
    tags: [HackathonsController.name],
  })
  async updateHackathon(@Param('id') id: ID, @Body(ValidationPipe) updateHackathonDto: UpdateHackathonDto) {
    return this.hackathonService.updateHackathon(id, updateHackathonDto);
  }

  @ApiOperation({
    summary: 'Delete all hackathons',
    tags: [HackathonsController.name],
  })
  @Post('delete-hackathons')
  async deleteAllHackathons() {
    await this.hackathonService.deleteHackathons()
  }

  @Get('get-by-id/:id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get hackathon by id',
    tags: [HackathonsController.name],
  })
  async getHackathonById(@UserJwt() userJwt: IUserPayload, @Param('id') id: ID) {
    return this.hackathonService.getHackathonById(userJwt.id, id);
  }

  @Get('get-by-id/admin/:id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get hackathon by id for admin',
    tags: [HackathonsController.name],
  })
  async getHackathonByIdAdmin(@Param('id') id: ID) {
    return this.hackathonService.getHackathonByIdAdmin(id);
  }

  @Post('willGoHackathon/:id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @ApiOperation({
    summary: 'Will go hackathon',
    tags: [HackathonsController.name],
  })
  async willGoHackathon(@UserJwt() userJwt: IUserPayload, @Param('id') hackathonId: ID) {
    return  this.hackathonService.willGoHackathon(userJwt.id, hackathonId)
  }

  @Post('willNotGoHackathon/:id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @ApiOperation({
    summary: 'Will not go hackathon',
    tags: [HackathonsController.name],
  })
  async willNotGoHackathon(@UserJwt() userJwt: IUserPayload, @Param('id') hackathonId: ID) {
    return this.hackathonService.willNotGoHackathon(userJwt.id, hackathonId)
  }

  @Get('getPossibleHackathons')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get possible hackathons',
    tags: [HackathonsController.name],
  })
  async getPossibleHackathons(@UserJwt() userJwt: IUserPayload) {
    return this.hackathonService.getPossibleHackForUserId(userJwt.id)
  }

  @Post('addTeamToHackathon')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @ApiOperation({
    summary: 'Add team to hackathon',
    tags: [HackathonsController.name],
  })
  async addTeamToHackathon(
    @UserJwt() userJwt: IUserPayload,
    @Body() body: { teamId: ID, hackathonId: ID },
    @Req() request: Request,
    ) {
    const { teamId, hackathonId } = body;
    return this.hackathonService.addTeamToHackathon(teamId, hackathonId);
  }

  @Post('removeTeamFromHackathon')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @ApiOperation({
    summary: 'Remove team from hackathon',
    tags: [HackathonsController.name],
  })
  async removeTeamFromHackathon(
    @UserJwt() userJwt: IUserPayload,
    @Body() body: { teamId: ID, hackathonId: ID },
    @Req() request: Request,
  ) {
    const { teamId, hackathonId } = body;
    return this.hackathonService.removeTeamFromHackathon(userJwt.id, hackathonId);
  }


  @Post('getUsersForHackathon/:id')
  async getUsersForHackathon(@Body(ValidationPipe) usersListFilterDto: UsersListFilterDto,
      @Param('id') id: ID, ) {
    return this.hackathonService.getUsersForHackathon(id, usersListFilterDto);
  }

  @Post('leaveHackTeam/:hackId')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async leaveFromHackTeam(@UserJwt() userJwt: IUserPayload,
        @Param('hackId') hackId: ID){
    return await this.hackathonService.leaveFromTeam(userJwt.id, hackId)
  }
}
