import { NotificationsService } from './../../notification/services/notifications.service';
import { BadRequestException, Injectable, OnModuleInit, HttpException, HttpStatus, ForbiddenException } from '@nestjs/common';
import { SocketIoGateway } from "../../socket-io/socket-io.gateway";
import { ID } from "../../typings";
import { ISendMessageData } from "../../socket-io/events/incoming/send-message.event";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../users/models/user.entity";
import { MoreThan, Repository } from "typeorm";
import { Team } from "../../teams/models/team.entity";
import { Chat, ChatTypeEnum } from "../models/chat.entity";
import { Message } from "../models/message.entity";
import { IoOutcomingEvents } from "../../socket-io/IoEvents.enum";
import { INewMessageData } from "../../socket-io/events/outcoming/new-message.event";
import { ModuleRef } from "@nestjs/core";
import { LastReadMessage } from '../models/last-read-message.entity';
import { paginate, paginateRawAndEntities } from 'nestjs-typeorm-paginate';
import { IReadMessageData } from 'src/socket-io/events/incoming/read-message.event';


@Injectable()
export class ChatService implements OnModuleInit {
  constructor(
    //

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,

    @InjectRepository(Team)
    private teamRepository: Repository<Team>,

    @InjectRepository(Message)
    private messageRepository: Repository<Message>,

    @InjectRepository(LastReadMessage)
    private lastReadMessageRepository: Repository<LastReadMessage>,

    private moduleRef: ModuleRef,
  ) { }

  private ioGW: SocketIoGateway;
  private notificationService: NotificationsService;

  async onModuleInit() {
    this.ioGW = this.moduleRef.get(SocketIoGateway, { strict: false });
    this.notificationService = this.moduleRef.get(NotificationsService, { strict: false });
  }

  public async isUserAbleToSendMessageToTheChat(userId: ID, chat: Chat): Promise<boolean> {
    const allUsers = ([
      ...(chat.team?.members ?? []),
      chat.firstUser,
      chat.secondUser,
    ])
      .filter(Boolean);
    return allUsers.some(x => x.id === userId);
  }

  public async isUserAbleToDeleteMessage(userId: ID, messageId: ID) {
    return true;
  }

  public async getChatById(chatId: ID) {
    return null;
  }

  public async sendMessage(userId: ID, sendMessageEventData: ISendMessageData) {
    if (sendMessageEventData.chatId === null
      && sendMessageEventData.secondUserId === null
      && sendMessageEventData.teamId === null) {
      throw new BadRequestException();
    }
    var chatId = sendMessageEventData.chatId;
    if (chatId === null) {
      if (sendMessageEventData.teamId !== null) {
        chatId = await this.createGroupChat(userId, sendMessageEventData.teamId);
      } else {
        chatId = await this.createP2PChat(userId, sendMessageEventData.secondUserId);
      }
    }

    const chat = await this.chatRepository.createQueryBuilder('chat')
      .select()
      .where({
        id: chatId,
      })
      .leftJoinAndSelect('chat.team', 'team')
      .leftJoinAndSelect('team.members', 'member')
      .leftJoinAndSelect('chat.firstUser', 'firstUser')
      .leftJoinAndSelect('chat.secondUser', 'secondUser')
      .getOne();

    if (!await this.isUserAbleToSendMessageToTheChat(userId, chat)) {
      throw new ForbiddenException();
    }

    const message = this.messageRepository.create({
      from: (userId as any) as User,
      chat: (chatId as any) as Chat,
      guid: sendMessageEventData.guid,
      text: sendMessageEventData.message,
    });

    await this.messageRepository.save(message);

    const allUsers = ([
      ...(chat.team?.members ?? []),
      chat.firstUser,
      chat.secondUser,
    ])
      .filter(Boolean);

    const usersToNotify = allUsers;

    const sender = allUsers.find(u => u.id === userId);

    usersToNotify.forEach((user) => {
      const chatName = this.getChatName(user.id, chat);
      const newMessageEventData: INewMessageData = {
        chatId,
        fromId: userId,
        message: sendMessageEventData.message,
        sender,
        guid: sendMessageEventData.guid,
        id: message.id,
        createdAt: message.createdAt,
        chatName: chatName
      };
      this.ioGW.emitToUser(user.id, IoOutcomingEvents.NewMessage, newMessageEventData);
      if (userId !== user.id)
        this.notificationService.sendNewMessagePush(user.id, newMessageEventData);
    });
  }

  private async createP2PChat(currentUserId: ID, secondUserId: ID): Promise<ID> {
    const chat = this.chatRepository.create({
      firstUser: (currentUserId as any) as User,
      secondUser: (secondUserId as any) as User,
      type: ChatTypeEnum.P2P
    });
    return (await this.chatRepository.save(chat)).id;
  }

  private async createGroupChat(currentUserId: ID, teamId: ID): Promise<ID> {
    const team = await this.teamRepository.findOne(teamId);
    console.log(team.chat);
    if (team.chat)
      return team.chat.id;
    const chat = this.chatRepository.create({
      team: (teamId as any) as Team,
      type: ChatTypeEnum.GROUP
    });
    const chatId = (await this.chatRepository.save(chat)).id;
    await this.teamRepository.update(teamId, {
      chat: (chatId as any) as Chat
    });
    return chatId;
  }

  public async deleteMessage(userId: ID, messageId: ID) {
    if (!await this.isUserAbleToDeleteMessage(userId, messageId)) {
      throw new BadRequestException('');
    }

  }

