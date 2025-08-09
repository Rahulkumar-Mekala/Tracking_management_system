import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
     constructor( private readonly authService:AuthService){

     }
   @Post('create')
    @ApiBody({
    schema: {
      type: 'object',
      properties: {
        phone: { type: 'string', example: '9876543210' }
      },
      required: ['phone']
    }
  })
    async password(@Body() body:{phone:string}){
         const result = await this.authService.authenticate(body.phone);
         {
            return result;
         }

    }
    @UseGuards(JwtAuthGuard)
     @ApiBearerAuth('access-token') 
    @Get("profile")
     async getprofile(@Req() req){
          //  const user = req.user as{email?:string};
          //  if (!user?.email) {
          //       return "Profile can't be created"   
          //  }

           return req.user;

     }
     @UseGuards(JwtAuthGuard)
       @ApiBearerAuth()
  @Post('logout')
  async logout(@Req() req) {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    if (!token) return { message: '❌ No token found' };

    return this.authService.logout(token);
  }

}