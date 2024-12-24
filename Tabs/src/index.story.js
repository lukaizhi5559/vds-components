import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, boolean } from '@storybook/addon-knobs';
import { ColorTokens } from '@vds-tokens/color';
import { Tabs, Tab } from './index';

const StyledEmptyTab = styled.div``;

const InvertedBackground = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  background: ${({ surface }) =>
    surface === 'dark'
      ? ColorTokens.background.primary.dark.value
      : ColorTokens.background.primary.light.value};
`;

const positionOptions = ['top', 'bottom'];
const sizeOptions = ['medium', 'large'];
const surfaceOptions = ['light', 'dark'];

storiesOf('Brand3.0/Tabs', module)
  .addDecorator(withKnobs)
  .add('Tabs', () => {
    const surfaceKnob = select('surface', surfaceOptions, 'light');

    return (
      <>
        <InvertedBackground surface={surfaceKnob} />
        <Tabs
          indicatorPosition={select(
            'indicatorPosition',
            positionOptions,
            'bottom'
          )}
          borderLine={boolean('borderLine', true)}
          surface={surfaceKnob}
          size={select('size', sizeOptions, 'medium')}
          orientation={select(
            'orientation',
            ['horizontal', 'vertical'],
            'horizontal'
          )}
          overflow={select('overflow', ['scroll', 'none'], 'scroll')}
          fillContainer={boolean('fillContainer', false)}
        >
          <Tab label="Accessory deals">
            <StyledEmptyTab />
          </Tab>
          <Tab label="Switch to VZ deals">
            <StyledEmptyTab />
          </Tab>
          <Tab label="Upgrade deals">
            <StyledEmptyTab />
          </Tab>
          <Tab label="Plan deals">
            <StyledEmptyTab />
          </Tab>
        </Tabs>
      </>
    );
  });
