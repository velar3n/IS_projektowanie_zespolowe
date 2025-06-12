import axios from 'axios';
import backendUrl from '../backendUrl';

export type ChangePasswordData = {
  currentPassword: string;
  newPassword: string;
};

const changePassword = async (data: ChangePasswordData) => {
  const endpoint = `${backendUrl}/user/change-password`;
  await axios.post(endpoint, data, {
    withCredentials: true,
  });
};

const USER_MUTATIONS = {
  changePassword,
};

export default USER_MUTATIONS;
