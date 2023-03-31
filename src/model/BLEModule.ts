import {Model} from './core/model';
import {BLEModuleDto} from '../api/DTOs/BLEModuleDto';
import {FIRMWARE_VERSION_FOR_THE_APP} from '../core/Consts';

export class BLEModule extends Model<BLEModuleDto> {
  constructor(dto: BLEModuleDto) {
    super(dto);
  }

  get firmwareVersion(): string {
    return this.dto?.firmware_version ?? '';
  }

  isSupportedForCurrentFirmWare(): boolean {
    return this.firmwareVersion === FIRMWARE_VERSION_FOR_THE_APP;
  }
}
