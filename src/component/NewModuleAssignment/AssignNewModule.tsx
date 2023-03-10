import React, {useState} from 'react';
import {Box} from '../Box';
import {ScrollView} from 'react-native';
import {Text} from '../Text';
import {fonts} from '../../style/Fonts';
import {Button} from '../Button';
import {EditText} from '../EditText/EditText';
import {navigate, Route} from '../../navigation/AppNavigator';
import {MultiSelect} from '../MultiSelected/MultiSelect';
import {Image} from '../Image';
import {Images} from '../../assets';
import {DeviceHelper} from '../../helper/DeviceHelper';
import {Pressable} from '../Pressable';
import {LabelValuePair} from '../Types';

export interface AssignNewModuleProps {}

export interface ModuleTye {
  title: string;
  placeHolder: string;
  isInputVisible: boolean;
  options: LabelValuePair[];
  inputPlaceHolder: string;
  isModalVisible: boolean;
  value: string;
}
export const AssignNewModule: React.FC<
  AssignNewModuleProps
> = ({}: AssignNewModuleProps) => {
  const [bmuId, setBMUId] = useState('');
  const [moduleList, setMainList] = useState<ModuleTye[]>([
    {
      title: 'Module Type',
      placeHolder: 'Select Module type',
      isInputVisible: false,
      options: [],
      inputPlaceHolder: 'Enter Module Type',
      isModalVisible: false,
      value: '',
    },
    {
      title: 'Firmware',
      placeHolder: 'Select Firmware',
      isInputVisible: false,
      options: [],
      inputPlaceHolder: 'Enter Firmware',
      isModalVisible: false,
      value: '',
    },
    {
      title: 'Manufacturing Batch',
      placeHolder: 'Select Manufacturing Batch',
      isInputVisible: false,
      options: [],
      inputPlaceHolder: 'Enter Manufacturing Batch',
      isModalVisible: false,
      value: '',
    },
  ]);

  const renderBLECard = () => {
    return (
      <Box
        elevation={4}
        shadowColor={'gray'}
        shadowOffset={{width: 0, height: 1}}
        shadowOpacity={0.3}
        shadowRadius={2}
        flexDirection={'row'}
        marginHorizontal={'r'}
        paddingVertical={'r'}
        paddingHorizontal={'r'}
        backgroundColor={'white'}
        borderRadius={10}>
        <Text color={'black'} fontFamily={fonts.semiBold} fontSize={16}>
          {'BLE MAC : '}
        </Text>
        <Text color={'black'} fontFamily={fonts.regular} fontSize={16}>
          23:23:23:23
        </Text>
      </Box>
    );
  };

  const renderBMUCard = () => {
    return (
      <Box
        elevation={4}
        shadowColor={'gray'}
        marginTop={'r'}
        shadowOffset={{width: 0, height: 1}}
        shadowOpacity={0.3}
        shadowRadius={2}
        marginHorizontal={'r'}
        paddingVertical={'r'}
        paddingHorizontal={'r'}
        backgroundColor={'white'}
        borderRadius={10}>
        <Box flexDirection={'row'}>
          <Text color={'black'} fontFamily={fonts.semiBold} fontSize={16}>
            {'BMU ID : '}
          </Text>
          <Text color={'black'} fontFamily={fonts.regular} fontSize={16}>
            {bmuId}
          </Text>
        </Box>
        <Box height={1} backgroundColor={'gray2'} marginTop={'sr'} />
        <Text
          marginTop={'sr'}
          marginBottom={'es'}
          fontFamily={fonts.regular}
          color={'black'}
          fontSize={12}>
          {'Enter BMU-ID '}
        </Text>
        <EditText
          value={bmuId}
          placeholder={'BMU-ID'}
          onChangeValue={text => {
            setBMUId(text);
          }}
        />
        <Box
          marginTop={'sr'}
          marginBottom={'es'}
          flexDirection={'row'}
          justifyContent={'center'}
          alignItems={'center'}>
          <Box height={1} backgroundColor={'gray2'} flex={1} />
          <Text
            fontFamily={fonts.regular}
            color={'gray'}
            fontSize={12}
            marginHorizontal={'r'}>
            {'Or'}
          </Text>
          <Box height={1} backgroundColor={'gray2'} flex={1} />
        </Box>
        <Box marginTop={'r'}>
          <Button
            label={'Scan BMU-ID'}
            onPress={() => {
              navigate({
                screenName: Route.ScanQrCode,
                params: {onScanComplete: () => {}},
              });
            }}
          />
        </Box>
      </Box>
    );
  };

  const renderModuleListCell = (moduleItem: ModuleTye, index: number) => {
    return (
      <Box
        elevation={4}
        shadowColor={'gray'}
        marginTop={'r'}
        shadowOffset={{width: 0, height: 1}}
        shadowOpacity={0.3}
        shadowRadius={2}
        marginHorizontal={'r'}
        backgroundColor={'white'}
        borderRadius={10}>
        <Box marginBottom={'r'} flexDirection={'row'}>
          <Box flex={1}>
            <MultiSelect
              title={moduleItem.title}
              placeholder={moduleItem.placeHolder}
              bottomSheetLebal={moduleItem.title}
              onPress={() => {
                const tempModuleList = [...moduleList];
                tempModuleList[index].isModalVisible = true;
                setMainList(tempModuleList);
              }}
              onClose={() => {
                const tempModuleList = [...moduleList];
                tempModuleList[index].isModalVisible = false;
                setMainList(tempModuleList);
              }}
              onMultiSelectedButtonClick={() => {}}
              visible={moduleItem.isModalVisible}
              items={moduleItem.options}
              onValueChangeSingleSelect={() => {}}
            />
          </Box>
          <Box alignSelf={'flex-end'} bottom={20} marginEnd={'r'}>
            <Text fontFamily={fonts.regular} color={'gray'} fontSize={12}>
              {'Or'}
            </Text>
          </Box>
          <Pressable
            onPress={() => {
              const tempModuleList = [...moduleList];
              tempModuleList[index].isInputVisible = true;
              setMainList(tempModuleList);
            }}
            marginEnd={'r'}
            alignSelf={'flex-end'}
            backgroundColor={'primary'}
            justifyContent={'center'}
            alignItems={'center'}
            bottom={6}
            borderRadius={10}
            height={DeviceHelper.calculateHeightRatio(55)}
            width={DeviceHelper.calculateHeightRatio(55)}>
            <Image
              source={Images.add}
              width={20}
              height={20}
              resizeMode={'center'}
            />
          </Pressable>
        </Box>
        {moduleItem.isInputVisible && (
          <Box marginHorizontal={'r'} marginBottom={'r'}>
            <EditText
              value={moduleItem.value}
              placeholder={moduleItem.inputPlaceHolder}
              onChangeValue={text => {
                const tempModuleList = [...moduleList];
                tempModuleList[index].value = text;
                setMainList(tempModuleList);
              }}
            />
          </Box>
        )}
      </Box>
    );
  };

  const renderInfoCards = () => {
    return (
      <Box>
        {moduleList.map((moduleItem, index) =>
          renderModuleListCell(moduleItem, index),
        )}
      </Box>
    );
  };

  const renderCreateRecord = () => {
    return (
      <Box marginHorizontal={'r'} marginTop={'r'}>
        <Button
          label={'Create Record'}
          onPress={() => {
            navigate({
              screenName: Route.ScanQrCode,
              params: {onScanComplete: () => {}},
            });
          }}
        />
      </Box>
    );
  };

  const renderSetNVM = () => {
    return (
      <Box marginHorizontal={'r'} marginTop={'r'}>
        <Button
          label={'Set NVM'}
          onPress={() => {
            navigate({
              screenName: Route.ScanQrCode,
              params: {onScanComplete: () => {}},
            });
          }}
        />
      </Box>
    );
  };

  return (
    <Box flex={1}>
      <ScrollView>
        <Box flex={1} paddingVertical={'m'}>
          {renderBLECard()}
          {renderBMUCard()}
          {renderInfoCards()}
          {renderCreateRecord()}
          {renderSetNVM()}
        </Box>
      </ScrollView>
    </Box>
  );
};
