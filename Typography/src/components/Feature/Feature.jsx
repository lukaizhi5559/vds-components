import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withVDSManager } from '@vds-core/utilities';
import { TypographyTokens } from '@vds-tokens/typography';
import { ColorTokens } from '@vds-tokens/color';
import { Fonts } from '../../fonts';
import { Typography } from '../Typography';

const propTypes = {
  /**
   * Primitive used for the component.
   */
  primitive: PropTypes.oneOf([
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'a',
    'span',
    'p',
  ]),
  /**
   * Viewport the font styling is based on. Desktop and tablet are the same size.
   */
  viewport: PropTypes.oneOf(['desktop', 'tablet', 'mobile']),
  /**
   * Specifies the font size of the Feature.
   */
  size: PropTypes.oneOf(['XSmall', 'small', 'medium', 'large', 'XLarge']),
  /**
   * Text to be displayed.
   */
  children: PropTypes.node,
  /**
   * Adds an aria-labelledby attribute to the component
   */
  ariaLabelledBy: PropTypes.string,
  /**
   * Color of text to be displayed.
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
   * If selected, Feature will be rendered in bold styling.
   */
  bold: PropTypes.bool,
  /**
   * @ignore
   * Specifies the format for the Feature.
   */
  typescale: PropTypes.oneOf(['VDS', 'MVP']),
  /**
   * The tab index of the component.
   */
  tabIndex: PropTypes.number,
  /**
   * @ignore
   */
  regularWeight: PropTypes.oneOf(['regular', 'light']),
  /**
   * @ignore
   * The size of the text to be displayed.
   */
  fontSize: PropTypes.number,
  /**
   * @ignore
   * The height of the line.
   */
  lineHeight: PropTypes.number,
  /**
   * @ignore
   * The weight of the font.
   */
  fontWeight: PropTypes.string,
  /**
   * If passed, custom superscript styles will be applied to any <Super> child elements
   */
  superscriptSmall: PropTypes.bool,
  /**
   * @ignore
   */
  letterSpacing: PropTypes.string,
  /**
   * Assigns an testid to the component
   */
  'data-testid': PropTypes.string,
};

const defaultProps = {
  viewport: 'desktop',
  size: 'medium',
  children: null,
  color: ColorTokens.palette.black.value,
  bold: false,
  tabIndex: undefined,
  superscriptSmall: false,
  letterSpacing: null,
  regularWeight: 'light',
};

const primitiveMap = {
  XSmall: 'span',
  small: 'h5',
  medium: 'h4',
  large: 'h3',
  XLarge: 'h2',
  '2XLarge': 'h1',
};

const StyledFeature = styled(Typography)`
  &:active,
  &:hover {
    outline: none;
  }
`;

const Feature = props => {
  const {
    children,
    primitive,
    viewport,
    size,
    color,
    bold,
    typescale,
    tabIndex,
    superscriptSmall,
    regularWeight,
    letterSpacing,
    ariaLabelledBy,
    'data-testid': testId,
    ...rest
  } = props;

  const viewportToUse = viewport === 'mobile' ? 'mobile' : 'desktop';
  const fontSizeToUse =
    ['XSmall', 'small', 'large', 'medium', 'XLarge'].indexOf(size) > -1
      ? size
      : 'medium';

  const fontWeight = bold
    ? TypographyTokens.fontweight.bold.value
    : TypographyTokens.fontweight[regularWeight].value;

  const ls = letterSpacing
    ? letterSpacing
    : bold
    ? null
    : TypographyTokens.letterspacing.semiwide.value;
  const getFontSize = () => {
    switch (fontSizeToUse) {
      case 'XLarge':
        return viewportToUse === 'mobile' ? 96 : 144;
      case 'large':
        return viewportToUse === 'mobile' ? 80 : 128;
      case 'small':
        return viewportToUse === 'mobile' ? 48 : 80;
      case 'XSmall':
        return viewportToUse === 'mobile' ? 40 : 64;
      case 'medium':
      default:
        return viewportToUse === 'mobile' ? 64 : 96;
    }
  };

  const getLineHeight = () => {
    switch (fontSizeToUse) {
      case 'XLarge':
        return viewportToUse === 'mobile' ? 88 : 136;
      case 'large':
        return viewportToUse === 'mobile' ? 76 : 120;
      case 'small':
        return viewportToUse === 'mobile' ? 48 : 76;
      case 'XSmall':
        return viewportToUse === 'mobile' ? 40 : 64;
      case 'medium':
      default:
        return viewportToUse === 'mobile' ? 64 : 88;
    }
  };

  function mapChildren() {
    if (!children) return null;
    return React.Children.map(children, (child, index) => {
      if (
        child &&
        React.isValidElement(child) &&
        child.type &&
        child.type.displayName &&
        child.type.displayName === 'Super'
      ) {
        return React.cloneElement(child, {
          feature: true,
          fontSize: TypographyTokens.fontsize.feature[getFontSize()].value,
          superscriptSmall: superscriptSmall,
        });
      } else {
        return child;
      }
    });
  }

  return (
    <Fragment>
      <StyledFeature
        {...rest}
        fontFamily={Fonts.VerizonNHGeDS}
        fontWeight={fontWeight}
        fontSize={TypographyTokens.fontsize.feature[getFontSize()].value}
        lineheight={TypographyTokens.lineheight.feature[getLineHeight()].value}
        letterSpacing={ls}
        primitive={primitive ? primitive : primitiveMap[fontSizeToUse]}
        color={color}
        tabIndex={tabIndex}
        aria-labelledby={ariaLabelledBy}
        aria-hidden={tabIndex < 0}
        data-testid={testId}
      >
        {mapChildren()}
      </StyledFeature>
    </Fragment>
  );
};

Feature.propTypes = propTypes;
Feature.defaultProps = defaultProps;

export default withVDSManager(Feature);
