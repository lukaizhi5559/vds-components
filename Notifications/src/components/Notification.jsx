import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'styled-components';
import NotificationClose from './NotificationClose';
import { Body, Fonts } from '@vds-core/typography';
import { withVDSManager, calculateRem } from '@vds-core/utilities';
import { ColorTokens } from '@vds-tokens/color';
import { LayoutTokens } from '@vds-tokens/layout';
import { TypographyTokens } from '@vds-tokens/typography';
import { ButtonGroup } from '@vds-core/buttons';
import { AccessibilityTokens } from '@vds-tokens/accessibility';
import {
  getBrowser,
  breakpoints,
  checkIfMobileDevice,
  generateUUID,
} from '@vds-core/utilities';

// Use checkmark-alt-bold.svg
const SuccessBoldIcon = (
  <svg
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 21.6 21.6"
  >
    <path
      d="M10.8,20.2c-5.2,0-9.4-4.2-9.4-9.4c0-5.2,4.2-9.4,9.4-9.4c5.2,0,9.4,4.2,9.4,9.4c0,0,0,0,0,0C20.2,16,16,20.2,10.8,20.2z
	 M10.8,3.4c-4.1,0-7.4,3.3-7.4,7.4s3.3,7.4,7.4,7.4c4.1,0,7.4-3.3,7.4-7.4c0,0,0,0,0,0C18.2,6.7,14.9,3.4,10.8,3.4z M15.1,9.1
	l-1.4-1.4l-4,4l-1.7-1.7l-1.4,1.4l3.1,3.1L15.1,9.1z"
    />
  </svg>
);

// Use error-bold.svg
const ErrorBoldIcon = (
  <svg
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 21.6 21.6"
  >
    <path
      d="M19.4,8.8l-6.6-6.6c-1.1-1.1-2.9-1.1-4,0L2.2,8.8c-1.1,1.1-1.1,2.9,0,4l6.6,6.6c1.1,1.1,2.9,1.1,4,0
	c0,0,0,0,0,0l6.6-6.6C20.5,11.7,20.5,9.9,19.4,8.8z M18,11.4L11.4,18c-0.3,0.3-0.9,0.3-1.2,0l-6.6-6.6c-0.3-0.3-0.3-0.9,0-1.2
	l6.6-6.6c0.3-0.3,0.9-0.3,1.2,0l6.6,6.6C18.3,10.5,18.3,11.1,18,11.4z M9.9,13.4h1.7v1.7H9.9V13.4z M9.9,6.5h1.7V9l-0.6,2.6h-0.6
	L9.9,9V6.5z"
    />
  </svg>
);

// Use warning-bold.svg
const WarningBoldIcon = (
  <svg
    id="Layer_1"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 21.6 21.6"
  >
    <path d="M19.90265,15.566l-6.936-12.03357a2.50126,2.50126,0,0,0-4.34088-.001L1.69659,15.566a2.51054,2.51054,0,0,0,2.17432,3.75989H17.7312A2.50926,2.50926,0,0,0,19.90265,15.566Zm-1.734,1.5055a.51007.51007,0,0,1-.43933.25482H3.87286a.51076.51076,0,0,1-.44323-.76251L10.3598,4.52633a.50217.50217,0,0,1,.87183,0l6.938,12.03552A.51553.51553,0,0,1,18.16864,17.0715ZM9.95,14.367h1.7V16.05H9.95Zm0-6.817h1.7v2.49048l-.56951,2.635H10.511L9.95,10.04049Z" />
  </svg>
);

// Use info.svg
const InfoBoldIcon = (
  <svg
    id="Layer_1"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 21.6 21.6"
  >
    <path
      className="cls-1"
      d="M10.80011,1.36129a9.43848,9.43848,0,1,0,9.43848,9.43848A9.43847,9.43847,0,0,0,10.80011,1.36129Zm0,16.877a7.43848,7.43848,0,1,1,7.43848-7.43848A7.43849,7.43849,0,0,1,10.80011,18.23825ZM11.625,7.45849H9.95V5.78344h1.675ZM9.95834,9.11663H11.65v6.69989H9.95834Z"
    />
  </svg>
);

const _calcContentColor = (type, surface) => {
  return ColorTokens.elements.primary[`on${surface}`].value;
};

const _animateIn = containerHeight => keyframes`
  0% {
    transform: translateY(-${containerHeight}px);
    opacity: 0;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
`;

const _animateOut = containerHeight => keyframes`
  0% {
    transform: translateY(0px);
    opacity: 1;
  }
  100% {
    transform: translateY(-${containerHeight}px);
    opacity: 0;
  }
`;

const _calcBackgroundColor = (type, surface) => {
  switch (type) {
    case 'error':
      return ColorTokens.feedback.error.background[`on${surface}`].value;
    case 'success':
      return ColorTokens.feedback.success.background[`on${surface}`].value;
    case 'warning':
      return ColorTokens.feedback.warning.background[`on${surface}`].value;
    case 'info':
    default:
      return ColorTokens.feedback.information.background[`on${surface}`].value;
  }
};

