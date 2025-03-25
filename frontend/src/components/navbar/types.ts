import { UserRole } from '@/stores/user/types';
import { ReactNode } from 'react';

export type NavbarItemType = {
  path: string;
  key: string;
  icon: ReactNode;
  requiredRole?: UserRole;
};
