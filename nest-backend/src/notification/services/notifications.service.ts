import { PushCategory } from './../models/push-category';
import { NewRequestPushData } from './../models/new-request-push-data';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from 'src/users/models/user.entity';
import { Repository } from "typeorm";
import { ID } from "../../typings";
import { NewMessagePushData } from '../models/new-message-push';
import { PushToken } from '../models/push-token.entity';
import { INewMessageData } from 'src/socket-io/events/outcoming/new-message.event';
import { NewToTeamRequestPushData } from '../models/new-to-team-request-push';
import { RemoveFromTeamPush } from '../models/remove-from-team-push';
import { RemovedTeamPush } from '../models/removed-team-push';
var apn = require('apn');

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(PushToken)
    private tokensRepository: Repository<PushToken>
  ) { }

  async actualizePushToken(userId: ID, currentToken: string, oldToken: string | null) {
    var token = this.tokensRepository.create({
      user: (userId as any) as User,
      token: currentToken
    });
    await this.tokensRepository.save(token);
  }

  async unregisterDevice(userId: ID, token: string) {
    await this.tokensRepository.delete({
      user: (userId as any) as User,
      token: token
    });
  }

  async sendNewMessagePush(userId: ID, data: INewMessageData) {
    this.sendPush(userId, data.chatName, `${data.sender.name}: ${data.message}`, { chatId: data.chatId }, PushCategory.NewMessage);
  }

  async sendNewRequestPush(userId: ID, data: NewRequestPushData) {
    this.sendPush(userId, "Вас пригласили в команду", null, data, PushCategory.NewRequestToUser);
  }

  async sendNewToTeamRequestPush(userId: ID, data: NewToTeamRequestPushData) {
    this.sendPush(userId, "Новый запрос в команду", null, data, PushCategory.NewRequestToTeam);
  }

  async sendRemoveFromTeam(userId: ID, data: RemoveFromTeamPush) {
    this.sendPush(userId, `Вас удалили из команды ${data.teamName}`, null, data, PushCategory.RemoveFromTeam);
  }

  async sendRemovedTeam(userId: ID, data: RemovedTeamPush) {
    this.sendPush(userId, `Команда ${data.teamName} расформирована`, null, null, null);
  }

  private async sendPush(userId: ID, title: string, subtitle: string, payload: object, category: PushCategory) {
    const tokens = await this.tokensRepository.find({
      user: { id: userId as number }
    });

    var options = {
      cert: __dirname + '/cert.pem',
      key: __dirname + '/key.pem'
    };
    var apnProvider = new apn.Provider(options);

    var pushData = new apn.Notification();

    pushData.expiry = Math.floor(Date.now() / 1000) + 3600;
    pushData.sound = "ping.aiff";
    pushData.title = title;
    pushData.subtitle = subtitle;
    pushData.payload = payload;
    pushData.topic = process.env.IOS_BUNDLE_ID;
    pushData.category = category;
    console.log(pushData);
    apnProvider.send(pushData, tokens.map(x => x.token))
      .then(result => console.log(result.sent));
    apnProvider.shutdown();
  }
}
