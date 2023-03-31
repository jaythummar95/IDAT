import React, {useState} from 'react';
import {Box} from '../Box';
import {Text} from '../Text';
import {fonts} from '../../style/Fonts';
import {EditText} from '../EditText/EditText';
import {Button} from '../Button';
import {navigate, Route} from '../../navigation/AppNavigator';

export interface EnterOrScanBMUProps {
  bmuId: string;
  setBMUId: (bmuId: string) => void;
  firmwareVersion?: string;
  hideInputAreas?: boolean;
}

export const EnterOrScanBMU: React.FC<EnterOrScanBMUProps> = ({
  bmuId,
  setBMUId,
  firmwareVersion,
  hideInputAreas,
}: EnterOrScanBMUProps) => {
  const [localBMUID, setLocalBMUID] = useState('');
  return (
    <Box
      elevation={4}
      marginTop={'r'}
      shadowColor={'gray'}
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
      {firmwareVersion ? (
        <Box flexDirection={'row'}>
          <Text color={'black'} fontFamily={fonts.semiBold} fontSize={16}>
            {'Firmware Version : '}
          </Text>
          <Text color={'black'} fontFamily={fonts.regular} fontSize={16}>
            {firmwareVersion}
          </Text>
        </Box>
      ) : null}

      {!hideInputAreas && (
        <Box>
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
            value={localBMUID}
            placeholder={'BMU-ID'}
            onChangeValue={text => {
              setLocalBMUID(text);
            }}
          />
          {localBMUID ? (
            <Box marginTop={'r'}>
              <Button
                label={'Submit'}
                onPress={() => {
                  setBMUId(localBMUID);
                  setLocalBMUID('');
                }}
              />
            </Box>
          ) : null}
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
      )}
    </Box>
  );
};
