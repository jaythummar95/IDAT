import {createTheme} from '@shopify/restyle';
import {palette} from './Palette';
import {DeviceHelper} from '../helper/DeviceHelper';
import {fonts} from './Fonts';

export const theme = createTheme({
  colors: {
    ...palette,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  dark: false,
  spacing: {
    ss: 2,
    es: 4,
    s: 8,
    sr: 13,
    r: 16,
    m: 24,
    l: 32,
    ls: 40,
    el: 54,
    ll: 140,
    mR: -16,
    mL: -32,
    mS: -8,
    none: 0,
  },
  textVariants: {
    h1: {
      color: 'white',
      fontSize: 26,
      fontFamily: fonts.robotoBold,
      textAlign: 'left',
    },
    h2: {
      color: 'white',
      fontSize: 24,
      fontFamily: fonts.robotoRegular,
      textAlign: 'left',
      textTransform: 'uppercase',
    },
    h3: {
      color: 'white',
      fontSize: 18,
      fontFamily: fonts.robotoRegular,
      textAlign: 'left',
      textTransform: 'uppercase',
    },
    title: {
      color: 'white',
      fontSize: 14,
      fontFamily: fonts.robotoRegular,
      textAlign: 'left',
      textTransform: 'uppercase',
    },
    caption: {
      color: 'gray',
      fontSize: 10,
      fontFamily: fonts.robotoRegular,
      textAlign: 'left',
    },
    b1: {
      color: 'white',
      fontSize: 15,
      fontFamily: fonts.poppinsSemiBold,
      textAlign: 'left',
    },
    b2: {
      color: 'black',
      fontSize: 14,
      fontFamily: fonts.poppinsSemiBold,
      textAlign: 'left',
    },
    b3: {
      color: 'white',
      fontSize: 16,
      fontFamily: fonts.poppinsRegular,
      textAlign: 'left',
    },
    b4: {
      color: 'gray',
      fontSize: 12,
      fontFamily: fonts.poppinsMedium,
      textAlign: 'left',
    },
    b5: {
      color: 'black',
      fontSize: 12,
      fontFamily: fonts.poppinsMedium,
      textAlign: 'left',
    },
    inputHint: {
      color: 'gray',
      fontSize: 14,
      fontFamily: fonts.poppinsMedium,
      textAlign: 'left',
    },
  },
  cardVariants: {
    defaults: {
      width: DeviceHelper.width() - 48,
      margin: 'r',
      shadowColor: 'ffBlack',
      shadowOffset: {width: 0, height: 3},
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 4,
      borderRadius: 10,
      backgroundColor: 'white',
    },
    big: {
      width: DeviceHelper.width() - 48,
      height: DeviceHelper.height() / 1.3,
    },
  },
});

export type Theme = typeof theme;
export type Color = keyof typeof theme['colors'];
export default theme;
