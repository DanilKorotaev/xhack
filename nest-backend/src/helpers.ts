import {IUserPayload} from "./typings";
import { AuthService } from "./auth/services/auth.service";
import { MoreThan, MoreThanOrEqual } from "typeorm";
import { format } from 'date-fns'

export const getJwtFromRequest = async (request: any): Promise<IUserPayload | never> => {
  const tokenFromHeader = (request.headers['authorization'] || '').slice('Bearer '.length);
  const tokenFromCookie = request.cookies.access_token;
  const tokenToUse = tokenFromHeader || tokenFromCookie;
  if (!tokenToUse) {
    throw new Error('Cannot extract jwt from request');
  }
  const payload = await AuthService.getPayloadFromToken(tokenToUse);
  if (!payload) {
    throw new Error('Cannot extract jwt from request');
  }
  return payload;
}

export const MoreThanDate = (date: Date) => MoreThan(format(date, 'yyyy-MM-dd HH:MM:ss'))
export const MoreThanOrEqualDate = (date: Date) => MoreThanOrEqual(format(date, 'yyyy-MM-dd HH:MM:ss'))