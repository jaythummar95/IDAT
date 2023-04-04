export enum BLETestCaseType {
  UNLOCK_REQUEST_FRAME_FALSE_ATTEMPT = 'unlock_request_false_attempt',
  UNLOCK_REQUEST_FRAME = 'unlock_request_frame',
  KEY_STRING_CHANGE_REQUEST_FRAME = 'key_string_change_request_frame',
  LOCK_BACK_TIME_CHANGE_REQUEST_FRAME = 'lock_back_time_change_request_frame',
  BLOCKED_KEY_IDS_CHANGE_REQUEST = 'blocked_key_ids_change_request_frame',
  MOTOR_RUN_TIME_CHANGE_REQUEST_FRAME = 'motor_run_time_change_request_frame',
  AES_KEY_CHANGE_REQUEST_FRAME = 'aes_key_change_request_frame',
  ACCESS_LOG_INITIATION_FRAME = 'access_log_initiation_frame',
  ACCESS_LOG_REQUEST_FRAME = 'access_log_request_frame',
}

export enum BLETestCaseDeadBolt {
  ON = 1,
  OFF = 0,
}

export enum BLETestCaseOverrideAccess {
  ON = 1,
  OFF = 0,
}

export interface ExpectedResultOtherCasesDto {
  urf_with_old_key_expected_result?: string;
  urf_with_new_key_db_override_expected_result?: string;
  urf_with_key_id_1_db_override_expected_result?: string;
  urf_with_key_id_2_db_override_expected_result?: string;
}

export interface BLETestCaseDto {
  test_name: string;
  expected_result: string;
  test_count: number;
  type: BLETestCaseType;
  deadbolt?: BLETestCaseDeadBolt;
  override_access?: BLETestCaseOverrideAccess;
  result?: string;
  expected_result_other_cases?: ExpectedResultOtherCasesDto;
}
