import React, {useState} from 'react';
import {TestingModuleController} from '../../screen/TestingModule/TestingModuleController';
import {Box} from '../Box';
import {observer} from 'mobx-react-lite';
import {IDATCard} from '../IDATCard';
import {Text} from '../Text';
import {fonts} from '../../style/Fonts';
import {ScrollView} from 'react-native';
import {Button} from '../Button';
import {Pressable} from '../Pressable';
import {Image} from '../Image';
import {Images} from '../../assets';

export interface LockBackTimeChangeRequestFrameProps {
  controller: TestingModuleController;
}

export const LockBackTimeChangeRequestFrame: React.FC<LockBackTimeChangeRequestFrameProps> =
  observer(({controller}: LockBackTimeChangeRequestFrameProps) => {
    const bleTetCaseItem = controller.getBLETestCaseCrntItem();
    const [newLockBackSeconds, setNewLockBackSeconds] = useState<number>(1);

    const sendLockBackTimeChangeRequestFrame = () => {};
    const unlockRequestFrameWithDBOverrideAccess = () => {};
    const setLookedLike2Second = (flag: boolean) => {};
    const setNewLockBackTime = () => {};
    const increaseNewLockBackSeconds = () => {
      setNewLockBackSeconds(newLockBackSeconds + 1);
    };
    const decreaseNewLockBackSeconds = () => {
      if (newLockBackSeconds > 1) {
        setNewLockBackSeconds(newLockBackSeconds - 1);
      }
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
            <Box marginHorizontal={'r'} marginTop={'r'}>
              <Button
                label={
                  'Send Lock Back Time Change Request Frame with LockBackTime set to 2 Seconds'
                }
                onPress={() => sendLockBackTimeChangeRequestFrame()}
              />
            </Box>
            <IDATCard>
              <Box alignItems={'center'}>
                <Text color={'black'} fontFamily={fonts.regular} fontSize={16}>
                  {'Received Response with new Lock Back Time?'}
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
                label={'Unlock Request Frame with Deadbolt Override Access'}
                onPress={() => unlockRequestFrameWithDBOverrideAccess()}
              />
            </Box>
            <IDATCard>
              <Box alignItems={'center'}>
                <Text color={'black'} fontFamily={fonts.regular} fontSize={16}>
                  {'Received Response for Unlock?'}
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
                <Text color={'black'} fontFamily={fonts.regular} fontSize={16}>
                  {'Received Response for Lock Back?'}
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
                <Text color={'black'} fontFamily={fonts.regular} fontSize={16}>
                  {'Looked Like 2 seconds?'}
                </Text>
                <Box flex={1} flexDirection={'row'} marginTop={'r'}>
                  <Box flex={0.5} marginEnd={'s'}>
                    <Button
                      label={'NO'}
                      onPress={() => setLookedLike2Second(false)}
                    />
                  </Box>
                  <Box flex={0.5} marginStart={'s'}>
                    <Button
                      label={'YES'}
                      onPress={() => setLookedLike2Second(true)}
                    />
                  </Box>
                </Box>
              </Box>
            </IDATCard>

            <IDATCard>
              <Box>
                <Box
                  alignSelf={'center'}
                  marginBottom={'s'}
                  flexDirection={'row'}>
                  <Pressable
                    onPress={decreaseNewLockBackSeconds}
                    marginLeft={'r'}>
                    <Image source={Images.minus} width={20} height={20} />
                  </Pressable>
                  <Box minWidth={80} alignItems={'center'}>
                    <Text
                      color={'black'}
                      fontFamily={fonts.regular}
                      fontSize={16}>
                      {`${newLockBackSeconds} Sec`}
                    </Text>
                  </Box>
                  <Pressable
                    marginEnd={'r'}
                    onPress={increaseNewLockBackSeconds}>
                    <Image source={Images.plus} width={20} height={20} />
                  </Pressable>
                </Box>
                <Button
                  label={'Set New Lock Back Time'}
                  onPress={() => setNewLockBackTime()}
                />
              </Box>
            </IDATCard>

            <IDATCard>
              <Box alignItems={'center'}>
                <Text color={'black'} fontFamily={fonts.regular} fontSize={16}>
                  {`Received Response for Lock Back Time? ${newLockBackSeconds} seconds`}
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
