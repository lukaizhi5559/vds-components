import { ColorTokens } from '@vds-tokens/color';
import PropTypes from 'prop-types';
import React from 'react';
import { calculateRem } from '@vds-core/utilities';
import styled from 'styled-components';

export const propTypes = {
  /**
   * @ignore
   * Size of the icon.
   */
  size: PropTypes.oneOfType([
    PropTypes.oneOf(['small', 'medium', 'large', 'XLarge']),
    PropTypes.string,
    PropTypes.number,
  ]),
  /**
   * @ignore
   * Color of the icon.
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
  ]),
  /**
   * @ignore
   */
  surface: PropTypes.oneOf(['light', 'dark']),
  /**
   * @ignore
   * Allows a unique ID to be passed to the component.
   */
  id: PropTypes.string,
  /**
   * @ignore
   * Hides content from assistive technology when set to true
   */
  ariaHidden: PropTypes.bool,
  /**
   * @ignore
   */
  ariaLabel: PropTypes.string,
};

export const defaultProps = {
  size: 'medium',
  color: ColorTokens.elements.primary.onlight.value,
  surface: 'light',
  ariaHidden: false,
};

const StyledSVG = styled.svg`
  display: inline-block;
  height: ${({ iconHeight }) => calculateRem(iconHeight)};
  width: ${({ iconWidth }) => calculateRem(iconWidth)};
  min-height: ${({ iconHeight }) => calculateRem(iconHeight)};
  min-width: ${({ iconWidth }) => calculateRem(iconWidth)};
  &:active,
  &:focus {
    outline: none;
  }
`;

const getIconSize = size => {
  switch (size) {
    case 'XLarge':
      return 28;
    case 'large':
      return 24;
    case 'small':
      return 16;
    case 'medium':
      return 20;
    default:
      return size ? size : 20;
  }
};

export const IconBase = props => {
  let {
    ariaHidden,
    ariaLabel,
    size,
    surface,
    id,
    tabIndex,
    iconName,
    viewBox,
    svgContent,
    color,
  } = props;

  const newAriaLabel = ariaLabel ? ariaLabel : `${iconName} icon`;

  return (
    <StyledSVG
      id={id}
      role="img"
      aria-hidden={ariaHidden}
      aria-label={newAriaLabel}
      alt-text={newAriaLabel}
      tabIndex={tabIndex}
      //Passing rem values through to styled component keeps firefox and safari happy
      iconWidth={getIconSize(size)}
      iconHeight={getIconSize(size)}
      viewBox={viewBox}
      surface={surface}
      fill={color}
    >
      {!ariaHidden && <title>{newAriaLabel}</title>}
      {svgContent}
    </StyledSVG>
  );
};

IconBase.propTypes = propTypes;
IconBase.defaultProps = defaultProps;
