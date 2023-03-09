import {CHECK_MODULE_ALREADY_EXISTS} from './EndPoint';
import {http} from '../core/Http';
import {HttpPost} from './Interfaces/HttpPost';
import {Result} from '../core/Result';

export interface CheckModuleExistsApiParams {
  token: string;
  macAddress: string;
}

class CheckModuleExistsApi implements HttpPost<string> {
  post = async (params: CheckModuleExistsApiParams): Promise<Result<string>> =>
    http.post(CHECK_MODULE_ALREADY_EXISTS(), params);
}

export const checkModuleExistsApi = new CheckModuleExistsApi();
