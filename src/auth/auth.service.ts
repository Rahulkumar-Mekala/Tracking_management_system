import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { eq } from 'drizzle-orm';
import { log } from 'node:console';
import { ConductorService } from 'src/conductor/conductor.service';
import { db } from 'src/db/db.connection';
import { revoked_tokens } from 'src/db/schema';
import { DriverService } from 'src/driver/driver.service';
import { LoginService } from 'src/login/login.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userservice: LoginService,
    private readonly jwtService: JwtService,
    private readonly driverservice: DriverService,
    private readonly conductorservice: ConductorService,
  ) {}

 async authenticate(phone: string) {
  try {
    const user = await this.userservice.getbyphone(phone);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    let assignment: any = null;

    if (user.role === 'DRIVER') {
      const result = await this.driverservice.findbyphonenumber(user.phone);
      if (result && result.length > 0) {
        assignment = {
          driver_code: result[0].driver_code,
          shift_time: result[0].shift_time,
          bus_id: result[0].bus_id,
          route_id: result[0].route_id,
        };
      }
    } else if (user.role === 'CONDUCTOR') {
      const result = await this.conductorservice.findbyphonenumber(user.phone);
      if (result && result.length > 0) {
        assignment = {
          conductor_code: result[0].condutor_code,
          shift_time: result[0].shift_time,
          bus_id: result[0].bus_id,     
          route_id: result[0].route_id,
        };
      }
    }

   
    const payload: any = {
       userId: user.id,
  email: user.email,
  dateOfBirth: user.DateofBirth,
  gender: user.Gender,           
  role: user.role,
  phone: user.phone,
      ...(assignment || {})   
    };

    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: payload,
    };
  } catch (error) {
    throw new UnauthorizedException(error.message || 'Authentication failed');
  }
}

async logout(token: string) {
    await db.insert(revoked_tokens).values({ token });
    return { message: '✅ Logout successful' };
  }
 async isRevoked(token: string) {
    const result = await db
      .select()
      .from(revoked_tokens)
      .where(eq(revoked_tokens.token, token));

    return result.length > 0;
  }

}
