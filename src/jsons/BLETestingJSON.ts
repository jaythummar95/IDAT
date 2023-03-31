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
];
