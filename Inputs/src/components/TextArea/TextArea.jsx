import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import UNSAFE_SetEnvRef from '@uie/set-env-ref';
import { Micro, Body, Fonts } from '@vds-core/typography';
import {
  withVDSManager,
  calculateRem,
  generateUUID,
} from '@vds-core/utilities';
import CharacterCounter from './CharacterCounter';
import {
  Label,
  HelperText,
  ErrorText,
  showError,
} from '@vds-core/form-elements';
import { AccessibilityTokens } from '@vds-tokens/accessibility';
import { ColorTokens } from '@vds-tokens/color';
import { FormControlsTokens } from '@vds-tokens/form-controls';
import { TypographyTokens } from '@vds-tokens/typography';
import { LayoutTokens } from '@vds-tokens/layout';

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

function _calculateOnlightBorders(readOnly, error, disabled, keyboardFocused) {
  let borderColor;
  if (disabled || readOnly) {
    borderColor = ColorTokens.interactive.disabled.onlight.value;
  } else if (error && !keyboardFocused) {
    borderColor = ColorTokens.feedback.error.onlight.value;
  } else if (!error && keyboardFocused) {
    borderColor = FormControlsTokens.color.border.hover.onlight.value;
  } else if (error && keyboardFocused) {
    borderColor = FormControlsTokens.color.border.hover.onlight.value;
  } else {
    borderColor = FormControlsTokens.color.border.onlight.value;
  }
  return borderColor;
}

function _calculateOnDarkBorders(readOnly, error, disabled, keyboardFocused) {
  let borderColor;
  if (disabled || readOnly) {
    borderColor = ColorTokens.interactive.disabled.ondark.value;
  } else if (error && !keyboardFocused) {
    borderColor = ColorTokens.feedback.error.ondark.value;
  } else if (!error && keyboardFocused) {
    borderColor = FormControlsTokens.color.border.hover.ondark.value;
  } else if (error && keyboardFocused) {
    borderColor = FormControlsTokens.color.border.hover.ondark.value;
  } else {
    borderColor = FormControlsTokens.color.border.ondark.value;
  }
  return borderColor;
}

function _calculateBorderColor(props) {
  const { surface, readOnly, error, disabled, keyboardFocused } = props;
  switch (surface) {
    case 'dark':
      return _calculateOnDarkBorders(
        readOnly,
        error,
        disabled,
        keyboardFocused
      );
    case 'light':
    default:
      return _calculateOnlightBorders(
        readOnly,
        error,
        disabled,
        keyboardFocused
      );
  }
}

function _calculateElementColor(disabled, surface) {
  let elementColor;
  if (surface === 'dark' && disabled) {
    elementColor = ColorTokens.interactive.disabled.ondark.value;
  } else if (surface !== 'dark' && disabled) {
    elementColor = ColorTokens.interactive.disabled.onlight.value;
  } else if (surface === 'dark' && !disabled) {
    elementColor = ColorTokens.elements.primary.ondark.value;
  } else {
    elementColor = ColorTokens.elements.primary.onlight.value;
  }
  return elementColor;
}

function _calculateOptionalLabelColor(disabled, surface) {
  return disabled && surface !== 'dark'
    ? ColorTokens.interactive.disabled.onlight.value
    : disabled && surface === 'dark'
    ? ColorTokens.interactive.disabled.ondark.value
    : !disabled && surface === 'dark'
    ? ColorTokens.elements.secondary.ondark.value
    : ColorTokens.elements.secondary.onlight.value;
}

function _calculateBackgroundColor(error, surface, transparentBackground) {
  let backgroundColor;
  if (surface === 'dark' && !error) {
    backgroundColor = FormControlsTokens.color.background.ondark.value;
  } else if (error && surface !== 'dark') {
    backgroundColor = ColorTokens.feedback.error.background.onlight.value;
  } else if (error && surface === 'dark') {
    backgroundColor = ColorTokens.feedback.error.background.ondark.value;
  } else {
    backgroundColor = FormControlsTokens.color.background.onlight.value;
  }
  return transparentBackground && !error ? 'transparent' : backgroundColor;
}

function _overflowBackgroundColor(surface) {
  let overflowColor;
  if (surface === 'dark') {
    overflowColor = ColorTokens.background.primary.light.value;
  } else {
    overflowColor = ColorTokens.background.primary.dark.value;
  }
  return overflowColor;
}

