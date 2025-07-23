import { BadRequestException, Body, Controller, Get, Post, Query } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
      constructor(private readonly loginService: LoginService){}
     @Post('send-otp')
  async sendOtp(@Body('phone') phone: string) {
    if (!phone) throw new BadRequestException('Phone number is required');
    const result = await this.loginService.sendOtp(phone);
      return{
        result
      }
  }
  @Post('verify-otp')
  async verifyOtp(@Body()  body:{ code: string,phone_id: string},) {
    if (!body.code || !body.phone_id)
      throw new BadRequestException('Code and phone_id are required');

     const result= await this.loginService.verifyOtp(body.code, body.phone_id);

      return{
        result
      }
  }

@Post('create-user')
  async createUser(@Body('phone') phone: string) {
    if (!phone) throw new BadRequestException('Phone number is required');
     const result = await this.loginService.create(phone);
      return{
        result
      }
  }
  @Get('get-user-by-phone')
  async getByPhone(@Query('phone') phone: string) {
    if (!phone) throw new BadRequestException('Phone number is required');
    const result = await this.loginService.getbyphone(phone);
     return{
        result
     }
  }
}
