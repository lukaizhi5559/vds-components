import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { Feature } from '../Feature';
import { Super } from './';

test('should render Super default props correctly', () => {
  const { container } = render(<Super>0</Super>);
  expect(container.firstChild).toMatchSnapshot();
  const elem = container.querySelector('span');
  expect(elem).toBeInTheDocument();
  expect(elem.textContent).toBe('\u2070');
});

test('should render Super superscriptSmall props correctly', () => {
  const { container } = render(<Super superscriptSmall>1</Super>);
  expect(container.firstChild).toMatchSnapshot();
  const elem = container.querySelector('sup');
  expect(elem).toBeInTheDocument();
  expect(elem.textContent).toBe('\u00B9');
});

test('should render Super 23456789 correctly', () => {
  const { container } = render(<Super>23456789</Super>);
  expect(container.firstChild).toMatchSnapshot();
  const elem = container.querySelector('span');
  expect(elem.textContent).toBe(
    '\u00B2\u00B3\u2074\u2075\u2076\u2077\u2078\u2079'
  );
});

test('should render Super text with default props correctly', () => {
  const { container } = render(<Super>th</Super>);
  expect(container.firstChild).toMatchSnapshot();
  const elems = container.querySelectorAll('sup');
  expect(elems[0].textContent).toBe('t');
  expect(elems[1].textContent).toBe('h');
});

test('should render Super text with superscriptSmall prop correctly', () => {
  const { container } = render(<Super superscriptSmall>th</Super>);
  expect(container.firstChild).toMatchSnapshot();
  const elem = container.querySelector('sup');
  expect(elem.textContent).toBe('th');
});

test('should not render Super if the children of type not string or number', () => {
  const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});

  const { container } = render(
    <Super>
      <span>I am span</span>
    </Super>
  );
  expect(container.firstChild).toBeNull;
  expect(warn).toBeCalled();
  expect(warn).toBeCalledWith(
    'Super element only allows children of type string or number.'
  );
  warn.mockReset();
});
