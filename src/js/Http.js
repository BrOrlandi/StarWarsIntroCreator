import axios from 'axios';
import Counter from './Counter';

const REQUEST_TIMEOUT = 10000;
const MAX_TRIES = 3;

const Tries = new Counter(MAX_TRIES);

const _successInterceptor = res => res;

const _sendRavenNotification = (errorData) => {
  Raven.captureException(new Error(JSON.stringify(errorData)));
};

const _retryLastRequest = ({ config }, resolve) => {
  const options = {
    method: config.method,
    url: config.url,
    data: config.data ? JSON.parse(config.data) : null,
  };

  return Http().request(options)
    .then((response) => {
      Tries.reset();
      resolve(response);
    });
};

const _errorInterceptor = (error) => {
  const errorData = error.response;
  if (!errorData) {
    Raven.captureBreadcrumb({
      message: `Unknow error on request, probably timeout error. Error code: ${error.code}`,
      level: 'error',
    });
    _sendRavenNotification(error);
    return Promise.reject(error);
  }

  return new Promise((resolve, reject) => {
    if (Tries.isMaxValue()) {
      Tries.reset();
      reject(error);
      _sendRavenNotification(errorData);
      return;
    }

    Tries.increment();
    _retryLastRequest(errorData, resolve);
  });
};

function Http(baseURL) {
  const http = axios.create({
    baseURL,
    timeout: REQUEST_TIMEOUT,
  });
  http.interceptors.response.use(_successInterceptor, _errorInterceptor);

  return http;
}

export default Http;
