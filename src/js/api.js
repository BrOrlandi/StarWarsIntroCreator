import axios from 'axios';
import { firebases, defaultFirebase } from './config';


export const _parseFirebasekey = (key) => {
  const result = {
    baseURL: defaultFirebase,
  };

  // is creating a new opening
  if (!key) {
    return result;
  }

  const { initial, ...alternatives } = firebases;

  const prefix = key[0];
  const alternativeDb = alternatives[prefix];

  result.baseURL = alternativeDb || initial;
  result.key = alternativeDb ? key.substr(1) : key;

  return result;
};

export const _getHttp = (baseURL) => {
  const http = axios.create({
    baseURL,
    timeout: 3000,
  });

  const successInterceptor = res => res.data;
  const errorInterceptor = (error) => {
    Raven.captureException(error);
    return Promise.reject(error);
  };

  http.interceptors.response.use(successInterceptor, errorInterceptor);

  return http;
};

export const _parseSpecialKeys = (key) => {
  switch (key) {
    case 'Episode7':
      return 'AKcKeYMPogupSU_r1I_g';
    case 'Episode8':
      return 'AL6yNfOxCGkHKBUi54xp';
    // TODO other eps
    default:
      return key;
  }
};

export const _generateUrlWithKey = (key) => {
  const openingPrefix = '/openings/';
  return `${openingPrefix}-${key}.json`;
};

export const loadKey = async (initialKey) => {
  const rawkey = _parseSpecialKeys(initialKey);
  const { baseURL, key } = _parseFirebasekey(rawkey);
  const http = _getHttp(baseURL);

  const url = _generateUrlWithKey(key);
  const opening = await http.get(url);
  if (!opening) {
    const error = new Error(`Opening not found: ${initialKey}`);
    Raven.captureException(error);
  }
  return opening;
};

