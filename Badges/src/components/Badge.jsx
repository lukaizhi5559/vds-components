import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { calculateRem } from '@vds-core/utilities';
import { ColorTokens } from '@vds-tokens/color';
import { Fonts } from '@vds-core/typography';
import { TypographyTokens } from '@vds-tokens/typography';

const propTypes = {
  /**
   * This will render the badges fill color based on the available options.
   * When used in conjunction with the surface prop, this fill color will change its tint automatically based on a light or dark surface.
   */
  fillColor: PropTypes.oneOf([
    'red',
    'yellow',
    'green',
    'orange',
    'blue',
    'black',
    'white',
  ]),
  /**
   * This prop is to provide the surface that the badge will be placed on. This helps maintain proper color contrast ratio.
   */
  surface: PropTypes.oneOf(['light', 'dark']),
  /**
   * this will restrict the badge height to a specific number of lines. If the text overflows the allowable space, ellipsis will show.
   */
  numberOfLines: PropTypes.number,
  /**
   * When applied, this prop takes a px value string that will restrict the width at that point.
   */
  maxWidth: PropTypes.string,
  /**
   * This prop takes a string that will render as the text inside of the badge.
   */
  children: PropTypes.string,
  /**
   * Allows an id to be passed to the outermost wrapper of the component
   */
  id: PropTypes.string,
};

const defaultProps = {
  fillColor: 'red',
  surface: 'light',
};

const variantFillColors = {
  green: {
    light: ColorTokens.palette.green26.value,
    dark: ColorTokens.palette.green36.value,
  },
  orange: {
    light: ColorTokens.palette.orange41.value,
    dark: ColorTokens.palette.orange58.value,
  },
  blue: {
    light: ColorTokens.palette.blue38.value,
    dark: ColorTokens.palette.blue46.value,
  },
};

const fillColors = {
  red: ColorTokens.background.brandhighlight.value,
  yellow: ColorTokens.palette.yellow53.value,
  black: ColorTokens.palette.black.value,
  white: ColorTokens.palette.white.value,
};

const StyledBadge = styled.div`
  display: inline-block;
  text-overflow: ellipsis;
  background-color: ${({ fillColor }) => fillColor};
  color: ${({ textColor }) => textColor};
  border-radius: 2px;
  font-family: ${Fonts.VerizonNHGeTX};
  font-size: ${calculateRem(TypographyTokens.fontsize.body[12].value)};
  font-weight: ${TypographyTokens.fontweight.bold.value};
  line-height: ${calculateRem(TypographyTokens.lineheight.body[16].value)};
  width: auto;
  height: auto;
  min-width: 23px;
  max-width: ${({ maxWidth }) => maxWidth};
  padding: 2px 4px;
  box-sizing: border-box;
  > div {
    ${({ maxWidth }) =>
      maxWidth
        ? css`
            margin: 0;
            display: -webkit-box;
            -webkit-line-clamp: ${({ numberOfLines }) => numberOfLines};
            -webkit-box-orient: vertical;
            overflow: hidden;
          `
        : css`
            margin: 0;
          `}
  }
`;

const Badge = props => {
  const { children, fillColor, surface, numberOfLines, maxWidth, id } = props;

  const _renderFillColor = () => {
    if (['green', 'orange', 'blue'].includes(fillColor))
      return variantFillColors[fillColor][surface];
    else return fillColors[fillColor];
  };

  const _renderTextColor = () => {
    switch (surface) {
      case 'light':
        if (['red', 'green', 'orange', 'blue', 'black'].includes(fillColor))
          return ColorTokens.palette.white.value;
        else return ColorTokens.palette.black.value;
      case 'dark':
        if (['red', 'black'].includes(fillColor))
          return ColorTokens.palette.white.value;
        else return ColorTokens.palette.black.value;
    }
  };

  return (
    <StyledBadge
      fillColor={_renderFillColor()}
      textColor={_renderTextColor()}
      surface={surface}
      numberOfLines={numberOfLines}
      maxWidth={maxWidth}
      id={id}
    >
      <div>{children}</div>
    </StyledBadge>
  );
};

Badge.propTypes = propTypes;
Badge.defaultProps = defaultProps;

export default Badge;
