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

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('log-in')
  async login(@Request() req, @Res({ passthrough: true }) res: Response) {
    const { token, role } = await this.authService.login(req.user);
    this.setTokenInCookies(token, res);
    return { token, role };
  }

  
  @Post('sign-up')
  async signup(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { token, role } = await this.authService.signup(createUserDto);
    this.setTokenInCookies(token, res);
    return { token, role };
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  getUser(@Request() req) {
    return req.user;
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
  signout(@Res({ passthrough: true }) res: Response){
   res.cookie('jwt', '', {
      expires: new Date(Date.now()),
    });
    return {};
  }
}
