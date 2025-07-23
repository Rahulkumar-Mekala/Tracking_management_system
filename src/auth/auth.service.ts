import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginService } from 'src/login/login.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userservice: LoginService,
    private readonly jwtService: JwtService,
  ) {}

  async authenticate(phone: string) {
    try {
      const user = await this.userservice.getbyphone(phone);
      console.log(user);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const payload = { sub: user.id, email: user.email,DateofBirth:user.DateofBirth,Gender:user.Gender,Role:user.role,phone:user.phone };
      const token = this.jwtService.sign(payload);

      console.log('JWT Token:', token);

      return {
        access_token: token,
      };
    } catch (error) {
      console.error('Auth Error:', error.message);

      return {
        message: error.message || 'Authentication failed',
      };
    }
  }
}
