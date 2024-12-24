import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Fonts } from '@vds-core/typography';
import { withVDSManager, calculateRem } from '@vds-core/utilities';
import { ColorTokens } from '@vds-tokens/color';
import { LayoutTokens } from '@vds-tokens/layout';
import { TypographyTokens } from '@vds-tokens/typography';

// Style properties
const colorDefault = ColorTokens.elements.primary.onlight.value;
const colorInverted = ColorTokens.elements.primary.ondark.value;

const fontweightBold = TypographyTokens.fontweight.bold.value;
const fontweightRegular = TypographyTokens.fontweight.regular.value;

const paddingTopBodyLargeStandard = calculateRem(
  LayoutTokens.space['4X'].value
);
const paddingTopBodySmallStandard = calculateRem(
  LayoutTokens.space['3X'].value
);

const paddingTopBodyLargeCompact = calculateRem(LayoutTokens.space['2X'].value);
const paddingTopBodySmallCompact = calculateRem(LayoutTokens.space['1X'].value);

const paddingBulletBodyLarge = calculateRem(LayoutTokens.space['3X'].value);
const paddingBulletBodySmall = calculateRem(LayoutTokens.space['2X'].value);

const paddingNestedBulletBodyLarge = calculateRem(19);
const paddingNestedBulletBodySmall = calculateRem(14);

const propTypes = {
  /**
   * Represents text within a ListItem.
   */
  children: PropTypes.node,
  /**
   * @ignore Determines the font size, line height, font family and font weight of the List item.
   */
  size: PropTypes.oneOf(['micro', 'bodySmall', 'bodyMedium', 'bodyLarge']),
  /**
   * Determines whether mobile, or desktop fontstacks are used.
   */
  viewport: PropTypes.oneOf(['mobile', 'tablet', 'desktop']),
  /**
   * If provided, used as string that labels the element for accessibility.
   */
  ariaLabel: PropTypes.string,
  /**
   * @ignore
   */
  orderedList: PropTypes.bool,
  /**
   * @ignore
   */
  tabIndex: PropTypes.number,
  /**
   * @ignore
   */
  surface: PropTypes.oneOf(['light', 'dark']),
  /**
   * Determnines the spacing bewtween the list items
   */
  spacing: PropTypes.oneOf(['standard', 'compact']),
  /**
   * @ignore
   */
  calculateLetterSpacing: PropTypes.func,
};

const _calculateLetterSpacing = (size, viewport) => {
  let letterSpacing = '0px';
  if (
    (size === 'bodyLarge' || size === 'bodyMedium') &&
    viewport === 'desktop'
  ) {
    letterSpacing = TypographyTokens.letterspacing.wide.value;
  }
  return letterSpacing;
};

const defaultProps = {
  orderedList: false,
  size: 'bodyLarge',
  viewport: 'desktop',
  surface: 'light',
  calculateLetterSpacing: _calculateLetterSpacing,
};

const StyledLi = styled.li`
  ${({ getFontStyles, size, viewport }) => getFontStyles(size, viewport)};
  color: ${({ surface }) =>
    surface === 'dark' ? colorInverted : colorDefault};
  outline: none;
  list-style: none;
  padding-top: ${({ paddingTop }) => paddingTop};
  display: flex;

  > span {
    flex: 0 1 auto;
  }

  &:first-child {
    padding-top: 0;
  }

  > span:first-child {
    &:before {
      content: '\u2022';
      font-weight: ${fontweightBold};
      padding-right: ${({ paddingBullet }) => paddingBullet};
      flex-grow: 0;
    }
  }

  ul {
    padding: 0;
    margin: 0;
    flex-shrink: 0;

    li {
      list-style: none;

      &:first-child {
        padding-top: ${({ paddingTop }) => paddingTop};
      }

      > span:first-child {
        &::before {
          content: '\u2013';
          font-weight: ${fontweightRegular};
        }
      }
    }
  }
`;

const ListItem = props => {
  const {
    ariaLabel,
    children,
    size,
    viewport: vp,
    tabIndex,
    surface,
    className,
    calculateLetterSpacing,
    spacing,
  } = props;

  const viewport = vp === 'mobile' ? 'mobile' : 'desktop';

  const paddingTopStandard =
    size === 'bodyLarge'
      ? paddingTopBodyLargeStandard
      : paddingTopBodySmallStandard;

  const paddingTopCompact =
    size === 'bodyLarge'
      ? paddingTopBodyLargeCompact
      : paddingTopBodySmallCompact;

  const paddingBullet =
    size === 'bodyLarge' ? paddingBulletBodyLarge : paddingBulletBodySmall;

  const _getFontSize = () => {
    switch (size) {
      case 'micro':
        return TypographyTokens.fontsize.micro[11].value;
      case 'bodySmall':
        return TypographyTokens.fontsize.body[12].value;
      case 'bodyMedium':
        return TypographyTokens.fontsize.body[14].value;
      case 'bodyLarge':
        return TypographyTokens.fontsize.body[16].value;
    }
  };

  const _getLineHeight = () => {
    switch (size) {
      case 'micro':
        return TypographyTokens.lineheight.micro[16].value;
      case 'bodySmall':
        return TypographyTokens.lineheight.body[16].value;
      case 'bodyMedium':
        return TypographyTokens.lineheight.body[18].value;
      case 'bodyLarge':
        return TypographyTokens.lineheight.body[20].value;
    }
  };

  function _getFontStyles() {
    return `
    font-family: ${
      size === 'bodyLarge' || size === 'bodyMedium'
        ? Fonts.VerizonNHGeDS
        : Fonts.VerizonNHGeTX
    };
    font-size: ${calculateRem(_getFontSize())};
      font-weight: ${TypographyTokens.fontweight.regular.value};
      line-height: ${calculateRem(_getLineHeight())};
      letter-spacing: ${calculateRem(calculateLetterSpacing(size, viewport))};
    `;
  }

  return (
    <StyledLi
      aria-label={ariaLabel}
      getFontStyles={_getFontStyles}
      size={size}
      tabIndex={tabIndex}
      viewport={viewport}
      surface={surface}
      className={className}
      paddingTop={
        spacing === 'compact' ? paddingTopCompact : paddingTopStandard
      }
      paddingBullet={paddingBullet}
    >
      <span aria-hidden />
      <span>{children}</span>
    </StyledLi>
  );
};

ListItem.propTypes = propTypes;
ListItem.defaultProps = defaultProps;
ListItem.displayName = 'ListItem';

export default withVDSManager(ListItem);
