import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { RadioBox, RadioBoxGroup } from '.';

// mock cuid
jest.mock('@vds-core/utilities', () => {
  const originalModule = jest.requireActual('@vds-core/utilities');
  return {
    __esModule: true, // Use it when dealing with esModules
    ...originalModule,
    generateUUID: jest.fn(() => 1),
  };
});

let data = [
  {
    value: '16GB',
    text: '16GB',
    type: 'radiobox',
    subtext: 'subtextKnob',
    subtextRight: '$99.99',
    name: 'group',
  },
  {
    value: '32GB',
    text: 'We need a longer radio box to test things out',
    type: 'radiobox',
    subtext: 'subtextKnob',
    name: 'group',
  },
  {
    value: '64GB',
    text: '64GB',
    type: 'radiobox',
    subtext: 'subtextKnob',
    name: 'group',
  },
];

describe('RadioBox and RadioBoxGroup', () => {
  test('RadioBox default styles', () => {
    const { container } = render(<RadioBox name="32gb" text="32gb" />);
    const radioBox = container.querySelector('[class^="RadioBoxLabelWrapper"]');
    //Container Border and Corner Radius and border align inside
    expect(radioBox).toHaveStyle(
      'border-radius : 4px; border: 1px solid #6f7171; box-sizing: border-box;'
    );
    //Container Background
    expect(radioBox).toHaveStyle('background-color : #ffffff;');
    //Text(standalone) style
    expect(radioBox).toHaveStyle(
      'font-size: 1rem; letter-spacing: 0.03125rem; line-height: 1.25rem; font-family: Verizon-NHG-eDS; color: #000000'
    );
    //Spacing
    const label = container.querySelector('label');
    expect(label).toHaveStyle('padding: 0.75rem');
  });

  test('RadioBox default styles inverted', () => {
    const { container } = render(
      <RadioBox name="32gb" text="32gb" surface="dark" />
    );
    const radioBox = container.querySelector('[class^="RadioBoxLabelWrapper"]');
    //Container Border and Corner Radius and border align inside
    expect(radioBox).toHaveStyle(
      'border-radius : 4px; border: 1px solid #a7a7a7; box-sizing: border-box;'
    );
    //Container Background
    expect(radioBox).toHaveStyle('background-color : #000000;');
    //Text(standalone) style
    expect(radioBox).toHaveStyle(
      'font-size: 1rem; letter-spacing: 0.03125rem; line-height: 1.25rem; font-family: Verizon-NHG-eDS; color: #ffffff'
    );
    //Spacing
    const label = container.querySelector('label');
    expect(label).toHaveStyle('padding: 0.75rem');
  });

  test('RadioBox subtext, subtextRight & outOfStock', () => {
    const { container } = render(
      <RadioBox
        name="64GB"
        text="64GB"
        subtext="Cheap"
        subtextRight="$33.33/mo"
        outOfStock
      />
    );
    const radioBox = container.querySelector('[class^="RadioBoxLabelWrapper"]');
    const label = container.querySelector('label[class^="StackedLabel"]');
    //Text style when used with subtext
    expect(radioBox).toHaveStyle(
      'font-size: 1rem; letter-spacing: 0.03125rem; line-height: 1.25rem; font-family: Verizon-NHG-eDS; color: #000000'
    );
    expect(label).toHaveStyle('font-weight: 700');
    //SubtextRight font weight
    const labelRight = container.querySelector('.SubLabelRight');
    expect(labelRight).toHaveStyle('font-weight: 400');
    const strike = container.querySelector('[class^="StrikethroughWrapper"');
    expect(
      strike.hasChildNodes(
        '<line class="Line-VDS__sc-n9jxr1-5 hfjUBZ" x1="0" y1="100%" x2="100%" y2="0"></line>'
      )
    ).toBeTruthy();
    expect(strike.firstChild).toHaveStyle('stroke : #6f7171;');
  });

  test('RadioBox subtext, subtextRight & outOfStock & inverted', () => {
    const { container } = render(
      <RadioBox
        name="64GB"
        text="64GB"
        subtext="Cheap"
        subtextRight="$33.33/mo"
        outOfStock
        surface="dark"
      />
    );
    const radioBox = container.querySelector('[class^="RadioBoxLabelWrapper"]');
    const label = container.querySelector('label[class^="StackedLabel"]');
    //Text style when used with subtext
    expect(radioBox).toHaveStyle(
      'font-size: 1rem; letter-spacing: 0.03125rem; line-height: 1.25rem; font-family: Verizon-NHG-eDS; color: rgb(255, 255, 255)'
    );
    expect(label).toHaveStyle('font-weight: 700');
    //SubtextRight font weight
    const labelRight = container.querySelector('.SubLabelRight');
    expect(labelRight).toHaveStyle('font-weight: 400');
    const strike = container.querySelector('[class^="StrikethroughWrapper"');
    expect(
      strike.hasChildNodes(
        '<line class="Line-VDS__sc-n9jxr1-5 hfjUBZ" x1="0" y1="100%" x2="100%" y2="0"></line>'
      )
    ).toBeTruthy();
    expect(strike.firstChild).toHaveStyle('stroke : #a7a7a7;');
  });

  test('RadioBox disabled & outOfStock', () => {
    const { container } = render(
      <RadioBox
        name="64GB"
        text="64GB"
        subtext="Cheap"
        subtextRight="$33.33/mo"
        disabled
        outOfStock
      />
    );
    const radioBox = container.querySelector('[class^="RadioBoxLabelWrapper"]');
    //Container Border and Corner Radius and border align inside
    expect(radioBox).toHaveStyle(
      'border-radius : 4px; border: 1px solid #6f7171; box-sizing: border-box;'
    );
    //Container Background
    expect(radioBox).toHaveStyle('background-color : #ffffff;');
    //Text color
    expect(radioBox).toHaveStyle('color: rgb(216, 218, 218)');
    const strike = container.querySelector('[class^="StrikethroughWrapper"');
    expect(
      strike.hasChildNodes(
        '<line class="Line-VDS__sc-n9jxr1-5 hfjUBZ" x1="0" y1="100%" x2="100%" y2="0"></line>'
      )
    ).toBeTruthy();
    expect(strike.firstChild).toHaveStyle('stroke : #d8dada;');
  });

  test('RadioBox disabled & outOfStock & inverted', () => {
    const { container } = render(
      <RadioBox
        name="64GB"
        text="64GB"
        subtext="Cheap"
        subtextRight="$33.33/mo"
        disabled
        outOfStock
        surface="dark"
      />
    );
    const radioBox = container.querySelector('[class^="RadioBoxLabelWrapper"]');
    //Container Border and Corner Radius and border align inside
    expect(radioBox).toHaveStyle(
      'border-radius : 4px; border: 1px solid #a7a7a7; box-sizing: border-box;'
    );
    //Container Background
    expect(radioBox).toHaveStyle('background-color : rgb(0, 0, 0);');
    //Text color
    expect(radioBox).toHaveStyle('color: rgb(51, 51, 51)');
    const strike = container.querySelector('[class^="StrikethroughWrapper"');
    expect(
      strike.hasChildNodes(
        '<line class="Line-VDS__sc-n9jxr1-5 hfjUBZ" x1="0" y1="100%" x2="100%" y2="0"></line>'
      )
    ).toBeTruthy();
    expect(strike.firstChild).toHaveStyle('stroke : #333333;');
  });

  test('RadioBox Group Horizontal', () => {
    const { container } = render(
      <RadioBoxGroup data={data} orientation="horizontal" />
    );
    const radioBox = container.querySelector('[class^="RadioBoxLabelWrapper"]');
    //Spacing between Radioboxes horizontal
    expect(radioBox).toHaveStyle('margin : 0 0.75rem 0 0;');
    //Active - Container Additional border style
    fireEvent.mouseOver(radioBox);
    const bStyles = window.getComputedStyle(radioBox, ':hover')._values;
    expect(bStyles['box-shadow']).toBe('0 0 0  0.0625rem #000000');
    expect(radioBox).toHaveStyleRule('box-shadow', '0 0 0  0.0625rem #000000');
  });

  test('RadioBox Group vertical', () => {
    const { container } = render(
      <RadioBoxGroup data={data} orientation="vertical" />
    );
    const radioBox = container.querySelector('[class^="RadioBoxLabelWrapper"]');
    //Spacing between Radioboxes vertical
    expect(radioBox).toHaveStyle('margin : 0px 0px 0.75rem;');
  });

  test('RadioBoxGroup - vertical orientation with childHeight', () => {
    const { container } = render(
      <RadioBoxGroup
        childWidth={'100%'}
        viewport={'desktop'}
        onChange={() => {}}
        orientation={'vertical'}
        childHeight={'129px'}
        data={[
          {
            id: '32GB',
            text: '32GB',
            type: 'radiobox',
            subtext: 'subtext',
            inputId: 'radioboxOne',
          },
        ]}
      />
    );

    const radioBoxElem = document.querySelector(
      '[class^="RadioBoxLabelWrapper"]'
    );

    expect(radioBoxElem).toHaveStyleRule('min-height', '129px');
  });

  test('RadioBox selected/Active styles', () => {
    const { container } = render(<RadioBox name="32gb" text="32gb" selected />);
    const radioBox = container.querySelector('[class^="RadioBoxLabelWrapper"]');
    // Container Additional border style
    expect(radioBox).toHaveStyleRule('box-shadow', '0 0 0  0.0625rem #000000');
  });

  test('RadioBox selected/Active styles inverted', () => {
    const { container } = render(
      <RadioBox name="32gb" text="32gb" selected surface="dark" />
    );
    const radioBox = container.querySelector('[class^="RadioBoxLabelWrapper"]');
    // Container Additional border style
    expect(radioBox).toHaveStyleRule('box-shadow', '0 0 0  0.0625rem #ffffff');
  });

  test('RadioBox', () => {
    const { container } = render(
      <RadioBox
        name="32gb"
        stacked
        label="32 GB"
        subLabel="black"
        inputId="radioBox"
      />
    );

    const radioBox = document.querySelector('#radioBox');
    fireEvent.click(radioBox);
    expect(radioBox.getAttribute('aria-checked')).toBeTruthy();
    fireEvent.focus(radioBox);
    fireEvent.mouseEnter(radioBox);
    expect(radioBox.getAttribute('aria-checked')).toBeTruthy();
    fireEvent.mouseDown(radioBox);
    fireEvent.mouseUp(radioBox);
    expect(radioBox.getAttribute('aria-checked')).toBe('false');
    fireEvent.keyDown(radioBox, {
      key: 'Enter',
      keyCode: 13,
      charCode: 13,
    });
    expect(radioBox.getAttribute('aria-checked')).toBeTruthy();
    expect(radioBox).toMatchSnapshot();
  });

  test('RadioBox - selected and disabled', () => {
    const { container } = render(
      <RadioBox
        disabled
        name="32gb"
        stacked
        label="32 GB"
        subLabel="black"
        inputId="radioBox"
        outOfStock
      />
    );

    expect(document.querySelector('#radioBox')).toBeDisabled();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('RadioBox - outOfStock', () => {
    const { container } = render(
      <RadioBox
        name="32gb"
        stacked
        label="32 GB"
        subLabel="black"
        inputId="radioBox"
        outOfStock
      />
    );

    const radioBox = document.querySelector('#radioBox');
    expect(radioBox.getAttribute('aria-checked')).toBe('false');
    fireEvent.click(radioBox);
    expect(radioBox.getAttribute('aria-checked')).toBe('false');
    expect(container.firstChild).toMatchSnapshot();
  });

  test('RadioBox with children', () => {
    const { container, getByText } = render(
      <RadioBox name="32gb">
        <div>32 GB</div>
      </RadioBox>
    );

    expect(getByText('32 GB')).not.toBeNull();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('RadioBoxGroup', () => {
    const { container } = render(
      <RadioBoxGroup
        childWidth={'100%'}
        viewport={'desktop'}
        onChange={() => {}}
        data={[
          {
            id: '32GB',
            text: '32GB',
            type: 'radiobox',
            subtext: 'subtext',
            inputId: 'radioboxOne',
          },
          {
            id: '64GB',
            text: '64GB',
            type: 'radiobox',
            subtext: 'subtext',
            inputId: 'radioboxTwo',
          },
        ]}
      />
    );

    const radioBox = document.querySelector('#radioboxOne');
    fireEvent.click(radioBox);
    expect(radioBox.getAttribute('aria-checked')).toBe('true');
    expect(container.child).toMatchSnapshot();
  });
});

describe('RadioBox 1.0', () => {
  test('RadioBox - selected', () => {
    const { container } = render(
      <RadioBox name="hi" selected stacked label="hello world" subLabel="yes" />
    );

    const input = container.querySelector('input');
    expect(input.getAttribute('aria-checked')).toBe('true');
    input.focus();
    input.blur();
    fireEvent.keyDown(input, {
      key: 'Enter',
      keyCode: 13,
      charCode: 13,
    });
    expect(input.getAttribute('aria-checked')).toBe('true');
    expect(container).toMatchSnapshot();
  });

  test('RadioBox - disabled', () => {
    const { container } = render(
      <RadioBox
        disabled
        name="radiobox"
        focusState
        active
        activeState
        selected
        stacked
        label="Disabled state"
        subLabel="test"
      />
    );

    const input = container.querySelector('input');
    expect(input).toBeDisabled();
    expect(container).toMatchSnapshot();
  });

  test('RadioBox - selected and disabledState', () => {
    const { container } = render(
      <RadioBox
        disabledState
        name="radiobox"
        focusState
        active
        activeState
        selected
        stacked
        label="Disabled state"
        subLabel="test"
      />
    );

    const input = container.querySelector('input');
    expect(input.getAttribute('checked')).toBeTruthy;
    expect(container).toMatchSnapshot();
  });

  test('RadioBox - disabled and disabledState', () => {
    const { container } = render(
      <RadioBox
        disabledState
        disabled
        name="radiobox"
        focusState
        active
        activeState
        stacked
        label="Disabled state"
        subLabel="test"
      />
    );

    const input = container.querySelector('input');
    expect(input.getAttribute('checked')).toBe(null);
    expect(container).toMatchSnapshot();
  });

  test('RadioBox - active and activeState', () => {
    const { container } = render(
      <RadioBox
        name="radiobox"
        label="Disabled state"
        subLabel="test"
        activeState
      />
    );

    const input = container.querySelector('input');
    expect(input.getAttribute('checked')).toBe(null);
    fireEvent.keyPress(input, {
      key: 'Enter',
      keyCode: 13,
      charCode: 13,
    });
    fireEvent.mouseDown(input);
    expect(container).toMatchSnapshot();
  });

  test('RadioBox - not out of stock', () => {
    const { container } = render(
      <RadioBox
        name="radiobox"
        stacked
        label="Disabled state"
        subLabel="test"
        outOfStock={false}
        focusState
        focused
        clicked={false}
      />
    );

    const input = container.querySelector('input');
    input.focus();
    expect(container).toMatchSnapshot();
  });

  test('Radiobox - selected and vertical orientation', () => {
    const { container } = render(
      <RadioBox
        name="test"
        selected
        stacked
        label="radio-box"
        subLabel="test"
        orientation="vertical"
        width={300}
      />
    );

    const input = container.querySelector('input');
    input.focus();
    input.blur();
    fireEvent.keyDown(input, {
      key: 'Enter',
      keyCode: 13,
      charCode: 13,
    });

    input.click();
    expect(input.getAttribute('checked')).toBe(null);
    expect(container).toMatchSnapshot();
  });

  test('Radiobox - disabled and vertical orientation', () => {
    const { container } = render(
      <RadioBox
        name="test"
        disabled
        label="radio-box"
        subLabel="test"
        orientation="vertical"
      />
    );

    const input = container.querySelector('input');
    input.focus();
    input.blur();
    fireEvent.keyDown(input, {
      key: 'Enter',
      keyCode: 13,
      charCode: 13,
    });

    expect(input.getAttribute('checked')).toBe(null);
    input.click();
  });

  test('Radiobox - hoverState', () => {
    const { container } = render(
      <RadioBox name="test" hoverState label="radio-box" subLabel="test" />
    );

    const input = container.querySelector('input');
    fireEvent.mouseOver(input);
    expect(container).toMatchSnapshot();
  });

  test('RadioBoxGroup - vertical orientation', () => {
    const { container } = render(
      <RadioBoxGroup
        orientation="vertical"
        data={[
          {
            id: '32GB',
            text: '32GB',
            type: 'radiobox',
            subtext: 'subtext',
            inputId: 'radioboxOne',
          },
          {
            id: '64GB',
            text: '64GB',
            type: 'radiobox',
            subtext: 'subtext',
            inputId: 'radioboxTwo',
          },
          {
            id: '128GB',
            text: '128GB',
            type: 'radiobox',
            subtext: 'subtext',
            inputId: 'radioboxThree',
          },
        ]}
      />
    );

    expect(document.querySelectorAll('input')).toHaveLength(3);
    expect(container).toMatchSnapshot();
  });
});
