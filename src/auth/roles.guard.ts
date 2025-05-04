import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requieraRoles = this.reflector.getAllAndMerge<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requieraRoles || requieraRoles.length === 0) return true; // Si no se requieren roles, permite el acceso

    const { user } = context.switchToHttp().getRequest();
    if (!user || !requieraRoles.includes(user.rol)) {
      throw new ForbiddenException('No Tienes permiso para acceder'); // Si no hay usuario o rol, deniega el acceso
    }
    return true;
  }
}
