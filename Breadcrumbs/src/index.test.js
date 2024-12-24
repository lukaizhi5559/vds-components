import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { Breadcrumbs, BreadcrumbItem } from '.';
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

test('<Breadcrumbs>', () => {
  const { getByText, container } = render(
    <Breadcrumbs>
      <BreadcrumbItem ariaLabel="Go to Crumb 1" href="#">
        First default crumb
      </BreadcrumbItem>
      <BreadcrumbItem ariaLabel="Go to Crumb 2" href="#" disabled>
        Disabled crumb
      </BreadcrumbItem>
      <BreadcrumbItem ariaLabel="Go to Crumb 3" href="#">
        Second default crumb
      </BreadcrumbItem>
      <BreadcrumbItem ariaLabel="Go to Crumb 4" href="#">
        Selected crumb
      </BreadcrumbItem>
    </Breadcrumbs>
  );

  // Run tests on the fireEvents on BreadcrumbAnchor
  const breadcrumbAnchor = container.querySelector('a');
  fireEvent.click(breadcrumbAnchor);
  fireEvent.mouseDown(breadcrumbAnchor);

  // get rendered Breadcrumb elements to test against
  const firstDefaultBreadcrumb = getByText('First default crumb');
  const secondDefaultBreadcrumb = getByText('Second default crumb');
  const disabledBreadcrumb = getByText('Disabled crumb');
  const selectedBreadcrumb = getByText('Selected crumb');

  // Breadcrumb elements that are "disabled" and the last "selected" Breadcrumb should be <span> elements
  expect(disabledBreadcrumb.tagName.toLowerCase()).toBe('span');
  const disabledBreadcrumbStyles = window.getComputedStyle(disabledBreadcrumb)
    ._values;
  expect(rgbToHex(disabledBreadcrumbStyles.color)).toBe(
    ColorTokens.elements.secondary.onlight.value
  );
  // selected breadcrumb style
  expect(selectedBreadcrumb.tagName.toLowerCase()).toBe('span');
  const selectedBreadcrumbStyles = window.getComputedStyle(selectedBreadcrumb)
    ._values;
  expect(rgbToHex(selectedBreadcrumbStyles.color)).toBe(
    ColorTokens.elements.primary.onlight.value
  );

  expect(selectedBreadcrumbStyles['font-weight']).toBe('700');

  // default breadcrumb styles
  expect(firstDefaultBreadcrumb.tagName.toLowerCase()).toBe('a');
  const firstDefaultBreadcrumbStyles = window.getComputedStyle(
    firstDefaultBreadcrumb
  )._values;
  expect(firstDefaultBreadcrumbStyles['font-family']).toBe('Verizon-NHG-eTX');
  expect(firstDefaultBreadcrumbStyles['font-size']).toBe('0.75rem');
  expect(firstDefaultBreadcrumbStyles['font-weight']).toBe('400');
  expect(firstDefaultBreadcrumbStyles['line-height']).toBe('1rem');
  expect(firstDefaultBreadcrumb).toHaveStyleRule(
    'color',
    ColorTokens.elements.primary.onlight.value
  );

  expect(secondDefaultBreadcrumb.tagName.toLowerCase()).toBe('a');
  expect(container.firstChild).toMatchSnapshot();
});

