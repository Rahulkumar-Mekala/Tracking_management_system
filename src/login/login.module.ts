import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { ProfileService } from 'src/profile/profile.service';
import { ProfileController } from 'src/profile/profile.controller';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';

@Module({
  providers: [LoginService,],
  controllers: [LoginController,]
})
export class LoginModule {}
