import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import UNSAFE_SetEnvRef from '@uie/set-env-ref';
import { InputField as DefaultInput } from '@vds-core/inputs';
import { Calendar as DefaultCalendar } from '@vds-core/calendars';
import { ColorTokens } from '@vds-tokens/color';
import {
  withVDSManager,
  calculateRem,
  checkIfMobileDevice,
  getOS,
  generateUUID,
} from '@vds-core/utilities';
import { showError } from '@vds-core/form-elements';
import { formatDate } from '../utils';

function _errorBackgroundColor(error, surface, disabled) {
  if (error && surface === 'dark' && !disabled) {
    return ColorTokens.feedback.error.background.ondark.value;
  } else if (error && surface !== 'dark' && !disabled) {
    return ColorTokens.feedback.error.background.onlight.value;
  }
}

const propTypes = {
  /**
   * The beginning of a period that shall be displayed by the Calendar. If no value is provided, the current date (new Date()) will be used. If null is provided, no date will be selected.
   */
  selectedDate: PropTypes.instanceOf(Date),
  /**
   * Boolean or a Function that returns a boolean value that determines if component should show the error state/error message. Function receives an object of type DATE on input change.
   * @note If this is provided, you are responsible for controlling all errors for this component. Otherwise, if the Input is required, this component will throw an error if the component is blurred and does not contain any input.
   */
  error: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  /**
   *  Determines what event this component will check for an error, options are 'onBlur' or 'onChange'.
   */
  errorEvent: PropTypes.oneOf(['blur', 'change', 'blurAndChange']),
  /**
   * Callback used to get the selected date from DatePicker.
   */
  onChange: PropTypes.func,
  /**
   * If provided and in error state, the error text will be displayed under the calendar input.
   */
  errorText: PropTypes.string,
  /**
   * If provided, this will render as the label text of the DatePicker input.
   */
  label: PropTypes.string,
  /**
   * @ignore
   */
  readOnly: PropTypes.bool,
  /**
   * If provided, the Input will be rendered in the Disabled State.
   */
  disabled: PropTypes.bool,
  /**
   * If provided, will override the default sizing widths for the small and large datepicker input.
   */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * @ignore
   */
  dateFormat: PropTypes.oneOf([
    'MM/DD/YY',
    'Month, Date, Year',
    'MM/DD/YYYY',
    'M/D/YYYY',
    'Mon D, YYYY',
  ]),
  /**
   * @ignore
   */
  required: PropTypes.bool,
  /**
   * @ignore - config for passing though typography
   */
  bodyConfig: PropTypes.object,
  /**
   * @ignore - used for state in showing and hiding error icon on focus of the input
   */
  iconFocusState: PropTypes.bool,
  /**
   * @ignore - passes Icon data through
   */
  iconConfig: PropTypes.object,
  /**
   * @ignore - moves icon to the right side of the input label
   */
  iconPosition: PropTypes.string,
  /**
   * @ignore - adds max-width to input field
   */
  maxWidth: PropTypes.string,
  /**
   * @ignore - adds min-width to input field
   */
  minWidth: PropTypes.string,
  /**
   * @ignore - adds hover state to input field
   */
  hoverState: PropTypes.bool,
  /**
   * @ignore - padding on the inside of the input field takes in params of iconFocusState and error
   */
  calculateInputPadding: PropTypes.func,
  /**
   * @ignore - spacing between the label and the input field
   */
  labelMarginBottom: PropTypes.string,
  /**
   * @ignore - defines whether text trancates with ellipsis or not
   */
  overflowEllipsis: PropTypes.bool,
  /**
   * @ignore
   */
  Calendar: PropTypes.func,
  /**
   * If provided, the calendar will allow a selection to be made from this date forward. Defaults to today.
   */
  minDate: PropTypes.instanceOf(Date),
  /**
   * If provided, dates will be selectable up until this date.
   */
  maxDate: PropTypes.instanceOf(Date),
  /**
   * @ignore - number representing height of input field
   */
  inputHeight: PropTypes.string,
  /**
   * Allows a unique ID to be passed to the component.
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
   * Enable specific dates. Pass an array of strings in date format.
   * @note Formats accepted: MM/DD/YYYY, MM/DD/YY, Sep 24 2020, 25 Sep 2020, 25 September 2020, September 24 2020, 24-09-2020, 2020-09-24. All other dates will be inactive.
   */
  activeDates: PropTypes.array,
  /**
   * Disable specific dates. Pass an array of strings in date format.
   * @note Formats accepted: MM/DD/YYYY, MM/DD/YY, Sep 24 2020, 25 Sep 2020, 25 September 2020, September 24 2020, 24-09-2020, 2020-09-24. All other dates will be active.
   */
  inactiveDates: PropTypes.array,
  /**
   * If provided, the datepicker will be rendered in the surface dark or light state.
   */
  surface: PropTypes.oneOf(['light', 'dark']),
  /**
   * @ignore
   * If provided, the datepicker will be rendered with transparent background.
   */
  transparentBackground: PropTypes.bool,
  /**
   * @ignore If passed, a background color will be passed to the input
   */
  errorBackgroundColor: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  /**
   * If set to true, the calendar will not have current date indication
   */
  hideCurrentDateIndicator: PropTypes.bool,
  /**
   * Enables the addition of date indicators
   * @typeName indicatorData
   */
  indicators: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      date: PropTypes.instanceOf(Date),
    })
  ),
  /**
   * @ignore
   */
  dateSelectionSize: PropTypes.number,
  /**
   * @ignore
   * If set to true, the calendar will not have a border
   */
  hideCalendarContainerBorder: PropTypes.bool,
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
   * This is used to set the name attribute.
   */
  name: PropTypes.string,
};

