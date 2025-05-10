import { StatusCellConfig } from '@/components/table/components/StatusCell';
import { UserStatus } from './types';

export const statusCellConfig: StatusCellConfig<UserStatus> = {
  active: {
    label: 'Active',
    color: 'green.500',
  },
  blocked: {
    label: 'Blocked',
    color: 'yellow.600',
  },
  deleted: {
    label: 'Deleted',
    color: 'red.600',
  },
};
