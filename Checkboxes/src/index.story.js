/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import { Checkbox, CheckboxGroup } from '.';
import { Body } from '@vds-core/typography';

const surfaceOptions = ['light', 'dark'];

const InvertedBackground = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: ${({ surface }) => (surface === 'dark' ? 'black' : 'white')};
`;

storiesOf('Brand3.0/Checkboxes', module)
  .addDecorator(withKnobs)

  .add('Checkbox', () => {
    const surfaceKnob = select('surface', surfaceOptions, 'light');
    return (
      <InvertedBackground surface={surfaceKnob}>
        <Checkbox
          children={text(
            'children',
            "I agree to Verizon's terms and conditions"
          )}
          disabled={boolean('disabled', false)}
          surface={surfaceKnob}
          error={boolean('error', false)}
          errorText={text('error text', 'Error Text')}
          name={text('input.name', 'default name')}
          Body={Body}
          label={text('label', 'Terms and conditions')}
        />
      </InvertedBackground>
    );
  })

  .add('Checkbox - group', () => {
    const viewportOptions = ['desktop', 'tablet', 'mobile'];
    const surfaceKnob = select('surface', surfaceOptions, 'light');
    return (
      <InvertedBackground surface={surfaceKnob}>
        <CheckboxGroup
          childWidth={text('childWidth', '100%')}
          viewport={select('viewport', viewportOptions, 'desktop')}
          surface={surfaceKnob}
          data={[
            {
              label: 'In-Store pickup',
              children: 'Pick up your device in a store near you.',
              value: 'option-a',
            },
            {
              label: 'Ship it to me',
              children: 'Have your device delivered to you.',
              value: 'option-b',
            },
            {
              children: 'Remember my location',
              value: 'option-c',
            },
          ]}
        />
      </InvertedBackground>
    );
  });
