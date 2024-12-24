import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  select,
  boolean,
  number,
  text,
} from '@storybook/addon-knobs';
import { Image } from '.';

const ratioOptions = ['16:9', '8:3', '4:3', '2:3', '4:9', '1:2', '1:1'];
const testOnClick = () => alert('The image has been clicked!');

const ImageWrapper = styled.div`
  max-width: ${({ maxWidth }) => maxWidth};
`;

const stories = storiesOf('Brand3.0/Images', module);

stories.addDecorator(withKnobs).add('Image', () => {
  const testUrl =
    'https://www.verizon.com/business/content/dam/img/campaigns/gateway.jpg';
  const webpUrl =
    'https://www.verizon.com/business/content/dam/img/campaigns/gateway.webp';

  let sources = [
    //Prioritize Webp over jpeg
    {
      type: 'image/webp',
      srcset: text('Webp URL', webpUrl),
    },
  ];
  const wrapperWidthKnob = text('Wrapper max-width', '400px');
  return (
    <ImageWrapper maxWidth={wrapperWidthKnob}>
      <Image
        url={testUrl}
        constrainToWidth={boolean('Constrain to Width', false)}
        constrainToHeight={boolean('Constrain to Height', false)}
        hasAspectRatio={boolean('hasAspectRatio', false)}
        ratio={select('ratio', ratioOptions, '8:3')}
        alt={text('Alternative Text', 'Alt')}
        role={text('Role Text', 'role')}
        ariaLabel={text('ARIA label', 'ARIA label text')}
        onClick={testOnClick}
        sources={sources}
        focusX={select('Focus X', ['center', 'left', 'right'], 'center')}
        focusY={select('Focus Y', ['center', 'top', 'bottom'], 'center')}
        size={text('size', '')}
        lazy={boolean('lazy', false)}
      />
    </ImageWrapper>
  );
});
