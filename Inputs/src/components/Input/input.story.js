import React from 'react';
import { storiesOf } from '@storybook/react';
// import { withInfo } from '@storybook/addon-info';
import {
  withKnobs,
  number,
  text,
  select,
  boolean,
} from '@storybook/addon-knobs';
import Input from './Input';

const typeOptions = [
  'text',
  'number',
  'checkbox',
  'toggle',
  'datePicker',
  'radioBox',
  'radioSwatch',
  'radioButton',
  'calendar',
];

// storiesOf('Inputs/Input', module)
//   // .addDecorator(withInfo)
//   .addDecorator(withKnobs)

//   .add('Input', () => (
//     <Input type={select('type', typeOptions, 'text')} name="default input" placeholder="Input Field" />
//   ));
