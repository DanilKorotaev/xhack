import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import {LoginController} from "./controllers/login.controller";
import {RegisterController} from "./controllers/register.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../users/models/user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [LoginController, RegisterController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
