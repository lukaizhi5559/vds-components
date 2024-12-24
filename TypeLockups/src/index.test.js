import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import {
  TitleLockup,
  TitleLockupTitle,
  TitleLockupSubtitle,
  TitleLockupEyebrow,
} from '.';
import { ColorTokens } from '@vds-tokens/color';

const primitive = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'p'];
const size = [
  'bodySmall',
  'bodyMedium',
  'bodyLarge',
  'titleSmall',
  'titleMedium',
  'titleLarge',
];
const fixedSize = ['bodySmall', 'bodyMedium'];
const sizeTitle = [
  'bodySmall',
  'bodyMedium',
  'bodyLarge',
  'titleSmall',
  'titleMedium',
  'titleLarge',
  'titleXLarge',
  'title2XLarge',
  'featureXSmall',
  'featureSmall',
  'featureMedium',
];
const eyeMobile0 = ['bodySmall', 'bodyMedium', 'bodyLarge'];
const eyeMobile1 = ['titleSmall', 'titleMedium', 'titleLarge'];
const eyeMobile2 = ['title2XLarge', 'featureXSmall', 'featureSmall'];
const eyeDesktop1 = ['titleSmall', 'titleMedium'];
const eyeDesktop2 = [
  'title2XLarge',
  'featureXSmall',
  'featureSmall',
  'featureMedium',
];

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
}

function rgbToHex(rgb) {
  rgb = rgb
    .substr(4)
    .split(')')[0]
    .split(', ');
  return (
    '#' +
    componentToHex(rgb[0]) +
    componentToHex(rgb[1]) +
    componentToHex(rgb[2])
  );
}

jest.mock('uuid', () => ({ v4: () => '123456789' }));

test('TitleLockup defaults & textAlignment', () => {
  const { container } = render(
    <TitleLockup viewport="desktop">
      <TitleLockupEyebrow>Eyebrow</TitleLockupEyebrow>
      <TitleLockupTitle>Title textAlignment</TitleLockupTitle>
      <TitleLockupSubtitle>Subtitle</TitleLockupSubtitle>
    </TitleLockup>
  );
  expect(container).toMatchSnapshot();
  //Find styling props
  expect(container.firstChild).toHaveStyleRule('text-align', 'left');

  //Textalign styles inherited from TitleLockup wrapper to Eyebrow
  const eyeWrap = container.firstChild.firstChild;
  expect(eyeWrap).toHaveStyleRule('text-align', 'inherit');

  const eyeBrow = container.firstChild.firstChild.firstChild;
  expect(eyeBrow).toHaveStyleRule(
    'color',
    ColorTokens.elements.primary.onlight.value
  );
  expect(eyeBrow).toHaveStyleRule('font-weight', '400');

  //Textalign styles inherited from TitleLockup wrapper to Title
  const tWrap = container.querySelector('[class^="TitleWrapper"]');
  expect(tWrap).toHaveStyleRule('text-align', 'inherit');
  expect(tWrap).toHaveStyleRule('margin-bottom', '12px');

  expect(tWrap.firstChild).toHaveStyleRule(
    'color',
    ColorTokens.elements.primary.onlight.value
  );
  expect(tWrap.firstChild).toHaveStyleRule('font-size', '2rem');
  expect(tWrap.firstChild).toHaveStyleRule('font-weight', '700');
  expect(tWrap.firstChild).toHaveStyleRule('line-height', '2.25rem');
  expect(tWrap.firstChild).toHaveStyleRule(
    'font-family',
    'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
  );
  expect(tWrap.firstChild).toHaveStyleRule('letter-spacing', undefined);

  //Textalign styles inherited from TitleLockup wrapper to subTitle
  const sWrap = container.querySelector('[class^="SubtitleWrapper"]');
  expect(sWrap).toHaveStyleRule('text-align', 'inherit');
  expect(sWrap.firstChild).toHaveStyleRule('color', '#000000');
  expect(sWrap.firstChild).toHaveStyleRule('font-weight', '400');
});

test('TitleLockup defaults & textAlignment inverted', () => {
  const { container } = render(
    <TitleLockup viewport="desktop" surface="dark">
      <TitleLockupEyebrow>Eyebrow</TitleLockupEyebrow>
      <TitleLockupTitle>Title textAlignment</TitleLockupTitle>
      <TitleLockupSubtitle>Subtitle</TitleLockupSubtitle>
    </TitleLockup>
  );
  expect(container).toMatchSnapshot();
  //Find styling props
  expect(container.firstChild).toHaveStyleRule('text-align', 'left');

  //Textalign styles inherited from TitleLockup wrapper to Eyebrow
  const eyeWrap = container.firstChild.firstChild;
  expect(eyeWrap).toHaveStyleRule('text-align', 'inherit');

  const eyeWrapChild = container.firstChild.firstChild.firstChild;
  expect(eyeWrapChild).toHaveStyleRule('color', '#ffffff');
  expect(eyeWrapChild).toHaveStyleRule('font-weight', '400');

  //Textalign styles inherited from TitleLockup wrapper to Title
  const tWrap = container.querySelector('[class^="TitleWrapper"]');
  expect(tWrap).toHaveStyleRule('text-align', 'inherit');
  expect(tWrap).toHaveStyleRule('margin-bottom', '12px');

  const tWrapChild = tWrap.firstChild;
  expect(tWrapChild).toHaveStyleRule('color', '#ffffff');
  expect(tWrapChild).toHaveStyleRule('font-size', '2rem');
  expect(tWrapChild).toHaveStyleRule('font-weight', '700');
  expect(tWrapChild).toHaveStyleRule('line-height', '2.25rem');
  expect(tWrapChild).toHaveStyleRule(
    'font-family',
    'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
  );
  expect(tWrapChild).toHaveStyleRule('letter-spacing', undefined);

  //Textalign styles inherited from TitleLockup wrapper to subTitle
  const sWrap = container.querySelector('[class^="SubtitleWrapper"]');
  expect(sWrap).toHaveStyleRule('text-align', 'inherit');

  const sWrapChild = sWrap.firstChild;
  expect(sWrapChild).toHaveStyleRule('color', '#ffffff');
  expect(sWrapChild).toHaveStyleRule('font-weight', '400');
});

