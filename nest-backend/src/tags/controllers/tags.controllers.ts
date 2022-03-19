import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  HttpCode,
  UseInterceptors,
  ValidationPipe,
  Req,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ID } from '../../typings';
import { LoggingInterceptor } from '../../common/interceptors/logging.interceptor';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '../../common/guards/auth.guard';
import { UserJwt } from '../../common/decorators/user-jwt.decorator';
import { IUserPayload } from '../../typings';
import { TagsService } from '../services/tags.service';
import { AddTagForUserDto } from '../dto/addTagForUser.dto';
import { AddUserTagDto } from '../dto/addUserTag.dto';
import { AddHackTagDto } from '../dto/addHackTag.dto';
import { AddTagForHackDto } from '../dto/addTagForHack.dto';
import { CreateTagsDto } from '../dto/createTags.dto';

@Controller('tags')
@UseInterceptors(LoggingInterceptor)
export class TagsController {
  constructor(private tagService: TagsService) {}

  @Get('getTagsList')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async getTagsList() {
    return await this.tagService.getTagsList();
  }

  @Post('addTagsForUser')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Add tag for user',
    tags: [TagsController.name],
  })
  async addTagForUser(
    @UserJwt() userJwt: IUserPayload,
    @Body() addTagForUserDto: AddTagForUserDto,
  ) {
    await this.tagService.addTagsForUser(userJwt.id, addTagForUserDto.tagIds);
    return;
  }

  @Post('addUserTag')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Add add user tag',
    tags: [TagsController.name],
  })
  async addUserTag(
    @UserJwt() userJwt: IUserPayload,
    @Body() addUserTagDto: AddUserTagDto,
  ) {
    await this.tagService.addUserTag(addUserTagDto.tagName);
    return;
  }

  @Post('addTagForHackathon')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Add tag for hackathon',
    tags: [TagsController.name],
  })
  async addTagForHackathon(@Body() addTagForHackDto: AddTagForHackDto) {
    await this.tagService.addTagForHackathon(
      addTagForHackDto.hackathonId,
      addTagForHackDto.tagId,
    );
    return;
  }

  @Post('addHackathonTag')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Add hackathon tag',
    tags: [TagsController.name],
  })
  async addHackathonTag(@Body() addHackTagDto: AddHackTagDto) {
    await this.tagService.addHackathonTag(addHackTagDto.tagName);
    return;
  }

  @Post('createTags')
  @HttpCode(200)
  async createTags(@Body() createTagsDto: CreateTagsDto) {
    await this.tagService.createTags(createTagsDto.names);
    return;
  }
}
