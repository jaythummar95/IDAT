import React, {useState} from 'react';
import {Box} from '../component/Box';
import {HomeHeader} from '../component/HomeHeader/HomeHeader';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from '../navigation/AppNavigator';
import {PowerOnYourDevice} from '../component/NewModuleAssignment/PowerOnYourDevice';
import {ScanForDevices} from '../component/NewModuleAssignment/ScanForDevices';
import {moduleFactory} from '../factory/ModuleFactory';
import {Device} from 'react-native-ble-plx';
import {ModuleAlreadyExists} from '../component/NewModuleAssignment/ModuleAlreadyExists';
import {AssignNewModule} from '../component/NewModuleAssignment/AssignNewModule';

export const NewModuleAssignmentScreen: React.FC = () => {
  const {goBack} = useNavigation<StackNavigationProp<StackParamList>>();
  const [isDevicePowerOn, setIsDevicePowerOn] = useState(true);
  const [isDeviceScanned, setIsDeviceScanned] = useState(true);
  const [isModuleAlreadyExist, setIsModuleAlreadyExist] = useState(false);

  const checkIsModuleAlreadyExists = (device: Device) => {
    moduleFactory.checkModuleAlreadyExistsApi(device.id).then(res => {
      setIsDeviceScanned(true);
      setIsModuleAlreadyExist(true);
    });
  };

  const renderContent = () => {
    if (!isDevicePowerOn) {
      return (
        <PowerOnYourDevice
          onPowerOnPress={() => {
            setIsDevicePowerOn(true);
          }}
        />
      );
    } else if (!isDeviceScanned) {
      return (
        <ScanForDevices
          onCheckModuleAlreadyExists={device => {
            checkIsModuleAlreadyExists(device);
          }}
        />
      );
    } else if (isModuleAlreadyExist) {
      return (
        <ModuleAlreadyExists
          label={'Module Already Exists in System:'}
          labelModuleDetails={'BLE Module Details:'}
          labelBleMsc={'BLE MAC: '}
          labelBmuId={'BMU-ID: 0A5678'}
          labeBleModule={'BLE Module Type ID: 3'}
          version={'Firmware Version: 1.3'}
          installationDetails={'Installation Details:'}
          roomNo={'Installed At: Room No. 103 or Swimming Pool'}
          hotelName={'Biltmore Mayfair LXR Resorts '}
          hotelAddress={'address'}
          onPressGotIt={() => {
            goBack();
          }}
        />
      );
    } else if (!isModuleAlreadyExist) {
      return <AssignNewModule />;
    }
    return <Box />;
  };

  return (
    <Box flex={1} backgroundColor={'bg_white'}>
      <HomeHeader
        label={'New Modules ID Assignment'}
        onBackPress={() => {
          goBack();
        }}
      />
      {renderContent()}
    </Box>
  );
};
