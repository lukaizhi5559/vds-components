import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  HelperText,
  ErrorText,
  Label,
  showError,
} from '@vds-core/form-elements';
import { TextLink } from '@vds-core/buttons';
import { Micro, Body } from '@vds-core/typography';
import { Tooltip } from '@vds-core/tooltips';
import {
  withVDSManager,
  calculateRem,
  checkIfMobileDevice,
  getOS,
  generateUUID,
  getBrowser,
} from '@vds-core/utilities';
import { Fonts } from '@vds-core/typography';
import { AccessibilityTokens } from '@vds-tokens/accessibility';
import { ColorTokens } from '@vds-tokens/color';
import { LayoutTokens } from '@vds-tokens/layout';
import { TypographyTokens } from '@vds-tokens/typography';
import { FormControlsTokens } from '@vds-tokens/form-controls';
import CreditCardIcon from './assets/CreditCardIcon';
import {
  creditCardOnChange,
  dateOnChange,
  _ignoreAlpha,
  determineMaxLength,
  _maskValue,
  _formatToPhone,
  stickyPlaceholderHTML,
  _formatToPhoneDash,
  _formatOnLoad,
  _determineCard,
} from './util/InputFormatting';

// Use error.svg
const ErrorIcon = (
  <svg
    id="Layer_1"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 21.6 21.6"
  >
    <path d="M10.80213,19.80122a2.39567,2.39567,0,0,1-1.705-.707L2.50743,12.50444a2.41244,2.41244,0,0,1,0-3.40913L9.09808,2.50555a2.4159,2.4159,0,0,1,3.40908-.001l6.58967,6.59073a2.41244,2.41244,0,0,1,0,3.40913L12.50716,19.0942A2.394,2.394,0,0,1,10.80213,19.80122Zm-7.4998-9.911a1.289,1.289,0,0,0,0,1.81931L9.893,18.29929a1.31476,1.31476,0,0,0,1.81928,0l6.58967-6.58976a1.289,1.289,0,0,0,0-1.81931L11.71226,3.30047a1.29076,1.29076,0,0,0-1.81928,0ZM9.95,15.05h1.7V13.367H9.95Zm0-6.00953.561,2.635h.56952l.56951-2.635V6.55H9.95Z" />
  </svg>
);

// Use checkmark-alt.svg
const CheckmarkAltIcon = (
  <svg
    id="Layer_1"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 21.6 21.6"
  >
    <path d="M10.80009,19.80015a9,9,0,1,1,9-9A9.01054,9.01054,0,0,1,10.80009,19.80015Zm0-16.87512a7.87512,7.87512,0,1,0,7.87512,7.87512A7.88411,7.88411,0,0,0,10.80009,2.925ZM14.75,8.63964,13.95474,7.85,9.62367,12.17072,7.64331,10.20631,6.85,10.9979,9.62562,13.75Z" />
  </svg>
);

function _calculateInputPadding() {
  return calculateRem(parseInt(FormControlsTokens.space.inset.value) - 1);
}

function _errorBackgroundColor(props) {
  const { error, surface, disabled, success } = props;
  if (error && surface === 'dark' && !disabled) {
    return ColorTokens.feedback.error.background.ondark.value;
  } else if (error && surface !== 'dark' && !disabled) {
    return ColorTokens.feedback.error.background.onlight.value;
  } else if (success && surface !== 'dark' && !disabled) {
    return ColorTokens.feedback.success.background.onlight.value;
  } else if (success && surface === 'dark' && !disabled) {
    return ColorTokens.feedback.success.background.ondark.value;
  } else {
    return surface === 'dark'
      ? FormControlsTokens.color.background.ondark.value
      : FormControlsTokens.color.background.onlight.value;
  }
}

const _getBorderColor = (
  disabled,
  surface,
  error,
  success,
  focused,
  hovered,
  isOpen
) => {
  return disabled && surface !== 'dark'
    ? ColorTokens.interactive.disabled.onlight.value
    : disabled && surface === 'dark'
    ? ColorTokens.interactive.disabled.ondark.value
    : (isOpen || focused || hovered) && surface !== 'dark' && !disabled
    ? ColorTokens.elements.primary.onlight.value
    : (isOpen || focused || hovered) && (surface === 'dark') & !disabled
    ? ColorTokens.elements.primary.ondark.value
    : error && !disabled && surface !== 'dark'
    ? ColorTokens.feedback.error.onlight.value
    : error && !disabled && surface === 'dark'
    ? ColorTokens.feedback.error.ondark.value
    : success && !disabled && surface !== 'dark'
    ? ColorTokens.feedback.success.onlight.value
    : success && !disabled && surface === 'dark'
    ? ColorTokens.feedback.success.ondark.value
    : surface === 'dark'
    ? FormControlsTokens.color.border.ondark.value
    : FormControlsTokens.color.border.onlight.value;
};

