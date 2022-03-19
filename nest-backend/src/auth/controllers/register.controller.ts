import {Body, Controller, HttpCode, Post, ValidationPipe} from '@nestjs/common';
import {ApiOperation} from "@nestjs/swagger";
import {RegisterDto} from "../dto/register.dto";
import {AuthService} from "../services/auth.service";

@Controller('auth/register')
export class RegisterController {
  constructor(
    private authService: AuthService,
  ) {}

  @ApiOperation({
    summary: 'Registration',
    tags: [RegisterController.name],
  })
  @Post()
  @HttpCode(201)
  register(@Body(ValidationPipe) registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
