import { Injectable, CanActivate, ExecutionContext, HttpException } from '@nestjs/common';
import { Observable } from 'rxjs';
import {getJwtFromRequest} from "../../helpers";

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const payload = await getJwtFromRequest(request);
      if (!payload.admin) {
        return false;
      }
    } catch (error) {
      throw new HttpException('Not authorized', 401);
    }
    return true;
  }
}
