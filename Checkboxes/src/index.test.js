import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { Checkbox, CheckboxGroup } from '.';

const onChange = () => {};

jest.mock('@vds-core/utilities', () => {
  // Require the original module to not be mocked...
  const originalModule = jest.requireActual('@vds-core/utilities');

  return {
    __esModule: true, // Use it when dealing with esModules
    ...originalModule,
    generateUUID: jest.fn(() => '1'),
  };
});

describe('Uncontrolled <Checkbox>', () => {
  test('should render default Checkbox', () => {
    const { container } = render(
      <Checkbox name="test" onChange={onChange} value="test value">
        Checked Checkbox
      </Checkbox>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render error state Checkbox', () => {
    const { container } = render(
      <Checkbox
        error
        errorText="Required Field."
        name="test"
        value="test value"
      >
        Errored Checkbox
      </Checkbox>
    );

    //expect(container.lastChild).toMatchSnapshot();
  });

  test('should render disabled state Checkbox', () => {
    const { container } = render(
      <Checkbox name="test" onChange={onChange} value="test value" disabled>
        Disabled Checkbox
      </Checkbox>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('Controlled <Checkbox>', () => {
  test('should render unchecked Checkbox', () => {
    const { container } = render(
      <Checkbox
        selected={false}
        name="test"
        onChange={onChange}
        value="test value"
      >
        unchecked Checkbox
      </Checkbox>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render selected Checkbox', () => {
    const { container } = render(
      <Checkbox selected name="test" onChange={onChange} value="test value">
        Selected Checkbox
      </Checkbox>
    );
    const checkBox = container.querySelector('input[type=checkbox]');
    expect(checkBox).toBeTruthy();
    expect(checkBox.checked).toBeTruthy();
  });
});

test('<Checkbox/>', () => {
  const { container, getByText } = render(
    <Checkbox name="example">Checkbox Example</Checkbox>
  );

  // Expect checkbox with label 'Checkbox Example'
  expect(getByText('Checkbox Example')).toBeTruthy();

  fireEvent.click(container.querySelector('input'));

  // Expect checkbox to be checked, to contain a polyline
  //expect(container.querySelector('polyline')).toBeTruthy();
});

test('<Checkbox/> disabled', () => {
  const { container, getByText } = render(
    <Checkbox name="example" disabled>
      Checkbox Example
    </Checkbox>
  );
  // Expect checkbox with label 'Checkbox Example'
  expect(getByText('Checkbox Example')).toBeTruthy();

  // Expect checkbox to have attribute disabled=""
  expect(container.querySelector('input')).toBeDisabled();
});

test('<Checkbox/> checked controlled', () => {
  const { container, rerender, getByText } = render(
    <Checkbox selected={false} name="example">
      Checkbox Example
    </Checkbox>
  );
  // Expect checkbox with label 'Checkbox Example'
  expect(getByText('Checkbox Example')).toBeTruthy();

  // Expect checkbox to be unchecked
  //expect(container.querySelector('polyline')).toBeFalsy();

  // Normally Expect checkbox to be unclickable & remain unchecked, but need to allow for it now
  fireEvent.click(container.querySelector('input'));

  rerender(
    <Checkbox selected name="example">
      Checkbox Example
    </Checkbox>
  );
});

test('<CheckboxGroup/>', () => {
  const { container, getByTestId, rerender } = render(
    <CheckboxGroup
      viewport={'desktop'}
      data={[
        {
          children: 'In-Store pickup',
        },
      ]}
    />
  );

  const groupItem = getByTestId('test-group-item');
  fireEvent.click(groupItem);

  expect(container.child).toMatchSnapshot();

  rerender(
    <CheckboxGroup
      viewport={'desktop'}
      data={[
        {
          children: 'In-Store pickup',
        },
      ]}
    />
  );
});

test('<Checkbox/>', () => {
  const { container, getByText } = render(
    <Checkbox name="example">Checkbox Example</Checkbox>
  );

  const input = container.querySelector('input');

  fireEvent.click(input, {
    clientX: 3,
    clientY: 200,
  });

  expect(container.child).toMatchSnapshot();
});

test('<Checkbox/>', () => {
  const { container, getByText } = render(
    <CheckboxGroup
      childWidth={'100%'}
      viewport={'desktop'}
      data={[
        {
          children: 'In-Store pickup',
          width: '200px',
        },
        {
          children: 'Ship it top me',
          width: '200px',
        },
      ]}
    />
  );
});

test('<Checkbox/>', () => {
  const { container, getByTestId } = render(
    <Checkbox name="example">Checkbox Example</Checkbox>
  );

  const childWrapper = getByTestId('test-child-wrapper');

  fireEvent.mouseOver(childWrapper);
  fireEvent.mouseLeave(childWrapper);
  fireEvent.mouseOver(childWrapper);

  fireEvent.click(childWrapper);
});

test('Checkbox default styles', () => {
  const { container } = render(
    <Checkbox name="example">Checkbox Example</Checkbox>
  );
  const inputBox = container.querySelector('[class^="StyledInput"]');
  expect(inputBox).toHaveStyle(
    'position: absolute;opacity: 0;overflow: hidden;padding: 0;border: 0;white-space: nowrap;z-index: 1;'
  );
});

test('Checkbox SVG wrapper and icon area default styles', () => {
  const { container } = render(
    <Checkbox name="example">Checkbox Example</Checkbox>
  );
  // SVG input wrapper default styles
  const inputSVGWrapper = container.querySelector('[class^="StyledWrapper"]');
  expect(inputSVGWrapper).toHaveStyle(
    "box-sizing: border-box;display: inline-block;height: 1.25rem;left: 50%;position: relative;top: 50%;transform: translate(-50%,-50%);width: 1.25rem;content: ''"
  );
  // SVG icon background
  const inputSvgIconArea = container.querySelector('[class^="styledInner"]');
  expect(inputSvgIconArea).toHaveStyle(
    'display: flex;position: relative;align-items: center;justify-content: center;top: 50%;left: 50%;box-sizing: border-box;width: 1.25rem;height: 1.25rem;transform: translate(-50%,-50%);background-color: transparent;border-style: solid;border-radius: 0.125rem;border-width: 0.0625rem;'
  );
  expect(inputSvgIconArea).toHaveStyleRule('border-color', '#6f7171');
  expect(inputSvgIconArea).toHaveStyleRule('box-shadow', 'none');
});

test('Checkbox label default styles', () => {
  const { container } = render(
    <Checkbox name="example" label="Terms and conditions">
      Checkbox Example
    </Checkbox>
  );
  const checkBoxLabel = container.querySelector('p[class^="StyledBody"]');
  // font styles
  expect(checkBoxLabel).toHaveStyle(
    'font-size: 1rem;font-weight: 700;font-family: Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
  );
  // spacing
  expect(checkBoxLabel).toHaveStyle(
    'line-height: 1.25rem;letter-spacing: 0.03125rem;'
  );
  // text
  expect(checkBoxLabel).toHaveStyle(
    'color: #000000;margin: 0;text-decoration: none;'
  );
});

test('Checkbox label styles on surface="dark"', () => {
  const { container } = render(
    <Checkbox name="example" surface="dark" label="Terms and conditions">
      Checkbox Example
    </Checkbox>
  );
  const checkBoxLabel = container.querySelector('p[class^="StyledBody"]');
  // font styles
  expect(checkBoxLabel).toHaveStyle(
    'font-size: 1rem;font-weight: 700;font-family: Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
  );
  // spacing
  expect(checkBoxLabel).toHaveStyle(
    'line-height: 1.25rem;letter-spacing: 0.03125rem;'
  );
  // text
  expect(checkBoxLabel).toHaveStyle(
    'color: #ffffff;margin: 0;text-decoration: none;'
  );
});

test('Checkbox label styles in disabled state', () => {
  const { container } = render(
    <Checkbox name="example" disabled label="Terms and conditions">
      Checkbox Example
    </Checkbox>
  );
  const checkBoxLabel = container.querySelector('p[class^="StyledBody"]');
  // font styles
  expect(checkBoxLabel).toHaveStyle(
    'font-size: 1rem;font-weight: 700;font-family: Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
  );
  // spacing
  expect(checkBoxLabel).toHaveStyle(
    'line-height: 1.25rem;letter-spacing: 0.03125rem;'
  );
  // text
  expect(checkBoxLabel).toHaveStyle(
    'color: #d8dada;margin: 0;text-decoration: none;'
  );
});

test('Checkbox placeholder text styles in error state', () => {
  const { container } = render(
    <Checkbox
      name="example"
      error={true}
      errorText="Please agree to the terms and conditions."
    >
      Checkbox Example
    </Checkbox>
  );
  const errorLabelContainer = container.querySelector(
    '[class^="StyleCheckboxError"]'
  );
  expect(errorLabelContainer).toHaveStyle(
    'position: relative;margin-top: 0;left: -0.0625rem;'
  );
  const checkBoxErrorLabel = errorLabelContainer.querySelector(
    'p[class^="StyledBody"]'
  );
  // font styles
  expect(checkBoxErrorLabel).toHaveStyle(
    'font-size: 0.75rem;font-weight: 400;font-family: Verizon-NHG-eTX,Helvetica,Arial,Sans-serif'
  );
  // text styles
  expect(checkBoxErrorLabel).toHaveStyle(
    'line-height: 1rem;color: #000000;margin: 0;text-decoration: none;'
  );
});

test('Checkbox SVG Icon background styles in error state and surface="dark"', () => {
  const { container } = render(
    <Checkbox
      name="example"
      error={true}
      surface="dark"
      errorText="Please agree to the terms and conditions."
    >
      Checkbox Example
    </Checkbox>
  );
  const inputSvgIconArea = container.querySelector('[class^="styledInner"]');
  expect(inputSvgIconArea).toHaveStyle(
    'display: flex;position: relative;align-items: center;justify-content: center;top: 50%;left: 50%;box-sizing: border-box;width: 1.25rem;height: 1.25rem;transform: translate(-50%,-50%);background-color: rgb(86, 23, 1);border-style: solid;;border-radius: 0.125rem;border-width: 0.0625rem;'
  );
  expect(inputSvgIconArea).toHaveStyleRule('border-color', '#ff8027');
  expect(inputSvgIconArea).toHaveStyleRule('box-shadow', 'none');
});

test('Checkbox styles in selected state', () => {
  const { container } = render(
    <Checkbox name="example" selected={true}>
      Checkbox Example
    </Checkbox>
  );
  const checkBoxWrapper = container.querySelector(
    '[class^="CheckboxLabelWrapper"]'
  );
  // input styles
  const inputBox = checkBoxWrapper.querySelector('[class^="StyledInput"]');
  expect(inputBox).toHaveStyle(
    'position: absolute;opacity: 0;overflow: hidden;padding: 0;border: 0;white-space: nowrap;z-index: 1;'
  );
  // svg wrapper input default styles
  const inputSVGWrapper = checkBoxWrapper.querySelector(
    '[class^="StyledWrapper"]'
  );
  expect(inputSVGWrapper).toHaveStyle(
    "box-sizing: border-box;display: inline-block;height: 1.25rem;left: 50%;position: relative;top: 50%;transform: translate(-50%,-50%);width: 1.25rem;content: ''"
  );
  // SVG icon background
  const inputSvgIconArea = inputSVGWrapper.querySelector(
    '[class^="styledInner"]'
  );
  expect(inputSvgIconArea).toHaveStyle(
    'display: flex;position: relative;align-items: center;justify-content: center;top: 50%;left: 50%;box-sizing: border-box;width: 1.25rem;height: 1.25rem;transform: translate(-50%,-50%);background-color: #000000;border-style: solid;border-radius: 0.125rem;border-width: 0;'
  );
  expect(inputSvgIconArea).toHaveStyleRule('border-color', '#6f7171');
  expect(inputSvgIconArea).toHaveStyleRule('box-shadow', 'none');
  // SVG icon wrapper styles
  const checkMarkIcon = inputSVGWrapper.querySelector(
    '[class^="IconSVGWrapper"]'
  );
  expect(checkMarkIcon).toHaveStyle(
    'display: flex; height: 0.75rem; width: 0.75rem;min-height: 0.75rem;min-width: 0.75rem;outline: none;pointer-events: none;'
  );
  // SVG icon path
  expect(checkMarkIcon).toHaveStyleRule('fill', '#ffffff', {
    modifier: `svg path`,
  });
  expect(
    checkMarkIcon.querySelector(
      'path[d="M8,19.1l-7-7l2.5-2.5L8,14L18.1,3.8l2.5,2.5L8,19.1z"]'
    )
  ).toBeTruthy();
});

test('Checkbox styles in selected state and surface="dark"', () => {
  const { container } = render(
    <Checkbox name="example" selected={true} surface="dark">
      Checkbox Example
    </Checkbox>
  );
  const checkBoxWrapper = container.querySelector(
    '[class^="CheckboxLabelWrapper"]'
  );
  // input styles
  const inputBox = checkBoxWrapper.querySelector('[class^="StyledInput"]');
  expect(inputBox).toHaveStyle(
    'position: absolute;opacity: 0;overflow: hidden;padding: 0;border: 0;white-space: nowrap;z-index: 1;'
  );
  // svg wrapper input default styles
  const inputSVGWrapper = checkBoxWrapper.querySelector(
    '[class^="StyledWrapper"]'
  );
  expect(inputSVGWrapper).toHaveStyle(
    "box-sizing: border-box;display: inline-block;height: 1.25rem;left: 50%;position: relative;top: 50%;transform: translate(-50%,-50%);width: 1.25rem;content: ''"
  );
  // SVG icon background
  const inputSvgIconArea = inputSVGWrapper.querySelector(
    '[class^="styledInner"]'
  );
  expect(inputSvgIconArea).toHaveStyle(
    'display: flex;position: relative;align-items: center;justify-content: center;top: 50%;left: 50%;box-sizing: border-box;width: 1.25rem;height: 1.25rem;transform: translate(-50%,-50%);background-color: #ffffff;border-style: solid;border-radius: 0.125rem;border-width: 0;'
  );
  expect(inputSvgIconArea).toHaveStyleRule('border-color', '#a7a7a7');
  expect(inputSvgIconArea).toHaveStyleRule('box-shadow', 'none');
  // SVG icon wrapper styles
  const checkMarkIcon = inputSVGWrapper.querySelector(
    '[class^="IconSVGWrapper"]'
  );
  expect(checkMarkIcon).toHaveStyle(
    'display: flex; height: 0.75rem; width: 0.75rem;min-height: 0.75rem;min-width: 0.75rem;outline: none;pointer-events: none;'
  );
  // SVG icon path
  expect(checkMarkIcon).toHaveStyleRule('fill', '#000000', {
    modifier: `svg path`,
  });
  expect(
    checkMarkIcon.querySelector(
      'path[d="M8,19.1l-7-7l2.5-2.5L8,14L18.1,3.8l2.5,2.5L8,19.1z"]'
    )
  ).toBeTruthy();
});

test('Checkbox styles on mouse hover', () => {
  const { container } = render(
    <Checkbox name="example">Checkbox Example</Checkbox>
  );
  const CheckboxWrapper = container.querySelector(
    '[class^="CheckboxLabelWrapper"]'
  );
  fireEvent.mouseOver(CheckboxWrapper);
  expect(CheckboxWrapper).toHaveStyle('letter-spacing : 0.5px;');
  //Active - on hover additional border style
  fireEvent.mouseOver(CheckboxWrapper);
  const checkboxSvgOnHover = container.querySelector('[class^="styledInner"]');

  fireEvent.mouseOver(checkboxSvgOnHover);
  expect(checkboxSvgOnHover).toHaveStyleRule(
    'box-shadow',
    '0 0 0 0.0625rem #6f7171'
  );
  expect(checkboxSvgOnHover).toHaveStyleRule('border-color', '#6f7171');
});

test('Checkbox in active state', () => {
  const { container } = render(
    <Checkbox name="example">Checkbox Example</Checkbox>
  );
  const checkboxActive = container.querySelector('[class^="styledInner"]');
  fireEvent.click(checkboxActive);
  expect(checkboxActive).toHaveStyleRule(
    'box-shadow',
    '0 0 0 0.0625rem #000000',
    {
      modifier: `:active:hover`,
    }
  );
});

test('Checkbox and label layout spacing styles', () => {
  const { container } = render(
    <Checkbox name="example" label="Price estimates">
      Checkbox Spacing
    </Checkbox>
  );
  // input box right spacing
  const checkBox = container.querySelector('[class^="CheckWrapper"]');
  expect(checkBox).toHaveStyleRule('margin-right', '0.75rem');
  // define hit area for checkbox
  const inputHitArea = checkBox.querySelector('[class^="HitArea"]');
  expect(inputHitArea).toHaveStyle(
    'left: 0.625rem;position: absolute;transform: translate(-50%,-50%);text-align: center;top: 50%;cursor: pointer;display: inline-block;height: 2.75rem;width: 2.75rem;'
  );
  // label spacing between label and placeholder text
  const labelSpacing = container.querySelector('[class^="LabelWrapper"]');
  expect(labelSpacing).toHaveStyleRule('padding-bottom', '0.25rem');
});

test('Checkbox group layout spacing styles', () => {
  const { container } = render(
    <CheckboxGroup
      data={[
        {
          label: 'In-Store pickup',
          children: 'Pick up your device in a store near you.',
          value: 'option-a',
        },
        {
          label: 'Ship it to me',
          children: 'Have your device delivered to you.',
          value: 'option-b',
        },
      ]}
    />
  );
  const checkBoxGroupSpacing = container.querySelector(
    '[class^="CheckboxWrapper"]'
  );
  expect(checkBoxGroupSpacing).toHaveStyle(
    'box-sizing: border-box;display: inline-flex;padding: 0 0 1.5rem 0;width: 100%;'
  );
});
