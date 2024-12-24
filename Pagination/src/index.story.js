import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, number } from '@storybook/addon-knobs';
import { Pagination } from '.';
import { withState } from '@dump247/storybook-state';
import { ColorTokens } from '@vds-tokens/color';

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

storiesOf('Brand3.0/Pagination', module)
  .addDecorator(withKnobs)

  .add(
    'Pagination',
    withState({ selected: 10 })(({ store }) => {
      const surfaceKnob = select('surface', surfaceOptions, 'light');

      function _selected(page) {
        store.set({ selected: page });
        alert(`Selected page ${page}`);
      }
      return (
        <React.Fragment>
          <InvertedBackground surface={surfaceKnob} />

          <Pagination
            selectedPage={number('selected', store.state.selected)}
            total={number('total', 20)}
            selectPage={_selected}
            surface={surfaceKnob}
          />
        </React.Fragment>
      );
    })
  );
