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
          onPress={onPress}
          borderRadius={10}
          borderColor={'primary2'}
          borderWidth={1}
          marginVertical={'l'}
          alignSelf={'center'}
          elevation={2}
          justifyContent={'center'}
          backgroundColor={'primary2'}
          height={DeviceHelper.calculateHeightRatio(100)}
          width={DeviceHelper.calculateWidthRatio(250)}>
          <Text
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
