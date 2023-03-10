import React from 'react';
import {Box} from './Box';
import {DeviceHelper} from '../helper/DeviceHelper';
import {TextInput} from 'react-native';
import {useTheme} from '@shopify/restyle';
import {Theme} from '../style/Theme';
import {Pressable} from './Pressable';
import {Image} from './Image';
import {Images} from '../assets';
import {fonts} from '../style/Fonts';

export interface SearchProps {
  onChangeText?: (text: string) => void;
  onPress?: () => void;
  searchCloseApiCall?: () => void;
  placeholder: string;
}

export const Search: React.FC<SearchProps> = ({
  onChangeText,
  onPress,
  searchCloseApiCall,
  placeholder,
}: SearchProps) => {
  const {colors} = useTheme<Theme>();
  const [searchData, setSearchData] = React.useState('');

  return (
    <Box
      height={DeviceHelper.calculateHeightRatio(45)}
      backgroundColor={'white'}
      shadowColor={'black'}
      shadowOffset={{width: 0, height: 1}}
      shadowOpacity={0.1}
      shadowRadius={4}
      elevation={4}
      borderRadius={8}
      flexDirection={'row'}
      paddingHorizontal={'r'}
      marginTop={'es'}
      alignItems={'center'}
      marginHorizontal={'m'}>
      <Image
        width={DeviceHelper.calculateHeightRatio(20)}
        height={DeviceHelper.calculateHeightRatio(20)}
        source={Images.search}
      />
      <Box flex={1} height={DeviceHelper.calculateHeightRatio(45)}>
        <TextInput
          style={{
            marginStart: 8,
            color: colors.black,
            fontSize: 15,
            fontFamily: fonts.regular,
            alignItems: 'center',
            lineHeight: 15,
            padding: 0,
            marginTop: 6,
          }}
          placeholder={placeholder}
          placeholderTextColor={colors.gray6}
          onChangeText={text => {
            setSearchData(text);
            if (onChangeText) {
              onChangeText(text);
            }
          }}
          value={searchData}
        />
      </Box>
      {searchData === '' ? null : (
        <Box
          position={'absolute'}
          right={0}
          borderTopRightRadius={8}
          borderBottomRightRadius={8}
          width={DeviceHelper.calculateHeightRatio(100)}
          height={DeviceHelper.calculateHeightRatio(48)}
          backgroundColor={'primary'}>
          <Pressable
            alignSelf={'center'}
            marginTop={'sr'}
            onPress={onPress}
            marginRight={'ls'}>
            <Image
              width={DeviceHelper.calculateHeightRatio(20)}
              height={DeviceHelper.calculateHeightRatio(20)}
              source={Images.search}
            />
          </Pressable>
        </Box>
      )}
      <Box
        position={'absolute'}
        right={45}
        alignSelf={'center'}
        width={DeviceHelper.calculateHeightRatio(1)}
        height={DeviceHelper.calculateHeightRatio(40)}
        backgroundColor={'white'}
      />
      {searchData === '' ? null : (
        <Pressable
          position={'absolute'}
          right={15}
          alignSelf={'center'}
          onPress={() => {
            setSearchData('');
            if (searchCloseApiCall) {
              searchCloseApiCall();
            }
          }}>
          <Image
            width={DeviceHelper.calculateHeightRatio(20)}
            height={DeviceHelper.calculateHeightRatio(20)}
            source={Images.closeBlack}
          />
        </Pressable>
      )}
    </Box>
  );
};
