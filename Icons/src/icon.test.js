const fg = require('fast-glob');
const path = require('path');

import Icon from './Icon';
import React from 'react';
import { render } from '@testing-library/react';

// style testing starts

test('Icon info small', () => {
  const { container } = render(<Icon size="small" name="info" />);

  const iconsStyle = container.querySelector('[class^="StyledSVG"]');
  expect(iconsStyle).toHaveStyleRule('width', '1rem');
  expect(iconsStyle).toHaveStyleRule('width', '1rem');
  const fillcolor = container.querySelector('[class^="StyledSVG"] path');
  expect(fillcolor.getAttribute('fill')).toBe('#000000');
  expect(container.firstChild).toMatchSnapshot();
});

test('Icon info small', () => {
  const { container } = render(
    <Icon size="small" name="info" color={'#FBE4D7'} />
  );

  const iconsStyle = container.querySelector('[class^="StyledSVG"]');
  expect(iconsStyle).toHaveStyleRule('width', '1rem');
  expect(iconsStyle).toHaveStyleRule('width', '1rem');
  const fillcolor = container.querySelector('[class^="StyledSVG"] path');
  expect(fillcolor.getAttribute('fill')).toBe('#FBE4D7');
  expect(container.firstChild).toMatchSnapshot();
});

test('Icon info medium', () => {
  const { container } = render(<Icon size="medium" name="info" />);

  const iconsStyle = container.querySelector('[class^="StyledSVG"]');
  expect(iconsStyle).toHaveStyleRule('width', '1.25rem');
  expect(iconsStyle).toHaveStyleRule('width', '1.25rem');
  const fillcolor = container.querySelector('[class^="StyledSVG"] path');
  expect(fillcolor.getAttribute('fill')).toBe('#000000');
  expect(container.firstChild).toMatchSnapshot();
});

test('Icon info large', () => {
  const { container } = render(<Icon size="large" name="info" />);

  const iconsStyle = container.querySelector('[class^="StyledSVG"]');
  expect(iconsStyle).toHaveStyleRule('width', '1.5rem');
  expect(iconsStyle).toHaveStyleRule('width', '1.5rem');
  const fillcolor = container.querySelector('[class^="StyledSVG"] path');
  expect(fillcolor.getAttribute('fill')).toBe('#000000');
  expect(container.firstChild).toMatchSnapshot();
});

test('Icon info XLarge', () => {
  const { container } = render(<Icon size="XLarge" name="info" />);

  const iconsStyle = container.querySelector('[class^="StyledSVG"]');
  expect(iconsStyle).toHaveStyleRule('width', '1.75rem');
  expect(iconsStyle).toHaveStyleRule('width', '1.75rem');
  const fillcolor = container.querySelector('[class^="StyledSVG"] path');
  expect(fillcolor.getAttribute('fill')).toBe('#000000');
  expect(container.firstChild).toMatchSnapshot();
});

test('Icon hackers small', () => {
  const { container } = render(<Icon size="small" name="hackers" />);

  const iconsStyle = container.querySelector('[class^="StyledSVG"]');
  expect(iconsStyle).toHaveStyleRule('width', '1rem');
  expect(iconsStyle).toHaveStyleRule('width', '1rem');
  const fillcolor = container.querySelector('[class^="StyledSVG"] path');
  expect(fillcolor.getAttribute('fill')).toBe('#000000');
  expect(container.firstChild).toMatchSnapshot();
});

test('Icon hackers small', () => {
  const { container } = render(
    <Icon size="small" name="hackers" color={'#C44904'} />
  );

  const iconsStyle = container.querySelector('[class^="StyledSVG"]');
  expect(iconsStyle).toHaveStyleRule('width', '1rem');
  expect(iconsStyle).toHaveStyleRule('width', '1rem');
  const fillcolor = container.querySelector('[class^="StyledSVG"] path');
  expect(fillcolor.getAttribute('fill')).toBe('#C44904');
  expect(container.firstChild).toMatchSnapshot();
});

