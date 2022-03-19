import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  UseGuards,
  UseInterceptors,
  ValidationPipe
} from '@nestjs/common';
import {BookmarkHackathonDTO} from "../dto/BookmarkHackathonDTO";
import {BookmarkUserDTO} from "../dto/BookmarkUserDTO";
import {BookmarksService} from "../services/bookmarks.service";
import {UserJwt} from "../../common/decorators/user-jwt.decorator";
import {BookmarkTeamDTO} from "../dto/BookmarkTeamDTO";
import {BookmarkMessageDTO} from "../dto/BookmarkMessageDTO";
import {BookmarkChatDTO} from "../dto/BookmarkChatDTO";
import {ApiOperation} from "@nestjs/swagger";
import {AuthGuard} from "../../common/guards/auth.guard";
import {IUserPayload} from "../../typings";
import {LoggingInterceptor} from "../../common/interceptors/logging.interceptor";
import { CuttingInterceptor } from 'src/common/interceptors/cutting.interceptor';

@Controller('bookmarks')
@UseInterceptors(LoggingInterceptor)
@UseInterceptors(CuttingInterceptor)
export class BookmarksController {
  constructor(
    private bookmarksService: BookmarksService,
  ) {}

  @Get('get-bookmarked-hackathons')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get bookmarked hackathons',
    tags: [BookmarksController.name],
  })
  @UseGuards(AuthGuard)
  async getBookmarkedHackathons(@UserJwt() userJwt: IUserPayload,) {
    return await this.bookmarksService.hackathons(userJwt.id)
  }

  @Get('get-bookmarked-teams')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get bookmarked teams',
    tags: [BookmarksController.name],
  })
  @UseGuards(AuthGuard)
  async getBookmarkedTeams(@UserJwt() userJwt: IUserPayload) {
    return await this.bookmarksService.teams(userJwt.id)
  }

  @Get('get-bookmarked-users')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get bookmarked users',
    tags: [BookmarksController.name],
  })
  @UseGuards(AuthGuard)
  async getBookmarkedUsers(@UserJwt() userJwt: IUserPayload) {
    return await this.bookmarksService.users(userJwt.id)
  }

  @Get('get-bookmarked-messages')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get bookmarked messages',
    tags: [BookmarksController.name],
  })
  @UseGuards(AuthGuard)
  async getBookmarkedMessages() {
    return;
  }

  @Get('get-bookmarked-chats')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get bookmarked chats',
    tags: [BookmarksController.name],
  })
  @UseGuards(AuthGuard)
  async getBookmarkedChats() {
    return;
  }

  @Post('bookmark-hackathon')
  @HttpCode(201)
  @ApiOperation({
    summary: 'Bookmark hackathon',
    tags: [BookmarksController.name],
  })
  @UseGuards(AuthGuard)
  async bookmarkHackathon(
    @UserJwt() userJwt: IUserPayload,
    @Body(ValidationPipe) bookmarkHackathonDTO: BookmarkHackathonDTO,
  ): Promise<void> {
    await this.bookmarksService.bookmarkHackathon(userJwt.id, bookmarkHackathonDTO.hackathonId);
    return;
  }

  @Post('remove-hackathon-bookmark')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Remove hackathon from bookmarks',
    tags: [BookmarksController.name],
  })
  @UseGuards(AuthGuard)
  async removeHackathonBookmark(
    @UserJwt() userJwt: IUserPayload,
    @Body(ValidationPipe) bookmarkHackathonDTO: BookmarkHackathonDTO,
  ): Promise<void> {
    await this.bookmarksService.removeHackathonBookmark(userJwt.id, bookmarkHackathonDTO.hackathonId);
    return;
  }

  @Post('bookmark-user')
  @HttpCode(201)
  @ApiOperation({
    summary: 'Bookmark user',
    tags: [BookmarksController.name],
  })
  @UseGuards(AuthGuard)
  async bookmarkUser(
    @UserJwt() userJwt: IUserPayload,
    @Body(ValidationPipe) bookmarkUserDTO: BookmarkUserDTO,
  ): Promise<void> {
    await this.bookmarksService.bookmarkUser(userJwt.id, bookmarkUserDTO.userId);
    return;
  }

  @Post('remove-user-bookmark')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Remove user from bookmarks',
    tags: [BookmarksController.name],
  })
  @UseGuards(AuthGuard)
  async removeUserBookmark(
    @UserJwt() userJwt: IUserPayload,
    @Body(ValidationPipe) bookmarkUserDTO: BookmarkUserDTO,
  ): Promise<void> {
    await this.bookmarksService.removeUserBookmark(userJwt.id, bookmarkUserDTO.userId);
    return;
  }

  @Post('bookmark-team')
  @HttpCode(201)
  @ApiOperation({
    summary: 'Bookmark team',
    tags: [BookmarksController.name],
  })
  @UseGuards(AuthGuard)
  async bookmarkTeam(
    @UserJwt() userJwt: IUserPayload,
    @Body(ValidationPipe) bookmarkTeamDTO: BookmarkTeamDTO,
  ): Promise<void> {
    await this.bookmarksService.bookmarkTeam(userJwt.id, bookmarkTeamDTO.teamId);
    return;
  }

  @Post('remove-team-bookmark')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Remove team from bookmarks',
    tags: [BookmarksController.name],
  })
  @UseGuards(AuthGuard)
  async removeTeamBookmark(
    @UserJwt() userJwt: IUserPayload,
    @Body(ValidationPipe) bookmarkTeamDTO: BookmarkTeamDTO,
  ): Promise<void> {
    await this.bookmarksService.removeTeamBookmark(userJwt.id, bookmarkTeamDTO.teamId);
    return;
  }

  @Post('bookmark-message')
  @ApiOperation({
    summary: 'Bookmark message',
    tags: [BookmarksController.name],
  })
  @HttpCode(201)
  @UseGuards(AuthGuard)
  async bookmarkMessage(
    @UserJwt() userJwt: IUserPayload,
    @Body(ValidationPipe) bookmarkMessageDTO: BookmarkMessageDTO,
  ): Promise<void> {
    await this.bookmarksService.bookmarkMessage(userJwt.id, bookmarkMessageDTO.messageId);
    return;
  }

  @Delete('remove-message-bookmark')
  @ApiOperation({
    summary: 'Remove message from bookmarks',
    tags: [BookmarksController.name],
  })
  @HttpCode(204)
  @UseGuards(AuthGuard)
  async removeMessageBookmark(
    @UserJwt() userJwt: IUserPayload,
    @Body(ValidationPipe) bookmarkMessageDTO: BookmarkMessageDTO,
  ): Promise<void> {
    await this.bookmarksService.removeMessageBookmark(userJwt.id, bookmarkMessageDTO.messageId);
    return;
  }

  @Post('bookmark-chat')
  @HttpCode(201)
  @ApiOperation({
    summary: 'Bookmark chat',
    tags: [BookmarksController.name],
  })
  @UseGuards(AuthGuard)
  async bookmarkChat(
    @UserJwt() userJwt: IUserPayload,
    @Body(ValidationPipe) bookmarkChatDTO: BookmarkChatDTO,
  ): Promise<void> {
    await this.bookmarksService.bookmarkChat(userJwt.id, bookmarkChatDTO.chatId);
    return;
  }

  @Delete('remove-chat-bookmark')
  @ApiOperation({
    summary: 'Remove chat from bookmarks',
    tags: [BookmarksController.name],
  })
  @UseGuards(AuthGuard)
  @HttpCode(204)
  async removeChatBookmark(
    @UserJwt() userJwt: IUserPayload,
    @Body(ValidationPipe) bookmarkChatDTO: BookmarkChatDTO,
  ): Promise<void> {
    await this.bookmarksService.removeChatBookmark(userJwt.id, bookmarkChatDTO.chatId);
    return;
  }
}
