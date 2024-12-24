import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import TextArea from './TextArea';

jest.mock('@vds-core/utilities', () => {
  // Require the original module to not be mocked...
  const originalModule = jest.requireActual('@vds-core/utilities');

  return {
    __esModule: true, // Use it when dealing with esModules
    ...originalModule,
    generateUUID: jest.fn(() => '1'),
  };
});

describe('TextArea', () => {
  test('TextArea', () => {
    const { container } = render(<TextArea inputId="textarea" />);
    const textArea = container.querySelector('textarea');
    fireEvent.change(textArea, { target: { value: 'test' } });
    expect(textArea.value).toBe('test');
    expect(true).toBe(true);
  });

  test('TextArea with error', () => {
    const { getByTestId } = render(
      <TextArea
        error={true}
        errorText="test-error-text"
        required={false}
        helperText="Multi line Input"
        errorEvent="change"
        onChange={() => {}}
        label={'test-label'}
      />
    );
    const input = getByTestId('test-input');
    fireEvent.click(input);
    input.focus();
    input.blur();
    fireEvent.change(input, { target: { value: 'test' } });
  });

  test('TextArea disabled', () => {
    const { container, getByTestId } = render(
      <TextArea
        disabled
        label={'test-label'}
        ariaLabel="Test TextArea"
        helperText="Multi line Input"
      />
    );
    const input = getByTestId('test-input');
    expect(container).toMatchSnapshot();
    expect(input).toBeDisabled();
  });

  test('TextArea readOnly', () => {
    const { container } = render(
      <TextArea
        hoverState
        focusState
        readOnlyBorders
        overflowEllipsis
        disabled
        readOnly
        label={'test-label'}
        labelMarginBottom="4px"
      />
    );
    const textArea = container.querySelector('textarea');
    expect(textArea.getAttribute('readonly')).toBe('');
    expect(container).toMatchSnapshot();
  });

  test('TextArea rerender', () => {
    const { container, rerender } = render(
      <TextArea
        hoverState
        focusState
        readOnlyBorders
        overflowEllipsis
        disabled
        readOnly
        label={'test-label'}
        labelMarginBottom="4px"
        minHeight="2X"
        value="Line 1\nLine 2\nLine 3\nLine 4\nLine 5\nLine 6"
      />
    );
    expect(container).toMatchSnapshot();
    rerender(
      <TextArea
        hoverState
        focusState
        readOnlyBorders
        overflowEllipsis
        disabled
        readOnly
        label={'test-label'}
        // typescale="VDS"
        labelMarginBottom="4px"
        minHeight="2X"
        value={'text'}
      />
    );
  });

  test('TextArea width', () => {
    const { container } = render(<TextArea label={'test-label'} width={320} />);
    expect(container).toMatchSnapshot();
  });

  test('TextArea value', () => {
    const { container } = render(
      <TextArea
        hoverState
        focusState
        readOnlyBorders
        overflowEllipsis
        label={'test-label'}
        labelMarginBottom="4px"
        minHeight="4X"
        data-testid="test-input"
        width={320}
        value="#123, Verizon"
      />
    );
    const textArea = container.querySelector('textarea');
    expect(textArea.value).toBe('#123, Verizon');
    expect(container).toMatchSnapshot();
  });

  test('TextArea defaultValue', () => {
    const { container, getByTestId } = render(
      <TextArea
        hoverState
        focusState
        readOnlyBorders
        overflowEllipsis
        label={'test-label'}
        labelMarginBottom="4px"
        minHeight="4X"
        defaultValue="#123, Verizon"
      />
    );
    const input = getByTestId('test-input');
    expect(input.value).toBe('#123, Verizon');
    expect(container).toMatchSnapshot();
  });

  test('TextArea required', () => {
    const { container, getByTestId, getByText } = render(
      <TextArea
        hoverState
        focusState
        readOnlyBorders
        overflowEllipsis
        label="Street Address"
        labelMarginBottom="4px"
        minHeight="4X"
        data-testid="test-input"
        required
      />
    );
    const input = getByTestId('test-input');
    fireEvent.click(input);
    input.focus();
    input.blur();
    expect(input.value).toBe('');
    expect(getByText('You must enter a Street Address')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('TextArea maxLength error', () => {
    const { container, getByText, getByTestId } = render(
      <TextArea
        hoverState
        focusState
        readOnlyBorders
        overflowEllipsis
        label={'test-label'}
        labelMarginBottom="4px"
        minHeight="4X"
        data-testid="test-input"
        maxLength={3}
      />
    );
    const input = getByTestId('test-input');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(getByText('-1')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('TextArea heavyErrorBorder', () => {
    const { container } = render(
      <TextArea
        label={'test-label'}
        required={false}
        heavyErrorBorder
        error={true}
        errorText="test-error-text"
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('TextArea calculateBackgroundColor', () => {
    const { container } = render(
      <TextArea
        label={'test-label'}
        calculateBackgroundColor={() => {}}
        error={true}
        inverted
        errorText={'Error'}
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('TextArea inverted and disabled', () => {
    const { container } = render(
      <TextArea
        label={'test-label'}
        required={false}
        minHeight="8X"
        inverted
        disabled
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('TextArea calculateOptionalLabelColor', () => {
    const { container } = render(
      <TextArea
        required={false}
        calculateOptionalLabelColor={() => {}}
        disabled
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('TextArea input focus', () => {
    const { container } = render(<TextArea inverted label="dfhn" />);
    const input = container.querySelector('[data-testid="test-input"]');
    fireEvent.focus(input);
    expect(container).toMatchSnapshot();
  });

  test('TextArea input focus on error', () => {
    const { container } = render(
      <TextArea inverted error={true} label="dfhn" errorText="Error" />
    );
    const input = container.querySelector('[data-testid="test-input"]');
    fireEvent.focus(input);
    expect(container).toMatchSnapshot();
  });

  test('TextArea on Mouse enter/leave', () => {
    const { container } = render(<TextArea label="dfhn" required={false} />);
    fireEvent.mouseEnter(container.firstChild);
    fireEvent.mouseLeave(container.firstChild);
    expect(container).toMatchSnapshot();
  });
});
