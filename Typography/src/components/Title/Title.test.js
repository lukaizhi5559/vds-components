import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { Title } from '.';
import TypographyConfig from '../../typographyConfig';
import { Fonts } from '../../fonts';
import { TypographyTokens } from '@vds-tokens/typography';
import { ColorTokens } from '@vds-tokens/color';

// Default tests should match corresponding config.js in package for:
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

test('should render title default props correctly', () => {
  const content = 'Title default';
  const { getByText, container } = render(<Title>{content}</Title>);
  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);
  fireEvent.click(container.firstChild);

  //Find styling props
  const styles = window.getComputedStyle(container.firstChild)._values;
  if (styles) {
    expect(_calcSize(styles['font-size'])).toBe(
      TypographyTokens.fontsize.title[20].value
    );
    expect(_calcSize(styles['line-height'])).toBe(
      TypographyTokens.lineheight.title[24].value
    );
    // expect(styles['font-weight']).toBe('750');
    expect(styles['font-family']).toBe(
      'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
    );
    expect(rgbToHex(styles.color)).toBe(ColorTokens.palette.black.value);
  }
});

test('should render title custom props correctly', () => {
  const content = 'Title default';
  const { getByText, container } = render(
    <Title size={'medium'} fontSize={'20px'} lineHeight={'24px'}>
      {content}
    </Title>
  );
  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);
  fireEvent.click(container.firstChild);

  //Find styling props
  const styles = window.getComputedStyle(container.firstChild)._values;
  if (styles) {
    expect(_calcSize(styles['font-size'])).toBe(
      TypographyTokens.fontsize.title[20].value
    );
    expect(_calcSize(styles['line-height'])).toBe(
      TypographyTokens.lineheight.title[24].value
    );
    // expect(styles['font-weight']).toBe('750');
    expect(styles['font-family']).toBe(
      'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
    );
    expect(rgbToHex(styles.color)).toBe(ColorTokens.palette.black.value);
  }
});

// Default - w/ typescale="MVP"
test('should render title MVP typescale correctly', () => {
  const content = 'Title default';
  const { getByText, container } = render(
    <Title typescale={'MVP'}>{content}</Title>
  );
  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);

  const styles = window.getComputedStyle(container.firstChild)._values;
  if (styles) {
    expect(_calcSize(styles['font-size'])).toBe(
      TypographyTokens.fontsize.title[20].value
    );
    expect(_calcSize(styles['line-height'])).toBe(
      TypographyTokens.lineheight.title[24].value
    );
    expect(parseFloat(styles['font-weight'])).toBe(
      TypographyTokens.fontweight.regular.value
    );
    expect(styles['font-family']).toBe(
      'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
    );
    expect(rgbToHex(styles.color)).toBe(ColorTokens.palette.black.value);
  }
});
// Default - w/ theme="{typescale: "MVP"}
test('should render title theme props correctly', () => {
  const content = 'Title MVP w/ theme';
  const theme = { typescale: 'MVP' };
  const { getByText, container } = render(
    <Title theme={theme}>{content}</Title>
  );
  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);

  const styles = window.getComputedStyle(container.firstChild)._values;
  if (styles) {
    expect(_calcSize(styles['font-size'])).toBe(
      TypographyTokens.fontsize.title[20].value
    );
    expect(_calcSize(styles['line-height'])).toBe(
      TypographyTokens.lineheight.title[24].value
    );
    expect(parseFloat(styles['font-weight'])).toBe(
      TypographyTokens.fontweight.regular.value
    );
    expect(styles['font-family']).toBe(
      'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
    );
    expect(rgbToHex(styles.color)).toBe(ColorTokens.palette.black.value);
  }
});

//Test passing a different primitive
test('should render title primitive as h2', () => {
  const content = 'Title h2';
  const { getByText, container } = render(
    <Title primitive={'h2'}>{content}</Title>
  );
  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);
  const elem = container.querySelector('h2');

  expect(elem).toBeInTheDocument();
});

