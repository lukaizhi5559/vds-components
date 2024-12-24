import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, boolean } from '@storybook/addon-knobs';
import { ColorTokens } from '@vds-tokens/color';
import { Title, Subtitle, Body, Micro, Feature, Super } from '.';

let primitiveChoices = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'p'];
let viewportSizes = ['desktop', 'tablet', 'mobile'];
let titleSizes = ['small', 'medium', 'large', 'XLarge', '2XLarge'];
let featureSizes = ['XSmall', 'small', 'medium', 'large', 'XLarge'];
let bodySizes = ['small', 'medium', 'large'];
let defaultColor = ColorTokens.palette.black.value;
let colorChoices = {
  [ColorTokens.palette.black.value]: 'Black',
  [ColorTokens.palette.white.value]: 'White',
  [ColorTokens.palette.gray65.value]: 'gray65',
  [ColorTokens.palette.gray44.value]: 'gray44',
  [ColorTokens.palette.red.value]: 'red',
};

storiesOf('Brand3.0/Typography', module)
  .addDecorator(withKnobs)

  .add('Title', () => {
    const size = select('size', titleSizes, 'small');
    return (
      <Title
        viewport={select('viewport', viewportSizes, 'desktop')}
        size={size}
        color={select('color', colorChoices, defaultColor, '')}
        bold={boolean('bold', false)}
      >
        Title component
      </Title>
    );
  })

  .add('Subtitle', () => {
    return (
      <Subtitle
        primitive={select('primitive', primitiveChoices, 'h3')}
        viewport={select('viewport', viewportSizes, 'desktop')}
        color={select('color', colorChoices, defaultColor, '')}
      >
        Subtitle component
      </Subtitle>
    );
  })

  .add('Body', () => {
    return (
      <Body
        primitive={select('primitive', primitiveChoices, 'p')}
        viewport={select('viewport', viewportSizes, 'desktop')}
        size={select('size', bodySizes, 'small')}
        color={select('color', colorChoices, defaultColor, '')}
        bold={boolean('bold', false)}
        strikethrough={boolean('strikethrough', false)}
      >
        Body component
      </Body>
    );
  })

  .add('Micro', () => {
    return (
      <Micro
        primitive={select('primitive', primitiveChoices, 'p')}
        viewport={select('viewport', viewportSizes, 'desktop')}
        color={select('color', colorChoices, defaultColor, '')}
        bold={boolean('bold', false)}
      >
        Micro component
      </Micro>
    );
  })

  .add('Feature', () => {
    const size = select('size', featureSizes, 'small');
    return (
      <Feature
        primitive={select('primitive', primitiveChoices, 'p')}
        viewport={select('viewport', viewportSizes, 'desktop')}
        color={select('color', colorChoices, defaultColor, '')}
        size={size}
        bold={boolean('bold', false)}
      >
        Feature component
      </Feature>
    );
  })

  .add('Super', () => {
    const size = select('size', featureSizes, 'small');
    return (
      <Feature
        bold={boolean('bold', false)}
        superscriptSmall={boolean('superscriptSmall', false)}
        size={size}
      >
        Superscript<Super>1</Super>
      </Feature>
    );
  });
