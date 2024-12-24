import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import {
  withKnobs,
  date,
  array,
  boolean,
  text,
  select,
} from '@storybook/addon-knobs';
import { ColorTokens } from '@vds-tokens/color';
import { Calendar } from '.';

const defaultDate = new Date();

const InvertedBackground = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  background: ${({ surface, transparent }) =>
    transparent
      ? ColorTokens.palette.orange46.value
      : surface === 'dark'
      ? ColorTokens.elements.primary.onlight.value
      : ColorTokens.elements.primary.ondark.value};
`;

storiesOf('Brand3.0/Calendars', module)
  .addDecorator(withKnobs)

  .add('Calendar', () => {
    const groupId = 'GROUP-ID1';

    const minDate = date('Minimum Selectable Date', defaultDate, groupId);
    const maxDate = date('Maximum Selectable Date', defaultDate, groupId);

    const minDateKnob = new Date(
      defaultDate.getFullYear(),
      defaultDate.getMonth() - 1,
      defaultDate.getDate()
    );
    const maxDateKnob = new Date(
      defaultDate.getFullYear(),
      defaultDate.getMonth() + 1,
      defaultDate.getDate()
    );

    const inactiveDates = array('disable dates', []);
    const activeDates = array('enable dates', []);

    const surfaceOptions = ['light', 'dark'];

    const surfaceKnob = select('surface', surfaceOptions, 'light');
    const transparentBackgroundKnob = boolean('transparentBackground', false);
    const hideCurrentDateIndicator = boolean('hideCurrentDateIndicator', false);
    const hideContainerBorder = boolean('hideContainerBorder', false);
    const dateIndicators = boolean('dateIndicator', false);

    const indicatorOne = boolean('Indicator One', false);
    const indicatorTwo = boolean('Indicator Two', false);
    const indicatorThree = boolean('Indicator Three', false);

    const indicatorLabelOne = text('Indicator legend One', 'Due Date');
    const indicatorOneDate = new Date(
      date('Indicator One Date', new Date('06/06/2022'), groupId)
    );

    const indicatorLabelTwo = text('Indicator legend Two', 'Scheduled');
    const indicatorTwoDate = new Date(
      date('Indicator Two Date', new Date('06/07/2022'), groupId)
    );

    const indicatorLabelThree = text('Indicator legend Three', 'Auto Pay');
    const indicatorThreeDate = new Date(
      date('Indicator Three Date', new Date('06/07/2022'), groupId)
    );

    const _getIndicatorData = () => {
      if (
        (indicatorOne && !indicatorTwo && !indicatorThree) ||
        (indicatorOne && !indicatorTwo && indicatorThree)
      ) {
        return [
          {
            label: indicatorLabelOne,
            date: indicatorOneDate,
          },
        ];
      } else if (indicatorOne && indicatorTwo && !indicatorThree) {
        return [
          {
            label: indicatorLabelOne,
            date: indicatorOneDate,
          },
          {
            label: indicatorLabelTwo,
            date: indicatorTwoDate,
          },
        ];
      } else if (indicatorOne && indicatorTwo && indicatorThree) {
        return [
          {
            label: indicatorLabelOne,
            date: indicatorOneDate,
          },
          {
            label: indicatorLabelTwo,
            date: indicatorTwoDate,
          },
          {
            label: indicatorLabelThree,
            date: indicatorThreeDate,
          },
        ];
      }
    };

    return (
      <React.Fragment>
        <InvertedBackground
          surface={surfaceKnob}
          transparent={transparentBackgroundKnob}
        />
        <Calendar
          minDate={minDateKnob}
          maxDate={maxDateKnob}
          inactiveDates={inactiveDates}
          activeDates={activeDates}
          surface={surfaceKnob}
          hideCurrentDateIndicator={hideCurrentDateIndicator}
          indicators={_getIndicatorData()}
          transparentBackground={transparentBackgroundKnob}
          hideContainerBorder={hideContainerBorder}
        />
      </React.Fragment>
    );
  });
