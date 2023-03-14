import React from 'react';
import {observer} from 'mobx-react-lite';
import {Box} from '../component/Box';
import {DashboardButton} from '../component/Dashboard/DashboardButton';
import {Route, StackParamList} from '../navigation/AppNavigator';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeHeader} from '../component/HomeHeader/HomeHeader';
import {Screen, StatusBarType} from '../component/Screen';

export const DashboardScreen: React.FC = observer(() => {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  // const {goBack} = useNavigation<StackNavigationProp<StackParamList>>();

  return (
    <Screen statusBarType={StatusBarType.Dark}>
      <Box backgroundColor={'pattensBlue'} flex={1}>
        <HomeHeader label={'IDAT'} isMenu={true} />
        <Box
          flex={1}
          marginHorizontal={'r'}
          marginVertical={'r'}
          justifyContent={'center'}>
          <DashboardButton
            lable={'New Module ID\n' + 'Assignment -->'}
            onPress={() => {
              navigation.navigate(Route.NewModuleAssignment);
            }}
          />
          <DashboardButton
            lable={'Testing of Existing \n' + 'Module -->'}
            onPress={() => {
              navigation.navigate(Route.TestingModule);
            }}
          />
          <DashboardButton
            lable={'Repeat Lock and \n' + 'Unlock -->'}
            onPress={() => {
              navigation.navigate(Route.Dashboard);
            }}
          />
        </Box>
      </Box>
    </Screen>
  );
});