const _calcNotificationIconSize = viewport => {
  return viewport === 'mobile' ? 'small' : 'medium';
};

const _calcCloseIconSize = viewport => {
  return viewport === 'mobile' ? 'small' : 'medium';
};

const _calcPadding = viewport => {
  return viewport === 'mobile'
    ? calculateRem(LayoutTokens.space['4X'].value)
    : calculateRem(LayoutTokens.space['5X'].value);
};

const _calcNotificationIconMarginRight = viewport => {
  return viewport === 'mobile'
    ? calculateRem(LayoutTokens.space['2X'].value)
    : calculateRem(LayoutTokens.space['3X'].value);
};

const _getCloseButtonHeight = (viewport, closeButtonHeight) => {
  if (closeButtonHeight) return closeButtonHeight;

  return viewport === 'mobile' ? calculateRem(16) : calculateRem(20);
};

const _getMinHeight = (viewport, minHeight) => {
  if (minHeight) return minHeight;

  return viewport === 'mobile' ? '48px' : '60px';
};

const _getTitleSize = (viewport, titleSize) => {
  if (titleSize) return titleSize;

  return viewport === 'mobile' ? 'small' : 'large';
};

const _getSubtitleSize = (viewport, subtitleSize) => {
  if (subtitleSize) return subtitleSize;

  return viewport === 'mobile' ? 'small' : 'large';
};

const _calcInlineMargin = viewport => {
  return viewport === 'mobile'
    ? calculateRem(LayoutTokens.space['4X'].value)
    : calculateRem(LayoutTokens.space['5X'].value);
};

const _getButtonGroupPaddingLeft = (viewport, buttonGroupPaddingLeft) => {
  if (buttonGroupPaddingLeft) return buttonGroupPaddingLeft;
  return viewport === 'mobile'
    ? calculateRem(24)
    : calculateRem(LayoutTokens.space['8X'].value);
};

const _calcIconActiveColor = surface => {
  return ColorTokens.interactive.active[`on${surface}`].value;
};

const _getFocusringColor = (surface, focusringColor) => {
  if (focusringColor) return focusringColor;

  return AccessibilityTokens.color.focusring[`on${surface}`].value;
};

