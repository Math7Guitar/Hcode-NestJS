import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UsrService } from 'src/usr/usr.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    // Circular dependency solution1: @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    // @Inject(forwardRef(() => AuthService))
    private readonly usrService: UsrService,
  ) {}

  async canActivate(context: ExecutionContext) {
    // V1
    // const req = context.switchToHttp().getRequest();

    // const { authorization } = req.headers;

    // try {
    // console.log(authorization);
    // const data = this.authService.checkToken(
    // (authorization ?? '').split(' ')[1],
    // );
    // req.tokenPayload = data;
    // return true;
    // } catch (err) {
    // return false;
    // }
    const req = context.switchToHttp().getRequest();

    const { authorization } = req.headers;

    try {
      // console.log(authorization);
      const data = this.authService.checkToken(
        (authorization ?? '').split(' ')[1],
      );
      req.tokenPayload = data;
      req.user = await this.usrService.findOne(data.sub);
      return true;
    } catch (err) {
      return false;
    }
  }
}
