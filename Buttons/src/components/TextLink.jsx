import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { Fonts } from '@vds-core/typography';
import { withVDSManager, calculateRem } from '@vds-core/utilities';
import { AccessibilityTokens } from '@vds-tokens/accessibility';
import { ColorTokens } from '@vds-tokens/color';
import { TypographyTokens } from '@vds-tokens/typography';

// Style properties
const colorFocusRing = AccessibilityTokens.color.focusring.onlight.value;
const colorFocusRingInverted = AccessibilityTokens.color.focusring.ondark.value;
const fontWeightRegular = TypographyTokens.fontweight.regular.value;
const fontWeightBold = TypographyTokens.fontweight.bold.value;
const lineHeightDesktopLarge = TypographyTokens.lineheight.body[20].value;

const heightHitAreaStandalone = calculateRem(44);

const widthFocusRing = AccessibilityTokens.focusring.borderwidth.value;
const offsetFocusRing = AccessibilityTokens.focusring.space.offset.value;
const transitionDuration = '0.15s';

const focusRingStyle = (mode = 'default') => {
  const color = mode === 'inverted' ? colorFocusRingInverted : colorFocusRing;
  return `${calculateRem(widthFocusRing)} ${
    AccessibilityTokens.focusring.borderstyle.value
  } ${color}`;
};

const propTypes = {
  /**
   * Determines display layout of button.
   */
  type: PropTypes.oneOf(['inline', 'standAlone']),
  /**
   * @ignore
   * Determines viewport of button.
   */
  viewport: PropTypes.oneOf(['mobile', 'tablet', 'desktop']),
  /**
   * String that is used to render as the text link.
   */
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  /**
   * TextLink will be disabled if disabled prop is passed.
   */
  disabled: PropTypes.bool,
  /**
   *	This function will be called when the TextLink is clicked. It will return an event.
   */
  onClick: PropTypes.func,
  /**
   *	This function will be called when keydown event fires on TextLink. It will return an event.
   */
  onKeyDown: PropTypes.func,
  /**
   * This string will be applied to the href attribute.
   */
  href: PropTypes.string,
  /**
   * @ignore
   * If true, TextLink text will render as bold.
   */
  bold: PropTypes.bool,
  /**
   *	If provided, used as string that labels the element for accessibility.
   */
  ariaLabel: PropTypes.string,
  /**
   * If provided, will render the TextLink in corresponding sizes
   */
  size: PropTypes.oneOf(['small', 'large']),
  /**
   * @ignore
   */
  calculateColors: PropTypes.func,
  /**
   * @ignore
   */
  calculateUnderLine: PropTypes.func,
  /**
   * @ignore
   */
  calculateLetterSpacing: PropTypes.func,
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
   * @ignore
   */
  dataLoc: PropTypes.string,
  /**
   * Allows a unique ID to be passed to the component.
   */
  id: PropTypes.string,
  /**
   * @ignore
   */
  tabIndex: PropTypes.number,
  /**
   * This will be applied to the role attribute for screen reading capabilities
   */
  role: PropTypes.oneOf(['link', 'button']),
  /**
   * @ignore
   */
  focusRingBorderRadius: PropTypes.string,
  /**
   * @ignore
   */
  surface: PropTypes.oneOf(['light', 'dark']),
};

const _calculateColors = surface => {
  return {
    default:
      surface === 'dark'
        ? ColorTokens.elements.primary.ondark.value
        : ColorTokens.elements.primary.onlight.value,
    hover:
      surface === 'dark'
        ? ColorTokens.elements.primary.ondark.value
        : ColorTokens.elements.primary.onlight.value,
    active:
      surface === 'dark'
        ? ColorTokens.interactive.active.ondark.value
        : ColorTokens.interactive.active.onlight.value,
    disabled:
      surface === 'dark'
        ? ColorTokens.interactive.disabled.ondark.value
        : ColorTokens.interactive.disabled.onlight.value,
  };
};

const _calculateUnderLine = (calculateColors, surface) => {
  const color = calculateColors(surface);
  return {
    default: `${calculateRem(1)} solid ${color.default}`,
    hover: `${calculateRem(2)} solid ${color.hover}`,
    active: `${calculateRem(2)} solid ${color.active}`,
    disabled: `${calculateRem(1)} solid ${color.disabled}`,
  };
};

const _calculateLetterSpacing = (size, viewport, bold) => {
  return size === 'small' ? '0px' : TypographyTokens.letterspacing.wide.value;
};

const defaultProps = {
  size: 'large',
  viewport: 'desktop',
  type: 'inline',
  disabled: false,
  surface: 'light',
  onClick: () => {},
  bold: false,
  tabIndex: 0,
  role: 'link',
  calculateLetterSpacing: _calculateLetterSpacing,
  calculateColors: _calculateColors,
  calculateUnderLine: _calculateUnderLine,
  focusRingBorderRadius: '2px',
};

const HitArea = styled.span`
  box-sizing: content-box;
  cursor: pointer;
  display: inline;
  height: ${({ type }) =>
    type === 'inline' ? '1.2em' : heightHitAreaStandalone};
  left: 50%;
  outline: none;
  position: absolute;
  text-align: center;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;

  &:hover {
    cursor: pointer;
  }
`;

const Wrapper = styled.span`
  height: ${({ type }) =>
    type === 'inline' ? 'inherit' : calculateRem(lineHeightDesktopLarge)};
  width: 100%;
  position: relative;

  &:focus {
    outline: none;
  }
`;

