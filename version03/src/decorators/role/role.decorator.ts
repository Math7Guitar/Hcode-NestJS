import { SetMetadata } from '@nestjs/common';
import { Roles } from '../../enum/roles.enum';

export const ROLES_KEY = 'role';
export const Role = (...role: Roles[]) => SetMetadata(ROLES_KEY, role);
