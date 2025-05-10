import { UserRow } from './types';

export const mockUsers: UserRow[] = [
  {
    username: 'jdoe',
    email: 'jdoe@example.com',
    createdAt: '01.01.2023',
    lastLogin: '03.05.2025',
    status: 'active',
  },
  {
    username: 'asmith',
    email: 'asmith@example.com',
    createdAt: '15.02.2022',
    lastLogin: '01.04.2025',
    status: 'blocked',
  },
  {
    username: 'mbrown',
    email: 'mbrown@example.com',
    createdAt: '10.03.2024',
    lastLogin: '08.05.2025',
    status: 'active',
  },
  {
    username: 'lwhite',
    email: 'lwhite@example.com',
    createdAt: '05.05.2023',
    lastLogin: '05.05.2025',
    status: 'active',
  },
  {
    username: 'tgreen',
    email: 'tgreen@example.com',
    createdAt: '20.06.2023',
    lastLogin: '09.05.2025',
    status: 'deleted',
  },
  {
    username: 'nblack',
    email: 'nblack@example.com',
    createdAt: '12.12.2022',
    lastLogin: '07.05.2025',
    status: 'active',
  },
];
