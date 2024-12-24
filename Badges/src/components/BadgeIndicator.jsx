import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { calculateRem } from '@vds-core/utilities';
import { ColorTokens } from '@vds-tokens/color';
import { LayoutTokens } from '@vds-tokens/layout';
import { Fonts } from '@vds-core/typography';
import { TypographyTokens } from '@vds-tokens/typography';

const propTypes = {
  /**
   * Determines the type of badge indicator.
   */
  kind: PropTypes.oneOf(['simple', 'numbered']),
  /**
   * This prop is to provide the surface that the badge indicator will be placed on. This helps maintain proper color contrast ratio.
   */
  surface: PropTypes.oneOf(['light', 'dark']),
  /**
   * This prop is to provide the background color inside badge indicator
   */
  fillColor: PropTypes.oneOf([
    'red',
    'yellow',
    'green',
    'orange',
    'blue',
    'grayHighContrast',
    'grayLowContrast',
    'black',
    'white',
  ]),
  /**
   * Option to set any HEX value to badge indicator border color for both on light and dark.
   */
  borderColor: PropTypes.shape({
    onlight: PropTypes.string,
    ondark: PropTypes.string,
  }),
  /**
   * If set to true, the badge indicator will not have a border.
   */
  hideBorder: PropTypes.bool,
  /**
   * If set to true, the badge indicator will not have a dot.
   */
  hideDot: PropTypes.bool,
  /**
   * This prop takes a string or number that will render as the text inside of the badge indicator.
   */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Sets the container size of badge indicator, when the kind is 'simple'.
   */
  containerSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Sets the size of the dot inside the badge indicator, when the kind is 'simple'.
   */
  dotSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Sets the font styles and padding of the badge indicator children, when the kind is 'numbered'.
   */
  size: PropTypes.oneOf(['small', 'medium', 'large', 'XLarge', '2XLarge']),
  /**
   * Sets the paddings for badge indicator, when the kind is 'numbered'.
   */
  padding: PropTypes.shape({
    vertical: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    horizontal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  /**
   * Allows an id to be passed to the outermost wrapper of the component
   */
  id: PropTypes.string,
  /**
   * Sets the maximum number of digits to be displayed in badge indicator, when the kind is 'numbered'.
   */
  maximumDigits: PropTypes.oneOf([
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'none',
  ]),
  /**
   * Accepts any character to appear at the beginning of the children
   */
  leadingCharacter: PropTypes.string,
  /**
   * Accepts any text or character to appear at the end of the children
   */
  trailingText: PropTypes.string,
  /**
   * Hides content from assistive technology when set to true
   */
  ariaHidden: PropTypes.bool,
};

const defaultProps = {
  kind: 'simple',
  surface: 'light',
  fillColor: 'red',
  containerSize: '16px',
  dotSize: '4px',
  size: 'small',
  borderColor: {
    onlight: ColorTokens.palette.white.value,
    ondark: ColorTokens.palette.black.value,
  },
  hideBorder: false,
  hideDot: false,
  maximumDigits: 'two',
  leadingCharacter: '',
  trailingText: '',
};

const BadgeIndicatorWrapper = styled.div`
  display: flex;
`;

const StyledBadgeIndicator = styled.div`
  display: flex;
  background-color: ${({ fillColor, surface }) =>
    _getBackgroundColor(fillColor, surface)};

  height: ${({ containerSize }) => calculateRem(containerSize)};
  min-width: ${({ containerSize }) => calculateRem(containerSize)};
  border-radius: ${({ containerSize }) => calculateRem(containerSize)};
  justify-content: center;
  align-items: center;
  ${({ borderColor, hideBorder }) =>
    !hideBorder
      ? `
      box-shadow: 0 0 0 ${calculateRem(1)} ${borderColor};
      `
      : ``}
`;

const StyledDot = styled.div`
  background-color: ${({ fillColor, surface }) =>
    _getTextColor(fillColor, surface)};
  height: ${({ dotSize }) => calculateRem(dotSize)};
  width: ${({ dotSize }) => calculateRem(dotSize)};
  border-radius: ${({ dotSize }) => calculateRem(dotSize)};
`;

const StyledNumber = styled.div`
  font-family: ${({ size }) => _getFontFamily(size)};
  font-size: ${({ size }) => _getFontSize(size)};
  font-weight: ${TypographyTokens.fontweight.regular.value};
  letter-spacing: ${({ size }) => _getLetterSpacing(size)};
  line-height: ${({ size }) => _getLineHeight(size)};
  color: ${({ fillColor, surface }) => _getTextColor(fillColor, surface)};
  padding: ${({ padding }) => _getVerticalPadding(padding)}
    ${({ size, padding }) => _getHorizontalPadding(size, padding)};
`;

const TrailingTextWrapper = styled.span`
  white-space: nowrap;
`;

const _getBackgroundColor = (fillColor, surface) => {
  switch (fillColor) {
    case 'red':
      return ColorTokens.background.brandhighlight.value;
    case 'yellow':
      return ColorTokens.palette.yellow53.value;
    case 'green':
      return surface === 'light'
        ? ColorTokens.palette.green26.value
        : ColorTokens.palette.green36.value;
    case 'orange':
      return surface === 'light'
        ? ColorTokens.palette.orange41.value
        : ColorTokens.palette.orange58.value;
    case 'blue':
      return surface === 'light'
        ? ColorTokens.palette.blue38.value
        : ColorTokens.palette.blue46.value;
    case 'grayHighContrast':
      return surface === 'light'
        ? ColorTokens.palette.gray44.value
        : ColorTokens.palette.gray65.value;
    case 'grayLowContrast':
      return surface === 'light'
        ? ColorTokens.palette.gray85.value
        : ColorTokens.palette.gray20.value;
    case 'black':
      return ColorTokens.background.primary.dark.value;
    case 'white':
      return ColorTokens.background.primary.light.value;
    default:
      return ColorTokens.background.brandhighlight.value;
  }
};

const _getTextColor = (fillColor, surface) => {
  if (fillColor === 'red' || fillColor === 'black') {
    return ColorTokens.elements.primary.ondark.value;
  } else if (fillColor === 'yellow' || fillColor === 'white') {
    return ColorTokens.elements.primary.onlight.value;
  } else if (
    fillColor === 'green' ||
    fillColor === 'orange' ||
    fillColor === 'blue' ||
    fillColor === 'grayHighContrast'
  ) {
    return surface === 'light'
      ? ColorTokens.elements.primary.ondark.value
      : ColorTokens.elements.primary.onlight.value;
  } else if (fillColor === 'grayLowContrast') {
    return ColorTokens.elements.primary[`on${surface}`].value;
  } else return ColorTokens.elements.primary.ondark.value;
};

const _getFontFamily = textSize => {
  let fontFamily = 'Verizon-NHG-eTX';
  if (['medium', 'large', 'XLarge', '2XLarge'].includes(textSize)) {
    fontFamily = 'Verizon-NHG-eDS';
  }
  return fontFamily;
};

const _getFontSize = textSize => {
  switch (textSize) {
    case 'small':
      return calculateRem(TypographyTokens.fontsize.body[12].value);
    case 'medium':
      return calculateRem(TypographyTokens.fontsize.body[14].value);
    case 'large':
      return calculateRem(TypographyTokens.fontsize.body[16].value);
    case 'XLarge':
      return calculateRem(TypographyTokens.fontsize.title[20].value);
    case '2XLarge':
      return calculateRem(TypographyTokens.fontsize.title[24].value);
    default:
      return calculateRem(TypographyTokens.fontsize.body[12].value);
  }
};

const _getLetterSpacing = textSize => {
  let letterSpacing = calculateRem(0);
  if (['medium', 'large'].includes(textSize)) {
    letterSpacing = calculateRem(TypographyTokens.letterspacing.wide.value);
  }
  return letterSpacing;
};

const _getLineHeight = textSize => {
  switch (textSize) {
    case 'small':
      return calculateRem(12);
    case 'medium':
      return calculateRem(14);
    case 'large':
      return calculateRem(TypographyTokens.lineheight.body[16].value);
    case 'XLarge':
      return calculateRem(TypographyTokens.lineheight.title[20].value);
    case '2XLarge':
      return calculateRem(TypographyTokens.lineheight.title[24].value);
    default:
      return calculateRem(12);
  }
};

const _getVerticalPadding = padding => {
  return padding && padding.vertical
    ? calculateRem(padding.vertical)
    : calculateRem(2);
};

const _getHorizontalPadding = (textSize, padding) => {
  let leftRightPadding = calculateRem(LayoutTokens.space['1X'].value);
  if (['medium', 'large', 'XLarge'].includes(textSize)) {
    leftRightPadding = calculateRem(6);
  } else if (textSize === '2XLarge') {
    leftRightPadding = calculateRem(LayoutTokens.space['2X'].value);
  }
  return padding && padding.horizontal
    ? calculateRem(padding.horizontal)
    : leftRightPadding;
};

const BadgeIndicator = props => {
  const {
    kind,
    surface,
    fillColor,
    borderColor: borderColorProp,
    hideBorder,
    hideDot,
    children,
    containerSize,
    dotSize,
    size,
    padding,
    maximumDigits,
    leadingCharacter,
    trailingText,
    id,
    ariaHidden,
  } = props;

  const borderColor =
    surface === 'dark'
      ? borderColorProp &&
        borderColorProp.ondark &&
        borderColorProp.ondark.trim()
        ? borderColorProp.ondark
        : ColorTokens.palette.black.value
      : borderColorProp &&
        borderColorProp.onlight &&
        borderColorProp.onlight.trim()
      ? borderColorProp.onlight
      : ColorTokens.palette.white.value;

  const calculateNumber = () => {
    const maxNumberMap = {
      one: 9,
      two: 99,
      three: 999,
      four: 9999,
      five: 99999,
      six: 999999,
      none: 'none',
    };
    const maxNumber =
      maximumDigits && maxNumberMap[maximumDigits]
        ? maxNumberMap[maximumDigits]
        : 99;
    const parsed = parseInt(children) || 0;
    return parsed <= maxNumber || maxNumber === 'none'
      ? parsed.toLocaleString()
      : `${maxNumber.toLocaleString()}+`;
  };

  const calculateSize = () => {
    const havingVerticalPadding = padding && padding.vertical;
    const sizeMap = {
      small: havingVerticalPadding
        ? 12 + 2 * parseInt(havingVerticalPadding)
        : 16,
      medium: havingVerticalPadding
        ? 14 + 2 * parseInt(havingVerticalPadding)
        : 18,
      large: havingVerticalPadding
        ? 16 + 2 * parseInt(havingVerticalPadding)
        : 20,
      XLarge: havingVerticalPadding
        ? 20 + 2 * parseInt(havingVerticalPadding)
        : 24,
      '2XLarge': havingVerticalPadding
        ? 24 + 2 * parseInt(havingVerticalPadding)
        : 28,
    };

    switch (kind) {
      case 'simple':
        return containerSize ? containerSize : 16;
      case 'numbered':
        return size && sizeMap[size] ? sizeMap[size] : 16;
      default:
        return 16;
    }
  };

  return (
    <BadgeIndicatorWrapper>
      <StyledBadgeIndicator
        kind={kind}
        surface={surface}
        fillColor={fillColor}
        id={id}
        containerSize={calculateSize()}
        size={size}
        padding={padding}
        children={children}
        borderColor={borderColor}
        hideBorder={hideBorder}
        aria-hidden={ariaHidden}
      >
        {kind === 'numbered' ? (
          <StyledNumber
            data-testid="numberedDiv"
            size={size}
            padding={padding}
            surface={surface}
            fillColor={fillColor}
          >
            {leadingCharacter &&
            leadingCharacter.trim() &&
            leadingCharacter.trim().charAt(0)
              ? `${leadingCharacter.trim().charAt(0)}${calculateNumber()}`
              : calculateNumber()}
            {trailingText && trailingText.trim() && (
              <TrailingTextWrapper data-testid="trailingText">{` ${trailingText.trim()}`}</TrailingTextWrapper>
            )}
          </StyledNumber>
        ) : (
          !hideDot && (
            <StyledDot
              dotSize={parseInt(dotSize) ? dotSize : 4}
              surface={surface}
              fillColor={fillColor}
            />
          )
        )}
      </StyledBadgeIndicator>
    </BadgeIndicatorWrapper>
  );
};

BadgeIndicator.propTypes = propTypes;
BadgeIndicator.defaultProps = defaultProps;

export default BadgeIndicator;
