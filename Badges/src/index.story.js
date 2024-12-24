import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, text, boolean } from '@storybook/addon-knobs';
import { ColorTokens } from '@vds-tokens/color';
import { LayoutTokens } from '@vds-tokens/layout';
import { Badge, BadgeIndicator } from './index';

const fillColorOptions = [
  'red',
  'yellow',
  'green',
  'orange',
  'blue',
  'black',
  'white',
];

const badgeIndicatorFillColorOptions = [
  'red',
  'yellow',
  'green',
  'orange',
  'blue',
  'grayHighContrast',
  'grayLowContrast',
  'black',
  'white',
];
const surfaceOptions = ['light', 'dark'];
const sizeKnobOptions = ['small', 'medium', 'large', 'XLarge', '2XLarge'];
const numberOfLinesOptions = [1, 2, 3, 4];

const InvertedBackground = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  background-color: ${({ surface }) =>
    surface === 'dark'
      ? ColorTokens.palette.black.value
      : ColorTokens.palette.white.value};
`;

storiesOf('Brand3.0/Badges', module)
  .addDecorator(withKnobs)

  .add('Badge', () => {
    const fillColorKnob = select('fill color', fillColorOptions);
    const surfaceKnob = select('surface', surfaceOptions);
    const childrenKnob = text('children', 'Badge');
    const maxWidthKnob = text('max width', '');
    const numberOfLinesKnob =
      maxWidthKnob !== '' && select('number of lines', numberOfLinesOptions);

    return (
      <>
        <InvertedBackground surface={surfaceKnob} />
        <Badge
          children={childrenKnob}
          fillColor={fillColorKnob}
          surface={surfaceKnob}
          maxWidth={maxWidthKnob}
          numberOfLines={numberOfLinesKnob}
        />
      </>
    );
  })
  .add('Badge Indicator', () => {
    const kindKnob = select('kind', ['simple', 'numbered'], 'simple');
    const surfaceKnob = select('surface', surfaceOptions, 'light');
    const fillColorKnob = select(
      'fillColor',
      badgeIndicatorFillColorOptions,
      'red'
    );
    const childrenKnob = text('children', '99');
    const containerSizeKnob = text('containerSize', 16);
    const dotSizeKnob = text('dot size', 4);
    const sizeKnob = select('size', sizeKnobOptions, 'small');
    const borderColorOnLightKnob = text(
      'borderColor onlight',
      ColorTokens.palette.white.value
    );
    const borderColorOnDarkKnob = text(
      'borderColor ondark',
      ColorTokens.palette.black.value
    );
    const verticalPaddingKnob = text('vertical padding', '');
    const horizontalPaddingKnob = text('horizontal padding', '');
    const maximumDigitsKnob = select(
      'maximumDigits',
      ['one', 'two', 'three', 'four', 'five', 'six', 'none'],
      'two'
    );
    const leadingCharacterKnob = text('leadingCharacter', '');
    const trailingTextKnob = text('trailingTextKnob', '');

    return (
      <>
        <InvertedBackground surface={surfaceKnob} />
        <BadgeIndicator
          kind={kindKnob}
          surface={surfaceKnob}
          fillColor={fillColorKnob}
          containerSize={containerSizeKnob}
          dotSize={dotSizeKnob}
          size={sizeKnob}
          borderColor={{
            onlight: borderColorOnLightKnob,
            ondark: borderColorOnDarkKnob,
          }}
          hideBorder={boolean('hideBorder', false)}
          hideDot={boolean('hideDot', false)}
          padding={{
            vertical: verticalPaddingKnob,
            horizontal: horizontalPaddingKnob,
          }}
          maximumDigits={maximumDigitsKnob}
          leadingCharacter={leadingCharacterKnob}
          trailingText={trailingTextKnob}
        >
          {childrenKnob}
        </BadgeIndicator>
      </>
    );
  });
