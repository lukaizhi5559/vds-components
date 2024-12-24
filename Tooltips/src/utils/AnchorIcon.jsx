import React, { Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ColorTokens } from '@vds-tokens/color';
import { calculateRem } from '@vds-core/utilities';

// Use icon.svg
const InfoIconRegular = (
  <svg
    id="Layer_1"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 21.6 21.6"
  >
    <path d="M19.8,10.8a9,9,0,1,0-9,9A9.01054,9.01054,0,0,0,19.8,10.8Zm-1.12488,0A7.87513,7.87513,0,1,1,10.8,2.92486,7.88411,7.88411,0,0,1,18.67509,10.8ZM11.625,7.45852H9.95v-1.675h1.675ZM9.95834,9.11662H11.65v6.6999H9.95834Z" />
  </svg>
);

// Use icon-bold.svg
const InfoBoldIcon = (
  <svg
    id="Layer_1"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 21.6 21.6"
  >
    <path d="M10.80011,1.36129a9.43848,9.43848,0,1,0,9.43848,9.43848A9.43847,9.43847,0,0,0,10.80011,1.36129Zm0,16.877a7.43848,7.43848,0,1,1,7.43848-7.43848A7.43849,7.43849,0,0,1,10.80011,18.23825ZM11.625,7.45849H9.95V5.78344h1.675ZM9.95834,9.11663H11.65v6.69989H9.95834Z" />
  </svg>
);

function _calculateActiveColor(surface, iconFillColor) {
  switch (iconFillColor) {
    case 'secondary':
      return surface === 'dark'
        ? ColorTokens.palette.gray44.value
        : ColorTokens.palette.gray65.value;
    case 'primary':
    case 'brandHighlight':
    default:
      return ColorTokens.interactive.active[`on${surface}`].value;
  }
}

function _getIconColor(iconFillColor, active, disabled, surface) {
  const isBrandColor =
    iconFillColor === 'primary' ||
    iconFillColor === 'secondary' ||
    iconFillColor === 'brandHighlight';

  if (!active && !disabled && isBrandColor) {
    return iconFillColor === 'brandHighlight'
      ? ColorTokens.elements.brandhighlight.value
      : ColorTokens.elements[iconFillColor][`on${surface}`].value;
  } else if (!active && !disabled && !isBrandColor) {
    return iconFillColor;
  } else if (active) {
    return _calculateActiveColor(surface, iconFillColor);
  } else if (disabled) {
    return ColorTokens.interactive.disabled[`on${surface}`].value;
  }
}

const propTypes = {
  size: PropTypes.oneOf(['small', 'medium']),
  surface: PropTypes.oneOf(['light', 'dark']),
  focused: PropTypes.bool,
  iconFillColor: PropTypes.oneOfType([
    PropTypes.oneOf(['primary', 'secondary', 'brandHighlight']),
    PropTypes.string,
  ]),
  /**
   * @ignore
   */
  getIconColor: PropTypes.func,
};

const defaultProps = {
  size: 'medium',
  surface: 'light',
  focused: false,
  getIconColor: _getIconColor,
};

const IconSVGWrapper = styled.div`
  display: flex;
  height: ${({ iconSize }) => calculateRem(iconSize)};
  width: ${({ iconSize }) => calculateRem(iconSize)};
  min-height: ${({ iconSize }) => calculateRem(iconSize)};
  min-width: ${({ iconSize }) => calculateRem(iconSize)};
  ${({ tabIndex }) =>
    tabIndex < 0 &&
    `
    outline: none;
    pointer-events: none;
  `};
  &:active,
  &:focus {
    outline: none;
  }
  svg {
    height: ${({ iconSize }) => calculateRem(iconSize)};
    width: ${({ iconSize }) => calculateRem(iconSize)};
    path {
      fill: ${({ iconColor }) => iconColor};
    }
  }
`;

/**
 * @ignore
 */
const renderIcon = props => {
  const {
    showDialog,
    surface,
    hovered,
    clicked,
    focused,
    active,
    disabled,
    ariaLabel,
    iconFillColor,
    size,
    getIconColor,
    ...rest
  } = props;

  const isIconBold = (showDialog || clicked) && !disabled;

  const _getIconSize = () => {
    switch (size) {
      case 'small':
        return 16;
      case 'medium':
      default:
        return 20;
    }
  };

  return (
    <IconSVGWrapper
      tabIndex={-1}
      iconSize={_getIconSize()}
      iconColor={getIconColor(iconFillColor, active, disabled, surface)}
      aria-label={ariaLabel}
      aria-hidden={true}
    >
      {isIconBold ? InfoBoldIcon : InfoIconRegular}
    </IconSVGWrapper>
  );
};

/**
 * @ignore
 */
const AnchorIcon = props => {
  return <Fragment>{renderIcon(props)}</Fragment>;
};

AnchorIcon.propTypes = propTypes;
AnchorIcon.defaultProps = defaultProps;

export default AnchorIcon;
