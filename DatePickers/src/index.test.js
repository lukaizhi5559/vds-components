import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { calculateRem } from '../../Utilities/src';
import { DatePicker } from '.';

jest.mock('@vds-core/utilities', () => {
  const originalModule = jest.requireActual('@vds-core/utilities');
  return {
    __esModule: true, // Use it when dealing with esModules
    ...originalModule,
    generateUUID: jest.fn(() => '1'),
  };
});
const generateUUID = require('@vds-core/utilities').generateUUID;
generateUUID();
const date = new Date('December 17, 1995 03:24:00');
const newDate = new Date('December 18, 2028 03:25:00');

const getLastDate = () => {
  const date = new Date();
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const d = new Date(lastDay),
    fullMonths = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    fullYear = d.getFullYear();
  return fullMonths[d.getMonth()] + ' ' + d.getDate() + ', ' + fullYear;
};

describe('<DatePicker />', () => {
  test('should render DatePicker and check styles', () => {
    const { container, rerender } = render(
      <DatePicker selectedDate={date} id="datePicker" />
    );

    const input = container.querySelector('input');
    fireEvent.click(input);
    expect(input.value).toBe('December 17, 1995');

    // Open Calendar and test selecting last day
    const tileClassName =
      '.react-calendar__tile.react-calendar__month-view__days__day:not(.react-calendar__month-view__days__day--neighboringMonth)';
    const days = container.querySelectorAll(tileClassName);
    const lastDayOfMonth = days[days.length - 1];
    const datePickerContainer = container.querySelector('#datePicker');
    expect(datePickerContainer).toHaveStyleRule('width', '100%');
    // Click tile, should close the Calendar.
    fireEvent.click(lastDayOfMonth);
    expect(input.value).toBe(getLastDate());
    fireEvent.focus(input);
    rerender(<DatePicker selectedDate={newDate} />);
    expect(input.value).toBe('December 18, 2028');
  });

  test('DatePicker width string', () => {
    const { container } = render(
      <DatePicker
        selectedDate={date}
        width={'200px'}
        id="datePicker"
        error={() => {}}
        handleDatePick={() => {}}
      />
    );
    const datePickerContainerStyle = getComputedStyle(
      container.querySelector('#datePicker')
    );
    // expect(datePickerContainerStyle.width).toBe('200px');
  });

  test('DatePicker width number', () => {
    const { container } = render(
      <DatePicker selectedDate={date} width={160} id="datePicker" />
    );
    const datePickerContainerStyle = getComputedStyle(
      container.querySelector('#datePicker')
    );
    // expect(datePickerContainerStyle.width).toBe('10rem');
  });

  test('DatePicker readOnly', () => {
    const { container, rerender } = render(
      <DatePicker selectedDate={date} readOnly id="datePicker" />
    );
    const input = container.querySelector('input');
    fireEvent.click(input);
    fireEvent.keyUp(input);
    expect(container).toMatchSnapshot();
    rerender(<DatePicker required />);
    fireEvent.mouseDown(container);
  });

  test('DatePicker alwaysOpen', () => {
    const { container } = render(
      <DatePicker alwaysOpen required errorEvent="blurAndChange" />
    );
    const calendar = container.querySelector('.react-calendar');
    const input = container.querySelector('input');
    fireEvent.click(input);
    fireEvent.mouseDown(document);
    expect(calendar).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('DatePicker activeStartDate', () => {
    const { container } = render(<DatePicker activeStartDate={date} />);
    expect(container).toMatchSnapshot();
  });

  test('DatePicker in error state', () => {
    const { container, rerender } = render(
      <DatePicker selectedDate={date} error />
    );
    expect(container).toMatchSnapshot();
    rerender(<DatePicker selectedDate={date} error={undefined} />);
  });

  test('DatePicker format', () => {
    const { container, rerender } = render(
      <DatePicker selectedDate={date} format={'Month, Date, Year'} />
    );
    expect(container).toMatchSnapshot();
    rerender(
      <DatePicker selectedDate={date} error={() => {}} format={'MM/DD/YYYY'} />
    );
  });

  test('DatePicker format validation when format="Mon D, YYYY"', () => {
    const { container } = render(
      <DatePicker selectedDate={date} format={'Mon D, YYYY'} />
    );
    expect(container).toMatchSnapshot();
  });

  test('DatePicker calculateInputPadding', () => {
    const { container } = render(
      <DatePicker
        selectedDate={date}
        calculateInputPadding={() => calculateRem(12, 12, 12, 44)}
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('DatePicker clickEvent with handleDatePick', () => {
    const { container } = render(
      <DatePicker
        error
        id="datePicker"
        inputId="dateField"
        handleDatePick={() => {}}
      />
    );

    const datePickerContainer = container.querySelector('#datePicker');
    fireEvent.mouseUp(datePickerContainer);

    const input = container.querySelector('#dateField');
    expect(input).toBeTruthy();

    // Open Calendar and test selecting last day
    fireEvent.click(input);
    const tileClassName =
      '.react-calendar__tile.react-calendar__month-view__days__day:not(.react-calendar__month-view__days__day--neighboringMonth)';
    const days = container.querySelectorAll(tileClassName);
    const lastDayOfMonth = days[days.length - 1];
    fireEvent.click(lastDayOfMonth);
    expect(input.value).toBe(getLastDate());
  });

  test('DatePicker open on enter key', () => {
    const { container } = render(
      <DatePicker
        error
        id="datePicker"
        inputId="dateField"
        handleDatePick={() => {}}
      />
    );

    const datePickerContainer = container.querySelector('#datePicker');

    // const calendarStyleBeforeOpen = getComputedStyle(calendarContainer)._values;
    const input = container.querySelector('#dateField');
    // expect(calendarStyleBeforeOpen.display).toBe('none');
    fireEvent.keyDown(datePickerContainer);
    fireEvent.keyDown(input, {
      key: 'Enter',
      charCode: 13,
      keyCode: 13,
    });
    const calendarContainer = container.querySelector('.react-calendar')
      .parentNode;
    const calendarStyleAfterOpen = getComputedStyle(calendarContainer)._values;
    expect(calendarStyleAfterOpen.display).toBe('block');
  });

  test('DatePicker inverted', () => {
    const { container } = render(
      <DatePicker surface="dark" error disabled={false} />
    );

    expect(container).toMatchSnapshot();
  });

  test('DatePicker inverted disabled', () => {
    const { container } = render(
      <DatePicker surface="dark" error disabled={true} />
    );

    expect(container).toMatchSnapshot();
  });

  test('DatePicker check empty error', () => {
    const { container } = render(<DatePicker required />);
    const input = container.querySelector('input');
    fireEvent.click(input);
    fireEvent.mouseDown(document);
    expect(container).toMatchSnapshot();
  });

  test('DatePicker with label', () => {
    const { container } = render(<DatePicker label="date label" />);

    expect(container).toMatchSnapshot();
  });
});

describe('<DatePicker /> 1.0', () => {
  test('should render DatePicker and check styles', () => {
    const { container, rerender } = render(
      <div>
        <div id="div"> </div>
        <DatePicker /*typescale="VDS"*/ required selectedDate={date} />
      </div>
    );

    const input = container.querySelector('input');
    const div = container.querySelector('#div');

    fireEvent.click(input);

    fireEvent.click(div);
    fireEvent.mouseDown(document);
    rerender(<DatePicker selectedDate={date} />);
  });

  test('should render opened DatePicker', () => {
    const { container, getByText, rerender } = render(
      <>
        <DatePicker error required /*typescale="VDS"*/ />
        <div width="200px" height="200px">
          Test Click
        </div>
      </>
    );

    const input = container.querySelector('input');

    fireEvent.click(input);
    const calendarContainer = container.querySelector('.react-calendar')
      .parentNode;
    const calendarStyle = getComputedStyle(calendarContainer);
    expect(calendarStyle.display).toBe('block');
    expect(input.value).toBe('');
    fireEvent.mouseDown(document);
    rerender(<DatePicker required value="" disabled />);
  });

  test('should render DatePicker readonly', () => {
    const { container, rerender } = render(
      <DatePicker
        readOnly
        readOnlyBorders
        selectedDate={date}
        /*typescale="VDS"*/
      />
    );
    const input = container.querySelector('input');
    expect(input.getAttribute('readonly')).toBe('');
    rerender(<DatePicker required value="" />);
  });

  test('should render DatePicker disabled', () => {
    const { container } = render(
      <DatePicker
        width="100%"
        disabled
        selectedDate={date} /*typescale="VDS"*/
      />
    );

    const input = container.querySelector('input');
    expect(input).toBeDisabled();
  });

  test('DatePicker in error state', () => {
    const { container, rerender } = render(
      <DatePicker selectedDate={date} error /*typescale="VDS"*/ />
    );

    const input = container.querySelector('input');

    // Open Calendar
    fireEvent.click(input);
    // Close Calendar
    fireEvent.mouseDown(container);
    expect(input.value).toBe('December 17, 1995');
    rerender(<DatePicker selectedDate={date} required />);
    rerender(<DatePicker />);
    rerender(<DatePicker selectedDate={date} error errorText="Error Text" />);
  });
});
