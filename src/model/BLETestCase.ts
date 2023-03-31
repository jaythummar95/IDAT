import {
  BLETestCaseDeadBolt,
  BLETestCaseDto,
  BLETestCaseOverrideAccess,
  BLETestCaseType,
} from '../api/DTOs/BLETestCaseDto';
import {Entity} from './core/entity';

export class BLETestCase extends Entity<BLETestCaseDto> {
  constructor(bleTestCaseDto: BLETestCaseDto) {
    super(bleTestCaseDto, 'test_count');
  }

  get testName(): string {
    return this.dto.test_name ?? '';
  }
  get expectedResult(): string {
    return this.dto.expected_result ?? '';
  }
  get testCount(): number {
    return this.dto.test_count ?? '';
  }
  get typeTestCase(): BLETestCaseType {
    return this.dto.type;
  }
  get deadBolt(): BLETestCaseDeadBolt {
    return this.dto.deadbolt as BLETestCaseDeadBolt;
  }
  get overrideAccess(): BLETestCaseOverrideAccess {
    return this.dto.override_access as BLETestCaseOverrideAccess;
  }
  get result(): string {
    return this.dto.result ?? '';
  }
}
