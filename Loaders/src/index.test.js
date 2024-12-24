import { render } from '@testing-library/react';
import React from 'react';
import { Loader } from '.';
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

describe('<Loader>', () => {
  test('<Loaders default Styles>', () => {
    const { container } = render(<Loader active />);
    //Loader - size and color
    const ld = container.firstChild.firstChild;
    expect(ld).toHaveStyleRule('height', '2.5rem');
    expect(ld).toHaveStyleRule('width', '2.5rem');
    expect(ld).toHaveStyleRule('border', '0.25rem solid #000000');
    //Behaviors - Animation
    expect(ld).toHaveStyleRule('animation', 'cVuWGa 0.5s infinite linear');
    //Background Overlay - color
    const overlay = container.firstChild;
    expect(overlay).toHaveStyleRule('background-color', '#ffffff');
    expect(overlay).toHaveStyleRule('opacity', '0.8');
  });

  test('<Loaders default Styles Inverted>', () => {
    const { container } = render(<Loader active surface="dark" />);
    //Loader - size and color
    const ld = container.firstChild.firstChild;
    expect(ld).toHaveStyleRule('height', '2.5rem');
    expect(ld).toHaveStyleRule('width', '2.5rem');
    expect(ld).toHaveStyleRule('border', '0.25rem solid #ffffff');
    //Behaviors - Animation
    expect(ld).toHaveStyleRule('animation', 'cVuWGa 0.5s infinite linear');
    //Background Overlay - color
    const overlay = container.firstChild;
    expect(overlay).toHaveStyleRule('background-color', '#000000');
    expect(overlay).toHaveStyleRule('opacity', '0.8');
  });

  test('should render Loader correctly', () => {
    const { container } = render(<Loader />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render active Loader correctly', () => {
    const { container } = render(<Loader active />);

    const loaderOverlay = container.firstChild;
    const styles = window.getComputedStyle(loaderOverlay)._values;
    expect(rgbToHex(styles['background-color'])).toBe(
      ColorTokens.background.primary.light.value
    );
    expect(loaderOverlay.getAttribute('aria-label')).toBe('loader overlay');

    const loader = loaderOverlay.firstChild;
    expect(loader.getAttribute('aria-label')).toBe('loader animation');
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render fullscren Loader correctly', () => {
    const { container } = render(<Loader fullscreen />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render active fullscreen Loader correctly', () => {
    const { container } = render(<Loader active fullscreen />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render inverted Loader correctly', () => {
    const { container } = render(<Loader surface="dark" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render active inverted Loader correctly', () => {
    const { container } = render(<Loader active surface="dark" />);

    const loaderOverlay = container.firstChild;
    const styles = window.getComputedStyle(loaderOverlay)._values;
    expect(rgbToHex(styles['background-color'])).toBe(
      ColorTokens.background.primary.dark.value
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render active inverted fullscreen Loader correctly', () => {
    const { container } = render(<Loader active surface="dark" fullscreen />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
