import {
  Controller,
  Post,
  HttpCode,
  Request,
  HttpStatus,
  Body,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './auth.dto';
import { CreateUserDto } from '../user/user.dto';
import { AuthGuard } from './auth.guard';
import { Request as ExpressRequest } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() body: CreateUserDto) {
    return this.authService.register(body);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() request: ExpressRequest & { user: string }) {
    return request.user;
  }
}
