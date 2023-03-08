import {LOGIN} from './EndPoint';
import {http} from '../core/Http';
import {HttpPost} from './Interfaces/HttpPost';
import {Result} from '../core/Result';

export interface LoginApiParams {
  auth_code: string;
}

class LoginApi implements HttpPost<string> {
  post = async (params: LoginApiParams): Promise<Result<string>> =>
    http.post(LOGIN(), params);
}

export const loginApi = new LoginApi();
