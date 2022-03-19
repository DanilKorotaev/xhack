import {
  Body,
  Controller,
  Get,
  HttpCode, Param,
  ParseBoolPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import {UsersService} from "../services/users.service";
import {UserJwt} from "../../common/decorators/user-jwt.decorator";
import {UpdateProfileDto} from "../dto/update-profile.dto";
import {AuthGuard} from "../../common/guards/auth.guard";
import {ApiOperation} from "@nestjs/swagger";
import {ID, IUserPayload} from "../../typings";
import {LoggingInterceptor} from "../../common/interceptors/logging.interceptor";
import { CuttingInterceptor } from 'src/common/interceptors/cutting.interceptor';
import { UsersInActiveSearchingDto } from '../dto/usersInActiveSearching.dto';
import {UserListFilterDto} from "../dto/user-list-filter.dto";
import { AdminGuard } from 'src/common/guards/admin.guard';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const _ = require('lodash');

@Controller('users')
@UseInterceptors(LoggingInterceptor)
@UseInterceptors(CuttingInterceptor)
export class UsersController {
  constructor(
    private usersService: UsersService,
  ) {}

  @Get('profile')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get profile',
    tags: [UsersController.name],
  })
  @UseGuards(AuthGuard)
  async getProfile(@UserJwt() userJwt: IUserPayload) {
    return await this.usersService.getUserById(userJwt.id);
  }

  @Post('get-list')
  @ApiOperation( {
    summary: "Get users list",
    tags: [UsersController.name],
  })
  @UseGuards(AdminGuard)
  async listUsers(@Body(ValidationPipe) userListFilterDto: UserListFilterDto) {
    return await this.usersService.getUsersByFilterWithPaging(userListFilterDto);
  }

  @Patch('update-profile/:id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Update profile by id',
    tags: [UsersController.name],
  })
  @UseGuards(AdminGuard)
  async updateProfileById(@Param('id') id: ID, @Body(ValidationPipe) updateProfileDTO: UpdateProfileDto) {
      await this.usersService.updateUserProfileById(id, updateProfileDTO)
  }

  @Patch('profile')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Update profile',
    tags: [UsersController.name],
  })
  @UseGuards(AuthGuard)
  async updateProfile(
    @UserJwt() userJwt: IUserPayload,
    @Body(ValidationPipe) updateProfileDTO: UpdateProfileDto,
  ) {
    await this.usersService.updateUserProfileById(userJwt.id, updateProfileDTO);
    return;
  }

  @Get('getOutgoingRequests')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async getOutgoingRequests(@UserJwt() userJwt: IUserPayload) {
    return await this.usersService.getOutgoingRequests(userJwt.id);
  }

  @Get('checkUserExists')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Check user exist',
    tags: [UsersController.name],
  })
  @UseGuards(AuthGuard)
  async checkUserExists(@UserJwt() userJwt: IUserPayload) {
    return await this.usersService.checkUserExists(userJwt.id, userJwt.email);
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get user by id',
    tags: [UsersController.name],
  })
  @UseGuards(AuthGuard)
  async getUserById(@UserJwt() userJwt: IUserPayload,
      @Param('id') id: string) {
    return await this.usersService.getUserDetails(userJwt.id, id);
  }

  @Post('getUsersInActiveSearching')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async getUsersInActiveSearching(@UserJwt() userJwt: IUserPayload, @Body(ValidationPipe) usersInActiveSearchingDto: UsersInActiveSearchingDto) {
    return this.usersService.getUsersInActiveSearching(
        userJwt.id, 
        usersInActiveSearchingDto.take, 
        usersInActiveSearchingDto.page
    )
  }

  @Post('setSearchingStatus/:status')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async setSearchingStatus(@UserJwt() userJwt: IUserPayload, @Param('status', ParseBoolPipe) status: boolean) {
    return await this.usersService.setSearchingStatus(userJwt.id, status);
  }  
}
