import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {Box} from '../component/Box';
import {NewModuleIDAssign} from '../component/module/NewModuleIDAssign';
import {FlatList, ScrollView} from 'react-native';
import {Text} from '../component/Text';
import useBLE from '../hook/useBLE';
import {Pressable} from '../component/Pressable';
import {DeviceHelper} from '../helper/DeviceHelper';
import {fonts} from '../style/Fonts';
import {Device} from 'react-native-ble-plx';

export const TestingScreen: React.FC = observer(() => {
  const {
    requestPermissions,
    scanForDevice,
    connectToDevice,
    allDevices,
    deviceConnected,
    disConnectFromDevice,
  } = useBLE();

  const init = async () => {
    await requestPermissions(isGranted => {
      if (isGranted) {
        scanForDevice();
      }
    });
  };
  const [topFive, setTopFiveList] = useState<Device[]>([]);
  console.log('topFive', topFive);

  const topfiveList = async () => {
    setTopFiveList([]);
    let topFiveListArray: Device[] = [];
    allDevices.map((item, index) => {
      console.log('topFiveindex', index);
      if (index <= 4) {
        topFiveListArray.push(item);
      }
    });
    setTopFiveList(topFiveListArray);
  };

  const startStreamData = async (device: Device) => {
    if (device) {
      connectToDevice(device);
    } else {
      console.error('NO DEVICE CONNECTED');
    }
  };
  useEffect(() => {
    topfiveList();
  }, [allDevices]);

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
            if (deviceConnected?.id === item?.id) {
              disConnectFromDevice(item);
            } else {
              startStreamData(item);
            }
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
      <Box marginVertical={'r'}>
        <NewModuleIDAssign label={'Testing of a BLE Module:'} />
      </Box>
      <Box marginVertical={'r'}>
        <NewModuleIDAssign
          label={'[Scan BMU-ID] OR [Enter BMU-ID Manually]'}
          fontSize={true}
        />
      </Box>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box marginBottom={'m'}>
          <Text marginHorizontal={'l'} color={'black'} marginTop={'s'}>
            Nearest Device
          </Text>
          <FlatList
            data={topFive}
            renderItem={renderItem}
            initialNumToRender={2}
            ListEmptyComponent={ListEmptyComponent()}
            ListFooterComponent={ListFooterComponent()}
          />
        </Box>
      </ScrollView>
    </Box>
  );
});
