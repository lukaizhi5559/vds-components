import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Fonts } from '@vds-core/typography';
import {
  withVDSManager,
  calculateRem,
  checkIfMobileDevice,
} from '@vds-core/utilities';
import { AccessibilityTokens } from '@vds-tokens/accessibility';
import { ColorTokens } from '@vds-tokens/color';
import { LayoutTokens } from '@vds-tokens/layout';
import { TypographyTokens } from '@vds-tokens/typography';

function _calculateButtonHeight() {
  return 'auto';
}

function _calculateMinWidth(size) {
  if (size === 'large') {
    return calculateRem(76);
  }
  return undefined;
}

function _calculateBorderRadius(size) {
  let borderRadius;
  if (size === 'small') {
    borderRadius = 32;
  } else {
    borderRadius = 44;
  }

  return calculateRem(borderRadius);
}

function _calculateSideMargin(size, width) {
  let sideMargin, verticalMargin;
  if (size === 'small') {
    sideMargin =
      width === 'autoTight'
        ? LayoutTokens.space['3X'].value
        : LayoutTokens.space['4X'].value;
    verticalMargin = LayoutTokens.space['2X'].value;
  } else {
    sideMargin =
      width === 'autoTight'
        ? LayoutTokens.space['5X'].value
        : LayoutTokens.space['6X'].value;
    verticalMargin = LayoutTokens.space['3X'].value;
  }
  return `calc(${calculateRem(verticalMargin)} - 1px) ${calculateRem(
    sideMargin
  )}`;
}

const propTypes = {
  /**
   * @ignore
   */
  use: PropTypes.oneOf(['primary', 'secondary']),
  /**
   * Accepts a string value to render as the text inside button.
   */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
  /**
   *  Button can no longer receive tab navigation focus if -1 is passed.
   */
  tabIndex: PropTypes.number,
  /**
   * This will be applied to the role attribute for screen reading capabilities
   */
  role: PropTypes.oneOf(['link', 'button']),
  /**
   * If true, button will render as disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Callback function executed when button is clicked.
   */
  onClick: PropTypes.func,
  /**
   * Accepts small or large and renders the associated button size.
   */
  size: PropTypes.oneOf(['small', 'large']),
  /**
   * Accepts a string or number value if rendering the button at a fixed size.
   */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Changes the display property of the button.  Accepts flex, inline-block and block.
   */
  display: PropTypes.oneOf(['flex', 'inline-block', 'block']),
  /**
   * Aria label used for the button.
   */
  ariaLabel: PropTypes.string,
  /**
   * @ignore
   */
  calculateButtonHeight: PropTypes.func,
  /**
   * @ignore
   */
  calculateBorderRadius: PropTypes.func,
  /**
   * @ignore
   */
  calculateSideMargin: PropTypes.func,
  /**
   * @ignore
   */
  smallButtonPadding: PropTypes.bool,
  /**
   * @ignore
   */
  surface: PropTypes.oneOf(['light', 'dark']),
  /**
   * Allows a string to be provided for analytics.
   */
  'data-analyticstrack': PropTypes.string,
  /**
   * Allows a string to be provided for analytics.
   */
  'data-track': PropTypes.string,
  /**
   * Allows a string to be provided for ignoring analytics tagging.
   */
  'data-track-ignore': PropTypes.string,
  /**
   * Allows a string to be provided for click stream.
   */
  'data-clickstream': PropTypes.string,
  /**
   * @ignore
   */
  dataLoc: PropTypes.string,
  /**
   * Allows a string to be provided for analytics tagging.
   */
  'data-sitecat-level': PropTypes.string,
  /**
   * Allows a string to be provided for analytics tagging.
   */
  'data-sitecat-position': PropTypes.string,
  /**
   * Allows a string to be provided for analytics tagging.
   */
  'data-sitecat-datatrack': PropTypes.string,
  /**
   * Allows a string to be provided for analytics tagging.
   */
  'data-sitecat-cta': PropTypes.string,
  /**
   * If provided, button primitive becomes an anchor, with the given href attribute.
   */
  href: PropTypes.string,
  /**
   * Allows an id to be passed to the button
   */
  id: PropTypes.string,
};

const defaultProps = {
  use: 'primary',
  disabled: false,
  size: 'large',
  display: 'flex',
  width: 'auto',
  surface: 'light',
  onClick: undefined,
  calculateButtonHeight: _calculateButtonHeight,
  calculateMinWidth: _calculateMinWidth,
  calculateBorderRadius: _calculateBorderRadius,
  calculateSideMargin: _calculateSideMargin,
  smallButtonPadding: true,
};

/**
 * @component
 * */

const HitArea = styled.span`
  height: ${calculateRem(44)};
  width: 100%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  text-align: center;
  top: 50%;
  content: '';
  display: inline-block;
  /*  pointer-events: none;  pointer-events is added here to ensure the correct item is returned by the onclick handler */
  &:hover {
    cursor: pointer;
  }
`;

