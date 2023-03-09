import React from 'react';
import {Text} from '../Text';
import {DeviceHelper} from '../../helper/DeviceHelper';
import {fonts} from '../../style/Fonts';
import {Box} from '../Box';
import {Button} from '../Button';

export interface PowerOnYourDeviceProps {
  onPowerOnPress: () => void;
}

export const PowerOnYourDevice: React.FC<PowerOnYourDeviceProps> = ({
  onPowerOnPress,
}: PowerOnYourDeviceProps) => {
  return (
    <Box flex={1} paddingTop={'l'} alignItems={'center'}>
      <Box
        borderRadius={10}
        borderColor={'pattensBlue'}
        borderWidth={1}
        marginVertical={'sr'}
        alignSelf={'center'}
        elevation={5}
        justifyContent={'center'}
        backgroundColor={'pattensBlue'}
        height={DeviceHelper.calculateHeightRatio(150)}
        width={DeviceHelper.calculateWidthRatio(300)}>
        <Text
          fontSize={20}
          fontFamily={fonts.regular}
          color={'black'}
          textAlign={'center'}>
          {'Power on your device.'}
        </Text>
      </Box>
      <Box marginVertical={'r'} width={DeviceHelper.calculateWidthRatio(300)}>
        <Button
          label={'Yes, I have did it.'}
          onPress={onPowerOnPress}
          isLight={false}
        />
      </Box>
    </Box>
  );
};