const _getBorderBottomColor = (
  disabled,
  surface,
  error,
  success,
  focused,
  hovered,
  isOpen
) => {
  return disabled && surface !== 'dark'
    ? ColorTokens.interactive.disabled.onlight.value
    : disabled && surface === 'dark'
    ? ColorTokens.interactive.disabled.ondark.value
    : error && surface !== 'dark' && !focused && !hovered && !isOpen
    ? ColorTokens.feedback.error.onlight.value
    : error && surface === 'dark' && !focused && !hovered && !isOpen
    ? ColorTokens.feedback.error.ondark.value
    : success && surface !== 'dark' && !focused && !hovered
    ? ColorTokens.feedback.success.onlight.value
    : success && surface === 'dark' && !focused && !hovered
    ? ColorTokens.feedback.success.ondark.value
    : !isOpen && !focused && !hovered && surface === 'dark' && !disabled
    ? ColorTokens.elements.secondary.ondark.value
    : !isOpen && !focused && !hovered && surface !== 'dark' && !disabled
    ? ColorTokens.elements.secondary.onlight.value
    : surface === 'dark'
    ? ColorTokens.elements.primary.ondark.value
    : ColorTokens.elements.primary.onlight.value;
};
const propTypes = {
  /**
   * If provided, the Input will be rendered in the Disabled State.
   */
  disabled: PropTypes.bool,
  /**
   * @ignore
   * If provided, the Input will be rendered with transparent background.
   */
  transparentBackground: PropTypes.bool,
  /**
   *
   * If provided, will provide the defaultValue for the input field.
   */
  defaultValue: PropTypes.any,
  /**
   *
   * If provided, the Input will be rendered in the ReadOnly State.
   */
  readOnly: PropTypes.bool,
  /**
   * The prop for the HTML name Attribute. This is used to specify a name for an input element. It is used to reference the form-data after submitting the form or to reference the element.
   */
  name: PropTypes.string,
  /**
   *  Determines what event this component will check for an error, options are 'onBlur' or 'onChange'.
   */
  errorEvent: PropTypes.oneOf(['blur', 'change', 'blurAndChange']),
  /**
   * Boolean or Function that returns a boolean value that determines if component should show the error state/error message. Function receives the 'event' object  on input change.
   * @note If this is provided, you are responsible for controlling all errors for this component. Otherwise, if the Input is required, this component will throw an error if the component is blurred and does not contain any input.
   */
  error: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  /**
   * If provided, an in the error state, the Input will render error text.
   */
  errorText: PropTypes.string,
  /**
   * If provided, will provide the context for the 'label' on the input field.
   */
  label: PropTypes.string,
  /**
   * If provided, will override the default sizing widths for the small and large datepicker input.
   */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * If provided, this is a callback function for when input text is changed. If input type is creditCard, it will return parameters (event, cardType).
   */
  onChange: PropTypes.func,
  /**
   * If provided, this is a callback function for when input text is focused.
   */
  onFocus: PropTypes.func,
  /**
   * If provided, this is a callback function for when input text is blured.
   */
  onBlur: PropTypes.func,
  /**
   * @ignore
   */
  isOpen: PropTypes.bool,
  /**
   * If provided, used as string that labels the element for accessibility.
   */
  ariaLabel: PropTypes.string,
  /**
   * When true, will add the required attribute to the input element, if false, a string of 'Optional' next to the label.
   */
  required: PropTypes.bool,
  /**
   * @ignore - adds max-width to input field.
   */
  maxWidth: PropTypes.string,
  /**
   * @ignore - adds min-width to input field.
   */
  minWidth: PropTypes.string,
  /**
   * @ignore - number representing height of input field.
   */
  inputHeight: PropTypes.string,
  /**
   * @ignore - padding on the inside of the input field.
   */
  calculateInputPadding: PropTypes.func,
  /**
   * @ignore defines the space between the select and the error text below.
   */
  errorLabelSpacing: PropTypes.string,
  /**
   * @ignore - spacing between the label and the input field.
   */
  labelMarginBottom: PropTypes.string,
  /**
   * if passed, Input is controlled by the parent component
   */
  value: PropTypes.string,
  /**
   * string representing the type of input.
   */
  type: PropTypes.oneOf([
    'text',
    'number',
    'calendar',
    'inlineAction',
    'password',
    'creditCard',
    'tel',
    'date',
    'securityCode',
  ]),
  /**
   * @input date
   * Format when using type = 'date'.
   */
  dateFormat: PropTypes.oneOf(['mmyy', 'mmddyy', 'mmddyyyy']),
  /**
   * @input inlineAction
   * This is the label for the textlink when the type = inlineAction.
   */
  inlineActionButtonLabel: PropTypes.string,
  /**
   * @input password
   * This is the label that will be displayed when the password is masked.
   */
  showPasswordButtonLabel: PropTypes.string,
  /**
   * @input password
   *  This is the label that will be displayed when the password is unmasked.
   */
  hidePasswordButtonLabel: PropTypes.string,
  /**
   * @input password
   * Config object for the show button element
   */
  showPasswordButton: PropTypes.shape({
    label: PropTypes.string,
    ariaLabel: PropTypes.string,
    'data-analyticstrack': PropTypes.string,
    'data-clickstream': PropTypes.string,
    'data-sitecat-cta': PropTypes.string,
    'data-sitecat-datatrack': PropTypes.string,
    'data-sitecat-level': PropTypes.string,
    'data-sitecat-position': PropTypes.string,
    'data-track': PropTypes.string,
    'data-track-ignore': PropTypes.string,
    'data-testid': PropTypes.string,
  }),
  /**
   * @input password
   * Config object for the hide button element
   */
  hidePasswordButton: PropTypes.shape({
    label: PropTypes.string,
    ariaLabel: PropTypes.string,
    'data-analyticstrack': PropTypes.string,
    'data-clickstream': PropTypes.string,
    'data-sitecat-cta': PropTypes.string,
    'data-sitecat-datatrack': PropTypes.string,
    'data-sitecat-level': PropTypes.string,
    'data-sitecat-position': PropTypes.string,
    'data-track': PropTypes.string,
    'data-track-ignore': PropTypes.string,
    'data-testid': PropTypes.string,
  }),
  /**
   * @ignore If passed, new TextLink component will render for inlineAction.
   */
  TextLink: PropTypes.func,
  /**
   * If provided with value 'toggle', the input field will render show/hide button to unmask the text for type === 'password', otherwise input field will always be masked
   * @note Use of this feature must be approved for each individual use case by the Internal Risk Management (IRM) team prior to implementation.
   */
  mask: PropTypes.oneOf(['always', 'toggle']),
  /**
   * When true the compoment will be rendered in the success state.
   */
  success: PropTypes.bool,
  /**
   * This is the text that will be rendered when the component is in it's sunccess state.
   */
  successText: PropTypes.string,
  /**
   * When type = 'inlineAction' this callback will be applied to the action element and will fire when clicked.
   */
  onClickInlineAction: PropTypes.func,
  /**
   * This will determine the max length and tooltip information when type = "securityCode"
   */
  cardType: PropTypes.oneOf([
    'other',
    'visa',
    'mastercard',
    'jcb',
    'discover',
    'dinersClub',
    'amex',
    'unionPay',
  ]),
  /**
   * If provided, will contain the string for the helper text
   */
  helperText: PropTypes.string,
  /**
   * Determines the placement of the helper text (right or bottom)
   */
  helperTextPlacement: PropTypes.oneOf(['right', 'bottom']),
  /**
   * @ignore If passed, new Body component will render.
   */
  Body: PropTypes.func,
  /**
   * @ignore If passed, new Micro component will render.
   */
  Micro: PropTypes.func,
  /**
   * Allows a unique ID to be passed to the component.
   */
  id: PropTypes.string,
  /**
   * Allows a unique ID to be passed to the input element.
   */
  inputId: PropTypes.string,
  /**
   * @ignore If passed, the CreditCardIcon will render
   */
  CreditCardIcon: PropTypes.func,
  /**
   * @ignore If passed, the Tooltip will render
   */
  Tooltip: PropTypes.func,
  /**
   *  If passed, sets Max character length for input field
   */
  maxLength: PropTypes.number,
  /**
   * @ignore If passed, an icon like calendar icon will render
   */
  renderInputIcon: PropTypes.func,
  /**
   * If provided, the Input will be rendered the inverted state.
   * @ignore
   */
  surface: PropTypes.oneOf(['light', 'dark']),
  /**
   * @ignore If passed, a background color will be passed to the input
   */
  errorBackgroundColor: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  /**
   * @ignore string representing the input's border bottom width
   */
  borderBottomWidth: PropTypes.string,
  /**
   * @ignore If true, sets the error state border bottom with to heavy
   */
  heavyErrorBorder: PropTypes.bool,
  /**
   * @ignore
   * For type securityCode, render the tooltip as a dialog only for Brand 3.0
   */
  renderSecurityCodeTooltipDialog: PropTypes.bool,
  /**
   *@ignore String, array or node containing the title of the Tooltip for Input label
   */
  tooltipTitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.node,
  ]),
  /**
   * @ignore String, array or node containing the body of the Tooltip for Input label
   */
  tooltipContent: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.node,
  ]),
  /**
   * @ignore
   * String containing text for the Close button of the Tooltip for Input label when on mobile/touch devices
   */
  tooltipCloseButtonText: PropTypes.string,
  /**
   * String, array or node containing the title of the Tooltip for Input label
   * @ignore Config object for tooltip option
   */
  tooltip: PropTypes.shape({
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.node,
    ]),
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.node,
    ]),
    closeButtonText: PropTypes.string,
    'data-track': PropTypes.string,
    'data-track-ignore': PropTypes.string,
    'data-analyticstrack': PropTypes.string,
    'data-clickstream': PropTypes.string,
  }),
  /*
   * String to configure the permission to browser for automated assistance in filling out the input field value.
   */
  autoComplete: PropTypes.string,
  /**
   * If true, adds contains-pii class to input element for glassbox analytics
   */
  containsPii: PropTypes.bool,
};

