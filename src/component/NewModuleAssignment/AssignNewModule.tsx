import React, {useState} from 'react';
import {Box} from '../Box';
import {ScrollView} from 'react-native';
import {Text} from '../Text';
import {fonts} from '../../style/Fonts';
import {Button} from '../Button';
import {EditText} from '../EditText/EditText';
import {navigate, Route} from '../../navigation/AppNavigator';

export interface AssignNewModuleProps {}

export const AssignNewModule: React.FC<
  AssignNewModuleProps
> = ({}: AssignNewModuleProps) => {
  const [bmuId, setBMUId] = useState('');

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

  return (
    <Box flex={1}>
      <ScrollView>
        <Box flex={1} paddingVertical={'m'}>
          {renderBLECard()}
          {renderBMUCard()}
        </Box>
      </ScrollView>
    </Box>
  );
};
