import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Micro, Body, Fonts } from '@vds-core/typography';
import {
  withVDSManager,
  calculateRem,
  generateUUID,
  getOS,
} from '@vds-core/utilities';
import {
  HelperText,
  ErrorText,
  Label,
  showError,
} from '@vds-core/form-elements';
import { ColorTokens } from '@vds-tokens/color';
import { FormControlsTokens } from '@vds-tokens/form-controls';
import { TypographyTokens } from '@vds-tokens/typography';
import { AccessibilityTokens } from '@vds-tokens/accessibility';

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

// Use caret-down.svg
const CaretDownIcon = (
  <svg
    id="Layer_1"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 21.6 21.6"
  >
    <polygon points="10.8 15.71 1.8 6.71 2.62 5.89 10.8 14.07 18.98 5.89 19.8 6.71 10.8 15.71" />
  </svg>
);

function _calculateOnlightBorders(readOnly, error, disabled, focused) {
  let borderColor;
  if (disabled || readOnly) {
    borderColor = ColorTokens.interactive.disabled.onlight.value;
  } else if (error && !focused) {
    borderColor = ColorTokens.feedback.error.onlight.value;
  } else if (!error && focused) {
    borderColor = ColorTokens.elements.primary.onlight.value;
  } else if (error && focused) {
    borderColor = ColorTokens.elements.primary.onlight.value;
  } else {
    borderColor = FormControlsTokens.color.border.onlight.value;
  }
  return borderColor;
}

function _calculateOnDarkBorders(readOnly, error, disabled, focused) {
  let borderColor;
  if (disabled || readOnly) {
    borderColor = ColorTokens.interactive.disabled.ondark.value;
  } else if (error && !focused) {
    borderColor = ColorTokens.feedback.error.ondark.value;
  } else if (!error && focused) {
    borderColor = ColorTokens.elements.primary.ondark.value;
  } else if (error && focused) {
    borderColor = ColorTokens.elements.primary.ondark.value;
  } else {
    borderColor = FormControlsTokens.color.border.ondark.value;
  }
  return borderColor;
}

