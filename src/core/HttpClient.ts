import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';

const injectToken = async (
  config: AxiosRequestConfig,
): Promise<AxiosRequestConfig> => {
  try {
    // console.log('INJECT_TOKEN', config);
    return {...config};
  } catch (error) {
    // @ts-ignore
    throw new Error(error);
  }
};

export const getHttpClient = (baseURL: string): AxiosInstance => {
  const http = axios.create({
    headers: {
      'content-type': 'application/json',
    },
    timeout: 1000 * 30 * 4, // Wait for 30 seconds
    baseURL,
  });
  http.interceptors.request.use(
    config => injectToken(config),
    error => Promise.reject(error),
  );
  http.interceptors.response.use(
    response => response,
    error => {
      console.log(error);
      return error;
    },
  );

  return http;
};
