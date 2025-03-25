import { User } from '@/stores/user/types';

const MOCKED_RESPONSE = {
  name: 'Random Dude',
  email: 'example@email.com',
  status: 'active',
};
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCKED_RESPONSE), 2000);
  });
};

const getSessionData = async () => {
  const data: User = (await fetchData()) as User;
  return data;
};

export const AUTH_QUERIES = {
  getSessionData,
};
