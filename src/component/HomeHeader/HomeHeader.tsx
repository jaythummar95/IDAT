import React from 'react';
import {observer} from 'mobx-react-lite';
import {ImageSourcePropType} from 'react-native';
import {Box} from '../Box';
import {DeviceHelper} from '../../helper/DeviceHelper';
import {Pressable} from '../Pressable';
import {Image} from '../Image';
import {Images} from '../../assets';
import {fonts} from '../../style/Fonts';
import {Text} from '../Text';

export interface HomeHeaderProps {
  onBackPress?: () => void;
  isMenu?: boolean;
  displayOnlyImage?: boolean;
  displayOnlyImageSource?: ImageSourcePropType;
  rightFilterNode?: React.ReactNode;
  label?: string;
}

export const HomeHeader: React.FC<HomeHeaderProps> = observer(
  ({isMenu, label, onBackPress}: HomeHeaderProps) => {
    return (
      <Box
        backgroundColor={'primary'}
        elevation={4}
        shadowColor={'gray'}
        shadowOffset={{width: 0, height: 2}}
        justifyContent={'center'}
        shadowOpacity={0.5}
        shadowRadius={2}
        width={DeviceHelper.width()}
        height={DeviceHelper.calculateHeightRatio(70)}>
        <Box
          marginHorizontal={'s'}
          flexDirection={'row'}
          flex={1}
          alignItems={'center'}>
          {isMenu ? (
            <Box flex={0.5} justifyContent={'center'} marginTop={'sr'}>
              <Pressable
                height={DeviceHelper.calculateHeightRatio(40)}
                width={DeviceHelper.calculateWidthRatio(40)}>
                <Image
                  source={Images.menu}
                  resizeMode={'center'}
                  height={DeviceHelper.calculateHeightRatio(30)}
                  width={DeviceHelper.calculateWidthRatio(30)}
                />
              </Pressable>
            </Box>
          ) : (
            <Box flex={0.5} justifyContent={'center'}>
              <Pressable
                onPress={onBackPress}
                height={DeviceHelper.calculateHeightRatio(40)}
                justifyContent={'center'}
                alignItems={'center'}
                width={DeviceHelper.calculateWidthRatio(40)}>
                <Image
                  source={Images.leftArrowW}
                  resizeMode={'contain'}
                  height={DeviceHelper.calculateHeightRatio(23)}
                  width={DeviceHelper.calculateWidthRatio(23)}
                />
              </Pressable>
            </Box>
          )}
          <Box justifyContent={'center'}>
            <Text
              fontSize={18}
              textAlign={'center'}
              fontFamily={fonts.medium}
              color={'primary2'}>
              {label}
            </Text>
          </Box>
        </Box>
      </Box>
    );
  },
);
