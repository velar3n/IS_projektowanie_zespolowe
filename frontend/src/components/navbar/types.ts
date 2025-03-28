import { AuthRoles } from '@/api/types';
import { ReactNode } from 'react';

export type NavbarItemType = {
  path: string;
  key: string;
  icon: ReactNode;
  requiredRole?: AuthRoles;
};