/* 
This must be display: inline-block to allow for overflow ellipsis to show. 
Padding top/bottom is necessary for text to be centered within button. 
StyledChildWrapper needs to have 100% height because it needs to be the click event target element
*/
const StyledChildWrapper = styled.span`
  position: relative;
  max-width: 100%;
  box-sizing: border-box;
  display: inline-block;
  vertical-align: middle;
  align-items: center;
  background: transparent;
  justify-content: center;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  -webkit-tap-highlight-color: transparent;
  pointer-events: none; /* pointer-events is added here to ensure the correct item is returned by the onclick handler */
  &:focus {
    outline: none;
  }
  ${({ size, width, calculateSideMargin }) => {
    switch (size) {
      case 'small':
        return `
          padding: ${calculateSideMargin(size, width)};
        `;
      case 'block':
        return `
          display: block;
          padding: ${calculateSideMargin(size, width)};
        `;
      default:
        return `
          padding: ${calculateSideMargin(size, width)};
        `;
    }
  }};
  &:hover {
    outline: none;
    border: none;
  }
`;

const findWidth = width => {
  if (typeof width === 'string') return width;
  return calculateRem(width);
};

const buttonStyles = css`
  pointer-events: auto;
  padding: 0;
  margin: 0;
  border-width: ${calculateRem(1)};
  border-radius: ${({ calculateBorderRadius, size }) =>
    calculateBorderRadius(size)};
  box-sizing: border-box;
  cursor: pointer;
  display: ${({ display }) => display};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: ${calculateRem(TypographyTokens.fontsize.body[16].value)};
  line-height: ${calculateRem(TypographyTokens.lineheight.body[20].value)};
  font-family: ${Fonts.VerizonNHGeDS};
  font-weight: ${TypographyTokens.fontweight.bold.value};
  height: ${({ calculateButtonHeight, size }) => calculateButtonHeight(size)};
  position: relative;
  text-align: center;
  text-decoration: none;
  touch-action: ${({ disabled }) => (disabled ? 'none' : 'manipulation')};
  pointer-events: ${({ disabled }) => disabled && 'none'};
  vertical-align: middle;
  width: ${({ width }) => findWidth(width)};
  min-width: ${({ calculateMinWidth, size }) => calculateMinWidth(size)};
  outline: none;
  -webkit-tap-highlight-color: transparent;
  ${({ size }) => {
    if (size === 'block') {
      return `
        display: block;
        width: 100%;
      `;
    } else if (size === 'small') {
      return `
        font-size: ${calculateRem(TypographyTokens.fontsize.body[12].value)};
        line-height: ${calculateRem(
          TypographyTokens.lineheight.body[16].value
        )};
        font-weight: ${TypographyTokens.fontweight.bold.value};
        white-space: nowrap;
        font-family: ${Fonts.VerizonNHGeTX};
      `;
    } else {
      return `
        white-space: nowrap;
        font-weight: ${TypographyTokens.fontweight.bold.value};
        letter-spacing: ${calculateRem(
          TypographyTokens.letterspacing.wide.value
        )};
      `;
    }
  }};
  background-color: ${({ secondary }) =>
    secondary ? 'transparent' : ColorTokens.background.primary.dark.value};
  border: ${calculateRem(1)} solid ${ColorTokens.elements.primary.onlight.value};
  color: ${({ secondary }) =>
    secondary
      ? ColorTokens.elements.primary.onlight.value
      : ColorTokens.elements.primary.ondark.value};
  ${({
    disabled,
    surface,
    secondary,
    calculateBorderRadius,
    size,
    isMobileDevice,
  }) =>
    !disabled &&
    `
     &:focus:not(:hover) {
      outline: none;
      &::before {
        border-color: ${
          surface === 'dark'
            ? AccessibilityTokens.color.focusring.ondark.value
            : AccessibilityTokens.color.focusring.onlight.value
        };
        border: ${calculateRem(
          AccessibilityTokens.focusring.borderwidth.value
        )} ${AccessibilityTokens.focusring.borderstyle.value} ${
      surface === 'dark'
        ? AccessibilityTokens.color.focusring.ondark.value
        : AccessibilityTokens.color.focusring.onlight.value
    };
        border-radius: ${calculateBorderRadius(size)};
        content: '';
        height: calc(100% + ${calculateRem(6)});
        left: 50%;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        width: calc(100% + ${calculateRem(6)});     
      }
      &:focus:not(:focus-visible) {
          &::before {
            border: none; 
          }
      }
    }
      &:hover:not(:active) {
        outline: none;
        ${!isMobileDevice &&
          `
            box-shadow: 0 0 0 ${calculateRem(1)} ${
            surface === 'dark'
              ? ColorTokens.elements.primary.ondark.value
              : ColorTokens.elements.primary.onlight.value
          };
            transition: ease-out 0.1s;
        `};
      }
      &:hover:not(:active) span {
        border: none;
      }
      &:active {
        color: ${
          surface === 'dark'
            ? secondary
              ? ColorTokens.interactive.active.ondark.value
              : ColorTokens.elements.primary.onlight.value
            : secondary
            ? ColorTokens.interactive.active.onlight.value
            : ColorTokens.elements.primary.ondark.value
        };
        border-color: ${
          surface === 'dark'
            ? ColorTokens.interactive.active.ondark.value
            : ColorTokens.interactive.active.onlight.value
        };
        ${!isMobileDevice &&
          `
          box-shadow: 0 0 0 ${calculateRem(1)} ${
            surface === 'dark'
              ? ColorTokens.interactive.active.ondark.value
              : ColorTokens.interactive.active.onlight.value
          };
        `};
        background-color: ${
          surface === 'dark' && !secondary
            ? ColorTokens.interactive.active.ondark.value
            : surface !== 'dark' && !secondary
            ? ColorTokens.interactive.active.onlight.value
            : 'transparent'
        };
      }
      &:focus:active:not(:hover) {
        box-shadow: none;
      }
    `};
  ${({ surface, disabled, secondary }) =>
    surface === 'dark' &&
    !disabled &&
    `
    background-color: ${
      secondary ? 'transparent' : ColorTokens.background.primary.light.value
    };
    border: ${calculateRem(1)} solid ${
      ColorTokens.elements.primary.ondark.value
    };
    color: ${
      secondary
        ? ColorTokens.elements.primary.ondark.value
        : ColorTokens.elements.primary.onlight.value
    };

  `};

  ${({ disabled, secondary }) =>
    disabled &&
    `
    background-color: ${
      secondary ? 'transparent' : ColorTokens.interactive.disabled.onlight.value
    };
    border-color: ${ColorTokens.interactive.disabled.onlight.value};
    color: ${
      secondary
        ? ColorTokens.interactive.disabled.onlight.value
        : ColorTokens.elements.primary.ondark.value
    };
    cursor: default;
  `};

  ${({ disabled, surface, secondary }) =>
    disabled &&
    surface === 'dark' &&
    `
    background-color: ${
      secondary ? 'transparent' : ColorTokens.interactive.disabled.ondark.value
    };
    border-color: ${ColorTokens.interactive.disabled.ondark.value};
    color: ${
      secondary
        ? ColorTokens.interactive.disabled.ondark.value
        : ColorTokens.elements.primary.onlight.value
    }
  `};
`;