const defaultProps = {
  disabled: false,
  transparentBackground: false,
  error: undefined,
  errorEvent: 'blur',
  readOnly: false,
  label: undefined,
  mask: 'toggle',
  isOpen: false,
  inputHeight: calculateRem(44),
  required: true,
  maxWidth: null,
  minWidth: calculateRem(44),
  errorLabelSpacing: calculateRem(8),
  labelMarginBottom: calculateRem(4),
  calculateInputPadding: _calculateInputPadding,
  Body: Body,
  Micro: Micro,
  TextLink: TextLink,
  type: undefined,
  CreditCardIcon: CreditCardIcon,
  Tooltip: Tooltip,
  width: '100%',
  surface: 'light',
  errorBackgroundColor: _errorBackgroundColor,
  borderBottomWidth: calculateRem(1),
  heavyErrorBorder: false,
  inlineActionButtonLabel: 'Apply',
  showPasswordButtonLabel: 'Show',
  hidePasswordButtonLabel: 'Hide',
  getBorderColor: _getBorderColor,
  getBorderBottomColor: _getBorderBottomColor,
  renderSecurityCodeTooltipDialog: true,
  autoComplete: 'off',
  containsPii: false,
};

const ComponentContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: ${({ helperTextPlacement }) =>
    helperTextPlacement === 'right' ? 'row' : 'column'};
  width: ${({ containerWidth }) =>
    typeof containerWidth === 'number'
      ? calculateRem(containerWidth)
      : containerWidth};
  max-width: ${({ maxWidth }) => calculateRem(maxWidth)};
  min-width: ${({ minWidth }) => calculateRem(minWidth)};
`;

const StyledContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  position: relative;
  flex-direction: column;
  input[type='number'] {
    -moz-appearance: textfield; /* Firefox */
  }
`;

