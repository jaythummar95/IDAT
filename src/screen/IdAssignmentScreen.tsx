import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {Box} from '../component/Box';
import {Text} from '../component/Text';
import {fonts} from '../style/Fonts';
import {FlatList, ScrollView} from 'react-native';
import {Pressable} from '../component/Pressable';
import {DeviceHelper} from '../helper/DeviceHelper';
import {StackParamList} from '../navigation/AppNavigator';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeHeader} from '../component/HomeHeader/HomeHeader';
import useBLE from '../hook/useBLE';
import {Device} from 'react-native-ble-plx';

export const IdAssignmentScreen: React.FC = observer(() => {
  const {goBack} = useNavigation<StackNavigationProp<StackParamList>>();
  const [topFive, setTopFiveList] = useState<Device[]>([]);

  const {
    requestPermissions,
    scanForDevice,
    connectToDevice,
    allDevices,
    deviceConnected,
    disConnectFromDevice,
  } = useBLE();

  const removeTopFiveList = () => {
    const removeTopFiveLists: Device[] = [];
    allDevices
      .sort((a, b) => (a?.rssi as number) - (b?.rssi as number))
      .map(allDeviceItem => {
        const isExist =
          topFive.findIndex(
            topFiveItem => topFiveItem.id === allDeviceItem.id,
          ) !== -1;

        if (!isExist) {
          removeTopFiveLists.push(allDeviceItem);
        }
      });
    return removeTopFiveLists;
  };

  const init = async () => {
    await requestPermissions(isGranted => {
      if (isGranted) {
        scanForDevice();
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const ListEmptyComponent = () => {
    return (
      <Box marginVertical={'l'} alignItems={'center'} justifyContent={'center'}>
        <Text fontFamily={fonts.regular} fontSize={20}>
          Scanning for available devices…
        </Text>
      </Box>
    );
  };
  const ListFooterComponent = () => {
    return (
      <Box marginHorizontal={'l'} justifyContent={'center'}>
        <Text fontFamily={fonts.regular} fontSize={12}>
          If this is not your target device, go closer to target device
        </Text>
      </Box>
    );
  };
  const renderItem = ({item}) => {
    return (
      <Box>
        <Pressable
          onPress={() => {
            // navigation.navigate(Route.ModuleAlreadyExists, {ip: item.ip});
            // if (deviceConnected?.id === item?.id) {
            //   disConnectFromDevice(item);
            // } else {
            //   startStreamData(item);
            // }
          }}
          borderRadius={5}
          borderColor={'pattensBlue'}
          borderWidth={1}
          marginVertical={'s'}
          alignSelf={'center'}
          justifyContent={'center'}
          backgroundColor={'pattensBlue'}
          height={DeviceHelper.calculateHeightRatio(100)}
          width={DeviceHelper.calculateWidthRatio(320)}>
          <Text
            fontFamily={fonts.regular}
            marginHorizontal={'r'}
            marginVertical={'es'}
            fontSize={18}
            color={'black'}
            textAlign={'left'}>
            {item.name ?? 'unknown'}
          </Text>
          <Text
            fontFamily={fonts.regular}
            marginHorizontal={'r'}
            marginVertical={'es'}
            fontSize={18}
            color={'black'}
            textAlign={'left'}>
            {item.id ?? 'unknown'}
          </Text>
        </Pressable>
      </Box>
    );
  };
  return (
    <Box backgroundColor={'primary2'} flex={1}>
      <HomeHeader
        label={'New Modules ID Assignment'}
        onBackPress={() => {
          goBack();
        }}
      />
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
            data={topFive}
            extraData={allDevices}
            renderItem={renderItem}
            ListEmptyComponent={ListEmptyComponent()}
            ListFooterComponent={ListFooterComponent()}
          />
        </Box>

        <Text marginHorizontal={'l'} color={'black'}>
          Other Device
        </Text>
        <FlatList
          data={removeTopFiveList()}
          extraData={allDevices}
          renderItem={renderItem}
          ListEmptyComponent={ListEmptyComponent()}
          ListFooterComponent={ListFooterComponent()}
        />
        <Box marginVertical={'sr'} />
      </ScrollView>
    </Box>
  );
});
