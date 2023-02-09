import React from 'react';
import {observer} from 'mobx-react-lite';
import {Box} from '../component/Box';
import {Text} from '../component/Text';
import {fonts} from '../style/Fonts';
import {FlatList, ScrollView} from 'react-native';
import {Pressable} from '../component/Pressable';
import {DeviceHelper} from '../helper/DeviceHelper';

export const IdAssignmentScreen: React.FC = observer(() => {
  const dataItem = [
    {name: 'Device Name-1', ip: '11:22:33:44:55:66'},
    {name: 'Device Name-2', ip: '99:22:33:55:66:11'},
    {name: 'Device Name-3', ip: '44:22:33:44:55:66'},
  ];

  const data = [];

  const ListEmptyComponent = () => {
    return (
      <Box>
        <Text fontFamily={fonts.regular} fontSize={20}>
          Scanning for available devices…
        </Text>
      </Box>
    );
  };
  const renderItem = ({item}) => {
    return (
      <Box>
        <Pressable
          onPress={() => {}}
          borderRadius={5}
          borderColor={'primary2'}
          borderWidth={1}
          marginVertical={'s'}
          alignSelf={'center'}
          justifyContent={'center'}
          backgroundColor={'primary2'}
          height={DeviceHelper.calculateHeightRatio(100)}
          width={DeviceHelper.calculateWidthRatio(320)}>
          <Text
            fontFamily={fonts.regular}
            marginHorizontal={'r'}
            marginVertical={'es'}
            fontSize={18}
            color={'black'}
            textAlign={'left'}>
            {item.name}
          </Text>
          <Text
            fontFamily={fonts.regular}
            marginHorizontal={'r'}
            marginVertical={'es'}
            fontSize={18}
            color={'black'}
            textAlign={'left'}>
            {item.ip}
          </Text>
        </Pressable>
      </Box>
    );
  };
  return (
    <Box backgroundColor={'pattensBlue'} flex={1}>
      <Box alignItems={'center'} marginVertical={'r'}>
        <Text fontFamily={fonts.bold} color={'black'} fontSize={18}>
          New Module ID Assignment:
        </Text>
        <Text fontFamily={fonts.bold} color={'black'} fontSize={12}>
          Power-up the target module
        </Text>
      </Box>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box marginBottom={'m'}>
          <Text marginHorizontal={'l'} color={'black'} marginTop={'s'}>
            Nearest Device
          </Text>
          <FlatList
            data={dataItem}
            renderItem={renderItem}
            ListEmptyComponent={ListEmptyComponent()}
          />
        </Box>

        <Text marginHorizontal={'l'} color={'black'}>
          Other Device
        </Text>
        <FlatList
          data={data}
          renderItem={renderItem}
          ListEmptyComponent={ListEmptyComponent()}
        />
      </ScrollView>
    </Box>
  );
});
