import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import InputField from './InputField';
import { calculateRem } from '@vds-core/utilities';
import { TextLink } from '../../../../Buttons/src';
import { Tooltip } from '../../../../Tooltips/src';
import { IconData } from '../../../../Icons/src';
import { Input } from '../Input';
import InputText from './InputText';

jest.mock('@vds-core/utilities', () => {
  // Require the original module to not be mocked...
  const originalModule = jest.requireActual('@vds-core/utilities');

  return {
    __esModule: true, // Use it when dealing with esModules
    ...originalModule,
    generateUUID: jest.fn(() => '1'),
  };
});
jest.useFakeTimers();

const helperTextPlacement = ['right', 'bottom'];
const inputFieldTypes = [
  'text',
  'password',
  'number',
  'tel',
  'date',
  'inlineAction',
  'calendar',
];

const calculateMinWidth = type => {
  if (type === 'password') {
    return calculateRem(182);
  } else if (type === 'inlineAction') {
    return calculateRem(182);
  } else if (type === 'creditCard') {
    return calculateRem(282);
  } else if (type === 'date') {
    return calculateRem(162);
  } else if (type === 'tel') {
    return calculateRem(161);
  } else if (type === 'taxID') {
    return calculateRem(212);
  } else if (type === 'securityCode') {
    return calculateRem(106);
  } else {
    return calculateRem(66);
  }
};