test('TitleLockup textAlignment center', () => {
  const { container } = render(
    <TitleLockup textAlignment="center">
      <TitleLockupEyebrow>Eyebrow</TitleLockupEyebrow>
      <TitleLockupTitle>Title textAlignment</TitleLockupTitle>
      <TitleLockupSubtitle>Subtitle</TitleLockupSubtitle>
    </TitleLockup>
  );
  expect(container).toMatchSnapshot();
  //Find styling props
  expect(container.firstChild).toHaveStyleRule('text-align', 'center');

  //Textalign styles inherited from TitleLockup wrapper to Eyebrow
  expect(container.firstChild.firstChild).toHaveStyleRule(
    'text-align',
    'inherit'
  );

  //Textalign styles inherited from TitleLockup wrapper to Title
  const tWrap = container.querySelector('[class^="TitleWrapper"]');
  expect(tWrap).toHaveStyleRule('text-align', 'inherit');

  //Textalign styles inherited from TitleLockup wrapper to subTitle
  const sWrap = container.querySelector('[class^="SubtitleWrapper"]');
  expect(sWrap).toHaveStyleRule('text-align', 'inherit');
});

test(`Eyebrow & Title padding in mobile for indexOf TitleSize < 3`, () => {
  eyeMobile0.forEach(eyeMobile0 => {
    const { container } = render(
      <TitleLockup viewport="mobile">
        <TitleLockupEyebrow>Eyebrow</TitleLockupEyebrow>
        <TitleLockupTitle size={eyeMobile0}>Title</TitleLockupTitle>
        <TitleLockupSubtitle>Subtitle</TitleLockupSubtitle>
      </TitleLockup>
    );
    expect(container.firstChild.firstChild).toHaveStyleRule(
      'padding-bottom',
      '4px'
    );
    const tWrap = container.querySelector('[class^="TitleWrapper"]');
    expect(tWrap).toHaveStyleRule('margin-bottom', '4px');
  });
});

test(`Eyebrow & Title padding in mobile for indexOf TitleSize < 6`, () => {
  eyeMobile1.forEach(eyeMobile1 => {
    const { container } = render(
      <TitleLockup viewport="mobile">
        <TitleLockupEyebrow>Eyebrow</TitleLockupEyebrow>
        <TitleLockupTitle size={eyeMobile1}>Title</TitleLockupTitle>
        <TitleLockupSubtitle>Subtitle</TitleLockupSubtitle>
      </TitleLockup>
    );
    expect(container.firstChild.firstChild).toHaveStyleRule(
      'padding-bottom',
      '8px'
    );
    const tWrap = container.querySelector('[class^="TitleWrapper"]');
    expect(tWrap).toHaveStyleRule('margin-bottom', '8px');
  });
});

test(`Eyebrow & Title padding in mobile for indexOf TitleSize = 6`, () => {
  const { container } = render(
    <TitleLockup viewport="mobile">
      <TitleLockupEyebrow>Eyebrow</TitleLockupEyebrow>
      <TitleLockupTitle size={'titleXLarge'}>Title</TitleLockupTitle>
      <TitleLockupSubtitle>Subtitle</TitleLockupSubtitle>
    </TitleLockup>
  );
  expect(container.firstChild.firstChild).toHaveStyleRule(
    'padding-bottom',
    '12px'
  );
  const tWrap = container.querySelector('[class^="TitleWrapper"]');
  expect(tWrap).toHaveStyleRule('margin-bottom', '12px');
});

test(`Eyebrow & Title padding in mobile for indexOf TitleSize >6 & <= 9`, () => {
  eyeMobile2.forEach(eyeMobile2 => {
    const { container } = render(
      <TitleLockup viewport="mobile">
        <TitleLockupEyebrow>Eyebrow</TitleLockupEyebrow>
        <TitleLockupTitle size={eyeMobile2}>Title</TitleLockupTitle>
        <TitleLockupSubtitle>Subtitle</TitleLockupSubtitle>
      </TitleLockup>
    );
    expect(container.firstChild.firstChild).toHaveStyleRule(
      'padding-bottom',
      '12px'
    );
    const tWrap = container.querySelector('[class^="TitleWrapper"]');
    expect(tWrap).toHaveStyleRule('margin-bottom', '16px');
  });
});

test(`Eyebrow & Title padding in mobile for indexOf TitleSize > 9`, () => {
  const { container } = render(
    <TitleLockup viewport="mobile">
      <TitleLockupEyebrow>Eyebrow</TitleLockupEyebrow>
      <TitleLockupTitle size="featureMedium">Title</TitleLockupTitle>
      <TitleLockupSubtitle>Subtitle</TitleLockupSubtitle>
    </TitleLockup>
  );
  expect(container.firstChild.firstChild).toHaveStyleRule(
    'padding-bottom',
    '16px'
  );
  const tWrap = container.querySelector('[class^="TitleWrapper"]');
  expect(tWrap).toHaveStyleRule('margin-bottom', '24px');
});

test(`Eyebrow & Title padding in mobile for indexOf TitleSize > 6 & otherSize is bodyLarge`, () => {
  const { container } = render(
    <TitleLockup viewport="mobile">
      <TitleLockupEyebrow>Eyebrow</TitleLockupEyebrow>
      <TitleLockupTitle size={'featureMedium'}>Title</TitleLockupTitle>
      <TitleLockupSubtitle size="bodyLarge">Subtitle</TitleLockupSubtitle>
    </TitleLockup>
  );
  expect(container.firstChild.firstChild).toHaveStyleRule(
    'padding-bottom',
    '12px'
  );
  const tWrap = container.querySelector('[class^="TitleWrapper"]');
  expect(tWrap).toHaveStyleRule('margin-bottom', '24px');
});

test(`Eyebrow & Title padding in desktop for indexOf TitleSize < 5`, () => {
  eyeDesktop1.forEach(eyeDesktop1 => {
    const { container } = render(
      <TitleLockup viewport="desktop">
        <TitleLockupEyebrow>Eyebrow</TitleLockupEyebrow>
        <TitleLockupTitle size={eyeDesktop1}>Title</TitleLockupTitle>
        <TitleLockupSubtitle>Subtitle</TitleLockupSubtitle>
      </TitleLockup>
    );
    expect(container.firstChild.firstChild).toHaveStyleRule(
      'padding-bottom',
      '8px'
    );
    const tWrap = container.querySelector('[class^="TitleWrapper"]');
    expect(tWrap).toHaveStyleRule('margin-bottom', '8px');
  });
});

test(`Eyebrow & Title padding in desktop for indexOf TitleSize = 5`, () => {
  const { container } = render(
    <TitleLockup viewport="desktop">
      <TitleLockupEyebrow>Eyebrow</TitleLockupEyebrow>
      <TitleLockupTitle size="titleLarge">Title</TitleLockupTitle>
      <TitleLockupSubtitle>Subtitle</TitleLockupSubtitle>
    </TitleLockup>
  );
  expect(container.firstChild.firstChild).toHaveStyleRule(
    'padding-bottom',
    '12px'
  );
  const tWrap = container.querySelector('[class^="TitleWrapper"]');
  expect(tWrap).toHaveStyleRule('margin-bottom', '12px');
});