const InputContainer = styled.span`
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  height: ${({ inputHeight }) => inputHeight};
  max-width: ${({ maxWidth }) => maxWidth && calculateRem(maxWidth)};
  min-width: ${({ minWidth }) => minWidth && calculateRem(minWidth)};
  background-color: ${({
    surface,
    errorBackgroundColor,
    transparentBackground,
    error,
    success,
  }) =>
    transparentBackground && !error && !success
      ? 'transparent'
      : errorBackgroundColor
      ? errorBackgroundColor
      : surface === 'dark'
      ? FormControlsTokens.color.background.onlight.value
      : FormControlsTokens.color.background.ondark.value};
  box-sizing: border-box;
  ${({ heavyErrorBorder }) =>
    !heavyErrorBorder &&
    `border-radius: ${FormControlsTokens.border.radius.value};`}
  border: ${calculateRem(FormControlsTokens.border.width.value)} solid
    ${({
      error,
      isOpen,
      disabled,
      focused,
      surface,
      success,
      hovered,
      getBorderColor,
    }) =>
      getBorderColor(
        disabled,
        surface,
        error,
        success,
        focused,
        hovered,
        isOpen
      )};
  border-bottom: ${calculateRem(1)} solid
    ${({
      disabled,
      surface,
      error,
      success,
      focused,
      hovered,
      isOpen,
      getBorderBottomColor,
    }) =>
      getBorderBottomColor(
        disabled,
        surface,
        error,
        success,
        focused,
        hovered,
        isOpen
      )};
  ${({ readOnly, surface }) =>
    readOnly &&
    `
      border: ${calculateRem(1)} solid ${
      surface === 'dark'
        ? FormControlsTokens.color.border.readonly.ondark.value
        : FormControlsTokens.color.border.readonly.onlight.value
    };
  `};

  ${({ readOnly, disabled, surface }) =>
    `
      &:hover {
        border: ${calculateRem(1)} solid ${
      (readOnly || disabled) && surface !== 'dark'
        ? ColorTokens.interactive.disabled.onlight.value
        : (readOnly || disabled) && surface === 'dark'
        ? ColorTokens.interactive.disabled.ondark.value
        : surface === 'dark'
        ? FormControlsTokens.color.border.hover.ondark.value
        : FormControlsTokens.color.border.hover.onlight.value
    };

  }
  `};
  ${({
    error,
    success,
    disabled,
    readOnly,
    surface,
    borderBottomWidth,
    isOpen,
    focused,
    heavyErrorBorder,
    getBorderBackground,
  }) =>
    (error || success) &&
    !disabled &&
    !readOnly &&
    heavyErrorBorder &&
    `
    &::before {
      background: ${getBorderBackground(error)};
      box-shadow: none;
      content: '';
      height: ${borderBottomWidth};
      left: ${-1}px;
      position: absolute;
      bottom: ${-1}px;
      width: calc(100% + ${calculateRem(2)});
      z-index: 1;
    }
  `};
  ${({ disabled, surface, heavyErrorBorder, focused, keyboardFocused }) =>
    !disabled &&
    !heavyErrorBorder &&
    focused &&
    keyboardFocused &&
    `
      outline: none;
        &::before {
          border: ${AccessibilityTokens.focusring.borderwidth.value} ${
      AccessibilityTokens.focusring.borderstyle.value
    } ${
      surface === 'dark'
        ? AccessibilityTokens.color.focusring.ondark.value
        : AccessibilityTokens.color.focusring.onlight.value
    };
          content: '';
          left: 50%;
          border-radius: ${calculateRem(6)};
          position: absolute;
          height: calc(100% + ${calculateRem(6)});
          top: 50%;
          transform: translate(-50%, -50%);
          width: calc(100% + ${calculateRem(6)});
        }
      &:hover {
        &::before {
          border: none;
        }
      }
    `}
`;

const StickyPlaceholder = styled.div`
  color: ${({ disabled, surface }) =>
    disabled
      ? ColorTokens.interactive.disabled.onlight.value
      : surface === 'dark'
      ? ColorTokens.elements.secondary.ondark.value
      : ColorTokens.elements.secondary.onlight.value};
  font-family: ${Fonts.VerizonNHGeDS};
  font-size: ${TypographyTokens.fontsize.body[16].value};
  letter-spacing: ${TypographyTokens.letterspacing.wide.value};
  line-height: ${TypographyTokens.lineheight.body[20].value};
  margin-left: ${calculateRem(LayoutTokens.space['3X'].value)};
  pointer-events: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  span {
    color: transparent;
  }
  .slash {
    color: ${({ disabled }) =>
      disabled
        ? ColorTokens.interactive.disabled.onlight.value
        : ColorTokens.elements.primary.onlight.value};
  }
`;

const StyledInput = styled.input`
  flex: 1;
  display: flex;
  width: 100%;
  border: none;
  box-sizing: border-box;
  pointer-events: auto;
  ${({ heavyErrorBorder }) =>
    !heavyErrorBorder &&
    `border-radius: ${FormControlsTokens.border.radius.value};`}
  background-color: transparent;
  caret-color: ${({ surface, caretColor }) =>
    caretColor
      ? caretColor
      : surface === 'dark'
      ? ColorTokens.elements.primary.ondark.value
      : ColorTokens.elements.primary.onlight.value};
  color: ${({ disabled, surface }) =>
    disabled && surface !== 'dark'
      ? ColorTokens.interactive.disabled.onlight.value
      : disabled && surface === 'dark'
      ? ColorTokens.interactive.disabled.ondark.value
      : surface === 'dark'
      ? ColorTokens.elements.primary.ondark.value
      : ColorTokens.elements.primary.onlight.value};
  font-family: ${Fonts.VerizonNHGeDS};
  font-size: ${calculateRem(TypographyTokens.fontsize.body[16].value)};
  line-height: ${calculateRem(TypographyTokens.lineheight.body[20].value)};
  letter-spacing: ${({ masked }) =>
    masked
      ? calculateRem(LayoutTokens.space['1X'].value)
      : calculateRem(TypographyTokens.letterspacing.wide.value)};
  margin: 0;
  ::-ms-clear,
  ::-ms-reveal {
    display: none;
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }
  &[disabled] {
    -webkit-text-fill-color: ${({ surface }) =>
      surface !== 'dark'
        ? ColorTokens.interactive.disabled.onlight.value
        : ColorTokens.interactive.disabled.ondark.value};
  }

  ::placeholder {
    position: relative;
    color: ${({ surface }) =>
      surface === 'dark'
        ? ColorTokens.interactive.disabled.ondark.value
        : ColorTokens.interactive.disabled.onlight.value} !important;
    top: 0px;
  }

  &:focus {
    outline: none;
  }
  padding: ${({ calculateInputPadding }) => calculateInputPadding()};
`;

const ActionWrapper = styled.div`
  display: inline-flex;
  height: ${calculateRem(20)};
  padding: ${calculateRem(
    0,
    parseInt(FormControlsTokens.space.inset.value) - 1,
    0,
    0
  )};
`;

const IconContainer = styled.span`
  display: inline-flex;
  align-items: center;
  padding-right: ${({ renderPadding }) =>
    renderPadding && calculateRem(LayoutTokens.space['2X'].value)};
  outline: none;
  pointer-events: none;
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

const InputWrapper = styled.div`
  flex: 1;
  position: relative;
  width: 100%;
`;

const FlexedRowContainer = styled.span`
  display: flex;
  flex-direction: row;
  position: relative;
`;

const FlexedColContainer = styled.span`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  position: relative;
  width: ${({ helperText, helperTextPlacement }) =>
    helperText && helperTextPlacement === 'right' ? '50%' : '100%'};
