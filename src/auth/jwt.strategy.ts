import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "your_jwt_secret",
    });
  }

 async validate(payload: any) {
    return {
      userId: payload.userId,
      email: payload.email,
      dateOfBirth: payload.dateOfBirth,
      gender: payload.gender,
      role: payload.role,
      phone: payload.phone,
      driver_code: payload.driver_code,
      conductor_code: payload.conductor_code,
      shift_time: payload.shift_time,
      bus_id: payload.bus_id,
      route_id: payload.route_id,
    };
  }
  
}
