import { Body, Controller, Get, Param, Post, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from "../../common/interceptors/logging.interceptor";
import { AdminGuard } from "../../common/guards/admin.guard";
import { ApiOperation } from '@nestjs/swagger';
import { NotificationsService } from '../services/notifications.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { ActualizePushTokenDto } from '../dto/actualize-push-token.dto';
import { UserJwt } from 'src/common/decorators/user-jwt.decorator';
import { ID, IUserPayload } from 'src/typings';
import { UnregisterDeviceDto } from '../dto/unregister-device.dto';
import { NewMessagePushData } from '../models/new-message-push';
import { ChatTypeEnum } from 'src/chat/models/chat.entity';

@Controller('notifications')
@UseInterceptors(LoggingInterceptor)
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) { }

  @Post('/actualizePushToken')
  @ApiOperation({
    summary: 'actualize token',
    tags: [NotificationsController.name],
  })
  @UseGuards(AuthGuard)
  async actualizePushToken(@UserJwt() userJwt: IUserPayload,
    @Body() actualizePushTokenDto: ActualizePushTokenDto) {
    return await this.notificationsService.actualizePushToken(userJwt.id,
      actualizePushTokenDto.currentToken,
      actualizePushTokenDto.oldToken
    );
  }

  @Post('/unregisterDevice')
  @ApiOperation({
    summary: 'unregister device',
    tags: [NotificationsController.name],
  })
  @UseGuards(AuthGuard)
  async unregisterDevice(@UserJwt() userJwt: IUserPayload,
    @Body() unregisterDeviceDto: UnregisterDeviceDto) {
    return await this.notificationsService.unregisterDevice(userJwt.id,
      unregisterDeviceDto.token,
    );
  }
}
