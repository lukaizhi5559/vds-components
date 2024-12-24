import { render } from '@testing-library/react';
import React from 'react';
import RESTRICTED_Icon from './RESTRICTED_Icon/RESTRICTED_Icon';

// styles testing starts

test('Restricted_Icon checkmark small', () => {
  const { container } = render(
    <RESTRICTED_Icon size="small" name="checkmark" />
  );

  const caretIconStyleLeft = container.querySelector(
    '[class^="StyledSVG"][aria-label="checkmark icon"]'
  );
  expect(caretIconStyleLeft).toHaveStyleRule('width', '1rem');
  expect(caretIconStyleLeft).toHaveStyleRule('width', '1rem');
  const fillcolor = container.querySelector(
    '[class^="StyledSVG"][aria-label="checkmark icon"] path'
  );
  expect(fillcolor.getAttribute('fill')).toBe('#000000');
  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon checkmark small', () => {
  const { container } = render(
    <RESTRICTED_Icon size="small" name="checkmark" color={'#FBE4D7'} />
  );

  const caretIconStyleLeft = container.querySelector(
    '[class^="StyledSVG"][aria-label="checkmark icon"]'
  );
  expect(caretIconStyleLeft).toHaveStyleRule('width', '1rem');
  expect(caretIconStyleLeft).toHaveStyleRule('width', '1rem');
  const fillcolor = container.querySelector(
    '[class^="StyledSVG"][aria-label="checkmark icon"] path'
  );
  expect(fillcolor.getAttribute('fill')).toBe('#FBE4D7');
  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon checkmark medium', () => {
  const { container } = render(
    <RESTRICTED_Icon size="medium" name="checkmark" />
  );

  const caretIconStyleLeft = container.querySelector(
    '[class^="StyledSVG"][aria-label="checkmark icon"]'
  );
  expect(caretIconStyleLeft).toHaveStyleRule('width', '1.25rem');
  expect(caretIconStyleLeft).toHaveStyleRule('width', '1.25rem');
  const fillcolor = container.querySelector(
    '[class^="StyledSVG"][aria-label="checkmark icon"] path'
  );
  expect(fillcolor.getAttribute('fill')).toBe('#000000');
  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon checkmark large', () => {
  const { container } = render(
    <RESTRICTED_Icon size="large" name="checkmark" />
  );

  const caretIconStyleLeft = container.querySelector(
    '[class^="StyledSVG"][aria-label="checkmark icon"]'
  );
  expect(caretIconStyleLeft).toHaveStyleRule('width', '1.5rem');
  expect(caretIconStyleLeft).toHaveStyleRule('width', '1.5rem');
  const fillcolor = container.querySelector(
    '[class^="StyledSVG"][aria-label="checkmark icon"] path'
  );
  expect(fillcolor.getAttribute('fill')).toBe('#000000');
  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon checkmark XLarge', () => {
  const { container } = render(
    <RESTRICTED_Icon size="XLarge" name="checkmark" />
  );

  const caretIconStyleLeft = container.querySelector(
    '[class^="StyledSVG"][aria-label="checkmark icon"]'
  );
  expect(caretIconStyleLeft).toHaveStyleRule('width', '1.75rem');
  expect(caretIconStyleLeft).toHaveStyleRule('width', '1.75rem');
  const fillcolor = container.querySelector(
    '[class^="StyledSVG"][aria-label="checkmark icon"] path'
  );
  expect(fillcolor.getAttribute('fill')).toBe('#000000');
  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon checkmark XLarge dark surface', () => {
  const { container } = render(
    <RESTRICTED_Icon size="XLarge" name="checkmark" surface="dark" />
  );

  const caretIconStyleLeft = container.querySelector(
    '[class^="StyledSVG"][aria-label="checkmark icon"]'
  );
  expect(caretIconStyleLeft).toHaveStyleRule('width', '1.75rem');
  expect(caretIconStyleLeft).toHaveStyleRule('width', '1.75rem');
  const fillcolor = container.querySelector(
    '[class^="StyledSVG"][aria-label="checkmark icon"] path'
  );
  expect(fillcolor.getAttribute('fill')).toBe('#ffffff');
  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon close small', () => {
  const { container } = render(<RESTRICTED_Icon size="small" name="close" />);

  const caretIconStyleLeft = container.querySelector(
    '[class^="StyledSVG"][aria-label="close icon"]'
  );
  expect(caretIconStyleLeft).toHaveStyleRule('width', '1rem');
  expect(caretIconStyleLeft).toHaveStyleRule('width', '1rem');
  const fillcolor = container.querySelector(
    '[class^="StyledSVG"][aria-label="close icon"] path'
  );
  expect(fillcolor.getAttribute('fill')).toBe('#000000');
  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon close small', () => {
  const { container } = render(
    <RESTRICTED_Icon size="small" name="close" color={'#ED7000'} />
  );

  const caretIconStyleLeft = container.querySelector(
    '[class^="StyledSVG"][aria-label="close icon"]'
  );
  expect(caretIconStyleLeft).toHaveStyleRule('width', '1rem');
  expect(caretIconStyleLeft).toHaveStyleRule('width', '1rem');
  const fillcolor = container.querySelector(
    '[class^="StyledSVG"][aria-label="close icon"] path'
  );
  expect(fillcolor.getAttribute('fill')).toBe('#ED7000');
  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon close medium', () => {
  const { container } = render(<RESTRICTED_Icon size="medium" name="close" />);

  const caretIconStyleLeft = container.querySelector(
    '[class^="StyledSVG"][aria-label="close icon"]'
  );
  expect(caretIconStyleLeft).toHaveStyleRule('width', '1.25rem');
  expect(caretIconStyleLeft).toHaveStyleRule('width', '1.25rem');
  const fillcolor = container.querySelector(
    '[class^="StyledSVG"][aria-label="close icon"] path'
  );
  expect(fillcolor.getAttribute('fill')).toBe('#000000');
  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon close large', () => {
  const { container } = render(<RESTRICTED_Icon size="large" name="close" />);

  const caretIconStyleLeft = container.querySelector(
    '[class^="StyledSVG"][aria-label="close icon"]'
  );
  expect(caretIconStyleLeft).toHaveStyleRule('width', '1.5rem');
  expect(caretIconStyleLeft).toHaveStyleRule('width', '1.5rem');
  const fillcolor = container.querySelector(
    '[class^="StyledSVG"][aria-label="close icon"] path'
  );
  expect(fillcolor.getAttribute('fill')).toBe('#000000');
  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon close XLarge', () => {
  const { container } = render(<RESTRICTED_Icon size="XLarge" name="close" />);

  const caretIconStyleLeft = container.querySelector(
    '[class^="StyledSVG"][aria-label="close icon"]'
  );
  expect(caretIconStyleLeft).toHaveStyleRule('width', '1.75rem');
  expect(caretIconStyleLeft).toHaveStyleRule('width', '1.75rem');
  const fillcolor = container.querySelector(
    '[class^="StyledSVG"][aria-label="close icon"] path'
  );
  expect(fillcolor.getAttribute('fill')).toBe('#000000');
  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon close XLarge dark surface', () => {
  const { container } = render(
    <RESTRICTED_Icon size="XLarge" name="close" surface="dark" />
  );

  const caretIconStyleLeft = container.querySelector(
    '[class^="StyledSVG"][aria-label="close icon"]'
  );
  expect(caretIconStyleLeft).toHaveStyleRule('width', '1.75rem');
  expect(caretIconStyleLeft).toHaveStyleRule('width', '1.75rem');
  const fillcolor = container.querySelector(
    '[class^="StyledSVG"][aria-label="close icon"] path'
  );
  expect(fillcolor.getAttribute('fill')).toBe('#ffffff');
  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon error small', () => {
  const { container } = render(<RESTRICTED_Icon size="small" name="error" />);

  const caretIconStyleLeft = container.querySelector(
    '[class^="StyledSVG"][aria-label="error icon"]'
  );
  expect(caretIconStyleLeft).toHaveStyleRule('width', '1rem');
  expect(caretIconStyleLeft).toHaveStyleRule('width', '1rem');
  const fillcolor = container.querySelector(
    '[class^="StyledSVG"][aria-label="error icon"] path'
  );
  expect(fillcolor.getAttribute('fill')).toBe('#000000');
  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon error small', () => {
  const { container } = render(
    <RESTRICTED_Icon size="small" name="error" color={'#D6EEFB'} />
  );

  const caretIconStyleLeft = container.querySelector(
    '[class^="StyledSVG"][aria-label="error icon"]'
  );
  expect(caretIconStyleLeft).toHaveStyleRule('width', '1rem');
  expect(caretIconStyleLeft).toHaveStyleRule('width', '1rem');
  const fillcolor = container.querySelector(
    '[class^="StyledSVG"][aria-label="error icon"] path'
  );
  expect(fillcolor.getAttribute('fill')).toBe('#D6EEFB');
  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon error medium', () => {
  const { container } = render(<RESTRICTED_Icon size="medium" name="error" />);

  const caretIconStyleLeft = container.querySelector(
    '[class^="StyledSVG"][aria-label="error icon"]'
  );
  expect(caretIconStyleLeft).toHaveStyleRule('width', '1.25rem');
  expect(caretIconStyleLeft).toHaveStyleRule('width', '1.25rem');
  const fillcolor = container.querySelector(
    '[class^="StyledSVG"][aria-label="error icon"] path'
  );
  expect(fillcolor.getAttribute('fill')).toBe('#000000');
  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon error large', () => {
  const { container } = render(<RESTRICTED_Icon size="large" name="error" />);

  const caretIconStyleLeft = container.querySelector(
    '[class^="StyledSVG"][aria-label="error icon"]'
  );
  expect(caretIconStyleLeft).toHaveStyleRule('width', '1.5rem');
  expect(caretIconStyleLeft).toHaveStyleRule('width', '1.5rem');
  const fillcolor = container.querySelector(
    '[class^="StyledSVG"][aria-label="error icon"] path'
  );
  expect(fillcolor.getAttribute('fill')).toBe('#000000');
  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon error XLarge', () => {
  const { container } = render(<RESTRICTED_Icon size="XLarge" name="error" />);

  const caretIconStyleLeft = container.querySelector(
    '[class^="StyledSVG"][aria-label="error icon"]'
  );
  expect(caretIconStyleLeft).toHaveStyleRule('width', '1.75rem');
  expect(caretIconStyleLeft).toHaveStyleRule('width', '1.75rem');
  const fillcolor = container.querySelector(
    '[class^="StyledSVG"][aria-label="error icon"] path'
  );
  expect(fillcolor.getAttribute('fill')).toBe('#000000');
  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon error XLarge dark surface', () => {
  const { container } = render(
    <RESTRICTED_Icon size="XLarge" name="error" surface="dark" />
  );

  const caretIconStyleLeft = container.querySelector(
    '[class^="StyledSVG"][aria-label="error icon"]'
  );
  expect(caretIconStyleLeft).toHaveStyleRule('width', '1.75rem');
  expect(caretIconStyleLeft).toHaveStyleRule('width', '1.75rem');
  const fillcolor = container.querySelector(
    '[class^="StyledSVG"][aria-label="error icon"] path'
  );
  expect(fillcolor.getAttribute('fill')).toBe('#ffffff');
  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon left-caret small', () => {
  const { container } = render(
    <RESTRICTED_Icon size="small" name="left-caret" />
  );

  const caretIconStyleLeft = container.querySelector(
    '[class^="StyledSVG"][aria-label="left-caret icon"]'
  );
  expect(caretIconStyleLeft).toHaveStyleRule('width', '1rem');
  expect(caretIconStyleLeft).toHaveStyleRule('width', '1rem');
  const fillcolor = container.querySelector(
    '[class^="StyledSVG"][aria-label="left-caret icon"] path'
  );
  expect(fillcolor.getAttribute('fill')).toBe('#000000');
  // const stylefill = window.getComputedStyle(fillcolor)._values;
  // expect(stylefill['fill']).toBe('#000000');

  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon left-caret medium', () => {
  const { container } = render(
    <RESTRICTED_Icon size="medium" name="left-caret" />
  );

  const caretIconStyleLeft = container.querySelector(
    '[class^="StyledSVG"][aria-label="left-caret icon"]'
  );
  expect(caretIconStyleLeft).toHaveStyleRule('width', '1.25rem');
  expect(caretIconStyleLeft).toHaveStyleRule('width', '1.25rem');
  const fillcolor = container.querySelector(
    '[class^="StyledSVG"][aria-label="left-caret icon"] path'
  );
  expect(fillcolor.getAttribute('fill')).toBe('#000000');
  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon left-caret large', () => {
  const { container } = render(
    <RESTRICTED_Icon size="large" name="left-caret" />
  );

  const caretIconStyleLeft = container.querySelector(
    '[class^="StyledSVG"][aria-label="left-caret icon"]'
  );
  expect(caretIconStyleLeft).toHaveStyleRule('width', '1.5rem');
  expect(caretIconStyleLeft).toHaveStyleRule('width', '1.5rem');
  const fillcolor = container.querySelector(
    '[class^="StyledSVG"][aria-label="left-caret icon"] path'
  );
  expect(fillcolor.getAttribute('fill')).toBe('#000000');
  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon left-caret XLarge', () => {
  const { container } = render(
    <RESTRICTED_Icon size="XLarge" name="left-caret" />
  );

  const caretIconStyleLeft = container.querySelector(
    '[class^="StyledSVG"][aria-label="left-caret icon"]'
  );
  expect(caretIconStyleLeft).toHaveStyleRule('width', '1.75rem');
  expect(caretIconStyleLeft).toHaveStyleRule('width', '1.75rem');
  const fillcolor = container.querySelector(
    '[class^="StyledSVG"][aria-label="left-caret icon"] path'
  );
  expect(fillcolor.getAttribute('fill')).toBe('#000000');
  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon left-caret XLarge dark surface', () => {
  const { container } = render(
    <RESTRICTED_Icon size="XLarge" name="left-caret" surface="dark" />
  );

  const caretIconStyleLeft = container.querySelector(
    '[class^="StyledSVG"][aria-label="left-caret icon"]'
  );
  expect(caretIconStyleLeft).toHaveStyleRule('width', '1.75rem');
  expect(caretIconStyleLeft).toHaveStyleRule('width', '1.75rem');
  const fillcolor = container.querySelector(
    '[class^="StyledSVG"][aria-label="left-caret icon"] path'
  );
  expect(fillcolor.getAttribute('fill')).toBe('#ffffff');
  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon left-caret XLarge dark surface color', () => {
  const { container } = render(
    <RESTRICTED_Icon
      size="XLarge"
      name="left-caret"
      surface="dark"
      color={'#0077B4'}
    />
  );

  const caretIconStyleLeft = container.querySelector(
    '[class^="StyledSVG"][aria-label="left-caret icon"]'
  );
  expect(caretIconStyleLeft).toHaveStyleRule('width', '1.75rem');
  expect(caretIconStyleLeft).toHaveStyleRule('width', '1.75rem');
  const fillcolor = container.querySelector(
    '[class^="StyledSVG"][aria-label="left-caret icon"] path'
  );
  expect(fillcolor.getAttribute('fill')).toBe('#0077B4');
  expect(container.firstChild).toMatchSnapshot();
});

