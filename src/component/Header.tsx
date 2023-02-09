import React from 'react';
import {observer} from 'mobx-react-lite';
import {Box} from './Box';
import {Text} from './Text';
import {Pressable} from './Pressable';
import {Image} from './Image';
import {Images} from '../assets';
import {DeviceHelper} from '../helper/DeviceHelper';

export interface HeaderProps {
  onBackPress: () => void;
}
export const Header: React.FC<HeaderProps> = observer(({onBackPress}) => {
  return (
    <Box
      backgroundColor={'gray'}
      flexDirection={'row'}
      alignItems={'center'}
      height={DeviceHelper.calculateHeightRatio(70)}>
      <Pressable
        onPress={onBackPress}
        marginHorizontal={'r'}
        justifyContent={'center'}
        height={DeviceHelper.calculateHeightRatio(40)}
        width={DeviceHelper.calculateWidthRatio(40)}>
        <Image
          source={Images.leftArrow}
          resizeMode={'center'}
          height={DeviceHelper.calculateHeightRatio(20)}
          width={DeviceHelper.calculateWidthRatio(20)}
        />
      </Pressable>
    </Box>
  );
});
