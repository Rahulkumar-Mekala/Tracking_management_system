import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
     constructor( private readonly services:AuthService){

     }
   @Post('create')
    async password(@Body() body:{phone:string}){
         const result = await this.services.authenticate(body.phone);
         {
            return result;
         }

    }
    @UseGuards(JwtAuthGuard)
    @Get("profile")
     async getprofile(@Request() req){
           const user = req.user as{email?:string};
           if (!user?.email) {
                return "Profile can't be created"   
           }

           return req.user;

     }
}
