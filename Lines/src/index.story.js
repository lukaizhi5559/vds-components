import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import { ColorTokens } from '@vds-tokens/color';
import { Line } from './index';

const typeOptions = ['primary', 'secondary'];
const surfaceOptions = ['light', 'dark'];

const InvertedBackground = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  background: ${({ surface }) =>
    surface === 'dark'
      ? ColorTokens.elements.primary.onlight.value
      : ColorTokens.elements.primary.ondark.value};
`;

storiesOf('Brand3.0/Lines', module)
  .addDecorator(withKnobs)

  .add('Line', () => {
    const surfaceKnob = select('surface', surfaceOptions, 'light');
    const typeKnob = select('type', typeOptions, 'primary');
    const orientationKnob = select(
      'orientation',
      ['horizontal', 'vertical'],
      'horizontal'
    );

    return (
      <React.Fragment>
        <InvertedBackground surface={surfaceKnob} />
        <div
          style={{
            display: orientationKnob === 'vertical' && 'flex',
            gap: '10px',
          }}
        >
          <span>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Perspiciatis at, sequi dolor eius iste qui ipsa a, dolores atque
            sapiente itaque repellat corrupti rerum quo molestias, nemo ea
            excepturi expedita!
          </span>
          <Line
            type={typeKnob}
            surface={surfaceKnob}
            orientation={orientationKnob}
          />
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste in,
            quaerat obcaecati deserunt, rerum magnam nostrum mollitia aliquid
            quibusdam explicabo, voluptatum sed nisi alias itaque ipsa ullam
            culpa laboriosam cumque!
          </span>
        </div>
      </React.Fragment>
    );
  });
