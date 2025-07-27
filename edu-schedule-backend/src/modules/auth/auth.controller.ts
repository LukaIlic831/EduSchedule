import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Res,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Response } from 'express';
import { AuthSuccess } from './dto/auth-success';
import { AuthUser } from './dto/auth-user';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(
    @Request() req,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthSuccess> {
    const { token, role } = await this.authService.signIn(req.user);
    this.setTokenInCookies(token, res);
    return { token, role };
  }

  @Post('sign-up')
  async signUp(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthSuccess> {
    const { token, role } = await this.authService.signUp(createUserDto);
    this.setTokenInCookies(token, res);
    return { token, role };
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getUser(@Request() req): Promise<AuthUser> {
    const user = await this.authService.getUser(req.user.id);
    const token = req.cookies?.jwt;
    return {
      user,
      token,
    };
  }

  setTokenInCookies(token: string, res: Response) {
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 3600000,
    });
  }

  @Get('sign-out')
  signOut(@Res({ passthrough: true }) res: Response) {
    res.cookie('jwt', '', {
      expires: new Date(Date.now()),
    });
  }
}
