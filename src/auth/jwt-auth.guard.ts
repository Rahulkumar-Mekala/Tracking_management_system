import { ExecutionContext,Injectable,UnauthorizedException,} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';  

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {



  // async canActivate(context: ExecutionContext) {
  //   // const canActivate = (await super.canActivate(context)) as boolean;
  //   // if (!canActivate) return false;

  //   // const request = context.switchToHttp().getRequest();
  //   // const authHeader = request.headers['authorization'];
  //   // if (!authHeader) throw new UnauthorizedException();

  //   // const token = authHeader.split(' ')[1];

 
  //   // const revoked = await this.authService.isRevoked(token);
  //   // if (revoked) {
  //   //   throw new UnauthorizedException('Token has been revoked (logout)');
  //   // }

  //   // return true;
  // }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      throw err || new UnauthorizedException('Invalid or missing token');
    }
    console.log('Authenticated user:', user);
    return user;
  }
}