test('<Breadcrumbs inverted bg>', () => {
  const { getByText, container } = render(
    <Breadcrumbs surface="dark">
      <BreadcrumbItem ariaLabel="Go to Crumb 1" href="#">
        First default crumb
      </BreadcrumbItem>
      <BreadcrumbItem ariaLabel="Go to Crumb 2" href="#" disabled>
        Disabled crumb
      </BreadcrumbItem>
      <BreadcrumbItem ariaLabel="Go to Crumb 3" href="#">
        Second default crumb
      </BreadcrumbItem>
      <BreadcrumbItem ariaLabel="Go to Crumb 4" href="#">
        Selected crumb
      </BreadcrumbItem>
    </Breadcrumbs>
  );

  // Run tests on the fireEvents on BreadcrumbAnchor
  const breadcrumbAnchor = container.querySelector('a');
  fireEvent.click(breadcrumbAnchor);
  fireEvent.mouseDown(breadcrumbAnchor);

  // get rendered Breadcrumb elements to test against
  const firstDefaultBreadcrumb = getByText('First default crumb');
  const secondDefaultBreadcrumb = getByText('Second default crumb');
  const disabledBreadcrumb = getByText('Disabled crumb');
  const selectedBreadcrumb = getByText('Selected crumb');

  // Breadcrumb elements that are "disabled" and the last "selected" Breadcrumb should be <span> elements
  expect(disabledBreadcrumb.tagName.toLowerCase()).toBe('span');
  const disabledBreadcrumbStyles = window.getComputedStyle(disabledBreadcrumb)
    ._values;
  expect(disabledBreadcrumb).toHaveStyleRule('color', '#a7a7a7');

  // selected breadcrumb style
  expect(selectedBreadcrumb.tagName.toLowerCase()).toBe('span');
  const selectedBreadcrumbStyles = window.getComputedStyle(selectedBreadcrumb)
    ._values;
  expect(selectedBreadcrumb).toHaveStyleRule('color', '#ffffff');
  expect(selectedBreadcrumbStyles['font-weight']).toBe('700');

  // default breadcrumb styles
  expect(firstDefaultBreadcrumb.tagName.toLowerCase()).toBe('a');
  const firstDefaultBreadcrumbStyles = window.getComputedStyle(
    firstDefaultBreadcrumb
  )._values;
  expect(firstDefaultBreadcrumb).toHaveStyleRule('color', '#ffffff');
  expect(firstDefaultBreadcrumbStyles['font-family']).toBe('Verizon-NHG-eTX');
  expect(firstDefaultBreadcrumbStyles['font-size']).toBe('0.75rem');
  expect(firstDefaultBreadcrumbStyles['font-weight']).toBe('400');
  expect(firstDefaultBreadcrumbStyles['line-height']).toBe('1rem');
  expect(secondDefaultBreadcrumb.tagName.toLowerCase()).toBe('a');
});

test('<VDS Breadcrumbs>', () => {
  const { getByText, container } = render(
    <Breadcrumbs surface="dark">
      <BreadcrumbItem ariaLabel="Go to Crumb 1" href="#">
        First default crumb
      </BreadcrumbItem>
      <BreadcrumbItem ariaLabel="Go to Crumb 2" href="#" disabled>
        Disabled crumb
      </BreadcrumbItem>
      <BreadcrumbItem ariaLabel="Go to Crumb 3" href="#">
        Second default crumb
      </BreadcrumbItem>
      <BreadcrumbItem href="#">Selected crumb</BreadcrumbItem>
    </Breadcrumbs>
  );

  // Run tests on the fireEvents on BreadcrumbAnchor
  const breadcrumbAnchor = container.querySelector('a');

  fireEvent.click(breadcrumbAnchor);
  fireEvent.mouseDown(breadcrumbAnchor);

  // get rendered Breadcrumb elements to test against
  const firstDefaultBreadcrumb = getByText('First default crumb');
  const secondDefaultBreadcrumb = getByText('Second default crumb');
  const disabledBreadcrumb = getByText('Disabled crumb');
  const selectedBreadcrumb = getByText('Selected crumb');

  // Breadcrumb elements that are "disabled" and the last "selected" Breadcrumb should be <span> elements
  expect(disabledBreadcrumb.tagName.toLowerCase()).toBe('span');
  const disabledBreadcrumbStyles = window.getComputedStyle(disabledBreadcrumb)
    ._values;
  expect(rgbToHex(disabledBreadcrumbStyles.color)).toBe(
    ColorTokens.elements.secondary.ondark.value
  );

  const firstDefaultBreadcrumbStyless = window.getComputedStyle(
    firstDefaultBreadcrumb
  )._values;

  expect(firstDefaultBreadcrumb).toHaveStyleRule('color', '#ffffff');
  expect(firstDefaultBreadcrumbStyless['font-family']).toBe('Verizon-NHG-eTX');
  expect(firstDefaultBreadcrumbStyless['font-size']).toBe('0.75rem');
  expect(firstDefaultBreadcrumbStyless['font-weight']).toBe('400');
  expect(firstDefaultBreadcrumbStyless['line-height']).toBe('1rem');
  expect(selectedBreadcrumb.tagName.toLowerCase()).toBe('span');
  const selectedBreadcrumbStyles = window.getComputedStyle(selectedBreadcrumb)
    ._values;
  expect(selectedBreadcrumb).toHaveStyleRule(
    'color',
    ColorTokens.elements.primary.ondark.value
  );
  expect(selectedBreadcrumbStyles['font-weight']).toBe('700');

  // Breadcrumb elements that have not been "disabled" and the last Breadcrumb should be <a> elements
  expect(firstDefaultBreadcrumb.tagName.toLowerCase()).toBe('a');
  expect(firstDefaultBreadcrumb).toHaveStyleRule(
    'color',
    ColorTokens.elements.primary.ondark.value
  );

  expect(secondDefaultBreadcrumb.tagName.toLowerCase()).toBe('a');
});

