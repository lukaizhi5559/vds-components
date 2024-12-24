import { render, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import { Toggle } from '.';
import { TypographyTokens } from '@vds-tokens/typography';
import { ColorTokens } from '@vds-tokens/color';
afterEach(cleanup);

function _calcSize(remVal) {
  const baseFont = 12;
  let num = parseFloat(remVal);
  return num * baseFont + 'px';
}

// mock uuid
jest.mock('@vds-core/utilities', () => {
  const originalModule = jest.requireActual('@vds-core/utilities');
  return {
    __esModule: true, // Use it when dealing with esModules
    ...originalModule,
    generateUUID: jest.fn(() => 1),
  };
});

describe('Toggle', () => {
  test('should render default Toggle', () => {
    const { container } = render(
      <Toggle value="default Toggle">Toggle 5 (disabled)</Toggle>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render disabled state dark surface', () => {
    const { container } = render(
      <Toggle
        value="disabled dark"
        disabled={true}
        surface="dark"
        showText={true}
      >
        Toggle 5 (disabled)
      </Toggle>
    );
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(container.firstChild);
    const textonoff = container.querySelector('[class^="TextWrapper"]');
    const toggleSwitch = container.querySelector('label span');
    const toggleSwitchStyles = window.getComputedStyle(toggleSwitch)._values;
    const textOnoffStyles = window.getComputedStyle(textonoff)._values;
    if (textOnoffStyles) {
      expect(textOnoffStyles['font-size']).toBe('0.75rem');
      expect(textOnoffStyles['line-height']).toBe('1rem');
      expect(parseFloat(textOnoffStyles['font-weight'])).toBe(400);
      expect(textOnoffStyles['font-family']).toBe('Verizon-NHG-eTX');
    }

    if (toggleSwitchStyles) {
      expect(toggleSwitchStyles['height']).toBe('1.75rem');
      expect(toggleSwitchStyles['background-color']).toBe('rgb(51, 51, 51)');
      expect(toggleSwitchStyles['width']).toBe('3.25rem');
    }
  });

  test('should render disabled state dark surface', () => {
    const { container } = render(
      <Toggle
        value="disabled dark"
        disabled={true}
        surface="light"
        showText="true"
      >
        Toggle 5 (disabled)
      </Toggle>
    );

    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(container.firstChild);
    const textonoff = container.querySelector('[class^="TextWrapper"]');
    const toggleSwitch = container.querySelector('label span');
    const toggleSwitchStyles = window.getComputedStyle(toggleSwitch)._values;
    const textOnoffStyles = window.getComputedStyle(textonoff)._values;
    if (textOnoffStyles) {
      expect(textOnoffStyles['font-size']).toBe('0.75rem');
      expect(textOnoffStyles['line-height']).toBe('1rem');
      expect(parseFloat(textOnoffStyles['font-weight'])).toBe(400);
      expect(textOnoffStyles['font-family']).toBe('Verizon-NHG-eTX');
    }

    if (toggleSwitchStyles) {
      expect(toggleSwitchStyles['height']).toBe('1.75rem');
      expect(toggleSwitchStyles['background-color']).toBe('rgb(216, 218, 218)');
      expect(toggleSwitchStyles['width']).toBe('3.25rem');
    }
  });

  test('should render toggle default styles correctly', () => {
    const { container } = render(
      <Toggle
        value="default"
        disabled={false}
        surface="dark"
        showText="true"
        fontWeight="regular"
        textSize="small"
        textPosition="left"
      />
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(container.firstChild);
    const textonoff = container.querySelector('[class^="TextWrapper"]');
    const toggleSwitch = container.querySelector('label span');
    const toggleSwitchStyles = window.getComputedStyle(toggleSwitch)._values;
    const textOnoffStyles = window.getComputedStyle(textonoff)._values;
    if (textOnoffStyles) {
      expect(textOnoffStyles['font-size']).toBe('0.75rem');
      expect(textOnoffStyles['line-height']).toBe('1rem');
      expect(parseFloat(textOnoffStyles['font-weight'])).toBe(400);
      expect(textOnoffStyles['font-family']).toBe('Verizon-NHG-eTX');
    }

    if (toggleSwitchStyles) {
      expect(toggleSwitchStyles['height']).toBe('1.75rem');
      expect(toggleSwitchStyles['background-color']).toBe('rgb(111, 113, 113)');
      expect(toggleSwitchStyles['width']).toBe('3.25rem');
    }
  });

  test('should render default Toggle with inputId', () => {
    const { container } = render(
      <Toggle
        inputId="1"
        name="toggle"
        activeLabel="acive"
        inactiveLabel="inactive"
        value="default Toggle"
      >
        Toggle 1
      </Toggle>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render default Toggle in focusState', () => {
    const { container } = render(
      <Toggle focusState value="default Toggle">
        Toggle 2
      </Toggle>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render default inverted Toggle', () => {
    const { container } = render(
      <Toggle focusState inverted value="default Toggle">
        Toggle 3
      </Toggle>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render default Toggle in active state', () => {
    const { container } = render(
      <Toggle size="large" on name="toggle" value="default Toggle">
        Toggle 4
      </Toggle>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render disabled state Toggle', () => {
    const { container } = render(
      <Toggle value="disabled Toggle" disabled>
        Toggle 5 (disabled)
      </Toggle>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});

test('should render disabled hitArea', () => {
  const { container, getByTestId } = render(
    <Toggle value="disabled Toggle" disabled hitArea>
      Toggle 5 (disabled)
    </Toggle>
  );

  const hitArea = getByTestId('test-hitArea');

  expect(container.firstChild).toMatchSnapshot();
});

// test('<Toggle/>', () => {
//   const { container } = render(<Toggle value="default" />);

//   // Expect ToggleSwitch to have same value as one given in rendering
//   const ToggleSwitch = container.firstChild.firstChild;
//   expect(ToggleSwitch.value = 'default'));
//   expect(ToggleSwitch.getAttribute('aria-checked')).toBe('false');
//   fireEvent.click(ToggleSwitch);
//   expect(ToggleSwitch.getAttribute('aria-checked')).toBe('true');
// });

test('<Toggle/> - click', () => {
  const { container } = render(<Toggle value="default" />);

  fireEvent.click(container.firstChild.firstChild);
  fireEvent.mouseEnter(container.firstChild.firstChild);
  fireEvent.mouseLeave(container.firstChild.firstChild);
  fireEvent.keyDown(container.firstChild.firstChild, {
    key: 'Enter',
    keyCode: 13,
    charCode: 13,
  });
});

test('<Toggle/> - handleToggle undefined', () => {
  const { container } = render(<Toggle onChange={() => {}} value="default" />);

  fireEvent.keyDown(container.firstChild.firstChild, {
    key: 'Enter',
    code: 13,
    charCode: 13,
  });
  fireEvent.keyDown(container.firstChild.firstChild, {
    key: 'Space',
    keyCode: 32,
    charCode: 32,
  });
});

test('<Toggle/> - handleToggle undefined', () => {
  const { container } = render(<Toggle onChange={() => {}} value="default" />);

  fireEvent.click(container.firstChild.firstChild);
});

test('<Toggle/> - handleToggle', () => {
  const { container, getByTestId } = render(
    <Toggle hitArea on={false} hasLabels value="default" />
  );

  const hitArea = getByTestId('test-hitArea');
  const toggle = getByTestId('test-toggle');

  fireEvent.click(hitArea);
  fireEvent.click(toggle);
  fireEvent.mouseEnter(toggle);
  fireEvent.mouseLeave(toggle);
  fireEvent.keyDown(toggle, {
    key: 'Enter',
    keyCode: 13,
    charCode: 13,
  });
});

test('<Toggle/> - handleToggle', () => {
  const onChange = jest.fn();
  const { container, getByTestId } = render(
    <Toggle
      hitArea
      hideText
      handleToggle={onChange}
      onChange={onChange}
      value={2}
    />
  );

  const hitArea = getByTestId('test-hitArea');

  // get ahold of the button element, and trigger some clicks on it
  const toggle = getByTestId('test-toggle');
  fireEvent.click(toggle);

  fireEvent.keyPress(toggle, {
    key: 'Enter',
    keyCode: 13,
    charCode: 13,
  });

  // expect(onChange).toHaveBeenCalledTimes(2);
});

test('<Toggle/> - disabledState', () => {
  const onChange = jest.fn();
  const { container, getByTestId } = render(
    <Toggle
      hitArea
      disabledState
      disabled
      handleToggle={onChange}
      onChange={onChange}
      value={2}
    />
  );

  const hitArea = getByTestId('test-hitArea');

  // get ahold of the button element, and trigger some clicks on it
  const toggle = getByTestId('test-toggle');

  fireEvent.click(toggle);

  fireEvent.keyPress(toggle, {
    key: 'Enter',
    keyCode: 13,
    charCode: 13,
  });
});

test('<Toggle/> - disabledState', () => {
  const onChange = jest.fn();
  const { container, getByTestId, rerender } = render(
    <Toggle hitArea on={false} onChange={onChange} value={2} />
  );

  fireEvent.click(container);
  const toggle = getByTestId('test-toggle');

  fireEvent.keyPress(toggle, {
    key: ' ',
    keyCode: 32,
    charCode: 32,
  });

  rerender(<Toggle hitArea on={true} onChange={onChange} value={2} />);
});

// test('<Toggle /> disabled', () => {
//   const { container } = render(<Toggle disabled value="default" />);

//   // Expect ToggleSwitch to have attribute disabled
//   const ToggleSwitch = container.firstChild.firstChild;
//   expect(ToggleSwitch).toBeDisabled();
// });

// test('<Toggle /> checked', () => {
//   const { container } = render(<Toggle checked value="default" />);
//   // Expect ToggleSwitch to be checked
//   const ToggleSwitch = container.firstChild.firstChild;
//   expect(ToggleSwitch.getAttribute('aria-checked')).toBe('true');
// });

// test('<Toggle /> labels', () => {
//   const { container, getByText } = render(
//     <Toggle
//       statusText="outside"
//       value="default"
//     />
//   );

//   // Expect labels to exist
//   const ToggleSwitch = container.firstChild.firstChild;
//   expect(ToggleSwitch.value = 'default'));
//   expect(getByText('on')).toBeTruthy();
//   expect(getByText('off')).toBeTruthy();
// });

// test('<Toggle /> key press', () => {
//   const { container } = render(<Toggle value="default" />);

//   // Expect ToggleSwitch to have same value as one given in rendering
//   const ToggleSwitch = container.firstChild.firstChild;
//   expect(ToggleSwitch.value = 'default'));
//   expect(ToggleSwitch.getAttribute('aria-checked')).toBe('false');
//   fireEvent.click(ToggleSwitch);
//   expect(ToggleSwitch.getAttribute('aria-checked')).toBe('true');
//   fireEvent.keyPress(ToggleSwitch, { key: 'Space', code: 32, charCode: 32 });
//   expect(ToggleSwitch.getAttribute('aria-checked')).toBe('false');
// });