function _overflowTextColor(surface) {
  let overflowColor;
  if (surface === 'dark') {
    overflowColor = ColorTokens.elements.primary.onlight.value;
  } else {
    overflowColor = ColorTokens.elements.primary.ondark.value;
  }
  return overflowColor;
}

const _getColor = (disabled, surface) => {
  if (surface !== 'dark' && !disabled) {
    return ColorTokens.elements.primary.onlight.value;
  } else if (disabled) {
    return surface === 'dark'
      ? ColorTokens.interactive.disabled.ondark.value
      : ColorTokens.interactive.disabled.onlight.value;
  } else {
    return ColorTokens.elements.primary.ondark.value;
  }
};

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

// Use error.svg icon
const Brand3Icon = iconProps => {
  const { size, color, surface, name, ...rest } = iconProps;
  let iconSize;

  switch (size) {
    case 'medium':
    default:
      iconSize = 20;
  }

  return (
    <IconSVGWrapper
      iconSize={iconSize}
      iconColor={
        surface === 'dark' &&
        color === ColorTokens.elements.primary.onlight.value
          ? ColorTokens.elements.primary.ondark.value
          : color
      }
      aria-label={`${name} icon`}
      {...rest}
    >
      {ErrorIcon}
    </IconSVGWrapper>
  );
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
   * If provided, will provide the defaultValue for the input field.
   */
  defaultValue: PropTypes.any,
  /**
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
  errorEvent: PropTypes.oneOf(['blur', 'change']),
  /**
   * Boolean or Function that returns a boolean value that determines if component should show the error state/error message. Function receives the 'event' object  on input change.
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
   * If provided, adds min-height to Input
   */
  minHeight: PropTypes.oneOf(['2X', '4X', '8X']),
  /**
   * If provided, this is a callback function for when input text is changed.
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
   * If provided, used as string that labels the element for accessibility.
   */
  ariaLabel: PropTypes.string,
  /**
   * When true, will add the required attribute to the input element, if false, a string of 'Optional' next to the label
   */
  required: PropTypes.bool,
  /**
   * String, array or node containing the title of the TooltipDialog
   */
  tooltipTitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.node,
  ]),
  /**
   * String, array or node containing the body content of the TooltipDialog
   */
  tooltipContent: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.node,
  ]),
  /**
   * If provided, will contain the string for the helper text
   */
  helperText: PropTypes.string,
  /**
   * if passed, Input is controlled by the parent component
   */
  value: PropTypes.string,
  /**
   * @ignore If passed, new Body component will render
   */
  Body: PropTypes.func,
  /**
   * @ignore If passed, new Micro component will render
   */
  Micro: PropTypes.func,
  /**
   * Allows an id to be passed to the outermost wrapper of the component
   */
  id: PropTypes.string,
  /**
   * Allows a unique ID to be passed to the input element.
   */
  inputId: PropTypes.string,
  /**
   * @ignore If passed, the Tooltip will render
   */
  Tooltip: PropTypes.func,
  /**
   *  If passed, sets Max character length for input field
   */
  maxLength: PropTypes.number,
  /**
   * @ignore
   */
  calculateBorderColor: PropTypes.func,
  /**
   * @ignore
   */
  heavyErrorBorder: PropTypes.bool,
  /**
   * @ignore
   */
  calculateBackgroundColor: PropTypes.func,
  /**
   * @ignore
   */
  calculateHelperTextColor: PropTypes.func,
  /**
   * @ignore
   */
  calculateElementColor: PropTypes.func,
  /**
   * @ignore
   */
  calculateOptionalLabelColor: PropTypes.func,
  /**
   * @ignore
   */
  overflowBackgroundColor: PropTypes.func,
  /**
   * @ignore
   */
  overflowTextColor: PropTypes.func,
  /**
   * @ignore
   */
  calculateHoverBottomBorderColor: PropTypes.func,
  /**
   * @ignore
   */
  borderRadius: PropTypes.string,
  /**
   * @ignore
   */
  focusRing: PropTypes.bool,
  /**
   * @ignore
   */
  maxWidth: PropTypes.string,
  /**
   * @ignore
   */
  minWidth: PropTypes.string,
  /**
   * @ignore
   */
  highlightZIndex: PropTypes.number,
  /**
   * @ignore
   */
  surface: PropTypes.oneOf(['light', 'dark']),
  /**
   * @ignore  String, array or node containing the title of the Tooltip for Input label
   */
  tooltipTitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.node,
  ]),
  /**
   * @ignore  String, array or node containing the body of the Tooltip for Input label
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
   * String to configure the permission to browser for automated assistance in filling out the textarea value.
   */
  autoComplete: PropTypes.string,
};

