import React from 'react';
import PropTypes from 'prop-types';
import { Calendar as ReactCalendar } from './ReactCalendar/Calendar';
import styled, { css } from 'styled-components';
import { calculateRem, checkIfMobileDevice } from '@vds-core/utilities';
import { ColorTokens } from '@vds-tokens/color';
import { LayoutTokens } from '@vds-tokens/layout';
import { TypographyTokens } from '@vds-tokens/typography';
import { FormControlsTokens } from '@vds-tokens/form-controls';
import { AccessibilityTokens } from '@vds-tokens/accessibility';
import { ButtonIcon } from '@vds-core/button-icons';
import LeftCaret from '@vds-core/icons/left-caret';
import RightCaret from '@vds-core/icons/right-caret';
import { Fonts } from '@vds-core/typography';

// 3.0: extracted breakpoints from theme
const breakpoints = {
  xs: '320px',
  sm: '544px',
  md: '767px',
  lg: '1025px',
  xl: '1272px',
};

// Icon size small is 16px
const iconSize = 16;

// Use right-caret-bold.svg
const RightCaretBoldIcon = (
  <svg
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 21.6 21.6"
  >
    <path d="M7.6,20.7L5,18.1l7.3-7.3L5,3.5l2.5-2.5l9.9,9.9L7.6,20.7z" />
  </svg>
);

// Use right-caret.svg
const RightCaretIcon = (
  <svg
    id="Layer_1"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 21.6 21.6"
  >
    <polygon points="6.71 19.8 5.89 18.981 14.07 10.799 5.89 2.619 6.71 1.8 15.71 10.799 6.71 19.8" />
  </svg>
);

// Use left-caret-bold.svg
const LeftCaretBoldIcon = (
  <svg
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 21.6 21.6"
  >
    <path d="M14.1,20.7l-9.9-9.9l9.9-9.9l2.5,2.5l-7.3,7.3l7.3,7.3L14.1,20.7z" />
  </svg>
);

// Use left-caret.svg
const LeftCaretIcon = (
  <svg
    id="Layer_1"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 21.6 21.6"
  >
    <polygon points="14.89 19.8 5.89 10.799 14.89 1.8 15.71 2.619 7.53 10.799 15.71 18.981 14.89 19.8" />
  </svg>
);

const propTypes = {
  /**
   * Callback used to get the selected date from Calendar.
   */
  onChange: PropTypes.func,
  /**
   * If provided, this is the date that will show as selected by the Calendar. If no value is provided, the current date will be used. If null is provided, no date will be selected.
   */
  selectedDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  /**
   * A custom width can be passed to calendar for scalability purposes.
   */
  width: PropTypes.number,
  /**
   * If provided, the calendar will allow a selection to be made from this date forward. Defaults to today.
   */
  minDate: PropTypes.instanceOf(Date),
  /**
   * If provided, the calendar will allow a selection to be made up to this date.
   */
  maxDate: PropTypes.instanceOf(Date),
  /**
   * @ignore
   * If provided, the calendar will be rendered with transparent background.
   */
  transparentBackground: PropTypes.bool,
  /**
   * Enable specific days. Pass an array of string elements in date format e.g. ['07/21/2020', '07/24/2020', '07/28/2020'].  All other dates will be inactive.
   */
  activeDates: PropTypes.array,
  /**
   * Disable specific days. Pass an array of string elements in date format e.g. ['07/21/2020', '07/24/2020', '07/28/2020'].  All other dates will be active.
   */
  inactiveDates: PropTypes.array,
  /**
   * If set to true, the calendar will not have current date indication
   */
  hideCurrentDateIndicator: PropTypes.bool,
  /**
   * @typeName indicatorData
   * Enables the addition of date indicators.  Takes an array of indicator objects.\
   */
  indicators: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      date: PropTypes.instanceOf(Date),
    })
  ),
  /**
   * @ignore
   * If set to true, the calendar will not have a border
   */
  hideContainerBorder: PropTypes.bool,
  /**
   * @ignore
   */
  dateSelectionSize: PropTypes.number,
  /**
   * @ignore
   */
  surface: PropTypes.oneOf(['light', 'dark']),
};

