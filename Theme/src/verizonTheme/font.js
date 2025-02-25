import { calculateRem } from '@vds-core/utilities';
import colors from './colors';

const fontFamilies = {
  fontFamily: '"BrandFont-Text", Helvetica, Arial, sans-serif',
  monospace: '"SFMono-Regular", "RobotoMono-Regular", monospace',
  sans:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  serif: 'serif',
  iconFontUrl:
    'https://respframework.verizon.com/fonts/verizon-icons/fonts.css',
  iconFont: 'verizon-icons',
};

const fontStyles = {
  fontColor: colors.black,
  fontColorAlt: colors.white,
  fontSize: calculateRem(16),
};

const fontWeights = {
  light: 300,
  normal: 400,
  medium: 500,
  bold: 700,
};

export default {
  ...fontFamilies,
  ...fontStyles,
  fontWeights,
  fontHeader: fontFamilies.fontFamily,
  fontBody: fontFamilies.sans,
  fontWeight: fontWeights,
};
