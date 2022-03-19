import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import {randomBytes, scrypt} from "crypto";
import {LoginDto} from "../dto/login.dto";
import {RegisterDto} from "../dto/register.dto";
import {promisify} from "util";

import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "../../users/models/user.entity";
import { ID, IUserPayload } from "../../typings";
import {ConfigService} from "@nestjs/config";
import { LoginAdminDto } from "../dto/login-admin.dto";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const _ = require('lodash');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken');


const scryptAsync = promisify(scrypt);

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  static async hashPassword(password: string): Promise<string> {
    const salt = randomBytes(8).toString('hex');
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${buf.toString('hex')}.${salt}`;
  }

  static async comparePasswords(storedPassword: string, suppliedPassword: string): Promise<boolean> {
    const [hashedPassword, salt] = storedPassword.split('.');
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
    return buf.toString('hex') === hashedPassword;
  }

  static async generateTokenForUser(id: number, email: string): Promise<string> {
    return jwt.sign(
      {
        id,
        email,
      } as IUserPayload,
      process.env.APP_SECRET,
    );
  }

  static async generateAdminPayload(): Promise<string> {
    return jwt.sign(
      {
        id: 1,
        email: 'test',
        admin: "true",
      },
      process.env.APP_SECRET,
    );
  }

  static async isValidToken(token: string): Promise<boolean> {
    try {
      return !!(await AuthService.getPayloadFromToken(token));
    } catch (error) {
      return false;
    }
  }

  static async getPayloadFromToken(token: string) {
    const payload = (() => {
      try {
        return jwt.verify(
          token,
          process.env.APP_SECRET,
        ) as IUserPayload;
      } catch (error) {
        throw error;
      }
    })();

    return payload;
  }

  static async getUserIdFromToken(token: string): Promise<ID> {
    const payload = await AuthService.getPayloadFromToken(token);
    return payload.id;
  }

  async login(loginDto: LoginDto): Promise<{ token: string, user: User }> {
    const userWithThisEmail = await this.usersRepository.createQueryBuilder('user')
      .addSelect("user.hashedPassword")
      .where({ email: loginDto.email })
      .getOne();
    console.log(userWithThisEmail);
    if (!userWithThisEmail || !await AuthService.comparePasswords(userWithThisEmail.hashedPassword, loginDto.password)) {
      throw new HttpException('Invalid credentials', 400);
    }
    return {
      user: userWithThisEmail,
      token: await AuthService.generateTokenForUser(userWithThisEmail.id, userWithThisEmail.email),
    };
  }

  async loginAdmin(loginAdminDto: LoginAdminDto) {
    if (loginAdminDto.key !== process.env.ADMIN_KEY) {
      throw new BadRequestException();
    }
    return {
      token: await AuthService.generateAdminPayload(),
    }
  }

  async register(registerDto: RegisterDto) {
    const userWithThisEmail = await this.usersRepository.findOne({
      where: {
        email: registerDto.email,
      }
    });
    console.log(registerDto)
    console.log(userWithThisEmail)
    if (userWithThisEmail) {
      throw new HttpException('User already exist', 400);
    }
    const user = await this.usersRepository.create({
      ...(_.omit(registerDto, ['password'])),
      hashedPassword: await AuthService.hashPassword(registerDto.password),
    }) as any as User;
    await this.usersRepository.save(user);
    // return await this.login(new LoginDto(registerDto.email, registerDto.password));

    return {
      ...user,
      token: await AuthService.generateTokenForUser(user.id, user.email),
    }
  }
}