// Test passing a different size
test('should render title large correctly', () => {
  const content = 'Title large';
  const { getByText, container } = render(
    <Title size={'large'}>{content}</Title>
  );

  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);

  const styles = window.getComputedStyle(container.firstChild)._values;
  if (styles) {
    expect(_calcSize(styles['font-size'])).toBe(
      TypographyTokens.fontsize.title[32].value
    );
    expect(_calcSize(styles['line-height'])).toBe(
      TypographyTokens.lineheight.title[36].value
    );
    expect(parseFloat(styles['font-weight'])).toBe(
      TypographyTokens.fontweight.light.value
    );
  }
});

// Test passing a different color
test('should render title grey faded correctly', () => {
  const content = 'Title grey faded';
  const { getByText, container } = render(
    <Title color={'#F6F6F6'}>{content}</Title>
  );

  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);

  const styles = window.getComputedStyle(container.firstChild)._values;
  if (styles) {
    expect(styles['color']).toBe('rgb(246, 246, 246)');
  }
});

// Test changing the viewport
test('should render title with default styles on mobile correctly', () => {
  const content = 'Title on mobile';
  const { getByText, container } = render(
    <Title viewport={'mobile'}>{content}</Title>
  );

  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);
  //Find styling props
  const styles = window.getComputedStyle(container.firstChild)._values;
  if (styles) {
    expect(_calcSize(styles['font-size'])).toBe(
      TypographyTokens.fontsize.title[16].value
    );
    expect(_calcSize(styles['line-height'])).toBe(
      TypographyTokens.lineheight.title[20].value
    );
    expect(parseFloat(styles['font-weight'])).toBe(
      TypographyTokens.fontweight.regular.value
    );
    expect(styles['font-family']).toBe(
      'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
    );
  }
});
test('should render title medium with bold prop true', () => {
  const content = 'Title medium normal';
  const { getByText, container } = render(
    <Title
      id="test"
      aria-labelledby="test"
      size="medium"
      bold={true}
      viewport="desktop"
    >
      {content}
    </Title>
  );

  const styles = window.getComputedStyle(container.firstChild)._values;
  if (styles) {
    expect(_calcSize(styles['font-size'])).toBe(
      TypographyTokens.fontsize.title[24].value
    );
    expect(_calcSize(styles['line-height'])).toBe(
      TypographyTokens.lineheight.title[28].value
    );
    expect(parseFloat(styles['font-weight'])).toBe(
      TypographyTokens.fontweight.bold.value
    );
    expect(styles['font-family']).toBe(
      'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
    );
    expect(rgbToHex(styles.color)).toBe(ColorTokens.palette.black.value);
  }
});

test('should render title bold prop false only when size medium', () => {
  const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
  const content = 'Title large';
  const { getByText, container } = render(
    <Title
      id="test"
      aria-labelledby="test"
      size="large"
      bold={false}
      viewport="desktop"
    >
      {content}
    </Title>
  );

  const styles = window.getComputedStyle(container.firstChild)._values;
  if (styles) {
    expect(_calcSize(styles['font-size'])).toBe(
      TypographyTokens.fontsize.title[32].value
    );
    expect(_calcSize(styles['line-height'])).toBe(
      TypographyTokens.lineheight.title[36].value
    );
    expect(parseFloat(styles['font-weight'])).toBe(
      TypographyTokens.fontweight.light.value
    );
  }
  warn.mockReset();
});

// ============== typescale - VDS ============== //
//                                               //
// ============================================= //

