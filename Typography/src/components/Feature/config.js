import { Fonts } from '../../fonts';

function getStyles(typescale, viewport, typeSize) {
  return FeatureConfig[typescale][viewport][typeSize];
}

const FeatureConfig = {
  VDS: {
    desktop: {
      XLarge: {
        fontSize: 144,
        lineHeight: 136,
        fontWeight: '750',
        fontFamily: Fonts.VerizonNHGeDS,
      },
      large: {
        fontSize: 128,
        lineHeight: 120,
        fontWeight: '750',
        fontFamily: Fonts.VerizonNHGeDS,
      },
      medium: {
        fontSize: 96,
        lineHeight: 88,
        fontWeight: '750',
        fontFamily: Fonts.VerizonNHGeDS,
      },
      small: {
        fontSize: 80,
        lineHeight: 76,
        fontWeight: '750',
        fontFamily: Fonts.VerizonNHGeDS,
      },
      XSmall: {
        fontSize: 64,
        lineHeight: 64,
        fontWeight: '750',
        fontFamily: Fonts.VerizonNHGeDS,
      },
    },
    mobile: {
      XLarge: {
        fontSize: 96,
        lineHeight: 88,
        fontWeight: '750',
        fontFamily: Fonts.VerizonNHGeDS,
      },
      large: {
        fontSize: 80,
        lineHeight: 76,
        fontWeight: '750',
        fontFamily: Fonts.VerizonNHGeDS,
      },
      medium: {
        fontSize: 64,
        lineHeight: 64,
        fontWeight: '750',
        fontFamily: Fonts.VerizonNHGeDS,
      },
      small: {
        fontSize: 48,
        lineHeight: 48,
        fontWeight: '750',
        fontFamily: Fonts.VerizonNHGeDS,
      },
      XSmall: {
        fontSize: 40,
        lineHeight: 40,
        fontWeight: '750',
        fontFamily: Fonts.VerizonNHGeDS,
      },
    },
  },
  getStyles: getStyles,
};

export default FeatureConfig;