const StyledButton = styled.button`
  ${buttonStyles};
`;

const StyledAnchor = styled.a`
  ${buttonStyles};
  width: ${({ width, size }) =>
    width !== 'auto' && width !== 'autoTight' && size === 'large'
      ? findWidth(width)
      : 'fit-content'};
  justify-content: center;
`;

const Button = props => {
  const {
    children,
    size,
    width,
    disabled,
    tabIndex,
    ariaLabel,
    display,
    calculateButtonHeight,
    calculateBorderRadius,
    calculateSideMargin,
    smallButtonPadding,
    dataLoc,
    use,
    href,
    onClick,
    role,
  } = props;

  let newAriaLabel = ariaLabel
    ? ariaLabel
    : typeof children === 'string'
    ? children
    : 'Button';

  const isMobileDevice = checkIfMobileDevice();

  /* 
    The change to add a tabIndex of -1 on the ButtonBase element is because while button primitives 
    natively will render a disabled button non-focusable. The case when using a href this element is an atag. For this, we need to restrict it's focus.
  */

  const _onClick = e => {
    //reassign the target due to the hit area propogation
    let newEvent = e;
    newEvent.target = e.currentTarget;
    if (onClick) return onClick(newEvent);
  };
  let ButtonBase = href ? StyledAnchor : StyledButton;
  return (
    <ButtonBase
      {...props}
      onClick={_onClick}
      href={href}
      size={size}
      width={width}
      aria-label={newAriaLabel}
      role={role ? role : href ? 'link' : 'button'}
      aria-disabled={props.disabled}
      tabIndex={disabled ? -1 : tabIndex ? tabIndex : 0}
      display={display}
      disabled={disabled}
      calculateButtonHeight={calculateButtonHeight}
      calculateBorderRadius={calculateBorderRadius}
      calculateSideMargin={calculateSideMargin}
      data-loc={dataLoc}
      secondary={use === 'secondary'}
      isMobileDevice={isMobileDevice}
    >
      {!disabled && <HitArea />}
      <StyledChildWrapper
        tabIndex={-1}
        display={display}
        aria-hidden={disabled ? true : undefined}
        size={size}
        width={width}
        calculateSideMargin={calculateSideMargin}
        calculateBorderRadius={calculateBorderRadius}
        smallButtonPadding={smallButtonPadding}
      >
        {children}
      </StyledChildWrapper>
    </ButtonBase>
  );
};

Button.defaultProps = defaultProps;
Button.propTypes = propTypes;
Button.displayName = 'Button'; // Set this so ModalFooter can recognize this

export default withVDSManager(Button);
