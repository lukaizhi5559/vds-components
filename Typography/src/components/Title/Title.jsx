import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TypographyTokens } from '@vds-tokens/typography';
import { ColorTokens } from '@vds-tokens/color';
import { withVDSManager } from '@vds-core/utilities';
import { Fonts } from '../../fonts';
import { Typography } from '../Typography';
const TITLE_SIZES = ['small', 'medium', 'large', 'XLarge', '2XLarge'];

const propTypes = {
  /**
   * Primitive used for the component.
   */
  primitive: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'p']),
  /**
   * Viewport the font styling is based on. Desktop and tablet are the same size.
   */
  viewport: PropTypes.oneOf(['desktop', 'mobile', 'tablet']),
  /**
   * Size of the typescale that will be used.
   */
  size: PropTypes.oneOf(['small', 'medium', 'large', 'XLarge', '2XLarge']),
  /**
   * Content that will be passed to the component.
   */
  children: PropTypes.node,
  /**
   * Color of the text.
   */
  color: PropTypes.oneOf([
    '#000000',
    '#FFFFFF',
    '#ffffff',
    '#EE0000',
    '#ee0000',
    '#F6F6F6',
    '#f6f6f6',
    '#D8DADA',
    '#d8dada',
    '#A7A7A7',
    '#a7a7a7',
    '#6F7171',
    '#6f7171',
    '#333333',
    '#1B1D1F',
    '#1b1d1f',
    '#ffece0',
    '#FFECE0',
    '#ffcaaa',
    '#FFCAAA',
    '#ffa46d',
    '#FFA46D',
    '#ff8027',
    '#FF8027',
    '#b95319',
    '#B95319',
    '#732706',
    '#561701',
    '#fff9de',
    '#FFF9DE',
    '#fff4bc',
    '#FFF4BC',
    '#ffe97a',
    '#FFE97A',
    '#fed60e',
    '#FED60E',
    '#bc9f0a',
    '#BC9f0A',
    '#635305',
    '#4b3f04',
    '#4B3F04',
    '#e3f2fd',
    '#E3F2FD',
    '#aad8f9',
    '#AAD8F9',
    '#4aabf2',
    '#4AABF2',
    '#0089ec',
    '#0089EC',
    '#006fc1',
    '#006FC1',
    '#003e6c',
    '#003E6C',
    '#002c4d',
    '#002C4D',
    '#dcf5e6',
    '#DCF5E6',
    '#a4e6bd',
    '#A4E6BD',
    '#63d48e',
    '#63D48E',
    '#00b845',
    '#00B845',
    '#008331',
    '#004b1c',
    '#004B1C',
    '#003514',
    '#febfe8',
    '#FEBFE8',
    '#fc89d5',
    '#FC89D5',
    '#fb42bc',
    '#FB42BC',
    '#b9318b',
    '#B9318B',
    '#671b4e',
    '#671B4E',
    '#edb9fb',
    '#EDB9FB',
    '#e084f9',
    '#E084F9',
    '#ce3df5',
    '#CE3DF5',
    '#84279e',
    '#84279E',
    '#461553',
    '#FBE4D7', // EOL
    '#fbe4d7', // EOL
    '#ED7000', // EOL
    '#ed7000', // EOL
    '#C44904', // EOL
    '#c44904', // EOL
    '#4A1C02', // EOL
    '#4a1c02', // EOL
    '#FFF4E0', // EOL
    '#fff4e0', // EOL
    '#FFBC3D', // EOL
    '#ffbc3d', // EOL
    '#523C14', // EOL
    '#523c14', // EOL
    '#D6EEFB', // EOL
    '#d6eefb', // EOL
    '#0096E4', // EOL
    '#0096e4', // EOL
    '#0077B4', // EOL
    '#0077b4', // EOL
    '#002B42', // EOL
    '#002b42', // EOL
    '#D6F2E0', // EOL
    '#d6f2e0', // EOL
    '#00AC3E', // EOL
    '#00ac3e', // EOL
    '#008330', // EOL
    '#003614', // EOL
    '#747676', // EOL BRand1.0 Coolgray6
  ]),
  /**
   * @ignore
   * If enabled, Title will be rendered in bold
   */
  bold: PropTypes.bool,
  /**
   * The tabIndex of the text.
   */
  tabIndex: PropTypes.number,
  /**
   * @ignore
   */
  regularWeight: PropTypes.oneOf(['regular', 'light']),
  /**
   * Assigns an Id to the component
   */
  id: PropTypes.string,
  /**
   * Assigns an testid to the component
   */
  'data-testid': PropTypes.string,
  /**
   * Adds an aria-labelledby attribute to the component
   */
  ariaLabelledBy: PropTypes.string,
  /**
   * @ignore
   */
  letterSpacing: PropTypes.string,
};

