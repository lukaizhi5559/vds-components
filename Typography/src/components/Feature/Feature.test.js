import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { Feature } from '.';
import { Super } from '../Super';
import { TypographyTokens } from '@vds-tokens/typography';
import { ColorTokens } from '@vds-tokens/color';

function _calcSize(remVal) {
  const baseFont = 16;
  let num = parseFloat(remVal);
  return num * baseFont + 'px';
}

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

test('should render Feature default props correctly', () => {
  const content = 'Feature default';
  const { getByText, container } = render(<Feature>{content}</Feature>);
  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);
  fireEvent.click(container.firstChild);
  //Find styling props
  const styles = window.getComputedStyle(container.firstChild)._values;

  // should match with default size medium
  if (styles) {
    expect(_calcSize(styles['font-size'])).toBe(
      TypographyTokens.fontsize.feature[96].value
    );
    expect(_calcSize(styles['line-height'])).toBe(
      TypographyTokens.lineheight.feature[88].value
    );
    expect(parseFloat(styles['font-weight'])).toBe(
      TypographyTokens.fontweight.light.value
    );
    expect(styles['font-family']).toBe(
      'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
    );
    expect(rgbToHex(styles.color)).toBe(ColorTokens.palette.black.value);
  }
});

// Test passing a different color
test('should render Feature white correctly', () => {
  const content = 'Feature white';
  const { getByText, container } = render(
    <Feature color="#FFFFFF">{content}</Feature>
  );

  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);
  //Find styling props
  const styles = window.getComputedStyle(container.firstChild)._values;
  if (styles) {
    expect(styles.color).toBe('rgb(255, 255, 255)');
  }
});

//Test passing a different primitive
test('should render Feature primitive as span', () => {
  const content = 'Feature span';
  const { getByText, container } = render(
    <Feature primitive={'span'}>{content}</Feature>
  );
  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);
  const elem = container.querySelector('span');
  expect(elem).toBeInTheDocument();
});

// Test passing a different size
test('should render Feature large correctly', () => {
  const content = 'Feature large';
  const { getByText, container } = render(
    <Feature size={'large'}>{content}</Feature>
  );

  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);
  //Find styling props
  const styles = window.getComputedStyle(container.firstChild)._values;
  if (styles) {
    expect(_calcSize(styles['font-size'])).toBe(
      TypographyTokens.fontsize.feature[128].value
    );
    expect(_calcSize(styles['line-height'])).toBe(
      TypographyTokens.lineheight.feature[120].value
    );
  }
});

test('should render Feature XLarge as XLarge', () => {
  const content = 'Feature large';
  const { getByText, container } = render(
    <Feature size={'XLarge'}>{content}</Feature>
  );

  expect(getByText(content).textContent).toBe(content);
  //Find styling props
  const styles = window.getComputedStyle(container.firstChild)._values;
  if (styles) {
    expect(_calcSize(styles['font-size'])).toBe(
      TypographyTokens.fontsize.feature[144].value
    );
    expect(_calcSize(styles['line-height'])).toBe(
      TypographyTokens.lineheight.feature[136].value
    );
  }
});

// Test passing a superscriptSmall
test('should render Feature with superscriptSmall prop and Super', () => {
  const content = 'Feature large';
  const { getByText, container } = render(
    <Feature size={'large'} superscriptSmall>
      {content}
      <Super>1</Super>
    </Feature>
  );

  expect(container.firstChild).toMatchSnapshot();
  const elem = container.querySelector('sup');
  expect(elem).toBeInTheDocument();
  //Find styling props
  const stylesFeature = window.getComputedStyle(container.firstChild)._values;
  const stylesSuper = window.getComputedStyle(elem)._values;
  if (stylesFeature) {
    expect(_calcSize(stylesFeature['font-size'])).toBe(
      TypographyTokens.fontsize.feature[128].value
    );
    expect(_calcSize(stylesFeature['line-height'])).toBe(
      TypographyTokens.lineheight.feature[120].value
    );
  }
  if (stylesSuper) {
    expect(stylesSuper['font-size']).toBe('64px');
    expect(stylesSuper['line-height']).toBe('0px');
  }
});

// Test passing a bold false
test('should render Feature bold false correctly', () => {
  const content = 'Feature bold false';
  const { getByText, container } = render(
    <Feature size={'large'} bold={false}>
      {content}
    </Feature>
  );

  expect(getByText(content).textContent).toBe(content);
  //Find styling props
  const styles = window.getComputedStyle(container.firstChild)._values;
  if (styles) {
    expect(parseFloat(styles['font-weight'])).toBe(
      TypographyTokens.fontweight.light.value
    );
  }
});

// Test passing a different fontWeight
test('should render Feature fontWeight 750 correctly', () => {
  const content = 'Feature fontWeight 750';
  const { getByText, container } = render(
    <Feature size={'large'} bold={true}>
      {content}
    </Feature>
  );

  expect(getByText(content).textContent).toBe(content);
  //Find styling props
  const styles = window.getComputedStyle(container.firstChild)._values;
  if (styles) {
    expect(parseFloat(styles['font-weight'])).toBe(
      TypographyTokens.fontweight.bold.value
    );
  }
});

// Test changing the viewport
test('should render Feature with default styles on mobile correctly', () => {
  const content = 'Feature on mobile';
  const { getByText, container } = render(
    <Feature viewport={'mobile'} bold={true}>
      {content}
    </Feature>
  );

  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);
  //Find styling props
  const styles = window.getComputedStyle(container.firstChild)._values;
  if (styles) {
    expect(_calcSize(styles['font-size'])).toBe(
      TypographyTokens.fontsize.feature[64].value
    );
    expect(_calcSize(styles['line-height'])).toBe(
      TypographyTokens.lineheight.feature[64].value
    );
    expect(parseFloat(styles['font-weight'])).toBe(
      TypographyTokens.fontweight.bold.value
    );
    expect(styles['font-family']).toBe(
      'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
    );
  }
});

// Test passing a different fontSize and lineheight
test('should render Feature fontSize and lineheight props correctly', () => {
  const content = 'Feature fontSize 16 and lineheight 16';
  const { getByText, container } = render(
    <Feature fontSize={16} lineheight={16}>
      {content}
    </Feature>
  );

  expect(getByText(content).textContent).toBe(content);
  //Find styling props
  const styles = window.getComputedStyle(container.firstChild)._values;
  if (styles) {
    expect(_calcSize(styles['font-size'])).toBe(
      TypographyTokens.fontsize.feature[96].value
    );
    expect(_calcSize(styles['line-height'])).toBe(
      TypographyTokens.lineheight.feature[88].value
    );
  }
});

// Test Feature without children
test('should render Feature without children', () => {
  const { container } = render(<Feature></Feature>);
  expect(container.firstChild).toMatchSnapshot();
});

// Test Feature without config
test('should not render Feature without config', () => {
  const content = 'Feature will not be rendered without config';
  const { container } = render(<Feature>{content}</Feature>);
  expect(container.firstChild).toBeNull;
});
