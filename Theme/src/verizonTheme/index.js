import { calculateRem } from '@vds-core/utilities';
import colors from './colors';
import font from './font';

const general = {
  // General
  primary: colors.black,
  secondary: colors.white,
  accent: colors.red,
  background: colors.white,
  backgroundColorDisabled: colors.coolGray3,

  // Messaging Types
  success: colors.green,
  info: colors.blue,
  warning: colors.yellow,
  error: colors.orange,
  disabled: colors.coolGray3,
  textColorSuccess: colors.white,
  textColorInfo: colors.white,
  textColorWarning: colors.black,
  textColorError: colors.black,
  textColorDisabled: colors.white,

  // Borders
  borderWidth: calculateRem(1),
  borderStyle: 'solid',
  borderColor: colors.coolGray3,
  border: `${calculateRem(1)} solid ${colors.coolGray3}`,
  borderColorDisabled: colors.coolGray3,

  // Links
  linkColor: colors.black,
  linkColorHover: colors.blue,
  linkColorActive: colors.blue,
  linkDecoration: 'underline',

  // Transitions
  transitionDuration: '0.2s',

  // Horizontal Rule
  hrPrimary: `${calculateRem(4)} solid ${colors.charcoal}`,
  hrSecondary: `${calculateRem(1)} solid ${colors.charcoal}`,
  hrTertiary: `${calculateRem(1)} solid ${colors.coolGray3}`,
};

export default {
  name: 'Verizon Theme',
  ...colors,
  ...font,
  ...general,
};