const defaultProps = {
  viewport: 'desktop',
  size: 'small',
  children: null,
  color: ColorTokens.palette.black.value,
  bold: false,
  letterSpacing: null,
  lineHeight: null,
  fontSize: null,
};

const primitiveMap = {
  small: 'h5',
  medium: 'h4',
  large: 'h3',
  XLarge: 'h2',
  '2XLarge': 'h1',
};

const StyledTitle = styled(Typography)`
  &:active,
  &:focus,
  &:hover {
    outline: none;
  }
`;

const Title = props => {
  const {
    children,
    primitive: primitiveProp,
    viewport,
    size,
    color,
    bold,
    tabIndex,
    id,
    ariaLabelledBy,
    fontSize,
    lineHeight,
    letterSpacing,
    regularWeight,
    'data-testid': testId,
  } = props;

  const viewportToUse = viewport === 'mobile' ? 'mobile' : 'desktop';
  const fontSizeToUse = TITLE_SIZES.indexOf(size) > -1 ? size : 'small';

  function _setWeight() {
    if (bold) {
      return TypographyTokens.fontweight.bold.value;
    } else if (regularWeight) {
      return TypographyTokens.fontweight[regularWeight].value;
    } else {
      if (
        size === 'small' ||
        size === 'medium' ||
        (size === 'large' && viewportToUse === 'mobile')
      ) {
        return TypographyTokens.fontweight.regular.value;
      } else {
        return TypographyTokens.fontweight.light.value;
      }
    }
  }

  const ls = letterSpacing
    ? letterSpacing
    : bold ||
      (size === 'medium' || size === 'small') ||
      (size === 'large' && viewport === 'mobile')
    ? null
    : TypographyTokens.letterspacing.semiwide.value;
  function _setPrimitive() {
    if (fontSizeToUse) {
      return primitiveMap[fontSizeToUse];
    } else {
      return 'h5';
    }
  }

  let primitive = primitiveProp ? primitiveProp : _setPrimitive();

  const getFontSize = () => {
    switch (fontSizeToUse) {
      case '2XLarge':
        return viewportToUse === 'mobile' ? 40 : 64;
      case 'XLarge':
        return viewportToUse === 'mobile' ? 32 : 48;
      case 'large':
        return viewportToUse === 'mobile' ? 24 : 32;
      case 'medium':
        return viewportToUse === 'mobile' ? 20 : 24;
      case 'small':
      default:
        return viewportToUse === 'mobile' ? 16 : 20;
    }
  };

  const getLineHeight = () => {
    switch (fontSizeToUse) {
      case '2XLarge':
        return viewportToUse === 'mobile' ? 40 : 64;
      case 'XLarge':
        return viewportToUse === 'mobile' ? 36 : 48;
      case 'large':
        return viewportToUse === 'mobile' ? 28 : 36;
      case 'medium':
        return viewportToUse === 'mobile' ? 24 : 28;
      case 'small':
      default:
        return viewportToUse === 'mobile' ? 20 : 24;
    }
  };

  return (
    <StyledTitle
      fontSize={
        fontSize
          ? fontSize
          : TypographyTokens.fontsize.title[getFontSize()].value
      }
      fontWeight={_setWeight()}
      fontFamily={Fonts.VerizonNHGeDS}
      lineheight={
        lineHeight
          ? lineHeight
          : TypographyTokens.lineheight.title[getLineHeight()].value
      }
      letterSpacing={ls}
      primitive={primitive}
      color={color}
      tabIndex={tabIndex}
      aria-hidden={tabIndex < 0}
      id={id}
      aria-labelledby={ariaLabelledBy}
      data-testid={testId}
    >
      {children}
    </StyledTitle>
  );
};

Title.propTypes = propTypes;
Title.defaultProps = defaultProps;

export default withVDSManager(Title);
