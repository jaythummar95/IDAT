import React, {useRef} from 'react';
import {Screen, StatusBarType} from '../../component/Screen';
import {Box} from '../../component/Box';
import {HomeHeader} from '../../component/HomeHeader/HomeHeader';
import {goBack} from '../../navigation/AppNavigator';
import {EnterOrScanBMU} from '../../component/NewModuleAssignment/EnterOrScanBMU';
import {Text} from '../../component/Text';
import {fonts} from '../../style/Fonts';
import {Button} from '../../component/Button';
import {observer} from 'mobx-react-lite';
import {TestingModuleController} from './TestingModuleController';
import {TestingProcessFirmware} from '../../component/TestingModule/TestingProcessFirmware';

export const TestingModuleScreen: React.FC = observer(() => {
  const controller = useRef(new TestingModuleController()).current;

  const renderBMUCard = () => {
    return (
      <EnterOrScanBMU
        firmwareVersion={
          controller.isBLEModule() ? controller.bleModule.firmwareVersion : ''
        }
        bmuId={controller.bmuId}
        setBMUId={bmuIdResponse => {
          controller.bmuId = bmuIdResponse;
          controller.fetchBBLEModule();
        }}
        hideInputAreas={controller.isBMUIdSubmitted}
      />
    );
  };

  const renderModuleAlreadyExists = () => {
    if (!controller.isBMuFetched) {
      return null;
    }
    if (controller.isBLEModule()) {
      return null;
    }
    return (
      <Box
        elevation={4}
        marginTop={'r'}
        shadowColor={'gray'}
        shadowOffset={{width: 0, height: 1}}
        shadowOpacity={0.3}
        shadowRadius={2}
        marginHorizontal={'r'}
        paddingVertical={'r'}
        paddingHorizontal={'r'}
        backgroundColor={'white'}
        borderRadius={10}>
        <Text color={'black'} fontFamily={fonts.regular} fontSize={16}>
          {'This module dose not exist in the system'}
        </Text>
        <Box marginTop={'r'}>
          <Button
            label={'Okay, Got It ->'}
            onPress={() => {
              goBack();
            }}
          />
        </Box>
      </Box>
    );
  };

  const startTestingOfBleModule = () => {
    if (
      !(controller.isBLEModule() && controller.bmuId) ||
      controller.isTestingStart
    ) {
      return null;
    }
    return (
      <Box
        elevation={4}
        marginTop={'r'}
        shadowColor={'gray'}
        shadowOffset={{width: 0, height: 1}}
        shadowOpacity={0.3}
        shadowRadius={2}
        marginHorizontal={'r'}
        paddingVertical={'r'}
        paddingHorizontal={'r'}
        backgroundColor={'white'}
        borderRadius={10}>
        <Text color={'black'} fontFamily={fonts.regular} fontSize={16}>
          {controller.bleModule.isSupportedForCurrentFirmWare()
            ? 'Start testing of BLE Module'
            : `This app will not support firmware version ${controller.bleModule.firmwareVersion}`}
        </Text>
        <Box marginTop={'r'}>
          <Button
            label={'Start'}
            onPress={() => {
              controller.isTestingStart = true;
            }}
          />
        </Box>
      </Box>
    );
  };

  return (
    <Screen statusBarType={StatusBarType.Dark}>
      <Box flex={1} backgroundColor={'pattensBlue'}>
        <HomeHeader
          label={
            controller.isTestingStart
              ? `Testing Process of Firmware ${controller?.bleModule?.firmwareVersion}`
              : 'Testing of BLE Module'
          }
          onBackPress={() => {
            goBack();
          }}
        />
        {renderBMUCard()}
        {renderModuleAlreadyExists()}
        {startTestingOfBleModule()}
        {controller.isTestingStart && (
          <TestingProcessFirmware controller={controller} />
        )}
      </Box>
    </Screen>
  );
});
