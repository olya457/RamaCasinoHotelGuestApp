import {Platform} from 'react-native';

export const colors = {
  black: '#050505',
  surface: '#151515',
  surfaceHigh: '#202020',
  surfaceSoft: '#262626',
  border: '#2d2d2d',
  borderSoft: '#242424',
  text: '#f4f4f4',
  muted: '#a8a8a8',
  dim: '#747474',
  red: '#ef3028',
  redDark: '#9c1f1d',
  orange: '#ff8b1f',
  yellow: '#ffc31a',
  gold: '#f5bd00',
  blue: '#2d63de',
  green: '#15b978',
  purple: '#854ee9',
  cyan: '#16b9d4',
  grey: '#313131',
  white: '#ffffff',
};

export const layout = {
  screenPadding: 20,
  compactScreenPadding: 16,
  cardRadius: 8,
  tabHeight: 72,
  compactTabHeight: 66,
  navGap: Platform.OS === 'android' ? 30 : 20,
  topInset: Platform.OS === 'android' ? 30 : 44,
  androidTopInset: Platform.OS === 'android' ? 30 : 0,
  bottomInset: Platform.OS === 'android' ? 30 : 20,
};

export const typography = {
  title: 22,
  section: 18,
  body: 14,
  small: 12,
};

export const shadow = Platform.select({
  ios: {
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowRadius: 18,
    shadowOffset: {width: 0, height: 10},
  },
  android: {
    elevation: 8,
  },
  default: {},
});
