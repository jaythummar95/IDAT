export const BASE_URL = 'http://baseurl.com';

export const LOGIN = (): string => `${BASE_URL}/login`;
export const CHECK_MODULE_ALREADY_EXISTS = (): string =>
  `${BASE_URL}/check_module_exists`;
