import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { DropdownSelect } from '.';
import { calculateRem } from '../../Utilities/src';

// mock cuid
jest.mock('@vds-core/utilities', () => {
  const originalModule = jest.requireActual('@vds-core/utilities');
  return {
    __esModule: true, // Use it when dealing with esModules
    ...originalModule,
    generateUUID: jest.fn(() => 'test123'),
  };
});

/***************************
// DROPDOWNSELECT TESTS
***************************/

describe('<DropdownSelect />', () => {
  test('DropdownSelect default styles', () => {
    const { container } = render(
      <DropdownSelect label="Test label" id="select-test">
        <option>Choose an animal</option>
        <option>Kitten</option>
        <option>Puppy</option>
        <option>Piglet</option>
        <option>Fawn</option>
        <option>Spider Hatchling</option>
      </DropdownSelect>
    );
    //DropdownSelect Minimum width - Default
    const selectWrap = container.querySelector('[class^="ComponentContainer"]');
    expect(selectWrap).toHaveStyleRule('min-width', '66px');
    //default is fluid and fills 100% of it's containers width
    const styledContainer = container.querySelector('#select-test');
    expect(styledContainer).toHaveStyleRule('width', '100%');
    //Height of the Select box
    const selectBox = container.querySelector('[class^="SelectContainer"]');
    expect(selectBox).toHaveStyleRule('height', '2.75rem');
    //Default Spacing
    const select = container.querySelector('select');
    expect(select).toHaveStyleRule(
      'padding',
      '0.75rem 2.6875rem 0.75rem 0.75rem'
    );
    //Icon Spacing
    const IconWrap = container.querySelector(
      '[class^="IconSVGWrapper"][aria-label="caret-down icon"]'
    );
    expect(IconWrap).toHaveStyleRule('height', '1.25rem');
    // Container Border styles
    expect(selectBox).toHaveStyleRule('border-width', '0.0625rem');
    expect(selectBox).toHaveStyleRule('border-color', '#6f7171');
    expect(selectBox).toHaveStyleRule('border-style', 'solid');
    expect(selectBox).toHaveStyleRule('background-color', '#ffffff');
    // Border align inside
    expect(selectBox).toHaveStyleRule('box-sizing', 'border-box');
    //Caret Icon color
    expect(IconWrap).toHaveStyleRule('fill', '#000000', {
      modifier: `svg polygon`,
    });
    //Label color
    const label = container.querySelector('label').firstChild;
    expect(label).toHaveStyleRule('color', '#000000');
    //Helper text color
    const helper = container.querySelector('[class^="StyledBody"]');
    expect(helper).toHaveStyleRule('color', '#000000');
    expect(selectBox).toHaveStyleRule('border-color', '#6f7171');
    fireEvent.focus(selectBox);
    expect(selectBox).toHaveStyleRule('border-color', '#000000');
    //Selected Text
    expect(select).toHaveStyleRule('color', '#000000');
  });

  test('DropdownSelect default styles surface="dark"', () => {
    const { container } = render(
      <DropdownSelect
        label="Test label"
        surface="dark"
        helperText="Helper text"
      >
        <option>Choose an animal</option>
        <option>Kitten</option>
        <option>Puppy</option>
        <option>Piglet</option>
        <option>Fawn</option>
        <option>Spider Hatchling</option>
      </DropdownSelect>
    );
    //DropdownSelect Minimum width - Default
    const selectWrap = container.querySelector('[class^="ComponentContainer"]');
    const minWidth = window.getComputedStyle(selectWrap)._values;
    expect(minWidth['min-width']).toBe('66px');
    //default is fluid and fills 100% of it's containers width
    const fluidWidth = window.getComputedStyle(selectWrap.firstChild)._values;
    expect(fluidWidth['width']).toBe('100%');
    //Height of the Select box
    const selectBox = container.querySelector('[class^="SelectContainer"]');
    const selectStyles = window.getComputedStyle(selectBox)._values;
    expect(selectStyles['height']).toBe('2.75rem');
    //Default Spacing
    const select = container.querySelector('select');
    const paddings = window.getComputedStyle(select)._values;
    expect(paddings['padding']).toBe('0.75rem 2.6875rem 0.75rem 0.75rem');
    //Icon Spacing
    const IconWrap = container.querySelector(
      '[class^="IconSVGWrapper"][aria-label="caret-down icon"]'
    );
    expect(IconWrap).toHaveStyleRule('height', '1.25rem');
    // Container Border styles
    expect(selectStyles['border-width']).toBe('0.0625rem');
    expect(selectBox).toHaveStyleRule('border-color', '#a7a7a7');
    expect(selectStyles['border-style']).toBe('solid');
    expect(selectStyles['background-color']).toBe('rgb(0, 0, 0)');
    // Border align inside
    expect(selectStyles['box-sizing']).toBe('border-box');
    //Caret Icon color
    expect(IconWrap).toHaveStyleRule('fill', '#ffffff', {
      modifier: `svg polygon`,
    });
    //Label color
    const label = container.querySelector('label');
    expect(label.firstChild).toHaveStyleRule('color', '#ffffff');
    //Helper text color
    const helper = container.querySelector('[class^="StyledBody"]');
    expect(helper).toHaveStyleRule('color', '#ffffff');
    fireEvent.focus(selectBox);
    expect(selectBox).toHaveStyleRule('border-color', '#ffffff');
    //Selected Text
    expect(paddings['color']).toBe('rgb(255, 255, 255)');
  });

  test('DropdownSelect Read-only styles', () => {
    const { container } = render(
      <DropdownSelect label="Test label" readOnly>
        <option>Choose an animal</option>
        <option>Kitten</option>
        <option>Puppy</option>
        <option>Piglet</option>
      </DropdownSelect>
    );
    const selectBox = container.querySelector('[class^="SelectContainer"]');
    const selectStyles = window.getComputedStyle(selectBox)._values;
    // Container Border styles
    expect(selectStyles['border-color']).toBe('#d8dada');
    //Label color
    const label = container.querySelector('label');
    expect(label.firstChild).toHaveStyleRule('color', '#000000');
  });

  test('DropdownSelect disabled styles', () => {
    const { container } = render(
      <DropdownSelect label="Test label" disabled>
        <option>Choose an animal</option>
        <option>Kitten</option>
        <option>Puppy</option>
        <option>Piglet</option>
      </DropdownSelect>
    );
    //Caret Icon color
    const IconWrap = container.querySelector(
      '[class^="IconSVGWrapper"][aria-label="caret-down icon"]'
    );
    expect(IconWrap).toHaveStyleRule('fill', '#d8dada', {
      modifier: `svg polygon`,
    });
    //Text color
    const select = container.querySelector('select');
    const paddings = window.getComputedStyle(select)._values;
    expect(paddings['color']).toBe('rgb(216, 218, 218)');
  });

  test('DropdownSelect error styles', () => {
    const { container } = render(
      <DropdownSelect label="Test label" error={true} errorText="Error text">
        <option>Choose an animal</option>
        <option>Kitten</option>
        <option>Puppy</option>
        <option>Piglet</option>
      </DropdownSelect>
    );
    // Container Border styles
    const IconWrap = container.querySelector(
      '[class^="IconSVGWrapper"][aria-label="error icon"]'
    );
    expect(IconWrap).toHaveStyleRule('fill', '#000000', {
      modifier: `svg path`,
    });
    const selectBox = container.querySelector('[class^="SelectContainer"]');
    expect(selectBox).toHaveStyleRule('border-color', '#b95319');
    expect(selectBox).toHaveStyleRule('background-color', '#ffece0');
    //Caret Icon color
    // expect(document.querySelector('path[fill="#000000"]')).toBeTruthy();
    //Label color
    const label = container.querySelector('label');
    const labelstyle = window.getComputedStyle(label.firstChild)._values;
    expect(labelstyle['color']).toBe('rgb(0, 0, 0)');
    //Helper text color
    const helper = container.querySelector('[class^="StyledBody"]');
    const helperText = window.getComputedStyle(helper)._values;
    expect(helperText['color']).toBe('rgb(0, 0, 0)');
    const select = container.querySelector('select');
    fireEvent.focus(select);
    expect(selectBox).toHaveStyleRule('border-color', '#000000');
    //Selected Text
    const paddings = window.getComputedStyle(select)._values;
    expect(paddings['color']).toBe('rgb(0, 0, 0)');
  });

  test('DropdownSelect error styles surface="dark"', () => {
    const { container } = render(
      <DropdownSelect
        label="Test label"
        error="true"
        errorText="Error text"
        surface="dark"
      >
        <option>Choose an animal</option>
        <option>Kitten</option>
        <option>Puppy</option>
        <option>Piglet</option>
      </DropdownSelect>
    );
    // Container Border styles
    const selectBox = container.querySelector('[class^="SelectContainer"]');
    const selectStyles = window.getComputedStyle(selectBox)._values;
    expect(selectBox).toHaveStyleRule('border-color', '#ff8027');
    expect(selectBox).toHaveStyleRule('background-color', '#561701');
    //Caret Icon color
    const IconWrap = container.querySelector(
      '[class^="IconSVGWrapper"][aria-label="error icon"]'
    );
    expect(IconWrap).toHaveStyleRule('fill', '#ffffff', {
      modifier: `svg path`,
    });
    // expect(document.querySelector('path[fill="#ffffff"]')).toBeTruthy();
    //Label color
    const label = container.querySelector('label');
    expect(label.firstChild).toHaveStyleRule('color', '#ffffff');
    //Helper text color
    const helper = container.querySelector('[class^="StyledBody"]');
    expect(helper).toHaveStyleRule('color', '#ffffff');
    fireEvent.focus(selectBox);
    expect(selectBox).toHaveStyleRule('border-color', '#ffffff');
    //Selected Text
    const select = container.querySelector('select');
    const paddings = window.getComputedStyle(select)._values;
    expect(paddings['color']).toBe('rgb(255, 255, 255)');
  });

  test('should render default DropdownSelect', () => {
    const { container } = render(
      <DropdownSelect>
        <option>Choose an animal</option>
        <option>Kitten</option>
        <option>Puppy</option>
        <option>Piglet</option>
        <option>Fawn</option>
        <option>Spider Hatchling</option>
      </DropdownSelect>
    );

    expect(container.firstChild).toMatchSnapshot();
    const options = container.querySelectorAll('option');
    expect(options).toHaveLength(6);
  });

  test('should render disabled state DropdownSelect', () => {
    const { container } = render(
      <DropdownSelect disabled>
        <option>Choose an animal</option>
        <option>Kitten</option>
        <option>Puppy</option>
        <option>Piglet</option>
        <option>Fawn</option>
        <option>Spider Hatchling</option>
      </DropdownSelect>
    );
    expect(container.querySelector('select')).toBeDisabled();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render disabled and surface="dark" state DropdownSelect', () => {
    const { container } = render(
      <DropdownSelect disabled surface="dark">
        <option>Choose an animal</option>
        <option>Kitten</option>
        <option>Puppy</option>
        <option>Piglet</option>
        <option>Fawn</option>
        <option>Spider Hatchling</option>
      </DropdownSelect>
    );
    expect(container.querySelector('select')).toBeDisabled();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render readOnly, disabled and surface="dark" state DropdownSelect', () => {
    const { container } = render(
      <DropdownSelect disabled surface="dark" readOnly>
        <option>Choose an animal</option>
        <option>Kitten</option>
        <option>Puppy</option>
        <option>Piglet</option>
        <option>Fawn</option>
        <option>Spider Hatchling</option>
      </DropdownSelect>
    );
    expect(container.querySelector('select')).toBeDisabled();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('DropdownSelect with inlineLabel ', () => {
    const { container } = render(
      <DropdownSelect data-testid="select" inlineLabel label="select">
        <option>Option 1</option>
        <option>Option 2</option>
      </DropdownSelect>
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(container.querySelector('select')).toHaveStyle(
      'padding: 0.75rem 2.75rem 0.75rem 0px'
    );
  });

  test('DropdownSelect with inlineLabel surface="dark"', () => {
    const { container } = render(
      <DropdownSelect
        data-testid="select"
        inlineLabel
        label="select"
        surface="dark"
      >
        <option>Option 1</option>
        <option>Option 2</option>
      </DropdownSelect>
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(container.querySelector('select')).toHaveStyle(
      'padding: 0.75rem 2.75rem 0.75rem 0px'
    );
  });

  // test('DropdownSelect readOnly', () => {
  //   const { container } = render(
  //     <DropdownSelect data-testid="select" readOnly>
  //       <option>Option 1</option>
  //       <option>Option 2</option>
  //     </DropdownSelect>
  //   );
  //   expect(container.firstChild).toMatchSnapshot();
  //   expect(container.querySelector('select')).toHaveStyle('padding-left: 0');
  // });

  // test('DropdownSelect readOnly and surface="dark"', () => {
  //   const { container } = render(
  //     <DropdownSelect data-testid="select" readOnly surface="dark">
  //       <option>Option 1</option>
  //       <option>Option 2</option>
  //     </DropdownSelect>
  //   );
  //   expect(container.firstChild).toMatchSnapshot();
  //   expect(container.querySelector('select')).toHaveStyle('padding-left: 0');
  // });

  test('DropdownSelect without options', () => {
    const { container } = render(
      <DropdownSelect data-testid="select"></DropdownSelect>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('DropdownSelect when children is empty array ', () => {
    const optionsArray = [];
    const { container } = render(
      <DropdownSelect data-testid="select">
        {optionsArray.map((option, index) => (
          <option key={index}>{option}</option>
        ))}
      </DropdownSelect>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('DropdownSelect 1.0 ', () => {
    const { getByTestId } = render(
      <DropdownSelect
        readOnlyBorders
        /*typescale="VDS"*/
        hoverState
        focusState
        inputFontSize
        overflowEllipsis
        data-testid="select"
      >
        <option>Option 1</option>
        <option>Option 2</option>
      </DropdownSelect>
    );

    const selectItem = getByTestId('select');

    selectItem.focus();
    selectItem.blur();
  });

  test('DropdownSelect 1.0 error with errorEvent blur', () => {
    const { getByTestId } = render(
      <DropdownSelect
        error
        errorText="test error text"
        errorEvent="blur"
        readOnlyBorders
        /*typescale="VDS"*/
        hoverState
        labelMarginBottom="4px"
        focusState
        inputFontSize
        overflowEllipsis
        data-testid="select"
        inlineLabel
      >
        <option>Option 1</option>
        <option>Option 2</option>
      </DropdownSelect>
    );

    const selectItem = getByTestId('select');

    selectItem.focus();
    fireEvent.keyDown(selectItem, { key: 'Enter', keyCode: 13 });
    selectItem.blur();
  });

  test('DropdownSelect 1.0 error with errorEvent change', () => {
    const { getByTestId } = render(
      <DropdownSelect
        error
        errorText="test error text"
        errorEvent="change"
        readOnlyBorders
        /*typescale="VDS"*/
        hoverState
        labelMarginBottom="4px"
        focusState
        inputFontSize
        overflowEllipsis
        data-testid="select"
        inlineLabel
      >
        <option>Option 1</option>
        <option>Option 2</option>
      </DropdownSelect>
    );

    const selectItem = getByTestId('select');

    selectItem.focus();
    fireEvent.keyDown(selectItem, { key: 'Enter', keyCode: 13 });
    selectItem.blur();
  });

  test('DropdownSelect 1.0 helperText and no overflowEllipsis test', () => {
    const { container } = render(
      <DropdownSelect
        label="test label"
        required={false}
        hoverState
        labelMarginBottom="4px"
        focusState
        inputFontSize
        data-testid="select"
        helperText="Select"
        helperTextPlacement="right"
      >
        <option>Option 1</option>
        <option>Option 2</option>
      </DropdownSelect>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('DropdownSelect 1.0 readOnly ', () => {
    const { container } = render(
      <DropdownSelect
        label="test label"
        required={false}
        hoverState
        labelMarginBottom="4px"
        focusState
        inputFontSize
        data-testid="select"
        helperText="Select"
        helperTextPlacement="right"
        readOnly
        readOnlyBorders
      >
        <option>Option 1</option>
        <option>Option 2</option>
      </DropdownSelect>
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(container.querySelector('select').parentNode).toHaveStyle(
      'border: 0.0625rem solid ##d8dada'
    );
  });

  test('DropdownSelect 1.0 borderless', () => {
    const { container } = render(
      <DropdownSelect
        label="test label"
        required={false}
        hoverState
        labelMarginBottom="4px"
        focusState
        inputFontSize
        data-testid="select"
        helperText="Select"
        helperTextPlacement="right"
        borderless
      >
        <option>Option 1</option>
        <option>Option 2</option>
      </DropdownSelect>
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(container.querySelector('select').parentNode).toHaveStyle(
      'border: none'
    );
  });

  test('VDS DropdownSelect 1.0 helperText bottom and disabled ', () => {
    const { container } = render(
      <DropdownSelect label="test label" data-testid="select">
        <option>Option 1</option>
        <option>Option 2</option>
      </DropdownSelect>
    );
    // expect(container.querySelector('select')).toHaveStyle(
    //   'padding: 0.75rem 2.5rem 0.75rem 1rem;'
    // );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('VDS DropdownSelect 1.0 selected ', () => {
    const { container } = render(
      <DropdownSelect
        label="test label"
        error={false}
        required={false}
        hoverState
        focusState
        inputFontSize
        overflowEllipsis
        data-testid="select"
        readOnlyBorders
        minWidth="68px"
        maxWidth="596px"
        height={calculateRem(44)}
        selectPadding={calculateRem(12, 44, 12, 12)}
        labelMarginBottom={calculateRem(4)}
        errorLabelSpacing={calculateRem(8)}
        helperText="select"
        helperTextPlacement="bottom"
        /*typescale="VDS"*/
      >
        <option>Option 1</option>
        <option>Option 2</option>
      </DropdownSelect>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('VDS DropdownSelect 1.0 onChange', () => {
    const { container } = render(
      <DropdownSelect
        label="test label"
        error={false}
        required={false}
        hoverState
        labelMarginBottom="4px"
        focusState
        inputFontSize
        overflowEllipsis
        data-testid="select"
        readOnlyBorders
        selectId="test-select"
        aria-label="Select dropdown"
      >
        <option>Option 1</option>
        <option>Option 2</option>
      </DropdownSelect>
    );
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.change(container.querySelector('select'), {
      target: { value: 'Option 2' },
    });
    expect(container.querySelector('select').value).toBe('Option 2');
  });

  test('VDS DropdownSelect 1.0 onChange with change errorEvent', () => {
    const { container } = render(
      <DropdownSelect
        label="test label"
        error={false}
        required={true}
        hoverState
        labelMarginBottom="4px"
        focusState
        inputFontSize
        overflowEllipsis
        data-testid="select"
        readOnlyBorders
        selectId="test-select"
        ariaLabel="Select dropdown"
        errorEvent="change"
        onChange={() => {}}
      >
        <option>Option 1</option>
        <option>Option 2</option>
      </DropdownSelect>
    );
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(container.querySelector('#test-select'));
    fireEvent.change(container.querySelector('select'), {
      target: { value: 'Option 1' },
    });
    expect(container.querySelector('select').value).toBe('Option 1');
  });
});
