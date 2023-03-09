import {Result} from '../core/Result';
import {checkModuleExistsApi} from '../api/CheckModuleExistsApi';

class ModuleFactory {
  async checkModuleAlreadyExistsApi(macAddress: string): Promise<Result<any>> {
    try {
      const response = await checkModuleExistsApi.post({
        token: '',
        macAddress,
      });
      return response;
    } catch (e) {
      return Result.fail('');
    }
  }
}

export const moduleFactory = new ModuleFactory();
