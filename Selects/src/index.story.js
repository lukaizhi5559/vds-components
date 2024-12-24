import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  text,
  boolean,
  number,
  select,
} from '@storybook/addon-knobs';
import { withState } from '@dump247/storybook-state';
import { ColorTokens } from '@vds-tokens/color';
import { testData } from './utils/optionTestData';
import { DropdownSelect } from '.';

const surfaceOptions = ['light', 'dark'];

const InvertedBackground = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({ surface, transparent }) =>
    transparent
      ? ColorTokens.palette.blue38.value
      : surface === 'dark'
      ? 'black'
      : 'white'};
`;

const SelectContainer = styled.div`
  padding-left: 50px;
  padding-top: 25px;
`;

storiesOf('Brand3.0/Selects', module)
  .addDecorator(withKnobs)

  .add(
    'DropdownSelect',
    withState({ selectedOption: undefined })(({ store }) => {
      const label = 'numberOfOptions';
      const defaultValue = 13;
      const options = {
        range: true,
        min: 3,
        max: 49,
        step: 1,
      };

      const optionItems = testData;
      const surfaceKnob = select('surface', surfaceOptions, 'light');
      const transparentBackgroundKnob = boolean('transparentBackground', false);
      const numberOfOptions = number(label, defaultValue, options);
      function _renderOptions() {
        let options = Array.from({ length: numberOfOptions }).map(
          (item, index) => {
            let chosenItem = optionItems[index]
              ? optionItems[index]
              : optionItems[0];

            return <option key={index}>{chosenItem}</option>;
          }
        );
        return options;
      }
      return (
        <React.Fragment>
          <InvertedBackground
            surface={surfaceKnob}
            transparent={transparentBackgroundKnob}
          >
            <SelectContainer>
              <DropdownSelect
                inlineLabel={boolean('inlineLabel', false)}
                surface={surfaceKnob}
                required={boolean('required', true)}
                width={text('width', '250px')}
                label={text('label', 'Sort by:')}
                errorText={text('errorText', 'Error Text')}
                error={boolean('error', false)}
                autoComplete={text('autoComplete', 'off')}
                disabled={boolean('disabled', false)}
                readOnly={boolean('readOnly', false)}
                transparentBackground={transparentBackgroundKnob}
              >
                {_renderOptions()}
              </DropdownSelect>
            </SelectContainer>
          </InvertedBackground>
        </React.Fragment>
      );
    })
  );
