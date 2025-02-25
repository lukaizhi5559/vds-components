import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { Subtitle } from '.';

function _calcSize(remVal) {
  const baseFont = 16;
  let num = parseFloat(remVal);
  return num * baseFont;
}

test('should render Subtitle default props correctly', () => {
  const content = 'Subtitle default';
  const { getByText, container } = render(<Subtitle>{content}</Subtitle>);
  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);
  fireEvent.click(container.firstChild);
  //Find styling props
  const styles = window.getComputedStyle(container.firstChild)._values;
  if (styles) {
    expect(_calcSize(styles['font-size'])).toBe(20);
    expect(_calcSize(styles['line-height'])).toBe(24);
    expect(styles['font-weight']).toBe('normal');
    expect(styles['font-family']).toBe(
      'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
    );
    expect(styles.color).toBe('rgb(0, 0, 0)');
  }
});

// Default - w/ typescale="MVP"
test('should render Subtitle MVP typescale correctly', () => {
  const content = 'Subtitle default';
  const { getByText, container } = render(
    <Subtitle typescale={'MVP'}>{content}</Subtitle>
  );
  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);
  //Find styling props
  const styles = window.getComputedStyle(container.firstChild)._values;
  if (styles) {
    expect(_calcSize(styles['font-size'])).toBe(20);
    expect(_calcSize(styles['line-height'])).toBe(24);
    expect(styles['font-weight']).toBe('normal');
    expect(styles['font-family']).toBe(
      'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
    );
    expect(styles.color).toBe('rgb(0, 0, 0)');
  }
});
// Default - w/ theme="{typescale: "MVP"}
test('should render Subtitle theme props correctly', () => {
  const content = 'Subtitle MVP w/ theme';
  const theme = { typescale: 'MVP' };
  const { getByText, container } = render(
    <Subtitle theme={theme}>{content}</Subtitle>
  );
  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);
  //Find styling props
  const styles = window.getComputedStyle(container.firstChild)._values;
  if (styles) {
    expect(_calcSize(styles['font-size'])).toBe(20);
    expect(_calcSize(styles['line-height'])).toBe(24);
    expect(styles['font-weight']).toBe('normal');
    expect(styles['font-family']).toBe(
      'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
    );
    expect(styles.color).toBe('rgb(0, 0, 0)');
  }
});

//Test passing a different primitive
test('should render Subtitle primitive as h4 correctly', () => {
  const content = 'Subtitle h4';
  const { getByText, container } = render(
    <Subtitle primitive={'h4'}>{content}</Subtitle>
  );
  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);
  const elem = container.querySelector('h4');

  expect(elem).toBeInTheDocument();
});

// Test passing a different color
test('should render Subtitle grey faded correctly', () => {
  const content = 'Subtitle grey faded';
  const { getByText, container } = render(
    <Subtitle color={'#F6F6F6'}>{content}</Subtitle>
  );

  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);

  const styles = window.getComputedStyle(container.firstChild)._values;
  if (styles) {
    expect(styles['color']).toBe('rgb(246, 246, 246)');
  }
});

// Test changing the viewport
test('should render Subtitle with default styles on mobile correctly', () => {
  const content = 'Subtitle on mobile';
  const { getByText, container } = render(
    <Subtitle viewport={'mobile'}>{content}</Subtitle>
  );

  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);
  //Find styling props
  const styles = window.getComputedStyle(container.firstChild)._values;
  if (styles) {
    expect(_calcSize(styles['font-size'])).toBe(20);
    expect(_calcSize(styles['line-height'])).toBe(24);
    expect(styles['font-weight']).toBe('normal');
    expect(styles['font-family']).toBe(
      'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
    );
    expect(styles.color).toBe('rgb(0, 0, 0)');
  }
});

// ============== typescale - VDS ============== //
//                                               //
// ============================================= //

// Default - w/ typescale="VDS"
test('should render Subtitle VDS typescale correctly', () => {
  const content = 'Subtitle VDS typescale';
  const { getByText, container } = render(
    <Subtitle typescale={'VDS'}>{content}</Subtitle>
  );
  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);
  //Find styling props
  const styles = window.getComputedStyle(container.firstChild)._values;
  if (styles) {
    expect(_calcSize(styles['font-size'])).toBe(20);
    expect(_calcSize(styles['line-height'])).toBe(24);
    expect(styles['font-weight']).toBe('normal');
    expect(styles['font-family']).toBe(
      'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
    );
    expect(styles.color).toBe('rgb(0, 0, 0)');
  }
});
// Default - w/ theme="{typescale: 'VDS'}"
test('should render Subtitle VDS theme correctly', () => {
  const content = 'Subtitle VDS theme';
  const theme = { typescale: 'VDS' };
  const { getByText, container } = render(
    <Subtitle theme={theme}>{content}</Subtitle>
  );
  expect(container.firstChild).toMatchSnapshot();
  expect(getByText(content).textContent).toBe(content);
  //Find styling props
  const styles = window.getComputedStyle(container.firstChild)._values;
  if (styles) {
    expect(_calcSize(styles['font-size'])).toBe(20);
    expect(_calcSize(styles['line-height'])).toBe(24);
    expect(styles['font-weight']).toBe('normal');
    expect(styles['font-family']).toBe(
      'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
    );
    expect(styles.color).toBe('rgb(0, 0, 0)');
  }
});