const defaultProps = {
  error: undefined,
  errorEvent: 'blur',
  onChange: () => {},
  errorText: 'Error Text',
  label: '',
  disabled: false,
  readOnly: false,
  required: true,
  width: '100%',
  dateFormat: 'Month, Date, Year',
  inputHeight: calculateRem(44),
  minDate: new Date(),
  maxDate: undefined,
  inactiveDates: null,
  activeDates: null,
  Calendar: DefaultCalendar,
  InputField: DefaultInput,
  Tooltip: undefined,
  surface: 'light',
  transparentBackground: false,
  errorBackgroundColor: _errorBackgroundColor,
  maxWidth: null,
  minWidth: calculateRem(44),
  hideCurrentDateIndicator: false,
  dateSelectionSize: 40,
  hideCalendarContainerBorder: false, // BRAND3.0 only
};

const CALENDAR_PADDING = 4;

const DatePickerContainer = styled.div`
  position: relative;
  width: ${({ width }) =>
    typeof width === 'number' ? calculateRem(width) : width};

  input:required {
    box-shadow: none;
  }
  max-width: ${({ maxWidth }) => calculateRem(maxWidth)};
  min-width: ${({ minWidth }) => calculateRem(minWidth)};
  ${({ height }) => `height: ${calculateRem(height)}`};
  ${({ isOpen }) => isOpen && `z-index: 5`};
`;

const CalendarIconWrapper = styled.div`
  display: inline-flex;
  top: 12px;
  left: 12px;
  position: absolute;
  z-index: 1;
  cursor: ${({ readOnly, disabled }) => !readOnly && !disabled && `pointer`};
  &:hover + span {
    ${({ readOnly, disabled, surface }) =>
      !readOnly &&
      !disabled &&
      `
      border: ${calculateRem(1)} solid ${
        ColorTokens.elements.primary[
          `on${surface === 'dark' ? 'dark' : 'light'}`
        ].value
      };
  `};
  }
`;

const CalendarIcon = styled.svg`
  display: inline-block;
  height: ${calculateRem(20)};
  width: ${calculateRem(20)};
  min-height: ${calculateRem(20)};
  min-width: ${calculateRem(20)};
  outline: none;
  pointer-events: none;

  &:active,
  &:focus {
    outline: none;
  }
`;