test(`Eyebrow & Title padding in desktop for indexOf TitleSize = 3`, () => {
  const { container } = render(
    <TitleLockup viewport="desktop">
      <TitleLockupEyebrow>Eyebrow</TitleLockupEyebrow>
      <TitleLockupTitle size="titleXLarge">Title</TitleLockupTitle>
      <TitleLockupSubtitle>Subtitle</TitleLockupSubtitle>
    </TitleLockup>
  );
  expect(container.firstChild.firstChild).toHaveStyleRule(
    'padding-bottom',
    '12px'
  );
  const tWrap = container.querySelector('[class^="TitleWrapper"]');
  expect(tWrap).toHaveStyleRule('margin-bottom', '16px');
});

test(`Eyebrow & Title padding in desktop for indexOf TitleSize > 6`, () => {
  eyeDesktop2.forEach(eyeDesktop2 => {
    const { container } = render(
      <TitleLockup viewport="desktop">
        <TitleLockupEyebrow>Eyebrow</TitleLockupEyebrow>
        <TitleLockupTitle size={eyeDesktop2}>Title</TitleLockupTitle>
        <TitleLockupSubtitle>Subtitle</TitleLockupSubtitle>
      </TitleLockup>
    );
    expect(container.firstChild.firstChild).toHaveStyleRule(
      'padding-bottom',
      ['featureSmall', 'featureMedium'].includes(eyeDesktop2) ? '16px' : '12px'
    );
    const tWrap = container.querySelector('[class^="TitleWrapper"]');
    expect(tWrap).toHaveStyleRule('margin-bottom', '24px');
  });
});

test(`Eyebrow & Title padding in desktop for indexOf TitleSize > 6 & otherSize is bodyLarge`, () => {
  eyeDesktop2.forEach(eyeDesktop2 => {
    const { container } = render(
      <TitleLockup viewport="desktop">
        <TitleLockupEyebrow size="bodyLarge">Eyebrow</TitleLockupEyebrow>
        <TitleLockupTitle size={eyeDesktop2}>Title</TitleLockupTitle>
        <TitleLockupSubtitle size="bodyLarge">Subtitle</TitleLockupSubtitle>
      </TitleLockup>
    );
    expect(container.firstChild.firstChild).toHaveStyleRule(
      'padding-bottom',
      '12px'
    );
    const tWrap = container.querySelector('[class^="TitleWrapper"]');
    expect(tWrap).toHaveStyleRule('margin-bottom', '24px');
  });
});

test(`realSubtitleSize !== undefined && realEyebrowSize === undefined`, () => {
  const { container } = render(
    <TitleLockup viewport="desktop">
      <TitleLockupEyebrow>Eyebrow</TitleLockupEyebrow>
      <TitleLockupTitle size="featureMedium">Title</TitleLockupTitle>
      <TitleLockupSubtitle size="bodyLarge">Subtitle</TitleLockupSubtitle>
    </TitleLockup>
  );

  expect(container.firstChild.firstChild.firstChild).toHaveStyleRule(
    'font-size',
    '1rem'
  );
});

test('TitleLockupEyebrow default', () => {
  const content = 'TitleLockupEyebrow default';
  const { getByText, container } = render(
    <TitleLockupEyebrow>{content}</TitleLockupEyebrow>
  );
  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);
  const elem = container.querySelector('h3');
  expect(elem).toBeInTheDocument();

  expect(container.firstChild.firstChild).toHaveStyleRule(
    'color',
    ColorTokens.elements.primary.onlight.value
  );
  expect(container.firstChild.firstChild).toHaveStyleRule('font-weight', '400');

  //testing Textalign styles being inherited from the TitleLockup wrapper
  expect(container.firstChild).toHaveStyleRule('text-align', 'inherit');
});

test('TitleLockupEyebrow default inverted', () => {
  const content = 'TitleLockupEyebrow inverted';
  const { getByText, container } = render(
    <TitleLockupEyebrow surface="dark" primitive="h2" bold={false}>
      {content}
    </TitleLockupEyebrow>
  );
  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);
  const elem = container.querySelector('h2');
  expect(elem).toBeInTheDocument();

  expect(container.firstChild.firstChild).toHaveStyleRule('color', '#ffffff');
  expect(container.firstChild.firstChild).toHaveStyleRule('font-weight', '400');
});

test(`TitleLockupEyebrow primitive`, () => {
  primitive.forEach(primitive => {
    const { container } = render(
      <TitleLockupEyebrow primitive={primitive}>Eyebrow</TitleLockupEyebrow>
    );
    const elem = container.querySelector(primitive);
    expect(elem).toBeInTheDocument();
  });
});

test(`TitleLockupEyebrow size`, () => {
  size.forEach(size => {
    const { container } = render(
      <TitleLockupEyebrow size={size}>Eyebrow</TitleLockupEyebrow>
    );

    expect(container.firstChild.firstChild).toHaveStyleRule(
      'font-size',
      `${
        size === 'bodySmall'
          ? '0.75rem'
          : size === 'bodyMedium'
          ? '0.875rem'
          : size === 'bodyLarge'
          ? '1rem'
          : size === 'titleSmall'
          ? '1.25rem'
          : size === 'titleMedium'
          ? '1.5rem'
          : '2rem'
      }`
    );

    expect(container.firstChild.firstChild).toHaveStyleRule(
      'line-height',
      `${
        size === 'bodySmall'
          ? '1rem'
          : size === 'bodyMedium'
          ? '1.125rem'
          : size === 'bodyLarge'
          ? '1.25rem'
          : size === 'titleSmall'
          ? '1.5rem'
          : size === 'titleMedium'
          ? '1.75rem'
          : '2.25rem'
      }`
    );

    expect(container.firstChild.firstChild).toHaveStyleRule(
      'font-family',
      `${
        size === 'bodySmall'
          ? 'Verizon-NHG-eTX,Helvetica,Arial,Sans-serif'
          : 'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
      }`
    );
  });
});

test('TitleLockupTitle default', () => {
  const content = 'TitleLockupTitle default';
  const { getByText, container } = render(
    <TitleLockupTitle>{content}</TitleLockupTitle>
  );
  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);
  const elem = container.querySelector('h1');
  expect(elem).toBeInTheDocument();

  const child = container.firstChild.firstChild;
  expect(child).toHaveStyleRule(
    'color',
    ColorTokens.elements.primary.onlight.value
  );
  expect(child).toHaveStyleRule('font-size', '2rem');
  expect(child).toHaveStyleRule('font-weight', '700');
  expect(child).toHaveStyleRule('line-height', '2.25rem');
  expect(child).toHaveStyleRule(
    'font-family',
    'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
  );
  expect(child).toHaveStyleRule('letter-spacing', undefined);

  //testing Textalign styles being inherited from the TitleLockup wrapper
  expect(container.firstChild).toHaveStyleRule('text-align', 'inherit');
  expect(container.firstChild).toHaveStyleRule('margin-bottom', '12px');
});

