import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/role/role.decorator';
import { Roles } from 'src/enum/roles.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Array<Roles>>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    console.log({ requiredRoles });

    if (!requiredRoles) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const usr = req.user;

    const rolesFiltered = requiredRoles.filter((role) => role === usr.role);

    return rolesFiltered.length > 0;
  }
}
