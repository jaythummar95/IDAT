import React from 'react';
import {observer} from 'mobx-react-lite';
import {Box} from '../Box';
import {TestingModuleController} from '../../screen/TestingModule/TestingModuleController';
import {BLETestCaseType} from '../../api/DTOs/BLETestCaseDto';
import {UnlockRequestFalseAttempt} from './UnlockRequestFalseAttempt';
import {KeyStringChangeRequestFrame} from './KeyStringChangeRequestFrame';
import {LockBackTimeChangeRequestFrame} from './LockBackTimeChangeRequestFrame';

export interface TestingProcessFirmwareProps {
  controller: TestingModuleController;
}

export const TestingProcessFirmware: React.FC<TestingProcessFirmwareProps> =
  observer(({controller}: TestingProcessFirmwareProps) => {
    const bleTetCaseItem = controller.getBLETestCaseCrntItem();

    const content = () => {
      switch (bleTetCaseItem.typeTestCase) {
        case BLETestCaseType.UNLOCK_REQUEST_FRAME:
          return <UnlockRequestFalseAttempt controller={controller} />;
        case BLETestCaseType.UNLOCK_REQUEST_FRAME_FALSE_ATTEMPT:
          return <UnlockRequestFalseAttempt controller={controller} />;
        case BLETestCaseType.KEY_STRING_CHANGE_REQUEST_FRAME:
          return <KeyStringChangeRequestFrame controller={controller} />;
        case BLETestCaseType.LOCK_BACK_TIME_CHANGE_REQUEST_FRAME:
          return <LockBackTimeChangeRequestFrame controller={controller} />;
      }
    };

    return <Box flex={1}>{content()}</Box>;
  });
