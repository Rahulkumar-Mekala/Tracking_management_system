import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { LoginService } from 'src/login/login.service';
import { DriverService } from 'src/driver/driver.service';
import { ConductorService } from 'src/conductor/conductor.service';


@Module({
  imports:[JwtModule.register({
    secret: 'your_jwt_secret', 
    signOptions: { expiresIn: '1h' },
  }),
],
  providers: [AuthService,LoginService,JwtStrategy,DriverService,ConductorService,],
  controllers: [AuthController]
})
export class AuthModule {

}
