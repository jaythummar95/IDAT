import React, {useState} from 'react';
import {Screen, StatusBarType} from '../component/Screen';
import {Box} from '../component/Box';
import {HomeHeader} from '../component/HomeHeader/HomeHeader';
import {goBack, navigate, Route} from '../navigation/AppNavigator';
import {EnterOrScanBMU} from '../component/NewModuleAssignment/EnterOrScanBMU';
import {Text} from '../component/Text';
import {fonts} from '../style/Fonts';
import {Button} from '../component/Button';
import {moduleFactory} from '../factory/ModuleFactory';

export const TestingModuleScreen: React.FC = () => {
  const [bmuId, setBMUId] = useState('');
  const [isModuleExist, setIsModuleExist] = useState(true);

  const checkIsModuleAlreadyExists = (id: string) => {
    moduleFactory.checkModuleAlreadyExistsApi(id).then(res => {
      setIsModuleExist(true);
      setBMUId(id);
    });
  };

  const renderBMUCard = () => {
    return (
      <EnterOrScanBMU
        firmwareVersion={'1.3'}
        bmuId={bmuId}
        setBMUId={bmuIdResponse => checkIsModuleAlreadyExists(bmuIdResponse)}
      />
    );
  };

  const renderModuleAlreadyExists = () => {
    if (isModuleExist) {
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
    if (!(isModuleExist && bmuId)) {
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
          {'Start testing of BLE Module'}
        </Text>
        <Box marginTop={'r'}>
          <Button
            label={'Start'}
            onPress={() => {
              navigate({
                screenName: Route.TestingProcess,
              });
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
          label={'New Modules ID Assignment'}
          onBackPress={() => {
            goBack();
          }}
        />
        {renderBMUCard()}
        {renderModuleAlreadyExists()}
        {startTestingOfBleModule()}
      </Box>
    </Screen>
  );
};