const outsideActionEvents = ['mousedown', 'focusin', 'touchstart'];

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen:
        this.props.alwaysOpen && !this.props.disabled
          ? this.props.alwaysOpen
          : false,
      error: typeof this.props.error === 'function' ? false : this.props.error, // If error passes a function, then the error state will initially be set to false
      emptyError: undefined,
      hovered: false,
    };
  }

  refKey = UNSAFE_SetEnvRef();

  onOutsideAction = event => {
    const target = event.target;
    const { required, error } = this.props;

    /* istanbul ignore else  */
    if (this.calendarRef && !this.calendarRef.contains(target)) {
      this.closeCalendar();
      const value = this.calendarRef.querySelector('input').value;
      /* istanbul ignore else  */
      if (!value && required) {
        this.setState({ emptyError: true });
      }
      /* istanbul ignore else  */
      if (
        this.props.errorEvent === 'blur' ||
        this.props.errorEvent === 'blurAndChange'
      ) {
        const _this = this;
        showError(value, _this);
      }
    }
  };

  handleOutsideActionListeners(shouldListen) {
    const { isOpen } = this.state;

    const shouldListenWithFallback =
      typeof shouldListen !== 'undefined' ? shouldListen : isOpen;
    const fnName = shouldListenWithFallback
      ? 'addEventListener'
      : 'removeEventListener';
    outsideActionEvents.forEach(eventName => {
      document[fnName](eventName, this.onOutsideAction);
    });
  }

  componentDidMount = () => {
    const { dateFormat } = this.props;
    if (this.props.selectedDate) {
      this.setState({
        date: formatDate(this.props.selectedDate, dateFormat),
      });
    }
    this.handleOutsideActionListeners();
    this._calcHeight();
    this.calendarRef.addEventListener('resize', this._calcHeight);
    this.calendarRef.addEventListener('keydown', this._onEsc);
    this.isMobileDevice = checkIfMobileDevice();
    this.isAndroidDevice = getOS() === 'android';
    this.isAppleMobileDevice = getOS() === 'ios';
  };

  componentWillUnmount = () => {
    this.handleOutsideActionListeners(false);
    this.calendarRef.removeEventListener('resize', this._calcHeight);
    this.calendarRef.removeEventListener('keydown', this._onEsc);
  };

  componentDidUpdate(prevProps, prevState) {
    const {
      dateFormat,
      selectedDate,
      error,
      alwaysOpen,
      disabled,
    } = this.props;

    if (dateFormat !== prevProps.dateFormat) {
      const formattedDate = formatDate(this.state.date, dateFormat);
      this.setState({ date: formattedDate });
    } else if (selectedDate !== prevProps.selectedDate) {
      const formattedDate = formatDate(selectedDate, dateFormat);
      this.setState({ date: formattedDate });
    }
    if (prevProps.error !== error) {
      this.setState({ error: error });
    }
    if (
      prevProps.alwaysOpen !== alwaysOpen ||
      prevProps.disabled !== disabled
    ) {
      this.setState({ isOpen: disabled ? false : alwaysOpen });
    }
    if (this.state.isOpen !== prevState.isOpen) {
      this.handleOutsideActionListeners();
    }

    if (error === undefined && prevProps.emptyError !== this.props.emptyError) {
      this.setState({ emptyError: emptyError });
    }
    if (error === undefined && prevProps.required !== this.props.required) {
      this.setState({ emptyError: false });
    }
    if (
      prevProps.alwaysOpen !== this.props.alwaysOpen ||
      prevProps.label !== this.props.label ||
      prevProps.helperText !== this.props.helperText ||
      prevProps.helperTextPlacement !== this.props.helperTextPlacement
    ) {
      this._calcHeight();
    }
  }

  closeCalendar = (callback = false) => {
    this.setState({ isOpen: false }, () => {
      if (this.isAndroidDevice) {
        callback && this.calendarRef.querySelector('input').parentNode.focus();
      } else {
        if (this.isAppleMobileDevice && callback) {
          // fix for iOS - to prevent focus stuck in input after date selected, when using swipe right
          this.calendarRef.querySelector('input').focus();
          this.calendarRef.querySelector('input').blur();
        }
        callback && this.calendarRef.querySelector('input').focus();
      }
    });
  };

  openCalendar = (callback = false) => {
    this.setState({ isOpen: true }, () => {
      if (this.isMobileDevice) {
        this.calendarRef.querySelector('input').blur();
        this.calendarRef
          .querySelector('button[class^="react-calendar"]:not([disabled])')
          .focus();
      }
      callback &&
        !this.state.hovered &&
        this.calendarRef
          .querySelector('button[class^="react-calendar"]:not([disabled])')
          .focus();
    });
  };

  onChange = date => {
    const { dateFormat, onChange } = this.props;
    const formattedDate = formatDate(date, dateFormat);
    onChange && onChange(formattedDate);
    if (this.props.error === undefined) this.setState({ emptyError: false });
    this.setState({ date: formattedDate });
    const _this = this;
    showError(formattedDate, _this);
    if (this.state.mouseUpEvent && this.state.hovered) {
      this.closeCalendar();
    } else {
      this.closeCalendar(true);
    }
  };

  _renderCalendarIcon = () => {
    const { iconConfig, readOnly, label, disabled, surface } = this.props;

    let iconColor = ColorTokens.elements.primary.onlight.value;
    if (surface === 'dark') {
      if (disabled) iconColor = ColorTokens.interactive.disabled.ondark.value;
      else iconColor = ColorTokens.elements.primary.ondark.value;
    } else if (disabled) {
      iconColor = ColorTokens.interactive.disabled.onlight.value;
    }

    return (
      <CalendarIconWrapper
        readOnly={readOnly}
        disabled={disabled}
        onClick={readOnly || disabled ? () => {} : () => this.openCalendar()}
        label={label}
        surface={surface}
        aria-hidden={this.isMobileDevice ? true : false}
      >
        <CalendarIcon
          tabIndex={-1}
          aria-label="calendar icon"
          viewBox="0 0 21.6 21.6"
        >
          <path
            d="M1.8,1.8v18h18v-18C19.8,1.8,1.8,1.8,1.8,1.8z M18.7,18.7H2.9V5.2h15.7v13.5H18.7z M18.7,4H2.9V2.9h15.7V4H18.7z M10.7,13.8
            c0-1.1-0.8-1.7-2.2-1.7H8v-0.8h0.5c1.3,0,2-0.6,2-1.5c0-0.9-0.8-1.5-1.8-1.5c-1.2,0-2,0.8-2,2h-1c0-1.7,1.1-2.8,3-2.8
            c1.6,0,2.8,0.9,2.8,2.3c0,1-0.6,1.5-1.4,1.8v0c1.2,0.3,1.7,1.1,1.7,2.2c0,1.6-1.3,2.6-3.1,2.6c-1.9,0-3.4-1.1-3.4-3h1
            c0,1.4,0.9,2.1,2.3,2.1C9.9,15.6,10.7,15,10.7,13.8z M14.8,10h-1.9V9.3c1,0,1.9-0.4,2.1-1.7h0.8v8.6h-1V10z"
            stroke="none"
            fill={iconColor}
          />
        </CalendarIcon>
      </CalendarIconWrapper>
    );
  };

  _calculateInputPadding = () => {
    const { calculateInputPadding } = this.props;
    if (calculateInputPadding) {
      return calculateInputPadding;
    } else {
      return calculateRem(12, 12, 12, 44);
    }
  };

  _onKeyDown = e => {
    e.keyCode !== 9 && e.preventDefault();
    if (e.keyCode === 13 || e.keyCode === 32) {
      this.openCalendar(true);
    }
  };

  _onEsc = e => {
    if (e.keyCode === 27) {
      this.closeCalendar(true);
    }
  };

  _onFocusOut = e => {
    if (e.keyCode === 9) {
      this.closeCalendar();
    }
  };

  _calcHeight = () => {
    const inputHeight =
      (this.props.label
        ? this.calendarRef.querySelector('label').getBoundingClientRect()
            .height + CALENDAR_PADDING
        : 0) +
      this.calendarRef.querySelector('input').getBoundingClientRect().height +
      CALENDAR_PADDING;
    this.setState({ calendarTop: inputHeight });
  };

  _addHover = e => {
    if (!this.state.hovered && !this.isMobileDevice)
      this.setState({ hovered: true });
  };

  _removeHover = e => this.setState({ hovered: false });

  render() {
    const {
      selectedDate: selectedDateProp,
      onChange,
      errorText,
      label,
      error: errorProp,
      readOnly,
      disabled,
      width,
      dateFormat,
      bodyConfig,
      hoverState,
      overflowEllipsis,
      calculateInputPadding,
      minWidth,
      maxWidth,
      iconConfig,
      labelMarginBottom,
      iconPosition,
      required,
      focusState,
      placeHolderText,
      styleConfig,
      Calendar,
      InputField,
      minDate,
      maxDate,
      tooltip,
      tooltipTitle,
      tooltipContent,
      Tooltip,
      inactiveDates,
      activeDates,
      id,
      helperText,
      helperTextPlacement,
      Body,
      Micro,
      alwaysOpen,
      inputId,
      errorBackgroundColor,
      hideCurrentDateIndicator,
      dateSelectionSize,
      indicators,
      transparentBackground,
      surface,
      hideCalendarContainerBorder,
      tooltipCloseButtonText,
      ...otherProps
    } = this.props;
    const { isOpen, date, calendarTop, error: errorState } = this.state;

    const error = errorState || (typeof errorProp === 'boolean' && errorProp);

    const dateId = inputId ? inputId : generateUUID();

    const selectedDate = error ? null : selectedDateProp;

    return (
      <DatePickerContainer
        id={id}
        width={width}
        styleConfig={styleConfig}
        minWidth={minWidth}
        maxWidth={maxWidth}
        data-testid="date-test-id"
        {...{ [this.refKey]: elem => (this.calendarRef = elem) }}
        onMouseUp={() => this.setState({ mouseUpEvent: true })}
        onMouseEnter={this._addHover}
        onMouseLeave={this._removeHover}
        onKeyDown={() =>
          this.setState({ mouseUpEvent: false, mouseOverEvent: false })
        }
        isOpen={isOpen}
      >
        <InputField
          overflowEllipsis={overflowEllipsis}
          focusState={focusState}
          iconPosition={iconPosition}
          required={required}
          renderErrorIcon
          minWidth={minWidth}
          maxWidth={maxWidth}
          iconConfig={iconConfig}
          hoverState={hoverState}
          bodyConfig={bodyConfig}
          labelMarginBottom={labelMarginBottom}
          tooltip={tooltip}
          // color={colorConfig}
          width={width}
          label={label}
          disabled={disabled}
          readOnly={readOnly}
          error={error}
          errorText={errorText}
          onClick={readOnly ? () => {} : () => this.openCalendar(true)}
          onKeyDown={this._onKeyDown}
          pickerSize="normal"
          value={date || ''}
          isOpen={isOpen}
          autoComplete="off"
          Tooltip={Tooltip}
          tooltipTitle={tooltipTitle}
          tooltipContent={tooltipContent}
          tooltipCloseButtonText={tooltipCloseButtonText}
          helperText={helperText}
          helperTextPlacement={helperTextPlacement}
          Body={Body}
          Micro={Micro}
          inputId={dateId}
          {...otherProps}
          transparentBackground={transparentBackground}
          renderInputIcon={this._renderCalendarIcon}
          type="calendar"
          calculateInputPadding={this._calculateInputPadding}
          emptyError={this.state.emptyError}
          surface={surface}
          caretColor="transparent"
          alwaysOpenCalendar={disabled ? false : alwaysOpen}
          errorBackgroundColor={
            !!errorBackgroundColor &&
            errorBackgroundColor(error, surface, disabled)
          }
        />
        <Calendar
          datePicker
          alwaysOpen={disabled ? false : alwaysOpen}
          Calendar={Calendar}
          selectedDate={selectedDate}
          isOpen={isOpen}
          onChange={this.onChange}
          minDate={minDate}
          maxDate={maxDate}
          inactiveDates={inactiveDates}
          activeDates={activeDates}
          surface={surface}
          calendarTop={calendarTop}
          hideCurrentDateIndicator={hideCurrentDateIndicator}
          dateSelectionSize={dateSelectionSize}
          indicators={indicators}
          transparentBackground={transparentBackground}
          hideContainerBorder={hideCalendarContainerBorder}
          inputId={dateId}
        />
      </DatePickerContainer>
    );
  }
}

DatePicker.propTypes = propTypes;
DatePicker.defaultProps = defaultProps;

export default withVDSManager(DatePicker);
