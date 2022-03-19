import {Body, Controller, Get, HttpCode, Post, UseGuards, UseInterceptors, ValidationPipe} from '@nestjs/common';
import {ApiOperation} from "@nestjs/swagger";
import {LoginDto} from "../dto/login.dto";
import {AuthService} from "../services/auth.service";
import {LoggingInterceptor} from "../../common/interceptors/logging.interceptor";
import { LoginAdminDto } from "../dto/login-admin.dto";
import {AdminGuard} from "../../common/guards/admin.guard";

@Controller('auth/login')
@UseInterceptors(LoggingInterceptor)
export class LoginController {
  constructor(
    private authService: AuthService,
  ) {}

  @ApiOperation({
    summary: 'Login',
    tags: [LoginController.name],
  })
  @Post()
  @HttpCode(200)
  login(@Body(ValidationPipe) loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiOperation({
    summary: 'Login admin',
    tags: [LoginController.name],
  })
  @Post('login-admin')
  @HttpCode(200)
  admin(@Body(ValidationPipe) loginAdminDto: LoginAdminDto) {
    return this.authService.loginAdmin(loginAdminDto);
  }

  @ApiOperation({
    summary: 'Checks admin access',
    tags: [LoginController.name],
  })
  @Get('check-admin')
  @UseGuards(AdminGuard)
  checkAdmin() {
    return { success: true };
  }
}
