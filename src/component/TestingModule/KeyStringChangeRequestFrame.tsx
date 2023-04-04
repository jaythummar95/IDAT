import React from 'react';
import {Box} from '../Box';
import {TestingModuleController} from '../../screen/TestingModule/TestingModuleController';
import {observer} from 'mobx-react-lite';
import {IDATCard} from '../IDATCard';
import {Text} from '../Text';
import {fonts} from '../../style/Fonts';
import {ScrollView} from 'react-native';
import {Button} from '../Button';

export interface KeyStringChangeRequestFrameProps {
  controller: TestingModuleController;
}

export const KeyStringChangeRequestFrame: React.FC<KeyStringChangeRequestFrameProps> =
  observer(({controller}: KeyStringChangeRequestFrameProps) => {
    const bleTetCaseItem = controller.getBLETestCaseCrntItem();

    const sendKeyStringChangeRequestFrame = () => {};

    const sendUnlockRequestFrameWithOldKey = () => {};

    const sendUnlockRequestFrameWithNewKeyStringAndDeadboltOverrideAccess =
      () => {};

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
            <Box marginHorizontal={'r'} marginTop={'r'}>
              <Button
                label={'Send Key String Change Request Frame'}
                onPress={() => sendKeyStringChangeRequestFrame()}
              />
            </Box>

            <IDATCard>
              <Box alignItems={'center'}>
                <Text color={'black'} fontFamily={fonts.regular} fontSize={16}>
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

            <Box marginHorizontal={'r'} marginTop={'r'}>
              <Button
                label={'Unlock Request Frame with Old Key String'}
                onPress={() => sendUnlockRequestFrameWithOldKey()}
              />
            </Box>

            <IDATCard>
              <Box alignItems={'center'}>
                <Text color={'black'} fontFamily={fonts.regular} fontSize={16}>
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

            <Box marginHorizontal={'r'} marginTop={'r'}>
              <Button
                label={
                  'Unlock Request Frame with New KeyString and Deadbolt Override Access'
                }
                onPress={() =>
                  sendUnlockRequestFrameWithNewKeyStringAndDeadboltOverrideAccess()
                }
              />
            </Box>

            <IDATCard>
              <Box alignItems={'center'}>
                <Text color={'black'} fontFamily={fonts.regular} fontSize={16}>
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
            <Box marginHorizontal={'r'} marginVertical={'r'}>
              <Button
                label={'Next'}
                onPress={() => controller.goToNextTestCase()}
              />
            </Box>
          </ScrollView>
        </Box>
      </Box>
    );
  });
