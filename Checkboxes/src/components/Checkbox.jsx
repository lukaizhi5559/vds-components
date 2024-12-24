import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import {
  withVDSManager,
  calculateRem,
  getBrowser,
  generateUUID,
  getOS,
  getNodeText,
} from '@vds-core/utilities';
import { ColorTokens } from '@vds-tokens/color';
import { LayoutTokens } from '@vds-tokens/layout';
import { Body } from '@vds-core/typography';
import CheckboxLabel from './CheckboxLabel';
import CheckboxIcon from './CheckboxIcon';
import CheckboxError from './CheckboxError';
import { showError } from '../utils';

const BORDER_RADIUS = calculateRem(2);
const FOCUS_BORDER_RADIUS = calculateRem(LayoutTokens.space['1X'].value);

const propTypes = {
  /**
   * Items rendered as children to this component will be displayed in the Checkbox label.
   * @note If you provide any HTML elements or React Components for this Property, you are responsible for managing accessibility as well.
   */
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.node,
  ]),
  /**
   * When provided, will set a custom width for the checkbox wrapper.
   */
  width: PropTypes.string,
  /**
   * When true, will add the required attribute to the checkbox element
   */
  required: PropTypes.bool,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If provided, the Checkbox will be rendered in the Disabled State.
   */
  disabled: PropTypes.bool,
  /**
   * @ignore
   * If provided, will disassociate the label from inputId
   */
  customLabel: PropTypes.bool,
  /**
   * Boolean (or Function that returns a boolean value) that determines if the component should display the error state and error message. Function receives the 'event' object on input change.
   */
  error: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  /**
   *  Determines which event this component will check for an error, options are 'onBlur' or 'onChange'.
   */
  errorEvent: PropTypes.oneOf(['blur', 'change']),
  /**
   * This is used for the name attribute of the html input. When several checkboxes have the same name, the form will send a group of values.
   */
  name: PropTypes.string,
  /**
   * Function called when the value of the checkbox changes.
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * If provided, the Checkbox will be rendered as selected.
   * @note If you would like to render this component as a controlled component, do not leave this value undefined. Otherwise it will assume it is uncontrolled.
   */
  selected: PropTypes.bool,
  /**
   * @ignore
   * If provided, will specify the tabIndex
   */
  tabIndex: PropTypes.number,
  /**
   * This message will be displayed when the Checkbox is in an error state.
   */
  errorText: PropTypes.string,
  /**
   * If provided, this will render as bold text inside the label of the checkbox. When using this prop with children, this will be the first line of text followed by children.
   */
  label: PropTypes.string,
  /**
   * Allows an id to be passed to the outermost wrapper of the component.
   */
  id: PropTypes.string,
  /**
   * Allows a unique ID to be passed to the <input> element.
   */
  inputId: PropTypes.string,
  /**
   * @ignore
   * Provides the border width for the checkbox
   */
  calculateBorderWidth: PropTypes.func,
  /**
   * @ignore
   * Provides the box-shadow style for the checkbox
   */
  calculateBoxShadow: PropTypes.func,
  /**
   * @ignore
   * Provides the color for checkbox background
   */
  calculateCheckboxBackgroundColor: PropTypes.func,
  /**
   * @ignore
   * Provides the border color for checkbox
   */
  calculateBorderColor: PropTypes.func,
  /**
   * @ignore
   * Sets the border radius for checkbox
   */
  borderRadius: PropTypes.string,
  /**
   * @ignore
   * Sets left margin for the error text
   */
  errorLeftMargin: PropTypes.string,
  /**
   * @ignore
   * Sets the border radius for checkbox on focus
   */
  focusBorderRadius: PropTypes.string,
  /**
   * @ignore
   */
  surface: PropTypes.oneOf(['light', 'dark']),
  /**
   * If provided, used as string that labels the element for accessibility.
   */
  ariaLabel: PropTypes.string,
  /**
   * Allows a string to be provided for analytics.
   */
  'data-track': PropTypes.string,
  /**
   * Allows a string to be provided for ignoring analytics tagging.
   */
  'data-track-ignore': PropTypes.string,
  /**
   * Allows a string to be provided for analytics.
   */
  'data-analyticstrack': PropTypes.string,
  /**
   * Allows a string to be provided for click stream.
   */
  'data-clickstream': PropTypes.string,
};

