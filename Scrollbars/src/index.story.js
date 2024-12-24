import React, { Fragment } from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import { ScrollWrapper } from '.';

const ScrollableWrapper = styled.div`
  display: flex;
`;

const surfaceOptions = ['light', 'dark'];

storiesOf('Brand3.0/Scrollbar', module)
  .addDecorator(withKnobs)

  .add('ScrollWrapper', () => {
    const surfaceKnob = select('surface', surfaceOptions, 'light');

    return (
      <ScrollWrapper height="200px" width="500px" surface={surfaceKnob}>
        <ScrollableWrapper>
          This Modal uses the Default Header Close Button. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Sed tempor Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Sed tempor Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Sed tempor Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Sed tempor This Modal uses the
          Default Header Close Button. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Sed tempor Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Sed tempor Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Sed tempor Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Sed tempor This Modal uses the Default Header Close
          Button. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          tempor This Modal uses the Default Header Close Button. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Sed tempor Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Sed tempor Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Sed tempor Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Sed tempor This Modal
          uses the Default Header Close Button. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Sed tempor Lorem ipsum dolor sit
        </ScrollableWrapper>
      </ScrollWrapper>
    );
  });
