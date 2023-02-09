import React from 'react';
import {observer} from 'mobx-react-lite';
import {Box} from '../component/Box';
import {Text} from '../component/Text';
import {DashboardButton} from '../component/Dashboard/DashboardButton';
import {Route, StackParamList} from '../navigation/AppNavigator';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export const DashboardScreen: React.FC = observer(() => {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  return (
    <Box backgroundColor={'pattensBlue'} flex={1}>
      <Box
        flex={1}
        marginHorizontal={'r'}
        marginVertical={'r'}
        justifyContent={'center'}>
        <DashboardButton
          lable={'New Module ID\n' + 'Assignment -->'}
          onPress={() => {
            navigation.navigate(Route.IdAssignment);
          }}
        />
        <DashboardButton
          lable={'Testing of Existing \n' + 'Module -->'}
          onPress={() => {
            navigation.navigate(Route.Dashboard);
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
  );
});
