import React from 'react';
import {observer} from 'mobx-react-lite';
import {Box} from '../Box';
import {Text} from '../Text';
import {Pressable} from '../Pressable';
import {DeviceHelper} from '../../helper/DeviceHelper';
import {fonts} from '../../style/Fonts';

export interface DashboardButtonProps {
  lable: string;
  onPress: () => void;
}
export const DashboardButton: React.FC<DashboardButtonProps> = observer(
  ({lable, onPress}: DashboardButtonProps) => {
    return (
      <Box>
        <Pressable
          shadowColor={'gray'}
          shadowOffset={{width: 0, height: 1}}
          shadowOpacity={0.3}
          shadowRadius={2}
          onPress={onPress}
          borderRadius={10}
          borderColor={'pattensBlue'}
          borderWidth={1}
          marginVertical={'sr'}
          alignSelf={'center'}
          elevation={5}
          justifyContent={'center'}
          backgroundColor={'white'}
          height={DeviceHelper.calculateHeightRatio(150)}
          width={DeviceHelper.calculateWidthRatio(300)}>
          <Text
            fontSize={20}
            fontFamily={fonts.regular}
            color={'black'}
            textAlign={'center'}>
            {lable}
          </Text>
        </Pressable>
      </Box>
    );
  },
);
