import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { Micro } from '.';
import TypographyConfig from '../../typographyConfig';
import { Fonts } from '../../fonts';
import { TypographyTokens } from '@vds-tokens/typography';
import { ColorTokens } from '@vds-tokens/color';

// Size tests should match corresponding config.js in package for:
//  - typescale = 'MVP'
//  - viewport  = 'desktop'

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

// ============== typescale - MVP ============== //
//                                               //
// ============================================= //

test('should render Micro default props correctly', () => {
  const content = 'Micro default';
  const { getByText, container } = render(<Micro>{content}</Micro>);
  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);
  fireEvent.click(container.firstChild);
  //Find styling props
  const styles = window.getComputedStyle(container.firstChild)._values;
  if (styles) {
    expect(_calcSize(styles['font-size'])).toBe(
      TypographyTokens.fontsize.micro[11].value
    );
    expect(_calcSize(styles['line-height'])).toBe(
      TypographyTokens.lineheight.micro[16].value
    );
    expect(parseFloat(styles['font-weight'])).toBe(
      TypographyTokens.fontweight.regular.value
    );
    expect(styles['font-family']).toBe(
      'Verizon-NHG-eTX,Helvetica,Arial,Sans-serif'
    );
    expect(rgbToHex(styles.color)).toBe(ColorTokens.palette.black.value);
  }
});

// Default - w/ typescale="MVP"
test('should render Micro MVP typescale correctly', () => {
  const content = 'Micro default';
  const { getByText, container } = render(
    <Micro bold typescale={'MVP'}>
      {content}
    </Micro>
  );
  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);
  //Find styling props
  const styles = window.getComputedStyle(container.firstChild)._values;
  if (styles) {
    expect(_calcSize(styles['font-size'])).toBe(
      TypographyTokens.fontsize.micro[11].value
    );
    expect(_calcSize(styles['line-height'])).toBe(
      TypographyTokens.lineheight.micro[16].value
    );
    expect(parseFloat(styles['font-weight'])).toBe(
      TypographyTokens.fontweight.bold.value
    );
    expect(styles['font-family']).toBe(
      'Verizon-NHG-eTX,Helvetica,Arial,Sans-serif'
    );
    expect(rgbToHex(styles.color)).toBe(ColorTokens.palette.black.value);
  }
});
// Default - w/ theme="{typescale: "MVP"}
test('should render Micro theme props correctly', () => {
  const content = 'Micro MVP w/ theme';
  const theme = { typescale: 'MVP' };
  const { getByText, container } = render(
    <Micro theme={theme}>{content}</Micro>
  );
  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);
  //Find styling props
  const styles = window.getComputedStyle(container.firstChild)._values;
  if (styles) {
    expect(_calcSize(styles['font-size'])).toBe(
      TypographyTokens.fontsize.micro[11].value
    );
    expect(_calcSize(styles['line-height'])).toBe(
      TypographyTokens.lineheight.micro[16].value
    );
    expect(parseFloat(styles['font-weight'])).toBe(
      TypographyTokens.fontweight.regular.value
    );
    expect(styles['font-family']).toBe(
      'Verizon-NHG-eTX,Helvetica,Arial,Sans-serif'
    );
    expect(rgbToHex(styles.color)).toBe(ColorTokens.palette.black.value);
  }
});

//Test passing a different primitive
test('should render Micro primitive as h4 correctly', () => {
  const content = 'Micro h4';
  const { getByText, container } = render(
    <Micro primitive={'h4'}>{content}</Micro>
  );
  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);
  const elem = container.querySelector('h4');

  expect(elem).toBeInTheDocument();
});

// Test passing a different color
test('should render Micro grey faded correctly', () => {
  const content = 'Micro grey faded';
  const { getByText, container } = render(
    <Micro color={'#F6F6F6'}>{content}</Micro>
  );

  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);

  const styles = window.getComputedStyle(container.firstChild)._values;
  if (styles) {
    expect(styles['color']).toBe('rgb(246, 246, 246)');
  }
});

// Test passing a getFontWeight
test('should render Micro fontWeight 700', () => {
  function _getFontWeight(typescale, bold) {
    return '700';
  }
  const content = 'Micro fontWeight 700';
  const { getByText, container } = render(
    <Micro getFontWeight={_getFontWeight}>{content}</Micro>
  );

  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);

  const styles = window.getComputedStyle(container.firstChild)._values;
  if (styles) {
    expect(parseFloat(styles['font-weight'])).toBe(
      TypographyTokens.fontweight.regular.value
    );
  }
});