test('TitleLockupTitle default inverted', () => {
  const content = 'TitleLockupTitle inverted';
  const { getByText, container } = render(
    <TitleLockupTitle surface="dark" primitive="h2" bold={false}>
      {content}
    </TitleLockupTitle>
  );
  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);
  const elem = container.querySelector('h2');
  expect(elem).toBeInTheDocument();

  const child = container.firstChild.firstChild;
  expect(child).toHaveStyleRule('color', '#ffffff');
  expect(child).toHaveStyleRule('font-size', '2rem');
  expect(child).toHaveStyleRule('font-weight', '300');
  expect(child).toHaveStyleRule('line-height', '2.25rem');
  expect(child).toHaveStyleRule(
    'font-family',
    'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
  );
  expect(child).toHaveStyleRule('letter-spacing', '0.015625rem');
});

test(`TitleLockupTitle primitive`, () => {
  primitive.forEach(primitive => {
    const { container } = render(
      <TitleLockupTitle primitive={primitive}>
        TitleLockupTitle
      </TitleLockupTitle>
    );
    const elem = container.querySelector(primitive);
    expect(elem).toBeInTheDocument();
  });
});

test(`TitleLockupTitle size`, () => {
  sizeTitle.forEach(sizeTitle => {
    const { container } = render(
      <TitleLockupTitle size={sizeTitle}>Eyebrow</TitleLockupTitle>
    );

    expect(container.firstChild.firstChild).toHaveStyleRule(
      'font-size',
      `${
        sizeTitle === 'bodySmall'
          ? '0.75rem'
          : sizeTitle === 'bodyMedium'
          ? '0.875rem'
          : sizeTitle === 'bodyLarge'
          ? '1rem'
          : sizeTitle === 'titleSmall'
          ? '1.25rem'
          : sizeTitle === 'titleMedium'
          ? '1.5rem'
          : sizeTitle === 'titleLarge'
          ? '2rem'
          : sizeTitle === 'titleXLarge'
          ? '3rem'
          : sizeTitle === 'title2XLarge' || sizeTitle === 'featureXSmall'
          ? '4rem'
          : sizeTitle === 'featureSmall'
          ? '5rem'
          : '6rem'
      }`
    );

    expect(container.firstChild.firstChild).toHaveStyleRule(
      'line-height',
      `${
        sizeTitle === 'bodySmall'
          ? '1rem'
          : sizeTitle === 'bodyMedium'
          ? '1.125rem'
          : sizeTitle === 'bodyLarge'
          ? '1.25rem'
          : sizeTitle === 'titleSmall'
          ? '1.5rem'
          : sizeTitle === 'titleMedium'
          ? '1.75rem'
          : sizeTitle === 'titleLarge'
          ? '2.25rem'
          : sizeTitle === 'titleXLarge'
          ? '3rem'
          : sizeTitle === 'title2XLarge' || sizeTitle === 'featureXSmall'
          ? '4rem'
          : sizeTitle === 'featureSmall'
          ? '4.75rem'
          : '5.5rem'
      }`
    );

    // expect(container.firstChild.firstChild).toHaveStyleRule(
    //   'font-family', 'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
    // );
  });
});

test('TitleLockupSubtitle default', () => {
  const content = 'TitleLockupSubtitle default';
  const { getByText, container } = render(
    <TitleLockupSubtitle>{content}</TitleLockupSubtitle>
  );
  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);
  const elem = container.querySelector('h2');
  expect(elem).toBeInTheDocument();

  expect(container.firstChild.firstChild).toHaveStyleRule('color', '#000000');
  expect(container.firstChild.firstChild).toHaveStyleRule('font-weight', '400');

  //testing Textalign styles being inherited from the TitleLockup wrapper
  expect(container.firstChild).toHaveStyleRule('text-align', 'inherit');
});

test('TitleLockupSubtitle default inverted', () => {
  const content = 'TitleLockupSubtitle inverted';
  const { getByText, container } = render(
    <TitleLockupSubtitle surface="dark" primitive="h3">
      {content}
    </TitleLockupSubtitle>
  );
  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);
  const elem = container.querySelector('h3');
  expect(elem).toBeInTheDocument();
  expect(container.firstChild.firstChild).toHaveStyleRule('color', '#ffffff');
});

test(`TitleLockupSubtitle primitive`, () => {
  primitive.forEach(primitive => {
    const { container } = render(
      <TitleLockupSubtitle primitive={primitive}>Eyebrow</TitleLockupSubtitle>
    );
    const elem = container.querySelector(primitive);
    expect(elem).toBeInTheDocument();
  });
});

test(`TitleLockupSubtitle size`, () => {
  size.forEach(size => {
    const { container } = render(
      <TitleLockupSubtitle size={size}>Eyebrow</TitleLockupSubtitle>
    );
    expect(container.firstChild.firstChild).toHaveStyleRule(
      'font-size',
      `${
        size === 'bodySmall'
          ? '0.75rem'
          : size === 'bodyMedium'
          ? '0.875rem'
          : size === 'bodyLarge'
          ? '1rem'
          : size === 'titleSmall'
          ? '1.25rem'
          : size === 'titleMedium'
          ? '1.5rem'
          : '2rem'
      }`
    );

    expect(container.firstChild.firstChild).toHaveStyleRule(
      'line-height',
      `${
        size === 'bodySmall'
          ? '1rem'
          : size === 'bodyMedium'
          ? '1.125rem'
          : size === 'bodyLarge'
          ? '1.25rem'
          : size === 'titleSmall'
          ? '1.5rem'
          : size === 'titleMedium'
          ? '1.75rem'
          : '2.25rem'
      }`
    );

    expect(container.firstChild.firstChild).toHaveStyleRule(
      'font-family',
      `${
        size === 'bodySmall'
          ? 'Verizon-NHG-eTX,Helvetica,Arial,Sans-serif'
          : 'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
      }`
    );
  });
});