// styles testing ends

test('Restricted_Icon extraLarge', () => {
  const { container } = render(
    <RESTRICTED_Icon size="extraLarge" name="left-caret" />
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon small bold', () => {
  const { container } = render(
    <RESTRICTED_Icon size="small" name="left-caret" bold />
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon large bold pagination-arrow-right', () => {
  const { container } = render(
    <RESTRICTED_Icon size="large" name="pagination-right-arrow" />
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon medium bold pagination-arrow-left bold', () => {
  const { container } = render(
    <RESTRICTED_Icon size="medium" name="pagination-left-arrow" bold />
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon medium surface="dark" no color', () => {
  const { container } = render(
    <RESTRICTED_Icon
      size="medium"
      name="left-caret"
      surface="dark"
      color={null}
      lineColor={null}
    />
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon medium surface="dark" with custom color black', () => {
  const { container } = render(
    <RESTRICTED_Icon
      size="medium"
      name="left-caret"
      surface="dark"
      color="#000000"
    />
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon no size surface="dark" with custom color Black', () => {
  const { container } = render(
    <RESTRICTED_Icon name="left-caret" surface="dark" color="#000000" />
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon XLarge surface="dark" with custom color ', () => {
  const { container } = render(
    <RESTRICTED_Icon
      size="XLarge"
      name="left-caret"
      surface="dark"
      color="#000000"
    />
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon ariaLabel ', () => {
  const { container } = render(
    <RESTRICTED_Icon size="XLarge" name="left-caret" ariaLabel="Test" />
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon tabIndex -1 ', () => {
  const { container } = render(
    <RESTRICTED_Icon size="XLarge" name="left-caret" tabIndex={-1} />
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon ', () => {
  const { container } = render(
    <RESTRICTED_Icon size="XLarge" name="left-caret" />
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon size of number ', () => {
  const { container } = render(<RESTRICTED_Icon size={23} name="left-caret" />);

  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon surface="dark" ', () => {
  const { container } = render(
    <RESTRICTED_Icon size="XLarge" name="left-caret" surface="dark" />
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon surface="dark" ', () => {
  const { container } = render(
    <RESTRICTED_Icon size="XLarge" name="down-caret" surface="dark" />
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon surface="dark" ', () => {
  const { container } = render(
    <RESTRICTED_Icon
      size="XLarge"
      name="pagination-left-arrow"
      surface="dark"
    />
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon bold surface="dark" ', () => {
  const { container } = render(
    <RESTRICTED_Icon size="XLarge" name="error" surface="dark" />
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon bold ', () => {
  const { container } = render(
    <RESTRICTED_Icon size="XLarge" name="pagination-right-arrow" bold />
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon bold medium surface="dark" ', () => {
  const { container } = render(
    <RESTRICTED_Icon size="medium" name="left-caret" surface="dark" />
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon bold ', () => {
  const { container } = render(
    <RESTRICTED_Icon size="XLarge" name="checkmark-alt" surface="dark" />
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon surface="dark" ', () => {
  const { container } = render(
    <RESTRICTED_Icon size="XLarge" name="checkmark-alt" surface="dark" />
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon bold surface="dark" ', () => {
  const { container } = render(
    <RESTRICTED_Icon size="XLarge" name="checkmark" surface="dark" />
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon surface="dark" ', () => {
  const { container } = render(
    <RESTRICTED_Icon size="XLarge" name="checkmark" surface="dark" />
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon bold surface="dark" ', () => {
  const { container } = render(
    <RESTRICTED_Icon size="XLarge" name="close" surface="dark" />
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon surface="dark" ', () => {
  const { container } = render(
    <RESTRICTED_Icon size="XLarge" name="close" surface="dark" />
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon surface="dark" ', () => {
  const { container } = render(
    <RESTRICTED_Icon size="XLarge" name="down-caret" surface="dark" />
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon bold surface="dark" ', () => {
  const { container } = render(
    <RESTRICTED_Icon size="XLarge" name="error" surface="dark" />
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon surface="dark" ', () => {
  const { container } = render(
    <RESTRICTED_Icon size="XLarge" name="error" surface="dark" />
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon surface="dark" ', () => {
  const { container } = render(
    <RESTRICTED_Icon size="XLarge" name="info" surface="dark" />
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon bold surface="dark" ', () => {
  const { container } = render(
    <RESTRICTED_Icon size="XLarge" name="info" bold surface="dark" />
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon bold ', () => {
  const { container } = render(
    <RESTRICTED_Icon size="XLarge" name="pagination-right-arrow" bold />
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon surface="dark" ', () => {
  const { container } = render(
    <RESTRICTED_Icon size="small" name="left-caret" surface="dark" />
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon surface="dark" ', () => {
  const { container } = render(
    <RESTRICTED_Icon
      size="XLarge"
      name="pagination-left-arrow"
      surface="dark"
    />
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon surface="dark" ', () => {
  const { container } = render(
    <RESTRICTED_Icon
      size="XLarge"
      name="pagination-right-arrow"
      surface="dark"
    />
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon bold surface="dark" ', () => {
  const { container } = render(
    <RESTRICTED_Icon size="XLarge" name="warning" surface="dark" />
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon surface="dark" no color', () => {
  const { container } = render(
    <RESTRICTED_Icon
      size="XLarge"
      name="warning"
      surface="dark"
      color={null}
      lineColor={null}
    />
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Restricted_Icon bold surface="dark" no color', () => {
  const { container } = render(
    <RESTRICTED_Icon
      size="XLarge"
      bold
      name="down-caret"
      surface="dark"
      color={null}
      lineColor={null}
    />
  );

  expect(container.firstChild).toMatchSnapshot();
});