// Test - if getFontWeight didn't return any value, fontWeight should be taken from config
test('should render Micro fontWeight from config', () => {
  function _getFontWeight(typescale, bold) {
    return;
  }
  const content = 'Micro fontWeight from config';
  const { getByText, container } = render(
    <Micro getFontWeight={_getFontWeight}>{content}</Micro>
  );

  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);

  const styles = window.getComputedStyle(container.firstChild)._values;
  if (styles) {
    expect(parseFloat(styles['font-weight'])).toBe(
      TypographyTokens.fontweight.regular.value
    );
  }
});

// Test changing the viewport
test('should render Micro with default styles on mobile correctly', () => {
  const content = 'Micro on mobile';
  const { getByText, container } = render(
    <Micro viewport={'mobile'}>{content}</Micro>
  );

  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);
  //Find styling props
  const styles = window.getComputedStyle(container.firstChild)._values;
  if (styles) {
    expect(_calcSize(styles['font-size'])).toBe(
      TypographyTokens.fontsize.micro[11].value
    );
    expect(_calcSize(styles['line-height'])).toBe(
      TypographyTokens.lineheight.micro[16].value
    );
    expect(parseFloat(styles['font-weight'])).toBe(
      TypographyTokens.fontweight.regular.value
    );
    expect(styles['font-family']).toBe(
      'Verizon-NHG-eTX,Helvetica,Arial,Sans-serif'
    );
    expect(rgbToHex(styles.color)).toBe(ColorTokens.palette.black.value);
  }
});

// ============== typescale - VDS ============== //
//                                               //
// ============================================= //

// Default - w/ typescale="VDS"
test('should render Micro VDS typescale correctly', () => {
  const content = 'Micro VDS typescale';
  const { getByText, container } = render(
    <Micro typescale={'VDS'}>{content}</Micro>
  );
  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);
  //Find styling props
  const styles = window.getComputedStyle(container.firstChild)._values;
  if (styles) {
    expect(_calcSize(styles['font-size'])).toBe(
      TypographyTokens.fontsize.micro[11].value
    );
    expect(_calcSize(styles['line-height'])).toBe(
      TypographyTokens.lineheight.micro[16].value
    );
    expect(parseFloat(styles['font-weight'])).toBe(
      TypographyTokens.fontweight.regular.value
    );
    expect(styles['font-family']).toBe(
      'Verizon-NHG-eTX,Helvetica,Arial,Sans-serif'
    );
    expect(rgbToHex(styles.color)).toBe(ColorTokens.palette.black.value);
  }
});
// Default - w/ theme="{typescale: 'VDS'}"
test('should render Micro VDS theme correctly', () => {
  const content = 'Micro VDS theme';
  const theme = { typescale: 'VDS' };
  const { getByText, container } = render(
    <Micro theme={theme}>{content}</Micro>
  );
  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);
  //Find styling props
  const styles = window.getComputedStyle(container.firstChild)._values;
  if (styles) {
    expect(_calcSize(styles['font-size'])).toBe(
      TypographyTokens.fontsize.micro[11].value
    );
    expect(_calcSize(styles['line-height'])).toBe(
      TypographyTokens.lineheight.micro[16].value
    );
    expect(parseFloat(styles['font-weight'])).toBe(
      TypographyTokens.fontweight.regular.value
    );
    expect(styles['font-family']).toBe(
      'Verizon-NHG-eTX,Helvetica,Arial,Sans-serif'
    );
    expect(rgbToHex(styles.color)).toBe(ColorTokens.palette.black.value);
  }
});
// Default - w/ settypescale
test('should render title VDS typescale correctly', () => {
  TypographyConfig.settypescale('VDS');
  const content = 'Title VDS settypescale';
  const { getByText, container } = render(
    <Micro id="test" aria-labelledby="test">
      {content}
    </Micro>
  );
  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);

  const styles = window.getComputedStyle(container.firstChild)._values;
  if (styles) {
    expect(_calcSize(styles['font-size'])).toBe(
      TypographyTokens.fontsize.micro[11].value
    );
    expect(_calcSize(styles['line-height'])).toBe(
      TypographyTokens.lineheight.micro[16].value
    );
    expect(parseFloat(styles['font-weight'])).toBe(
      TypographyTokens.fontweight.regular.value
    );
    expect(styles['font-family']).toBe(
      'Verizon-NHG-eTX,Helvetica,Arial,Sans-serif'
    );
    expect(rgbToHex(styles.color)).toBe(ColorTokens.palette.black.value);
  }
  TypographyConfig.settypescale('MVP');
});
