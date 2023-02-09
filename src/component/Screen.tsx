import React from 'react';
import {Box} from './Box';
import {ColorValue, StatusBar} from 'react-native';
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
        return colors.white;
      case StatusBarType.Dark:
        return colors.primary;
      default:
        return colors.primary;
    }
  };

  return (
    <Box flex={1}>
      <StatusBar animated={true} backgroundColor={statusBarColor()} />
      {children}
    </Box>
  );
};
