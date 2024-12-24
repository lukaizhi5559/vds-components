import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import { RadioButtonGroup, RadioButton } from '.';
import { ColorTokens } from '@vds-tokens/color';

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

const surfaceOptions = ['light', 'dark'];

storiesOf('Brand3.0/Radio Buttons', module)
  // .addDecorator((story, context) =>
  //   withInfo('Use the Knobs to provide props to the component')(story)(context)
  // )
  .addDecorator(withKnobs)

  .add('RadioButton', () => {
    const surfaceKnob = select('surface', surfaceOptions, 'light');
    const viewportOptions = ['mobile', 'tablet', 'desktop'];

    return (
      <React.Fragment>
        <InvertedBackground surface={surfaceKnob} />
        <RadioButtonGroup
          error={boolean('error', false)}
          defaultValue="defaultB"
          surface={surfaceKnob}
        >
          <RadioButton
            selected
            name={text('input.name', ' ')}
            disabled={boolean('disabled', false)}
            children={text('label', ' Radio (default)')}
            value="defaultA"
            ariaLabel="default A"
            viewport={select('viewport', viewportOptions, 'desktop')}
          />
        </RadioButtonGroup>
      </React.Fragment>
    );
  })

  .add('RadioButton - with children', () => {
    const surfaceKnob = select('surface', surfaceOptions, 'light');
    const viewportOptions = ['mobile', 'tablet', 'desktop'];

    return (
      <React.Fragment>
        <InvertedBackground surface={surfaceKnob} />

        <RadioButtonGroup error={boolean('error', false)} surface={surfaceKnob}>
          <RadioButton
            name={text('input.name', ' ')}
            disabled={boolean('disabled', false)}
            value="defaultA"
            ariaLabel="default A "
            viewport={select('viewport', viewportOptions, 'desktop')}
          >
            Radio (with children) <br /> Second Line
          </RadioButton>
        </RadioButtonGroup>
      </React.Fragment>
    );
  })

  .add('RadioButton - group', () => {
    const surfaceKnob = select('surface', surfaceOptions, 'light');
    const viewportOptions = ['mobile', 'tablet', 'desktop'];

    return (
      <React.Fragment>
        <InvertedBackground surface={surfaceKnob} />
        <RadioButtonGroup
          error={boolean('error', false)}
          surface={surfaceKnob}
          data={[
            {
              name: 'group',
              disabled: boolean('disabled', false),
              children: (
                <React.Fragment>
                  Apple iPhone 11 - 64 GB
                  <br />
                  Otterbox Case Red
                  <br />
                  Screen Protector
                </React.Fragment>
              ),
              value: 'radioOne',
              ariaLabel: 'radio one',
              label: 'iPhone 11 Bundle 1  ',
              viewport: select('viewport', viewportOptions, 'desktop'),
            },
            {
              name: 'group',
              disabled: boolean('disabled', false),
              children: (
                <React.Fragment>
                  Apple iPhone 11 - 128 GB
                  <br />
                  Otterbox Case Black
                  <br />
                  Screen Protector
                </React.Fragment>
              ),
              value: 'radioTwo',
              ariaLabel: 'radio two',
              label: 'iPhone 11 Bundle 2',
              viewport: select('viewport', viewportOptions, 'desktop'),
            },
            {
              name: 'group',
              disabled: boolean('disabled', false),
              children: (
                <React.Fragment>
                  Apple iPhone 21 - 100 TB
                  <br />
                  Otterbox Case Diamond
                  <br />
                  Screen Avenger
                </React.Fragment>
              ),
              value: 'radioThree',
              ariaLabel: 'radio three',
              label: 'iPhone 21 Bundle 3',
              viewport: select('viewport', viewportOptions, 'desktop'),
            },
            {
              name: 'group',
              disabled: boolean('disabled', false),
              children:
                'Radio Four Text Really long label to trigger wrapping to happen when it is a really long label to trigger wrapping to happen when it is a really long label to trigger wrapping to happen when it is a really long label to trigger wrapping to happen when it is a really long label',
              value: 'radioFour',
              ariaLabel: 'radio four',
              viewport: select('viewport', viewportOptions, 'desktop'),
            },
            {
              name: 'group',
              disabled: boolean('disabled', false),
              children: 'No Thanks',
              value: 'radioFive',
              ariaLabel: 'radio five',
              viewport: select('viewport', viewportOptions, 'desktop'),
            },
          ]}
        />
      </React.Fragment>
    );
  });
