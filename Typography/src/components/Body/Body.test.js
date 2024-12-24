import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { Body } from '.';
import TypographyConfig from '../../typographyConfig';
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

test('should render Body default props correctly', () => {
  const content = 'Body default';
  const { getByText, container } = render(<Body>{content}</Body>);
  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);
  fireEvent.click(container.firstChild);
  //Find styling props
  const styles = window.getComputedStyle(container.firstChild)._values;
  if (styles) {
    expect(_calcSize(styles['font-size'])).toBe(
      TypographyTokens.fontsize.body[12].value
    );
    expect(_calcSize(styles['line-height'])).toBe(
      TypographyTokens.lineheight.body[16].value
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
test('should render Body primitive as span', () => {
  const content = 'Body span';
  const { getByText, container } = render(
    <Body primitive={'span'}>{content}</Body>
  );
  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);
  const elem = container.querySelector('span');
  expect(elem).toBeInTheDocument();
  //expect(container).getByText('<span')).toBeInTheDocument();
});

// Test passing a different size
test('should render Body large correctly', () => {
  const content = 'Body large';
  const { getByText, container } = render(
    <Body size={'large'}>{content}</Body>
  );

  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);
  //Find styling props
  const styles = window.getComputedStyle(container.firstChild)._values;
  if (styles) {
    expect(_calcSize(styles['font-size'])).toBe(
      TypographyTokens.fontsize.body[16].value
    );
    expect(_calcSize(styles['line-height'])).toBe(
      TypographyTokens.lineheight.body[20].value
    );
  }
});

// Test passing bold
test('should render Body with custom props', () => {
  const content = 'Body Content';
  const { getByText, container } = render(
    <Body size={'medium'} lineHeight={'16px'} letterSpacing={'4px'}>
      {content}
    </Body>
  );

  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);
});

// Test passing bold
test('should render Body bold correctly', () => {
  const content = 'Body bold';
  const { getByText, container } = render(<Body bold>{content}</Body>);

  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);
  //Find styling props
  const styles = window.getComputedStyle(container.firstChild)._values;
  if (styles) {
    expect(parseFloat(styles['font-weight'])).toBe(
      TypographyTokens.fontweight.bold.value
    );
  }
});

// Test passing a different color
test('should render Body grey faded correctly', () => {
  const content = 'Body grey faded';
  const { getByText, container } = render(
    <Body color={'#F6F6F6'}>{content}</Body>
  );

  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);
  //Find styling props
  const styles = window.getComputedStyle(container.firstChild)._values;
  if (styles) {
    expect(styles.color).toBe('rgb(246, 246, 246)');
  }
});