`;

const CardIconContainer = styled.div`
  display: inline-flex;
  padding: ${({ error, heavyErrorBorder }) =>
    heavyErrorBorder
      ? calculateRem(
          LayoutTokens.space['3X'].value,
          0,
          LayoutTokens.space['3X'].value,
          LayoutTokens.space['3X'].value
        )
      : calculateRem(
          0,
          0,
          0,
          parseInt(FormControlsTokens.space.inset.value) - 1
        )};
  width: ${calculateRem(34)};
  ${({ heavyErrorBorder }) =>
    !heavyErrorBorder &&
    `
    border-radius: 4px 0 0 4px;
    background-color: transparent;
    `}
`;

class InputField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardType: 'placeholder',
      value: this.props.value
        ? this.props.value
        : this.props.defaultValue
        ? this.props.defaultValue
        : '',
      hidden: true,
      focused: false,
      hovered: false,
      formattedValue: '',
      maskCC: false,
      error: typeof this.props.error === 'function' ? false : this.props.error, // If error passes a function, then the error state will initially be set to false
      emptyError: this.props.emptyError,
    };
  }

  componentDidMount() {
    this.isControlled = this.props.value !== undefined;

    if (this.props.type === 'tel') {
      let formattedValue =
        this.props.value || this.props.defaultValue
          ? _formatOnLoad(this.props.value || this.props.defaultValue)
          : '';
      this.setState({ value: formattedValue });
    }

    const propValue = this.props.value || this.props.defaultValue;

    if (this.props.type === 'creditCard' && propValue) {
      const clean = propValue.replace(/\D/g, '');
      const { cardType } = _determineCard(undefined, clean);
      const isCompleteCardValue =
        (propValue.length === 16 && cardType === 'dinersClub') ||
        (propValue.length === 17 && cardType === 'amex') ||
        propValue.length === 19 ||
        (propValue.length === 20 && cardType === 'unionPay');
      console.log(propValue, cardType);
      this.setState({
        cardType: this.props.cardType ? this.props.cardType : cardType,
        maskCC: isCompleteCardValue,
      });
    }

    this.isMobileDevice = checkIfMobileDevice();
    this.isAndroidDevice = getOS() === 'android';
    this.isAppleDevice = getOS() === 'osx' || getOS() === 'ios';
    this.inlineButtonWrapperId = `inlineButtonWrapper-${generateUUID()}`;
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { emptyError, required, value, error, type } = this.props;

    if (prevProps.value !== value && this.isControlled) {
      this.setState({ value: value });
    }

    if (typeof error === 'boolean' && prevProps.error !== error) {
      this.setState({ error: error });
    }
    // datepicker passes an error prop regardless, so need to check for non datepicker inputfields if the error is undefined
    // all empty error handling for datepicker is handled within datepicker
    if (type !== 'calendar' && error === undefined) {
      if (prevProps.emptyError !== emptyError) {
        this.setState({ emptyError: emptyError });
      }
      if (prevProps.required !== this.props.required) {
        this.setState({ emptyError: false });
      }
    }
    if (type !== 'calendar') {
      if (prevProps.required !== this.props.required && !this.props.required) {
        this.setState({ emptyError: false });
      }
    }
    if (type === 'calendar') {
      if (prevProps.emptyError !== emptyError) {
        this.setState({ emptyError: emptyError });
      }
      if (
        prevProps.required !== this.props.required ||
        (prevProps.value !== this.props.value && this.props.value)
      ) {
        this.setState({ emptyError: false });
      }
    }
  };

  _onClick = e => {
    const { onClickInlineAction, type } = this.props;
    const { hidden } = this.state;
    onClickInlineAction && onClickInlineAction(e);
    // if (this.props.type === 'taxID') {
    //   let clean = this.state.formattedValue.replace(/\D/g, '');
    //   if (!this.state.hidden) {
    //     this.setState({ value: clean });
    //   } else {
    //     this.setState({ value: this.state.formattedValue });
    //   }
    if (type === 'password') {
      const iconBtnWrapper =
        typeof document !== 'undefined' &&
        document.getElementById(this.inlineButtonWrapperId);
      iconBtnWrapper && iconBtnWrapper.setAttribute('aria-live', 'assertive');
      if (hidden) {
        this.setState({ hidden: false });
        setTimeout(() => {
          iconBtnWrapper.setAttribute('aria-live', 'off');
          this.setState({ hidden: true });
        }, 10000);
      } else {
        this.setState({ hidden: true });
      }
    }
    // }
  };

  _onKeyDown = e => {
    const { onClickInlineAction, type } = this.props;
    const { hidden } = this.state;
    if (e.keyCode === 13 || e.keyCode === 32) {
      onClickInlineAction && onClickInlineAction(e);
      if (type === 'password') {
        const iconBtnWrapper =
          typeof document !== 'undefined' &&
          document.getElementById(this.inlineButtonWrapperId);
        iconBtnWrapper && iconBtnWrapper.setAttribute('aria-live', 'assertive');
        if (hidden) {
          this.setState({ hidden: false });
          setTimeout(() => {
            iconBtnWrapper.setAttribute('aria-live', 'off');
            this.setState({ hidden: true });
          }, 10000);
        } else {
          this.setState({ hidden: true });
        }
      }
    }
  };

  _renderIcon = error => {
    const { type, mask, surface } = this.props;
    let renderPadding =
      type === 'inlineAction' ||
      /* type === 'taxID' || */
      (type === 'password' && this.state.value.length > 0 && mask === 'toggle');
    return (
      <IconContainer
        tabIndex={-1}
        renderPadding={renderPadding}
        aria-hidden="true"
      >
        <IconSVGWrapper
          tabIndex={-1}
          iconSize={20} // size medium of 20px
          iconColor={
            surface === 'dark'
              ? ColorTokens.elements.primary.ondark.value
              : ColorTokens.elements.primary.onlight.value
          }
          aria-hidden={true}
          aria-label={error ? 'error icon' : 'checkmark-alt icon'}
        >
          {error ? ErrorIcon : CheckmarkAltIcon}
        </IconSVGWrapper>
      </IconContainer>
    );
  };

  _renderInlineAction = () => {
    const {
      type,
      disabled,
      readOnly,
      surface,
      inlineActionButtonLabel,
      showPasswordButtonLabel,
      hidePasswordButtonLabel,
      showPasswordButton,
      hidePasswordButton,
      TextLink,
    } = this.props;

    let inlineActionText, inlineActionAriaLabel;
    if (type === 'password') {
      if (this.state.hidden) {
        inlineActionText =
          showPasswordButton && showPasswordButton.label
            ? showPasswordButton.label
            : showPasswordButtonLabel;
        inlineActionAriaLabel =
          showPasswordButton && showPasswordButton.ariaLabel
            ? showPasswordButton.ariaLabel
            : `${showPasswordButtonLabel} password`;
      } else {
        inlineActionText =
          hidePasswordButton && hidePasswordButton.label
            ? hidePasswordButton.label
            : hidePasswordButtonLabel;
        inlineActionAriaLabel =
          hidePasswordButton && hidePasswordButton.ariaLabel
            ? hidePasswordButton.ariaLabel
            : `${hidePasswordButtonLabel} password`;
      }
    } else {
      inlineActionText = inlineActionButtonLabel;
      inlineActionAriaLabel = inlineActionButtonLabel;
    }

    // if (type === 'taxID') {
    //   if (this.state.hidden) {
    //     inlineActionText = showPasswordButtonLabel;
    //     inlineActionAriaLabel = `${showPasswordButtonLabel} tax ID number`;
    //   } else {
    //     inlineActionText = hidePasswordButtonLabel;
    //     inlineActionAriaLabel = `${hidePasswordButtonLabel} tax ID number`;
    //   }
    // }
    return (
      <TextLink
        type="standAlone"
        size="large"
        viewport="desktop"
        disabled={disabled || readOnly}
        onClick={this._onClick}
        ariaLabel={inlineActionAriaLabel}
        onKeyDown={this._onKeyDown}
        surface={surface}
        role="button"
      >
        {inlineActionText}
      </TextLink>
    );
  };
  _onPaste = e => {
    if (this.props.type === 'tel') {
      const currentTarget = e.currentTarget;
      setTimeout(() => {
        currentTarget.setSelectionRange(
          currentTarget.value.length,
          currentTarget.value.length
        );
      });
    }
    this.props.onPaste && this.props.onPaste(e);
  };
  _onChange = e => {
    const {
      dateFormat,
      type,
      onChange,
      taxIDFormat,
      errorEvent,
      error,
      required,
      emptyError: emptyErrorProp,
      heavyErrorBorder,
    } = this.props;
    const _this = this;
    type !== 'creditCard' && onChange && onChange(e);

    // check for error on change
    errorEvent &&
      (errorEvent === 'change' || errorEvent === 'blurAndChange') &&
      showError(e, _this);

    let obj;
    let fromOnChange = true;
    switch (type) {
      case 'creditCard':
        e.target.value = _ignoreAlpha(e);
        obj = creditCardOnChange(
          e,
          this.state.value,
          this.state.cardType,
          fromOnChange
        );
        onChange && onChange(e, obj.cardType);
        if (required && obj.value.length > 0)
          this.setState({ emptyError: false });
        return this.setState({ value: obj.value, cardType: obj.cardType });
      case 'tel':
        if (heavyErrorBorder) {
          obj = _formatToPhone(e, this.state.value, fromOnChange);
        } else {
          obj = _formatToPhoneDash(e, this.state.value, fromOnChange);
        }
        _formatToPhone;
        if (required && obj.value.length > 0)
          this.setState({ emptyError: false });
        return this.setState({ value: obj.value });
      case 'date':
        e.target.value = _ignoreAlpha(e);
        obj = dateOnChange(e, this.state.value, dateFormat);
        if (required && obj.value.length > 0)
          this.setState({ emptyError: false });
        return this.setState({ value: obj.value });
      // case 'taxID':
      //   e.target.value = _ignoreAlpha(e);
      //   let targetValue = e.target.value;
      //   obj = _taxIDOnChange(
      //     e,
      //     this.state.value,
      //     this.state.hidden,
      //     taxIDFormat
      //   );
      //   return this.setState({
      //     formattedValue: obj.formattedValue,
      //     value: this.state.hidden ? targetValue : obj.value,
      //   });
      case 'securityCode':
        e.target.value = _ignoreAlpha(e);
      default:
        if (required && e.target.value.length > 0 && !emptyErrorProp)
          this.setState({ emptyError: false });
        return !this.isControlled && this.setState({ value: e.target.value });
    }
  };

  setHover = () => {
    this.setState({ hovered: !this.state.hovered });
  };

  _determineInputType = () => {
    const { type, readOnly } = this.props;
    const { hidden } = this.state;
    if (/* type === 'taxID' ||  */ type === 'password') {
      if (hidden || readOnly) {
        return 'password';
      } else {
        return 'text';
      }
    } else if (type === 'securityCode') {
      return 'password';
    } else if (type === 'date' || type === 'creditCard') {
      return 'text';
    } else if (type === 'calendar') {
      return undefined;
    }
    return type;
  };

  _determineValue = () => {
    const { type, readOnly, value, defaultValue } = this.props;
    if (value || defaultValue) {
      if (type === 'tel' || type === 'securityCode') {
        return this.state.value;
      }
      if (type === 'creditCard') {
        return this.state.maskCC
          ? _maskValue(this.state.value, this.state.cardType)
          : this.state.value;
      } else return value;
    } else if (type === 'creditCard' && readOnly) {
      return _maskValue(this.state.value, this.state.cardType);
    } /* else if (type === 'taxID' && readOnly) {
      let clean = this.state.formattedValue.replace(/\D/g, '');
      return clean;
    } */ else if (
      type === 'creditCard' &&
      this.state.maskCC
    ) {
      return _maskValue(this.state.value, this.state.cardType);
    } else {
      return this.state.value;
    }
  };

  _renderStickyPlaceholder = body => {
    const { value, error } = this.state;
    const { disabled, dateFormat, success, surface } = this.props;
    return (
      <StickyPlaceholder
        success={success}
        error={error}
        disabled={disabled}
        surface={surface}
      >
        {stickyPlaceholderHTML(dateFormat, value)}
      </StickyPlaceholder>
    );
  };

  _onFocus = e => {
    const { type, readOnly, onFocus } = this.props;
    if (readOnly) {
      return;
    }
    onFocus && onFocus(e);
    const isCompleteCardValue =
      type === 'creditCard' &&
      ((this.state.value.length === 16 &&
        this.state.cardType === 'dinersClub') ||
        (this.state.value.length === 17 && this.state.cardType === 'amex') ||
        this.state.value.length === 19);

    if (!readOnly) {
      if (type === 'securityCode' || isCompleteCardValue) {
        this.setState({ value: '', cardType: 'placeholder', maskCC: false });
      }
      this.setState({ focused: true });
      if (!this.state.hovered) this.setState({ keyboardFocused: true });
    }

    // if (type === 'calendar') e.target.blur();
  };

  _onBlur = e => {
    const {
      type,
      readOnly,
      errorEvent,
      error,
      required,
      isOpen,
      onBlur,
      emptyError: emptyErrorProp,
    } = this.props;
    if (readOnly) {
      return;
    }
    const _this = this;
    onBlur && onBlur(e);
    const isCompleteCardValue =
      (this.state.value.length === 16 &&
        this.state.cardType === 'dinersClub') ||
      (this.state.value.length === 17 && this.state.cardType === 'amex') ||
      this.state.value.length === 19 ||
      (this.state.value.length === 20 && this.state.cardType === 'unionPay');

    if (!readOnly) {
      if (type === 'creditCard' && isCompleteCardValue) {
        this.setState({ maskCC: true });
      }
      this.setState({ focused: false, keyboardFocused: false });
    }
    // check for error on blur
    (errorEvent === 'blur' || errorEvent === 'blurAndChange') &&
      showError(e, _this);
    if (
      required &&
      (!this.state.value || (type === 'creditCard' && !isCompleteCardValue)) &&
      error !== true &&
      (type != 'calendar' || (!isOpen && !this.props.value))
    ) {
      this.setState({ emptyError: true });
    }
    if (type === 'creditCard') {
      e.target.setCustomValidity(!isCompleteCardValue ? ' ' : '');
    }
    if (getOS() === 'ios' && getBrowser() === 'chrome') {
      // to prevent from onFocus triggering again after 'done' button pressed
      e.target.blur();
    }
  };

  _renderHelperText = () => {
    const {
      helperText,
      helperTextPlacement,
      disabled,
      Body,
      surface,
    } = this.props;

    return (
      <HelperText
        helperText={helperText}
        helperTextPlacement={helperTextPlacement}
        disabled={disabled}
        Body={Body}
        surface={surface}
      />
    );
  };

  render() {
    const {
      value,
      readOnly,
      error: errorProp,
      label,
      errorText: errorTextProp,
      disabled,
      width,
      isOpen,
      ariaLabel,
      required,
      minWidth,
      maxWidth,
      calculateInputPadding,
      labelMarginBottom,
      placeholder,
      id,
      type,
      inputHeight,
      dateFormat,
      CreditCardIcon,
      tooltip,
      Tooltip,
      tooltipTitle,
      tooltipContent,
      tooltipCloseButtonText,
      helperTextPlacement,
      helperText,
      success,
      successText,
      Body,
      Micro,
      taxIDFormat,
      cardType: cardBrand, // cardBrand is to determine the card type for security code tooltip
      onClickInlineAction,
      maxLength,
      className,
      inputId,
      mask,
      renderInputIcon,
      errorLabelSpacing,
      surface,
      caretColor,
      errorBackgroundColor,
      borderBottomWidth,
      heavyErrorBorder,
      getBorderBackground,
      getBorderColor,
      getBorderBottomColor,
      renderSecurityCodeTooltipDialog,
      transparentBackground,
      onClick,
      autoComplete,
      containsPii,
      ...rest
    } = this.props;

    const { cardType, focused, error: errorState, emptyError } = this.state;

    // Error state has preference over component's error
    // Because errorProp might be a function, we first need to check if prop is a bool and only then assign its value
    const error =
      emptyError || errorState || (typeof errorProp === 'boolean' && errorProp);

    const fieldId = inputId ? inputId : generateUUID();

    let renderIcon = (error || success) && !focused && !readOnly && !disabled;
    let showPassword =
      this.state.value && this.state.value.length > 0 && mask === 'toggle';
    let renderInlineAction =
      (type === 'inlineAction' ||
        /* type === 'taxID' || */
        (type === 'password' && showPassword)) &&
      !readOnly;

    let labelId = fieldId + '-label';

    let trueLabel = label ? label : '';

    function _dateAriaLabel() {
      if (type === 'date') {
        switch (dateFormat) {
          case 'mmyy':
            return (
              label +
              ' input, please enter two digits for the month and two digits for the year'
            );
          case 'mmddyy':
            return (
              label +
              ' input, please enter two digits for the month, two digits for the day and two digits for the year'
            );
          case 'mmddyyyy':
            return (
              label +
              ' input, please enter two digits for the month, two digits for the day and four digits for the year'
            );
        }
      }
    }

    let accessLabel = ariaLabel
      ? ariaLabel
      : type === 'date'
      ? _dateAriaLabel()
      : !required
      ? trueLabel + ' Optional Input Field'
      : trueLabel;

    const errorText = errorTextProp
      ? errorTextProp
      : emptyError
      ? `You must enter a ${trueLabel.toLowerCase()}`
      : '';

    error &&
      !errorText &&
      console.error('Error Text for Input MUST be provided');

    const _determineAriaLabel = () => {
      let ariaLabel;
      if (error && errorText) {
        if (helperText) {
          ariaLabel = `${accessLabel} ${errorText} ${helperText}`;
        } else {
          ariaLabel = `${accessLabel} ${errorText}`;
        }
      } else {
        if (helperText) {
          ariaLabel = `${accessLabel} ${helperText}`;
        } else {
          ariaLabel = accessLabel;
        }
      }
      if (type === 'calendar') {
        const toExpandCalendar = this.isMobileDevice
          ? 'Double tap to expand calendar'
          : 'Press space/enter to expand calendar';
        ariaLabel = `${ariaLabel} ${
          isOpen
            ? 'expanded'
            : this.props.value
            ? `selected date ${this.props.value} collapsed. ${toExpandCalendar}`
            : `collapsed. ${toExpandCalendar}`
        }`;
      }
      return ariaLabel;
    };

    return (
      <ComponentContainer
        helperTextPlacement={helperTextPlacement}
        minWidth={minWidth}
        maxWidth={maxWidth}
        containerWidth={width}
        className={className}
        onMouseEnter={this.setHover}
        onMouseLeave={this.setHover}
      >
        <StyledContainer
          id={id}
          data-testid="test-container"
          helperTextPlacement={helperTextPlacement}
          helperText={helperText}
        >
          {label && (
            <Label
              Body={Body}
              Micro={Micro}
              width={width}
              disabled={disabled}
              required={required}
              label={label}
              tooltip={tooltip}
              Tooltip={Tooltip}
              tooltipTitle={tooltipTitle}
              tooltipContent={tooltipContent}
              tooltipCloseButtonText={tooltipCloseButtonText}
              type={type}
              data-testid="test-label"
              id={labelId}
              aria-label={label}
              htmlFor={
                type === 'calendar' && this.isAppleDevice ? undefined : fieldId
              }
              cardType={cardBrand}
              labelMarginBottom={labelMarginBottom}
              overflowEllipsis
              helperTextPlacement={helperTextPlacement}
              helperText={helperText}
              CreditCardIcon={CreditCardIcon}
              surface={surface}
              renderSecurityCodeTooltipDialog={renderSecurityCodeTooltipDialog}
            />
          )}
          <FlexedRowContainer>
            <FlexedColContainer
              helperText={helperText}
              helperTextPlacement={helperTextPlacement}
              aria-live={
                (type === 'calendar' && this.isMobileDevice) ||
                this.isAppleDevice
                  ? undefined
                  : 'assertive'
              }
            >
              {renderInputIcon && renderInputIcon()}
              <InputContainer
                transparentBackground={transparentBackground}
                hovered={this.state.hovered}
                keyboardFocused={this.state.keyboardFocused}
                minWidth={minWidth}
                heavyErrorBorder={heavyErrorBorder}
                maxWidth={maxWidth}
                error={error}
                disabled={disabled}
                isOpen={isOpen}
                type={type}
                inputHeight={inputHeight}
                success={success}
                helperText={helperText}
                helperTextPlacement={helperTextPlacement}
                successText={successText}
                errorText={errorText}
                label={label}
                readOnly={readOnly}
                borderBottomWidth={borderBottomWidth}
                errorBackgroundColor={errorBackgroundColor}
                surface={surface}
                focused={this.state.focused}
                getBorderBackground={getBorderBackground}
                getBorderColor={getBorderColor}
                getBorderBottomColor={getBorderBottomColor}
              >
                {type === 'creditCard' && (
                  <CardIconContainer
                    error={error}
                    cardType={cardType}
                    success={success}
                    heavyErrorBorder={heavyErrorBorder}
                  >
                    <CreditCardIcon surface={surface} name={cardType} />
                  </CardIconContainer>
                )}
                <InputWrapper
                  aria-live={
                    type === 'calendar' && isOpen ? 'assertive' : 'off'
                  }
                  onClick={
                    type === 'calendar' && this.isAndroidDevice
                      ? () => onClick()
                      : undefined
                  }
                  tabIndex={
                    type === 'calendar' && this.isAndroidDevice ? -1 : undefined
                  }
                  aria-label={
                    type === 'calendar' && this.isAndroidDevice
                      ? _determineAriaLabel()
                      : undefined
                  }
                >
                  <StyledInput
                    className={containsPii ? 'contains-PII' : undefined}
                    maxLength={determineMaxLength(
                      this.state.cardType,
                      type,
                      dateFormat,
                      cardBrand,
                      maxLength
                    )}
                    data-testid="test-input"
                    placeholder={null}
                    errorBackgroundColor={errorBackgroundColor}
                    aria-label={_determineAriaLabel()}
                    id={fieldId}
                    autoComplete={autoComplete}
                    inputHeight={inputHeight}
                    inputMode={type === 'creditCard' ? 'numeric' : null}
                    {...rest}
                    onClick={
                      type === 'calendar' && this.isAndroidDevice
                        ? undefined
                        : onClick
                    }
                    disabled={disabled}
                    error={error}
                    heavyErrorBorder={heavyErrorBorder}
                    trueType={type}
                    required={required}
                    aria-invalid={false}
                    readOnly={readOnly}
                    surface={surface}
                    onChange={this._onChange}
                    onPaste={this._onPaste}
                    value={
                      type === 'password' || type === 'securityCode'
                        ? this.props.value
                        : this._determineValue()
                    }
                    masked={
                      this._determineInputType() === 'password' &&
                      this.state.hidden
                    }
                    type={this._determineInputType()}
                    calculateInputPadding={calculateInputPadding}
                    caretColor={caretColor}
                    aria-hidden={type === 'calendar' && this.isAndroidDevice}
                    onFocus={this._onFocus}
                    onBlur={this._onBlur}
                  />
                  {type === 'date' && this._renderStickyPlaceholder()}
                </InputWrapper>
                {(renderIcon || renderInlineAction) && (
                  <ActionWrapper
                    error={error}
                    success={success}
                    renderIcon={renderIcon}
                    id={this.inlineButtonWrapperId}
                    {...(renderInlineAction && type === 'password'
                      ? { 'aria-live': 'off' }
                      : {})}
                  >
                    {renderIcon && this._renderIcon(error)}
                    {renderInlineAction && this._renderInlineAction()}
                  </ActionWrapper>
                )}
              </InputContainer>
              {((error && errorText) || (success && successText)) &&
                !disabled &&
                !readOnly && (
                  <ErrorText
                    errorLabelSpacing={errorLabelSpacing}
                    errorText={errorText}
                    error={error}
                    success={success}
                    successText={successText}
                    surface={surface}
                  />
                )}
            </FlexedColContainer>
            {helperText &&
              helperTextPlacement === 'right' &&
              this._renderHelperText()}
          </FlexedRowContainer>
          {helperText &&
            helperTextPlacement === 'bottom' &&
            this._renderHelperText()}
        </StyledContainer>
      </ComponentContainer>
    );
  }
}

InputField.defaultProps = defaultProps;
InputField.propTypes = propTypes;

/**
 * @component
 */
export default withVDSManager(InputField);
