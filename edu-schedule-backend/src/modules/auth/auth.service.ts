import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthSuccess } from './dto/auth-success';
import { UserDto } from '../users/dto/user.dto';
import { AuthFormData } from './formdata/auth-formdata';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserDto | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  signIn(user: User): AuthSuccess {
    const payload: AuthFormData = {
      email: user.email,
      sub: user.id,
      role: user.role,
      username: user.username,
    };
    return {
      token: this.jwtService.sign(payload),
      role: user.role,
    };
  }

  async signUp(createUserDto: CreateUserDto): Promise<AuthSuccess> {
    const user = await this.usersService.createUser(createUserDto);
    const payload: AuthFormData = {
      email: user.email,
      sub: user.id,
      role: user.role,
      username: user.username,
    };
    return {
      token: this.jwtService.sign(payload),
      role: user.role,
    };
  }

  getUser(userId: number): Promise<UserDto> {
    return this.usersService.findUserById(userId);
  }
}
