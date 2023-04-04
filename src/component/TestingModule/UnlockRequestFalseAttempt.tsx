import React, {useState} from 'react';
import {Box} from '../Box';
import {observer} from 'mobx-react-lite';
import {TestingModuleController} from '../../screen/TestingModule/TestingModuleController';
import {Text} from '../Text';
import {IDATCard} from '../IDATCard';
import {fonts} from '../../style/Fonts';
import {Button} from '../Button';
import {
  BLETestCaseDeadBolt,
  BLETestCaseType,
} from '../../api/DTOs/BLETestCaseDto';
import {ScrollView} from 'react-native';

export interface UnlockRequestFalseAttemptProps {
  controller: TestingModuleController;
}
export const UnlockRequestFalseAttempt: React.FC<UnlockRequestFalseAttemptProps> =
  observer(({controller}: UnlockRequestFalseAttemptProps) => {
    const bleTetCaseItem = controller.getBLETestCaseCrntItem();
    const isResult = !!bleTetCaseItem.result;
    const showDedBoltAndOverrideAccess =
      bleTetCaseItem.typeTestCase === BLETestCaseType.UNLOCK_REQUEST_FRAME;

    const [didIt, setDidIt] = useState(false);

    const getTestResultStatus = (): string => {
      return bleTetCaseItem.expectedResult === bleTetCaseItem.result
        ? 'Test Pass'
        : 'Test Failed';
    };

    const getDeadBoltPositionMsgStatus = () => {
      switch (bleTetCaseItem.deadBolt) {
        case BLETestCaseDeadBolt.ON:
          return 'ON (Bolted)';
        case BLETestCaseDeadBolt.OFF:
          return 'OFF (Unbolted)';
      }
    };

    const sendRequestFrame = () => {
      //TODO:: Fetch NVM
      //TODO:: Prepare frame
      //TODO:: Connect device
      //TODO:: Enable toggle
      //TODO:: Perform all logic or sending request frame
      //TODO:: Update the result
      controller.updateResultInTestCaseList(bleTetCaseItem.expectedResult);
      setDidIt(false);
      //TODO:: Disconnect
    };

    return (
      <Box flex={1}>
        <IDATCard>
          <Box alignItems={'center'}>
            <Text color={'black'} fontFamily={fonts.bold} fontSize={12}>
              {`Test ${controller.getCurrentTestCount()}/${controller.getTotalTestCount()} - ${
                bleTetCaseItem.testName
              }`}
            </Text>
          </Box>
        </IDATCard>
        <Box flex={1}>
          <ScrollView contentContainerStyle={{paddingBottom: 16}}>
            {showDedBoltAndOverrideAccess && (
              <IDATCard>
                <Box width={'100%'}>
                  <Text
                    color={'black'}
                    fontFamily={fonts.regular}
                    fontSize={16}>
                    {'Set deadbolt Position :'}{' '}
                    <Text color={'black'} fontFamily={fonts.bold}>
                      {getDeadBoltPositionMsgStatus()}
                    </Text>
                  </Text>
                  <Box marginTop={'r'}>
                    <Button
                      label={'Yes, I did it'}
                      onPress={() => setDidIt(true)}
                    />
                  </Box>
                </Box>
              </IDATCard>
            )}

            {((showDedBoltAndOverrideAccess && didIt) ||
              !showDedBoltAndOverrideAccess) && (
              <Box marginHorizontal={'r'} marginTop={'r'}>
                <Button
                  label={`${isResult ? 'Resend' : 'Send'} Unlock Request Frame`}
                  onPress={() => sendRequestFrame()}
                />
              </Box>
            )}

            {isResult && (
              <Box>
                <IDATCard>
                  <Box alignItems={'center'}>
                    <Text
                      color={'black'}
                      fontFamily={fonts.regular}
                      fontSize={16}>
                      {'Received Response Result :'}
                    </Text>
                    <Text
                      color={'black'}
                      fontFamily={fonts.bold}
                      fontSize={24}
                      marginTop={'s'}>
                      {bleTetCaseItem.result}
                    </Text>
                  </Box>
                </IDATCard>
                <IDATCard>
                  <Box alignItems={'center'}>
                    <Text
                      color={'black'}
                      fontFamily={fonts.regular}
                      fontSize={16}>
                      {'Test Result :'}
                    </Text>
                    <Text
                      color={'green'}
                      fontFamily={fonts.semiBold}
                      fontSize={24}
                      marginTop={'s'}>
                      {getTestResultStatus()}
                    </Text>
                  </Box>
                </IDATCard>
                <Box marginHorizontal={'r'} marginVertical={'r'}>
                  <Button
                    label={'Next'}
                    onPress={() => controller.goToNextTestCase()}
                  />
                </Box>
              </Box>
            )}
          </ScrollView>
        </Box>
      </Box>
    );
  });