  async getChats(userId: ID) {
    const query = this.chatRepository.createQueryBuilder('chat')
      .select()
      .addSelect('(SELECT "message"."createdAt" FROM "message" "Message" WHERE "Message"."chatId" = "chat"."id" ORDER BY "Message"."id" DESC LIMIT 1) AS lastMessageDate')
      .addSelect(qb => {
        qb.select('COUNT(*)')
          .from(Message, 'message')
          .where(`message.id > (CASE WHEN (SELECT  "last_read_message"."messageId" FROM "last_read_message" WHERE "last_read_message"."chatId" = "chat"."id" AND "last_read_message"."userId" = ${userId} ORDER BY "last_read_message"."id" DESC LIMIT 1) IS NULL THEN 0 ELSE (SELECT  "last_read_message"."messageId" FROM "last_read_message" WHERE "last_read_message"."chatId" = "chat"."id" AND "last_read_message"."userId" = ${userId} ORDER BY "last_read_message"."id" DESC LIMIT 1) END) AND "message"."chatId" = "chat"."id" AND "message"."fromId" <> ${userId}`);
        return qb;
      }, 'unreadMessageCount')
      .where(`chat.firstUser = ${userId}`)
      .orWhere(`chat.secondUser = ${userId}`)
      .orWhere(`chat.team IN (${this.teamRepository.createQueryBuilder('team')
        .select('team.id')
        .innerJoin('team.members', 'member')
        .where(`member.id = ${userId}`).getQuery()
        })`)
      .orderBy('lastMessageDate', 'DESC')
      .leftJoinAndSelect('chat.team', 'team')
      .leftJoinAndSelect('chat.firstUser', 'firstUser')
      .leftJoinAndSelect('chat.secondUser', 'secondUser')
      .leftJoinAndSelect('chat.messages', 'message', `message.id IN (SELECT id FROM "message" "Message" WHERE "Message"."chatId" = "chat"."id" ORDER BY "Message"."id" DESC LIMIT 1)`);


    const [pagination, rawResults] = await paginateRawAndEntities(query, {
      page: 1,
      limit: 20
    });

    return pagination.items.map((chat, index) => {
      const name = this.getChatName(userId, chat);
      const avatarUrl = this.getChatUrl(userId, chat);

      return {
        ...chat,
        name: name,
        avatarUrl: avatarUrl,
        unreadMessageCount: +rawResults[index]['unreadMessageCount']
      };
    });
  }

  async getHistorySince(userId: ID, chatId: ID, messageId: ID | null, take: number) {
    messageId = Number.isNaN(+messageId) ? Number.MAX_VALUE : messageId;
    return (await paginate(this.messageRepository.createQueryBuilder('message')
      .select()
      .where(`message.chatId = ${chatId} AND message.id < ${messageId}`)
      .leftJoinAndSelect('message.from', 'user')
      .orderBy('message.id', 'DESC'), {
      limit: take,
      page: 1
    })).items;
  }

  async readMessage(userId: ID, readMessageData: IReadMessageData) {
    if (await this.lastReadMessageRepository.findOne({
      message: (readMessageData.messageId as any) as Message,
      chat: (readMessageData.chatId as any) as Chat,
      user: (userId as any) as User
    }))
      return;
    const lastReadMessage = this.lastReadMessageRepository.create({
      message: (readMessageData.messageId as any) as Message,
      chat: (readMessageData.chatId as any) as Chat,
      user: (userId as any) as User
    });
    await this.lastReadMessageRepository.save(lastReadMessage);
    this.ioGW.emitToUser(userId, IoOutcomingEvents.ReadChat, {
      chatId: readMessageData.chatId
    });
  }

  async getChatInfo(userId: ID, chatId: ID) {
    const chat = await this.chatRepository.findOne(chatId, { relations: ['team', 'firstUser', 'team.members', 'secondUser'] });
    if (chat.firstUser?.id === userId
      || chat.secondUser?.id === userId
      || chat.team?.members.some(x => x.id === userId))
      return {
        ...chat,
        name: this.getChatName(userId, chat),
        avatarUrl: this.getChatUrl(userId, chat)
      };
    throw new HttpException('', HttpStatus.FORBIDDEN);
  }

  async removeTeamChat(team: Team, chatId: ID) {
    team.members.forEach(member => this.ioGW.emitToUser(member.id, IoOutcomingEvents.ChatRemoved, { chatId }));

    await this.lastReadMessageRepository.delete({ chat: { id: chatId as number } });
    await this.messageRepository.delete({ chat: { id: chatId as number } });
    await this.chatRepository.delete(chatId);
  }

  async teammateRemoved(teamId: ID, chatId: ID, userId: ID) {
    this.ioGW.emitToUser(userId, IoOutcomingEvents.ChatLeaved, { chatId });
  }

  private getChatUrl(userId: ID, chat: Chat): string {
    if (chat.type === ChatTypeEnum.GROUP)
      return chat.team?.avatarUrl;
    if (chat.firstUser?.id === userId)
      return chat.secondUser?.avatarUrl;
    return chat.firstUser.avatarUrl;
  }

  private getChatName(userId: ID, chat: Chat): string {
    if (chat.type === ChatTypeEnum.GROUP)
      return chat.team.name;
    if (chat.firstUser.id === userId)
      return chat.secondUser.name;
    return chat.firstUser.name;
  }
}