const propTypes = {
  /**
   * If provided, will render the contents of the Notification. The use of this prop is mutually exclusive with title/subtitle/buttonData prop.
   * @note If you want to leverage out of the box accessibility, be sure to use the provided title/subtitle/buttonData props. Otherwise, you are responsible for making sure the component is fully accessible.
   */
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.node,
  ]),
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If true, will disable entrance and exit animations for this component.
   */
  disableAnimation: PropTypes.bool,
  /**
   * A callback that is executed when the close button is clicked.
   */
  onCloseButtonClick: PropTypes.func,
  /**
   * Add this attribute determine your type of Notification.
   */
  type: PropTypes.oneOf(['error', 'info', 'success', 'warning']),
  /**
   * This will allow you to programmatically control the opened state of the notification.
   * @note When controling the notification's state be sure to use the onCloseButtonClick prop to allow a user to close the notification using the close button.
   */
  opened: PropTypes.bool,
  /**
   * If true, will hide the close button.
   */
  hideCloseButton: PropTypes.bool,
  /**
   * If true, will disable the force focus of the notification close button on instantiation.
   */
  disableFocus: PropTypes.bool,
  /**
   * @ignore
   * adds max-width to notification container
   */
  maxWidth: PropTypes.string,
  /**
   * @ignore
   * adds min-height to notification container
   */
  minHeight: PropTypes.string,
  /**
   * When used outside the grid, if set to true will allow the component to take up 100% width while centering the content in a 1272px container.
   */
  fullBleed: PropTypes.bool,
  /**
   * @ignore
   * creates animation in
   */
  animateIn: PropTypes.func,
  /**
   * @ignore
   * creates animation out
   */
  animateOut: PropTypes.func,
  /**
   * @ignore
   * defines properties of the animations on animateIn and animateOut
   */
  animationProperties: PropTypes.string,
  /**
   * @ignore
   * used for title typogrpahy
   */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * @ignore
   * used for subtitle typography
   */
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * @ignore
   * If provided, Button components will be rendered based on this data
   */
  buttonData: PropTypes.arrayOf(
    PropTypes.shape({
      children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
      onClick: PropTypes.func,
    })
  ),
  /**
   * @ignore
   */
  unMountTime: PropTypes.number,
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
   * Allows an id to be passed to the outermost wrapper of the component
   */
  id: PropTypes.string,
  /**
   * @ignore If passed, the Body component from VDS will render
   */
  Body: PropTypes.func,
  /**
   * @ignore If passed, the ButtonGroup component from VDS will render
   */
  ButtonGroup: PropTypes.func,
  /**
   * Viewport to configure how the Notification will be rendered.
   */
  viewport: PropTypes.oneOf(['mobile', 'desktop', 'tablet']),
  /**
   * @ignore
   * If provided, will render border-radius value of notification.
   * Defaults to 4px for 3.0 and 0px for 1.0
   */
  borderRadius: PropTypes.number,
  /**
   * @ignore
   * Function to render background color
   */
  calcBackgroundColor: PropTypes.func,
  /**
   * @ignore
   */
  surface: PropTypes.oneOf(['light', 'dark']),
  /**
   * @ignore
   * If provided, will render the button group inverted for type success or info
   */
  fixedButtonInversion: PropTypes.bool,
  /**
   * @ignore
   * If provided, will render the text color
   */
  calcContentColor: PropTypes.func,
  /**
   * @ignore
   * If provided, will render the icon size for notificationIcon.
   * Defaults to small for mobile for 3.0 & medium for desktop and medium for 1.0
   */
  calcNotificationIconSize: PropTypes.func,
  /**
   * @ignore
   * If provided, will render the padding bottom of title when there is subtitle
   * Defaults to 4 for 3.0 and 0 for 1.0
   */
  titlePaddingBottom: PropTypes.number,
  /**
   * @ignore
   * focusRing border
   */
  focusringBorderRadius: PropTypes.string,
  /**
   * @ignore
   * Function to calculate close icon size
   */
  calcCloseIconSize: PropTypes.func,
  /**
   * @ignore
   * Function to render padding. 20px for 1.0
   */
  calcPadding: PropTypes.func,
  /**
   * @ignore
   * Function to calculate margin-right of notification icon wrapper
   */
  calcNotificationIconMarginRight: PropTypes.func,
  /**
   * @ignore
   * To determine the close button height
   * 3.0: desktop 20px + mobile 18px
   * 1.0: 18px
   */
  closeButtonHeight: PropTypes.string,
  /**
   * @ignore
   * Value to title size
   */
  titleSize: PropTypes.oneOf(['small', 'large']),
  /**
   * @ignore
   * Value to subtitle size
   */
  subtitleSize: PropTypes.oneOf(['small', 'large']),
  /**
   * @ignore
   * Function to calculate margin when inline is set to true
   */
  calcInlineMargin: PropTypes.func,
  /**
   * @ignore
   * Value for padding left for ButtonAreaWrapper
   * when in different viewports
   */
  buttonGroupPaddingLeft: PropTypes.string,
  /**
   * @ignore
   * Color for when close icon is active
   */
  calcIconActiveColor: PropTypes.func,
  /**
   * @ignore
   * Color value for focusring for close button
   */
  focusringColor: PropTypes.string,
  /**
   * @ignore
   * Color value for focusring for close button
   */
  CloseButton: PropTypes.func,
};

const defaultProps = {
  children: null,
  className: null,
  disableAnimation: false,
  ButtonGroup: ButtonGroup,
  onCloseButtonClick: () => {},
  //added after renaming
  type: 'success',
  opened: undefined,
  hideCloseButton: false,
  disableFocus: false,
  fullBleed: false,
  maxWidth: '1272px',
  animateIn: _animateIn,
  animateOut: _animateOut,
  animationProperties:
    '0.35s cubic-bezier(0.22, 0.61, 0.36, 1) 0s normal 1 both',
  unMountTime: 350,
  Body: Body,
  viewport: 'desktop',
  // Brand 3
  borderRadius: 4,
  titlePaddingBottom: 4,
  surface: 'light',
  fixedButtonInversion: false,
  focusringBorderRadius: calculateRem(2),
  CloseButton: NotificationClose,
  calcContentColor: _calcContentColor,
  calcBackgroundColor: _calcBackgroundColor,
  calcNotificationIconSize: _calcNotificationIconSize,
  calcCloseIconSize: _calcCloseIconSize,
  calcPadding: _calcPadding,
  calcNotificationIconMarginRight: _calcNotificationIconMarginRight,
  calcInlineMargin: _calcInlineMargin,
  calcIconActiveColor: _calcIconActiveColor,
};

const StyledDiv = styled.div`
  max-width: ${({ maxWidth, fullBleed }) => (fullBleed ? null : maxWidth)};
  width: 100%;
  outline: none;
  &:focus {
    outline: none;
  }
`;

const TitleWrapper = styled.span`
  padding-bottom: ${({ titlePaddingBottom }) =>
    calculateRem(titlePaddingBottom)};
`;

