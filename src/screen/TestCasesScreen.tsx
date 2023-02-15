import React from 'react';
import {observer} from 'mobx-react-lite';
import {Box} from '../component/Box';
import {NewModuleLabel} from '../component/module/NewModuleLabel';
import {FlatList} from 'react-native';
import {Pressable} from '../component/Pressable';
import {DeviceHelper} from '../helper/DeviceHelper';
import {Text} from '../component/Text';
import {fonts} from '../style/Fonts';
import {HomeHeader} from '../component/HomeHeader/HomeHeader';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Route, StackParamList} from '../navigation/AppNavigator';

export const TestCasesScreen: React.FC = observer(() => {
  const cases = [
    {titel: 'Send Unlock Request Frame ->'},
    {titel: 'Send Unlock Responce Frame ->'},
    {titel: 'Send Unlock Request Frame ->'},
    {titel: 'Send Unlock Request Frame ->'},
    {titel: 'Send Unlock Request Frame ->'},
    {titel: 'Send Unlock Request Frame ->'},
    {titel: 'Send Unlock Request Frame ->'},
  ];
  const {goBack} = useNavigation<StackNavigationProp<StackParamList>>();
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const renderItem = ({item}) => {
    return (
      <Box>
        <Pressable
          onPress={() => {
            navigation.navigate(Route.TestingProcess);
          }}
          marginHorizontal={'sr'}
          marginVertical={'s'}
          backgroundColor={'pattensBlue'}
          borderRadius={10}
          justifyContent={'center'}
          height={DeviceHelper.calculateHeightRatio(80)}>
          <NewModuleLabel label={item.titel} fontSize={18} />
        </Pressable>
      </Box>
    );
  };
  return (
    <Box backgroundColor={'primary2'} flex={1}>
      <HomeHeader
        label={'Test Cases'}
        onBackPress={() => {
          goBack();
        }}
      />
      <FlatList data={cases} extraData={cases} renderItem={renderItem} />
    </Box>
  );
});
