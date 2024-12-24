import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import { withState } from '@dump247/storybook-state';
import { RadioBox, RadioBoxGroup } from '.';
import { VDSManager } from '@vds-core/utilities';
import { ColorTokens } from '@vds-tokens/color';

const InvertedBackground = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  background: ${({ surface, transparent }) =>
    transparent
      ? ColorTokens.palette.blue38.value
      : surface === 'dark'
      ? 'black'
      : 'white'};
`;

const StyledWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const surfaceOptions = ['light', 'dark'];

storiesOf('Brand3.0/RadioBoxes', module)
  .addDecorator(withKnobs)
  .add(
    'RadioBox',
    withState({ sizes: '' })(({ store }) => {
      const surfaceKnob = select('surface', surfaceOptions, 'light');
      const transparentBackgroundKnob = boolean('transparentBackground', false);

      return (
        <StyledWrapper>
          <InvertedBackground
            surface={surfaceKnob}
            transparent={transparentBackgroundKnob}
          />
          <RadioBox
            orientation="vertical"
            disabled={boolean('disabled', false)}
            outOfStock={boolean('out of stock', false)}
            id="32GB"
            selected={store.state.sizes === '32GB'}
            onChange={e => store.set({ sizes: e.target.value })}
            text={text('text', '32GB')}
            subtext={text('subtext', 'Cheap')}
            surface={surfaceKnob}
            value="32GB"
            transparentBackground={transparentBackgroundKnob}
          />
        </StyledWrapper>
      );
    })
  )

  .add(
    'RadioBox - custom',
    withState({ sizes: '' })(({ store }) => {
      const transparentBackgroundKnob = boolean('transparentBackground', false);
      const surfaceKnob = select('surface', surfaceOptions, 'light');
      return (
        <StyledWrapper>
          <RadioBox
            id="32GB"
            selected={store.state.sizes === '32GB'}
            onChange={e => store.set({ sizes: e.target.value })}
            disabled={boolean('disabled', false)}
            outOfStock={boolean('out of stock', false)}
            surface={surfaceKnob}
            width="200px"
            value="32GB"
            transparentBackground={transparentBackgroundKnob}
          >
            <img
              width="150px"
              src="https://www.underconsideration.com/brandnew/archives/verizon_2015_logo_evolution.gif"
            />
          </RadioBox>
        </StyledWrapper>
      );
    })
  )
  .add('RadioBox - group', () => {
    const heightOptions = ['default', '64px', '120px'];
    const surfaceKnob = select('surface', surfaceOptions, 'light');
    const orientationOptions = ['horizontal', 'vertical'];
    const transparentBackgroundKnob = boolean('transparentBackground', false);

    const subtextKnob = text('subtext', 'Cheap');
    const disabledKnob = boolean('disabled', false);
    const outOfStockKnob = boolean('outofstock', false);
    const heightKnob = text('childHeight', '');

    let data = [
      {
        value: '16GB',
        text: '16GB',
        type: 'radiobox',
        subtext: subtextKnob,
        subtextRight: '$99.99',
        disabled: disabledKnob,
        outOfStock: outOfStockKnob,
        name: 'group',
      },
      {
        value: '32GB',
        text: 'We need a longer radio box to test things out',
        type: 'radiobox',
        subtext: subtextKnob,
        disabled: disabledKnob,
        outOfStock: outOfStockKnob,
        name: 'group',
      },
      {
        value: '64GB',
        text: '64GB',
        type: 'radiobox',
        subtext: subtextKnob,
        disabled: disabledKnob,
        outOfStock: outOfStockKnob,
        name: 'group',
      },
      {
        value: '128GB',
        text: '128GB',
        type: 'radiobox',
        subtext: subtextKnob,
        disabled: disabledKnob,
        outOfStock: outOfStockKnob,
        name: 'group',
      },
      {
        value: '256GB',
        text: '256GB',
        type: 'radiobox',
        subtext: subtextKnob,
        disabled: disabledKnob,
        outOfStock: outOfStockKnob,
        name: 'group',
      },
    ];

    let data_minimal = [
      {
        value: 'minim-32',
        text: '32GB',
        subtextRight: '$33.33/mo',
        type: 'radiobox',
        disabled: disabledKnob,
        outOfStock: outOfStockKnob,
        name: 'group2',
      },
      {
        value: 'minim-64',
        text: '64GB',
        subtextRight: '$49.99/mo',
        type: 'radiobox',
        disabled: disabledKnob,
        outOfStock: outOfStockKnob,
        name: 'group2',
      },
      {
        value: 'minim-128',
        text: '128GB',
        subtextRight: '$59.99/mo',
        type: 'radiobox',
        disabled: disabledKnob,
        outOfStock: outOfStockKnob,
        name: 'group2',
      },
    ];

    let data_single_label = [
      {
        value: 'minim-32',
        text: '32GB',
        type: 'radiobox',
        disabled: disabledKnob,
        outOfStock: outOfStockKnob,
        name: 'group3',
      },
      {
        value: 'minim-64',
        text: '64GB',
        type: 'radiobox',
        disabled: disabledKnob,
        outOfStock: outOfStockKnob,
        name: 'group3',
      },
      {
        value: 'minim-128',
        text: '128GB',
        type: 'radiobox',
        disabled: disabledKnob,
        outOfStock: outOfStockKnob,
        name: 'group3',
      },
    ];

    let data_empty = [
      {
        value: 'empty-32',
        text: '',
        type: 'radiobox',
        disabled: disabledKnob,
        outOfStock: outOfStockKnob,
        name: 'group4',
      },
      {
        value: 'empty-64',
        text: '',
        type: 'radiobox',
        disabled: disabledKnob,
        outOfStock: outOfStockKnob,
        name: 'group4',
      },
      {
        value: 'empty-128',
        text: '',
        type: 'radiobox',
        disabled: disabledKnob,
        outOfStock: outOfStockKnob,
        name: 'group4',
      },
    ];

    return (
      <div>
        <InvertedBackground
          surface={surfaceKnob}
          transparent={transparentBackgroundKnob}
        />
        <VDSManager />
        <RadioBoxGroup
          data={data}
          orientation={select('orientation', orientationOptions, 'horizontal')}
          transparentBackground={transparentBackgroundKnob}
          surface={surfaceKnob}
          childHeight={heightKnob}
        />
        <br />
        <br />
        <RadioBoxGroup
          data={data_minimal}
          orientation={select('orientation', orientationOptions, 'horizontal')}
          transparentBackground={transparentBackgroundKnob}
          surface={surfaceKnob}
          childHeight={heightKnob}
        />
        <br />
        <br />
        <RadioBoxGroup
          data={data_single_label}
          orientation={select('orientation', orientationOptions, 'horizontal')}
          transparentBackground={transparentBackgroundKnob}
          surface={surfaceKnob}
          childHeight={heightKnob}
        />
        <br />
        <br />
        <RadioBoxGroup
          data={data_empty}
          orientation={select('orientation', orientationOptions, 'horizontal')}
          transparentBackground={transparentBackgroundKnob}
          surface={surfaceKnob}
          childHeight={heightKnob}
        />
      </div>
    );
  });
