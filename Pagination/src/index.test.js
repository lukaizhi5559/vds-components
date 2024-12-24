import { render, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import { Pagination } from '.';
import PaginationLink from './Controls/PaginationLink';

afterEach(cleanup);

const onClick = jest.fn();

test('<Pagination default Styles>', () => {
  const { container } = render(<Pagination selectedPage={2} total={20} />);
  //Left arrow - size and color
  const leftArrow = container.querySelector(
    '[class^="IconSVGWrapper"][aria-label="pagination-left-arrow icon"]'
  );
  expect(leftArrow).toHaveStyle('height : 0.75rem; width: 0.75rem;');
  // expect(leftArrow.querySelector('svg[path[fill="#000000"]]')).toBeTruthy();
  //Link Previous Text - Color, Size & weight
  const pText = container.querySelector(
    '[class^="StyledButton"][aria-label="Go to previous page."]'
  );
  expect(pText).toHaveStyle(
    'color : #000000; font-size: 12px; font-weight : 700'
  );
  //Page Item - Color, Size & weight
  const pItem = container.querySelector(
    '[class^="StyledButton"][aria-label="Go to Page 1 of 20"]'
  );
  expect(pItem).toHaveStyle('color : #000000; font-size: 12px;');
  //Page Item Selected - Color, Size & weight
  const pItemSel = container.querySelector(
    '[class^="StyledButton"][aria-label="Page 2 of 20"]'
  );
  expect(pItemSel).toHaveStyle(
    'color : #000000; font-size: 12px; font-weight: 700'
  );
  //Link Next Text - Color, Size & weight
  const nText = container.querySelector(
    '[class^="StyledButton"][aria-label="Go to next page."]'
  );
  expect(nText).toHaveStyle(
    'color : #000000; font-size: 12px; font-weight : 700'
  );
  //Right arrow - size and color
  const rightArrow = container.querySelector(
    '[class^="IconSVGWrapper"][aria-label="pagination-right-arrow icon"]'
  );
  expect(rightArrow).toHaveStyle('height : 0.75rem; width: 0.75rem;');
  // expect(rightArrow.querySelector('path[fill="#000000"]')).toBeTruthy();
  //Layout - Width
  const pWidth = container.querySelector('nav[class^="StyledNav"]');
  expect(pWidth).toHaveStyle('width: 288px;');
  //Spacing - Left
  const LSpace = container.querySelector(
    '[class^="IconWrapper"][direction="previous"]'
  );
  expect(LSpace).toHaveStyle('padding-right: 0.5rem;');
  //Spacing - Right
  const RSpace = container.querySelector(
    '[class^="IconWrapper"][direction="next"]'
  );
  expect(RSpace).toHaveStyle('padding-left: 0.5rem;');
  //Spacing - between page numbers
  const PSpace = container.querySelectorAll('li')[2];
  expect(PSpace).toHaveStyle('margin-left: 0.25rem;');
  //Hit area Previous
  expect(pText).toHaveStyle('height : 2.75rem; min-width: 2.75rem;');
  //Hit area Next
  expect(nText).toHaveStyle('height : 2.75rem; min-width: 2.75rem;');
});

test('<Pagination default Styles surface="dark">', () => {
  const { container } = render(
    <Pagination selectedPage={2} total={20} surface="dark" />
  );
  //Left arrow - size and color
  const leftArrow = container.querySelector(
    '[class^="IconSVGWrapper"][aria-label="pagination-left-arrow icon"]'
  );
  expect(leftArrow).toHaveStyle('height : 0.75rem; width: 0.75rem;');
  // expect(leftArrow.querySelector('path[fill="#ffffff"]')).toBeTruthy();
  //Link Previous Text - Color, Size & weight
  const pText = container.querySelector(
    '[class^="StyledButton"][aria-label="Go to previous page."]'
  );
  expect(pText).toHaveStyle(
    'color : #ffffff; font-size: 12px; font-weight : 700'
  );
  //Page Item - Color, Size & weight
  const pItem = container.querySelector(
    '[class^="StyledButton"][aria-label="Go to Page 1 of 20"]'
  );
  expect(pItem).toHaveStyle('color : #ffffff; font-size: 12px;');
  //Page Item Selected - Color, Size & weight
  const pItemSel = container.querySelector(
    '[class^="StyledButton"][aria-label="Page 2 of 20"]'
  );
  expect(pItemSel).toHaveStyle(
    'color : #ffffff; font-size: 12px; font-weight: 700'
  );
  //Link Next Text - Color, Size & weight
  const nText = container.querySelector(
    '[class^="StyledButton"][aria-label="Go to next page."]'
  );
  expect(nText).toHaveStyle(
    'color : #ffffff; font-size: 12px; font-weight : 700'
  );
  //Right arrow - size and color
  const rightArrow = container.querySelector(
    '[class^="IconSVGWrapper"][aria-label="pagination-right-arrow icon"]'
  );
  expect(rightArrow).toHaveStyle('height : 0.75rem; width: 0.75rem;');
  // expect(rightArrow.querySelector('svg[path[fill="#ffffff"]]')).toBeTruthy();
  //Layout - Width
  const pWidth = container.querySelector('nav[class^="StyledNav"]');
  expect(pWidth).toHaveStyle('width: 288px;');
  //Spacing - Left
  const LSpace = container.querySelector(
    '[class^="IconWrapper"][direction="previous"]'
  );
  expect(LSpace).toHaveStyle('padding-right: 0.5rem;');
  //Spacing - Right
  const RSpace = container.querySelector(
    '[class^="IconWrapper"][direction="next"]'
  );
  expect(RSpace).toHaveStyle('padding-left: 0.5rem;');
  //Spacing - between page numbers
  const PSpace = container.querySelectorAll('li')[2];
  expect(PSpace).toHaveStyle('margin-left: 0.25rem;');
  //Hit area Previous
  expect(pText).toHaveStyle('height : 2.75rem; min-width: 2.75rem;');
  //Hit area Next
  expect(nText).toHaveStyle('height : 2.75rem; min-width: 2.75rem;');
});

test('<Pagination Styles - First Page Selected>', () => {
  const { container } = render(<Pagination selectedPage={1} total={20} />);
  const pText = container.querySelector(
    '[class^="StyledButton"][aria-label="Go to previous page."]'
  );
  //Display logic - First Page Selected
  expect(pText).toHaveStyle('visibility : hidden;');
});

test('<Pagination Styles - Last Page Selected>', () => {
  const { container } = render(<Pagination selectedPage={20} total={20} />);
  const nText = container.querySelector(
    '[class^="StyledButton"][aria-label="Go to next page."]'
  );
  //Display logic - Last Page Selected
  expect(nText).toHaveStyle('visibility : hidden;');
});

test('<Pagination Focusring Styles - Previous and First>', () => {
  const { container } = render(
    <>
      <button id="bt" />
      <Pagination selectedPage={2} total={20} />
    </>
  );
  const btt = container.querySelector('#bt');
  const pText = container.querySelector(
    '[class^="StyledButton"][aria-label="Go to previous page."]'
  );
  const pOne = container.querySelector(
    '[class^="StyledButton"][aria-label="Go to Page 1 of 20"]'
  );
  fireEvent.click(btt);
  fireEvent.keyDown(btt, {
    key: 'Tab',
    keyCode: 9,
    charCode: 9,
  });
  expect(pText).toHaveStyleRule('border', '0.0625rem dashed', {
    modifier: `:focus:not(:hover) span::after`,
  });
  expect(pText).toHaveStyleRule('border-color', '#000000', {
    modifier: `:focus:not(:hover) span::after`,
  });
  expect(pText).toHaveStyleRule('border-radius', '2px', {
    modifier: `:focus:not(:hover) span::after`,
  });
  fireEvent.keyDown(btt, {
    key: 'Tab',
    keyCode: 9,
    charCode: 9,
  });
  expect(pOne).toHaveStyleRule('border', '0.0625rem dashed', {
    modifier: `:focus:not(:hover) span::after`,
  });
  expect(pOne).toHaveStyleRule('border-color', '#000000', {
    modifier: `:focus:not(:hover) span::after`,
  });
  expect(pOne).toHaveStyleRule('border-radius', '2px', {
    modifier: `:focus:not(:hover) span::after`,
  });
});

test('<Pagination Focusring Styles - Previous and First surface="dark">', () => {
  const { container } = render(
    <>
      <button id="bt" />
      <Pagination selectedPage={2} total={20} surface="dark" />
    </>
  );
  const btt = container.querySelector('#bt');
  const pText = container.querySelector(
    '[class^="StyledButton"][aria-label="Go to previous page."]'
  );
  const pOne = container.querySelector(
    '[class^="StyledButton"][aria-label="Go to Page 1 of 20"]'
  );
  fireEvent.click(btt);
  fireEvent.keyDown(btt, {
    key: 'Tab',
    keyCode: 9,
    charCode: 9,
  });
  expect(pText).toHaveStyleRule('border', '0.0625rem dashed', {
    modifier: `:focus:not(:hover) span::after`,
  });
  expect(pText).toHaveStyleRule('border-color', '#ffffff', {
    modifier: `:focus:not(:hover) span::after`,
  });
  expect(pText).toHaveStyleRule('border-radius', '2px', {
    modifier: `:focus:not(:hover) span::after`,
  });
  fireEvent.keyDown(btt, {
    key: 'Tab',
    keyCode: 9,
    charCode: 9,
  });
  expect(pOne).toHaveStyleRule('border', '0.0625rem dashed', {
    modifier: `:focus:not(:hover) span::after`,
  });
  expect(pOne).toHaveStyleRule('border-color', '#ffffff', {
    modifier: `:focus:not(:hover) span::after`,
  });
  expect(pOne).toHaveStyleRule('border-radius', '2px', {
    modifier: `:focus:not(:hover) span::after`,
  });
});

test('<Pagination Focusring Styles - Last>', () => {
  const { container } = render(
    <>
      <button id="bt" />
      <Pagination selectedPage={2} total={3} />
    </>
  );
  const btt = container.querySelector('#bt');
  const nText = container.querySelector(
    '[class^="StyledButton"][aria-label="Go to next page."]'
  );
  fireEvent.click(btt);
  fireEvent.keyDown(btt, {
    key: 'Tab',
    keyCode: 9,
    charCode: 9,
  });
  fireEvent.keyDown(btt, {
    key: 'Tab',
    keyCode: 9,
    charCode: 9,
  });
  fireEvent.keyDown(btt, {
    key: 'Tab',
    keyCode: 9,
    charCode: 9,
  });
  fireEvent.keyDown(btt, {
    key: 'Tab',
    keyCode: 9,
    charCode: 9,
  });
  expect(nText).toHaveStyleRule('border', '0.0625rem dashed', {
    modifier: `:focus:not(:hover) span::after`,
  });
  expect(nText).toHaveStyleRule('border-color', '#000000', {
    modifier: `:focus:not(:hover) span::after`,
  });
  expect(nText).toHaveStyleRule('border-radius', '2px', {
    modifier: `:focus:not(:hover) span::after`,
  });
});

test('<Pagination Focusring Styles - Last - surface="dark">', () => {
  const { container } = render(
    <>
      <button id="bt" />
      <Pagination selectedPage={2} total={3} surface="dark" />
    </>
  );
  const btt = container.querySelector('#bt');
  const nText = container.querySelector(
    '[class^="StyledButton"][aria-label="Go to next page."]'
  );
  fireEvent.click(btt);
  fireEvent.keyDown(btt, {
    key: 'Tab',
    keyCode: 9,
    charCode: 9,
  });
  fireEvent.keyDown(btt, {
    key: 'Tab',
    keyCode: 9,
    charCode: 9,
  });
  fireEvent.keyDown(btt, {
    key: 'Tab',
    keyCode: 9,
    charCode: 9,
  });
  fireEvent.keyDown(btt, {
    key: 'Tab',
    keyCode: 9,
    charCode: 9,
  });
  expect(nText).toHaveStyleRule('border', '0.0625rem dashed', {
    modifier: `:focus:not(:hover) span::after`,
  });
  expect(nText).toHaveStyleRule('border-color', '#ffffff', {
    modifier: `:focus:not(:hover) span::after`,
  });
  expect(nText).toHaveStyleRule('border-radius', '2px', {
    modifier: `:focus:not(:hover) span::after`,
  });
});

test('<PaginationLink>', () => {
  const { container } = render(
    <PaginationLink onClick={onClick}>test</PaginationLink>
  );

  fireEvent.click(container.firstChild);
  fireEvent.keyPress(container.firstChild, {
    key: 'Enter',
    code: 13,
    charCode: 13,
  });

  expect(container.firstChild).toMatchSnapshot();
});

test('<Pagination default> snapshot', () => {
  const { container } = render(
    <Pagination
      baseUrl={pageNumber => `/some/api/${pageNumber}/example`}
      selectedPage={2}
      total={20}
      onClick={onClick}
    />
  );
  expect(container).toMatchSnapshot();
});

test('<Pagination> FirstControl and LastControl should be appeared', () => {
  const { container } = render(
    <Pagination
      selectedPage={2}
      total={5}
      onClick={onClick}
      focusBorderRadius={'3px'}
    />
  );
  expect(container).toMatchSnapshot();
});

test('<Pagination default> should update aria-current', () => {
  const { container, getByText, rerender } = render(
    <Pagination
      baseUrl={pageNumber => `/some/api/${pageNumber}/example`}
      selectedPage={1}
      total={20}
      onClick={onClick}
    />
  );

  fireEvent.click(container.firstChild);
  fireEvent.keyPress(container.firstChild, {
    key: 'Enter',
    code: 13,
    charCode: 13,
  });

  const firstPageLink = getByText('1').closest('a');
  // expect(firstPageLink.getAttribute('aria-current')).toBe('true');

  // rerender to test that props are updated properly
  rerender(
    <Pagination
      baseUrl={pageNumber => `/some/api/${pageNumber}/example`}
      selectedPage={8}
      total={20}
      onClick={onClick}
    />
  );

  fireEvent.click(container.firstChild);
  fireEvent.keyPress(container.firstChild, {
    key: 'Enter',
    code: 13,
    charCode: 13,
  });
  const eighthPageLink = getByText('8').closest('a');
  // expect(eighthPageLink.getAttribute('aria-current')).toBe('true');
});

test('VDS Pagination', () => {
  const { container, getByText, rerender } = render(
    <Pagination
      baseUrl={pageNumber => `/some/api/${pageNumber}/example`}
      selectedPage={1}
      total={20}
      onClick={onClick}
    />
  );

  fireEvent.click(container.firstChild);
  fireEvent.keyPress(container.firstChild, {
    key: 'Enter',
    code: 13,
    charCode: 13,
  });

  //fireEvent.click(firstPageLink);

  // rerender to test that props are updated properly
  rerender(
    <Pagination
      baseUrl={pageNumber => `/some/api/${pageNumber}/example`}
      selectedPage={8}
      total={20}
      onClick={onClick}
    />
  );

  fireEvent.click(container.firstChild);
  fireEvent.keyPress(container.firstChild, {
    key: 'Enter',
    code: 13,
    charCode: 13,
  });
  expect(container).toMatchSnapshot();
});

test('VDS Pagination surface="dark"', () => {
  const { container, getByText, rerender } = render(
    <Pagination
      baseUrl={pageNumber => `/some/api/${pageNumber}/example`}
      selectedPage={1}
      total={20}
      onClick={onClick}
      surface="dark"
    />
  );

  expect(container).toMatchSnapshot();
});

test('<Pagination> should move to clicked page link', () => {
  const selected = jest.fn();
  const { getByText } = render(
    <Pagination selectedPage={5} total={20} selectPage={selected} />
  );
  const secondPageLink = getByText('6').closest('button');
  fireEvent.click(secondPageLink);
  expect(selected).toHaveBeenCalledWith(6);
});

test('<Pagination> should move forward when click on next button', () => {
  const selected = jest.fn();
  const { getByText } = render(
    <Pagination selectedPage={5} total={20} selectPage={selected} />
  );
  const nextPageLink = getByText('Next').closest('button');
  fireEvent.click(nextPageLink);
  expect(selected).toHaveBeenCalledWith(6);
});

test('<Pagination> should move backward when click on previous button', () => {
  const selected = jest.fn();
  const { getByText } = render(
    <Pagination selectedPage={5} total={20} selectPage={selected} />
  );
  const previousPageLink = getByText('Previous').closest('button');
  fireEvent.click(previousPageLink);
  expect(selected).toHaveBeenCalledWith(4);
});
