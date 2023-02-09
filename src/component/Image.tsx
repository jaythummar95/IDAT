// @ts-ignore
import React from 'react';
import {
  border,
  BorderProps,
  layout,
  LayoutProps,
  spacing,
  SpacingProps,
  useRestyle,
  position,
  PositionProps,
  shadow,
  ShadowProps,
} from '@shopify/restyle';
import {Image as RNImage, ImagePropsBase} from 'react-native';
import {Theme} from '../style/Theme';

const restyleFunctions = [spacing, border, layout, position, shadow];
type RestyleProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  LayoutProps<Theme> &
  PositionProps<Theme> &
  ShadowProps<Theme>;

export type ImageProps = RestyleProps & ImagePropsBase;

export const Image = ({...rest}: ImageProps): JSX.Element => {
  const imageProps: ImagePropsBase = rest as ImagePropsBase;
  const restyleProps: RestyleProps = rest as RestyleProps;
  const props = useRestyle(restyleFunctions, restyleProps);
  return <RNImage {...imageProps} {...props} />;
};
