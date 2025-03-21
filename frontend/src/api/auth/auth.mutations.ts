import backendUrl from '../backendUrl';

// TODO add zustand for storing session data and use sth else than native fetch api
const login = async (login: string, password: string) => {
  const endpoint = `${backendUrl}/login`;

  const rawResponse = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: login, password }),
  });

  const res = await rawResponse.json();
  return res;
};

const AUTH_MUTATIONS = {
  login,
};

export default AUTH_MUTATIONS;
