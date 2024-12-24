import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import RadioButtonLabel from './RadioButtonLabel';
import {
  checkIfMobileDevice,
  withVDSManager,
  calculateRem,
  generateUUID,
  getNodeText,
} from '@vds-core/utilities';
import { showError } from '../utils';
import { AccessibilityTokens } from '@vds-tokens/accessibility';
import { ColorTokens } from '@vds-tokens/color';
import { LayoutTokens } from '@vds-tokens/layout';
import { FormControlsTokens } from '@vds-tokens/form-controls';
import { TypographyTokens } from '@vds-tokens/typography';

// Style properties
const iconColorDisabled = ColorTokens.interactive.disabled.onlight.value;
const iconColorDisabledInverted = ColorTokens.interactive.disabled.ondark.value;
const hitAreaSize = 44;
const layoutSpaceInlineRadioLabel = LayoutTokens.space['3X'].value;
const iconHeight = 20;

const focusOffset = AccessibilityTokens.focusring.space.offset.value;
const focusringWidth = AccessibilityTokens.focusring.borderwidth.value;
const focusringStyle = AccessibilityTokens.focusring.borderstyle.value;
const focusringSize = `calc(100% + ${calculateRem(
  (parseInt(focusOffset) + parseInt(focusringWidth)) * 2
)})`;

const propTypes = {
  /**
   * If provided, the Radio will be rendered with children.
   */
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.node,
  ]),
  /**
   * If provided, the Radio will be rendered in the Disabled State.
   */
  disabled: PropTypes.bool,
  /**
   * The prop for the HTML name Attribute. This is used to specify a name for an input element. It is used to reference the form-data after submitting the form or to reference the element.
   */
  name: PropTypes.string.isRequired,
  /**
   * Callback function that returns the value of the radio when clicked.
   */
  onChange: PropTypes.func,
  /**
   * Value of RadioButton.
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If provided, the Radio will be rendered in the Selected State.
   */
  selected: PropTypes.bool,
  /**
   * If provided, used as string that labels the element for accessibility.
   */
  ariaLabel: PropTypes.string,
  /**
   * Boolean or Function that returns a boolean value that determines if component should be rendered in the Error State. Function receives the 'event' object.
   */
  error: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  /**
   *  Determines what event this component will check for an error, options are 'onBlur' or 'onChange'.
   */
  errorEvent: PropTypes.oneOf(['blur', 'change']),
  /**
   * @ignore
   * If provided, the RadioButton will break into a new line at the given string value width.
   */
  maxLabelWidth: PropTypes.string,
  /**
   * If provided, this prop will render the string in bold as a title in a two line radio button label
   */
  label: PropTypes.string,
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
   * Allows an id to be passed to the outermost wrapper of the component
   */
  id: PropTypes.string,
  /**
   * Allows a unique ID to be passed to the input element.
   */
  inputId: PropTypes.string,
  /**
   * @ignore
   */
  surface: PropTypes.oneOf(['light', 'dark']),
  /**
   * @ignore
   * Function that calculates letter spacing, receives font weight as input
   */
  calculateLetterSpacing: PropTypes.func,
  /**
   * @ignore
   * Function that calculates error colors, used for design overrides
   */
  calculateErrorBackgroundColor: PropTypes.func,
  /**
   * @ignore
   * Function that calculates error colors, used for design overrides
   */
  calculateErrorForegroundColor: PropTypes.func,
  /**
   * @ignore
   * Function that calculates default border colors, used for design overrides
   */
  calculateDefaultBorderColor: PropTypes.func,
  /**
   * @ignore
   * Function that calculates hover border colors, used for design overrides
   */
  calculateHoverBorderColor: PropTypes.func,
  /**
   * @ignore
   * Function that calculates hover border width, used for design overrides
   */
  calculateHoverBorderWidth: PropTypes.func,
  /**
   * @ignore
   * Switch to enable 1.x error styles
   */
  heavyErrorBorder: PropTypes.bool,
  /**
   * @ignore
   * Determines viewport of button.
   */
  viewport: PropTypes.oneOf(['mobile', 'tablet', 'desktop']),
};

const _calculateLetterSpacing = () => {
  return calculateRem(TypographyTokens.letterspacing.wide.value);
};

const _calculateErrorBackgroundColor = surface => {
  return surface === 'dark'
    ? ColorTokens.feedback.error.background.ondark.value
    : ColorTokens.feedback.error.background.onlight.value;
};

const _calculateErrorForegroundColor = surface => {
  return surface === 'dark'
    ? ColorTokens.feedback.error.ondark.value
    : ColorTokens.feedback.error.onlight.value;
};

const _calculateDefaultBorderColor = (selected, surface) => {
  if (selected) {
    return surface === 'dark'
      ? ColorTokens.elements.primary.ondark.value
      : ColorTokens.elements.primary.onlight.value;
  }
  return surface === 'dark'
    ? FormControlsTokens.color.border.ondark.value
    : FormControlsTokens.color.border.onlight.value;
};

