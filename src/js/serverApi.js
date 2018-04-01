import { serverApi } from './config';
import Http from './Http';

const httpApi = Http(serverApi);

export const fetchStatus = async (key) => {
  const response = await httpApi.get('/status', {
    params: {
      code: key,
    },
  });
  return response.data;
};

export const requestDownload = async (key, email) => {
  const response = await httpApi.get('/request', {
    params: {
      code: key,
      email,
    },
  });
  return response.data;
};
