import { HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { AppException } from 'src/app-exception/app-exception';
import { User } from '../users/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<Omit<User, "password">> {
    const user = await this.authService.validateUser(email, password);
    if (!user)
      throw new AppException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    return user;
  }
}