const AlertWrapper = styled.div`
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: ${({ borderRadius, fullBleed }) =>
    fullBleed ? 0 : calculateRem(borderRadius)};
  overflow: hidden;
  box-sizing: border-box;
  padding: ${({ padding }) => padding};
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: flex-start;
  justify-content: ${({ fullBleed }) =>
    fullBleed ? 'center' : 'space-between'};
  margin: 0
    ${({ inline, fullBleed, inlineMargin }) =>
      inline && !fullBleed ? inlineMargin : 0};
  min-height: ${({ minHeight }) => minHeight};
  ${({ textShadow, type }) =>
    textShadow &&
    `
  text-shadow: 0 0 0.01px ${
    type === 'warning'
      ? ColorTokens.elements.primary.ondark.value
      : ColorTokens.elements.primary.onlight.value
  };
  `};

  transition: ${({ disableAnimation }) =>
    disableAnimation ? 0 : 'all ease 0.2s'};

  ${({ disableAnimation, animateIn, containerHeight, animationProperties }) =>
    !disableAnimation &&
    containerHeight &&
    css`
      animation: ${animateIn(containerHeight)} ${animationProperties};
    `};
  ${({ unmounted, animateOut, containerHeight, animationProperties }) =>
    unmounted &&
    containerHeight &&
    css`
      animation: ${animateOut(containerHeight)} ${animationProperties};
    `};

  outline: none;
  @media screen and (max-width: ${breakpoints.md}) {
    box-sizing: border-box;

    padding: ${calculateRem(16)};
    transition: ${({ disableAnimation }) =>
      disableAnimation ? 0 : 'all ease 0.2s'};
    ${({ disableAnimation, animateIn, containerHeight, animationProperties }) =>
      !disableAnimation &&
      containerHeight &&
      css`
        animation: ${animateIn(containerHeight)} ${animationProperties};
      `};
    ${({ unmounted, animateOut, containerHeight, animationProperties }) =>
      unmounted &&
      containerHeight &&
      css`
        animation: ${animateOut(containerHeight)} ${animationProperties};
      `};
  }

  &:active,
  &:visited,
  &:hover {
    outline: none;
  }
  * {
    &:active,
    &:visited,
    &:hover {
      outline: none;
    }
  }
`;

const TextAreaWrapper = styled.span`
  display: flex;
  flex: ${({ isIe }) => (isIe ? `1 1 0` : `1 1 0%`)};
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  word-break: break-word;
  overflow-wrap: break-word;
  padding-right: ${({ paddingRight }) => paddingRight};
  max-width: 100%;

  @media (min-width: 1066px) {
    ${({ layout, paddingRight, buttonData }) =>
      layout === 'vertical' ||
      (buttonData && buttonData.length < 1) ||
      buttonData === undefined
        ? `padding-right: ${paddingRight};`
        : `padding-right: ${calculateRem(LayoutTokens.space['5X'].value)};
        max-width: 50%`};
  }
`;

const ButtonAreaWrapper = styled.span`
  display: flex;
  flex: ${({ isIe }) => (isIe ? `1 1 0` : `1 1 0%`)};
  justify-content: space-between;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding-right: ${({ paddingRight }) => paddingRight};
  padding-top: ${calculateRem(LayoutTokens.space['3X'].value)};
  ${({ viewport, buttonGroupPaddingLeft }) =>
    `
        padding-left: ${_getButtonGroupPaddingLeft(
          viewport,
          buttonGroupPaddingLeft
        )};
    `};

  @media (min-width: 1066px) {
    max-width: 50%;
    padding-left: ${calculateRem(LayoutTokens.space['5X'].value)};
    padding-top: 0;
    ${({ layout, viewport, buttonGroupPaddingLeft }) =>
      layout === 'vertical' &&
      `padding-top: ${calculateRem(LayoutTokens.space['3X'].value)};
      padding-left: ${_getButtonGroupPaddingLeft(
        viewport,
        buttonGroupPaddingLeft
      )};
      max-width: 100%;`};
  }
`;

const TextWrapper = styled.div`
  flex-direction: column;
  flex: 1;
  display: flex;
`;

const Title = styled.div`
  color: ${props => props.color};
  max-width: 100%;
  outline: none;
  font-family: ${Fonts.VerizonNHGeDS};
  ${({ desktopConfig, mobileConfig, color }) => `
    font-size: ${calculateRem(desktopConfig.fontSize)};
    line-height: ${calculateRem(desktopConfig.lineHeight)};
    letter-spacing: ${calculateRem(desktopConfig.letterSpacing)};
    font-weight: ${desktopConfig.bold};
    color: ${color};
    @media screen and (max-width: ${breakpoints.md}) {
      max-width: 100%;
      padding-bottom: 0;
      outline: none;
      font-size: ${calculateRem(mobileConfig.fontSize)};
      line-height: ${calculateRem(mobileConfig.lineHeight)};
      letter-spacing: ${calculateRem(mobileConfig.letterSpacing)};
      font-weight: ${mobileConfig.bold};
    }
  `};
  ${({ viewport, mobileConfig }) =>
    viewport === 'mobile' &&
    `
    max-width: 100%;
    padding-bottom: 0;
    outline: none;
    font-size: ${calculateRem(mobileConfig.fontSize)};
    line-height: ${calculateRem(mobileConfig.lineHeight)};
    letter-spacing: ${calculateRem(mobileConfig.letterSpacing)};
    font-weight: ${mobileConfig.bold};
  `};
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  max-width: 1272px;
  justify-content: ${({ contentTitle, subtitle }) =>
    !contentTitle && !subtitle && 'space-between'};

  @media screen and (max-width: ${breakpoints.sm}) {
    overflow: visible;
  }
  flex-direction: column;

  @media (min-width: 1066px) {
    ${({ layout }) =>
      layout === 'vertical'
        ? `flex-direction: column;`
        : `flex-direction: row;`};
  }
`;

