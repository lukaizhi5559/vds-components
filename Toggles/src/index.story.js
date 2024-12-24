/* eslint-disable no-console */
import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import { ColorTokens } from '@vds-tokens/color';
import { Toggle } from './index';

const surfaceOptions = ['light', 'dark'];
const textSizeOptions = ['small', 'large'];
const textPositionOptions = ['left', 'right'];
const fontWeightOptions = ['regular', 'bold'];

const InvertedBackground = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  background: ${({ surface }) =>
    surface === 'dark'
      ? ColorTokens.palette.black.value
      : ColorTokens.palette.white.value};
`;

storiesOf('Brand3.0/Toggles', module)
  .addDecorator(withKnobs)

  .add('Toggle', () => {
    const showTextKnob = boolean('show text', false);
    const disabledKnob = boolean('disabled', false);
    const surfaceKnob = select('surface', surfaceOptions);
    const textSizeKnob = showTextKnob && select('text size', textSizeOptions);
    const textPositionKnob =
      showTextKnob && select('text position', textPositionOptions);
    const textWeightKnob =
      showTextKnob && select('font weight', fontWeightOptions);

    return (
      <>
        <InvertedBackground surface={surfaceKnob} />
        <Toggle
          value="default"
          disabled={disabledKnob}
          surface={surfaceKnob}
          showText={showTextKnob}
          textWeight={textWeightKnob}
          textSize={textSizeKnob}
          textPosition={textPositionKnob}
          name="Enable location access"
        />
      </>
    );
  });
