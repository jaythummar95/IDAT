import {Result} from '../core/Result';
import {checkModuleExistsApi} from '../api/CheckModuleExistsApi';
import {getBLEModuleApi} from '../api/Interfaces/GetBLEModule';
import {BLEModule} from '../model/BLEModule';

class ModuleFactory {
  async checkModuleAlreadyExistsApi(macAddress: string): Promise<Result<any>> {
    try {
      const response = await checkModuleExistsApi.post({
        token: '',
        macAddress, //TODO:: This can be BMU Id also
      });
      return response;
    } catch (e) {
      return Result.fail('');
    }
  }

  async getBLEModule(bmuId: string): Promise<Result<BLEModule>> {
    try {
      const response = await getBLEModuleApi.post({
        token: '',
        bmuId,
      });
      return Result.ok(new BLEModule({firmware_version: '1.0'}));
    } catch (e) {
      return Result.fail('');
    }
  }
}

export const moduleFactory = new ModuleFactory();
