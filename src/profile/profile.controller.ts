import { Body, Controller, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('profile')
export class ProfileController {
     constructor(private readonly profileservice:ProfileService){}
@Patch('send-otp')
 @UseInterceptors(FileInterceptor('profile_url'))
async sendOtp(@UploadedFile() profile_url: Express.Multer.File,@Query('phone') phone:string, @Body() body: {fullname:  string;email: string;DateofBirth: string;Gender: string;}) {
  
  const result = await this.profileservice.sendOtpToEmail(phone,body.fullname,profile_url, body.email, body.DateofBirth, body.Gender);
  
  return {
    result,
  };
}

@Patch('verify-otp')
 async verifyOtp(@Query('phone') phone:string,  @Body() body:{ email: string, userOtp: string}){
   const result = await this.profileservice.verifyOtp(phone,body.email,body.userOtp);
    return{
      result
    }
 }
}
