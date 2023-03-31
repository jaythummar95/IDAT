export enum BLETestCaseType {
  UNLOCK_REQUEST_FRAME_FALSE_ATTEMPT = 'unlock_request_false_attempt',
  UNLOCK_REQUEST_FRAME = 'unlock_request_frame',
}

export enum BLETestCaseDeadBolt {
  ON = 1,
  OFF = 0,
}

export enum BLETestCaseOverrideAccess {
  ON = 1,
  OFF = 0,
}

export interface BLETestCaseDto {
  test_name: string;
  expected_result: string;
  test_count: number;
  type: BLETestCaseType;
  deadbolt?: BLETestCaseDeadBolt;
  override_access?: BLETestCaseOverrideAccess;
  result?: string;
}
