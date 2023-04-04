import {Model} from './core/model';
import {ExpectedResultOtherCasesDto} from '../api/DTOs/BLETestCaseDto';

export class ExpectedResultOtherCases extends Model<ExpectedResultOtherCasesDto> {
  constructor(dto: ExpectedResultOtherCasesDto) {
    super(dto);
  }

  get urfWithOldKeyExpectedResult(): string {
    return this.dto?.urf_with_old_key_expected_result ?? '';
  }

  get urfWithNewKeyDbOverrideExpectedResult(): string {
    return this.dto?.urf_with_new_key_db_override_expected_result ?? '';
  }

  get urfWithKeyId1DbOverrideExpectedResult(): string {
    return this.dto?.urf_with_key_id_1_db_override_expected_result ?? '';
  }

  get urfWithKeyId2DbOverrideExpectedResult(): string {
    return this.dto?.urf_with_key_id_2_db_override_expected_result ?? '';
  }
}
