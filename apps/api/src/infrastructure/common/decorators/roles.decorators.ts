import { SetMetadata } from '@nestjs/common';

export const Roles = (roles: any) => {
  return SetMetadata('roles', roles);
};
