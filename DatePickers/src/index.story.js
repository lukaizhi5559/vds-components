import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  select,
  boolean,
  text,
  date,
  array,
} from '@storybook/addon-knobs';
import { ColorTokens } from '@vds-tokens/color';
import { DatePicker } from '.';

const sizeOptions = ['small', 'normal', 'large'];
const formatOptions = [
  'MM/DD/YY',
  'Month, Date, Year',
  'MM/DD/YYYY',
  'Mon D, YYYY',
];

const defaultMin = new Date('06/1/2021');
const defaultMax = new Date('09/1/2021');

const InvertedBackground = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  background: ${({ surface, transparent }) =>
    transparent
      ? ColorTokens.palette.blue45.value
      : surface === 'dark'
      ? 'black'
      : 'white'};
`;

const surfaceOptions = ['light', 'dark'];

storiesOf('Brand3.0/DatePickers', module)
  .addDecorator(withKnobs)

  .add('DatePicker', () => {
    const groupId = 'GROUP-ID2';

    const minDate = date('Minimum Selectable Date', defaultMin, groupId);
    const maxDate = date('Maximum Selectable Date', defaultMax, groupId);

    const minDateKnob = new Date(minDate);
    const maxDateKnob = new Date(maxDate);

    const inactiveDates = array('disable dates', []);
    const surfaceKnob = select('surface', surfaceOptions, 'light');
    const transparentBackgroundKnob = boolean('transparentBackground', false);

    return (
      <React.Fragment>
        <InvertedBackground
          surface={surfaceKnob}
          transparent={transparentBackgroundKnob}
        />
        <DatePicker
          type="calendar"
          minDate={minDateKnob}
          maxDate={maxDateKnob}
          inactiveDates={inactiveDates}
          readOnly={boolean('readOnly', false)}
          disabled={boolean('disabled', false)}
          surface={surfaceKnob}
          onChange={e => alert(e)}
          size={select('size', sizeOptions, 'normal')}
          error={boolean('error', false)}
          errorText={text('error text', 'Error Text')}
          label={text('label', 'Label')}
          dateFormat={select('dateFormat', formatOptions, 'Month, Date, Year')}
          alwaysOpen={boolean('alwaysOpen', false)}
          helperText={text('helperText', 'This is a helper text')}
          helperTextPlacement={select(
            'helperTextPlacement',
            ['right', 'bottom'],
            'bottom'
          )}
          transparentBackground={transparentBackgroundKnob}
          tooltipTitle="hello"
        />
      </React.Fragment>
    );
  });