test('Icon hackers small surface dark', () => {
  const { container } = render(
    <Icon size="small" name="hackers" color={'#C44904'} surface="dark" />
  );

  const iconsStyle = container.querySelector('[class^="StyledSVG"]');
  expect(iconsStyle).toHaveStyleRule('width', '1rem');
  expect(iconsStyle).toHaveStyleRule('width', '1rem');
  const fillcolor = container.querySelector('[class^="StyledSVG"] path');
  expect(fillcolor.getAttribute('fill')).toBe('#C44904');
  expect(container.firstChild).toMatchSnapshot();
});

test('Icon hackers medium', () => {
  const { container } = render(<Icon size="medium" name="hackers" />);

  const iconsStyle = container.querySelector('[class^="StyledSVG"]');
  expect(iconsStyle).toHaveStyleRule('width', '1.25rem');
  expect(iconsStyle).toHaveStyleRule('width', '1.25rem');
  const fillcolor = container.querySelector('[class^="StyledSVG"] path');
  expect(fillcolor.getAttribute('fill')).toBe('#000000');
  expect(container.firstChild).toMatchSnapshot();
});

test('Icon hackers large', () => {
  const { container } = render(<Icon size="large" name="hackers" />);

  const iconsStyle = container.querySelector('[class^="StyledSVG"]');
  expect(iconsStyle).toHaveStyleRule('width', '1.5rem');
  expect(iconsStyle).toHaveStyleRule('width', '1.5rem');
  const fillcolor = container.querySelector('[class^="StyledSVG"] path');
  expect(fillcolor.getAttribute('fill')).toBe('#000000');
  expect(container.firstChild).toMatchSnapshot();
});

test('Icon hackers XLarge', () => {
  const { container } = render(<Icon size="XLarge" name="hackers" />);

  const iconsStyle = container.querySelector('[class^="StyledSVG"]');
  expect(iconsStyle).toHaveStyleRule('width', '1.75rem');
  expect(iconsStyle).toHaveStyleRule('width', '1.75rem');
  const fillcolor = container.querySelector('[class^="StyledSVG"] path');
  expect(fillcolor.getAttribute('fill')).toBe('#000000');
  expect(container.firstChild).toMatchSnapshot();
});

test('Icon gaming small', () => {
  const { container } = render(<Icon size="small" name="gaming" />);

  const iconsStyle = container.querySelector('[class^="StyledSVG"]');
  expect(iconsStyle).toHaveStyleRule('width', '1rem');
  expect(iconsStyle).toHaveStyleRule('width', '1rem');
  const fillcolor = container.querySelector('[class^="StyledSVG"] path');
  expect(fillcolor.getAttribute('fill')).toBe('#000000');
  expect(container.firstChild).toMatchSnapshot();
});

test('Icon gaming small', () => {
  const { container } = render(
    <Icon size="small" name="gaming" color={'#C44904'} />
  );

  const iconsStyle = container.querySelector('[class^="StyledSVG"]');
  expect(iconsStyle).toHaveStyleRule('width', '1rem');
  expect(iconsStyle).toHaveStyleRule('width', '1rem');
  const fillcolor = container.querySelector('[class^="StyledSVG"] path');
  expect(fillcolor.getAttribute('fill')).toBe('#C44904');
  expect(container.firstChild).toMatchSnapshot();
});

test('Icon gaming small surface dark', () => {
  const { container } = render(
    <Icon size="small" name="gaming" color={'#C44904'} surface="dark" />
  );

  const iconsStyle = container.querySelector('[class^="StyledSVG"]');
  expect(iconsStyle).toHaveStyleRule('width', '1rem');
  expect(iconsStyle).toHaveStyleRule('width', '1rem');
  const fillcolor = container.querySelector('[class^="StyledSVG"] path');
  expect(fillcolor.getAttribute('fill')).toBe('#C44904');
  expect(container.firstChild).toMatchSnapshot();
});