describe('InputField', () => {
  test('InputField', () => {
    const { container, getByTestId } = render(
      <InputField
        type="text"
        data-testid="input"
        ariaLabel="Input test"
        placeholder="Test"
        label="Label"
      />
    );

    const input = getByTestId('input');
    fireEvent.change(input, { target: { value: 'hello' } });
    expect(input.value).toBe('hello');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input.value).toBe('test');
    expect(input.getAttribute('placeholder')).toBe(null);

    const inputStyle = window.getComputedStyle(input)._values;

    const getinputStyle = container.querySelector('[class^="InputContainer"]');
    const inputStyle1 = window.getComputedStyle(getinputStyle)._values;

    const labelTxt = container.querySelector('p[class^="StyledBody"]');
    const labelStyleList = window.getComputedStyle(labelTxt)._values;

    expect(inputStyle['color']).toBe('rgb(0, 0, 0)');
    expect(inputStyle['font-family']).toBe('Verizon-NHG-eDS');
    expect(inputStyle['font-size']).toBe('1rem');
    expect(inputStyle['line-height']).toBe('1.25rem');
    expect(inputStyle['letter-spacing']).toBe('0.03125rem');
    expect(inputStyle['border-radius']).toBe('4px');
    expect(inputStyle['padding']).toBe('0.6875rem');

    expect(inputStyle1['background-color']).toBe('rgb(255, 255, 255)');
    expect(inputStyle1['border-radius']).toBe('4px');
    expect(inputStyle1['height']).toBe('2.75rem');
    expect(inputStyle1['min-width']).toBe('2.75rem');
    expect(getinputStyle).toHaveStyleRule('border', '0.0625rem solid #6f7171');

    expect(labelTxt).toHaveStyleRule('line-height', '1rem');
    expect(labelTxt).toHaveStyleRule(
      'font-family',
      'Verizon-NHG-eTX,Helvetica,Arial,Sans-serif'
    );
    expect(labelTxt).toHaveStyleRule('color', '#000000');
    expect(labelTxt).toHaveStyleRule('font-size', '0.75rem');
    expect(labelTxt).toHaveStyleRule('font-weight', '400');

    expect(container).toMatchSnapshot();
  });

  test('InputField helper text style', () => {
    const { container, getByTestId } = render(
      <InputField
        type="text"
        data-testid="input"
        ariaLabel="Input test"
        placeholder="Test"
        label="Label"
        helperText="Helper text"
        helperTextPlacement={'bottom'}
      />
    );
    const HelperTextWrapper = container.querySelectorAll(
      'p[class^="StyledBody"]'
    )[1];
    expect(HelperTextWrapper).toHaveStyleRule('font-size', '0.75rem');
    expect(HelperTextWrapper).toHaveStyleRule('font-weight', '400');
    expect(HelperTextWrapper).toHaveStyleRule('line-height', '1rem');
    expect(HelperTextWrapper).toHaveStyleRule('color', '#6f7171');
    expect(HelperTextWrapper).toHaveStyleRule(
      'font-family',
      'Verizon-NHG-eTX,Helvetica,Arial,Sans-serif'
    );

    expect(container).toMatchSnapshot();
  });

  test('InputField helper text style dark surface', () => {
    const { container, getByTestId } = render(
      <InputField
        type="text"
        data-testid="input"
        ariaLabel="Input test"
        surface="dark"
        placeholder="Test"
        label="Label"
        helperText="Helper text"
        helperTextPlacement={'bottom'}
      />
    );
    const HelperTextWrapper = container.querySelectorAll(
      'p[class^="StyledBody"]'
    )[1];
    expect(HelperTextWrapper).toHaveStyleRule('font-size', '0.75rem');
    expect(HelperTextWrapper).toHaveStyleRule('font-weight', '400');
    expect(HelperTextWrapper).toHaveStyleRule('line-height', '1rem');
    expect(HelperTextWrapper).toHaveStyleRule('color', '#a7a7a7');
    expect(HelperTextWrapper).toHaveStyleRule(
      'font-family',
      'Verizon-NHG-eTX,Helvetica,Arial,Sans-serif'
    );

    expect(container).toMatchSnapshot();
  });

  test('InputField error', () => {
    const { container, getByTestId } = render(
      <InputField
        type="text"
        data-testid="input"
        ariaLabel="Input test"
        label="Label"
        error={true}
        helperText="Helper text"
        errorText="Error"
      />
    );

    const input = getByTestId('input');
    fireEvent.change(input, { target: { value: 'hello' } });
    expect(input.value).toBe('hello');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input.value).toBe('test');

    const inputStyle = window.getComputedStyle(input)._values;

    const getinputStyle = container.querySelector('[class^="InputContainer"]');
    const inputStyle1 = window.getComputedStyle(getinputStyle)._values;

    const labelTxt = container.querySelector('p[class^="StyledBody"]');

    if (inputStyle) {
      expect(inputStyle['color']).toBe('rgb(0, 0, 0)');
      expect(inputStyle['font-family']).toBe('Verizon-NHG-eDS');
      expect(inputStyle['font-size']).toBe('1rem');
      expect(inputStyle['line-height']).toBe('1.25rem');
      expect(inputStyle['letter-spacing']).toBe('0.03125rem');
      expect(inputStyle['border-radius']).toBe('4px');
      expect(inputStyle['padding']).toBe('0.6875rem');
    }
    if (inputStyle1) {
      expect(inputStyle1['background-color']).toBe('rgb(255, 236, 224)');
      expect(inputStyle1['border-radius']).toBe('4px');
      expect(inputStyle1['height']).toBe('2.75rem');
      expect(inputStyle1['min-width']).toBe('2.75rem');
      expect(getinputStyle).toHaveStyleRule(
        'border',
        '0.0625rem solid #b95319'
      );
    }

    if (labelTxt) {
      expect(labelTxt).toHaveStyleRule('line-height', '1rem');
      expect(labelTxt).toHaveStyleRule(
        'font-family',
        'Verizon-NHG-eTX,Helvetica,Arial,Sans-serif'
      );
      expect(labelTxt).toHaveStyleRule('color', '#000000');
      expect(labelTxt).toHaveStyleRule('font-size', '0.75rem');
      expect(labelTxt).toHaveStyleRule('font-weight', '400');
    }

    const erroricon = container.querySelector(
      '[class^="IconSVGWrapper"][aria-label="error icon"]'
    );
    expect(erroricon).toHaveStyleRule('width', '1.25rem');
    expect(erroricon).toHaveStyleRule('width', '1.25rem');

    const fillcolor = container.querySelector(
      '[class^="IconSVGWrapper"][aria-label="error icon"] svg path'
    );
    const stylefill = window.getComputedStyle(fillcolor)._values;
    expect(stylefill['fill']).toBe('#000000');

    expect(container).toMatchSnapshot();
  });

  test('InputField error dark surface', () => {
    const { container, getByTestId } = render(
      <InputField
        type="text"
        data-testid="input"
        surface="dark"
        ariaLabel="Input test"
        label="Label"
        error={true}
        helperText="Helper text"
        errorText="Error"
      />
    );

    const input = getByTestId('input');
    fireEvent.change(input, { target: { value: 'hello' } });
    expect(input.value).toBe('hello');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input.value).toBe('test');

    const inputStyle = window.getComputedStyle(input)._values;

    const getinputStyle = container.querySelector('[class^="InputContainer"]');
    const inputStyle1 = window.getComputedStyle(getinputStyle)._values;

    const labelTxt = container.querySelector('p[class^="StyledBody"]');

    if (inputStyle) {
      expect(inputStyle['color']).toBe('rgb(255, 255, 255)');
      expect(inputStyle['font-family']).toBe('Verizon-NHG-eDS');
      expect(inputStyle['font-size']).toBe('1rem');
      expect(inputStyle['line-height']).toBe('1.25rem');
      expect(inputStyle['letter-spacing']).toBe('0.03125rem');
      expect(inputStyle['border-radius']).toBe('4px');
      expect(inputStyle['padding']).toBe('0.6875rem');
    }
    if (inputStyle1) {
      expect(inputStyle1['background-color']).toBe('rgb(86, 23, 1)');
      expect(inputStyle1['border-radius']).toBe('4px');
      expect(inputStyle1['height']).toBe('2.75rem');
      expect(inputStyle1['min-width']).toBe('2.75rem');
      expect(getinputStyle).toHaveStyleRule(
        'border',
        '0.0625rem solid #ff8027'
      );
    }

    if (labelTxt) {
      expect(labelTxt).toHaveStyleRule('line-height', '1rem');
      expect(labelTxt).toHaveStyleRule(
        'font-family',
        'Verizon-NHG-eTX,Helvetica,Arial,Sans-serif'
      );
      expect(labelTxt).toHaveStyleRule('color', '#ffffff');
      expect(labelTxt).toHaveStyleRule('font-size', '0.75rem');
      expect(labelTxt).toHaveStyleRule('font-weight', '400');
    }

    const erroricon = container.querySelector(
      '[class^="IconSVGWrapper"][aria-label="error icon"]'
    );
    expect(erroricon).toHaveStyleRule('width', '1.25rem');
    expect(erroricon).toHaveStyleRule('width', '1.25rem');

    const fillcolor = container.querySelector(
      '[class^="IconSVGWrapper"][aria-label="error icon"] svg path'
    );
    const stylefill = window.getComputedStyle(fillcolor)._values;
    expect(stylefill['fill']).toBe('#ffffff');

    expect(container).toMatchSnapshot();
  });

  test('InputField value', () => {
    const { container, getByTestId, rerender } = render(
      <InputField
        label="hi"
        type="text"
        value="VDS"
        data-testid="input"
        error={false}
        required={true}
        errorText="error"
      />
    );

    const input = getByTestId('input');
    expect(input.value).toBe('VDS');
    expect(container).toMatchSnapshot();

    rerender(
      <InputField
        errorText="error"
        label="hi"
        type="text"
        value="rerender test"
        data-testid="input"
        error={undefined}
        required={false}
      />
    );

    expect(input.value).toBe('rerender test');
  });

  test('InputField defaultValue', () => {
    const { container, getByTestId } = render(
      <InputField type="text" defaultValue="VDS" data-testid="input" />
    );

    const input = getByTestId('input');
    expect(input.value).toBe('VDS');
    expect(container).toMatchSnapshot();
  });

  test('InputField error success', () => {
    const { container, getByText } = render(
      <InputField
        label="hi"
        errorText="error"
        type="text"
        data-testid="input"
        success
        successText="success"
      />
    );

    expect(getByText('success')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('should  error and errorText', () => {
    const { container, getByText } = render(
      <InputField label="hi" type="text" error errorText="error" />
    );

    expect(getByText('error')).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });

  /* test('InputField error without errorText', () => {
    const { container } = render(
      <InputField label='hi' type="text" data-testid="input" error />
    );

    expect(container).toMatchSnapshot();
  }); */

  test('InputField error function', () => {
    const { container } = render(
      <InputField
        label="hi"
        type="text"
        data-testid="input"
        error={() => {}}
        errorText="Error"
      />
    );

    expect(container).toMatchSnapshot();
  });

  test('InputField width', () => {
    const { container, getByTestId } = render(
      <InputField label="hi" type="text" data-testid="input" width={200} />
    );

    expect(getByTestId('test-container').parentNode).toHaveStyle(
      'width: 12.5rem'
    );
    expect(container).toMatchSnapshot();
  });

  test('InputField readOnly', () => {
    const { container, getByTestId } = render(
      <InputField
        label="hi"
        type="text"
        disabled
        data-testid="input"
        placeholder="Test"
        readOnly
        errorText="error"
      />
    );
    const input = getByTestId('input');
    const inputStyle = window.getComputedStyle(input)._values;

    const getinputStyle = container.querySelector('[class^="InputContainer"]');
    const inputStyle1 = window.getComputedStyle(getinputStyle)._values;
    const labelTxt = container.querySelector('p[class^="StyledBody"]');
    if (inputStyle) {
      expect(inputStyle['color']).toBe('rgb(216, 218, 218)');
      expect(inputStyle['font-family']).toBe('Verizon-NHG-eDS');
      expect(inputStyle['font-size']).toBe('1rem');
      expect(inputStyle['line-height']).toBe('1.25rem');
      expect(inputStyle['letter-spacing']).toBe('0.03125rem');
      expect(inputStyle['border-radius']).toBe('4px');
      expect(inputStyle['padding']).toBe('0.6875rem');
    }
    if (inputStyle1) {
      expect(inputStyle1['background-color']).toBe('rgb(255, 255, 255)');
      expect(inputStyle1['border-radius']).toBe('4px');
      expect(inputStyle1['height']).toBe('2.75rem');
      expect(inputStyle1['min-width']).toBe('2.75rem');
      expect(inputStyle1['border']).toBe('0.0625rem solid #d8dada');
    }

    if (labelTxt) {
      expect(labelTxt).toHaveStyleRule('line-height', '1rem');
      expect(labelTxt).toHaveStyleRule(
        'font-family',
        'Verizon-NHG-eTX,Helvetica,Arial,Sans-serif'
      );
      expect(labelTxt).toHaveStyleRule('color', '#d8dada');
      expect(labelTxt).toHaveStyleRule('font-size', '0.75rem');
      expect(labelTxt).toHaveStyleRule('font-weight', '400');
    }
    expect(getByTestId('input')).toHaveAttribute('readonly');
    expect(getByTestId).toMatchSnapshot();
  });

  test('InputField readOnly dark surface', () => {
    const { container, getByTestId } = render(
      <InputField
        label="hi"
        type="text"
        surface="dark"
        disabled
        data-testid="input"
        placeholder="Test"
        readOnly
        errorText="error"
      />
    );
    const input = getByTestId('input');
    const inputStyle = window.getComputedStyle(input)._values;

    const getinputStyle = container.querySelector('[class^="InputContainer"]');
    const inputStyle1 = window.getComputedStyle(getinputStyle)._values;
    const labelTxt = container.querySelector('p[class^="StyledBody"]');
    if (inputStyle) {
      expect(inputStyle['color']).toBe('rgb(51, 51, 51)');
      expect(inputStyle['font-family']).toBe('Verizon-NHG-eDS');
      expect(inputStyle['font-size']).toBe('1rem');
      expect(inputStyle['line-height']).toBe('1.25rem');
      expect(inputStyle['letter-spacing']).toBe('0.03125rem');
      expect(inputStyle['border-radius']).toBe('4px');
      expect(inputStyle['padding']).toBe('0.6875rem');
    }
    if (inputStyle1) {
      expect(inputStyle1['background-color']).toBe('rgb(0, 0, 0)');
      expect(inputStyle1['border-radius']).toBe('4px');
      expect(inputStyle1['height']).toBe('2.75rem');
      expect(inputStyle1['min-width']).toBe('2.75rem');
      expect(inputStyle1['border']).toBe('0.0625rem solid #333333');
    }

    if (labelTxt) {
      expect(labelTxt).toHaveStyleRule('line-height', '1rem');
      expect(labelTxt).toHaveStyleRule(
        'font-family',
        'Verizon-NHG-eTX,Helvetica,Arial,Sans-serif'
      );
      expect(labelTxt).toHaveStyleRule('color', '#333333');
      expect(labelTxt).toHaveStyleRule('font-size', '0.75rem');
      expect(labelTxt).toHaveStyleRule('font-weight', '400');
    }
    expect(getByTestId('input')).toHaveAttribute('readonly');
    expect(getByTestId).toMatchSnapshot();
  });

  test('InputField inverted', () => {
    const { container, getByTestId } = render(
      <InputField
        type="text"
        data-testid="input"
        label="Label"
        placeholder="Test"
        surface="dark"
        inverted
        isOpen
      />
    );

    const input = getByTestId('input');
    const inputStyle = window.getComputedStyle(input)._values;

    const getinputStyle = container.querySelector('[class^="InputContainer"]');
    const inputStyle1 = window.getComputedStyle(getinputStyle)._values;

    const labelTxt = container.querySelector('p[class^="StyledBody"]');

    if (inputStyle) {
      expect(inputStyle['color']).toBe('rgb(255, 255, 255)');
      expect(inputStyle['font-family']).toBe('Verizon-NHG-eDS');
      expect(inputStyle['font-size']).toBe('1rem');
      expect(inputStyle['line-height']).toBe('1.25rem');
      expect(inputStyle['letter-spacing']).toBe('0.03125rem');
      expect(inputStyle['border-radius']).toBe('4px');
      expect(inputStyle['padding']).toBe('0.6875rem');
    }
    if (inputStyle1) {
      expect(inputStyle1['background-color']).toBe('rgb(0, 0, 0)');
      expect(inputStyle1['border-radius']).toBe('4px');
      expect(inputStyle1['height']).toBe('2.75rem');
      expect(inputStyle1['min-width']).toBe('2.75rem');
      expect(inputStyle1['border']).toBe('0.0625rem solid #ffffff');
    }

    if (labelTxt) {
      expect(labelTxt).toHaveStyleRule('line-height', '1rem');
      expect(labelTxt).toHaveStyleRule(
        'font-family',
        'Verizon-NHG-eTX,Helvetica,Arial,Sans-serif'
      );
      expect(labelTxt).toHaveStyleRule('color', '#ffffff');
      expect(labelTxt).toHaveStyleRule('font-size', '0.75rem');
      expect(labelTxt).toHaveStyleRule('font-weight', '400');
    }
    expect(getByTestId).toMatchSnapshot();
  });

  test('InputField disabled', () => {
    const { container, getByTestId } = render(
      <InputField
        errorText="error"
        label="hi"
        type="text"
        disabled
        data-testid="input"
        placeholder="Test"
      />
    );

    const input = getByTestId('input');
    const inputStyle = window.getComputedStyle(input)._values;

    const getinputStyle = container.querySelector('[class^="InputContainer"]');
    const inputStyle1 = window.getComputedStyle(getinputStyle)._values;

    const labelTxt = container.querySelector('p[class^="StyledBody"]');

    if (inputStyle) {
      expect(inputStyle['color']).toBe('rgb(216, 218, 218)');
      expect(inputStyle['font-family']).toBe('Verizon-NHG-eDS');
      expect(inputStyle['font-size']).toBe('1rem');
      expect(inputStyle['line-height']).toBe('1.25rem');
      expect(inputStyle['letter-spacing']).toBe('0.03125rem');
      expect(inputStyle['border-radius']).toBe('4px');
      expect(inputStyle['padding']).toBe('0.6875rem');
    }
    if (inputStyle1) {
      expect(inputStyle1['background-color']).toBe('rgb(255, 255, 255)');
      expect(inputStyle1['border-radius']).toBe('4px');
      expect(inputStyle1['height']).toBe('2.75rem');
      expect(inputStyle1['min-width']).toBe('2.75rem');
      expect(inputStyle1['border']).toBe('0.0625rem solid #d8dada');
    }

    if (labelTxt) {
      expect(labelTxt).toHaveStyleRule('line-height', '1rem');
      expect(labelTxt).toHaveStyleRule(
        'font-family',
        'Verizon-NHG-eTX,Helvetica,Arial,Sans-serif'
      );
      expect(labelTxt).toHaveStyleRule('color', '#d8dada');
      expect(labelTxt).toHaveStyleRule('font-size', '0.75rem');
      expect(labelTxt).toHaveStyleRule('font-weight', '400');
    }
    expect(getByTestId('input')).toHaveAttribute('disabled');
    expect(getByTestId('input')).toBeDisabled();
  });

  test('InputField calendar readOnly', () => {
    const { getByTestId } = render(
      <InputField
        errorText="error"
        label="hi"
        type="calendar"
        data-testid="input"
        readOnly
      />
    );

    expect(getByTestId('input')).toHaveAttribute('readonly');
    expect(getByTestId).toMatchSnapshot();
  });

  test('InputField calendar locked', () => {
    const { getByTestId } = render(
      <InputField
        errorText="error"
        label="hi"
        type="calendar"
        data-testid="input"
        placeholder="Test"
        locked
      />
    );

    // expect(getByTestId('input')).toHaveAttribute('readonly');
    expect(getByTestId).toMatchSnapshot();
  });

  test('InputField calendar readOnly', () => {
    const { getByTestId } = render(
      <InputField label="hi" type="calendar" data-testid="input" readOnly />
    );

    expect(getByTestId('input')).toHaveAttribute('readonly');
    expect(getByTestId).toMatchSnapshot();
  });
});
describe('InputField- with 1.0 updates', () => {
  test('InputField 1.0 error', () => {
    const { container, getByTestId } = render(
      <InputField
        errorText="error"
        label="hi"
        type="text"
        error
        // typescale="VDS"
        required={false}
        focusState
        overflowEllipsis
        iconPosition="right"
        placeholder="Test"
      />
    );

    const input = getByTestId('test-input');
    const label = getByTestId('test-label');

    fireEvent.click(label);
    input.focus();
    input.blur();
    expect(getByTestId('test-input')).toBeTruthy();
    expect(getByTestId('test-input').getAttribute('placeholder')).toBe(null);
  });

  test('InputField disabled', () => {
    const { container, getByTestId } = render(
      <InputField
        type="text"
        hoverState
        focusState
        readOnlyBorders
        overflowEllipsis
        disabled
        errorText="error"
        label={'test-label'}
        // typescale="VDS"
        labelMarginBottom="4px"
        iconPosition="right"
        placeholder="Test"
        data-testid="test-input"
      />
    );

    const input = getByTestId('test-input');
    expect(input).toBeDisabled();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('InputField readOnly', () => {
    const { container, getByTestId } = render(
      <InputField
        type="text"
        hoverState
        focusState
        readOnlyBorders
        overflowEllipsis
        disabled
        readOnly
        errorText="error"
        label={'test-label'}
        // typescale="VDS"
        labelMarginBottom="4px"
        iconPosition="right"
        placeholder="Test"
        data-testid="test-input"
      />
    );

    expect(getByTestId('test-input')).toHaveAttribute('readonly');
    expect(container.firstChild).toMatchSnapshot();
  });

  test('InputField helperText', () => {
    helperTextPlacement.forEach(position => {
      const { container } = render(
        <InputField
          type="text"
          hoverState
          focusState
          readOnlyBorders
          overflowEllipsis
          disabled
          readOnly
          errorText="error"
          label={'test-label'}
          // typescale="VDS"
          labelMarginBottom="4px"
          iconPosition="right"
          placeholder="Test"
          helperText="test for helper text"
          helperTextPlacement={position}
        />
      );

      expect(container).toMatchSnapshot();
    });
  });

  test('InputField disabled dark surface', () => {
    const { container, getByTestId } = render(
      <InputField
        errorText="error"
        surface="dark"
        label="hi"
        type="text"
        disabled
        data-testid="input"
        placeholder="Test"
      />
    );

    const input = getByTestId('input');
    const inputStyle = window.getComputedStyle(input)._values;

    const getinputStyle = container.querySelector('[class^="InputContainer"]');
    const inputStyle1 = window.getComputedStyle(getinputStyle)._values;

    const labelTxt = container.querySelector('p[class^="StyledBody"]');

    if (inputStyle) {
      expect(inputStyle['color']).toBe('rgb(51, 51, 51)');
      expect(inputStyle['font-family']).toBe('Verizon-NHG-eDS');
      expect(inputStyle['font-size']).toBe('1rem');
      expect(inputStyle['line-height']).toBe('1.25rem');
      expect(inputStyle['letter-spacing']).toBe('0.03125rem');
      expect(inputStyle['border-radius']).toBe('4px');
      expect(inputStyle['padding']).toBe('0.6875rem');
    }
    if (inputStyle1) {
      expect(inputStyle1['background-color']).toBe('rgb(0, 0, 0)');
      expect(inputStyle1['border-radius']).toBe('4px');
      expect(inputStyle1['height']).toBe('2.75rem');
      expect(inputStyle1['min-width']).toBe('2.75rem');
      expect(inputStyle1['border']).toBe('0.0625rem solid #333333');
    }

    if (labelTxt) {
      expect(labelTxt).toHaveStyleRule('line-height', '1rem');
      expect(labelTxt).toHaveStyleRule(
        'font-family',
        'Verizon-NHG-eTX,Helvetica,Arial,Sans-serif'
      );
      expect(labelTxt).toHaveStyleRule('color', '#333333');
      expect(labelTxt).toHaveStyleRule('font-size', '0.75rem');
      expect(labelTxt).toHaveStyleRule('font-weight', '400');
    }
    expect(getByTestId('input')).toHaveAttribute('disabled');
    expect(getByTestId('input')).toBeDisabled();
  });

  test('InputField Types', () => {
    inputFieldTypes.forEach(type => {
      const { container, getByLabelText, getByTestId } = render(
        <InputField
          type={type}
          hoverState
          data-testid="input"
          focusState
          readOnlyBorders
          overflowEllipsis
          label={'test-label'}
          // typescale="VDS"
          labelMarginBottom="4px"
          iconPosition="right"
          aria-label="Test-input"
          minWidth={calculateMinWidth(type)}
          maxWidth={calculateRem(596)}
          inputHeight={calculateRem(44)}
          inlineActionButtonLabel="Apply"
          showPasswordButtonLabel="Show"
          hidePasswordButtonLabel="Hide"
          onClickInlineAction={() => {}}
          renderErrorIcon
          TextLink={TextLink}
          helperText="Enter input"
          success
        />
      );

      // const input = getByTestId('input');
      const input = container.querySelector('[aria-label="Test-input"]');
      const inputStyle = window.getComputedStyle(input)._values;

      const inputContainerStyle = container.querySelector(
        '[class^="InputContainer"]'
      );
      const inputStyle1 = window.getComputedStyle(inputContainerStyle)._values;

      const labelTxt = container.querySelector('p[class^="StyledBody"]');

      if (inputStyle) {
        expect(input).toHaveStyleRule('color', '#000000');
        expect(input).toHaveStyleRule('font-family', 'Verizon-NHG-eDS');
        expect(input).toHaveStyleRule('font-size', '1rem');
        expect(input).toHaveStyleRule('line-height', '1.25rem');
        expect(input).toHaveStyleRule('border-radius', '4px');
        expect(input).toHaveStyleRule('padding', '0.6875rem');
      }
      if (inputStyle1) {
        expect(inputContainerStyle).toHaveStyleRule(
          'background-color',
          '#dcf5e6'
        );
        expect(inputContainerStyle).toHaveStyleRule('border-radius', '4px');
        expect(inputContainerStyle).toHaveStyleRule('height', '2.75rem');
        expect(inputContainerStyle).toHaveStyleRule(
          'border',
          '0.0625rem solid #008331'
        );
      }

      expect(labelTxt).toHaveStyleRule('line-height', '1rem');
      expect(labelTxt).toHaveStyleRule(
        'font-family',
        'Verizon-NHG-eTX,Helvetica,Arial,Sans-serif'
      );
      expect(labelTxt).toHaveStyleRule('color', '#000000');
      expect(labelTxt).toHaveStyleRule('font-size', '0.75rem');
      expect(labelTxt).toHaveStyleRule('font-weight', '400');
      const successIcon = container.querySelector(
        '[class^="IconSVGWrapper"][aria-label="checkmark-alt icon"]'
      );
      expect(successIcon).toHaveStyleRule('width', '1.25rem');
      expect(successIcon).toHaveStyleRule('width', '1.25rem');

      const fillcolor = container.querySelector(
        '[class^="IconSVGWrapper"][aria-label="checkmark-alt icon"] svg path'
      );
      const stylefill = window.getComputedStyle(fillcolor)._values;
      // expect(stylefill['fill']).toBe('#000000');

      expect(container).toMatchSnapshot();
    });
  });

  test('InputField Types', () => {
    inputFieldTypes.forEach(type => {
      const { container, getByLabelText, getByTestId } = render(
        <InputField
          type={type}
          hoverState
          data-testid="input"
          surface="dark"
          focusState
          readOnlyBorders
          overflowEllipsis
          label={'test-label'}
          // typescale="VDS"
          labelMarginBottom="4px"
          iconPosition="right"
          aria-label="Test-input"
          minWidth={calculateMinWidth(type)}
          maxWidth={calculateRem(596)}
          inputHeight={calculateRem(44)}
          inlineActionButtonLabel="Apply"
          showPasswordButtonLabel="Show"
          hidePasswordButtonLabel="Hide"
          onClickInlineAction={() => {}}
          renderErrorIcon
          TextLink={TextLink}
          helperText="Enter input"
          success
        />
      );

      // const input = getByTestId('input');
      const input = container.querySelector('[aria-label="Test-input"]');
      const inputStyle = window.getComputedStyle(input)._values;

      const inputContainerStyle = container.querySelector(
        '[class^="InputContainer"]'
      );
      const inputStyle1 = window.getComputedStyle(inputContainerStyle)._values;

      const labelTxt = container.querySelector('p[class^="StyledBody"]');

      if (inputStyle) {
        expect(input).toHaveStyleRule('color', '#ffffff');
        expect(input).toHaveStyleRule('font-family', 'Verizon-NHG-eDS');
        expect(input).toHaveStyleRule('font-size', '1rem');
        expect(input).toHaveStyleRule('line-height', '1.25rem');
        expect(input).toHaveStyleRule('border-radius', '4px');
        expect(input).toHaveStyleRule('padding', '0.6875rem');
      }
      if (inputStyle1) {
        expect(inputContainerStyle).toHaveStyleRule(
          'background-color',
          '#003514'
        );
        expect(inputContainerStyle).toHaveStyleRule('border-radius', '4px');
        expect(inputContainerStyle).toHaveStyleRule('height', '2.75rem');
        expect(inputContainerStyle).toHaveStyleRule(
          'border',
          '0.0625rem solid #00b845'
        );
      }

      expect(labelTxt).toHaveStyleRule('line-height', '1rem');
      expect(labelTxt).toHaveStyleRule(
        'font-family',
        'Verizon-NHG-eTX,Helvetica,Arial,Sans-serif'
      );
      expect(labelTxt).toHaveStyleRule('color', '#ffffff');
      expect(labelTxt).toHaveStyleRule('font-size', '0.75rem');
      expect(labelTxt).toHaveStyleRule('font-weight', '400');

      const successIcon = container.querySelector(
        '[class^="IconSVGWrapper"][aria-label="checkmark-alt icon"]'
      );
      expect(successIcon).toHaveStyleRule('width', '1.25rem');
      expect(successIcon).toHaveStyleRule('width', '1.25rem');

      const fillcolor = container.querySelector(
        '[class^="IconSVGWrapper"][aria-label="checkmark-alt icon"] svg path'
      );
      const stylefill = window.getComputedStyle(fillcolor)._values;
      // expect(stylefill['fill']).toBe('#ffffff');

      expect(container).toMatchSnapshot();
    });
  });

  test('InputField disabled readOnly', () => {
    inputFieldTypes.forEach(type => {
      const { container, getByLabelText } = render(
        <InputField
          data-testid="input"
          type={type}
          hoverState
          focusState
          readOnlyBorders
          overflowEllipsis
          disabled
          readOnly
          label={'test-label'}
          // typescale="VDS"
          labelMarginBottom="4px"
          aswaq
          iconPosition="right"
          placeholder="Test"
          aria-label="Test-input"
          minWidth={calculateMinWidth(type)}
          maxWidth={calculateRem(596)}
          inputHeight={calculateRem(44)}
          helperText="test for helper text"
          helperTextPlacement="bottom"
          inlineActionButtonLabel="Apply"
          showPasswordButtonLabel="Show"
          hidePasswordButtonLabel="Hide"
          onClickInlineAction={() => {}}
          renderErrorIcon
          TextLink={TextLink}
        />
      );

      expect(container).toMatchSnapshot();
    });
  });

  test('InputFieldsecurity code onChange', () => {
    const { container, getByTestId, rerender } = render(
      <InputField
        data-testid="input"
        type="securityCode"
        hoverState
        focusState
        readOnlyBorders
        overflowEllipsis
        disabled
        readOnly
        label={'test-label'}
        // typescale="VDS"
        maxWidth={calculateRem(596)}
        inputHeight={calculateRem(44)}
        iconConfig={IconData}
        required
        labelMarginBottom="4px"
        iconPosition="right"
        placeholder="Test"
        aria-label="Test-input"
        Tooltip={Tooltip}
        CreditCardIcon={() => <></>}
      />
    );

    const input = getByTestId('input');
    fireEvent.change(input, { target: { value: '123a' } });
    expect(input.value).toBe('123');

    rerender(
      <InputField
        ddata-testid="input"
        type="securityCode"
        hoverState
        focusState
        overflowEllipsis
        label={'test-label'}
        typescale="VDS"
        maxWidth={calculateRem(596)}
        inputHeight={calculateRem(44)}
        iconConfig={IconData}
        required
        labelMarginBottom="4px"
        iconPosition="right"
        placeholder="Test"
        aria-label="Test-input"
        //cardType="amex"
        Tooltip={Tooltip}
        inverted
        CreditCardIcon={() => <></>}
      />
    );

    fireEvent.change(input, { target: { value: '4567' } });
    expect(input.value).toBe('4567');
  });
  test('InputField credit card onChange', () => {
    const { container, getByTestId, rerender } = render(
      <InputField
        data-testid="input"
        type="creditCard"
        hoverState
        focusState
        readOnlyBorders
        overflowEllipsis
        disabled
        readOnly
        label={'test-label'}
        // typescale="VDS"
        maxWidth={calculateRem(596)}
        inputHeight={calculateRem(44)}
        iconConfig={IconData}
        required
        labelMarginBottom="4px"
        iconPosition="right"
        placeholder="Test"
        aria-label="Test-input"
        Tooltip={props => {
          <span>{props.children}</span>;
        }}
        CreditCardIcon={() => <div></div>}
      />
    );

    const input = document.querySelector('input');
    fireEvent.change(input, { target: { value: '4242' } });
    //expect(input.value).toBe('4242');
    expect(container.firstChild).toMatchSnapshot();
  });
  test('InputFieldtel onChange', () => {
    const { container, getByTestId } = render(
      <InputField
        data-testid="input"
        type="tel"
        hoverState
        focusState
        readOnlyBorders
        overflowEllipsis
        disabled
        readOnly
        label={'test-label'}
        // typescale="VDS"
        labelMarginBottom="4px"
        iconPosition="right"
        placeholder="Test"
        aria-label="Test-input"
      />
    );

    const input = getByTestId('input');
    fireEvent.change(input, { target: { value: '1as23' } });
    expect(input.value).toBe('123-');
    fireEvent.change(input, { target: { value: '9876543210' } });
    expect(input.value).toBe('987-654-3210');
    expect(container.firstChild).toMatchSnapshot();
  });

  test('InputFielddate onChange mmyy', () => {
    const { container, getByTestId } = render(
      <InputField
        data-testid="input"
        type="date"
        hoverState
        focusState
        readOnlyBorders
        overflowEllipsis
        disabled
        readOnly
        label={'test-label'}
        // typescale="VDS"
        labelMarginBottom="4px"
        iconPosition="right"
        placeholder="Test"
        aria-label="Test-input"
        errorEvent="change"
        onChange={() => {}}
      />
    );

    const input = getByTestId('input');
    fireEvent.change(input, { target: { value: '1as223' } });
    expect(input.value).toBe('12/23');
    fireEvent.change(input, { target: { value: '0721' } });
    expect(input.value).toBe('07/21');
    expect(container.firstChild).toMatchSnapshot();
  });
  test('InputFielddate onChange mmddyy', () => {
    const { container, getByTestId } = render(
      <InputField
        data-testid="input"
        type="date"
        hoverState
        focusState
        readOnlyBorders
        overflowEllipsis
        disabled
        readOnly
        label={'test-label'}
        // typescale="VDS"
        labelMarginBottom="4px"
        iconPosition="right"
        placeholder="Test"
        aria-label="Test-input"
        dateFormat="mmddyy"
      />
    );

    const input = getByTestId('input');
    fireEvent.change(input, { target: { value: '1as20721' } });
    expect(input.value).toBe('12/07/21');
    fireEvent.change(input, { target: { value: '070721' } });
    expect(input.value).toBe('07/07/21');
    expect(container.firstChild).toMatchSnapshot();
  });

  test('InputFielddate onChange mmddyyyy', () => {
    const { container, getByTestId } = render(
      <InputField
        data-testid="input"
        type="date"
        hoverState
        focusState
        readOnlyBorders
        overflowEllipsis
        disabled
        readOnly
        label={'test-label'}
        // typescale="VDS"
        labelMarginBottom="4px"
        iconPosition="right"
        placeholder="Test"
        dateFormat="mmddyyyy"
      />
    );

    const input = getByTestId('input');
    fireEvent.change(input, { target: { value: '1as2072021' } });
    expect(input.value).toBe('12/07/2021');
    fireEvent.change(input, { target: { value: '07072021' } });
    expect(input.value).toBe('07/07/2021');
    expect(container.firstChild).toMatchSnapshot();
  });

  test('InputField creditCard onChange', () => {
    const { container, getByTestId } = render(
      <InputField
        data-testid="input"
        type="creditCard"
        label="Card number"
        hoverState
        readOnlyBorders
        focusState
        overflowEllipsis
        // typescale="VDS"
        labelMarginBottom="4px"
        minWidth={calculateRem(282)}
        maxWidth={calculateRem(596)}
        inputHeight={calculateRem(44)}
        helperText="test for helper text"
        helperTextPlacement="bottom"
        cardType="visa"
        CreditCardIcon={() => <div></div>}
        errorEvent="change"
        required
      />
    );

    // const input = getByTestId('input');
    // fireEvent.input(input, { target: { value: '4242424242424242' } });
    // expect(input.value).toBe('4242424242424242');
    // input.blur();
    // input.focus();
    // expect(input.value).toBe('');
    expect(container.firstChild).toMatchSnapshot();
  });

  test('InputField password test', async () => {
    const { container, getByTestId } = render(
      <InputField
        data-testid="input"
        type="password"
        hoverState
        focusState
        readOnlyBorders
        overflowEllipsis
        label={'test-label'}
        // typescale="VDS"
        labelMarginBottom="4px"
        iconPosition="right"
        placeholder="Test"
        showPasswordButtonLabel="Show"
        hidePasswordButtonLabel="Hide"
        mask="toggle"
        required
        showPassword
        TextLink={TextLink}
        onClickInlineAction={() => {}}
        renderErrorIcon
        success
      />
    );

    // const input = getByTestId('input');
    // fireEvent.change(input, { target: { value: 'Password' } });
    // expect(input).toHaveAttribute('type', 'password');

    // // expect(setTimeout).toHaveBeenCalledTimes(1);
    // const inlineAction = container.querySelector('a');
    // fireEvent.click(inlineAction);
    // expect(input).toHaveAttribute('type', 'text');
    // expect(input.value).toBe('Password');

    // fireEvent.click(inlineAction);
    // fireEvent.change(input, { target: { value: 'Password' } });
    // // expect(setTimeout).toHaveBeenCalledTimes(2);
    // fireEvent.keyDown(inlineAction, {
    //   key: 'Enter',
    //   code: 13,
    //   charCode: 13,
    //   keyCode: 13,
    // });
    // expect(setTimeout).toHaveBeenCalledTimes(3);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('InputField InlineAction test', () => {
    const { container, getByTestId } = render(
      <InputField
        data-testid="input"
        type="inlineAction"
        hoverState
        focusState
        readOnlyBorders
        overflowEllipsis
        label={'Test label'}
        // typescale="VDS"
        labelMarginBottom="4px"
        iconPosition="right"
        placeholder="Test"
        inlineActionButtonLabel="Apply"
        onClickInlineAction={() => {}}
        required
        TextLink={TextLink}
        renderErrorIcon
        success
      />
    );

    // const input = getByTestId('input');
    // fireEvent.change(input, { target: { value: 'Test' } });
    // expect(input.value).toBe('Test');
    // const inlineAction = container.querySelector('a');
    // fireEvent.click(inlineAction);
    // inlineAction.focus();
    // inlineAction.blur();
    // fireEvent.keyDown(inlineAction, {
    //   key: ' ',
    //   code: 32,
    //   charCode: 32,
    //   keyCode: 32,
    // });
    // fireEvent.keyDown(inlineAction, {
    //   key: 'Tab',
    //   code: 9,
    //   charCode: 9,
    //   keyCode: 9,
    // });
    expect(container).toMatchSnapshot();
  });

  test('InputField calendar test', () => {
    const { rerender, container } = render(
      <InputField
        data-testid="input"
        type="calendar"
        hoverState
        readOnlyBorders
        overflowEllipsis
        focusState
        label={'Test label'}
        // typescale="VDS"
        labelMarginBottom="4px"
        iconPosition="right"
        placeholder="Test"
        required
        TextLink={TextLink}
        renderErrorIcon
      />
    );
    rerender(
      <InputField
        data-testid="input"
        type="calendar"
        hoverState
        focusState
        readOnlyBorders
        overflowEllipsis
        label={'Test label'}
        typescale="VDS"
        labelMarginBottom="4px"
        iconPosition="right"
        placeholder="Test"
        required={false}
        TextLink={TextLink}
        renderErrorIcon
        inverted
        readOnly
      />
    );

    // const input = container.querySelector('input');
    // input.focus();
    // input.blur();
    expect(container).toMatchSnapshot();
  });

  test('InputField error inverted and !disabled', () => {
    const { container } = render(
      <InputField
        errorText="error"
        label="hi"
        type="text"
        error
        inverted
        data-testid="input"
        placeholder="Test"
      />
    );
    expect(container).toMatchSnapshot();
  });
  test('InputField success inverted and !disabled', () => {
    const { container } = render(
      <InputField
        successText="success"
        label="hi"
        type="text"
        success
        inverted
        data-testid="input"
        placeholder="Test"
      />
    );
    expect(container).toMatchSnapshot();
  });
  test('InputField disable and  inverted', () => {
    const { container } = render(
      <InputField
        label="hi"
        type="text"
        inverted
        disabled
        data-testid="input"
        placeholder="Test"
      />
    );
    expect(container).toMatchSnapshot();
  });
  test('InputField heavyErrorBorder and inverted', () => {
    const { container } = render(
      <InputField
        label="hi"
        type="text"
        inverted
        heavyErrorBorder
        data-testid="input"
        placeholder="Test"
      />
    );
    expect(container).toMatchSnapshot();
  });
  test('InputField heavyErrorBorder and not inverted', () => {
    const { container } = render(
      <InputField
        label="hi"
        type="text"
        heavyErrorBorder
        data-testid="input"
        placeholder="Test"
      />
    );
    expect(container).toMatchSnapshot();
  });
  test('test error prevProps', () => {
    const { rerender, container } = render(
      <InputField
        label="hi"
        type="text"
        error={false}
        errorText="error"
        data-testid="input"
        placeholder="Test"
      />
    );
    rerender(
      <InputField
        label="hi"
        type="text"
        error={true}
        errorText="error"
        data-testid="input"
        placeholder="Test"
      />
    );
    //expect(container).toMatchSnapshot();
  });
  test('test emptyError prevProps and type calendar ', () => {
    const { rerender, container } = render(
      <InputField
        label="hi"
        type="calendar"
        error={false}
        errorText="error"
        emptyError={undefined}
        data-testid="input"
        placeholder="Test"
      />
    );
    rerender(
      <InputField
        label="hi"
        type="calendar"
        error={true}
        errorText="error"
        data-testid="input"
        emptyError="Some text"
        placeholder="Test"
      />
    );
    //expect(container).toMatchSnapshot();
  });
  test('test emptyError prevProps and type text ', () => {
    const { rerender, container } = render(
      <InputField
        label="hi"
        type="text"
        error={false}
        errorText="error"
        emptyError={undefined}
        data-testid="input"
        placeholder="Test"
      />
    );
    rerender(
      <InputField
        label="hi"
        type="text"
        error={undefined}
        errorText="error"
        data-testid="input"
        emptyError="Some text"
        placeholder="Test"
      />
    );
    //expect(container).toMatchSnapshot();
  });

  test('test onClickInlineAction on text', () => {
    const { getByRole, container } = render(
      <InputField
        label="hi"
        type="inlineAction"
        data-testid="input"
        placeholder="Test"
        onClickInlineAction={() => {}}
        inlineActionButtonLabel={'Apply'}
      />
    );
    const standAloneLink = getByRole('button', { ariaLabel: 'Apply' });

    const StandalonelinkText = container.querySelector(
      '[class^="StyledAnchor"]'
    );
    const StandalonelinkTextStyles = window.getComputedStyle(StandalonelinkText)
      ._values;

    if (StandalonelinkTextStyles) {
      expect(standAloneLink).toHaveStyleRule(
        'border-bottom',
        '0.0625rem solid #000000'
      );
      expect(standAloneLink).toHaveStyleRule('cursor', 'pointer');
      expect(standAloneLink).toHaveStyleRule('color', '#000000');
      expect(standAloneLink).toHaveStyleRule('font-weight', '400');
      expect(standAloneLink).toHaveStyleRule('font-size', '1rem');
      expect(standAloneLink).toHaveStyleRule('font-family', 'Verizon-NHG-eDS');
      expect(standAloneLink).toHaveStyleRule('line-height', '1.25rem');
    }

    fireEvent.click(standAloneLink);
  });
  test('test onClickInlineAction on password', () => {
    const { getByTestId, getByRole, rerender, container } = render(
      <InputField
        label="hi"
        type="password"
        data-testid="input"
        placeholder="Test"
        mask="toggle"
        showPasswordButtonLabel="Show"
        hidePasswordButtonLabel="Hide"
        onClickInlineAction={() => {}}
      />
    );
    const input = getByTestId('input');
    fireEvent.change(input, { target: { value: '123a' } });
    expect(input.value).toBe('123a');

    rerender(
      <InputField
        label="hi"
        type="password"
        data-testid="input"
        placeholder="Test"
        mask="toggle"
        showPasswordButtonLabel="Show"
        hidePasswordButtonLabel="Hide"
        value={'123a'}
        onClickInlineAction={() => {}}
      />
    );

    const standLink = getByRole('button', { ariaLabel: 'Show password' });
    fireEvent.click(standLink);
  });

  test('test _onKeyDown and onClickInlineAction on text', () => {
    const { getByRole, container } = render(
      <InputField
        label="hi"
        type="inlineAction"
        data-testid="input"
        placeholder="Test"
        onClickInlineAction={() => {}}
        inlineActionButtonLabel={'Apply'}
      />
    );
    const standAloneLink = getByRole('button', { ariaLabel: 'Apply' });
    fireEvent.keyDown(standAloneLink, {
      key: 'Enter',
      code: 13,
      charCode: 13,
    });
    fireEvent.keyDown(standAloneLink, {
      key: 'Space',
      code: 32,
      charCode: 32,
    });
    expect(container).toMatchSnapshot();
  });

  test('test onKeyDown onClickInlineAction on password', () => {
    const { getByTestId, getByRole, rerender, container } = render(
      <InputField
        label="hi"
        type="password"
        data-testid="input"
        placeholder="Test"
        mask="toggle"
        showPasswordButtonLabel="Show"
        hidePasswordButtonLabel="Hide"
        onClickInlineAction={() => {}}
      />
    );
    const input = getByTestId('input');
    fireEvent.change(input, { target: { value: '123a' } });
    expect(input.value).toBe('123a');

    rerender(
      <InputField
        label="hi"
        type="password"
        data-testid="input"
        placeholder="Test"
        mask="toggle"
        showPasswordButtonLabel="Show"
        hidePasswordButtonLabel="Hide"
        value={'123a'}
        onClickInlineAction={() => {}}
      />
    );

    const standAloneLink = getByRole('button', { ariaLabel: 'Show password' });
    //standAloneLink.focus();
    fireEvent.keyDown(standAloneLink, {
      key: 'Enter',
      code: 13,
      charCode: 13,
    });
    fireEvent.keyDown(standAloneLink, {
      key: 'Space',
      code: 32,
      charCode: 32,
    });
    expect(container).toMatchSnapshot();
  });

  test('test onChange on creditCard', () => {
    const { getByTestId, rerender, container } = render(
      <Input
        label="hi"
        type={'creditCard'}
        data-testid="test-input"
        placeholder="Test"
        onChange={jest.fn()}
      />
    );
    const input = getByTestId('test-input');
    fireEvent.change(input, { target: { value: '124' } });
    //fireEvent.change(input, { target: { value: '1245' } });
    expect(input.value).toBe('124');

    //expect(input.value).toBe('123');
    expect(container).toMatchSnapshot();
  });

  test('test InputText component', () => {
    const { container } = render(<InputText />);
    expect(container).toMatchSnapshot();
  });

  test('test InputText component typescale', () => {
    const { container } = render(<InputText typescale={'VDS'} />);
    expect(container).toMatchSnapshot();
  });

  test('InputFielddate on inverted state', () => {
    const { container, getByTestId } = render(
      <InputField
        data-testid="input"
        type="date"
        hoverState
        focusState
        readOnlyBorders
        overflowEllipsis
        label={'test-label'}
        // typescale="VDS"
        labelMarginBottom="4px"
        iconPosition="right"
        placeholder="Test"
        aria-label="Test-input"
        inverted
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  test('InputField creditCard with helperText', () => {
    const { container, getByLabelText } = render(
      <Input
        label="hi"
        type={'creditCard'}
        data-testid="test-input"
        placeholder="Test"
        onChange={jest.fn()}
        error
        errorText="Error"
        helperText="Something went wrong"
      />
    );
    const input = getByLabelText('hi');
    expect(input).toBeTruthy();
  });
});