const defaultProps = {
  children: '',
  required: true,
  className: null,
  surface: 'light',
  disabled: false,
  customLabel: false,
  error: undefined,
  errorEvent: 'blur',
  onChange: () => {},
  width: '100%',
  hitAreaLabelMargin: false,
  borderRadius: BORDER_RADIUS,
  focusBorderRadius: FOCUS_BORDER_RADIUS,
};

const CheckboxWrapper = styled.div`
  margin-bottom: 0;
  max-width: ${calculateRem(596)};
  width: ${({ width }) => width};
`;

const CheckWrapper = styled.div`
  height: ${calculateRem(20)};
  position: relative;
  top: 0;
  left: 0;
  width: ${calculateRem(20)};
  display: flex;
  flex-shrink: 0;
  ${({ hasLabel }) =>
    hasLabel &&
    css`
      margin-right: ${calculateRem(LayoutTokens.space['3X'].value)};
    `}
`;

const ChildWrapper = styled.span`
  margin-top: 0;
`;

const LabelWrapper = styled.span`
  display: flex;
  flex: 1;
  padding-bottom: ${calculateRem(LayoutTokens.space['1X'].value)};
`;

const StyledInput = styled.input`
  pointer-events: ${({ disabled }) =>
    disabled
      ? 'none'
      : 'auto'}; // pointer-events: auto; To ensure proper functions when used on TileContainer
`;

class Checkbox extends React.Component {
  state = {
    selected: this.props.selected || false,
    showFocus: true,
    error: this.props.error === true,
  };

  componentDidMount() {
    this.isControlled = this.props.hasOwnProperty('selected');
    this.isAndroidDevice = (() =>
      navigator.userAgent.toLowerCase().indexOf('android') > -1)();
    this.isAppleDevice = getOS() === 'osx' || getOS() === 'ios';
    this.isWindows = getOS() === 'windows';
  }

  componentDidUpdate = prevProps => {
    if (prevProps && prevProps.selected !== this.props.selected) {
      this.setState(prevProps => ({ selected: !prevProps.selected }));
    }
  };

  _checkIfIe = getBrowser() === 'ie';

  handleSelect = e => {
    if (e.keyCode !== 27) e.stopPropagation(); // need to stop propogation here because youre handling the click event.
    const { hovered, showFocus } = this.state;

    let keySelected = e.keyCode;
    let enterOrSpace = keySelected === 13 || keySelected === 32;

    if (enterOrSpace) {
      e.preventDefault();
      this.props.onKeyDown && this.props.onKeyDown(e);
    }

    if ((keySelected && enterOrSpace) || !keySelected) {
      if (hovered && showFocus) this.setState({ showFocus: false });

      // to return correct e.target.checked value when using enter/space keys
      if (keySelected && enterOrSpace) e.target.checked = !this.state.selected;

      this.props.onChange(e, {
        name: this.props.name,
        value: this.props.value,
        selected: !this.state.selected,
        index: this.props.index,
      });

      !this.isControlled &&
        this.setState(prevState => ({ selected: !prevState.selected }));

      // check for error on checkbox change
      if (this.props.errorEvent === 'change') {
        const _this = this;
        showError(e, _this);
      }
    }
  };

  _onBlur = e => {
    if (this.props.errorEvent === 'blur') {
      const _this = this;
      showError(e, _this);
    }
  };

  /* These are used to remove focus state onClick, blurring elements does not work with screen readers */
  _addHover = e => {
    if (!this.state.hovered) this.setState({ hovered: true });
  };
  _removeHover = e => this.setState({ hovered: false });
  _onFocus = e => {
    const { showFocus, hovered } = this.props;
    if (!hovered && !showFocus) this.setState({ showFocus: true });
    else if (showFocus) this.setState({ showFocus: false });
  };

