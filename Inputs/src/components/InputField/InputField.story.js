import React, { Fragment } from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  number,
  text,
  select,
  boolean,
} from '@storybook/addon-knobs';
import { TextLink } from '@vds-core/buttons';
import { ColorTokens } from '@vds-tokens/color';
import { Input } from '../Input';

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
      ? ColorTokens.elements.primary.onlight.value
      : ColorTokens.elements.primary.ondark.value};
`;

const cardTypes = [
  '',
  'amex',
  'dinersClub',
  'discover',
  'jcb',
  'mastercard',
  'visa',
  'unionPay',
  'other',
];

const dateFormats = ['mmyy', 'mmddyy', 'mmddyyyy'];
const surfaceOptions = ['light', 'dark'];

storiesOf('Brand3.0/Inputs', module)
  .addDecorator(withKnobs)
  .add('Text', () => {
    const transparentBackgroundKnob = boolean('transparentBackground', false);
    return (
      <Fragment>
        <InvertedBackground
          surface={select('surface', surfaceOptions, 'light')}
          transparent={transparentBackgroundKnob}
        />
        <Input
          type="text"
          width={number('containerWidth', 328)}
          required={boolean('required', true)}
          disabled={boolean('disabled', false)}
          error={boolean('error', false)}
          success={boolean('success', false)}
          errorText={text('errorText', 'Error Text')}
          readOnly={boolean('readOnly', false)}
          name={text('name', 'default input')}
          label={text('label', 'Label')}
          surface={select('surface', surfaceOptions, 'light')}
          helperText={text('helperText', 'This is a helper text')}
          helperTextPlacement={select(
            'helperTextPlacement',
            ['right', 'bottom'],
            'bottom'
          )}
          transparentBackground={transparentBackgroundKnob}
          containsPii={boolean('containsPii', false)}
        />
      </Fragment>
    );
  })
  .add('Security Code', () => {
    const cardType = select('card type', cardTypes, '');
    const transparentBackgroundKnob = boolean('transparentBackground', false);
    return (
      <React.Fragment>
        <InvertedBackground
          surface={select('surface', surfaceOptions, 'light')}
          transparent={transparentBackgroundKnob}
        />
        <Input
          type="securityCode"
          cardType={cardType === '' ? undefined : cardType}
          label={text('label', 'Label')}
          disabled={boolean('disabled', false)}
          success={boolean('success', false)}
          error={boolean('error', false)}
          errorText={text('errorText', 'Not a Valid Security Code')}
          required={boolean('required', true)}
          readOnly={boolean('readOnly', false)}
          surface={select('surface', surfaceOptions, 'light')}
          helperText={text('helperText', 'This is a helper text')}
          helperTextPlacement={select(
            'helperTextPlacement',
            ['right', 'bottom'],
            'bottom'
          )}
          width={number('containerWidth', 328)}
          overflowEllipsis
          readOnlyBorders
          transparentBackground={transparentBackgroundKnob}
        />
      </React.Fragment>
    );
  })

  .add('Credit Card', () => {
    const transparentBackgroundKnob = boolean('transparentBackground', false);
    return (
      <React.Fragment>
        <InvertedBackground
          surface={select('surface', surfaceOptions, 'light')}
          transparent={transparentBackgroundKnob}
        />
        <Input
          type="creditCard"
          required={boolean('required', true)}
          disabled={boolean('disabled', false)}
          error={boolean('error', false)}
          errorText={text('errorText', 'Error Text')}
          readOnly={boolean('readOnly', false)}
          name={text('name', 'default input')}
          label={text('label', 'Label')}
          surface={select('surface', surfaceOptions, 'light')}
          helperText={text('helperText', 'This is a helper text')}
          helperTextPlacement={select(
            'helperTextPlacement',
            ['right', 'bottom'],
            'bottom'
          )}
          width={number('containerWidth', 328)}
          transparentBackground={transparentBackgroundKnob}
        />
      </React.Fragment>
    );
  })

  .add('Inline Action', () => {
    const transparentBackgroundKnob = boolean('transparentBackground', false);

    return (
      <React.Fragment>
        <InvertedBackground
          surface={select('surface', surfaceOptions, 'light')}
          transparent={transparentBackgroundKnob}
        />
        <Input
          type="inlineAction"
          onClickInlineAction={() =>
            alert('You have pressed the inline action button!')
          }
          inlineActionButtonLabel={text('inlineActionButtonLabel', 'Apply')}
          disabled={boolean('disabled', false)}
          TextLink={TextLink}
          error={boolean('error', false)}
          errorText={text('errorText', 'Error Text')}
          required={boolean('required', true)}
          success={boolean('success', false)}
          readOnly={boolean('readOnly', false)}
          name={text('name', 'default input')}
          label={text('label', 'Label')}
          surface={select('surface', surfaceOptions, 'light')}
          helperText={text('helperText', 'This is a helper text')}
          helperTextPlacement={select(
            'helperTextPlacement',
            ['right', 'bottom'],
            'bottom'
          )}
          width={number('containerWidth', 328)}
          transparentBackground={transparentBackgroundKnob}
        />
      </React.Fragment>
    );
  })

  .add('Password', () => {
    const transparentBackgroundKnob = boolean('transparentBackground', false);

    return (
      <React.Fragment>
        <InvertedBackground
          surface={select('surface', surfaceOptions, 'light')}
          transparent={transparentBackgroundKnob}
        />
        <Input
          type="password"
          mask={select('mask', ['always', 'toggle'], 'always')}
          disabled={boolean('disabled', false)}
          error={boolean('error', false)}
          success={boolean('success', false)}
          successText={text('successText', 'This is success text!')}
          errorText={text('errorText', 'Error Text')}
          required={boolean('required', true)}
          readOnly={boolean('readOnly', false)}
          name={text('name', 'default input')}
          label={text('label', 'Label')}
          surface={select('surface', surfaceOptions, 'light')}
          helperText={text('helperText', 'This is a helper text')}
          helperTextPlacement={select(
            'helperTextPlacement',
            ['right', 'bottom'],
            'bottom'
          )}
          width={number('containerWidth', 328)}
          transparentBackground={transparentBackgroundKnob}
        />
      </React.Fragment>
    );
  })

  .add('Phone Number', () => {
    const transparentBackgroundKnob = boolean('transparentBackground', false);

    return (
      <React.Fragment>
        <InvertedBackground
          surface={select('surface', surfaceOptions, 'light')}
          transparent={transparentBackgroundKnob}
        />
        <Input
          type="tel"
          success={boolean('success', false)}
          successText={text('successText', 'This is success text!')}
          label={text('label', 'Phone Number')}
          disabled={boolean('disabled', false)}
          error={boolean('error', false)}
          errorText={text('errorText', 'Not a Valid Number')}
          required={boolean('required', true)}
          surface={select('surface', surfaceOptions, 'light')}
          readOnly={boolean('readOnly', false)}
          helperText={text('helperText', 'This is a helper text')}
          helperTextPlacement={select(
            'helperTextPlacement',
            ['right', 'bottom'],
            'bottom'
          )}
          width={number('containerWidth', 328)}
          transparentBackground={transparentBackgroundKnob}
        />
      </React.Fragment>
    );
  })

  .add('Date', () => {
    const dateFormatKnob = select('dateFormat', dateFormats, 'mmyy');
    const transparentBackgroundKnob = boolean('transparentBackground', false);
    return (
      <React.Fragment>
        <InvertedBackground
          surface={select('surface', surfaceOptions, 'light')}
          transparent={transparentBackgroundKnob}
        />
        <Input
          success={boolean('success', false)}
          dateFormat={dateFormatKnob}
          type="date"
          required={boolean('required', false)}
          disabled={boolean('disabled', false)}
          error={boolean('error', false)}
          errorText={text('error text', 'Error Text')}
          readOnly={boolean('read only', false)}
          name={text('name', 'Expiration Date')}
          surface={select('surface', surfaceOptions, 'light')}
          width={number('containerWidth', 328)}
          label={text('label', 'Expiration date')}
          helperText={text('helperText', 'This is a helper text')}
          helperTextPlacement={select(
            'helperTextPlacement',
            ['right', 'bottom'],
            'bottom'
          )}
          transparentBackground={transparentBackgroundKnob}
        />
      </React.Fragment>
    );
  });