const StyledAnchor = styled.a`
  background-image: none;
  place-self: center;
  background-color: transparent;
  border: 0;
  border-bottom: ${({ underline }) => underline.default};
  box-sizing: border-box;
  color: ${({ colors }) => colors.default};
  cursor: pointer;
  outline: none;
  position: relative;
  text-decoration: none;
  touch-action: manipulation;
  transition: opacity ${transitionDuration} ease-in;
  width: auto;
  pointer-events: auto;
  ${({ size }) => (size === 'large' ? 'padding-bottom: 1px' : undefined)};

  ${({ type }) =>
    type === 'inline' &&
    `
    color: inherit;
    border-color: inherit;
    font-size: inherit;
    font-family: inherit;
    font-weight: inherit;
    line-height: inherit
    letter-spacing: inherit;
  `}

  ${({ type, bold, fontStyles, size }) =>
    type !== 'inline' &&
    `
    font-size: ${calculateRem(fontStyles.fontSize)};
    font-family: ${
      size === 'large' ? Fonts.VerizonNHGeDS : Fonts.VerizonNHGeTX
    };
    font-weight: ${bold ? fontWeightBold : fontWeightRegular};
    line-height: ${calculateRem(fontStyles.lineHeight)};
    letter-spacing: ${calculateRem(fontStyles.letterSpacing)};
  `}
  outline: none;
  &:focus:not(:hover) ${Wrapper} {
    outline: ${focusRingStyle('default')};
    outline-offset: ${calculateRem(parseInt(offsetFocusRing))};
    border-radius: ${({ focusRingBorderRadius }) => focusRingBorderRadius};
    padding-bottom: 2px; // Padding top & bottom required to fix the focus ring height
    padding-top: 1px;
  }
  &:focus:not(:hover):not(:focus-visible) {
    &:after {
      display: none; // Only display focus state on keyboard focus, not when radio button is clicked
    }
  }
  &:hover {
    color: ${({ colors }) => colors.hover};
    border-bottom: ${({ underline }) => underline.hover};
  }

  &:active {
    color: ${({ colors }) => colors.active};
    border-bottom: ${({ underline }) => underline.active};
  }

  ${({ disabled, colors, underline }) =>
    disabled &&
    `
    border-bottom: ${underline.disabled};
    color: ${colors.disabled};
    pointer-events: none;
  `};

  ${({ surface }) =>
    surface === 'dark' &&
    `
    &:focus:not(:hover) {
      &::after {
        border: ${focusRingStyle('inverted')};
      }
    }
  `};
`;

const _getFontSize = size => {
  switch (size) {
    case 'small':
      return TypographyTokens.fontsize.body[12].value;
    case 'large':
    default:
      return TypographyTokens.fontsize.body[16].value;
  }
};

const _getLineHeight = size => {
  switch (size) {
    case 'small':
      return TypographyTokens.lineheight.body[16].value;
    case 'large':
    default:
      return TypographyTokens.lineheight.body[20].value;
  }
};

const getFontStyles = (type, viewport, size, bold) => {
  const inline = type === 'inline';
  return {
    fontSize: inline ? 'inherit' : _getFontSize(size),
    lineHeight: inline ? 'inherit' : _getLineHeight(size),
    letterSpacing: inline
      ? 'inherit'
      : _calculateLetterSpacing(size, viewport, bold),
  };
};

const TextLink = props => {
  const {
    id,
    disabled,
    dataLoc,
    tabIndex,
    role,
    calculateColors,
    calculateUnderLine,
    surface,
    viewport,
    focusRingBorderRadius,
    onClick,
  } = props;
  let newAriaLabel = props.ariaLabel
    ? props.ariaLabel
    : props.children && typeof props.children === 'string'
    ? props.children
    : 'Text Link';

  const colors = calculateColors(surface);
  const underline = calculateUnderLine(calculateColors, surface);
  const viewportToUse = viewport === 'tablet' ? 'desktop' : viewport; // normalize tablet to desktop

  const handleKeyDown = e => {
    props.onKeyDown && props.onKeyDown(e);
    if (e.key === 'Enter' || e.key === ' ') {
      props.onClick && props.onClick(e);
    }
  };

  const _onClick = e => {
    //reassign the target due to the hit area propogation
    let newEvent = e;
    newEvent.target = e.currentTarget;
    if (onClick) return onClick(newEvent);
  };
  return (
    <StyledAnchor
      {...props}
      onClick={_onClick}
      id={id}
      type={props.type}
      disabled={disabled}
      surface={surface}
      href={props.href}
      bold={props.bold}
      aria-label={newAriaLabel}
      role={role}
      aria-disabled={props.disabled}
      tabIndex={props.disabled ? -1 : tabIndex ? tabIndex : 0}
      data-loc={dataLoc}
      fontStyles={getFontStyles(
        props.type,
        viewportToUse,
        props.size,
        props.bold
      )}
      colors={colors}
      underline={underline}
      focusRingBorderRadius={focusRingBorderRadius}
      onKeyDown={handleKeyDown}
    >
      <HitArea type={props.type} tabIndex={-1} aria-hidden={true} />
      <Wrapper tabIndex={-1} aria-hidden={true} type={props.type}>
        {props.children}
      </Wrapper>
    </StyledAnchor>
  );
};

TextLink.defaultProps = defaultProps;
TextLink.propTypes = propTypes;

export default withVDSManager(TextLink);