const defaultProps = {
  selectedDate: undefined,
  onChange: () => {},
  width: undefined,
  minDate: new Date(),
  hideCurrentDateIndicator: false,
  dateSelectionSize: 40,
  transparentBackground: false,
  surface: 'light',
  hideContainerBorder: false,
  isOpen: true,
};

const CalendarWrapper = styled.div`
  position: ${({ datePicker }) => (datePicker ? 'absolute' : 'relative')};
  top: ${({ datePicker, calendarPosition }) =>
    !datePicker ? 0 : calculateRem(calendarPosition)};

  @media screen and (max-width: 359px) {
    left: 50%;
    transform: translateX(-50%);
  }
`;

const IconWrapper = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  &:focus {
    outline: none;
  }
  height: ${calculateRem(44)};
  width: ${calculateRem(44)};
`;

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
  ${({ surface }) => css`
    svg {
      polygon,
      path {
        fill: ${ColorTokens.elements.primary[
          surface === 'dark' ? 'ondark' : 'onlight'
        ].value};
      }
    }
  `}
`;

const StyledCalendar = styled(ReactCalendar)`
  &.react-calendar {
    z-index: 5;
    background-color: ${({ surface, transparentBackground }) =>
      transparentBackground
        ? 'transparent'
        : surface === 'dark'
        ? ColorTokens.elements.primary.onlight.value
        : ColorTokens.elements.primary.ondark.value};
    box-sizing: content-box;
    ${({ hideContainerBorder, surface }) =>
      !hideContainerBorder &&
      `
    border: ${calculateRem(1)} solid
      ${
        surface === 'dark'
          ? ColorTokens.elements.primary.ondark.value
          : ColorTokens.elements.primary.onlight.value
      };
    `}
    position: relative;
    border-radius: ${FormControlsTokens.border.radius.value};
    padding: ${calculateRem(LayoutTokens.space['1X'].value, 0)};
    width: ${calculateRem(326)};
    min-width: ${calculateRem(318)};
    font-family: ${Fonts.VerizonNHGeTX};
    button {
      &:active,
      &:hover,
      &:visited {
        outline: none;
      }
    }
  }

  .react-calendar__month-view {
    padding: 0;
  }

  .react-calendar__month-view__weekdays {
    padding-bottom: ${null};
    justify-content: ${null};
    text-align: center;
    justify-content: center;

    .react-calendar__month-view__weekdays__weekday {
      margin: ${calculateRem(6, 6)};
      color: ${({ surface }) =>
        surface === 'dark'
          ? ColorTokens.interactive.active.ondark.value
          : ColorTokens.interactive.active.onlight.value};
      box-sizing: content-box;
      font-size: ${calculateRem(TypographyTokens.fontsize.body[12].value)};
      font-family: ${Fonts.VerizonNHGeTX};
      font-weight: ${TypographyTokens.fontweight.regular.value};
      line-height: ${calculateRem(TypographyTokens.lineheight.body[16].value)};
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: ${calculateRem(LayoutTokens.space['8X'].value)};
      height: ${calculateRem(LayoutTokens.space['8X'].value)};
    }

    abbr[title] {
      font-family: ${Fonts.VerizonNHGeTX};
      text-decoration: none;
    }
  }

  .react-calendar__navigation__label {
    border: none;
    color: ${({ surface }) =>
      surface === 'dark'
        ? ColorTokens.elements.primary.ondark.value
        : ColorTokens.elements.primary.onlight.value};
    font-size: ${calculateRem(TypographyTokens.fontsize.body[12].value)};
    font-family: ${Fonts.VerizonNHGeTX};
    font-weight: ${TypographyTokens.fontweight.bold.value};
    line-height: ${calculateRem(TypographyTokens.lineheight.body[16].value)};
    padding: 0;
    margin: ${`${calculateRem(0)} ${calculateRem(
      LayoutTokens.space['5X'].value
    )}`};
    cursor: pointer;
    outline: none;
    display: flex;
    flex: 1;
    justify-content: center;
  }

  .react-calendar__viewContainer {
    margin: ${calculateRem(
      0,
      parseInt(FormControlsTokens.space.inset.value) - 1,
      parseInt(FormControlsTokens.space.inset.value) - 1,
      parseInt(FormControlsTokens.space.inset.value) - 1
    )};
  }

  @media screen and (max-width: ${breakpoints.xs}) {
    .react-calendar__viewContainer {
      margin: ${calculateRem(
        0,
        parseInt(LayoutTokens.space['2X'].value) - 1,
        12,
        parseInt(LayoutTokens.space['2X'].value) - 1
      )};
    }
  }

  .react-calendar__navigation {
    background-color: ${({ surface, transparentBackground }) =>
      transparentBackground
        ? 'transparent'
        : surface === 'dark'
        ? ColorTokens.elements.primary.onlight.value
        : ColorTokens.elements.primary.ondark.value};
    margin: ${calculateRem(
      parseInt(LayoutTokens.space['3X'].value) - 1,
      parseInt(FormControlsTokens.space.inset.value) - 1,
      0,
      parseInt(FormControlsTokens.space.inset.value) - 1
    )};
    padding: ${calculateRem(14)};
    flex: 1;
    display: flex;
  }

  @media screen and (max-width: ${breakpoints.xs}) {
    .react-calendar__navigation {
      margin: ${calculateRem(
        parseInt(LayoutTokens.space['3X'].value) - 1,
        parseInt(LayoutTokens.space['2X'].value) - 1,
        0,
        parseInt(LayoutTokens.space['2X'].value) - 1
      )};
    }
  }

  button::-moz-focus-inner {
    border: 0;
  }

  abbr {
    position: relative;
    z-index: 1;
    text-decoration: none;
  }

  .react-calendar__navigation__next-button {
    right: ${calculateRem(parseInt(FormControlsTokens.space.inset.value) - 1)};

    &:-moz-focus-inner {
      border: 0;
    }
  }

  .react-calendar__navigation__prev-button {
    left: ${calculateRem(parseInt(FormControlsTokens.space.inset.value) - 1)};

    &:-moz-focus-inner {
      border: 0;
    }
  }

  .react-calendar__navigation__next-button[disabled] {
    visibility: hidden;
  }

  .react-calendar__navigation__prev-button[disabled] {
    visibility: hidden;
  }

  .react-calendar__navigation__arrow {
    &:focus {
      outline: none;
      &:not(:hover):not(:visited):not(:active) > ${IconWrapper} {
        &::after {
          background: transparent;
          border: ${calculateRem(1)} dashed
            ${({ surface }) =>
              surface === 'dark'
                ? ColorTokens.elements.primary.ondark.value
                : ColorTokens.elements.primary.onlight.value};
          box-sizing: border-box;
          content: '';
          height: ${calculateRem(24)};
          left: 50%;
          position: absolute;
          border-radius: ${calculateRem(
            AccessibilityTokens.focusring.space.offset.value
          )};
          top: 50%;
          transform: translate(-50%, -50%);
          width: ${calculateRem(24)};
        }
      }
    }

    &:-moz-focus-inner {
      border: 0;
    }
  }

  .react-calendar__navigation__next-button,
  .react-calendar__navigation__prev-button {
    align-items: center;
    border: 0;
    background-color: ${({ surface, transparentBackground }) =>
      transparentBackground
        ? 'transparent'
        : surface === 'dark'
        ? ColorTokens.elements.primary.onlight.value
        : ColorTokens.elements.primary.ondark.value};
    cursor: pointer;
    display: flex;
    height: ${calculateRem(44)};
    justify-content: center;
    padding: 0;
    position: absolute;
    top: ${calculateRem(14)};
    width: ${calculateRem(44)};
    z-index: 1;

    &:focus {
      outline-offset: -${calculateRem(LayoutTokens.space['2X'].value)};
    }
  }

  .react-calendar__navigation__next2-button,
  .react-calendar__navigation__prev2-button {
    display: none;
  }

  .react-calendar__year-view__months {
    display: flex;
    flex-wrap: wrap;
  }

  .react-calendar__decade-view__years {
    display: flex;
    flex-wrap: wrap;
  }

  .react-calendar__decade-view__years {
    display: flex;
    flex-wrap: wrap;
  }

  .react-calendar__century-view__decades {
    display: flex;
    flex-wrap: wrap;
  }

  /* Day tiles */
  .react-calendar__month-view__days {
    display: flex;
    flex-wrap: wrap;
  }

  .react-calendar__tile {
    background-color: ${({ surface, transparentBackground }) =>
      transparentBackground
        ? 'transparent'
        : surface === 'dark'
        ? ColorTokens.elements.primary.onlight.value
        : ColorTokens.elements.primary.ondark.value};
    border: none;
    box-sizing: content-box;
    color: ${({ disabled, surface }) =>
      disabled && surface !== 'dark'
        ? ColorTokens.interactive.disabled.onlight.value
        : disabled && surface === 'dark'
        ? ColorTokens.interactive.disabled.ondark.value
        : surface === 'dark'
        ? ColorTokens.elements.primary.ondark.value
        : ColorTokens.elements.primary.onlight.value};
    flex-basis: auto !important;
    font-size: ${calculateRem(TypographyTokens.fontsize.body[12].value)};
    font-family: ${Fonts.VerizonNHGeTX};
    font-weight: ${TypographyTokens.fontweight.regular.value};
    line-height: ${calculateRem(TypographyTokens.lineheight.body[16].value)};
    overflow: visible !important;
    padding: 0;
    position: relative;
    pointer-events: auto;

    &.react-calendar__month-view__days__day {
      height: ${calculateRem(44)};
      width: ${calculateRem(44)};
    }

    &:hover:not(.react-calendar__month-view__days__day--neighboringMonth),
    &.react-calendar__tile--active,
    &.react-calendar__tile--hover,
    &.react-calendar__tile--rangeStart,
    &.react-calendar__tile--rangeEnd,
    &.react-calendar__tile--rangeBothEnds {
      color: ${({ surface }) =>
        surface === 'dark'
          ? ColorTokens.elements.primary.onlight.value
          : ColorTokens.elements.primary.ondark.value};
      cursor: pointer;
      &::before {
        background-color: ${({ surface }) =>
          surface === 'dark'
            ? ColorTokens.elements.primary.ondark.value
            : ColorTokens.elements.primary.onlight.value};
        content: '';
        height: ${({ dateSelectionSize }) => calculateRem(dateSelectionSize)};
        left: 50%;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        width: ${({ dateSelectionSize }) => calculateRem(dateSelectionSize)};
        box-sizing: border-box;
        border-radius: ${calculateRem(LayoutTokens.space['1X'].value)};
      }
    }

    &:hover:not(.react-calendar__tile--active) {
      &:hover {
        color: ${({ surface }) =>
          surface === 'dark'
            ? ColorTokens.elements.primary.ondark.value
            : ColorTokens.elements.primary.onlight.value};
        &::before {
          background-color: ${({ surface, transparentBackground }) =>
            transparentBackground
              ? 'transparent'
              : surface === 'dark'
              ? ColorTokens.elements.primary.onlight.value
              : ColorTokens.elements.primary.ondark.value};
          border-radius: ${calculateRem(LayoutTokens.space['1X'].value)};
          box-sizing: border-box;
          border: ${({ surface }) =>
            surface === 'dark'
              ? `${calculateRem(1)} solid ${
                  ColorTokens.elements.primary.ondark.value
                }`
              : `${calculateRem(1)} solid ${
                  ColorTokens.elements.primary.onlight.value
                }`};
        }
      }
    }

    &:focus {
      background-color: ${({ surface, transparentBackground }) =>
        transparentBackground
          ? 'transparent'
          : surface === 'dark'
          ? ColorTokens.elements.primary.onlight.value
          : ColorTokens.elements.primary.ondark.value};
      outline: none;
      + svg {
        outline: none;
      }
      &:not(:hover):not(:visited):not(:active) {
        &::after {
          background: transparent;
          border: ${({ surface }) =>
            surface === 'dark'
              ? `${calculateRem(1)} dashed ${
                  ColorTokens.elements.primary.ondark.value
                }`
              : `${calculateRem(1)} dashed ${
                  ColorTokens.elements.primary.onlight.value
                }`};
          box-sizing: border-box;
          border-radius: ${calculateRem(6)};
          content: '';
          height: ${calculateRem(44)};
          left: 50%;
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          width: ${calculateRem(44)};
        }
      }
    }

    &:disabled {
      color: ${({ surface }) =>
        surface === 'dark'
          ? ColorTokens.interactive.disabled.ondark.value
          : ColorTokens.interactive.disabled.onlight.value};

      &:hover {
        background-color: ${({ surface, transparentBackground }) =>
          transparentBackground
            ? 'transparent'
            : surface === 'dark'
            ? ColorTokens.elements.primary.onlight.value
            : ColorTokens.elements.primary.ondark.value};
        color: ${({ surface }) =>
          surface === 'dark'
            ? ColorTokens.interactive.disabled.ondark.value
            : ColorTokens.interactive.disabled.onlight.value};
        cursor: default;
      }

      &:hover:not(.react-calendar__month-view__days__day--neighboringMonth),
      &.react-calendar__tile--hover,
      &.react-calendar__tile--rangeStart,
      &.react-calendar__tile--rangeEnd,
      &.react-calendar__tile--rangeBothEnds {
        color: ${({ surface }) =>
          surface === 'dark'
            ? ColorTokens.interactive.disabled.ondark.value
            : ColorTokens.interactive.disabled.onlight.value};
        &::before {
          background-color: transparent;
          border: none;
        }
      }
    }
    &.react-calendar__tile--now:not([disabled]) {
      font-weight: ${({ hideCurrentDateIndicator }) =>
        !hideCurrentDateIndicator
          ? TypographyTokens.fontweight.bold.value
          : TypographyTokens.fontweight.regular.value};
      &:hover:not(.react-calendar__tile--active):not([disabled]) {
        &:hover {
          font-weight: ${({ hideCurrentDateIndicator }) =>
            !hideCurrentDateIndicator
              ? TypographyTokens.fontweight.bold.value
              : TypographyTokens.fontweight.regular.value};
        }
      }
      &.react-calendar__tile--active:not([disabled]) {
        font-weight: ${({ hideCurrentDateIndicator }) =>
          !hideCurrentDateIndicator
            ? TypographyTokens.fontweight.bold.value
            : TypographyTokens.fontweight.regular.value};
      }
    }
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: ${ColorTokens.interactive.disabled.onlight.value};
    font-weight: ${TypographyTokens.fontweight.regular.value};
    opacity: 0;
    pointer-events: none;
  }

  @media screen and (max-width: 359px) {
    &.react-calendar {
      padding: ${calculateRem(LayoutTokens.space['1X'].value, 0)};
      width: ${({ customWidth }) =>
        customWidth ? calculateRem(customWidth) : calculateRem(318)};
      min-width: ${({ customWidth }) =>
        customWidth ? calculateRem(customWidth) : calculateRem(318)};
    }
  }
  .react-calendar__navigation button[disabled] {
    background-color: ${({ surface, transparentBackground }) =>
      transparentBackground
        ? 'transparent'
        : surface === 'dark'
        ? ColorTokens.elements.primary.onlight.value
        : ColorTokens.elements.primary.ondark.value};
  }
`;

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: this._getDate(),
      nextHovered: false,
      prevHovered: false,
      calendarPosition: undefined,
    };
  }

  _toggleNextHoverOn = () => this.setState({ nextHovered: true });
  _toggleNextHoverOff = () => this.setState({ nextHovered: false });

  _togglePrevHoverOn = () => this.setState({ prevHovered: true });
  _togglePrevHoverOff = () => this.setState({ prevHovered: false });

  componentDidMount() {
    this._setAttributes();
    this.calendarPos();
  }

  calendarPos = () => {
    const labelCalendar =
      typeof document !== undefined &&
      document.getElementById(this.props.inputId + '-label');
    this.setState({
      calendarPosition: labelCalendar && labelCalendar.clientHeight + 52,
    });
  };
  componentDidUpdate(prevProps) {
    if (prevProps && prevProps.selectedDate !== this.props.selectedDate) {
      this.setState({ selectedDate: this.props.selectedDate });
    }
    this._setAttributes();
    typeof window !== 'undefined' &&
      window.addEventListener('resize', this.calendarPos);
  }
  componentWillUnmount() {
    typeof window !== 'undefined' &&
      window.removeEventListener('resize', this.calendarPos);
  }

  _setAttributes = () => {
    this.monthLabel =
      typeof document !== 'undefined'
        ? document.getElementsByClassName('react-calendar__navigation__label')
        : null;
    this.allButtons =
      typeof document !== 'undefined'
        ? document.getElementsByClassName('react-calendar__tile')
        : null;
    this.selectedButton =
      typeof document !== 'undefined'
        ? document.getElementsByClassName('react-calendar__tile--active')
        : null;

    // Converts HTMLCollection to Array, and sets attribute on each
    [].slice.call(this.allButtons).forEach(day => {
      let abbr = day.querySelectorAll('abbr')[0];
      let ariaLabelDate = abbr.getAttribute('aria-label');
      if (day === this.selectedButton[0]) {
        abbr.setAttribute('aria-live', 'assertive');
        if (!ariaLabelDate.includes('selected')) {
          abbr.setAttribute('aria-label', `${ariaLabelDate} selected`);
        }
      } else {
        ariaLabelDate = ariaLabelDate.split(' selected')[0];
        abbr.removeAttribute('aria-live');
        abbr.setAttribute('aria-label', ariaLabelDate);
      }
    });
  };

  /* If inactive dates include the current day, select the next day available */
  _findNextDay = (currentDate, inactiveDates) => {
    const { parse } = Date;
    let isThere = false;
    inactiveDates &&
      inactiveDates.map(date => {
        let parsedDate =
          typeof date === 'string' ? new Date(parse(date)) : date;
        if (parse(parsedDate) === parse(currentDate)) {
          isThere = true;
        }
      });
    if (isThere) {
      const tomorrow = new Date(currentDate);
      tomorrow.setDate(currentDate.getDate() + 1);
      return this._findNextDay(tomorrow, inactiveDates);
    } else {
      return currentDate;
    }
  };

  /* If active dates do not include current day, set selected day to earliest active day */
  _findEarliestDay = (currentDate, activeDates) => {
    const { parse } = Date;
    let currentDateExists = false;
    let minDate = new Date(8640000000000000); //largest date possible
    activeDates &&
      activeDates.map(date => {
        let parsedDate =
          typeof date === 'string' ? new Date(parse(date)) : date;
        if (parse(parsedDate) === parse(currentDate)) {
          minDate = parsedDate;
          currentDateExists = true;
        } else if (parse(parsedDate) < parse(minDate) && !currentDateExists) {
          minDate = parsedDate;
        }
      });
    return minDate;
  };

  _getDate = () => {
    const { error, selectedDate, inactiveDates, activeDates } = this.props;
    const { parse } = Date;
    if (error) return null;
    if (selectedDate === null) return null;
    let currentDate;
    let emptyInactive;
    let emptyActive;
    // Checks selectedDate has the value in type of Date instance, string or no value is passed
    // Checking type true because on docsite, as user types selectedDate, it's being recognized as a boolean
    if (
      selectedDate === true ||
      selectedDate === undefined ||
      selectedDate === ''
    ) {
      currentDate = new Date();
    } else {
      currentDate = selectedDate;
    }
    currentDate =
      typeof currentDate === 'string'
        ? new Date(parse(currentDate))
        : currentDate;
    if (inactiveDates) {
      emptyInactive = inactiveDates === true ? '' : inactiveDates; // checks inactiveDates has correct value or no values are passed
      currentDate.setHours(0, 0, 0, 0);
      return this._findNextDay(currentDate, emptyInactive);
    } else if (activeDates) {
      emptyActive = activeDates === true ? '' : activeDates; // checks activeDates has correct value or no values are passed
      currentDate.setHours(0, 0, 0, 0);
      return this._findEarliestDay(currentDate, emptyActive);
    } else {
      return currentDate;
    }
  };

  _onChange = selectedDate => {
    this.setState({ selectedDate });
    if (typeof this.props.onChange !== 'undefined')
      this.props.onChange(selectedDate);
  };

  _onClickDay = (value, event) => {
    event.screenX !== 0 && event.screenY !== 0 && event.currentTarget.blur(); // remove focus state on click
  };
  /**
   * Toggle dates passed on inactiveDates or activeDates.
   * return callback to be used by tileDisable prop
   */
  _toggleDates = () => {
    let dates, active;
    const { inactiveDates, activeDates } = this.props;
    // add inactiveDates or activeDates to dates
    // when disable set active to true otherwise false.
    if (inactiveDates && inactiveDates.length) {
      dates = inactiveDates;
      active = true;
    } else if (activeDates && activeDates.length) {
      dates = activeDates;
      active = false;
    } else {
      return null;
    }

    return ({ date }) => {
      const isInactive = dates.filter(inactiveDate => {
        const toggleDate = new Date(inactiveDate);
        toggleDate.setHours(0, 0, 0, 0);

        return date.getTime() === toggleDate.getTime();
      });

      return isInactive.length ? active : !active;
    };
  };

  isMobileDevice = checkIfMobileDevice();

  _renderNextLabel = (onClickNext, nextButtonDisabled) => {
    const { surface } = this.props;
    return (
      <IconWrapper tabIndex={-1}>
        <ButtonIcon
          kind="ghost"
          size="40px"
          surface={surface}
          onClick={onClickNext}
          iconOffset={{ x: 2, y: 0 }}
          ariaLabel="view next month"
          disabled={nextButtonDisabled && nextButtonDisabled}
          renderIcon={props => <RightCaret {...props} size={16} />}
        />
      </IconWrapper>
    );
  };

  _renderPrevLabel = (onClickPrevious, prevButtonDisabled) => {
    const { surface } = this.props;
    return (
      <IconWrapper tabIndex={-1}>
        <ButtonIcon
          kind="ghost"
          size="40px"
          surface={surface}
          onClick={onClickPrevious}
          iconOffset={{ x: -2, y: 0 }}
          ariaLabel="view previous month"
          disabled={prevButtonDisabled && prevButtonDisabled}
          renderIcon={props => <LeftCaret {...props} size={16} />}
        />
      </IconWrapper>
    );
  };

  render() {
    const {
      disabled,
      minDate,
      maxDate,
      surface,
      hideCurrentDateIndicator,
      dateSelectionSize,
      indicators,
      transparentBackground,
    } = this.props;
    const { selectedDate } = this.state;

    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    indicators && indicators.splice(3);
    return (
      <>
        {this.props.isOpen && (
          <CalendarWrapper
            isOpen={this.props.isOpen}
            alwaysOpen={this.props.alwaysOpen}
            datePicker={this.props.datePicker}
            calendarPosition={this.state.calendarPosition}
          >
            <StyledCalendar
              {...this.props}
              transparentBackground={transparentBackground}
              minDetail="month"
              maxDetail="month"
              disabled={disabled}
              showNeighboringMonth={false}
              isOpen={this.props.isOpen}
              customWidth={this.props.width}
              calendarType="US"
              formatLongDate={(locale, date) =>
                date.toLocaleDateString('en', options)
              }
              formatShortWeekday={(locale, date) =>
                ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()]
              }
              tabIndex={0}
              nextAriaLabel={'view next month'}
              onNextMouseEnter={this._toggleNextHoverOn}
              onNextMouseLeave={this._toggleNextHoverOff}
              nextLabel={this._renderNextLabel}
              onChange={this._onChange}
              prevAriaLabel={'view previous month'}
              onPrevMouseEnter={this._togglePrevHoverOn}
              onPrevMouseLeave={this._togglePrevHoverOff}
              prevLabel={this._renderPrevLabel}
              value={selectedDate}
              minDate={minDate}
              maxDate={maxDate}
              tileDisabled={this._toggleDates()}
              onClickDay={this._onClickDay}
              surface={surface}
              hideCurrentDateIndicator={hideCurrentDateIndicator}
              dateSelectionSize={dateSelectionSize}
              indicators={indicators}
            />
          </CalendarWrapper>
        )}
      </>
    );
  }
}

Calendar.propTypes = propTypes;
Calendar.defaultProps = defaultProps;

export default Calendar;