const defaultProps = {
  disabled: false,
  transparentBackground: false,
  surface: 'light',
  error: undefined,
  errorEvent: 'blur',
  readOnly: false,
  label: undefined,
  required: true,
  tooltipTitle: undefined,
  tooltipContent: undefined,
  helperText: undefined,
  Body: Body,
  Micro: Micro,
  Tooltip: undefined,
  width: '100%',
  minHeight: '2X',
  calculateBorderColor: _calculateBorderColor,
  calculateBackgroundColor: _calculateBackgroundColor,
  calculateElementColor: _calculateElementColor,
  overflowBackgroundColor: _overflowBackgroundColor,
  overflowTextColor: _overflowTextColor,
  calculateOptionalLabelColor: _calculateOptionalLabelColor,
  getColor: _getColor,
  heavyErrorBorder: false,
  borderRadius: '4px',
  focusRing: true,
  maxLength: 200,
  maxWidth: undefined,
  minWidth: undefined,
  highlightZIndex: 1,
  Icon: Brand3Icon,
  tooltipCloseButtonText: 'Close',
  autoComplete: 'off',
};

const ComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ containerWidth }) =>
    typeof containerWidth === 'number'
      ? calculateRem(containerWidth)
      : containerWidth};
  max-width: ${({ maxWidth }) => maxWidth};
  min-width: ${({ minWidth }) => minWidth};
`;

const StyledContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  position: relative;
  flex-direction: column;
`;

const TextareaContainer = styled.span`
  display: flex;
  position: relative;
  align-items: stretch;
  min-height: ${({ minHeight }) => calculateRem(minHeight)};
  border-radius: ${({ borderRadius }) => borderRadius};
  background-color: ${({
    calculateBackgroundColor,
    error,
    surface,
    transparentBackground,
  }) => calculateBackgroundColor(error, surface, transparentBackground)};
  box-sizing: border-box;
  border-color: ${props => props.calculateBorderColor(props)};
  border-width: ${calculateRem(1)};
  border-style: solid;
  ${({ readOnly, disabled, surface }) =>
    !disabled &&
    !readOnly &&
    `
      &:hover {
        border: ${calculateRem(FormControlsTokens.border.width.value)} solid ${
      surface === 'dark'
        ? FormControlsTokens.color.border.hover.ondark.value
        : FormControlsTokens.color.border.hover.onlight.value
    };
    };
  }
  `};
  ${({ getColor, disabled, heavyErrorBorder, surface }) =>
    heavyErrorBorder &&
    `
    border-bottom: ${calculateRem(1)} solid
    ${getColor(disabled, surface)};
    `}
  ${({ error, errorState, disabled, heavyErrorBorder, readOnly }) =>
    (error || errorState) &&
    heavyErrorBorder &&
    !disabled &&
    !readOnly &&
    `
    &::before {
      background: #ed7000;
      box-shadow: none;
      content: '';
      height: ${calculateRem(4)};
      left: ${-1}px;
      position: absolute;
      bottom: ${-1}px;
      width: calc(100% + ${calculateRem(2)});
      z-index: 1;
    }
  `};
  ${({
    focusRing,
    keyboardFocused,
    hovered,
    readOnly,
    disabled,
    surface,
    locked,
    heavyErrorBorder,
  }) =>
    focusRing &&
    keyboardFocused &&
    !hovered &&
    !readOnly &&
    !disabled &&
    !locked &&
    !heavyErrorBorder &&
    `
      outline: none;
      &::before {
        border: ${calculateRem(
          AccessibilityTokens.focusring.borderwidth.value
        )} ${AccessibilityTokens.focusring.borderstyle.value} ${
      surface === 'dark'
        ? AccessibilityTokens.color.focusring.ondark.value
        : AccessibilityTokens.color.focusring.onlight.value
    };
        border-radius: 6px;
        content: '';
        left: 50%; 
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        width: calc(100% + ${calculateRem(6)});
        height: calc(100% + ${calculateRem(6)});
      }
    `}
`;

