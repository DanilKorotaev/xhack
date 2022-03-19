import {
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common'
import { Request } from 'express'
import {getJwtFromRequest} from "../../helpers";

export const UserJwt = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    return getJwtFromRequest(request);
  },
);
