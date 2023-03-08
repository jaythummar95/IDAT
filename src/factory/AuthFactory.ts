import {Result} from '../core/Result';
import {loginApi} from '../api/Login';

class AuthFactory {
  async loginApi(authCode: string): Promise<Result<any>> {
    try {
      const response = loginApi.post({auth_code: authCode});
      return response;
    } catch (e) {
      return Result.fail('');
    }
  }
}

export const authFactory = new AuthFactory();