describe('Render TileLockup ', () => {
  test('should render TitleLockupTitle properly in mobile', () => {
    const { getByText, container } = render(
      <TitleLockupTitle> TitleAccented </TitleLockupTitle>
    );
    fireEvent.click(container.firstChild.firstChild);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render TitleLockup with children', () => {
    const { getByText, container } = render(
      <TitleLockup textAlignment={'left'}>
        <TitleLockupEyebrow size={'titleLarge'} bold={true}>
          Today only.
        </TitleLockupEyebrow>
        <TitleLockupTitle size={'titleLarge'} bold={true}>
          And get more of our best
        </TitleLockupTitle>
        <TitleLockupSubtitle size={'titleLarge'} color={'secondary'}>
          Get both of our best and pay less. Pair 5G Home Internet with Verizon
          mobile to save every month.
        </TitleLockupSubtitle>
      </TitleLockup>
    );
    //fireEvent.click(container.firstChild.firstChild);
    expect(container).toMatchSnapshot();
  });

  test('should render TitleLockup with data object', () => {
    const dataObj = {
      eyebrow: {
        size: 'titleLarge',
        bold: true,
        primitive: 'h2',
        children: `test content`,
      },
      title: {
        size: 'titleLarge',
        bold: true,
        primitive: 'h2',
        children: `test content title`,
      },
      subtitle: {
        size: 'titleSmall',
        bold: true,
        primitive: 'h3',
        children: `test content subtitle`,
        color: 'primary',
      },
    };
    const { getByText, container } = render(
      <TitleLockup data={dataObj}></TitleLockup>
    );
    //fireEvent.click(container.firstChild.firstChild);

    // expect(getByText('test content')).toBeTruthy();
    // expect(getByText('test content title')).toBeTruthy();
    // expect(getByText('test content subtitle')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('should render TitleLockup with data object and viewport mobile', () => {
    const dataObj = {
      eyebrow: {
        size: 'titleLarge',
        bold: true,
        primitive: 'h2',
        children: `<div>test content</div>`,
      },
      title: {
        size: 'titleLarge',
        bold: true,
        primitive: 'h2',
        children: `test content title`,
      },
      subtitle: {
        size: 'titleSmall',
        bold: true,
        primitive: 'h3',
        children: `test content subtitle`,
        color: 'primary',
      },
    };
    const { getByText, container } = render(
      <TitleLockup data={dataObj} viewport={'mobile'}></TitleLockup>
    );
    //fireEvent.click(container.firstChild.firstChild);
    expect(container).toMatchSnapshot();
  });
  test('Uniform size - Title and subtitle or eyebrow should have same type and style', () => {
    const { container } = render(
      <TitleLockup>
        <TitleLockupEyebrow size={'bodyLarge'}>Eyebrow</TitleLockupEyebrow>
        <TitleLockupTitle size={'bodyLarge'}>Title</TitleLockupTitle>
        <TitleLockupSubtitle size={'bodyLarge'}>Subtitle</TitleLockupSubtitle>
      </TitleLockup>
    );
    const tWrap = container.querySelector('[class^="TitleWrapper"]').firstChild;
    expect(tWrap).toHaveStyleRule('font-size', '1rem');
    expect(tWrap).toHaveStyleRule(
      'font-family',
      'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
    );
    const eyeBrow = container.querySelector('[class^="EyebrowWrapper"]')
      .firstChild;
    expect(eyeBrow).toHaveStyleRule('font-size', '1rem');
    expect(eyeBrow).toHaveStyleRule(
      'font-family',
      'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
    );
    expect(container).toMatchSnapshot();
  });
  test('Uniform size is true and the title is bold, the eyebrow is always regular and has secondary color', () => {
    const { container } = render(
      <TitleLockup>
        <TitleLockupEyebrow size={'bodyLarge'}>Eyebrow</TitleLockupEyebrow>
        <TitleLockupTitle size={'bodyLarge'}>Title</TitleLockupTitle>
        <TitleLockupSubtitle size={'bodyLarge'}>Subtitle</TitleLockupSubtitle>
      </TitleLockup>
    );
    const tWrap = container.querySelector('[class^="TitleWrapper"]').firstChild;
    // title should be bold
    expect(tWrap).toHaveStyleRule('font-weight', '700');
    // title should be primary color
    expect(tWrap).toHaveStyleRule('color', '#000000');

    const eyeBrow = container.querySelector('[class^="EyebrowWrapper"]')
      .firstChild;
    // eyebrow as regular font
    expect(eyeBrow).toHaveStyleRule('font-weight', '400');
    // eyebrow with secondary color
    expect(eyeBrow).toHaveStyleRule('color', '#6f7171');
    expect(container).toMatchSnapshot();
  });
  test('Uniform size is true and the title is bold, the eyebrow is always regular and has secondary color Inverted', () => {
    const { container } = render(
      <TitleLockup surface="dark">
        <TitleLockupEyebrow size={'bodyLarge'}>Eyebrow</TitleLockupEyebrow>
        <TitleLockupTitle size={'bodyLarge'}>Title</TitleLockupTitle>
      </TitleLockup>
    );
    const tWrap = container.querySelector('[class^="TitleWrapper"]').firstChild;
    expect(tWrap).toHaveStyleRule('font-weight', '700');
    expect(tWrap).toHaveStyleRule('color', '#ffffff');

    const eyeBrow = container.querySelector('[class^="EyebrowWrapper"]')
      .firstChild;
    expect(eyeBrow).toHaveStyleRule('font-weight', '400');
    expect(eyeBrow).toHaveStyleRule('color', '#a7a7a7');
    expect(container).toMatchSnapshot();
  });
  test('Uniform size is true and the title is regular, the eyebrow is always bold and has primary color', () => {
    const { container } = render(
      <TitleLockup>
        <TitleLockupEyebrow size={'bodyLarge'}>Eyebrow</TitleLockupEyebrow>
        <TitleLockupTitle size={'bodyLarge'} bold={false}>
          Title
        </TitleLockupTitle>
        <TitleLockupSubtitle size={'bodyLarge'}>Subtitle</TitleLockupSubtitle>
      </TitleLockup>
    );
    const tWrap = container.querySelector('[class^="TitleWrapper"]').firstChild;
    // title should be regular weight
    expect(tWrap).toHaveStyleRule('font-weight', '400');
    // title should be primary color
    expect(tWrap).toHaveStyleRule('color', '#000000');

    const eyeBrow = container.querySelector('[class^="EyebrowWrapper"]')
      .firstChild;
    // eyebrow as regular font
    expect(eyeBrow).toHaveStyleRule('font-weight', '700');
    // eyebrow with secondary color
    expect(eyeBrow).toHaveStyleRule('color', '#000000');
    expect(container).toMatchSnapshot();
  });
  test('Uniform size is true and the title is regular, the eyebrow is always bold and has primary color Inverted', () => {
    const { container } = render(
      <TitleLockup surface="dark">
        <TitleLockupEyebrow size={'bodyLarge'}>Eyebrow</TitleLockupEyebrow>
        <TitleLockupTitle size={'bodyLarge'} bold={false}>
          Title
        </TitleLockupTitle>
      </TitleLockup>
    );
    const tWrap = container.querySelector('[class^="TitleWrapper"]').firstChild;
    expect(tWrap).toHaveStyleRule('font-weight', '400');
    expect(tWrap).toHaveStyleRule('color', '#ffffff');

    const eyeBrow = container.querySelector('[class^="EyebrowWrapper"]')
      .firstChild;
    expect(eyeBrow).toHaveStyleRule('font-weight', '700');
    expect(eyeBrow).toHaveStyleRule('color', '#ffffff');
    expect(container).toMatchSnapshot();
  });
  test('should render with eyebrowPadding', () => {
    const dataObj = {
      eyebrow: {
        size: 'titleMedium',
        bold: true,
        primitive: 'h2',
        children: `test content`,
      },
      title: {
        bold: true,
        primitive: 'h2',
        children: `test content title`,
      },
      subtitle: {
        size: 'titleSmall',
        bold: true,
        primitive: 'h3',
        children: `test content subtitle`,
        color: 'primary',
      },
    };
    const { container } = render(
      <TitleLockup viewport={'mobile'} data={dataObj}></TitleLockup>
    );

    expect(container).toMatchSnapshot();
  });
  test('should render with subtitle undefined', () => {
    const { container } = render(
      <TitleLockup viewport={'mobile'}>
        <TitleLockupEyebrow size={'titleLarge'} bold={true}>
          Today only.
        </TitleLockupEyebrow>
        <TitleLockupTitle size={'titleLarge'} bold={true}>
          And get more of our best
        </TitleLockupTitle>
        <TitleLockupSubtitle size={'titleLarge'} color={'secondary'}>
          Get both of our best and pay less.
        </TitleLockupSubtitle>
      </TitleLockup>
    );

    expect(container).toMatchSnapshot();
  });
  test('should render with title size as titleMedium and desktop viewport', () => {
    const { container } = render(
      <TitleLockup viewport={'desktop'}>
        <TitleLockupEyebrow size={'bodyLarge'} bold={true}>
          Today only.
        </TitleLockupEyebrow>
        <TitleLockupTitle size={'titleMedium'} bold={true}>
          And get more of our best
        </TitleLockupTitle>
        <TitleLockupSubtitle size={'bodyLarge'} color={'secondary'}>
          Get both of our best and pay less.
        </TitleLockupSubtitle>
      </TitleLockup>
    );

    expect(container).toMatchSnapshot();
  });

  test('should render with title size as titleMedium and mobile viewport', () => {
    const { container } = render(
      <TitleLockup viewport={'mobile'}>
        <TitleLockupEyebrow size={'bodyLarge'} bold={true}>
          Today only.
        </TitleLockupEyebrow>
        <TitleLockupTitle size={'titleMedium'} bold={true}>
          And get more of our best
        </TitleLockupTitle>
        <TitleLockupSubtitle size={'bodyLarge'} color={'secondary'}>
          Get both of our best and pay less.
        </TitleLockupSubtitle>
      </TitleLockup>
    );

    expect(container).toMatchSnapshot();
  });
  test('should render with title size as featureSmall and mobile viewport', () => {
    const { container } = render(
      <TitleLockup viewport={'mobile'}>
        <TitleLockupEyebrow size={'titleMedium'} bold={true}>
          Today only.
        </TitleLockupEyebrow>
        <TitleLockupTitle size={'titleLarge'} bold={true}>
          And get more of our best
        </TitleLockupTitle>
        <TitleLockupSubtitle size={'titleMedium'} color={'secondary'}>
          Get both of our best and pay less.
        </TitleLockupSubtitle>
      </TitleLockup>
    );

    expect(container).toMatchSnapshot();
  });
  test('should render with title with featureMedium size', () => {
    const { container } = render(
      <TitleLockup viewport={'mobile'}>
        <TitleLockupTitle size={'featureMedium'} bold={true}>
          And get more of our best
        </TitleLockupTitle>
      </TitleLockup>
    );
    expect(container).toMatchSnapshot();
  });
  test('should render with title with titleXLarge size in desktop viewport', () => {
    const { container } = render(
      <TitleLockup viewport={'desktop'}>
        <TitleLockupTitle size={'titleXLarge'} bold={true}>
          And get more of our best
        </TitleLockupTitle>
      </TitleLockup>
    );
    expect(container).toMatchSnapshot();
  });

  test('should render with child type titleLockupEyebrow', () => {
    const { container } = render(
      <TitleLockup>
        <TitleLockupEyebrow size={'bodyLarge'} bold={true}>
          Today only.
        </TitleLockupEyebrow>
      </TitleLockup>
    );

    expect(container).toMatchSnapshot();
  });

  test('should render with no child type', () => {
    const { container } = render(
      <TitleLockup>
        <div>hello</div>
      </TitleLockup>
    );

    expect(container).toMatchSnapshot();
  });
  test('test TitleLockupEyebrow  and TitleLockupSubtitle with size bodyLarge', () => {
    const { container } = render(
      <TitleLockup>
        <TitleLockupEyebrow size={'bodyLarge'}>Today only.</TitleLockupEyebrow>
        <TitleLockupSubtitle size={'bodyLarge'}>
          Get both of our best and pay less.
        </TitleLockupSubtitle>
      </TitleLockup>
    );
    expect(container).toMatchSnapshot();
  });
  test('test TitleLockupEyebrow with size titleXLarge and inverted', () => {
    const { container } = render(
      <TitleLockupEyebrow size={'titleLarge'} surface="dark">
        Today only.
      </TitleLockupEyebrow>
    );
    expect(container).toMatchSnapshot();
  });
  test('test TitleLockupEyebrow with size bodyMedium', () => {
    const { container } = render(
      <TitleLockupEyebrow size={'bodyMedium'} surface="dark">
        Today only.
      </TitleLockupEyebrow>
    );
    expect(container).toMatchSnapshot();
  });
  test('test TitleLockupEyebrow with size titleLarge', () => {
    const { container } = render(
      <TitleLockupEyebrow size={'titleLarge'} surface="dark">
        Today only.
      </TitleLockupEyebrow>
    );
    expect(container).toMatchSnapshot();
  });

  test('test TitleLockupSubtitle and  with size bodyLarge', () => {
    const { container } = render(
      <TitleLockupSubtitle size={'bodyLarge'} surface="dark">
        Get both of our best and pay less.
      </TitleLockupSubtitle>
    );
    expect(container).toMatchSnapshot();
  });
  test('test TitleLockupSubtitle and  with size bodyMedium', () => {
    const { container } = render(
      <TitleLockupSubtitle size={'bodyMedium'}>
        Get both of our best and pay less.
      </TitleLockupSubtitle>
    );
    expect(container).toMatchSnapshot();
  });
  test('test TitleLockupSubtitle and  with size titleLarge', () => {
    const { container } = render(
      <TitleLockupSubtitle size={'titleLarge'}>
        Get both of our best and pay less.
      </TitleLockupSubtitle>
    );
    expect(container).toMatchSnapshot();
  });
  test('test TitleLockupSubtitle and  with size titleXLarge', () => {
    const { container } = render(
      <TitleLockupSubtitle size={'titleLarge'}>
        Get both of our best and pay less.
      </TitleLockupSubtitle>
    );
    expect(container).toMatchSnapshot();
  });
  test('test TitleLockupTitle and  with size featureXSmall', () => {
    const { container } = render(
      <TitleLockupTitle size={'featureXSmall'} surface="dark">
        Get both of our best and pay less.
      </TitleLockupTitle>
    );
    expect(container).toMatchSnapshot();
  });
  test('test TitleLockupTitle and  with size featureSmall', () => {
    const { container } = render(
      <TitleLockupTitle size={'featureSmall'}>
        Get both of our best and pay less.
      </TitleLockupTitle>
    );
    expect(container).toMatchSnapshot();
  });
  test('test TitleLockupTitle and  with size titleXLarge', () => {
    const { container } = render(
      <TitleLockupTitle size={'titleXLarge'}>
        Get both of our best and pay less.
      </TitleLockupTitle>
    );
    expect(container).toMatchSnapshot();
  });
  test('test TitleLockupTitle and  with size titleXLarge', () => {
    const { container } = render(
      <TitleLockupTitle size={'titleXLarge'} viewport="mobile">
        Get both of our best and pay less.
      </TitleLockupTitle>
    );
    expect(container).toMatchSnapshot();
  });
  test('test TitleLockupTitle and  with size featureMedium', () => {
    const { container } = render(
      <TitleLockupTitle size={'featureMedium'} viewport="mobile">
        Get both of our best and pay less.
      </TitleLockupTitle>
    );
    expect(container).toMatchSnapshot();
  });
  test('test TitleLockupTitle and  with size titleSmall', () => {
    const { container } = render(
      <TitleLockupTitle size={'titleSmall'}>
        Get both of our best and pay less.
      </TitleLockupTitle>
    );
    expect(container).toMatchSnapshot();
  });
  test(`test TitleLockupTitle with size 'bodySmall', 'bodyMedium', 'bodyLarge'`, () => {
    ['bodySmall', 'bodyMedium', 'bodyLarge'].forEach(titleSize => {
      const { container } = render(
        <TitleLockupTitle size={titleSize}>
          Get both of our best and pay less.
        </TitleLockupTitle>
      );
      expect(container).toMatchSnapshot();
    });
  });
});
describe('TitleLockup tooltip', () => {
  test(`should render default`, () => {
    const { container } = render(
      <TitleLockup viewport="desktop">
        <TitleLockupEyebrow
          tooltip={{
            title: 'Eyebrow Tooltip',
            children: 'Tooltip content',
            closeButtonText: 'close',
          }}
        >
          Eyebrow
        </TitleLockupEyebrow>
        <TitleLockupTitle
          tooltip={{
            title: 'Title Tooltip',
            children: 'Tooltip content',
            closeButtonText: 'close',
            containerId: 'containerId',
          }}
        >
          Title textAlignment
        </TitleLockupTitle>
        <TitleLockupSubtitle
          tooltip={{
            title: 'Subtitle Tooltip',
            children: 'Tooltip content',
            closeButtonText: 'close',
          }}
        >
          Subtitle
        </TitleLockupSubtitle>
      </TitleLockup>
    );
    //expect(container).toMatchSnapshot();
  });

  test(`should render Tooltip for Title`, () => {
    sizeTitle.forEach(sizeTitle => {
      const { container } = render(
        <TitleLockupTitle
          size={sizeTitle}
          tooltip={{
            title: 'Title Tooltip',
            children: 'Tooltip content',
            closeButtonText: 'close',
            containerId: 'containerId',
          }}
        >
          Title
        </TitleLockupTitle>
      );
      //expect(container).toMatchSnapshot();
      const tooltipIcon = container.querySelector(
        '[class^="ButtonIconContainer"] svg'
      );
      expect(tooltipIcon).toHaveStyleRule(
        'height',
        `${
          sizeTitle === 'bodySmall'
            ? '1rem'
            : sizeTitle === 'bodyMedium'
            ? '1rem'
            : sizeTitle === 'bodyLarge'
            ? '1.25rem'
            : sizeTitle === 'titleSmall'
            ? '1.25rem'
            : sizeTitle === 'titleMedium'
            ? '1.25rem'
            : sizeTitle === 'titleLarge'
            ? '1.25rem'
            : sizeTitle === 'titleXLarge'
            ? '1.25rem'
            : sizeTitle === 'title2XLarge' || sizeTitle === 'featureXSmall'
            ? '1.25rem'
            : sizeTitle === 'featureSmall'
            ? '1.25rem'
            : '1.25rem'
        }`
      );
      expect(tooltipIcon).toHaveStyleRule(
        'width',
        `${
          sizeTitle === 'bodySmall'
            ? '1rem'
            : sizeTitle === 'bodyMedium'
            ? '1rem'
            : sizeTitle === 'bodyLarge'
            ? '1.25rem'
            : sizeTitle === 'titleSmall'
            ? '1.25rem'
            : sizeTitle === 'titleMedium'
            ? '1.25rem'
            : sizeTitle === 'titleLarge'
            ? '1.25rem'
            : sizeTitle === 'titleXLarge'
            ? '1.25rem'
            : sizeTitle === 'title2XLarge' || sizeTitle === 'featureXSmall'
            ? '1.25rem'
            : sizeTitle === 'featureSmall'
            ? '1.25rem'
            : '1.25rem'
        }`
      );
    });
  });

  test(`should render Tooltip for Eyebrow`, () => {
    size.forEach(size => {
      const { container } = render(
        <TitleLockupEyebrow
          size={size}
          tooltip={{
            title: 'Eyebrow Tooltip',
            children: 'Tooltip content',
            closeButtonText: 'close',
          }}
        >
          Eyebrow
        </TitleLockupEyebrow>
      );
      //expect(container).toMatchSnapshot();
      const tooltipIcon = container.querySelector(
        '[class^="ButtonIconContainer"] svg'
      );
      expect(tooltipIcon).toHaveStyleRule(
        'height',
        `${
          size === 'bodySmall'
            ? '1rem'
            : size === 'bodyMedium'
            ? '1rem'
            : size === 'bodyLarge'
            ? '1.25rem'
            : size === 'titleSmall'
            ? '1.25rem'
            : size === 'titleMedium'
            ? '1.25rem'
            : size === 'titleLarge'
            ? '1.25rem'
            : '1rem'
        }`
      );

      expect(tooltipIcon).toHaveStyleRule(
        'width',
        `${
          size === 'bodySmall'
            ? '1rem'
            : size === 'bodyMedium'
            ? '1rem'
            : size === 'bodyLarge'
            ? '1.25rem'
            : size === 'titleSmall'
            ? '1.25rem'
            : size === 'titleMedium'
            ? '1.25rem'
            : size === 'titleLarge'
            ? '1.25rem'
            : '1rem'
        }`
      );
    });
  });

  test(`should render Tooltip for Subtitle`, () => {
    size.forEach(size => {
      const { container } = render(
        <TitleLockupSubtitle
          size={size}
          tooltip={{
            title: 'Subtitle Tooltip',
            children: 'Tooltip content',
            closeButtonText: 'close',
          }}
        >
          Subtitle
        </TitleLockupSubtitle>
      );
      //expect(container).toMatchSnapshot();
      const tooltipIcon = container.querySelector(
        '[class^="ButtonIconContainer"] svg'
      );
      expect(tooltipIcon).toHaveStyleRule(
        'height',
        `${
          size === 'bodySmall'
            ? '1rem'
            : size === 'bodyMedium'
            ? '1rem'
            : size === 'bodyLarge'
            ? '1.25rem'
            : size === 'titleSmall'
            ? '1.25rem'
            : size === 'titleMedium'
            ? '1.25rem'
            : size === 'titleLarge'
            ? '1.25rem'
            : '1rem'
        }`
      );

      expect(tooltipIcon).toHaveStyleRule(
        'width',
        `${
          size === 'bodySmall'
            ? '1rem'
            : size === 'bodyMedium'
            ? '1rem'
            : size === 'bodyLarge'
            ? '1.25rem'
            : size === 'titleSmall'
            ? '1.25rem'
            : size === 'titleMedium'
            ? '1.25rem'
            : size === 'titleLarge'
            ? '1.25rem'
            : '1rem'
        }`
      );
    });
  });

  test(`should render Tooltip with configurable size`, () => {
    sizeTitle.forEach(sizeTitle => {
      const { container } = render(
        <TitleLockupTitle
          size={sizeTitle}
          tooltip={{
            title: 'Title Tooltip',
            children: 'Tooltip content',
            closeButtonText: 'close',
            containerId: 'containerId',
            size: 'small',
          }}
        >
          Title
        </TitleLockupTitle>
      );
      //expect(container).toMatchSnapshot();
      const tooltipIcon = container.querySelector(
        '[class^="ButtonIconContainer"] svg'
      );
      expect(tooltipIcon).toHaveStyleRule(
        'height',
        `${
          size === 'bodySmall'
            ? '1rem'
            : size === 'bodyMedium'
            ? '1rem'
            : size === 'bodyLarge'
            ? '1rem'
            : sizeTitle === 'titleSmall'
            ? '1rem'
            : sizeTitle === 'titleMedium'
            ? '1rem'
            : sizeTitle === 'titleLarge'
            ? '1rem'
            : sizeTitle === 'titleXLarge'
            ? '1rem'
            : sizeTitle === 'title2XLarge' || sizeTitle === 'featureXSmall'
            ? '1rem'
            : sizeTitle === 'featureSmall'
            ? '1rem'
            : '1rem'
        }`
      );
      expect(tooltipIcon).toHaveStyleRule(
        'width',
        `${
          size === 'bodySmall'
            ? '1rem'
            : size === 'bodyMedium'
            ? '1rem'
            : size === 'bodyLarge'
            ? '1rem'
            : sizeTitle === 'titleSmall'
            ? '1rem'
            : sizeTitle === 'titleMedium'
            ? '1rem'
            : sizeTitle === 'titleLarge'
            ? '1rem'
            : sizeTitle === 'titleXLarge'
            ? '1rem'
            : sizeTitle === 'title2XLarge' || sizeTitle === 'featureXSmall'
            ? '1rem'
            : sizeTitle === 'featureSmall'
            ? '1rem'
            : '1rem'
        }`
      );
    });
  });

  test(`should render Tooltip with non-configurable size - Eyebrow`, () => {
    fixedSize.forEach(size => {
      const { container } = render(
        <TitleLockupEyebrow
          size={size}
          tooltip={{
            title: 'Eyebrow Tooltip',
            children: 'Tooltip content',
            closeButtonText: 'close',
            size: 'medium',
          }}
        >
          Eyebrow
        </TitleLockupEyebrow>
      );
      //expect(container).toMatchSnapshot();
      const tooltipIcon = container.querySelector(
        '[class^="ButtonIconContainer"] svg'
      );
      expect(tooltipIcon).toHaveStyleRule(
        'height',
        `${
          size === 'bodySmall'
            ? '1rem'
            : size === 'bodyMedium'
            ? '1rem'
            : '1rem'
        }`
      );

      expect(tooltipIcon).toHaveStyleRule(
        'width',
        `${
          size === 'bodySmall'
            ? '1rem'
            : size === 'bodyMedium'
            ? '1rem'
            : '1rem'
        }`
      );
    });
  });

  test(`should render Tooltip with non-configurable size - Subtitle`, () => {
    fixedSize.forEach(size => {
      const { container } = render(
        <TitleLockupSubtitle
          size={size}
          tooltip={{
            title: 'Subtitle Tooltip',
            children: 'Tooltip content',
            closeButtonText: 'close',
            size: 'medium',
          }}
        >
          Subtitle
        </TitleLockupSubtitle>
      );
      //expect(container).toMatchSnapshot();
      const tooltipIcon = container.querySelector(
        '[class^="ButtonIconContainer"] svg'
      );
      expect(tooltipIcon).toHaveStyleRule(
        'height',
        `${
          size === 'bodySmall'
            ? '1rem'
            : size === 'bodyMedium'
            ? '1rem'
            : '1rem'
        }`
      );

      expect(tooltipIcon).toHaveStyleRule(
        'width',
        `${
          size === 'bodySmall'
            ? '1rem'
            : size === 'bodyMedium'
            ? '1rem'
            : '1rem'
        }`
      );
    });
  });
});