function _calculateBorderColor(
  surface,
  readOnly,
  error,
  disabled,
  keyboardFocused
) {
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

function _calculateBackgroundColor(error, surface) {
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
  return backgroundColor;
}

const propTypes = {
  /**
   * If true disables the dropdown component.
   */
  disabled: PropTypes.bool,
  /**
   * @ignore
   */
  surface: PropTypes.oneOf(['light', 'dark']),
  /**
   * @ignore
   * If provided, the Input will be rendered with transparent background.
   */
  transparentBackground: PropTypes.bool,
  /**
   * Boolean or a Function that returns a boolean value that determines if component should show the error state/error message. Function receives the 'event' object  on input change.
   */
  error: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  /**
   *  Determines what event this component will check for an error, options are 'onBlur' or 'onChange'.
   */
  errorEvent: PropTypes.oneOf(['blur', 'change', 'blurAndChange']),
  /**
   * Locks the input from user interaction.
   */
  readOnly: PropTypes.bool,
  /**
   * Items to be rendered inside of the dropdown list.  This prop accepts html option components.
   */
  children: PropTypes.node,
  /**
   * Message displayed when there is an error.
   */
  errorText: PropTypes.string,
  /**
   * This string value will be used as the label text for the Dropdown Select.
   */
  label: PropTypes.string,
  /**
   * This is the width of the select box. Any string can be passed such as 100% or a pixel value.
   */
  width: PropTypes.string,
  /**
   * If provided, this is a callback for when user selects options from the dropdown menu.
   */
  onChange: PropTypes.func,
  /**
   * @ignore defines height of the select field
   */
  height: PropTypes.string,
  /**
   * @ignore defines padding inside of the select field
   */
  selectPadding: PropTypes.string,
  /**
   * @ignore defines the space between the label and the dropdown input
   */
  labelMarginBottom: PropTypes.string,
  /**
   * @ignore defines whether text trancates with ellipsis or not
   */
  overflowEllipsis: PropTypes.bool,
  /**
   * @ignore defines the space between the select and the error text below
   */
  errorLabelSpacing: PropTypes.string,
  /**
   * @ignore adds the ability to use borders when in ready only state,
   */
  readOnlyBorders: PropTypes.bool,
  /**
   * @ignore adds max-width to select field
   */
  maxWidth: PropTypes.string,
  /**
   * @ignore adds min-width to select field
   */
  minWidth: PropTypes.string,
  /**
   * If false, puts a string of 'Optional' next to the label.
   */
  required: PropTypes.bool,
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
   * Allows an id to be passed to the outermost wrapper of the component.
   */
  id: PropTypes.string,
  /**
   * Allows a unique ID to be passed to the <select> element.
   */
  selectId: PropTypes.string,
  /**
   * @ignore If passed, the Tooltip will render
   */
  Tooltip: PropTypes.func,
  /**
   * @ignore If passed, new Body component will render
   */
  Body: PropTypes.func,
  /**
   * @ignore If passed, new Micro component will render
   */
  Micro: PropTypes.func,
  /**
   * If provided, used as string that labels the element for accessibility. Component also accepts aria-label.
   */
  ariaLabel: PropTypes.string,
  /**
   * String to configure the permission to browser for automated assistance in filling out the value.
   */
  autoComplete: PropTypes.string,
  /**
   * @ignore
   */
  borderRadius: PropTypes.string,
  /**
   * @ignore
   */
  calculateBorderColor: PropTypes.func,
  /**
   * @ignore
   */
  calculateBackgroundColor: PropTypes.func,
  /**
   * @ignore
   */
  calculateElementColor: PropTypes.func,
  /**
   * @ignore
   */
  heavyErrorBorder: PropTypes.bool,
  /**
   * @ignore
   */
  focusRing: PropTypes.bool,
  /**
   * @ignore String, array or node containing the title of the Tooltip for Input label
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
  /**
   * This is used for the name attribute of the select dropdown.
   */
  name: PropTypes.string,
  /**
   *
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

const defaultProps = {
  disabled: false,
  transparentBackground: false,
  surface: 'light',
  error: undefined,
  errorEvent: 'blur',
  readOnly: false,
  width: '100%',
  label: '',
  height: calculateRem(44),
  selectPadding: calculateRem(
    FormControlsTokens.space.inset.value,
    43,
    FormControlsTokens.space.inset.value,
    FormControlsTokens.space.inset.value
  ),
  labelMarginBottom: calculateRem(4),
  overflowEllipsis: true,
  errorLabelSpacing: calculateRem(8),
  readOnlyBorders: true,
  maxWidth: undefined,
  minWidth: '66px',
  required: true,
  Body: Body,
  Micro: Micro,
  borderRadius: FormControlsTokens.border.radius.value,
  calculateBorderColor: _calculateBorderColor,
  calculateBackgroundColor: _calculateBackgroundColor,
  calculateElementColor: _calculateElementColor,
  heavyErrorBorder: false,
  focusRing: true,
  tooltipCloseButtonText: 'Close',
  autoComplete: 'off',
};

const SelectContainer = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  height: ${({ height }) => height};
  width: 100%;
  vertical-align: top;
  margin: 0;
  background-color: ${({
    calculateBackgroundColor,
    surface,
    error,
    transparentBackground,
  }) =>
    transparentBackground && !error
      ? 'transparent'
      : calculateBackgroundColor(error, surface)};
  border-radius: ${({ borderRadius }) => borderRadius};
  border-color: ${({
    calculateBorderColor,
    surface,
    readOnly,
    error,
    disabled,
    focused,
  }) => calculateBorderColor(surface, readOnly, error, disabled, focused)};
  border-width: ${calculateRem(FormControlsTokens.border.width.value)};
  border-style: solid;
  ${({ disabled, readOnly, surface }) =>
    disabled &&
    surface === 'dark' &&
    !readOnly &&
    `color: ${
      surface === 'dark'
        ? ColorTokens.interactive.disabled.ondark.value
        : ColorTokens.interactive.disabled.onlight.value
    };
  `};

  ${({ surface, disabled, readOnly }) =>
    !disabled &&
    !readOnly &&
    `
    &:hover {
      outline: none;
      border-color: ${
        surface === 'dark'
          ? FormControlsTokens.color.border.hover.ondark.value
          : FormControlsTokens.color.border.hover.onlight.value
      };
    }
  `};

  ${({ focusRing, keyboardFocused, readOnly, disabled, surface, hovered }) =>
    focusRing &&
    keyboardFocused &&
    !hovered &&
    !readOnly &&
    !disabled &&
    ` 
      &::before {
        border: ${calculateRem(
          AccessibilityTokens.focusring.borderwidth.value
        )} dashed ${
      surface === 'dark'
        ? AccessibilityTokens.color.focusring.ondark.value
        : AccessibilityTokens.color.focusring.onlight.value
    };
        border-radius: 6px;
        content: '';
        left: 50%; 
        position: absolute;
        top: 50%;
        pointer-events: none;
        transform: translate(-50%, -50%);
        width: calc(100% + ${calculateRem(
          2 * parseInt(AccessibilityTokens.focusring.space.offset.value) + 2
        )});
        height: calc(100% + ${calculateRem(
          2 * parseInt(AccessibilityTokens.focusring.space.offset.value) + 2
        )});
      } 
    `};

  ${({ error, disabled, readOnly, heavyErrorBorder }) =>
    error &&
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
`;

const SelectEl = styled.select`
  border: none;
  background: transparent;
  width: 100%;
  min-width: ${({ minWidth }) => minWidth};
  display: inline-flex;
  -moz-appearance: none;
  appearance: none;
  &::-ms-expand {
    display: none;
  }
  outline: none;
  pointer-events: auto;
  color: ${({ disabled, readOnly, surface }) =>
    surface === 'dark' && !disabled
      ? ColorTokens.elements.primary.ondark.value
      : disabled && !readOnly && surface !== 'dark'
      ? ColorTokens.interactive.disabled.onlight.value
      : surface === 'dark' && disabled
      ? ColorTokens.interactive.disabled.ondark.value
      : ColorTokens.elements.primary.onlight.value};
  opacity: 1;
  line-height: ${calculateRem(TypographyTokens.lineheight.body[20].value)};
  font-size: ${calculateRem(TypographyTokens.fontsize.body[16].value)};
  letter-spacing: ${calculateRem(TypographyTokens.letterspacing.wide.value)};
  font-family: ${Fonts.VerizonNHGeDS};
  font-weight: ${TypographyTokens.fontweight.regular.value};
  padding: ${({ selectPadding, inlineLabel }) =>
    inlineLabel
      ? calculateRem(
          FormControlsTokens.space.inset.value,
          44,
          FormControlsTokens.space.inset.value,
          0
        )
      : selectPadding};
  padding-left: ${({ readOnly, readOnlyBorders }) =>
    readOnly && !readOnlyBorders ? 0 : null};
  ${({ readOnly }) => readOnly && 'pointer-events: none;'}
  option {
    background-color: ${({ surface }) =>
      surface === 'dark'
        ? ColorTokens.background.primary.dark.value
        : ColorTokens.background.primary.light.value};
  }
`;

const ComponentContainer = styled.div`
  display: flex;
  flex-direction: ${({ helperTextPlacement }) =>
    helperTextPlacement === 'right' ? 'row' : 'column'};
  width: ${({ width }) => width};
  max-width: ${({ maxWidth }) => maxWidth};
  min-width: ${({ minWidth }) => minWidth};
`;

const StyledContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  width: ${({ helperText, helperTextPlacement }) =>
    helperText && helperTextPlacement === 'right' ? '50%' : '100%'};
  position: relative;
  width: ${({ width }) => width};
  input[type='number'] {
    -moz-appearance: textfield; /* Firefox */
  }
`;

const IconContainer = styled.span`
  position: absolute;
  z-index: 1;
  margin-left: ${calculateRem(12)};
  right: ${calculateRem(12)};
  top: 50%;
  transform: translateY(-50%);
  height: 1.25rem;
  pointer-events: none;
  ${({ disabled, surface }) =>
    disabled &&
    `
    color: ${
      surface === 'dark'
        ? ColorTokens.elements.primary.ondark.value
        : ColorTokens.palette.gray85.value
    };
    border-color: ${ColorTokens.palette.gray85.value};
  `};
`;

const InlineLabel = styled.label`
  white-space: nowrap;
  padding: ${calculateRem(
    FormControlsTokens.space.inset.value,
    4,
    FormControlsTokens.space.inset.value,
    FormControlsTokens.space.inset.value
  )};
  &:focus {
    outline: none;
  }
`;

const FlexedRowContainer = styled.span`
  display: flex;
  flex: 1 1 auto;
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
    path,
    polygon {
      fill: ${({ iconColor }) => iconColor};
    }
  }