test('Icon gaming medium', () => {
  const { container } = render(<Icon size="medium" name="gaming" />);

  const iconsStyle = container.querySelector('[class^="StyledSVG"]');
  expect(iconsStyle).toHaveStyleRule('width', '1.25rem');
  expect(iconsStyle).toHaveStyleRule('width', '1.25rem');
  const fillcolor = container.querySelector('[class^="StyledSVG"] path');
  expect(fillcolor.getAttribute('fill')).toBe('#000000');
  expect(container.firstChild).toMatchSnapshot();
});

test('Icon gaming large', () => {
  const { container } = render(<Icon size="large" name="gaming" />);

  const iconsStyle = container.querySelector('[class^="StyledSVG"]');
  expect(iconsStyle).toHaveStyleRule('width', '1.5rem');
  expect(iconsStyle).toHaveStyleRule('width', '1.5rem');
  const fillcolor = container.querySelector('[class^="StyledSVG"] path');
  expect(fillcolor.getAttribute('fill')).toBe('#000000');
  expect(container.firstChild).toMatchSnapshot();
});

test('Icon gaming XLarge', () => {
  const { container } = render(<Icon size="XLarge" name="gaming" />);

  const iconsStyle = container.querySelector('[class^="StyledSVG"]');
  expect(iconsStyle).toHaveStyleRule('width', '1.75rem');
  expect(iconsStyle).toHaveStyleRule('width', '1.75rem');
  const fillcolor = container.querySelector('[class^="StyledSVG"] path');
  expect(fillcolor.getAttribute('fill')).toBe('#000000');
  expect(container.firstChild).toMatchSnapshot();
});

test('Icon flag small', () => {
  const { container } = render(<Icon size="small" name="flag" />);

  const iconsStyle = container.querySelector('[class^="StyledSVG"]');
  expect(iconsStyle).toHaveStyleRule('width', '1rem');
  expect(iconsStyle).toHaveStyleRule('width', '1rem');
  const fillcolor = container.querySelector('[class^="StyledSVG"] path');
  expect(fillcolor.getAttribute('fill')).toBe('#000000');
  expect(container.firstChild).toMatchSnapshot();
});

test('Icon flag small', () => {
  const { container } = render(
    <Icon size="small" name="flag" color={'#C44904'} />
  );

  const iconsStyle = container.querySelector('[class^="StyledSVG"]');
  expect(iconsStyle).toHaveStyleRule('width', '1rem');
  expect(iconsStyle).toHaveStyleRule('width', '1rem');
  const fillcolor = container.querySelector('[class^="StyledSVG"] path');
  expect(fillcolor.getAttribute('fill')).toBe('#C44904');
  expect(container.firstChild).toMatchSnapshot();
});

test('Icon flag small surface dark', () => {
  const { container } = render(
    <Icon size="small" name="flag" surface="dark" />
  );

  const iconsStyle = container.querySelector('[class^="StyledSVG"]');
  expect(iconsStyle).toHaveStyleRule('width', '1rem');
  expect(iconsStyle).toHaveStyleRule('width', '1rem');
  const fillcolor = container.querySelector('[class^="StyledSVG"] path');
  expect(fillcolor.getAttribute('fill')).toBe('#ffffff');
  expect(container.firstChild).toMatchSnapshot();
});

test('Icon flag medium', () => {
  const { container } = render(<Icon size="medium" name="flag" />);

  const iconsStyle = container.querySelector('[class^="StyledSVG"]');
  expect(iconsStyle).toHaveStyleRule('width', '1.25rem');
  expect(iconsStyle).toHaveStyleRule('width', '1.25rem');
  const fillcolor = container.querySelector('[class^="StyledSVG"] path');
  expect(fillcolor.getAttribute('fill')).toBe('#000000');
  expect(container.firstChild).toMatchSnapshot();
});

