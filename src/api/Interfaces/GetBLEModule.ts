import {HttpPost} from './HttpPost';
import {Result} from '../../core/Result';
import {CHECK_MODULE_ALREADY_EXISTS} from '../EndPoint';
import {http} from '../../core/Http';

export interface GetBLEModuleParams {
  token: string;
  bmuId: string;
}

class GetBLEModuleApi implements HttpPost<string> {
  post = async (params: GetBLEModuleParams): Promise<Result<string>> =>
    http.post(CHECK_MODULE_ALREADY_EXISTS(), params);
}

export const getBLEModuleApi = new GetBLEModuleApi();
