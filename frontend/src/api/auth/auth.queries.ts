import { User } from '@/stores/user/types';
import { AuthRolesResponse, UserInfoResponse } from '../types';
// import axios from 'axios';
// import backendUrl from '../backendUrl';

const MOCKED_USER_INFO_RESPONSE: UserInfoResponse = {
  username: 'random_dude',
  email: 'example@email.com',
  status: 'active',
  created_at: '2024-03-28T14:30:00',
  last_login: '2024-03-28T14:30:00',
};

const MOCKED_ROLES_RESPONSE: AuthRolesResponse = {
  roles: ['admin'],
};

const fetchUserInfo = (): Promise<UserInfoResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCKED_USER_INFO_RESPONSE), 2000);
  });
};

const fetchUserRoles = (): Promise<AuthRolesResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCKED_ROLES_RESPONSE), 1000);
  });
};

const getSessionData = async () => {
  // const userDataEndpoint = `${backendUrl}/user_info`;
  // const userAuthRolesEndpoint = `${backendUrl}/getAuthRoles`;

  // const fetchUserDataPromise = axios.get(userDataEndpoint);
  // const fetchUserRolesPromise = axios.get(userAuthRolesEndpoint);

  const fetchUserDataPromise = fetchUserInfo();
  const fetchUserRolesPromise = fetchUserRoles();

  const [userInfo, userRoles] = await Promise.all([
    fetchUserDataPromise,
    fetchUserRolesPromise,
  ]);
  const appUser: User = {
    ...userInfo,
    ...userRoles,
  };

  return appUser;
};

export const AUTH_QUERIES = {
  getSessionData,
};