test('Icon flag large', () => {
  const { container } = render(<Icon size="large" name="gaming" />);

  const iconsStyle = container.querySelector('[class^="StyledSVG"]');
  expect(iconsStyle).toHaveStyleRule('width', '1.5rem');
  expect(iconsStyle).toHaveStyleRule('width', '1.5rem');
  const fillcolor = container.querySelector('[class^="StyledSVG"] path');
  expect(fillcolor.getAttribute('fill')).toBe('#000000');
  expect(container.firstChild).toMatchSnapshot();
});

test('Icon flag XLarge', () => {
  const { container } = render(<Icon size="XLarge" name="flag" />);

  const iconsStyle = container.querySelector('[class^="StyledSVG"]');
  expect(iconsStyle).toHaveStyleRule('width', '1.75rem');
  expect(iconsStyle).toHaveStyleRule('width', '1.75rem');
  const fillcolor = container.querySelector('[class^="StyledSVG"] path');
  expect(fillcolor.getAttribute('fill')).toBe('#000000');
  expect(container.firstChild).toMatchSnapshot();
});

test('Icon filter small', () => {
  const { container } = render(<Icon size="small" name="filter" />);

  const iconsStyle = container.querySelector('[class^="StyledSVG"]');
  expect(iconsStyle).toHaveStyleRule('width', '1rem');
  expect(iconsStyle).toHaveStyleRule('width', '1rem');
  const fillcolor = container.querySelector('[class^="StyledSVG"] path');
  expect(fillcolor.getAttribute('fill')).toBe('#000000');
  expect(container.firstChild).toMatchSnapshot();
});

test('Icon filter small', () => {
  const { container } = render(
    <Icon size="small" name="filter" color={'#C44904'} />
  );

  const iconsStyle = container.querySelector('[class^="StyledSVG"]');
  expect(iconsStyle).toHaveStyleRule('width', '1rem');
  expect(iconsStyle).toHaveStyleRule('width', '1rem');
  const fillcolor = container.querySelector('[class^="StyledSVG"] path');
  expect(fillcolor.getAttribute('fill')).toBe('#C44904');
  expect(container.firstChild).toMatchSnapshot();
});

test('Icon filter small surface dark', () => {
  const { container } = render(
    <Icon size="small" name="filter" surface="dark" />
  );

  const iconsStyle = container.querySelector('[class^="StyledSVG"]');
  expect(iconsStyle).toHaveStyleRule('width', '1rem');
  expect(iconsStyle).toHaveStyleRule('width', '1rem');
  const fillcolor = container.querySelector('[class^="StyledSVG"] path');
  expect(fillcolor.getAttribute('fill')).toBe('#ffffff');
  expect(container.firstChild).toMatchSnapshot();
});

test('Icon filter medium', () => {
  const { container } = render(<Icon size="medium" name="filter" />);

  const iconsStyle = container.querySelector('[class^="StyledSVG"]');
  expect(iconsStyle).toHaveStyleRule('width', '1.25rem');
  expect(iconsStyle).toHaveStyleRule('width', '1.25rem');
  const fillcolor = container.querySelector('[class^="StyledSVG"] path');
  expect(fillcolor.getAttribute('fill')).toBe('#000000');
  expect(container.firstChild).toMatchSnapshot();
});

test('Icon filter large', () => {
  const { container } = render(<Icon size="large" name="gaming" />);

  const iconsStyle = container.querySelector('[class^="StyledSVG"]');
  expect(iconsStyle).toHaveStyleRule('width', '1.5rem');
  expect(iconsStyle).toHaveStyleRule('width', '1.5rem');
  const fillcolor = container.querySelector('[class^="StyledSVG"] path');
  expect(fillcolor.getAttribute('fill')).toBe('#000000');
  expect(container.firstChild).toMatchSnapshot();
});

