export const BLETestingJSON = [
  {
    test_name: 'Unlock Request Frame False Attempt F0',
    expected_result: 'F0',
    test_count: 1,
    type: 'unlock_request_false_attempt',
  },
  {
    test_name: 'Unlock Request Frame False Attempt F1',
    expected_result: 'F1',
    test_count: 2,
    type: 'unlock_request_false_attempt',
  },
  {
    test_name: 'Unlock Request Frame False Attempt F2',
    expected_result: 'F2',
    test_count: 3,
    type: 'unlock_request_false_attempt',
  },
  {
    test_name: 'Unlock Request Frame False Attempt F3',
    expected_result: 'F3',
    test_count: 4,
    type: 'unlock_request_false_attempt',
  },
  {
    test_name: 'Unlock Request Frame False Attempt F4',
    expected_result: 'F4',
    test_count: 5,
    type: 'unlock_request_false_attempt',
  },
  {
    test_name: 'Unlock Request Frame False Attempt F5',
    expected_result: 'F5',
    test_count: 6,
    type: 'unlock_request_false_attempt',
  },
  {
    test_name: 'Unlock Request Frame Test',
    expected_result: 'A0',
    test_count: 7,
    type: 'unlock_request_frame',
    deadbolt: 0, //Off deadbolt position off
    override_access: 0, //No override access
  },
  {
    test_name: 'Unlock Request Frame Test',
    expected_result: 'A1',
    test_count: 8,
    type: 'unlock_request_frame',
    deadbolt: 0, //Off deadbolt position off
    override_access: 1, //Yes override access
  },
  {
    test_name: 'Unlock Request Frame Test',
    expected_result: 'F5',
    test_count: 9,
    type: 'unlock_request_frame',
    deadbolt: 1, //On deadbolt position ON
    override_access: 0, //No override access
  },
  {
    test_name: 'Unlock Request Frame Test',
    expected_result: 'A1',
    test_count: 10,
    type: 'unlock_request_frame',
    deadbolt: 1, //On deadbolt position ON
    override_access: 1, //No override access
  },
  {
    test_name: 'Key String Change Request Frame',
    expected_result: '',
    expected_result_other_cases: {
      urf_with_old_key_expected_result: 'F1',
      urf_with_new_key_db_override_expected_result: 'A1',
    },
    test_count: 11,
    type: 'key_string_change_request_frame',
  },
  {
    test_name: 'Lock Back Time Change Request Frame',
    expected_result: 'A1',
    test_count: 12,
    type: 'lock_back_time_change_request_frame',
  },
  {
    test_name: 'Blocked Key IDs Change Request Frame',
    expected_result: '',
    expected_result_other_cases: {
      urf_with_key_id_1_db_override_expected_result: 'F3',
      urf_with_key_id_2_db_override_expected_result: 'F4',
    },
    test_count: 13,
    type: 'blocked_key_ids_change_request_frame',
  },
  {
    test_name: 'Motor Run Time Change Request Frame',
    expected_result: '',
    expected_result_other_cases: {
      urf_with_db_override_expected_result: 'A1',
      urf_with_key_id_2_db_override_expected_result: 'A1',
    },
    test_count: 14,
    type: 'motor_run_time_change_request_frame',
  },
  {
    test_name: 'AES Key Change Request Frame',
    expected_result: '',
    test_count: 15,
    type: 'aes_key_change_request_frame',
  },
  {
    test_name: 'Access Log Initiation Frame',
    expected_result: '',
    test_count: 16,
    type: 'access_log_initiation_frame',
  },
  {
    test_name: 'Access Log Request Frame',
    expected_result: '',
    test_count: 17,
    type: 'access_log_request_frame',
  },
];
