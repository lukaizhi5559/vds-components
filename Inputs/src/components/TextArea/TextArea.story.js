import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
// import { withInfo } from '@storybook/addon-info';
import {
  withKnobs,
  number,
  text,
  select,
  boolean,
} from '@storybook/addon-knobs';
import { ColorTokens } from '@vds-tokens/color';
import { TextArea } from '.';

const longContent =
  'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus vitae excepturi libero maxime repellat unde.';
const dateFormats = ['mmyy', 'mmddyy', 'mmddyyyy'];

const maxLengthOptions = {
  range: true,
  min: 20,
  max: 200,
  step: 1,
};
const InvertedBackground = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  box-sizing: border-box;
  background: ${({ surface, transparent }) =>
    transparent
      ? ColorTokens.palette.blue38.value
      : surface === 'dark'
      ? 'black'
      : 'white'};
`;

let width = number('width', 250);
const surfaceOptions = ['light', 'dark'];

storiesOf('Brand3.0/Inputs', module)
  .addDecorator(withKnobs)

  .add('TextArea', () => {
    const surfaceKnob = select('surface', surfaceOptions, 'light');
    const transparentBackgroundKnob = boolean('transparentBackground', false);
    return (
      <InvertedBackground
        surface={surfaceKnob}
        transparent={transparentBackgroundKnob}
      >
        <TextArea
          surface={surfaceKnob}
          width={select('width', ['250px', '400px', '100%'], '100%')}
          minHeight={select('minHeight', ['2X', '4X', '8X'], '2X')}
          disabled={boolean('disabled', false)}
          error={boolean('error', false)}
          errorEvent={select('errorEvent', ['change', 'blur'], 'blur')}
          errorText={text('errorText', 'Error Text')}
          required={boolean('required', true)}
          readOnly={boolean('readOnly', false)}
          name={text('name', 'default input')}
          label={text('label', 'Label')}
          helperText={text('helperText', 'This is a helper text')}
          // tooltipTitle={text('tooltipTitle', 'This is a tooltip header')}
          // tooltipContent={text('tooltipContent', longContent)}
          maxLength={number('max length', 20, maxLengthOptions)}
          transparentBackground={transparentBackgroundKnob}
        />
      </InvertedBackground>
    );
  });
