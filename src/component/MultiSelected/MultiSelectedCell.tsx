import React from 'react';
import {Box} from '../Box';
import {Pressable} from '../Pressable';
import {DeviceHelper} from '../../helper/DeviceHelper';
import {Text} from '../Text';
import {fonts} from '../../style/Fonts';
import {Image} from '../Image';
import {Images} from '../../assets';
import {ScrollView} from 'react-native';

export interface MultiSelectedCellProps {
  onMultiselected: () => void;
  label: string;
  isSelect: boolean;
}
export const MultiSelectedCell: React.FC<MultiSelectedCellProps> = ({
  onMultiselected,
  isSelect,
  label,
}: MultiSelectedCellProps) => {
  return (
    <ScrollView>
      <Pressable
        onPress={onMultiselected}
        flexDirection={'row'}
        marginTop={'m'}
        alignItems={'center'}>
        <Box
          width={DeviceHelper.calculateWidthRatio(20)}
          height={DeviceHelper.calculateHeightRatio(20)}
          borderRadius={5}
          borderColor={'primary'}
          alignItems={'center'}
          justifyContent={'center'}
          borderWidth={1.5}>
          {isSelect ? (
            <Image
              width={DeviceHelper.calculateWidthRatio(14)}
              height={DeviceHelper.calculateHeightRatio(14)}
              borderRadius={7}
              source={Images.rightIcon}
              alignSelf={'center'}
            />
          ) : null}
        </Box>
        <Text
          marginStart={'s'}
          marginEnd={'m'}
          color={'black'}
          fontFamily={fonts.poppinsRegular}
          fontSize={18}>
          {label}
        </Text>
      </Pressable>
    </ScrollView>
  );
};