const ActionWrapper = styled.div`
  display: inline-flex;
  height: ${calculateRem(20)};
  width: ${calculateRem(20)};
  padding: ${calculateRem(12, 12, 12, 0)};
`;

const IconContainer = styled.span`
  display: inline-flex;
  align-items: center;
  outline: none;
  pointer-events: none;
`;

const TextareaBackdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  font-family: ${Fonts.VerizonNHGeDS};
  font-size: ${TypographyTokens.fontsize.body[16].value};
  line-height: ${TypographyTokens.lineheight.body[20].value};
  letter-spacing: ${TypographyTokens.letterspacing.wide.value};
  padding: ${LayoutTokens.space['3X'].value};
  white-space: pre-wrap;
  word-wrap: break-word;
  color: transparent;
`;

const HighlightMark = styled.mark`
  position: relative;
  z-index: ${({ highlightZIndex }) => highlightZIndex};
  color: ${({ overflowTextColor, surface }) => overflowTextColor(surface)};
  background-color: ${({ overflowBackgroundColor, surface }) =>
    overflowBackgroundColor(surface)};
`;

const StyledTextarea = styled.textarea`
  position: relative;
  display: flex;
  width: 100%;
  flex: 1 1 auto;
  border: none;
  box-sizing: border-box;
  background-color: transparent;
  pointer-events: auto;
  caret-color: ${({ surface }) =>
    surface === 'dark'
      ? ColorTokens.elements.primary.ondark.value
      : ColorTokens.elements.primary.onlight.value};
  color: ${({ disabled, surface, getColor }) => getColor(disabled, surface)};
  -webkit-text-fill-color: ${({ disabled, surface, getColor }) =>
    getColor(disabled, surface)};
  font-family: ${Fonts.VerizonNHGeDS};
  font-size: ${TypographyTokens.fontsize.body[16].value};
  line-height: ${TypographyTokens.lineheight.body[20].value};
  letter-spacing: ${TypographyTokens.letterspacing.wide.value};

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

  &:focus {
    outline: none;
  }
  padding: 0;
  resize: none;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const TextareaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  width: 100%;
  padding: ${calculateRem(FormControlsTokens.space.inset.value)};
`;

const FlexedRowContainer = styled.span`
  display: flex;
  flex: 1 1 auto;
  flex-direction: row;
  position: relative;
  justify-content: space-between;
`;

const FlexedColContainer = styled.span`
  position: relative;