// Default - w/ typescale="VDS"
test('should render title VDS typescale correctly', () => {
  const content = 'Title VDS typescale';
  const { getByText, container } = render(
    <Title typescale={'VDS'}>{content}</Title>
  );
  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);

  const styles = window.getComputedStyle(container.firstChild)._values;
  if (styles) {
    expect(_calcSize(styles['font-size'])).toBe(
      TypographyTokens.fontsize.title[20].value
    );
    expect(_calcSize(styles['line-height'])).toBe(
      TypographyTokens.lineheight.title[24].value
    );
    expect(parseFloat(styles['font-weight'])).toBe(
      TypographyTokens.fontweight.regular.value
    );
    expect(styles['font-family']).toBe(
      'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
    );
    expect(rgbToHex(styles.color)).toBe(ColorTokens.palette.black.value);
  }
});
// Default - w/ theme="{typescale: 'VDS'}"
test('should render title VDS theme correctly', () => {
  const content = 'Title VDS theme';
  const theme = { typescale: 'VDS' };
  const { getByText, container } = render(
    <Title theme={theme}>{content}</Title>
  );
  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);

  const styles = window.getComputedStyle(container.firstChild)._values;
  if (styles) {
    expect(_calcSize(styles['font-size'])).toBe(
      TypographyTokens.fontsize.title[20].value
    );
    expect(_calcSize(styles['line-height'])).toBe(
      TypographyTokens.lineheight.title[24].value
    );
    expect(parseFloat(styles['font-weight'])).toBe(
      TypographyTokens.fontweight.regular.value
    );
    expect(styles['font-family']).toBe(
      'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
    );
    expect(rgbToHex(styles.color)).toBe(ColorTokens.palette.black.value);
  }
});
// Default - w/ settypescale
test('should render title VDS typescale correctly', () => {
  TypographyConfig.settypescale('VDS');
  const content = 'Title VDS settypescale';
  const { getByText, container } = render(
    <Title id="test" aria-labelledby="test">
      {content}
    </Title>
  );
  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);

  const styles = window.getComputedStyle(container.firstChild)._values;
  if (styles) {
    expect(_calcSize(styles['font-size'])).toBe(
      TypographyTokens.fontsize.title[20].value
    );
    expect(_calcSize(styles['line-height'])).toBe(
      TypographyTokens.lineheight.title[24].value
    );
    expect(parseFloat(styles['font-weight'])).toBe(
      TypographyTokens.fontweight.regular.value
    );
    expect(styles['font-family']).toBe(
      'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
    );
    expect(rgbToHex(styles.color)).toBe(ColorTokens.palette.black.value);
  }
  TypographyConfig.settypescale('MVP');
});

// Default - w/ settypescale
test('should render title small', () => {
  TypographyConfig.settypescale('VDS');
  const content = 'Title VDS settypescale';
  const { getByText, container } = render(
    <Title id="test" aria-labelledby="test" viewport="desktop">
      {content}
    </Title>
  );

  const styles = window.getComputedStyle(container.firstChild)._values;
  if (styles) {
    expect(_calcSize(styles['font-size'])).toBe(
      TypographyTokens.fontsize.title[20].value
    );
    expect(_calcSize(styles['line-height'])).toBe(
      TypographyTokens.lineheight.title[24].value
    );
    expect(parseFloat(styles['font-weight'])).toBe(
      TypographyTokens.fontweight.regular.value
    );
    expect(styles['font-family']).toBe(
      'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
    );
    expect(rgbToHex(styles.color)).toBe(ColorTokens.palette.black.value);
  }
  TypographyConfig.settypescale('MVP');
});

// Default - w/ settypescale
test('should render title medium with bold prop false', () => {
  TypographyConfig.settypescale('VDS');
  const content = 'Title VDS medium normal';
  const { getByText, container } = render(
    <Title
      id="test"
      aria-labelledby="test"
      size="medium"
      bold={false}
      viewport="desktop"
    >
      {content}
    </Title>
  );

  const styles = window.getComputedStyle(container.firstChild)._values;
  if (styles) {
    expect(_calcSize(styles['font-size'])).toBe(
      TypographyTokens.fontsize.title[24].value
    );
    expect(_calcSize(styles['line-height'])).toBe(
      TypographyTokens.lineheight.title[28].value
    );
    expect(parseFloat(styles['font-weight'])).toBe(
      TypographyTokens.fontweight.regular.value
    );
    expect(styles['font-family']).toBe(
      'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
    );
    expect(rgbToHex(styles.color)).toBe(ColorTokens.palette.black.value);
  }
  TypographyConfig.settypescale('MVP');
});
