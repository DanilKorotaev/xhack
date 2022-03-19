import {Injectable, CanActivate, ExecutionContext, HttpException, CACHE_MANAGER, Inject} from '@nestjs/common';
import { Observable } from 'rxjs';
import {getJwtFromRequest} from "../../helpers";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      getJwtFromRequest(request);
    } catch (error) {
      throw new HttpException('Not authorized', 401);
    }
    return true;
  }
}
