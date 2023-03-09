import React, {useEffect, useState} from 'react';
import {Box} from '../Box';
import {Text} from '../Text';
import {FlatList, ScrollView} from 'react-native';
import {observer} from 'mobx-react-lite';
import {Device} from 'react-native-ble-plx';
import useBLE from '../../hook/useBLE';
import {fonts} from '../../style/Fonts';
import {Pressable} from '../Pressable';
import {DeviceHelper} from '../../helper/DeviceHelper';

export interface ScanForDevicesProps {
  onCheckModuleAlreadyExists: (device: Device) => void;
}

export const ScanForDevices: React.FC<ScanForDevicesProps> = observer(
  ({onCheckModuleAlreadyExists}: ScanForDevicesProps) => {
    const [topFive] = useState<Device[]>([]);
    const {requestPermissions, scanForDevice, allDevices} = useBLE();

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
        <Box
          marginVertical={'l'}
          alignItems={'center'}
          justifyContent={'center'}>
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
            {'If this is not your target device,go closer to target device'}
          </Text>
        </Box>
      );
    };

    // @ts-ignore
    const renderItem = ({item}) => {
      return (
        <Box>
          <Pressable
            onPress={() => {
              onCheckModuleAlreadyExists(item);
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

    const renderListOfDevices = (isForNearest: boolean) => {
      return (
        <Box>
          <Box marginVertical={'m'}>
            <Text
              marginHorizontal={'r'}
              color={'black'}
              marginTop={'s'}
              fontFamily={fonts.semiBold}>
              {isForNearest ? 'Nearest Device' : 'Other Devices'}
            </Text>
            <FlatList
              data={isForNearest ? topFive : removeTopFiveList()}
              extraData={allDevices}
              renderItem={renderItem}
              ListEmptyComponent={isForNearest ? ListEmptyComponent() : <Box />}
              ListFooterComponent={
                isForNearest ? ListFooterComponent() : <Box />
              }
            />
          </Box>
        </Box>
      );
    };

    return (
      <Box>
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderListOfDevices(true)}
          {renderListOfDevices(false)}
        </ScrollView>
      </Box>
    );
  },
);
