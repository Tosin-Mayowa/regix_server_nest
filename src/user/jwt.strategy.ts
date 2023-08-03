import { ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
      private readonly UserService:UserService,
      private configService:ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('secret'),
    });
  }

  async validate(payload: any) {
    const {id,email}=payload;
    const user=this.UserService.findOneUser(id);
    if(!user){
        throw new UnauthorizedException()
    }
    return user
  }
}
