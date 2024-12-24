import { render, fireEvent, createEvent } from '@testing-library/react';
import React from 'react';
import { RadioButton, RadioButtonGroup } from './';
import { Body } from '@vds-core/typography';

const onChange = () => {};

// mock cuid
jest.mock('@vds-core/utilities', () => {
  const originalModule = jest.requireActual('@vds-core/utilities');
  return {
    __esModule: true, // Use it when dealing with esModules
    ...originalModule,
    generateUUID: jest.fn(() => '1'),
  };
});
Object.defineProperty(
  window.navigator,
  'userAgent',
  (value => ({
    get() {
      return value;
    },
    set(v) {
      value = v;
    },
  }))(window.navigator['userAgent'])
);

describe('RadioButton', () => {
  test('RadioButton default styles', () => {
    const { container } = render(
      <RadioButton name="test" value="test value" label="Radio button 1">
        Unselected Radio
      </RadioButton>
    );
    //RadioButton size
    const radio = container.querySelector('.radioOuter');
    expect(radio).toHaveStyle('height : 1.25rem; width: 1.25rem');
    //unselected radio border
    expect(radio).toHaveStyle('border : solid 1px #6f7171');
    //Label (Optional) / Text styles
    const label = container.querySelector('[class^="LabelWrapper"]');
    expect(label).toHaveStyle('font-weight : 700;');
    const text = container.querySelector('label');
    expect(text).toHaveStyle(
      'font-size : 1rem; font-family: Verizon-NHG-eDS; color: #000000; line-height: 1.25rem; letter-spacing: 0.03125rem;'
    );
    const rWrap = container.querySelector('.radioWrapper');
    //Spacing between radio and text
    expect(rWrap).toHaveStyle('padding : 0 0 0 12px');
    //Hit area
    const hit = container.querySelector('input');
    expect(hit).toHaveStyle('width : 44px; height:44px');
    //Hover (Mouse Only) - Radio styles
    fireEvent.mouseOver(rWrap);
    expect(rWrap).toHaveStyleRule('box-shadow', '0 0 0 0.0625rem #6f7171', {
      modifier: `:hover:not(:active) .radioOuter`,
    });
  });

  test('RadioButton default styles inverted', () => {
    const { container } = render(
      <RadioButton
        name="test"
        value="test value"
        label="Radio button 1"
        surface="dark"
      >
        Unselected Radio
      </RadioButton>
    );
    //RadioButton size
    const radio = container.querySelector('.radioOuter');
    expect(radio).toHaveStyle('height : 1.25rem; width: 1.25rem');
    //unselected radio border
    expect(radio).toHaveStyle('border : solid 1px #a7a7a7');
    //Label (Optional) / Text styles
    const label = container.querySelector('[class^="LabelWrapper"]');
    expect(label).toHaveStyle('font-weight : 700;');
    const text = container.querySelector('label');
    expect(text).toHaveStyle(
      'font-size : 1rem; font-family: Verizon-NHG-eDS; color: rgb(255, 255, 255); line-height: 1.25rem; letter-spacing: 0.03125rem;'
    );
    const rWrap = container.querySelector('.radioWrapper');
    //Spacing between radio and text
    expect(rWrap).toHaveStyle('padding : 0 0 0 12px');
    //Hit area
    const hit = container.querySelector('input');
    expect(hit).toHaveStyle('width : 44px; height:44px');
    //Hover (Mouse Only) - Radio styles
    fireEvent.mouseOver(rWrap);
    expect(rWrap).toHaveStyleRule('box-shadow', '0 0 0 0.0625rem #a7a7a7', {
      modifier: `:hover:not(:active) .radioOuter`,
    });
  });

  test('RadioButton error styles', () => {
    const { container } = render(
      <RadioButton name="test" value="test value" label="Radio button 1" error>
        Unselected Radio
      </RadioButton>
    );
    const radio = container.querySelector('.radioOuter');
    //unselected radio border
    expect(radio).toHaveStyle(
      'border-color : #b95319; background-color: rgb(255, 236, 224)'
    );
    //Label (Optional) / Text styles
    const text = container.querySelector('label');
    expect(text).toHaveStyle('color: #000000;');
    const rWrap = container.querySelector('.radioWrapper');
    //Hover (Mouse Only) - Radio styles
    fireEvent.mouseOver(rWrap);
    expect(rWrap).toHaveStyleRule('box-shadow', '0 0 0 0.0625rem #b95319', {
      modifier: `:hover:not(:active) .radioOuter`,
    });
  });

  test('RadioButton disabled styles', () => {
    const { container } = render(
      <RadioButton
        name="test"
        value="test value"
        label="Radio button 1"
        disabled
      >
        Unselected Radio
      </RadioButton>
    );
    const radio = container.querySelector('.radioOuter');
    //unselected radio border
    expect(radio).toHaveStyle(
      'border : solid 1px #d8dada; background-color: transparent'
    );
    //Label (Optional) / Text styles
    const text = container.querySelector('label');
    expect(text).toHaveStyle('color: #d8dada');
  });

  test('RadioButton disabled styles inverted', () => {
    const { container } = render(
      <RadioButton
        name="test"
        value="test value"
        label="Radio button 1"
        surface="dark"
        disabled
      >
        Unselected Radio
      </RadioButton>
    );
    const radio = container.querySelector('.radioOuter');
    //unselected radio border
    expect(radio).toHaveStyle(
      'border : solid 1px #333333; background-color: transparent'
    );
    //Label (Optional) / Text styles
    const text = container.querySelector('label');
    expect(text).toHaveStyle('color: #333333');
  });

  test('RadioButton error styles inverted', () => {
    const { container } = render(
      <RadioButton
        name="test"
        value="test value"
        label="Radio button 1"
        surface="dark"
        error
      >
        Unselected Radio
      </RadioButton>
    );
    const radio = container.querySelector('.radioOuter');
    //unselected radio border
    expect(radio).toHaveStyle(
      'border-color : #ff8027; background-color: rgb(86, 23, 1)'
    );
    //Label (Optional) / Text styles
    const text = container.querySelector('label');
    expect(text).toHaveStyle('color: #ffffff;');
    const rWrap = container.querySelector('.radioWrapper');
    //Hover (Mouse Only) - Radio styles
    fireEvent.mouseOver(rWrap);
    expect(rWrap).toHaveStyleRule('box-shadow', '0 0 0 0.0625rem #ff8027', {
      modifier: `:hover:not(:active) .radioOuter`,
    });
  });

  test('RadioButton selected styles', () => {
    const { container } = render(
      <RadioButton
        name="test"
        value="test value"
        label="Radio button 1"
        selected
      >
        Unselected Radio
      </RadioButton>
    );
    const radio = container.querySelector('.radioOuter');
    //Selected Radio Button - Inner circle size
    expect(radio.firstChild).toHaveStyle(
      'height: 0.625rem; width: 0.625rem; background-color: #000000; border-radius: 50%;'
    );
    //Inner circle - Align - center & border
    expect(radio).toHaveStyle(
      'align-items : center; justify-content: center; border : solid 1px #000000'
    );
    const rWrap = container.querySelector('.radioWrapper');
    //Hover (Mouse Only) - Radio styles
    fireEvent.mouseOver(rWrap);
    expect(rWrap).toHaveStyleRule('box-shadow', '0 0 0 0 #000000', {
      modifier: `:hover:not(:active) .radioOuter`,
    });
  });

  test('RadioButton focusring', () => {
    const { container } = render(
      <>
        <button id="bt" />
        <RadioButton name="test" value="test value" label="Radio button 1">
          Unselected Radio
        </RadioButton>
      </>
    );
    const btt = container.querySelector('#bt');
    const rWrap = container.querySelector('input');
    fireEvent.click(btt);
    fireEvent.keyDown(btt, {
      key: 'Tab',
      keyCode: 9,
      charCode: 9,
    });
    expect(rWrap).toHaveStyleRule('border', '0.0625rem dashed #000000', {
      modifier: `:focus:not(:hover) + label .radioOuter::after`,
    });
  });

  test('RadioButton focusring inverted', () => {
    const { container } = render(
      <>
        <button id="bt" />
        <RadioButton name="test" value="test value" surface="dark">
          Unselected Radio
        </RadioButton>
      </>
    );
    const btt = container.querySelector('#bt');
    const rWrap = container.querySelector('input');
    fireEvent.click(btt);
    fireEvent.keyDown(btt, {
      key: 'Tab',
      keyCode: 9,
      charCode: 9,
    });
    expect(rWrap).toHaveStyleRule('border', '0.0625rem dashed #ffffff', {
      modifier: `:focus:not(:hover) + label .radioOuter::after`,
    });
  });

  test('should render unselected RadioButton component correctly', () => {
    const { container } = render(
      <RadioButton
        selected={false}
        name="test"
        value="test value"
        onChange={onChange}
      >
        Unselected Radio
      </RadioButton>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render checked Radio component correctly', () => {
    const { container } = render(
      <RadioButton
        selected
        name="test"
        onChange={onChange}
        value="test value checked"
      >
        Checked Radio
      </RadioButton>
    );
    const input = container.querySelector('input[type=radio]');
    expect(input.checked).toBeTruthy();
  });

  test('should render checked undefined Radio', () => {
    const { container } = render(
      <RadioButton
        selected={undefined}
        name="test"
        onChange={onChange}
        value="test value checked"
      >
        Checked Radio
      </RadioButton>
    );
    const input = container.querySelector('input[type=radio]');
    expect(input.checked).toBeFalsy();
    fireEvent.click(container.firstChild.firstChild);
    expect(input.checked).toBeTruthy();
  });

  test('should render clicked controlled radio', () => {
    const { container } = render(
      <RadioButton
        selected
        name="test"
        onChange={onChange}
        value="test value checked"
      >
        Checked Radio
      </RadioButton>
    );
    const input = container.querySelector('input[type=radio]');
    expect(input.checked).toBeTruthy();
    fireEvent.click(container.firstChild.firstChild);
    expect(input.checked).toBeTruthy();
  });

  test('should render disabled Radio component correctly', () => {
    const { container } = render(
      <RadioButton
        selected={false}
        name="test"
        value="test value"
        onChange={onChange}
        disabled
      >
        Disabled Radio
      </RadioButton>
    );
    const input = container.querySelector('input[type=radio]');
    expect(input.disabled).toBeTruthy();
  });
});

describe('RadioGroup', () => {
  test('<RadioButtonGroup/>', () => {
    const { container, getByText } = render(
      <RadioButtonGroup
        childWidth={'100%'}
        viewport={'desktop'}
        data={[
          {
            name: 'group',
            children: 'Radio One Text',
            value: 'radioOne',
            ariaLabel: 'radio one',
          },
          {
            name: 'group',
            children: 'Radio Two Text',
            value: 'radioTwo',
            ariaLabel: 'radio two',
          },
        ]}
      />
    );

    expect(getByText('Radio One Text')).not.toBe(null);
    expect(getByText('Radio Two Text')).not.toBe(null);
    expect(container.child).toMatchSnapshot();
  });

  test('should render RadioGroup with default value two', () => {
    const { container } = render(
      <RadioButtonGroup defaultValue="two" onChange={onChange}>
        <RadioButton name="one" value="one">
          Radio 1
        </RadioButton>
        <RadioButton name="two" value="two" success>
          Radio 2 (success)
        </RadioButton>
        <RadioButton name="three" value="three" warning>
          Radio 3 (warning)
        </RadioButton>
        <RadioButton name="four" value="four" error>
          Radio 4 (error)
        </RadioButton>
        <RadioButton name="five" value="five" disabled>
          Radio 5 (disabled)
        </RadioButton>
      </RadioButtonGroup>
    );

    const radioOne = container.querySelector('input[name=one]');
    expect(radioOne).toBeTruthy();
    const radioTwo = container.querySelector('input[name=two]');
    expect(radioTwo).toBeTruthy();
    expect(radioTwo.checked).toBeTruthy();
    const radioThree = container.querySelector('input[name=three]');
    expect(radioThree).toBeTruthy();
    const radioFour = container.querySelector('input[name=four]');
    expect(radioFour).toBeTruthy();
    const radioFive = container.querySelector('input[name=five]');
    expect(radioFive).toBeTruthy();
    expect(radioFive.disabled).toBeTruthy();
  });

  const selectRadio = jest.fn();
  test('<RadioButton />', () => {
    const { container } = render(
      <RadioButtonGroup onChange={selectRadio}>
        <RadioButton name="default" value="Radio">
          Radio
        </RadioButton>
        <RadioButton name="error" value="Radio" error>
          Radio
        </RadioButton>
        <RadioButton name="disabled" value="Radio" disabled>
          Radio
        </RadioButton>
      </RadioButtonGroup>
    );

    // Expect 3 radio buttons
    const radioButtons = container.querySelectorAll('[value="Radio"]');
    expect(radioButtons).toHaveLength(3);
    expect(radioButtons[0].getAttribute('Type')).toBe('radio');
    expect(radioButtons[1].getAttribute('Type')).toBe('radio');
    expect(radioButtons[2].getAttribute('Type')).toBe('radio');

    // Expect the third radio to be disabled
    expect(radioButtons[2].getAttribute('disabled')).toBe('');
  });

  test('<RadioButtonGroup />', () => {
    const { container } = render(
      <RadioButtonGroup defaultValue="test" onChange={selectRadio}>
        <RadioButton name="default" value="test">
          Test
        </RadioButton>
        <RadioButton name="default2" value="test2">
          Test2
        </RadioButton>
      </RadioButtonGroup>
    );

    // Expect the radio with value='test' to be checked by default
    const checkedVal = container.querySelector('[value="test"]').checked;
    expect(checkedVal).toBe(true);
  });

  test('<RadioButton /> 1.0', () => {
    const { container, rerender } = render(
      <RadioButton selected={false} name="test" value="test-value-1">
        Unchecked Radio
      </RadioButton>
    );

    fireEvent.click(container.firstChild.firstChild);
    fireEvent.click(container.firstChild.firstChild, {
      clientX: 3,
      clientY: 200,
    });
    expect(document.querySelector('input[type="radio"]').checked).toBeFalsy();

    rerender(
      <RadioButton selected={true} name="test" value="test-value-2">
        Checked Radio
      </RadioButton>
    );
  });

  test('<RadioButton /> 1.0 inverted', () => {
    const { container, rerender } = render(
      <RadioButton
        name="test"
        value="test-value-1"
        surface="dark"
        focusState
        hoverState
        marginBottom="6X"
      >
        Unchecked Radio
      </RadioButton>
    );

    rerender(
      <RadioButton
        name="test"
        value="test-value-2"
        surface="dark"
        disabled
        focusState
        hoverState
        marginBottom="6X"
      >
        Unchecked Radio
      </RadioButton>
    );

    expect(container).toMatchSnapshot();
  });

  test('<RadioButton /> 1.0 undefined check and errorEvents', () => {
    const handleChange = jest.fn();
    const handleChange2 = jest.fn();
    const { container, rerender } = render(
      <RadioButton
        onChange={handleChange}
        selected={true}
        name="test"
        value="test-value-1"
        label="test"
        Body={Body}
        inputId="radiobtn"
        typescale="VDS"
        focusState
        hoverState
      >
        Unchecked Radio
      </RadioButton>
    );

    const input = container.querySelector('input');
    input.focus();
    input.blur();
    fireEvent.click(input, {
      clientX: 3,
      clientY: 200,
    });

    rerender(
      <RadioButton
        onChange={handleChange2}
        selected={undefined}
        name="test"
        value="test-value-1"
        label="test"
        Body={Body}
        inputId="radiobtn"
        disabled
        typescale="VDS"
        focusState
        hoverState
        errorEvent="change"
      >
        Unchecked Radio
      </RadioButton>
    );

    const radioInput = container.querySelector('input');
    radioInput.focus();
    radioInput.blur();
    expect(container).toMatchSnapshot();
  });

  test('<RadioButtonGroup /> 1.0 errorState with radios', () => {
    const { container } = render(
      <RadioButtonGroup
        defaultValue="test"
        focusState
        hoverState
        errorState
        error
        typescale="VDS"
      >
        <RadioButton name="default" value="test">
          Test
        </RadioButton>
        <RadioButton name="default2" value="test2">
          Test2
        </RadioButton>
      </RadioButtonGroup>
    );

    // Expect the radio with value='test' to be checked by default
    const checkedVal = container.querySelector('[value="test"]');
    fireEvent.click(checkedVal);
    expect(checkedVal.checked).toBe(true);
  });

  test('<RadioButtonGroup /> 1.0 errorState with data', () => {
    const { container } = render(
      <RadioButtonGroup
        focusState
        hoverState
        errorState
        error
        typescale="VDS"
        data={[
          {
            name: 'group',
            label: 'In-store Pickup',
            children: 'Select Location',
            value: 'radioOne',
            ariaLabel: 'radio one',
          },
          {
            name: 'group',
            label: 'Ship to me',
            children: 'Eligible for Free 2-day shipping',
            value: 'radioTwo',
            ariaLabel: 'radio two',
          },
        ]}
      />
    );

    const radioOne = container.querySelector('[value="radioOne"]');
    fireEvent.click(radioOne);
    expect(container).toMatchSnapshot();
  });

  test('<RadioButton /> 1.0 on chrome', () => {
    global.navigator.userAgent =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36';
    const { container } = render(
      <RadioButton
        selected={true}
        name="test"
        value="test-value-1"
        label="test"
        Body={Body}
        inputId="radiobtn"
        typescale="VDS"
        focusState
        hoverState
      >
        Unchecked Radio
      </RadioButton>
    );

    const input = container.querySelector('input');
    input.focus();
    input.blur();
    expect(container).toMatchSnapshot();
  });

  test('<RadioButton /> 1.0 on IE', () => {
    global.navigator.userAgent =
      'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; wbx 1.0.0; wbxapp 1.0.0; rv:11.0) like Gecko';
    const { container } = render(
      <RadioButton
        selected={true}
        name="test"
        value="test-value-1"
        label="test"
        Body={Body}
        inputId="radiobtn"
        typescale="VDS"
        focusState
        hoverState
      >
        Unchecked Radio
      </RadioButton>
    );

    const input = container.querySelector('input');
    const clickEvent = createEvent.click(input, {
      button: 0,
    });
    fireEvent(input, clickEvent);
    expect(container).toMatchSnapshot();
  });

  test('<RadioButton /> 1.0 on Safari', () => {
    global.navigator.userAgent =
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15';
    const { container } = render(
      <RadioButton
        selected={true}
        name="test"
        value="test-value-1"
        label="test"
        Body={Body}
        inputId="radiobtn"
        typescale="VDS"
        focusState
        hoverState
      >
        Unchecked Radio
      </RadioButton>
    );

    const input = container.querySelector('input');
    const clickEvent = createEvent.click(input, {
      clientX: 999999,
      clientY: 999999,
      button: 0,
    });
    fireEvent(input, clickEvent);
    expect(container).toMatchSnapshot();
  });

  test('<RadioButton /> 1.0 on Firefox', () => {
    global.navigator.userAgent =
      'Mozilla/5.0 (Mobile; rv:18.0) Gecko/18.0 Firefox/18.0';
    const { container } = render(
      <RadioButton
        selected={true}
        name="test"
        value="test-value-1"
        label="test"
        Body={Body}
        inputId="radiobtn"
        typescale="VDS"
        errorEvent="change"
        focusState
        hoverState
      >
        Unchecked Radio
      </RadioButton>
    );

    const input = container.querySelector('input');
    input.focus();
    input.blur();
    const clickEvent = createEvent.click(input, {
      clientX: 999999,
      clientY: 999999,
      button: 0,
    });

    fireEvent(input, clickEvent);
    expect(container).toMatchSnapshot();
  });

  test('<RadioButton /> 1.0 on Opera', () => {
    global.navigator.userAgent =
      'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.73 Safari/537.36 OPR/34.0.2036.42';
    const { container } = render(
      <RadioButton
        selected={true}
        name="test"
        value="test-value-1"
        label="test"
        Body={Body}
        inputId="radiobtn"
        typescale="VDS"
        errorEvent="change"
        focusState
        hoverState
      >
        Unchecked Radio
      </RadioButton>
    );

    const input = container.querySelector('input');
    input.focus();
    input.blur();
    expect(container).toMatchSnapshot();
  });

  test('<RadioButton /> 1.0 on Edge', () => {
    global.navigator.userAgent =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.9600';
    const { container } = render(
      <RadioButton
        selected={true}
        name="test"
        value="test-value-1"
        label="test"
        Body={Body}
        inputId="radiobtn"
        typescale="VDS"
        errorEvent="change"
        focusState
        hoverState
      >
        Unchecked Radio
      </RadioButton>
    );

    const input = container.querySelector('input');
    input.focus();
    input.blur();
    expect(container).toMatchSnapshot();
  });

  test('<RadioButtonGroup /> 1.0 errorState with radios', () => {
    const { container } = render(
      <RadioButtonGroup
        defaultValue="test"
        focusState
        hoverState
        errorState
        error
        typescale="VDS"
      >
        <RadioButton name="default" value="test">
          Test
        </RadioButton>
        <RadioButton name="default2" value="test2">
          Test2
        </RadioButton>
      </RadioButtonGroup>
    );
    // Expect the radio with value='test' to be checked by default
    const checkedVal = container.querySelector('[value="test"]');
    fireEvent.click(checkedVal);
    expect(checkedVal.checked).toBe(true);
    expect(container).toMatchSnapshot();
  });
});
