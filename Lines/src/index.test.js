import { render } from '@testing-library/react';
import React from 'react';
import { Line } from './index';
import { ColorTokens } from '@vds-tokens/color';

function rgbToHex(rgb) {
  rgb = rgb
    .substr(4)
    .split(')')[0]
    .split(', ');

  let r = (+rgb[0]).toString(16),
    g = (+rgb[1]).toString(16),
    b = (+rgb[2]).toString(16);

  if (r.length == 1) r = '0' + r;
  if (g.length == 1) g = '0' + g;
  if (b.length == 1) b = '0' + b;

  return '#' + r + g + b;
}

// style testing starts

test('<Line> primary style test', () => {
  const { container } = render(<Line type="primary">P.Body AaBbCc</Line>);
  expect(container.firstChild).toMatchSnapshot();
  const styles = window.getComputedStyle(container.firstChild)._values;
  expect(rgbToHex(styles['background-color'])).toBe(
    ColorTokens.elements.primary.onlight.value
  );
  expect(styles['height']).toBe('0.0625rem');
  expect(styles['width']).toBe('100%');
});

test('<Line> secondary style test', () => {
  const { container } = render(<Line type="secondary">P.Body AaBbCc</Line>);
  expect(container.firstChild).toMatchSnapshot();
  const styles = window.getComputedStyle(container.firstChild)._values;
  expect(rgbToHex(styles['background-color'])).toBe(
    ColorTokens.palette.gray85.value
  );
  expect(styles['height']).toBe('0.0625rem');
  expect(styles['width']).toBe('100%');
});

test('<Line> primary dark surface style test', () => {
  const { container } = render(
    <Line type="primary" surface="dark">
      P.Body AaBbCc
    </Line>
  );
  expect(container.firstChild).toMatchSnapshot();
  const styles = window.getComputedStyle(container.firstChild)._values;
  expect(rgbToHex(styles['background-color'])).toBe(
    ColorTokens.palette.white.value
  );
  expect(styles['height']).toBe('0.0625rem');
  expect(styles['width']).toBe('100%');
});

test('<Line> secondary dark surface style test', () => {
  const { container } = render(
    <Line type="secondary" surface="dark">
      P.Body AaBbCc
    </Line>
  );
  expect(container.firstChild).toMatchSnapshot();
  const styles = window.getComputedStyle(container.firstChild)._values;
  expect(rgbToHex(styles['background-color'])).toBe(
    ColorTokens.palette.gray20.value
  );
  expect(styles['height']).toBe('0.0625rem');
  expect(styles['width']).toBe('100%');
});
test('<Line> orientation as horizontal', () => {
  const { container } = render(<Line orientation="horizontal"></Line>);
  const line = container.querySelector('[class^="StyledLine"]');
  expect(line).toHaveStyleRule('width', '100%');
  expect(line).toHaveStyleRule('height', '0.0625rem');
});
test('<Line> orientation as vertical', () => {
  const { container } = render(<Line orientation="vertical"></Line>);
  const line = container.querySelector('[class^="StyledLine"]');
  expect(line).toHaveStyleRule('width', '0.0625rem');
  expect(line).toHaveStyleRule('height', 'unset');
});
// style testing ends

test('<Line> snapshot', () => {
  const { container } = render(<Line>P.Body AaBbCc</Line>);
  expect(container.firstChild).toMatchSnapshot();
  const styles = window.getComputedStyle(container.firstChild)._values;
  expect(rgbToHex(styles['background-color'])).toBe(
    ColorTokens.elements.primary.onlight.value
  );
});

test('<Line heavy> snapshot', () => {
  const { container } = render(<Line type="heavy">P.Body AaBbCc</Line>);
  expect(container.firstChild).toMatchSnapshot();
});

test('<Line> dark surface snapshot', () => {
  const { container } = render(
    <Line surface="dark" type="light">
      P.Body AaBbCc
    </Line>
  );
  expect(container.firstChild).toMatchSnapshot();
  const styles = window.getComputedStyle(container.firstChild)._values;
  expect(rgbToHex(styles['background-color'])).toBe(
    ColorTokens.elements.primary.ondark.value
  );
});

test('<Line xLight> snapshot', () => {
  const { container } = render(<Line type="xLight">P.Body AaBbCc</Line>);
  expect(container.firstChild).toMatchSnapshot();
  const styles = window.getComputedStyle(container.firstChild)._values;
  expect(rgbToHex(styles['background-color'])).toBe(
    ColorTokens.palette.gray85.value
  );
});

test('<Line xLight> dark surface snapshot', () => {
  const { container } = render(
    <Line surface="dark" type="xLight">
      P.Body AaBbCc
    </Line>
  );
  expect(container.firstChild).toMatchSnapshot();
  const styles = window.getComputedStyle(container.firstChild)._values;
  expect(rgbToHex(styles['background-color'])).toBe(
    ColorTokens.palette.gray20.value
  );
});

test('<Line accent> snapshot', () => {
  const { container } = render(<Line type="accent">P.Body AaBbCc</Line>);
  expect(container.firstChild).toMatchSnapshot();
  const styles = window.getComputedStyle(container.firstChild)._values;
  expect(rgbToHex(styles['background-color'])).toBe('#d52b1e');
});