const NotificationIconWrapper = styled.span`
  margin-right: ${({ marginRight }) => marginRight};
  display: flex;
`;

//margin-bottom is applied to cancel out the padding-bottom applied to ButtonGroup component
const ButtonWrapper = styled.div`
  max-width: 100%;
  ${({ noButtonPadding }) =>
    noButtonPadding &&
    `
    div > div {
      padding-right: 0;
      padding-bottom: 0;
    };
  `}
  margin-bottom: ${({ buttonData }) =>
    buttonData && buttonData.length === 1
      ? 0
      : `-${calculateRem(LayoutTokens.space['3X'].value)}`};

  flex: 1;
  display: flex;
  align-items: center;
  @media screen and (max-width: ${breakpoints.sm}) {
    width: inherit;
  }
  button {
    margin: 0;
  }
`;

const TextIconWrapper = styled.span`
  display: flex;
  flex: 1;
`;

// Necessary to concatenate type notification with title for screen readers
const AccessibilityLabel = styled.span.attrs(() => ({
  ariaHidden: true,
}))`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  whitespace: nowrap;
  border: 0;
`;

const IconSVGWrapper = styled.div`
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
    path {
      fill: ${({ iconColor }) => iconColor};
    }
  }
`;

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      unmounted: false,
      containerHeight: 0,
      role: undefined,
      isFirstFocus: true,
    };
    // custom id's in order to use aria-* properties
    this.titleID = `title_${generateUUID()}`;
    this.subtitleID = `subtitle_${generateUUID()}`;
    this.typeID = `type_${generateUUID()}`;
    this.childrenId = `children_${generateUUID()}`;
    this.notificationCloseButtonID = `notificationCloseButton_${generateUUID()}`;
    this.buttonID = `button_${generateUUID()}`;
  }

  // Used to calculate paddingRight of sections (text or button area depending on the orientation) to closeButton
  // Determined based in the closeIcon size passed in
  _getPaddingRight = () => {
    const { calcCloseIconSize, viewport, hideCloseButton } = this.props;

    const ICON_SIZE = calcCloseIconSize(viewport);

    const baseIconPaddingDesktop = 12; // specs

    const baseIconPaddingMobile = 8;

    if (hideCloseButton) return 0;

    switch (ICON_SIZE) {
      case 'medium':
        return calculateRem(baseIconPaddingDesktop + 20); // 20 is the size of icon medium
      case 'small':
      default:
        return calculateRem(baseIconPaddingMobile + 16); // 16 is the size of icon small
    }
  };

  // role text for iOS devices
  isAppleDevice = (function() {
    if (typeof navigator === 'undefined') return false;
    return /iPhone|iPad/i.test(navigator.userAgent);
  })();

  _checkIfIe = getBrowser() === 'ie';

  close = () => {
    const { disableAnimation } = this.props;

    if (!disableAnimation) {
      this.setState(() => ({ unmounted: true }));
      this.props.onCloseButtonClick();
      this.unMountTimer = setTimeout(() => {
        this.setState({ visible: false });
      }, this.props.unMountTime);
    } else {
      this.setState(() => ({ visible: false }));
      this.props.onCloseButtonClick();
    }

    this.wrapper && this.wrapper.blur();
  };

  componentDidMount = () => {
    const { disableFocus, hideCloseButton } = this.props;
    this.setState({
      containerHeight: this.wrapper
        ? this.wrapper.clientHeight
        : this.props.minHeight || '100%',
    });
    if (this.props.opened !== undefined) {
      this.setState({ visible: this.props.opened });
    }
    this.roleTimer = setTimeout(() => {
      this.setState({ role: 'text' });
    }, this.props.unMountTime);
    !disableFocus &&
      typeof document !== 'undefined' &&
      document.getElementById(this.notificationCloseButtonID) &&
      document.getElementById(this.notificationCloseButtonID).focus();
    !disableFocus &&
      typeof document !== 'undefined' &&
      hideCloseButton &&
      document.getElementById(this.buttonID) &&
      document.getElementById(this.buttonID).focus();
    setTimeout(() => {
      this.setState({
        isFirstFocus: false,
      });
    }, 500);
  };

  componentWillUnmount = () => {
    clearTimeout(this.unMountTimer);
    clearTimeout(this.roleTimer);
  };

  componentDidUpdate = prevProps => {
    const { opened } = this.props;
    if (prevProps.opened !== opened) {
      this.setState(() => ({ visible: !prevProps.opened }));
    }
  };

  renderIconElement = () => {
    const {
      type,
      hideCloseButton,
      closeButtonHeight,
      buttonData,
      'data-sitecat-cta': cta,
      'data-sitecat-datatrack': dataTrack,
      'data-sitecat-position': position,
      'data-sitecat-level': level,
      calcContentColor,
      surface,
      calcCloseIconSize,
      viewport,
      focusringBorderRadius,
      calcIconActiveColor,
      focusringColor,
      CloseButton,
    } = this.props;
    const { visible, isFirstFocus } = this.state;

    if (!hideCloseButton) {
      return (
        <CloseButton
          id={this.notificationCloseButtonID}
          focusringBorderRadius={focusringBorderRadius}
          closeButtonHeight={_getCloseButtonHeight(viewport, closeButtonHeight)}
          contentColor={calcContentColor(type, surface)}
          size={calcCloseIconSize(viewport)}
          type={type}
          controlFunc={this.close}
          visible={visible}
          buttonData={buttonData}
          cta={cta}
          dataTrack={dataTrack}
          position={position}
          level={level}
          isFirstFocus={isFirstFocus}
          surface={surface}
          viewport={viewport}
          iconActiveColor={calcIconActiveColor(surface)}
          focusringColor={_getFocusringColor(surface, focusringColor)}
        />
      );
    }
    return null;
  };

  renderNotificationIcon = () => {
    const {
      type,
      calcContentColor,
      surface,
      viewport,
      calcNotificationIconMarginRight,
      calcNotificationIconSize,
    } = this.props;

    const _renderIconSize = () => {
      let size = calcNotificationIconSize(viewport);
      switch (size) {
        case 'medium':
          return 20;
        default:
          return 16; // small
      }
    };

    const _getIcons = () => {
      switch (type) {
        case 'success':
          return SuccessBoldIcon;
        case 'warning':
          return WarningBoldIcon;
        case 'info':
          return InfoBoldIcon;
        case 'error':
          return ErrorBoldIcon;
      }
    };

    return (
      <NotificationIconWrapper
        tabIndex={-1}
        aria-hidden={true}
        marginRight={calcNotificationIconMarginRight(viewport)}
      >
        <IconSVGWrapper
          tabIndex={-1}
          aria-hidden={true}
          iconColor={calcContentColor(type, surface)}
          iconSize={_renderIconSize()}
          aria-label={`${type === 'success' ? 'checkmark-alt' : type} icon`}
        >
          {_getIcons()}
        </IconSVGWrapper>
      </NotificationIconWrapper>
    );
  };

  _determineTitleConfig = () => {
    return {
      desktop: {
        fontSize: TypographyTokens.fontsize.body[16].value,
        lineHeight: TypographyTokens.lineheight.body[20].value,
        letterSpacing: TypographyTokens.letterspacing.wide.value,
        bold: TypographyTokens.fontweight.bold.value,
      },
      mobile: {
        fontSize: TypographyTokens.fontsize.body[16].value,
        lineHeight: TypographyTokens.lineheight.body[20].value,
        letterSpacing: TypographyTokens.letterspacing.wide.value,
        bold: TypographyTokens.fontweight.bold.value,
      },
    };
  };

  renderText = () => {
    const {
      type,
      title,
      subtitle,
      children,
      Body,
      buttonData,
      viewport,
      layout,
      calcContentColor,
      surface,
      titlePaddingBottom,
      titleSize,
      subtitleSize,
      disableFocus,
    } = this.props;
    if (title && !subtitle) {
      return (
        <TextAreaWrapper
          viewport={viewport}
          layout={layout}
          buttonData={buttonData}
          isIe={this._checkIfIe}
          paddingRight={this._getPaddingRight()}
        >
          <TextIconWrapper
            role={
              this.isAppleDevice.toString() === 'true' || !disableFocus
                ? 'alert'
                : undefined
            }
            aria-live={disableFocus ? 'polite' : 'assertive'}
          >
            {this.renderNotificationIcon()}
            <TextWrapper
              viewport={viewport}
              layout={layout}
              aria-labelledby={disableFocus ? this.typeID : undefined}
              role={
                this.isAppleDevice.toString() === 'true'
                  ? 'text'
                  : this.state.role
              } // necessary for VoiceOver
            >
              <AccessibilityLabel id={this.typeID}>
                {this.isAppleDevice.toString() === 'true' && disableFocus
                  ? `${disableFocus ? 'Alert!' : ''} ${
                      type === 'info' ? 'information' : type
                    } notification ${title}`
                  : `${disableFocus ? 'Alert!' : ''} ${
                      type === 'info' ? 'information' : type
                    } notification`}
              </AccessibilityLabel>
              <Body
                id={this.titleID}
                bold
                size={_getTitleSize(viewport, titleSize)}
                color={calcContentColor(type, surface)}
              >
                {title}
              </Body>
            </TextWrapper>
          </TextIconWrapper>
        </TextAreaWrapper>
      );
    } else if (title && subtitle) {
      return (
        <TextAreaWrapper
          viewport={viewport}
          layout={layout}
          buttonData={buttonData}
          isIe={this._checkIfIe}
          paddingRight={this._getPaddingRight()}
        >
          <TextIconWrapper
            role={
              this.isAppleDevice.toString() === 'true' || !disableFocus
                ? 'alert'
                : undefined
            }
            aria-live={disableFocus ? 'polite' : 'assertive'}
          >
            {this.renderNotificationIcon()}
            <TextWrapper
              viewport={viewport}
              layout={layout}
              aria-labelledby={disableFocus ? this.typeID : undefined}
              role={
                this.isAppleDevice.toString() === 'true'
                  ? 'text'
                  : this.state.role
              } // necessary for VoiceOver
            >
              <AccessibilityLabel id={this.typeID}>
                {this.isAppleDevice.toString() === 'true' && disableFocus
                  ? `${disableFocus ? 'Alert!' : ''} ${
                      type === 'info' ? 'information' : type
                    } notification ${title} ${subtitle}`
                  : `${disableFocus ? 'Alert!' : ''} ${
                      type === 'info' ? 'information' : type
                    } notification`}
              </AccessibilityLabel>
              <TitleWrapper titlePaddingBottom={titlePaddingBottom}>
                <Body
                  id={this.titleID}
                  bold
                  size={_getTitleSize(viewport, titleSize)}
                  color={calcContentColor(type, surface)}
                >
                  {title}
                </Body>
              </TitleWrapper>
              <Body
                id={this.subtitleID}
                size={_getSubtitleSize(viewport, subtitleSize)}
                color={calcContentColor(type, surface)}
              >
                {subtitle}
              </Body>
            </TextWrapper>
          </TextIconWrapper>
        </TextAreaWrapper>
      );
    } else {
      return (
        <TextAreaWrapper
          viewport={viewport}
          layout={layout}
          buttonData={buttonData}
          isIe={this._checkIfIe}
          paddingRight={this._getPaddingRight()}
        >
          <TextIconWrapper
            role={
              this.isAppleDevice.toString() === 'true' || !disableFocus
                ? 'alert'
                : undefined
            }
            aria-live={disableFocus ? 'polite' : 'assertive'}
          >
            {this.renderNotificationIcon()}
            <TextWrapper
              aria-labelledby={disableFocus ? this.typeID : undefined}
              role={
                this.isAppleDevice.toString() === 'true'
                  ? 'text'
                  : this.state.role
              } // necessary for VoiceOver
            >
              <AccessibilityLabel id={this.typeID}>
                {`${disableFocus ? 'Alert!' : ''} ${
                  type === 'info' ? 'information' : type
                } notification`}
                {this.isAppleDevice.toString() === 'true' &&
                  disableFocus &&
                  children}
              </AccessibilityLabel>
              <Title
                color={calcContentColor(type, surface)}
                viewport={viewport}
                id={this.childrenId}
                mobileConfig={this._determineTitleConfig().mobile}
                desktopConfig={this._determineTitleConfig().desktop}
              >
                {children}
              </Title>
            </TextWrapper>
          </TextIconWrapper>
        </TextAreaWrapper>
      );
    }
  };

  parseButtonData = () => {
    const {
      buttonData,
      type,
      fixedButtonInversion,
      hideCloseButton,
    } = this.props;
    const _isMobileDevice = checkIfMobileDevice();
    // 1.0: have to invert the actual buttons in ButtonGroup
    const shouldInvert = type === 'info' || type === 'success';
    let buttonDetail = [];
    buttonData.length > 2 && buttonData.splice(2);
    buttonData.forEach((data, index) => {
      buttonDetail.push({ ...data });
      /* istanbul ignore else  */
      if (index === 0) {
        buttonDetail[0].id = this.buttonID;
        if (_isMobileDevice && hideCloseButton && this.state.isFirstFocus) {
          buttonDetail[0]['aria-live'] = 'polite';
          buttonDetail[0].ariaLabel = `${buttonDetail[0].children} button`;
        }
      }
      if (
        (index === 0 &&
          !data.hasOwnProperty('buttonType') &&
          (index === 0 && !data.hasOwnProperty('use'))) ||
        index === 1
      ) {
        buttonDetail[index].use = 'secondary';
      }
      buttonDetail[index].size = 'small';
      if (fixedButtonInversion) {
        buttonDetail[index].inverted = shouldInvert;
      }
    });
    return buttonDetail;
  };

  renderButtons = () => {
    const {
      buttonData,
      ButtonGroup,
      layout,
      viewport,
      surface,
      buttonGroupPaddingLeft,
    } = this.props;

    return (
      <Fragment>
        <ButtonAreaWrapper
          viewport={viewport}
          layout={layout}
          isIe={this._checkIfIe}
          buttonGroupPaddingLeft={buttonGroupPaddingLeft}
          paddingRight={this._getPaddingRight()}
        >
          <ButtonWrapper
            layout={layout}
            viewport={viewport}
            buttonData={buttonData}
            noButtonPadding={buttonData.length === 1}
          >
            {buttonData && (
              <ButtonGroup
                surface={surface} // 3.0 only
                data={this.parseButtonData()}
              />
            )}
          </ButtonWrapper>
        </ButtonAreaWrapper>
      </Fragment>
    );
  };

  renderNotificationContent = () => {
    const { layout, title, subtitle, viewport, buttonData } = this.props;
    return (
      <Fragment>
        <ContentWrapper
          layout={layout}
          viewport={viewport}
          contentTitle={title}
          subtitle={subtitle}
        >
          {this.renderIconElement()}
          {this.renderText()}
          {buttonData && !!buttonData.length && this.renderButtons()}
        </ContentWrapper>
      </Fragment>
    );
  };

  renderAlertWithoutTransition = () => {
    const {
      type,
      className,
      disableAnimation,
      viewport,
      minHeight,
      inline,
      fullBleed,
      'data-analyticstrack': analyticsTrack,
      'data-track': track,
      'data-track-ignore': trackIgnore,
      'data-clickstream': clickStream,
      borderRadius,
      calcBackgroundColor,
      surface,
      calcPadding,
      calcInlineMargin,
    } = this.props;
    const { visible } = this.state;

    return (
      <AlertWrapper
        minHeight={_getMinHeight(viewport, minHeight)}
        viewport={viewport}
        type={type}
        tabIndex={-1}
        style={{
          opacity: visible ? 1 : 0,
          height: visible ? 'auto' : 0,
          display: visible ? 'flex' : 'none',
        }}
        className={className}
        data-testid="alert"
        disableAnimation={disableAnimation}
        data-analyticstrack={analyticsTrack}
        data-track={track}
        data-track-ignore={trackIgnore}
        data-clickstream={clickStream}
        inline={inline}
        fullBleed={fullBleed}
        borderRadius={borderRadius}
        backgroundColor={calcBackgroundColor(type, surface)}
        padding={calcPadding(viewport)}
        inlineMargin={calcInlineMargin(viewport)}
      >
        {this.renderNotificationContent()}
      </AlertWrapper>
    );
  };

  renderAlertWithTransition = () => {
    const {
      type,
      children,
      className,
      viewport,
      minHeight,
      animateIn,
      animateOut,
      animationProperties,
      inline,
      fullBleed,
      layout,
      'data-analyticstrack': analyticsTrack,
      'data-track': track,
      'data-track-ignore': trackIgnore,
      'data-clickstream': clickStream,
      borderRadius,
      calcBackgroundColor,
      surface,
      calcPadding,
      calcInlineMargin,
    } = this.props;
    const { visible, unmounted, containerHeight } = this.state;

    return (
      visible && (
        <AlertWrapper
          animateIn={animateIn}
          animateOut={animateOut}
          animationProperties={animationProperties}
          containerHeight={containerHeight}
          minHeight={_getMinHeight(viewport, minHeight)}
          viewport={viewport}
          type={type}
          data-testid="alert"
          unmounted={unmounted}
          tabIndex={-1}
          data-analyticstrack={analyticsTrack}
          data-track={track}
          data-track-ignore={trackIgnore}
          data-clickstream={clickStream}
          inline={inline}
          fullBleed={fullBleed}
          borderRadius={borderRadius}
          backgroundColor={calcBackgroundColor(type, surface)}
          padding={calcPadding}
          inlineMargin={calcInlineMargin(viewport)}
        >
          {this.renderNotificationContent()}
        </AlertWrapper>
      )
    );
  };

  render() {
    const { disableAnimation, fullBleed, maxWidth, id, className } = this.props;
    return (
      <StyledDiv
        id={id}
        className={className}
        maxWidth={maxWidth}
        fullBleed={fullBleed}
        containerHeight={this.state.containerHeight}
        tabIndex={-1}
        innerRef={input => {
          this.wrapper = input;
        }}
      >
        {disableAnimation
          ? this.renderAlertWithoutTransition()
          : this.renderAlertWithTransition()}
      </StyledDiv>
    );
  }
}

Notification.propTypes = propTypes;
Notification.defaultProps = defaultProps;

export default withVDSManager(Notification);
