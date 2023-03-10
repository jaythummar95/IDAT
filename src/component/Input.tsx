import React from 'react';
import {Box} from './Box';
import {DeviceHelper} from '../helper/DeviceHelper';
import {Text} from './Text';
import {TextInput, TextInputProps} from 'react-native';
import {useTheme} from '@shopify/restyle';
import {Theme} from '../style/Theme';
import {Pressable} from './Pressable';
import {Image} from './Image';
import {Images} from '../assets';
import {fonts} from '../style/Fonts';

export interface InputHintProps {
  hint?: string;
}

export interface InputImageProps {
  // @ts-ignore
  iconName?: Images;
}

export interface Input extends InputHintProps, InputImageProps, TextInputProps {
  onPress?: () => void;
  leftComponent?: React.ReactNode;
  isBottomMargin?: boolean;
  hasError?: boolean;
  isCountry?: boolean;
  countryName?: string;
  isPatternInput?: boolean;
  maxLength?: number;
  isHeight?: boolean;
  height?: number;
  isIcon?: boolean;
}

export const InputHint: React.FC<InputHintProps> = ({hint}: InputHintProps) => {
  return (
    <Box
      position={'absolute'}
      paddingHorizontal={'ss'}
      top={-8}
      left={16}
      backgroundColor={'white'}>
      <Text variant={'inputHint'}>{hint}</Text>
    </Box>
  );
};

export const InputImage: React.FC<InputImageProps> = ({
  iconName,
}: InputImageProps) => {
  return (
    <Box>
      <Image
        source={iconName}
        width={DeviceHelper.calculateWidthRatio(20)}
        height={DeviceHelper.calculateHeightRatio(20)}
      />
    </Box>
  );
};

export const Input: React.FC<Input> = (props: Input) => {
  const {
    hint,
    iconName,
    onPress,
    leftComponent,
    isBottomMargin = true,
    hasError = false,
    isCountry = false,
    countryName,
    maxLength,
    isHeight = false,
    height = 0,
    isIcon = false,
  } = props;
  const textInputProps = props as TextInputProps;
  const {multiline, value, placeholder, keyboardType, autoCapitalize} =
    textInputProps;
  const {colors} = useTheme<Theme>();
  const {black} = colors;
  const {gray} = colors;
  return (
    <Pressable
      marginBottom={isBottomMargin ? 'ls' : 'ss'}
      disabled={!onPress}
      borderColor={hasError ? 'red' : 'border'}
      borderWidth={isCountry ? 1 : 0}
      borderRadius={isCountry ? 10 : 10}
      backgroundColor={isCountry ? 'primary' : 'white'}
      onPress={DeviceHelper.ios() ? undefined : onPress}
      height={DeviceHelper.calculateHeightRatio(56)}>
      <Box
        borderColor={hasError ? 'red' : 'border'}
        borderWidth={1}
        borderRadius={10}
        alignItems={'center'}
        paddingHorizontal={'r'}
        flexDirection={'row'}
        backgroundColor={'white'}
        height={DeviceHelper.calculateHeightRatio(isHeight ? height : 55)}>
        {isIcon ? null : (
          <Text
            fontSize={16}
            fontFamily={fonts.poppinsSemiBold}
            color={'black'}>
            {'+91'}
          </Text>
        )}

        {leftComponent}
        <TextInput
          editable={!onPress}
          onTouchEnd={onPress}
          maxLength={maxLength}
          style={{
            fontFamily: fonts.regular,
            fontSize: 16,
            flex: 1,
            height: '100%',
            paddingTop: multiline ? 16 : 0,
            paddingStart: leftComponent ? 0 : 16,
            color: black,
            paddingVertical: 0,
            textAlignVertical: multiline ? 'top' : 'center',
          }}
          {...textInputProps}
          keyboardType={keyboardType}
          value={value}
          autoCapitalize={autoCapitalize}
          placeholder={placeholder}
          placeholderTextColor={gray}
        />
        {onPress && (
          <Image
            source={Images.downArrow}
            width={DeviceHelper.calculateWidthRatio(10.83)}
            height={DeviceHelper.calculateWidthRatio(10.66)}
          />
        )}
      </Box>
      {isCountry ? (
        <Box
          height={20}
          marginHorizontal={'sr'}
          borderColor={hasError ? 'red' : 'border'}>
          <Text
            fontSize={12}
            fontFamily={fonts.poppinsBold}
            color={'white'}
            marginStart={'es'}>
            {countryName}
          </Text>
        </Box>
      ) : null}
    </Pressable>
  );
};
