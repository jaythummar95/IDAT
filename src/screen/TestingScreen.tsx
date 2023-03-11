import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Box } from "../component/Box";
import { NewModuleLabel } from "../component/NewModuleAssignment/NewModuleLabel";
import { FlatList, ScrollView } from "react-native";
import { Text } from "../component/Text";
import useBLE from "../hook/useBLE";
import { Pressable } from "../component/Pressable";
import { DeviceHelper } from "../helper/DeviceHelper";
import { fonts } from "../style/Fonts";
import { Device } from "react-native-ble-plx";
import { Route, StackParamList } from "../navigation/AppNavigator";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeHeader } from "../component/HomeHeader/HomeHeader";
import { Screen, StatusBarType } from "../component/Screen";

export const TestingScreen: React.FC = observer(() => {
  const [topFive, setTopFiveList] = useState<Device[]>([]);
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const {goBack} = useNavigation<StackNavigationProp<StackParamList>>();

  const {requestPermissions, scanForDevice, allDevices} = useBLE();

  const init = async () => {
    await requestPermissions(isGranted => {
      if (isGranted) {
        scanForDevice();
      }
    });
  };

  const topfiveList = async () => {
    setTopFiveList([]);
    let topFiveListArray: Device[] = [];
    allDevices
      .sort((a, b) => (a?.rssi as number) - (b?.rssi as number))
      .map((item, index) => {
        if (index <= 4) {
          topFiveListArray.push(item);
        }
      });
    setTopFiveList(topFiveListArray);
  };

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

  useEffect(() => {
    topfiveList();
  }, [allDevices]);

  useEffect(() => {}, [topFive]);

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
  const renderItem = (item: Device) => {
    return (
      <Box>
        <Pressable
          onPress={() => {
            navigation.navigate(Route.TestCases);
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
    <Screen statusBarType={StatusBarType.Dark}>
      <Box backgroundColor={'primary2'} flex={1}>
        <HomeHeader label={'Testing Of BLE Module'} onBackPress={goBack} />
        <Box marginVertical={'r'}>
          <NewModuleLabel label={'Testing of a BLE Module:'} fontSize={20} />
        </Box>
        <Box marginVertical={'r'}>
          <NewModuleLabel
            label={'[Scan BMU-ID] OR [Enter BMU-ID Manually]'}
            fontSize={18}
          />
        </Box>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Box marginBottom={'m'}>
            <Text marginHorizontal={'l'} color={'black'} marginTop={'s'}>
              Nearest Device
            </Text>

            <FlatList
              data={topFive}
              extraData={allDevices}
              renderItem={({item}) => renderItem(item)}
              initialNumToRender={2}
              ListEmptyComponent={ListEmptyComponent()}
              ListFooterComponent={ListFooterComponent()}
            />
            <Text marginHorizontal={'l'} color={'black'} marginTop={'s'}>
              Other Device
            </Text>
            <FlatList
              data={removeTopFiveList()}
              extraData={allDevices}
              renderItem={({item}) => renderItem(item)}
              initialNumToRender={2}
              ListEmptyComponent={ListEmptyComponent()}
              ListFooterComponent={ListFooterComponent()}
            />
          </Box>
        </ScrollView>
      </Box>
    </Screen>
  );
});
