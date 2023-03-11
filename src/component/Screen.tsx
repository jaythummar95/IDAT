import React from 'react';
import {Box} from './Box';
import {ColorValue, SafeAreaView, StatusBar} from 'react-native';
import {useTheme} from '@shopify/restyle';
import {Theme} from '../style/Theme';

export enum StatusBarType {
  Light,
  Dark = 1,
}

export interface ScreenProps {
  children: React.ReactNode;
  statusBarType?: StatusBarType;
}

export const Screen: React.FC<ScreenProps> = (props: ScreenProps) => {
  const {children, statusBarType} = props;
  const {colors} = useTheme<Theme>();

  /**
   * Return the color
   * of statusbar based on the type
   * of statusbar
   */
  const statusBarColor = (): ColorValue => {
    switch (statusBarType) {
      case StatusBarType.Light:
        return colors.pattensBlue;
      case StatusBarType.Dark:
        return colors.primary;
      default:
        return colors.pattensBlue;
    }
  };

  return (
    <Box flex={1}>
      <SafeAreaView style={{backgroundColor: statusBarColor()}} />
      <SafeAreaView style={{backgroundColor: colors.pattensBlue}} />
      <StatusBar
        animated={true}
        backgroundColor={statusBarColor()}
        barStyle={StatusBarType.Light ? 'dark-content' : 'light-content'}
      />
      {children}
    </Box>
  );
};
