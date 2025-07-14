import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id, role:user.role, username:user.username };
    return {
      token: this.jwtService.sign(payload),
      role: user.role,
    };
  }

  async signup(createUserDto: CreateUserDto) {
    const user = await this.usersService.createUser(createUserDto);
    const payload = { email: user.email, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
      role: user.role,
    };
  }

  getUser(userId: number){
    return this.usersService.findUserById(userId);
  }
}
