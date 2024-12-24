import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Calendar } from '.';
import { Calendar as ReactCalendar } from './components/ReactCalendar/Calendar';
import { ColorTokens } from '@vds-tokens/color';

const date = new Date('December 17, 1995 03:24:00');
const updatedDate = new Date('December 18, 1995 03:24:00');
const newDate = new Date('May 1, 2022 03:25:00');
const onChange = () => {};

describe('<Calendar />', () => {
  test('should render Calendar and check styles', () => {
    const { container } = render(
      <Calendar activeStartDate={date} selectedDate={date} isOpen />
    );
    const calendarStyle = getComputedStyle(
      container.querySelector('.react-calendar')
    );
    const tileClassName =
      '.react-calendar__tile.react-calendar__month-view__days__day:not(.react-calendar__month-view__days__day--neighboringMonth)';
    const days = container.querySelectorAll(tileClassName);
    const lastDayOfMonth = days[days.length - 1];
    fireEvent.click(days[5]);
    // 31 days in December 1995
    expect(days.length).toBe(31);
    // Calendar is 278px wide
    expect(calendarStyle.width).toBe('20.375rem');
    expect(calendarStyle.background).toBe('rgb(255, 255, 255)');
    expect(calendarStyle.borderRadius).toBe('4px');
    expect(calendarStyle.border).toBe('0.0625rem solid #000000');
    // Select on lastDayOfMonth Day and check if state is set
    expect(
      lastDayOfMonth.classList.contains('react-calendar__tile--active')
    ).toBeFalsy();
    fireEvent.click(lastDayOfMonth);
    fireEvent.click(container.firstChild);
    expect(container.firstChild).toMatchSnapshot();

    const calendarDate = container.querySelector('.react-calendar__tile');
    const calendarDateStyles = window.getComputedStyle(calendarDate)._values;

    if (calendarDateStyles) {
      expect(calendarDateStyles['height']).toBe('2.75rem');
      expect(calendarDateStyles['width']).toBe('2.75rem');
      expect(calendarDateStyles['color']).toBe('rgb(216, 218, 218)');
      expect(calendarDateStyles['font-size']).toBe('0.75rem');
      expect(calendarDateStyles['line-height']).toBe('1rem');
      expect(calendarDateStyles['background-color']).toBe('rgb(255, 255, 255)');

      const caretIconStyleLeft = container.querySelector(
        '[class^="StyledSVG-VDS"][aria-label="left-caret icon"]'
      );
      const pathValueleft = container
        .querySelector(
          '[class^="StyledSVG-VDS"][aria-label="left-caret icon"] polygon'
        )
        .getAttribute('points');
      // expect(caretIconStyleLeft).toHaveStyleRule('width', '0.417rem');
      // expect(caretIconStyleLeft).toHaveStyleRule('width', '0,833rem');
      expect(caretIconStyleLeft).toHaveStyleRule('width', '1rem');
      expect(caretIconStyleLeft).toHaveStyleRule('width', '1rem');
      expect(pathValueleft).toBe(
        '14.89 19.8 5.89 10.799 14.89 1.8 15.71 2.619 7.53 10.799 15.71 18.981 14.89 19.8'
      );
      const caretIconStyleRight = container.querySelector(
        '[class^="StyledSVG-VDS"][aria-label="right-caret icon"]'
      );
      const pathValueright = container
        .querySelector(
          '[class^="StyledSVG-VDS"][aria-label="right-caret icon"] polygon'
        )
        .getAttribute('points');
      // expect(caretIconStyleRight).toHaveStyleRule('width', '0.417rem');
      // expect(caretIconStyleRight).toHaveStyleRule('width', '0,833rem');
      expect(caretIconStyleRight).toHaveStyleRule('width', '1rem');
      expect(caretIconStyleRight).toHaveStyleRule('width', '1rem');
      expect(pathValueright).toBe(
        '6.71 19.8 5.89 18.981 14.07 10.799 5.89 2.619 6.71 1.8 15.71 10.799 6.71 19.8'
      );

      const fillcolor = container.querySelector(
        '[class^="StyledSVG-VDS"][aria-label="left-caret icon"] polygon'
      );
      const stylefill = window.getComputedStyle(fillcolor)._values;
      expect(stylefill['fill']).toBe('#d8dada');

      const fillcolor1 = container.querySelector(
        '[class^="StyledSVG-VDS"][aria-label="right-caret icon"]'
      );

      expect(fillcolor1).toHaveAttribute('fill', '#000000');

      const navLabel = container.querySelector(
        '.react-calendar__navigation__label'
      );
      const navStyles = window.getComputedStyle(navLabel)._values;
      expect(navStyles['color']).toBe('rgb(0, 0, 0)');
      expect(navStyles['font-size']).toBe('0.75rem');
      expect(navStyles['font-family']).toBe('Verizon-NHG-eTX');
      expect(navStyles['font-weight']).toBe('700');
      expect(navStyles['line-height']).toBe('1rem');

      const weekdays = container.querySelector(
        '.react-calendar__month-view__weekdays__weekday'
      );
      const weekdaysSstyle = window.getComputedStyle(weekdays)._values;
      expect(weekdaysSstyle['color']).toBe('rgb(111, 113, 113)');
      expect(weekdaysSstyle['font-family']).toBe('Verizon-NHG-eTX');
      expect(weekdaysSstyle['font-weight']).toBe('400');
      expect(weekdaysSstyle['font-size']).toBe('0.75rem');
      expect(weekdaysSstyle['line-height']).toBe('1rem');
    }
  });

  test('should render Calendar inverted', () => {
    const { container } = render(
      <Calendar
        activeStartDate={date}
        selectedDate={date}
        surface="dark"
        isOpen
      />
    );

    const calendarStyle = getComputedStyle(
      container.querySelector('.react-calendar')
    );
    expect(calendarStyle.width).toBe('20.375rem');
    expect(calendarStyle.background).toBe('rgb(0, 0, 0)');
    expect(calendarStyle.borderRadius).toBe('4px');
    expect(calendarStyle.border).toBe('0.0625rem solid #ffffff');

    const calendarDate = container.querySelector('.react-calendar__tile');
    const calendarDateStyles = window.getComputedStyle(calendarDate)._values;
    if (calendarDateStyles) {
      expect(calendarDateStyles['height']).toBe('2.75rem');
      expect(calendarDateStyles['width']).toBe('2.75rem');
      expect(calendarDateStyles['color']).toBe('rgb(51, 51, 51)');
      expect(calendarDateStyles['font-size']).toBe('0.75rem');
      expect(calendarDateStyles['line-height']).toBe('1rem');
      expect(calendarDateStyles['background-color']).toBe('rgb(0, 0, 0)');

      const caretIconStyleLeft = container.querySelector(
        '[class^="StyledSVG-VDS"][aria-label="left-caret icon"]'
      );
      const pathValueleft = container
        .querySelector(
          '[class^="StyledSVG-VDS"][aria-label="left-caret icon"] polygon'
        )
        .getAttribute('points');
      // expect(caretIconStyleLeft).toHaveStyleRule('width', '0.417rem');
      // expect(caretIconStyleLeft).toHaveStyleRule('width', '0,833rem');
      expect(caretIconStyleLeft).toHaveStyleRule('width', '1rem');
      expect(caretIconStyleLeft).toHaveStyleRule('width', '1rem');
      expect(pathValueleft).toBe(
        '14.89 19.8 5.89 10.799 14.89 1.8 15.71 2.619 7.53 10.799 15.71 18.981 14.89 19.8'
      );
      const caretIconStyleRight = container.querySelector(
        '[class^="StyledSVG-VDS"][aria-label="right-caret icon"]'
      );
      const pathValueright = container
        .querySelector(
          '[class^="StyledSVG-VDS"][aria-label="right-caret icon"] polygon'
        )
        .getAttribute('points');
      // expect(caretIconStyleRight).toHaveStyleRule('width', '0.417rem');
      // expect(caretIconStyleRight).toHaveStyleRule('width', '0,833rem');
      expect(caretIconStyleRight).toHaveStyleRule('width', '1rem');
      expect(caretIconStyleRight).toHaveStyleRule('width', '1rem');
      expect(pathValueright).toBe(
        '6.71 19.8 5.89 18.981 14.07 10.799 5.89 2.619 6.71 1.8 15.71 10.799 6.71 19.8'
      );

      const fillcolor = container.querySelector(
        '[class^="StyledSVG-VDS"][aria-label="left-caret icon"] polygon'
      );
      const stylefill = window.getComputedStyle(fillcolor)._values;
      expect(stylefill['fill']).toBe('#333333');

      const fillcolor1 = container.querySelector(
        '[class^="StyledSVG-VDS"][aria-label="right-caret icon"]'
      );

      expect(fillcolor1).toHaveAttribute('fill', '#ffffff');

      const navLabel = container.querySelector(
        '.react-calendar__navigation__label'
      );
      const navStyles = window.getComputedStyle(navLabel)._values;
      expect(navStyles['color']).toBe('rgb(255, 255, 255)');
      expect(navStyles['font-size']).toBe('0.75rem');
      expect(navStyles['font-family']).toBe('Verizon-NHG-eTX');
      expect(navStyles['font-weight']).toBe('700');
      expect(navStyles['line-height']).toBe('1rem');

      const weekdays = container.querySelector(
        '.react-calendar__month-view__weekdays__weekday'
      );
      const weekdaysSstyle = window.getComputedStyle(weekdays)._values;
      expect(weekdaysSstyle['color']).toBe('rgb(167, 167, 167)');
      expect(weekdaysSstyle['font-family']).toBe('Verizon-NHG-eTX');
      expect(weekdaysSstyle['font-weight']).toBe('400');
      expect(weekdaysSstyle['font-size']).toBe('0.75rem');
      expect(weekdaysSstyle['line-height']).toBe('1rem');

      // const currentDateSelected = container.querySelector(".react-calendar__tile--now");
      // const currentDateSelectedstyle =  window.getComputedStyle(currentDateSelected).getPropertyValue('color');
      // expect(currentDateSelectedstyle['color']).toBe('rgb(0, 119, 180)');
      // expect(container.firstChild).toMatchSnapshot();
    }
    expect(container).toMatchSnapshot();
  });

  test('indicators calendar', () => {
    const { container } = render(
      <Calendar
        minDate={newDate}
        selectedDate={newDate}
        indicators={[{ label: 'Due Date', date: new Date('06/06/2022') }]}
        isOpen
      />
    );
    const legenVds = container.querySelector('[class^="Legend-VDS"]');
    const type1style = window.getComputedStyle(legenVds)._values;
    expect(type1style['font-size']).toBe('0.75rem');
    expect(type1style['color']).toBe('rgb(0, 0, 0)');
    expect(type1style['font-family']).toBe('Verizon-NHG-eTX');
    expect(type1style['font-weight']).toBe('400');
    expect(container).toMatchSnapshot();
  });

  test('componentDidMount', () => {
    const { rerender } = render(<Calendar selectedDate={newDate} isOpen />);
    rerender(<Calendar selectedDate={updatedDate} isOpen />);
    expect(rerender).toMatchSnapshot();
  });

  test('should render Calendar selectedDate', () => {
    const { container } = render(
      <Calendar activeStartDate={newDate} selectedDate={newDate} isOpen />
    );
    const tileClassName =
      '.react-calendar__tile.react-calendar__month-view__days__day:not(.react-calendar__month-view__days__day--neighboringMonth)';
    const days = container.querySelectorAll(tileClassName);
    const currentDate = days[0];
    expect(
      currentDate.classList.contains('react-calendar__tile--active')
    ).toBeTruthy();

    // const currentDateSelected = container.querySelector(".react-calendar__tile--now:not([disabled])");
    // const currentDateSelectedstyle =  window.getComputedStyle(currentDateSelected).getPropertyValue('color');
    // expect(currentDateSelectedstyle['color']).toBe('rgb(0, 119, 180)');
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render Calendar selectedDate null', () => {
    const { container } = render(<Calendar selectedDate={null} isOpen />);
    const tileClassName =
      '.react-calendar__tile.react-calendar__month-view__days__day:not(.react-calendar__month-view__days__day--neighboringMonth)';
    const days = container.querySelectorAll(tileClassName);
    const currentDate = days[0];
    expect(
      currentDate.classList.contains('react-calendar__tile--active')
    ).toBeFalsy();
  });

  test('should render Calendar selectedDate with inactiveDates', () => {
    const { container } = render(
      <Calendar
        activeStartDate={newDate}
        selectedDate={newDate}
        inactiveDates={['5/1/2022']}
        isOpen
      />
    );
    const tileClassName =
      '.react-calendar__tile.react-calendar__month-view__days__day:not(.react-calendar__month-view__days__day--neighboringMonth)';
    const days = container.querySelectorAll(tileClassName);
    const disabledDate = container.querySelector(
      '.react-calendar__tile[aria-hidden="true"]'
    );
    const disabledDateStyle = window.getComputedStyle(disabledDate)._values;
    expect(disabledDateStyle['color']).toBe('rgb(216, 218, 218)');
    const nextDay = days[1];
    expect(
      nextDay.classList.contains('react-calendar__tile--active')
    ).toBeTruthy();
  });

  test('should render Calendar selectedDate with inactiveDates inverted', () => {
    const { container } = render(
      <Calendar
        activeStartDate={newDate}
        selectedDate={newDate}
        inactiveDates={['5/1/2022']}
        surface="dark"
        isOpen
      />
    );
    const tileClassName =
      '.react-calendar__tile.react-calendar__month-view__days__day:not(.react-calendar__month-view__days__day--neighboringMonth)';
    const days = container.querySelectorAll(tileClassName);
    const disabledDate = container.querySelector(
      '.react-calendar__tile[aria-hidden="true"]'
    );
    const disabledDateStyle = window.getComputedStyle(disabledDate)._values;
    expect(disabledDateStyle['color']).toBe('rgb(51, 51, 51)');
    const nextDay = days[1];
    expect(
      nextDay.classList.contains('react-calendar__tile--active')
    ).toBeTruthy();
  });

  test('should render Calendar with error', () => {
    const { container } = render(
      <Calendar activeStartDate={date} selectedDate={date} error isOpen />
    );
    expect(container).toMatchSnapshot();
  });

  test('should render Calendar without props', () => {
    const { container } = render(<Calendar isOpen />);
    const calendar = container.querySelector('.react-calendar');
    expect(calendar).toBeTruthy();
  });

  test('should render Calendar props', () => {
    const { container } = render(
      <Calendar
        selectedDate={date}
        maxDate={new Date(1995, 12, 30)}
        minDate={new Date(1990, 10, 30)}
        inactiveDates={['12/21/1995', '12/24/1995', '12/28/1995']}
        width={320}
        onChange={onChange}
        isOpen
      />
    );
    const calendarStyle = getComputedStyle(
      container.querySelector('.react-calendar')
    );
    const disabledDate = container.querySelector(
      '.react-calendar__tile[aria-hidden="true"]'
    );
    const disabledDateStyle = window.getComputedStyle(disabledDate)._values;
    expect(disabledDateStyle['color']).toBe('rgb(216, 218, 218)');
    expect(calendarStyle.width).toBe('20.375rem');
    expect(container).toMatchSnapshot();
  });

  test('should render Calendar props inverted', () => {
    const { container } = render(
      <Calendar
        selectedDate={date}
        surface="dark"
        maxDate={new Date(1995, 12, 30)}
        minDate={new Date(1990, 10, 30)}
        inactiveDates={['12/21/1995', '12/24/1995', '12/28/1995']}
        onChange={onChange}
        isOpen
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('should render Calendar with activedates', () => {
    const { container } = render(
      <Calendar
        minDate={date}
        selectedDate={date}
        activeDates={['12/17/1995', '12/24/1995', '12/28/1995']}
        isOpen
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('should render Calendar activedates beyond current dates', () => {
    const { container } = render(
      <Calendar
        activeDates={['04/19/2052', '04/20/2052', '04/21/2052']}
        isOpen
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('should render Calendar with activedates inverted', () => {
    const { container } = render(
      <Calendar
        minDate={date}
        selectedDate={date}
        surface="dark"
        activeDates={['12/17/1995', '12/24/1995', '12/28/1995']}
        isOpen
      />
    );
    expect(container).toMatchSnapshot();
  });
  test('should render Calendar with multiple value ', () => {
    const { container } = render(
      <Calendar
        activeStartDate={date}
        surface="dark"
        value={['12/17/1995', '12/24/1995', '12/28/1995']}
        isOpen
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('should render Calendar with datePicker', () => {
    const { container } = render(
      <Calendar minDate={date} selectedDate={date} datePicker isOpen />
    );
    expect(container).toMatchSnapshot();
  });

  test('should render Calendar inverted & disabled', () => {
    const { container } = render(
      <Calendar
        selectedDate={date}
        surface="dark"
        inactiveDates={['12/21/1995', '12/24/1995', '12/28/1995']}
        isOpen
        hideCurrentDateIndicator
      /> // HidecurrentDateIndicator must be true otherwise running tests on the 15th of each month will fail
    );
    const lightColor = ColorTokens.interactive.disabled.ondark.value;
    const tileClassName = container.querySelector(
      '.react-calendar__tile[aria-hidden="true"]'
    );
    const currentDate = window.getComputedStyle(tileClassName)._values;
    expect(currentDate['color']).toBe('rgb(51, 51, 51)');
  });

  test('should render Calendar disabled and not inverted', () => {
    const { container } = render(
      <Calendar
        selectedDate={date}
        inactiveDates={['12/21/1995', '12/24/1995', '12/28/1995']}
        isOpen
        hideCurrentDateIndicator
      />
    ); // HidecurrentDateIndicator must be true otherwise running tests on the 15th of each month will fail
    const lightColor = ColorTokens.interactive.disabled.onlight.value;
    const tileClassName = container.querySelector(
      '.react-calendar__tile[aria-hidden="true"]'
    );
    const currentDate = window.getComputedStyle(tileClassName)._values;
    expect(currentDate['color']).toBe('rgb(216, 218, 218)');
  });

  test('check the next and prev months button states', () => {
    const { container } = render(
      <Calendar
        minDate={new Date(1995, 12, 30)}
        maxDate={new Date(2024, 10, 30)}
        isOpen
      />
    );
    const nextButton = container.querySelector(
      '.react-calendar__navigation__next-button'
    );
    const prevButton = container.querySelector(
      '.react-calendar__navigation__prev-button'
    );
    fireEvent.mouseOver(nextButton);
    expect(
      nextButton.firstChild.firstChild.hasChildNodes(
        '<path d="M7.6,20.7L5,18.1l7.3-7.3L5,3.5l2.5-2.5l9.9,9.9L7.6,20.7z" stroke="none" fill="#000000"></path>'
      )
    ).toBeTruthy();

    fireEvent.mouseOut(nextButton);
    expect(
      nextButton.firstChild.firstChild.hasChildNodes(
        '<polygon points="6.71 19.8 5.89 18.981 14.07 10.799 5.89 2.619 6.71 1.8 15.71 10.799 6.71 19.8" stroke="none" fill="#000000"></polygon>'
      )
    ).toBeTruthy();
    fireEvent.mouseOver(prevButton);
    expect(
      prevButton.firstChild.firstChild.hasChildNodes(
        '<path d="M14.1,20.7l-9.9-9.9l9.9-9.9l2.5,2.5l-7.3,7.3l7.3,7.3L14.1,20.7z" stroke="none" fill="#000000"></path>'
      )
    ).toBeTruthy();
    fireEvent.mouseOut(prevButton);
    expect(
      prevButton.firstChild.firstChild.hasChildNodes(
        '<polygon points="14.89 19.8 5.89 10.799 14.89 1.8 15.71 2.619 7.53 10.799 15.71 18.981 14.89 19.8" stroke="none" fill="#000000"></polygon>'
      )
    ).toBeTruthy();
  });

  test('test navigation functions on previous and next click', () => {
    const { rerender, container } = render(
      <Calendar
        activeStartDate={date}
        minDate={date}
        maxDate={newDate}
        isOpen
      />
    );
    const nextButton = container.querySelector(
      '.react-calendar__navigation__next-button'
    ).firstChild.firstChild.firstChild;
    const prevButton = container.querySelector(
      '.react-calendar__navigation__prev-button'
    ).firstChild.firstChild.firstChild;
    const next2Button = container.querySelector(
      '.react-calendar__navigation__next2-button'
    );
    const prev2Button = container.querySelector(
      '.react-calendar__navigation__prev2-button'
    );

    fireEvent.click(nextButton);
    expect(prevButton).toBeDisabled();

    rerender(
      <ReactCalendar
        activeStartDate={new Date('January 1, 1996 03:24:00')}
        isOpen
      />
    );

    fireEvent.click(prevButton);
    rerender(
      <ReactCalendar
        activeStartDate={new Date('November 1, 1995 03:24:00')}
        isOpen
      />
    );

    //fireEvent.click(next2Button);
    //fireEvent.click(prev2Button);
  });
});

/**
 * Test suite to run all possible test cases for React Calendar
 */
describe('<ReactCalendar />', () => {
  test('uses given value when passed value using value prop', () => {
    const { container } = render(
      <ReactCalendar value={new Date(2019, 0, 1)} isOpen />
    );

    expect(container).toMatchSnapshot();
  });

  test('renders given view when passed month using view prop', () => {
    const { container } = render(<ReactCalendar view="month" isOpen />);
    const monthClass = container.querySelector('.react-calendar__month-view');

    expect(monthClass).toBeTruthy();
  });

  test('test showWeeknumbers and showFixedNumberOfWeeks', () => {
    const { container } = render(
      <ReactCalendar
        value={new Date(2019, 0, 1)}
        view="month"
        showWeekNumbers={true}
        showFixedNumberOfWeeks={true}
        isOpen
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('test showWeeknumbers and showFixedNumberOfWeeks as false', () => {
    const { container } = render(
      <ReactCalendar
        value={new Date(2019, 0, 1)}
        view="month"
        showWeekNumbers={true}
        showFixedNumberOfWeeks={false}
        isOpen
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('renders given view when passed Year using view prop', () => {
    const { container } = render(<ReactCalendar view="year" isOpen />);
    const yearClass = container.querySelector('.react-calendar__year-view');

    expect(yearClass).toBeTruthy();
  });

  test('renders given view when passed Century using view prop', () => {
    const { container } = render(<ReactCalendar view="century" isOpen />);
    const centuryClass = container.querySelector(
      '.react-calendar__century-view'
    );

    expect(centuryClass).toBeTruthy();
  });

  test('renders given view when passed decade using view prop', () => {
    const { container } = render(<ReactCalendar view="decade" isOpen />);
    const decadeClass = container.querySelector('.react-calendar__decade-view');
    expect(decadeClass).toBeTruthy();
  });

  test('check on activeStartDateChange', () => {
    const { container } = render(
      <ReactCalendar
        view="month"
        activeStartDate={date}
        onActiveStartDateChange={onChange}
        isOpen
      />
    );

    expect(container).toMatchSnapshot();
  });

  test('check calendar week start with calendar type', () => {
    const { container } = render(
      <ReactCalendar
        activeStartDate={date}
        minDate={date}
        maxDate={newDate}
        minDetail="month"
        maxDetail="month"
        calendarType={'US'}
        isOpen
      />
    );

    const weekNav = container.querySelector(
      '.react-calendar__month-view__weekdays'
    );

    expect(
      weekNav.firstChild.hasChildNodes(
        '<abbr aria-label="Sunday" title="Sunday">S</abbr>'
      )
    ).toBeTruthy();

    const navTitle = container.querySelector('.react-calendar__navigation');
    const navButton = navTitle.querySelector(
      'button.react-calendar__navigation__label'
    );
    expect(navButton.firstChild.textContent).toContain('December 1995');
  });

  test('test react calendar view change case : Year', () => {
    const { container } = render(<ReactCalendar view="year" isOpen />);
    const getAllMonthsTile = container.querySelectorAll(
      '.react-calendar__year-view__months__month'
    );
    const monthTile = getAllMonthsTile[0];
    fireEvent.click(monthTile);
  });

  test('test react calendar view change case : century', () => {
    const { container } = render(<ReactCalendar view="century" isOpen />);
    const getAllDecadesTile = container.querySelectorAll(
      '.react-calendar__century-view__decades__decade'
    );
    const decadeTile = getAllDecadesTile[0];
    fireEvent.click(decadeTile);
  });

  test('test react calendar view change case : decade', () => {
    const { container } = render(<ReactCalendar view="decade" isOpen />);
    const getAllYearTile = container.querySelectorAll(
      '.react-calendar__decade-view__years__year'
    );
    const yearTile = getAllYearTile[0];
    fireEvent.click(yearTile);
  });

  test('test react calendar onClickWeekNumber', () => {
    const { container } = render(
      <ReactCalendar
        view="month"
        showWeekNumbers={true}
        onClickWeekNumber={onChange}
        minDate={date}
        maxDate={newDate}
        isOpen
      />
    );
    const getMonthDom = container.querySelector('.react-calendar__month-view');
    const weekDom = getMonthDom.firstChild.firstChild.firstChild.firstChild;
    fireEvent.click(weekDom);
  });

  test('test raw date to throw error', () => {
    expect(() =>
      render(
        <ReactCalendar
          value={'December 2022'}
          minDate={date}
          maxDate={newDate}
          isOpen
        />
      )
    ).toThrow('Failed to get year from date: December 2022.');
  });

  test('test raw date to throw range error', () => {
    expect(() =>
      render(
        <ReactCalendar
          minDate={date}
          maxDate={newDate}
          minDetail={['month']}
          maxDetail={['year', 'month']}
          isOpen
        />
      )
    ).toThrow('Invalid rangeType: year,month');
  });

  test('test raw date to throw Invalid Date error', () => {
    expect(() =>
      render(
        <ReactCalendar
          selectRange={true}
          minDate={date}
          maxDate={newDate}
          value={new Date(2017, 0, 1) + '-' + new Date(2017, 7, 1)}
          isOpen
        />
      )
    ).toThrow('Invalid date: ');
  });

  test('test mouse over and onfocus event on tile', () => {
    const { container } = render(
      <ReactCalendar
        minDate={date}
        maxDate={newDate}
        value={date}
        selectRange={true}
        isOpen
      />
    );

    const activeTiles = container.querySelectorAll('.react-calendar__tile');
    const singleTile = activeTiles[1];
    fireEvent.mouseEnter(singleTile);
    fireEvent.focus(singleTile);
    fireEvent.click(singleTile);
  });

  test('test for get Processed Value', () => {
    const { container } = render(
      <ReactCalendar
        minDate={date}
        maxDate={newDate}
        returnValue={'end'}
        value={new Date(2017, 0, 1)}
        isOpen
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('test react calendar navigation label', () => {
    const labelFunction = ({ date, label, locale, view }) =>
      `Current view: ${view}, date: ${date.toLocaleDateString(locale)}`;

    const { container } = render(
      <ReactCalendar
        minDate={date}
        maxDate={newDate}
        navigationLabel={labelFunction}
        isOpen
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('test tileClassName and tileContent onChange ', () => {
    //const tileFunction = ({ activeStartDate = new Date(2017, 0, 1) , date, view }) => view === 'month' && date.getDay() === 3 ? 'wednesday' : null

    const { rerender, container } = render(
      <ReactCalendar
        minDate={date}
        maxDate={newDate}
        activeStartDate={new Date(2017, 0, 1)}
        tileClassName={['class1', 'class2']}
        isOpen
      />
    );
    const tileClass =
      '.react-calendar__tile.react-calendar__month-view__days__day:not(.react-calendar__month-view__days__day--neighboringMonth)';

    const tilesActive = container.querySelectorAll(tileClass);
    fireEvent.click(tilesActive[0]);

    rerender(
      <ReactCalendar
        minDate={date}
        maxDate={newDate}
        activeStartDate={new Date(2017, 7, 1)}
        isOpen
      />
    );
  });

  test('test to check selectrange prop', () => {
    const { container } = render(
      <ReactCalendar
        minDate={date}
        maxDate={newDate}
        activeStartDate={new Date(2017, 0, 1)}
        selectRange={true}
        returnValue={'end'}
        view="month"
        isOpen
      />
    );
    const tileClass =
      '.react-calendar__tile.react-calendar__month-view__days__day:not(.react-calendar__month-view__days__day--neighboringMonth)';
    const tilesActive = container.querySelectorAll(tileClass);
    fireEvent.click(tilesActive[2]);
    //fireEvent.click(tilesActive[5]);

    //expect(container).toMatchSnapshot()
  });
});