// Test changing the viewport
test('should render Body with default styles on mobile correctly', () => {
  const content = 'Body on mobile';
  const { getByText, container } = render(
    <Body viewport={'mobile'}>{content}</Body>
  );

  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);
  //Find styling props
  const styles = window.getComputedStyle(container.firstChild)._values;
  if (styles) {
    expect(_calcSize(styles['font-size'])).toBe(
      TypographyTokens.fontsize.body[12].value
    );
    expect(_calcSize(styles['line-height'])).toBe(
      TypographyTokens.lineheight.body[16].value
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

// Test changing the viewport
test('should render body small', () => {
  const content = 'Body on mobile';
  const { getByText, container } = render(
    <Body size="small" viewport="desktop">
      {content}
    </Body>
  );

  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);
  //Find styling props
  const styles = window.getComputedStyle(container.firstChild)._values;
  if (styles) {
    expect(_calcSize(styles['font-size'])).toBe(
      TypographyTokens.fontsize.body[12].value
    );
    expect(_calcSize(styles['line-height'])).toBe(
      TypographyTokens.lineheight.body[16].value
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
test('should render Body VDS typescale correctly', () => {
  const content = 'Body VDS typescale';
  const { getByText, container } = render(
    <Body typescale={'VDS'}>{content}</Body>
  );
  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);
  //Find styling props
  const styles = window.getComputedStyle(container.firstChild)._values;
  if (styles) {
    expect(_calcSize(styles['font-size'])).toBe(
      TypographyTokens.fontsize.body[12].value
    );
    expect(_calcSize(styles['line-height'])).toBe(
      TypographyTokens.lineheight.body[16].value
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
test('should render Body VDS theme correctly', () => {
  const content = 'Body VDS theme';
  const theme = { typescale: 'VDS' };
  const { getByText, container } = render(
    <Body id="test" aria-labelledby="test" theme={theme}>
      {content}
    </Body>
  );
  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);
  //Find styling props
  const styles = window.getComputedStyle(container.firstChild)._values;
  if (styles) {
    expect(_calcSize(styles['font-size'])).toBe(
      TypographyTokens.fontsize.body[12].value
    );
    expect(_calcSize(styles['line-height'])).toBe(
      TypographyTokens.lineheight.body[16].value
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
test('should render Body VDS set typescale correctly', () => {
  TypographyConfig.settypescale('VDS');
  const content = 'Body VDS set typescale';
  const theme = { typescale: 'VDS' };
  const { getByText, container } = render(<Body theme={theme}>{content}</Body>);
  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);
  //Find styling props
  const styles = window.getComputedStyle(container.firstChild)._values;
  if (styles) {
    expect(_calcSize(styles['font-size'])).toBe(
      TypographyTokens.fontsize.body[12].value
    );
    expect(_calcSize(styles['line-height'])).toBe(
      TypographyTokens.lineheight.body[16].value
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

// Test adding the strikethrough prop
// test('should render strikethrough prop correctly', () => {
//   const content = 'Body text wtih strikethrough prop';
//   const { getByText, container } = render(<Body strikethrough>{content}</Body>);

//   expect(container.firstChild).toMatchSnapshot();
//   expect(getByText(content).textContent).toBe(content);
//   //Find styling props
//   const styles = window.getComputedStyle(container.firstChild)._values;
//   if (styles) {
//     expect(styles['text-decoration']).toBe('line-through');
//   }
// });

// Size tests should match corresponding config.js in VDS for:
//  - typescale = 'VDS'
//  - viewport  = 'desktop'
//VDS 1.0 BodyConfig
const BodyConfig = {
  VDS: {
    mobile: {
      large: {
        fontSize: 16,
        lineHeight: 20,
        letterSpacing: 0.5,
        fontFamily: 'Verizon-NHG-eDS',
      },
      medium: {
        fontSize: 12,
        lineHeight: 16,
        fontFamily: 'Verizon-NHG-eTX',
      },
      small: {
        fontSize: 12,
        lineHeight: 16,
        fontFamily: 'Verizon-NHG-eTX',
      },
    },
    desktop: {
      large: {
        fontSize: 16,
        lineHeight: 20,
        letterSpacing: 0.5,
        fontFamily: 'Verizon-NHG-eDS',
      },
      medium: {
        fontSize: 12,
        lineHeight: 16,
        fontFamily: 'Verizon-NHG-eTX',
      },
      small: {
        fontSize: 12,
        lineHeight: 16,
        fontFamily: 'Verizon-NHG-eTX',
      },
    },
  },
  getStyles: function getStyles(typescale, viewport, typeSize) {
    return BodyConfig[typescale][viewport][typeSize];
  },
};

// Test VDS BodyConfig
test('should render with VDS BodyConfig', () => {
  TypographyConfig.settypescale('VDS');
  const content = 'should render with VDS BodyConfig';
  const { getByText, container } = render(
    <Body primitive="p" size={'large'} config={BodyConfig}>
      {content}
    </Body>
  );

  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);
  //Find styling props
  const styles = window.getComputedStyle(container.firstChild)._values;
  if (styles) {
    expect(_calcSize(styles['font-size'])).toBe(
      TypographyTokens.fontsize.body[16].value
    );
    expect(styles['letter-spacing']).toBe('0.03125rem');
    expect(styles['font-family']).toBe(
      'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
    );
  }
  TypographyConfig.settypescale('MVP');
});