  render() {
    const {
      className,
      required,
      surface,
      children,
      label,
      customLabel,
      tabIndex,
      disabled,
      error: errorProp,
      errorText,
      name,
      value,
      width,
      id,
      inputId,
      letterSpacing,
      calculateBorderWidth,
      calculateBoxShadow,
      calculateBorderColor,
      calculateCheckboxBackgroundColor,
      borderRadius,
      focusBorderRadius,
      errorMarginLeft,
      'data-analyticstrack': analyticsTrack,
      'data-track': track,
      'data-track-ignore': ignoreTrack,
      'data-clickstream': clickStream,
      ariaLabel,
    } = this.props;

    const { selected, error: errorState } = this.state;

    // Error state has preference over component's error
    // Because errorProp might be a function, we first need to check if prop is a bool and only then assign its value
    const error = errorState || (typeof errorProp === 'boolean' && errorProp);

    const checkboxId = inputId ? inputId : generateUUID();

    const errorCopy = errorText || '';

    error &&
      !errorText &&
      console.error('Error Text for Checkbox MUST be provided');

    const color =
      surface === 'dark'
        ? ColorTokens.elements.primary.ondark.value
        : ColorTokens.elements.primary.onlight.value;

    const disabledColor =
      surface === 'dark'
        ? ColorTokens.interactive.disabled.ondark.value
        : ColorTokens.interactive.disabled.onlight.value;

    return (
      <CheckboxWrapper width={width} surface={surface} id={id}>
        <CheckboxLabel
          onClick={e => e.stopPropagation()}
          className={className}
          disabled={disabled}
          error={error}
          htmlFor={customLabel ? null : checkboxId}
          color={disabled ? disabledColor : color}
          onMouseEnter={this._addHover}
          onMouseLeave={this._removeHover}
          showFocus={this.state.showFocus}
          letterSpacing={letterSpacing}
          focusBorderRadius={focusBorderRadius}
        >
          <CheckWrapper hasLabel={!!label || !!children}>
            <StyledInput
              checked={selected}
              required={required}
              data-testid="test-input"
              disabled={disabled}
              id={checkboxId}
              name={name}
              onChange={this.handleSelect}
              onKeyDown={this.handleSelect}
              onBlur={this._onBlur}
              tabIndex={tabIndex ? tabIndex : 0}
              type="checkbox"
              value={value}
              aria-describedby={errorCopy}
              aria-label={
                ariaLabel
                  ? ariaLabel
                  : label
                  ? label + ' ' + getNodeText(children)
                  : getNodeText(children)
              }
              data-clickstream={clickStream}
              data-analyticstrack={analyticsTrack}
              data-track={track}
              data-track-ignore={ignoreTrack}
              onFocus={this._onFocus}
              surface={surface}
            />
            <CheckboxIcon
              disabled={disabled}
              error={error}
              selected={selected}
              hovered={this.state.hovered}
              surface={surface}
              calculateBorderWidth={calculateBorderWidth}
              calculateBoxShadow={calculateBoxShadow}
              calculateBorderColor={calculateBorderColor}
              calculateCheckboxBackgroundColor={
                calculateCheckboxBackgroundColor
              }
              borderRadius={borderRadius}
            />
          </CheckWrapper>
          <ChildWrapper data-testid="test-child-wrapper">
            {label && (
              <LabelWrapper aria-hidden={true}>
                <Body
                  size="large"
                  tabIndex={-1}
                  bold
                  color={disabled ? disabledColor : color}
                >
                  {label}
                </Body>
              </LabelWrapper>
            )}
            <div aria-hidden={typeof children === 'string'}>{children}</div>
          </ChildWrapper>
        </CheckboxLabel>
        {error && !disabled && (
          <CheckboxError
            errorText={errorCopy}
            color={color}
            errorMarginLeft={errorMarginLeft}
          />
        )}
      </CheckboxWrapper>
    );
  }
}

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;

export default withVDSManager(Checkbox);