test('<VDS Breadcrumbs last breadcrumb not selected>', () => {
  const { getByText, container } = render(
    <Breadcrumbs>
      <BreadcrumbItem ariaLabel="Go to Crumb 1" href="#">
        First default crumb
      </BreadcrumbItem>
      <BreadcrumbItem ariaLabel="Go to Crumb 2" href="#" disabled>
        Disabled crumb
      </BreadcrumbItem>
      <BreadcrumbItem ariaLabel="Go to Crumb 3" href="#">
        Second default crumb
      </BreadcrumbItem>
      <BreadcrumbItem href="#" selected={false}>
        Selected crumb
      </BreadcrumbItem>
    </Breadcrumbs>
  );

  // Run tests on the fireEvents on BreadcrumbAnchor
  const breadcrumbAnchor = container.querySelector('a');

  fireEvent.click(breadcrumbAnchor);
  fireEvent.mouseDown(breadcrumbAnchor);

  // get rendered Breadcrumb elements to test against
  const firstDefaultBreadcrumb = getByText('First default crumb');
  const secondDefaultBreadcrumb = getByText('Second default crumb');
  const disabledBreadcrumb = getByText('Disabled crumb');
  const selectedBreadcrumb = getByText('Selected crumb');

  // Breadcrumb elements that are "disabled" and the last "selected" Breadcrumb should be <span> elements
  expect(disabledBreadcrumb.tagName.toLowerCase()).toBe('span');
  expect(disabledBreadcrumb).toHaveStyleRule('color', '#6f7171');

  const firstDefaultBreadcrumbStyless = window.getComputedStyle(
    firstDefaultBreadcrumb
  )._values;

  expect(firstDefaultBreadcrumbStyless['font-family']).toBe('Verizon-NHG-eTX');
  expect(firstDefaultBreadcrumbStyless['font-size']).toBe('0.75rem');
  expect(firstDefaultBreadcrumbStyless['font-weight']).toBe('400');
  expect(firstDefaultBreadcrumbStyless['line-height']).toBe('1rem');
  expect(firstDefaultBreadcrumb).toHaveStyleRule('color', '#000000');
  expect(selectedBreadcrumb.tagName.toLowerCase()).toBe('a');
  const selectedBreadcrumbStyles = window.getComputedStyle(selectedBreadcrumb)
    ._values;
  expect(selectedBreadcrumb).toHaveStyleRule('color', '#000000');
  expect(selectedBreadcrumbStyles['font-weight']).toBe('400');

  // Breadcrumb elements that have not been "disabled" and the last Breadcrumb should be <a> elements
  expect(firstDefaultBreadcrumb.tagName.toLowerCase()).toBe('a');
  expect(firstDefaultBreadcrumb).toHaveStyleRule('color', '#000000');

  expect(firstDefaultBreadcrumb.tagName.toLowerCase()).toBe('a');
  expect(secondDefaultBreadcrumb.tagName.toLowerCase()).toBe('a');
});
