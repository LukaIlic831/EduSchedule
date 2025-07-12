import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
     jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          console.log(req)
          return req?.cookies?.jwt || null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET')!,
    });
  }

  async validate(payload: {
    email: string;
    sub: number;
    role: string;
    username: string;
  }) {
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
      username: payload.username,
    };
  }
}