const _calculateHoverBorderColor = (
  calculateErrorForegroundColor,
  selected,
  error,
  surface
) => {
  if (error) {
    return calculateErrorForegroundColor(surface);
  }
  if (selected) {
    return surface === 'dark'
      ? ColorTokens.elements.primary.ondark.value
      : ColorTokens.elements.primary.onlight.value;
  }
  return surface === 'dark'
    ? ColorTokens.elements.secondary.ondark.value
    : ColorTokens.elements.secondary.onlight.value;
};

const _calculateHoverBorderWidth = (selected, isMobileDevice) => {
  return selected || isMobileDevice ? 0 : calculateRem(1);
};

const _calculateActiveBorderColor = (
  calculateErrorForegroundColor,
  error,
  surface
) => {
  if (error) {
    return calculateErrorForegroundColor(surface);
  }

  return surface === 'dark'
    ? ColorTokens.elements.primary.ondark.value
    : ColorTokens.elements.primary.onlight.value;
};

const defaultProps = {
  selected: undefined,
  children: '',
  disabled: false,
  error: undefined,
  errorEvent: 'blur',
  onChange: () => {},
  className: null,
  maxLabelWidth: undefined,
  surface: 'light',
  calculateLetterSpacing: _calculateLetterSpacing,
  calculateErrorBackgroundColor: _calculateErrorBackgroundColor,
  calculateErrorForegroundColor: _calculateErrorForegroundColor,
  calculateDefaultBorderColor: _calculateDefaultBorderColor,
  calculateHoverBorderColor: _calculateHoverBorderColor,
  calculateHoverBorderWidth: _calculateHoverBorderWidth,
  viewport: 'desktop',
  heavyErrorBorder: false,
};

const ComponentWrapper = styled.div`
  box-sizing: border-box;
  align-items: flex-start;
  cursor: pointer;
  position: relative;
  margin: 0;
  padding: 0 0 0 ${layoutSpaceInlineRadioLabel};

  ${({
    calculateDefaultBorderColor,
    calculateHoverBorderColor,
    calculateHoverBorderWidth,
    calculateActiveBorderColor,
    calculateErrorForegroundColor,
    surface,
    disabled,
    selected,
    error,
    isMobileDevice,
  }) =>
    !disabled &&
    `
    .radioOuter {
      border: solid ${
        FormControlsTokens.border.width.value
      } ${calculateDefaultBorderColor(selected, surface)};
    }
  
    &:hover:not(:active)  .radioOuter {
      border-color: ${calculateHoverBorderColor(
        calculateErrorForegroundColor,
        selected,
        error,
        surface
      )};
      box-shadow: 0 0 0 ${calculateHoverBorderWidth(
        selected,
        isMobileDevice
      )} ${calculateHoverBorderColor(
      calculateErrorForegroundColor,
      selected,
      error,
      surface
    )};
    }

    &:active .radioOuter {
      border-color: ${calculateActiveBorderColor(
        calculateErrorForegroundColor,
        error,
        surface
      )};
    }

    &:active:hover .radioOuter {
      box-shadow: 0 0 0 ${calculateHoverBorderWidth(
        selected,
        isMobileDevice
      )} ${calculateActiveBorderColor(
      calculateErrorForegroundColor,
      error,
      surface
    )};
    }
  `};

  ${({
    error,
    surface,
    calculateErrorForegroundColor,
    calculateErrorBackgroundColor,
    disabled,
    heavyErrorBorder,
  }) =>
    error &&
    !disabled &&
    `
    .radioOuter {
      background-color: ${calculateErrorBackgroundColor(surface)};
      border-color: ${calculateErrorForegroundColor(surface)} ${
      heavyErrorBorder ? '!important' : ''
    };
      box-shadow: ${
        heavyErrorBorder
          ? `0 0 0 2px ${calculateErrorForegroundColor(surface)} !important;`
          : 'none;'
      }
      }
    `};

  ${({ disabled, surface }) =>
    disabled &&
    `
    .radioOuter {
      background: transparent;
      border: solid ${FormControlsTokens.border.width.value} ${
      surface === 'dark' ? iconColorDisabledInverted : iconColorDisabled
    };
    }
  `};
`;

const StyledInput = styled.input`
  position: absolute;
  opacity: 0;
  margin: 0;
  overflow: hidden;
  padding: 0;
  border: 0;
  white-space: nowrap;
  top: -${(hitAreaSize - iconHeight) / 2}px;
  width: ${hitAreaSize}px;
  height: ${hitAreaSize}px;
  right: calc(100% - ${layoutSpaceInlineRadioLabel});
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  pointer-events: auto;

  ${({ showFocus, surface }) =>
    showFocus &&
    `
      &:focus:not(:hover) + label .radioOuter::after {
        border-radius: 50%;
        display: block;
        border: ${calculateRem(focusringWidth)} ${focusringStyle}
          ${
            surface === 'dark'
              ? ColorTokens.elements.primary.ondark.value
              : ColorTokens.elements.primary.onlight.value
          };
        content: '';
        height: ${focusringSize};
        left: 50%;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        width: ${focusringSize};
      };
  `};
`;

class RadioButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selected || false,
      showFocus: true,
    };
  }

  componentDidMount = () => {
    this.isControlled = this.props.selected !== undefined;

    this.isAppleDevice = (() =>
      typeof navigator !== 'undefined' &&
      /iPhone|iPad/i.test(navigator.userAgent))();
    this.isMobileDevice = checkIfMobileDevice();

    this.radioId = this.props.inputId ? this.props.inputId : generateUUID();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps && prevProps.selected !== this.props.selected) {
      this.setState(prevProps => ({ selected: !prevProps.selected }));
    }
  };

  _onChange = e => {
    const { hovered } = this.state;
    if (hovered) this.setState({ showFocus: false });
    else this.setState({ showFocus: true });
    if (this.isControlled) {
      this.props.onChange(e);
    } else {
      this.setState(prevState => ({ selected: !prevState.selected }));
    }
  };

  _blurOnClick = e => {
    e.stopPropagation(); // to prevent the propagation of click event
    if (this.props.errorEvent === 'change') {
      const _this = this;
      showError(e, _this);
    }
  };

  _onBlur = e => {
    if (this.props.errorEvent === 'blur') {
      const _this = this;
      showError(e, _this);
    }
  };

  _onLabelClick = e => {
    e.stopPropagation(); // to prevent the propagation of click event
  };

  /* These are used to remove focus state onClick, blurring elements does not work with screen readers */
  _addHover = e => {
    if (!this.state.hovered) this.setState({ hovered: true });
  };
  _removeHover = e => this.setState({ hovered: false });
  _onFocus = e => {
    if (!this.state.hovered) this.setState({ showFocus: true });
    else this.setState({ showFocus: false });
  };

  render() {
    const {
      children,
      label,
      className,
      disabled,
      error: errorProp,
      name,
      value,
      ariaLabel,
      maxLabelWidth,
      surface,
      id,
      inputId,
      tabIndex,
      'data-analyticstrack': analyticsTrack,
      'data-track': track,
      'data-track-ignore': ignoreTrack,
      'data-clickstream': clickStream,
      calculateLetterSpacing,
      calculateDefaultBorderColor,
      calculateErrorForegroundColor,
      calculateErrorBackgroundColor,
      calculateHoverBorderColor,
      calculateHoverBorderWidth,
      heavyErrorBorder,
      viewport,
    } = this.props;
    const { selected, error: errorState } = this.state;
    // Error state has preference over component's error
    // Because errorProp might be a function, we first need to check if prop is a bool and only then assign its value
    const error = errorState || (typeof errorProp === 'boolean' && errorProp);
    const useViewport = viewport === 'tablet' ? 'desktop' : viewport;

    /* Input can not be nested inside of label, as JAWS will not correctly read the number of items. Also Input is before Label for css selector for focus state*/
    return (
      <ComponentWrapper
        surface={surface}
        disabled={disabled}
        error={error}
        selected={selected}
        onMouseEnter={this._addHover}
        onMouseLeave={this._removeHover}
        calculateErrorForegroundColor={calculateErrorForegroundColor}
        calculateErrorBackgroundColor={calculateErrorBackgroundColor}
        calculateDefaultBorderColor={calculateDefaultBorderColor}
        calculateHoverBorderColor={calculateHoverBorderColor}
        calculateHoverBorderWidth={calculateHoverBorderWidth}
        calculateActiveBorderColor={_calculateActiveBorderColor}
        isMobileDevice={this.isMobileDevice}
        heavyErrorBorder={heavyErrorBorder}
        className="radioWrapper"
      >
        <StyledInput
          checked={selected}
          disabled={disabled}
          id={this.radioId}
          name={name}
          onBlur={this._onBlur}
          onChange={this._onChange}
          onClick={this._blurOnClick}
          role="radio"
          type="radio"
          value={value}
          showFocus={this.state.showFocus}
          onFocus={this._onFocus}
          surface={surface}
          tabIndex={tabIndex}
          aria-label={
            ariaLabel
              ? ariaLabel
              : label
              ? getNodeText(label) + ' ' + getNodeText(children)
              : getNodeText(children)
          }
        />
        <RadioButtonLabel
          id={id}
          className={className}
          name={name}
          disabled={disabled}
          selected={selected}
          maxLabelWidth={maxLabelWidth}
          htmlFor={this.radioId}
          radioId={this.radioId}
          ariaLabel={ariaLabel}
          label={label}
          data-track={track}
          data-track-ignore={ignoreTrack}
          data-analyticstrack={analyticsTrack}
          data-clickstream={clickStream}
          surface={surface}
          calculateLetterSpacing={calculateLetterSpacing}
          viewport={useViewport}
          onClick={this._onLabelClick}
        >
          {children}
        </RadioButtonLabel>
      </ComponentWrapper>
    );
  }
}

RadioButton.propTypes = propTypes;
RadioButton.defaultProps = defaultProps;

export default withVDSManager(RadioButton);