`;

const characterLimitErrorText = 'You have exceeded the character limit';

class TextArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
        ? this.props.value
        : this.props.defaultValue
        ? this.props.defaultValue
        : '',
      hidden: true,
      focused: false,
      hovered: false,
      error: this.props.error === true,
      emptyError: false,
      maxLengthError: false,
    };
  }

  componentDidMount() {
    this.isControlled = this.props.value !== undefined;
    typeof window !== 'undefined' &&
      window.addEventListener('resize', this._setTextareaHeight);
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.value !== this.props.value && this.isControlled) {
      this.setState({ value: this.props.value });
    }
  };

  componentWillUnmount() {
    typeof window !== 'undefined' &&
      window.removeEventListener('resize', this._setTextareaHeight);
  }

  _onChange = e => {
    const { errorEvent, error, required } = this.props;
    const _this = this;
    this.props.onChange && this.props.onChange(e);

    if (required && e.target.value.length > 0)
      this.setState({ emptyError: false });

    if (this.props.maxLength) {
      this.setState({
        maxLengthError: e.target.value.length > this.props.maxLength,
      });
    }

    // check for error on change
    errorEvent && errorEvent === 'change' && showError(e, _this);
    this._setTextareaHeight();
    return !this.isControlled && this.setState({ value: e.target.value });
  };

  _calculateMinHeight = scaleName => {
    const factor = 44;
    const heightScale = {
      '2X': 2,
      '4X': 4,
      '8X': 8,
    };
    const minHeight = heightScale[scaleName] * factor;
    if (!minHeight) {
      console.error('minHeight is not supported by Input height scale!');
      return heightScale['2X'] * factor; //return 88px as default
    }
    return minHeight;
  };

  _setTextareaHeight = () => {
    const topBottomBorderWidth = 2;
    const topBottomSpacing = 24;
    const minHeight = this._calculateMinHeight(this.props.minHeight);
    //textareaMinHeight without top and bottom borders and spacing
    const textareaMinHeight =
      minHeight - topBottomBorderWidth - topBottomSpacing;
    this.textareaElement.style.height = 'auto';

    if (this.textareaElement.scrollHeight > textareaMinHeight) {
      this.textareaElement.style.height =
        this.textareaElement.scrollHeight + 'px';
    }
  };

  _determineValue = () => {
    const { value, defaultValue } = this.props;
    if (value || defaultValue) {
      return value;
    } else {
      return this.state.value;
    }
  };

  _overflowHighlighter = () => {
    const {
      maxLength,
      surface,
      overflowBackgroundColor,
      overflowTextColor,
      highlightZIndex,
    } = this.props;
    const { value } = this.state;

    const valueLength = value ? value.length : 0;
    const normalText = value.substring(0, maxLength);
    const highlightedText = value.substring(maxLength, valueLength);
    return (
      <Fragment>
        {normalText}
        <HighlightMark
          surface={surface}
          overflowBackgroundColor={overflowBackgroundColor}
          overflowTextColor={overflowTextColor}
          highlightZIndex={highlightZIndex}
        >
          {highlightedText}
        </HighlightMark>
      </Fragment>
    );
  };

  _renderIcon = () => {
    const { surface, Icon } = this.props;
    return (
      <IconContainer tabIndex={-1}>
        <Icon
          tabIndex={-1}
          size="medium"
          name="error"
          color={ColorTokens.elements.primary.onlight.value}
          surface={surface}
        />
      </IconContainer>
    );
  };

  _renderHelperText = () => {
    const {
      helperText,
      disabled,
      surface,
      Body,
      calculateHelperTextColor,
    } = this.props;
    return (
      <HelperText
        helperText={helperText}
        helperTextPlacement="bottom"
        calculateHelperTextColor={calculateHelperTextColor}
        disabled={disabled}
        surface={surface}
        Body={Body}
      />
    );
  };

  setHover = () => {
    this.setState({ hovered: !this.state.hovered });
  };

  _onFocus = e => {
    const { readOnly, onFocus } = this.props;
    if (!readOnly) {
      this.setState({ focused: true });
      if (!this.state.hovered) this.setState({ keyboardFocused: true });
    }
  };

  _onBlur = e => {
    const { errorEvent, error, required, onBlur } = this.props;
    const _this = this;
    if (this.state.keyboardFocused) {
      this.setState({ keyboardFocused: false });
    }
    if (!this.props.readOnly) {
      this.setState({ focused: false });
    }
    if (required && !e.target.value) this.setState({ emptyError: true });
    errorEvent === 'blur' && showError(e, _this);
  };

  render() {
    const {
      value,
      readOnly,
      error: errorProp,
      label,
      errorText: errorTextProp,
      disabled,
      surface,
      width,
      minHeight,
      ariaLabel,
      required,
      color,
      id,
      type,
      tooltip,
      Tooltip,
      tooltipTitle,
      tooltipContent,
      helperText,
      Body,
      Micro,
      maxLength,
      inputId,
      calculateBorderColor,
      heavyErrorBorder,
      calculateBackgroundColor,
      calculateElementColor,
      calculateOptionalLabelColor,
      calculateHoverBottomBorderColor,
      getColor,
      borderRadius,
      focusRing,
      overflowBackgroundColor,
      keyboardFocused,
      maxWidth,
      minWidth,
      highlightZIndex,
      transparentBackground,
      tooltipCloseButtonText,
      autoComplete,
      ...rest
    } = this.props;
    const {
      focused,
      error: errorState,
      emptyError,
      maxLengthError,
    } = this.state;
    const refKey = UNSAFE_SetEnvRef();
    // Error state has preference over component's error
    // Because errorProp might be a function, we first need to check if prop is a bool and only then assign its value
    const error =
      maxLengthError ||
      emptyError ||
      errorState ||
      (typeof errorProp === 'boolean' && errorProp);

    const fieldId = inputId ? inputId : generateUUID();

    let renderIcon = error && !focused && !readOnly && !disabled;
    let labelId = fieldId + ' label';
    let trueLabel = label ? label : '';
    let valueLength = this.state.value.length;
    let accessLabel = ariaLabel
      ? ariaLabel
      : !required
      ? trueLabel + ' Optional Input Field'
      : trueLabel + ' Input Field';

    if (maxLength) {
      if (valueLength <= maxLength) {
        accessLabel = `${accessLabel} ${valueLength} out of ${maxLength} characters entered`;
      } else {
        accessLabel = `${accessLabel} ${maxLength - valueLength} characters`;
      }
    }
    const errorText = errorTextProp
      ? errorTextProp
      : emptyError
      ? `You must enter a ${label}`
      : maxLengthError
      ? characterLimitErrorText
      : '';

    error &&
      !errorText &&
      console.error('Error Text for Input MUST be provided');
    return (
      <ComponentContainer
        onMouseEnter={this.setHover}
        onMouseLeave={this.setHover}
        containerWidth={width}
        maxWidth={maxWidth}
        minWidth={minWidth}
      >
        <StyledContainer
          id={id}
          data-testid="test-container"
          helperText={helperText}
        >
          {label && (
            <Label
              Body={Body}
              Micro={Micro}
              width={width}
              disabled={disabled}
              surface={surface}
              color={color}
              required={required}
              label={label}
              tooltip={tooltip}
              Tooltip={Tooltip}
              tooltipTitle={tooltipTitle}
              tooltipContent={tooltipContent}
              tooltipCloseButtonText={tooltipCloseButtonText}
              type="textarea"
              data-testid="test-label"
              id={labelId}
              aria-label={label}
              htmlFor={fieldId}
              focusState={true}
              labelMarginBottom={LayoutTokens.space['1X'].value}
              overflowEllipsis={true}
              helperTextPlacement={'bottom'}
              helperText={helperText}
              calculateLabelColor={calculateElementColor}
              calculateOptionalLabelColor={calculateOptionalLabelColor}
            />
          )}

          <TextareaContainer
            transparentBackground={transparentBackground}
            color={color}
            error={error}
            errorState={error}
            disabled={disabled}
            surface={surface}
            helperText={helperText}
            errorText={errorText}
            label={label}
            readOnly={readOnly}
            calculateBorderColor={calculateBorderColor}
            heavyErrorBorder={heavyErrorBorder}
            calculateBackgroundColor={calculateBackgroundColor}
            getColor={getColor}
            calculateHoverBottomBorderColor={calculateHoverBottomBorderColor}
            borderRadius={borderRadius}
            onFocus={this._onFocus}
            hovered={this.state.hovered}
            focused={this.state.focused}
            keyboardFocused={this.state.keyboardFocused}
            onBlur={this._onBlur}
            minHeight={this._calculateMinHeight(minHeight)}
            focusRing={focusRing}
          >
            <TextareaWrapper>
              {maxLength && (
                <TextareaBackdrop aria-hidden="true">
                  {this._overflowHighlighter()}
                </TextareaBackdrop>
              )}
              <StyledTextarea
                data-testid="test-input"
                color={color}
                aria-label={
                  helperText ? `${accessLabel} ${helperText}` : accessLabel
                }
                id={fieldId}
                autoComplete={autoComplete}
                {...rest}
                placeholder={null}
                disabled={disabled}
                surface={surface}
                error={error}
                aria-required={required}
                readOnly={readOnly}
                onChange={this._onChange}
                getColor={getColor}
                value={this._determineValue()}
                maxLength={maxLength ? Math.round(maxLength * 1.2) : ''}
                {...{ [refKey]: elem => (this.textareaElement = elem) }}
              />
            </TextareaWrapper>
            <ActionWrapper>{renderIcon && this._renderIcon()}</ActionWrapper>
          </TextareaContainer>
          <FlexedRowContainer>
            <FlexedColContainer>
              {error && errorText && !disabled && !readOnly && (
                <ErrorText
                  errorText={errorText}
                  surface={surface}
                  error={error}
                  errorLabelSpacing={calculateRem(8)}
                  color={color}
                />
              )}
              {helperText && this._renderHelperText()}
            </FlexedColContainer>
            <FlexedColContainer>
              {!readOnly && maxLength && (
                <CharacterCounter
                  maxLength={maxLength}
                  color={getColor(readOnly || disabled, surface)}
                  Body={Body}
                  value={this.state.value}
                />
              )}
            </FlexedColContainer>
          </FlexedRowContainer>
        </StyledContainer>
      </ComponentContainer>
    );
  }
}

TextArea.defaultProps = defaultProps;
TextArea.propTypes = propTypes;

/**
 * @component
 */
export default withVDSManager(TextArea);
