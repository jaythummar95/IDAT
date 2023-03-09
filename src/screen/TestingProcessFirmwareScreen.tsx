import React from 'react';
import {observer} from 'mobx-react-lite';
import {Box} from '../component/Box';
import {HomeHeader} from '../component/HomeHeader/HomeHeader';
import {NewModuleLabel} from '../component/NewModuleAssignment/NewModuleLabel';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from '../navigation/AppNavigator';
import {TestingResult} from '../component/Results/TestingResult';
import {Button} from '../component/Button';

export const TestingProcessFirmwareScreen: React.FC = observer(() => {
  const {goBack} = useNavigation<StackNavigationProp<StackParamList>>();

  return (
    <Box backgroundColor={'pattensBlue'} flex={1}>
      <HomeHeader label={'Testing Processing'} onBackPress={goBack} />
      <Box marginVertical={'r'}>
        <NewModuleLabel
          label={'Testing Process of Firmware 1.3'}
          fontSize={20}
        />
        <TestingResult resultLabel={'F0'} resultDeclaration={'Test Passed*'} />
        <NewModuleLabel label={'*If motor did not unlock'} fontSize={15} />
      </Box>
      <Box marginHorizontal={'l'} marginVertical={'l'}>
        <Button label={'Next'} onPress={() => {}} />
      </Box>
    </Box>
  );
});