test('Icon filter XLarge', () => {
  const { container } = render(<Icon size="XLarge" name="filter" />);

  const iconsStyle = container.querySelector('[class^="StyledSVG"]');
  expect(iconsStyle).toHaveStyleRule('width', '1.75rem');
  expect(iconsStyle).toHaveStyleRule('width', '1.75rem');
  const fillcolor = container.querySelector('[class^="StyledSVG"] path');
  expect(fillcolor.getAttribute('fill')).toBe('#000000');
  expect(container.firstChild).toMatchSnapshot();
});

// style testing ends

test('<Icon size="XLarge" name="left-caret"/>', () => {
  const { container } = render(<Icon size="XLarge" name="left-caret" />);

  expect(container.firstChild).toMatchSnapshot();
});

test('<Icon size="medium" " name="left-caret" />', () => {
  const { container } = render(<Icon size="medium" name="left-caret" />);
  expect(container.firstChild).toMatchSnapshot();
});

test('<Icon backgroundColor="black" size="small" name="left-caret" />', () => {
  const { container } = render(<Icon size="small" name="left-caret" />);

  expect(container.firstChild).toMatchSnapshot();
});

test('<Icon backgroundColor="" size="small" name="left-caret" />', () => {
  const { container } = render(
    <Icon backgroundColor="" size="small" name="left-caret" />
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('<Icon size="large" name="left-caret" />', () => {
  const { container } = render(<Icon size="large" name="info" />);

  expect(container.firstChild).toMatchSnapshot();
});

test('<Icon size={23} name="left-caret" />', () => {
  const { container } = render(<Icon size={23} name="left-caret" />);

  expect(container.firstChild).toMatchSnapshot();
});

test('<Icon tabIndex="-1" size="large" name="info" />', () => {
  const { container } = render(<Icon tabIndex={-1} size="large" name="info" />);

  expect(container.firstChild).toMatchSnapshot();
});

test('<Icon size="large" name="collapse"  /> 1.0', () => {
  const { container } = render(<Icon size="large" name="minus" />);

  expect(container.firstChild).toMatchSnapshot();
});

test('<Icon focused size="large" name="collapse"  /> 1.0', () => {
  const { container } = render(<Icon focused size="large" name="error" />);

  expect(container.firstChild).toMatchSnapshot();
});

test('<Icon size="large" name="collapse" /> 1.0', () => {
  const { container } = render(<Icon size="large" name="minus" />);

  expect(container.firstChild).toMatchSnapshot();
});

test('<Icon size="large" name="checkmark-alt" inverted color={"#000000"} /> 1.0', () => {
  const { container } = render(
    <Icon
      surface="dark"
      color={'#000000'}
      ariaLabel="test aria label"
      size="large"
      name="checkmark-alt"
    />
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('<Icon size="large" name="checkmark-alt" inverted color="Black" /> 1.0', () => {
  const { container } = render(
    <Icon
      surface="dark"
      color="#000000"
      ariaLabel="test aria label"
      size="large"
      name="checkmark-alt"
    />
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('<Icon size="large" name="arrow-left" /> 1.0', () => {
  const { container } = render(
    <Icon
      surface="dark"
      ariaLabel="test aria label"
      size="large"
      name="left-arrow"
    />
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('VDS Icon', () => {
  const { container } = render(
    <Icon
      surface="dark"
      ariaLabel="test aria label"
      size="large"
      name="left-arrow"
    />
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Individual Icons', () => {
  const paths = fg.sync([
    path.resolve(__dirname, `./assets/icons/**/index.jsx`),
  ]);

  for (const file of paths) {
    let dir = path.basename(path.dirname(file));
    const IconTest = require(file).default;
    const { container } = render(
      <IconTest color="#F6F6F6" size="XLarge" surface="dark" ariaLabel={dir} />
    );
    expect(container.firstChild).toMatchSnapshot(dir);
  }
});
