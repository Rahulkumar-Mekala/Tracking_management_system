import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { LoginService } from 'src/login/login.service';

@Module({
  imports:[JwtModule.register({
    secret: 'your_jwt_secret', 
    signOptions: { expiresIn: '1h' },
  }),
],
  providers: [AuthService,LoginService,JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {

}