`;

class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      hovered: false,
      selectedValue: undefined /* selectedValue is used to give the aria label 'selected' */,
      emptyError: false,
      error: typeof this.props.error === 'function' ? false : this.props.error, // If error passes a function, then the error state will initially be set to false
    };
  }

  componentDidMount() {
    const { children } = this.props;
    this.isAndroidDevice = getOS() === 'android';

    /* Check if an option has been passed a selected prop, if so set selected state to that item */
    if (children && children.length > 1) {
      children.map(child => {
        if (
          child &&
          child.props &&
          child.props.children &&
          child.props.selected
        ) {
          this.setState({ selectedValue: child.props.children });
        }
      });
      /* If there was no selected value passed, then default the selectedValue to the first child */
      if (
        !this.state.selectedValue &&
        children[0] &&
        children[0].props &&
        children[0].props.children
      ) {
        this.setState({ selectedValue: children[0].props.children });
      }
      /* if there is only one child passed */
    } else if (children && children.props && children.props.children) {
      this.setState({ selectedValue: children.props.children });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { error, required } = this.props;

    if (typeof error === 'boolean' && prevProps.error !== error) {
      this.setState({ error: error });
    }

    if (error === undefined) {
      if (prevProps.required !== required) {
        this.setState({ emptyError: false });
      }
    }
  }

  _onBlur = evt => {
    if (this.state.keyboardFocused) {
      this.setState({ keyboardFocused: false });
    }
    if (
      !evt.target.value &&
      this.props.error === undefined &&
      this.props.required
    ) {
      this.setState({ emptyError: true });
    }
    this.setState({ focused: false });
    if (
      this.props.errorEvent === 'blur' ||
      this.props.errorEvent === 'blurAndChange'
    ) {
      const _this = this;
      showError(evt, _this);
    }
  };

  _labelOnClick = e => {
    if (e.target.id !== 'labelId') {
      e.preventDefault();
    }
  };

  _onChange = e => {
    this.props.onChange && this.props.onChange(e);
    this.isAndroidDevice && e.target.focus();
    this.setState({ selectedValue: e.target.value });
    if (
      this.props.error === undefined &&
      this.props.required &&
      e.target.value
    ) {
      this.setState({ emptyError: false });
    }
    if (
      this.props.errorEvent === 'change' ||
      this.props.errorEvent === 'blurAndChange'
    ) {
      const _this = this;
      showError(e, _this);
    }
  };

  setHover = () => {
    this.setState({ hovered: true });
  };

  unSetHover = () => {
    this.setState({ hovered: false });
  };

  _onFocus = e => {
    const { readOnly } = this.props;
    if (!readOnly) {
      this.setState({ focused: true });
      if (!this.state.hovered && !this.state.keyboardFocused)
        this.setState({ keyboardFocused: true });
    }
  };

  _onMouseDown = e => {
    this.state.keyboardFocused && this.setState({ keyboardFocused: false });
  };

  _onKeyDown = e => {
    const { type } = e;
    if (type !== 'click') {
      e.target.focus();
    }
  };

  renderIcon = ({
    disabled,
    surface,
    error: errorProp,
    readOnly,
    color,
    height,
    inlineLabel,
    calculateElementColor,
  }) => {
    // Error state has preference over component's error
    // Because errorProp might be a function, we first need to check if prop is a bool and only then assign its value
    const error =
      this.state.emptyError ||
      this.state.error ||
      (typeof errorProp === 'boolean' && errorProp);

    return (
      <IconContainer
        tabIndex={-1}
        height={height}
        error={error}
        disabled={disabled}
        surface={surface}
        color={color}
        aria-hidden={true}
        inlineLabel={inlineLabel}
      >
        {!readOnly && (
          <IconSVGWrapper
            tabIndex={-1}
            iconSize={20} // size medium
            iconColor={calculateElementColor(disabled, surface)}
            aria-hidden={true}
            aria-label={`${
              error && !this.state.focused ? 'error icon' : 'caret-down icon'
            }`}
          >
            {error && !this.state.focused ? ErrorIcon : CaretDownIcon}
          </IconSVGWrapper>
        )}
      </IconContainer>
    );
  };

  _renderChildren = ariaLabelEnable => {
    const { children } = this.props;
    if (!children) return null;

    const isAndroidDevice = getOS() === 'android';
    const isFirstItemDisabled = children[0]
      ? children[0].props.disabled
      : children.props && children.props.disabled;
    const totalItems = isFirstItemDisabled
      ? children.length - 1
      : children.length;

    return React.Children.map(children, (child, index) => {
      const optionAriaLabel =
        index === 0 && isFirstItemDisabled
          ? `${child.props.children}`
          : `${
              child.props.children === this.state.selectedValue
                ? 'selected'
                : ''
            } ${child.props.children} item ${index +
              (isFirstItemDisabled ? 0 : 1)} of ${
              totalItems > 1 ? totalItems : 1
            }`;

      return React.cloneElement(child, {
        'aria-label': isAndroidDevice
          ? `${ariaLabelEnable} ${optionAriaLabel}`
          : optionAriaLabel,
        onMouseEnter: this.setHover,
        onMouseLeave: this.unSetHover,
        role: isAndroidDevice
          ? undefined
          : 'option' /*need to add role="option" here to prevent double reading by screen reader*/,
      });
    });
  };

  _renderHelperText = () => {
    const {
      label,
      helperText,
      helperTextPlacement,
      disabled,
      surface,
      color,
      Body,
    } = this.props;
    return (
      <HelperText
        label={label}
        helperText={helperText}
        helperTextPlacement={helperTextPlacement}
        disabled={disabled}
        surface={surface}
        color={color}
        Body={Body}
      />
    );
  };

  render() {
    const {
      disabled,
      surface,
      error: errorProp,
      readOnly,
      label,
      errorText: errorTextProp,
      width,
      hover,
      color,
      required,
      labelMarginBottom,
      overflowEllipsis,
      errorLabelSpacing,
      readOnlyBorders,
      selectPadding,
      height,
      maxWidth,
      minWidth,
      id,
      inlineLabel,
      tooltip,
      Tooltip,
      tooltipContent,
      tooltipTitle,
      tooltipCloseButtonText,
      helperText,
      helperTextPlacement,
      Body,
      Micro,
      ariaLabel,
      'aria-label': ariaLabelProp,
      className,
      selectId: selectIdProp,
      borderRadius,
      calculateBorderColor,
      calculateBackgroundColor,
      calculateElementColor,
      heavyErrorBorder,
      focusRing,
      transparentBackground,
      autoComplete,
    } = this.props;

    // Error state has preference over component's error
    // Because errorProp might be a function, we first need to check if prop is a bool and only then assign its value
    const error =
      this.state.emptyError ||
      this.state.error ||
      (typeof errorProp === 'boolean' && errorProp);
    const unique_id = generateUUID();
    const selectId = selectIdProp ? selectIdProp : unique_id;

    let labelId = 'labelId';

    let trueLabel = label ? label : '';
    let errorText =
      errorProp === undefined && this.state.emptyError
        ? `You must enter a ${trueLabel}`
        : errorTextProp;

    let accessLabel = ariaLabelProp
      ? ariaLabelProp
      : ariaLabel
      ? ariaLabel
      : !required
      ? trueLabel + ' Optional'
      : trueLabel + ' required';

    error &&
      !errorText &&
      console.error('Error Text for DropdownSelect MUST be provided');

    function _determineAriaLabel() {
      if (error && errorText) {
        if (helperText) {
          return `${accessLabel} ${errorText} ${helperText}`;
        } else {
          return `${accessLabel} ${errorText}`;
        }
      } else {
        if (helperText) {
          return `${accessLabel} ${helperText}`;
        } else {
          return accessLabel;
        }
      }
    }

    return (
      <ComponentContainer
        width={width}
        maxWidth={maxWidth}
        minWidth={minWidth}
        helperTextPlacement={helperTextPlacement}
        className={className}
        onMouseDown={this._onMouseDown}
      >
        <StyledContainer
          id={id}
          helperTextPlacement={helperTextPlacement}
          helperText={helperText}
        >
          {label && !inlineLabel && (
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
              data-testid="test-label"
              id={selectId}
              aria-label={label}
              htmlFor={selectId}
              labelMarginBottom={labelMarginBottom}
              overflowEllipsis={overflowEllipsis}
              helperTextPlacement={helperTextPlacement}
              helperText={helperText}
              calculateLabelColor={calculateElementColor}
            />
          )}
          <FlexedRowContainer>
            <FlexedColContainer
              helperText={helperText}
              helperTextPlacement={helperTextPlacement}
            >
              <SelectContainer
                color={color}
                transparentBackground={transparentBackground}
                selectPadding={selectPadding}
                readOnlyBorders={readOnlyBorders}
                height={height}
                disabled={disabled}
                surface={surface}
                readOnly={readOnly}
                error={error}
                width={width}
                hover={hover}
                onMouseEnter={this.setHover}
                onMouseLeave={this.unSetHover}
                hovered={this.state.hovered}
                focused={this.state.focused}
                keyboardFocused={this.state.keyboardFocused}
                heavyErrorBorder={heavyErrorBorder}
                onFocus={this._onFocus}
                borderRadius={borderRadius}
                calculateBorderColor={calculateBorderColor}
                calculateBackgroundColor={calculateBackgroundColor}
                focusRing={focusRing}
              >
                {inlineLabel && label && (
                  <InlineLabel error={error} tabIndex={-1} htmlFor={selectId}>
                    <Body
                      size="large"
                      bold
                      color={
                        disabled && surface !== 'dark'
                          ? ColorTokens.interactive.disabled.onlight.value
                          : surface === 'dark' && !disabled
                          ? ColorTokens.elements.primary.ondark.value
                          : surface === 'dark' && disabled
                          ? ColorTokens.interactive.disabled.ondark.value
                          : ColorTokens.elements.primary.onlight.value
                      }
                    >
                      {label}
                    </Body>
                  </InlineLabel>
                )}
                <SelectEl
                  {...this.props}
                  minWidth={minWidth}
                  required={required}
                  aria-label={
                    this.isAndroidDevice ? undefined : _determineAriaLabel()
                  }
                  readOnlyBorders={readOnlyBorders}
                  disabled={disabled}
                  readOnly={readOnly}
                  surface={surface}
                  id={selectId}
                  tabIndex={0}
                  autoComplete={autoComplete}
                  onKeyDown={this._onKeyDown}
                  onBlur={this._onBlur}
                  onChange={this._onChange}
                  keyboardFocused={this.state.keyboardFocused}
                >
                  {this._renderChildren(_determineAriaLabel())}
                </SelectEl>
                {this.renderIcon(this.props)}
              </SelectContainer>
              {error && errorText && !disabled && !readOnly && (
                <ErrorText
                  errorLabelSpacing={errorLabelSpacing}
                  errorText={errorText}
                  surface={surface}
                  error={error}
                  color={color}
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

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

export default withVDSManager(Select);
