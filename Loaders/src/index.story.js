import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import styled from 'styled-components';
import { Loader } from './index';

const ExampleContainer = styled.div`
  position: relative;
  width: 400px;
  padding: 1rem;
  background-color: #b5b5b5;
  z-index: 1;
  display: inline-block;
  margin-right: 15px;
`;

const BackgroundContainer = styled.div`
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  background: #ffffff;
`;

storiesOf('Brand3.0/Loaders', module)
  .addDecorator(withKnobs)

  .add('Loader', () => {
    return (
      <BackgroundContainer>
        <ExampleContainer>
          <h3>Loading - Click active to show/hide loader.</h3>
          <Loader
            active={boolean('active', true)}
            fullscreen={boolean('fullscreen', true)}
            surface={select('surface', ['light', 'dark'], 'light')}
          />
        </ExampleContainer>

        <ExampleContainer>
          <h3>Loaded</h3>
          <Loader active={false} fullscreen={boolean('fullscreen', true)} />
        </ExampleContainer>
      </BackgroundContainer>
    );
  });
