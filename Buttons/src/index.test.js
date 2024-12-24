import { render, fireEvent, getByTestId } from '@testing-library/react';
import React from 'react';
import TextLink from './components/TextLink';
import TextLinkCaret from './components/TextLinkCaret';
import { Body } from '../../Typography/src';
import { Button } from '.';
import { ButtonGroup } from '.';
import Icon from '../../Icons/src';

const onClick = jest.fn();

/************************
TextLink
/***********************/

test('<TextLink inline snapshot>', () => {
  const { container } = render(
    <Body color="#000000">
      This is a
      <TextLink
        href="www.verizon.com"
        onClick={onClick}
        type="inline"
        focusState={true}
        size="small"
      >
        Call to action
      </TextLink>
    </Body>
  );

  fireEvent.click(container.firstChild);
  fireEvent.keyPress(container.firstChild, {
    key: 'Enter',
    code: 13,
    charCode: 13,
  });
  fireEvent.keyPress(container.firstChild, {
    key: 'Spacebar',
    code: 33,
    charCode: 33,
  });
  fireEvent.keyPress(container.firstChild, {
    key: 'Space',
    code: 32,
    charCode: 32,
  });
  fireEvent.mouseDown(container.firstChild);

  expect(container.firstChild).toMatchSnapshot();

  const linkTextWrap = container.querySelector('[class^="StyledAnchor"]');

  if (linkTextWrap) {
    expect(linkTextWrap).toHaveStyleRule('font-size', 'inherit');
    expect(linkTextWrap).toHaveStyleRule('line-height', 'inherit');
    expect(linkTextWrap).toHaveStyleRule('font-weight', 'inherit');
    expect(linkTextWrap).toHaveStyleRule(
      'border-bottom',
      '0.0625rem solid #000000'
    );
    expect(linkTextWrap).toHaveStyleRule('cursor', 'pointer');
    expect(linkTextWrap).toHaveStyleRule('font-family', 'inherit');
    expect(linkTextWrap).toHaveStyleRule('color', 'inherit');
    expect(linkTextWrap).toHaveStyleRule('border-color', 'inherit');
  }
});

test('<TextLink large standalone snapshot>', () => {
  const { container } = render(
    <TextLink
      href="www.verizon.com"
      onClick={onClick}
      type="standAlone"
      focusState={false}
      size="large"
      ariaLabel="Text Link Label"
    >
      Call to action
    </TextLink>
  );
  expect(container.firstChild).toMatchSnapshot();
  const StandalonelinkText = container.querySelector('[class^="StyledAnchor"]');

  if (StandalonelinkText) {
    expect(StandalonelinkText).toHaveStyleRule(
      'border-bottom',
      '0.0625rem solid #000000'
    );
    expect(StandalonelinkText).toHaveStyleRule('cursor', 'pointer');
    expect(StandalonelinkText).toHaveStyleRule('color', '#000000');
    expect(StandalonelinkText).toHaveStyleRule('font-weight', '400');
    expect(StandalonelinkText).toHaveStyleRule('font-size', '1rem');
    expect(StandalonelinkText).toHaveStyleRule(
      'font-family',
      'Verizon-NHG-eDS'
    );
    expect(StandalonelinkText).toHaveStyleRule('line-height', '1.25rem');
  }
});

test('<TextLink small standalone snapshot>', () => {
  const { container } = render(
    <TextLink
      href="www.verizon.com"
      onClick={onClick}
      type="standAlone"
      focusState={false}
      size="small"
      ariaLabel="Text Link Label"
      tabIndex={-1}
    >
      Call to action
    </TextLink>
  );
  expect(container.firstChild).toMatchSnapshot();

  expect(container.firstChild).toMatchSnapshot();
  const StandalonelinkText = container.querySelector('[class^="StyledAnchor"]');

  if (StandalonelinkText) {
    expect(StandalonelinkText).toHaveStyleRule(
      'border-bottom',
      '0.0625rem solid #000000'
    );
    expect(StandalonelinkText).toHaveStyleRule('cursor', 'pointer');
    expect(StandalonelinkText).toHaveStyleRule('color', '#000000');
    expect(StandalonelinkText).toHaveStyleRule('font-weight', '400');
    expect(StandalonelinkText).toHaveStyleRule('font-size', '0.75rem');
    expect(StandalonelinkText).toHaveStyleRule(
      'font-family',
      'Verizon-NHG-eTX'
    );
    expect(StandalonelinkText).toHaveStyleRule('line-height', '1rem');
  }
});

test('<TextLink with Icon snapshot>', () => {
  const { container } = render(
    <TextLink
      href="www.verizon.com"
      onClick={onClick}
      type="standAlone"
      focusState={false}
      size="large"
    >
      <Icon />
    </TextLink>
  );
  expect(container.firstChild).toMatchSnapshot();
});

test('<TextLink disabled snapshot>', () => {
  const { container } = render(
    <TextLink
      href="www.verizon.com"
      onClick={onClick}
      disabled={true}
      surface="dark"
      type="standAlone"
      focusState={false}
      size="large"
      ariaLabel="Text Link Label"
      bold={true}
    >
      Call to action
    </TextLink>
  );
  expect(container.firstChild).toMatchSnapshot();

  const StandalonelinkText = container.querySelector('[class^="StyledAnchor"]');

  if (StandalonelinkText) {
    expect(StandalonelinkText).toHaveStyleRule(
      'border-bottom',
      '0.0625rem solid #333333'
    );
    expect(StandalonelinkText).toHaveStyleRule('cursor', 'pointer');
    expect(StandalonelinkText).toHaveStyleRule('color', '#333333');
  }
});

test('<VDS TextLink snapshot>', () => {
  const { container } = render(
    <TextLink
      href="www.verizon.com"
      onClick={onClick}
      type="standAlone"
      focusState={true}
      hitArea={true}
      activeState={false}
      size="large"
    >
      Call to action
    </TextLink>
  );
  expect(container.firstChild).toMatchSnapshot();
});

test('<VDS TextLink snapshot>', () => {
  const { container } = render(
    <TextLink
      href="www.verizon.com"
      onClick={onClick}
      type="standAlone"
      focusState={true}
      hitArea={true}
      activeState={true}
      size="large"
    >
      Call to action
    </TextLink>
  );
  expect(container.firstChild).toMatchSnapshot();
});

test('<VDS TextLink Inverted snapshot>', () => {
  const { container } = render(
    <TextLink
      href="www.verizon.com"
      onClick={onClick}
      type="standAlone"
      focusState={true}
      hitArea={true}
      activeState={true}
      size="large"
      surface="dark"
    >
      Call to action
    </TextLink>
  );
  expect(container.firstChild).toMatchSnapshot();
  const StandalonelinkText = container.querySelector('[class^="StyledAnchor"]');

  if (StandalonelinkText) {
    expect(StandalonelinkText).toHaveStyleRule(
      'border-bottom',
      '0.0625rem solid #ffffff'
    );
    expect(StandalonelinkText).toHaveStyleRule('cursor', 'pointer');
    expect(StandalonelinkText).toHaveStyleRule('color', '#ffffff');
    expect(StandalonelinkText).toHaveStyleRule('font-weight', '400');
    expect(StandalonelinkText).toHaveStyleRule('font-size', '1rem');
    expect(StandalonelinkText).toHaveStyleRule(
      'font-family',
      'Verizon-NHG-eDS'
    );
    expect(StandalonelinkText).toHaveStyleRule('line-height', '1.25rem');
  }
});

test('<VDS TextLink Inverted snapshot>', () => {
  const { container } = render(
    <TextLink
      href="www.verizon.com"
      onClick={onClick}
      type="standAlone"
      focusState={true}
      hitArea={true}
      activeState={true}
      size="large"
      surface="dark"
    >
      Call to action
    </TextLink>
  );
  expect(container.firstChild).toMatchSnapshot();
});

test('<VDS TextLink Inverted blue color snapshot>', () => {
  const { container } = render(
    <TextLink
      href="www.verizon.com"
      onClick={onClick}
      type="standAlone"
      focusState={true}
      hitArea={true}
      activeState={true}
      size="large"
      color="#0088ce"
      surface="dark"
    >
      Call to action
    </TextLink>
  );
  expect(container.firstChild).toMatchSnapshot();
});

test('<VDS TextLink Inverted #ffffff color snapshot>', () => {
  const { container } = render(
    <TextLink
      href="www.verizon.com"
      onClick={onClick}
      type="inline"
      focusState={true}
      hitArea={true}
      activeState={true}
      size="large"
      color="#0088ce"
      surface="dark"
    >
      Call to action
    </TextLink>
  );
  expect(container.firstChild).toMatchSnapshot();
});
/************************
Button / Primary / Secondary
/***********************/

test('<ButtonSecondarysmall> snapshot', () => {
  const { container } = render(
    <Button use="secondary" size="small" width="100%" onClick={onClick}>
      Click Me!
    </Button>
  );

  expect(container.firstChild).toMatchSnapshot();

  expect(container.firstChild).toMatchSnapshot();
  const StyledButton = container.querySelector('[class^="StyledButton"]');

  if (StyledButton) {
    expect(StyledButton).toHaveStyleRule('border-radius', '2rem');
    expect(StyledButton).toHaveStyleRule('border-width', '0.0625rem');
    expect(StyledButton).toHaveStyleRule('cursor', 'pointer');
    expect(StyledButton).toHaveStyleRule('font-weight', '700');
    expect(StyledButton).toHaveStyleRule('font-size', '0.75rem');
    expect(StyledButton).toHaveStyleRule('font-family', 'Verizon-NHG-eTX');
    expect(StyledButton).toHaveStyleRule('line-height', '1rem');
    expect(StyledButton).toHaveStyleRule('background-color', 'transparent');
    expect(StyledButton).toHaveStyleRule('border', '0.0625rem solid #000000');
    expect(StyledButton).toHaveStyleRule('color', '#000000');
  }
});
test('<ButtonSecondary> snapshot', () => {
  const { container } = render(
    <Button use="secondary" size="small" onClick={onClick}>
      Click Me!
    </Button>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('<Button use="secondary"> snapshot', () => {
  const { container } = render(
    <Button use="secondary" onClick={onClick}>
      Click Me!
    </Button>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('<ButtonPrimary> snapshot', () => {
  const { container } = render(
    <>
      <Button size="small" width={55} onClick={onClick}>
        Click Me!
      </Button>
    </>
  );

  const StyledButton = container.querySelector('[class^="StyledButton"]');
  fireEvent.keyDown(StyledButton, {
    key: 'Tab',
    keyCode: 9,
    charCode: 9,
  });
  const focusRingStyleBefore = window.getComputedStyle(
    StyledButton,
    '::before'
  );
  const styleValue = focusRingStyleBefore.border;
  expect(styleValue).toBe('0.0625rem solid #000000');
  expect(container.firstChild).toMatchSnapshot();
});

test('<Button size="small"> snapshot', () => {
  const { container } = render(
    <Button size="small" onClick={onClick}>
      Click Me!
    </Button>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('<Button size="large"> snapshot', () => {
  const { container } = render(
    <Button size="large" onClick={onClick} width="autoTight">
      Click Me!
    </Button>
  );

  expect(container.firstChild).toMatchSnapshot();
  const StyledButton = container.querySelector('[class^="StyledButton"]');

  if (StyledButton) {
    expect(StyledButton).toHaveStyleRule('border-radius', '2.75rem');
    expect(StyledButton).toHaveStyleRule('border-width', '0.0625rem');
    expect(StyledButton).toHaveStyleRule('cursor', 'pointer');
    expect(StyledButton).toHaveStyleRule('font-weight', '700');
    expect(StyledButton).toHaveStyleRule('font-size', '1rem');
    expect(StyledButton).toHaveStyleRule('font-family', 'Verizon-NHG-eDS');
    expect(StyledButton).toHaveStyleRule('line-height', '1.25rem');
    expect(StyledButton).toHaveStyleRule('background-color', '#000000');
    expect(StyledButton).toHaveStyleRule('border', '0.0625rem solid #000000');
    expect(StyledButton).toHaveStyleRule('color', '#ffffff');
    expect(StyledButton).toHaveStyleRule('min-width', '4.75rem');
  }
  expect(container.firstChild).toMatchSnapshot();
});

test('<Button disabled> snapshot', () => {
  const { container } = render(
    <Button onClick={onClick} disabled size="large">
      Click Me!
    </Button>
  );

  const StyledButton = container.querySelector('[class^="StyledButton"]');

  if (StyledButton) {
    expect(StyledButton).toHaveStyleRule('border-radius', '2.75rem');
    expect(StyledButton).toHaveStyleRule('border-width', '0.0625rem');
    expect(StyledButton).toHaveStyleRule('cursor', 'default');
    expect(StyledButton).toHaveStyleRule('font-weight', '700');
    expect(StyledButton).toHaveStyleRule('font-size', '1rem');
    expect(StyledButton).toHaveStyleRule('font-family', 'Verizon-NHG-eDS');
    expect(StyledButton).toHaveStyleRule('line-height', '1.25rem');
    expect(StyledButton).toHaveStyleRule('background-color', '#d8dada');
    expect(StyledButton).toHaveStyleRule('border', '0.0625rem solid #000000');
    expect(StyledButton).toHaveStyleRule('color', '#ffffff');
    expect(StyledButton).toHaveStyleRule('min-width', '4.75rem');
  }

  expect(container.firstChild).toMatchSnapshot();
});
test('<Button width> snapshot', () => {
  const { container } = render(
    <Button onClick={onClick} size="small" width="autoTight">
      Click Me!
    </Button>
  );
  expect(container.firstChild).toMatchSnapshot();
});

test('<Button primary disabled inverted> snapshot', () => {
  const { container } = render(
    <Button onClick={onClick} disabled surface="dark" size="small">
      Click Me!
    </Button>
  );
  const StyledButton = container.querySelector('[class^="StyledButton"]');

  if (StyledButton) {
    expect(StyledButton).toHaveStyleRule('border-radius', '2rem');
    expect(StyledButton).toHaveStyleRule('border-width', '0.0625rem');
    expect(StyledButton).toHaveStyleRule('cursor', 'default');
    expect(StyledButton).toHaveStyleRule('font-weight', '700');
    expect(StyledButton).toHaveStyleRule('font-size', '0.75rem');
    expect(StyledButton).toHaveStyleRule('font-family', 'Verizon-NHG-eTX');
    expect(StyledButton).toHaveStyleRule('line-height', '1rem');
    expect(StyledButton).toHaveStyleRule('background-color', '#333333');
    expect(StyledButton).toHaveStyleRule('border', '0.0625rem solid #000000');
    expect(StyledButton).toHaveStyleRule('color', '#000000');
  }
  expect(container.firstChild).toMatchSnapshot();
});

test('<Button secondary disabled inverted> snapshot', () => {
  const { container } = render(
    <Button
      use="secondary"
      onClick={onClick}
      disabled
      surface="dark"
      size="small"
    >
      Click Me!
    </Button>
  );

  const StyledButton = container.querySelector('[class^="StyledButton"]');

  if (StyledButton) {
    expect(StyledButton).toHaveStyleRule('border-radius', '2rem');
    expect(StyledButton).toHaveStyleRule('border-width', '0.0625rem');
    expect(StyledButton).toHaveStyleRule('cursor', 'default');
    expect(StyledButton).toHaveStyleRule('font-weight', '700');
    expect(StyledButton).toHaveStyleRule('font-size', '0.75rem');
    expect(StyledButton).toHaveStyleRule('font-family', 'Verizon-NHG-eTX');
    expect(StyledButton).toHaveStyleRule('line-height', '1rem');
    expect(StyledButton).toHaveStyleRule('background-color', 'transparent');
    expect(StyledButton).toHaveStyleRule('border', '0.0625rem solid #000000');
    expect(StyledButton).toHaveStyleRule('color', '#333333');
  }

  expect(container.firstChild).toMatchSnapshot();
});

test('<Button primary inverted> snapshot', () => {
  const { container } = render(
    <Button onClick={onClick} surface="dark">
      Click Me!
    </Button>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('<Button secondary inverted> snapshot', () => {
  const { container } = render(
    <Button use="secondary" onClick={onClick} surface="dark">
      Click Me!
    </Button>
  );

  expect(container.firstChild).toMatchSnapshot();
});
test('<Button block> snapshot', () => {
  const { container } = render(
    <Button onClick={onClick} size="small">
      Click Me!
    </Button>
  );
});

test('<Button> snapshot', () => {
  const { container } = render(
    <Button onClick={onClick} size="large">
      Click Me!
    </Button>
  );
  expect(container.firstChild).toMatchSnapshot();
});

test('<Button href> snapshot', () => {
  const { container } = render(
    <Button href="www.verizon.com" typescale="VDS" size="large" width="200px">
      Click Me!
    </Button>
  );
  expect(container.firstChild).toMatchSnapshot();
});

test('<Button small href> snapshot', () => {
  const { container } = render(
    <Button href="www.verizon.com" typescale="VDS" size="small" width="200px">
      Click Me!
    </Button>
  );
  expect(container.firstChild).toMatchSnapshot();
});

/************************
ButtonGroup
/***********************/

test('<ButtonGroup> snapshot', () => {
  const { container } = render(
    <ButtonGroup
      childWidth={'100%'}
      width={'100%'}
      viewport={'desktop'}
      onClick={onClick}
      data={[
        {
          children: 'Submit',
          size: 'small',
          use: 'primary',
          onClick: onClick,
        },
        {
          children: 'Cancel',
          size: 'small',
          use: 'secondary',
          onClick: onClick,
        },
      ]}
    />
  );
  /* fireEvent.click(container.firstChild.firstChild.firstChild, {
    detail: 0,
    type: 'click',
  });
  fireEvent.click(container.firstChild.firstChild.firstChild, {
    detail: 1,
    type: 'click',
  });
  fireEvent.click(container.firstChild.firstChild.firstChild, {
    detail: 0,
    type: 'doubleclick',
  }); */

  expect(container.firstChild).toMatchSnapshot();
});

// childWidth prop in px
test('<ButtonGroup> snapshot', () => {
  const { getByText, container } = render(
    <ButtonGroup
      childWidth={'300px'}
      viewport={'desktop'}
      rowQuantity={{ desktop: 2 }}
      data={[
        {
          children: 'Submit',
          size: 'large',
          use: 'primary',
          onClick: onClick,
        },
        {
          children: 'Cancel',
          use: 'secondary',
          size: 'large',
          onClick: onClick,
        },
      ]}
    />
  );
  const submitButton = getByText('Submit');
  fireEvent.click(submitButton);
  const cancelButton = getByText('Cancel');
  fireEvent.click(cancelButton);

  expect(container.firstChild).toMatchSnapshot();

  const buttonGroupstyle = container.querySelector('[class^="ButtonWrapper"]');

  if (buttonGroupstyle) {
    expect(buttonGroupstyle).toHaveStyleRule('padding-right', '0.75rem');
  }
});

// childWidth prop width auto value
test('<ButtonGroup> Buttons width auto', () => {
  const { container } = render(
    <ButtonGroup
      childWidth={'auto'}
      viewport={'desktop'}
      onClick={onClick}
      data={[
        {
          children: 'Submit',
          size: 'large',
          use: 'primary',
          onClick: onClick,
        },
        {
          children: 'Cancel',
          use: 'textLink',
          size: 'small',
          onClick: onClick,
        },
      ]}
    />
  );

  expect(container.firstChild).toMatchSnapshot();

  const buttonGroupstyle = container.querySelector('[class^="ButtonWrapper"]');

  if (buttonGroupstyle) {
    expect(buttonGroupstyle).toHaveStyleRule('padding-right', '1rem');
  }
});

// ButtonGroup textlink and textlink
test('<ButtonGroup> textlink and textlink snapshot', () => {
  const { container } = render(
    <ButtonGroup
      width={'300px'}
      viewport={'desktop'}
      rowQuantity={{ desktop: 1 }}
      onClick={onClick}
      data={[
        {
          children: 'Submit',
          size: 'large',
          type: 'textLink',
          onClick: onClick,
        },
        {
          children: 'Cancel',
          type: 'textLink',
          size: 'small',
          onClick: onClick,
        },
      ]}
    />
  );

  expect(container.firstChild).toMatchSnapshot();
  const buttonGroupstyle = container.querySelector('[class^="ButtonWrapper"]');

  if (buttonGroupstyle) {
    expect(buttonGroupstyle).toHaveStyleRule('padding-right', '0');
  }
});

test('<ButtonGroup> textlink and textlinkcaret snapshot', () => {
  const { container } = render(
    <ButtonGroup
      width={'300px'}
      viewport={'desktop'}
      rowQuantity={{ desktop: 1 }}
      onClick={onClick}
      data={[
        {
          children: 'Submit',
          size: 'large',
          onClick: onClick,
        },
        {
          children: 'Cancel',
          type: 'textLinkCaret',
          size: 'small',
          onClick: onClick,
        },
      ]}
    />
  );

  expect(container.firstChild).toMatchSnapshot();

  const buttonGroupstyle = container.querySelector('[class^="ButtonWrapper"]');

  if (buttonGroupstyle) {
    expect(buttonGroupstyle).toHaveStyleRule('padding-right', '0');
  }
});

test('<VDS ButtonGroup> snapshot', () => {
  const { container } = render(
    <ButtonGroup
      childWidth={'100px'}
      viewport={'desktop'}
      rowQuantity={{ desktop: 2 }}
      maxWidth="596px"
      smallButtonSpacing="4X"
      data={[
        {
          children: 'Submit',
          size: 'small',
          use: 'primary',
          width: '100px',
          onClick: onClick,
        },
        {
          children: 'Cancel',
          size: 'small',
          use: 'secondary',
          width: '100px',
          onClick: onClick,
        },
      ]}
    />
  );
  expect(container.firstChild).toMatchSnapshot();
});

test('<VDS ButtonGroup> snapshot', () => {
  const { container } = render(
    <ButtonGroup
      childWidth={'100%'}
      viewport={'desktop'}
      rowQuantity={{ desktop: 2 }}
      smallButtonSpacing="4X"
      data={[
        {
          children: 'Submit',
          size: 'large',
          use: 'primary',
          width: '100%',
          onClick: onClick,
        },
        {
          children: 'Cancel',
          size: 'large',
          use: 'secondary',
          width: '100%',
          onClick: onClick,
        },
      ]}
    />
  );
  expect(container.firstChild).toMatchSnapshot();
});
test('<VDS ButtonGroup> snapshot', () => {
  const { container } = render(
    <ButtonGroup
      childWidth={'100%'}
      viewport={'desktop'}
      rowQuantity={{ desktop: 2 }}
      smallButtonSpacing="4X"
      data={[
        {
          children: 'Submit',
          size: 'small',
          width: '100%',
          use: 'primary',
          onClick: onClick,
        },
        {
          children: 'Cancel',
          size: 'small',
          width: '100%',
          use: 'secondary',
          onClick: onClick,
        },
      ]}
    />
  );
  expect(container.firstChild).toMatchSnapshot();
});

test('<ButtonGroup> bottom spacing with single button snapshot', () => {
  const { container } = render(
    <ButtonGroup
      viewport={'desktop'}
      rowQuantity={{ desktop: 1 }}
      onClick={onClick}
      data={[
        {
          children: 'Submit',
          size: 'large',
          type: 'textLink',
          onClick: onClick,
        },
      ]}
    />
  );

  expect(container.firstChild).toMatchSnapshot();
  const buttonGroupstyle = container.querySelector('[class^="ButtonGroupRow"]');

  if (buttonGroupstyle) {
    expect(buttonGroupstyle).toHaveStyleRule('padding-bottom', '0');
  }
});
/************************
TextLinkCaret
/***********************/

test('<TextLinkCaret snapshot>', () => {
  const { container } = render(
    <TextLinkCaret onClick={onClick}>Call to action</TextLinkCaret>
  );
  fireEvent.click(container.firstChild);
  fireEvent.keyPress(container.firstChild, {
    key: 'Enter',
    code: 13,
    charCode: 13,
  });
  fireEvent.keyPress(container.firstChild, {
    key: 'Spacebar',
    code: 33,
    charCode: 33,
  });
  fireEvent.keyPress(container.firstChild, {
    key: 'Space',
    code: 32,
    charCode: 32,
  });
  expect(container.firstChild).toMatchSnapshot();

  const textLinkCaret = container.querySelector('[class^="StyledAnchor"]');

  if (textLinkCaret) {
    expect(textLinkCaret).toHaveStyleRule('cursor', 'pointer');
    expect(textLinkCaret).toHaveStyleRule('color', '#000000');
    expect(textLinkCaret).toHaveStyleRule('font-weight', '700');
    expect(textLinkCaret).toHaveStyleRule('font-size', '16px');
    expect(textLinkCaret).toHaveStyleRule('font-family', 'Verizon-NHG-eDS');
    expect(textLinkCaret).toHaveStyleRule('line-height', '20px');
    expect(textLinkCaret).toHaveStyleRule('letter-spacing', '0.03125rem');
  }

  const caretIconStyle = container.querySelector('[class^="IconSVGWrapper"]');
  const pathValue = container.querySelector('svg path').getAttribute('d');
  expect(caretIconStyle).toHaveStyleRule('height', '0.75rem');
  expect(caretIconStyle).toHaveStyleRule('width', '0.75rem');
  expect(pathValue).toBe(
    'M7.6,20.7L5,18.1l7.3-7.3L5,3.5l2.5-2.5l9.9,9.9L7.6,20.7z'
  );
});

test('<TextLinkCaret inverse> snapshot', () => {
  const { container } = render(
    <TextLinkCaret surface="dark" onClick={onClick}>
      Call to action
    </TextLinkCaret>
  );
  const textLinkCaret = container.querySelector('[class^="StyledAnchor"]');

  if (textLinkCaret) {
    expect(textLinkCaret).toHaveStyleRule('cursor', 'pointer');
    expect(textLinkCaret).toHaveStyleRule('color', '#ffffff');
    expect(textLinkCaret).toHaveStyleRule('font-weight', '700');
    expect(textLinkCaret).toHaveStyleRule('font-size', '16px');
    expect(textLinkCaret).toHaveStyleRule('font-family', 'Verizon-NHG-eDS');
    expect(textLinkCaret).toHaveStyleRule('line-height', '20px');
    expect(textLinkCaret).toHaveStyleRule('letter-spacing', '0.03125rem');
  }
  expect(container.firstChild).toMatchSnapshot();
});

test('<TextLinkCaret inverse/disabled> snapshot', () => {
  const { container } = render(
    <TextLinkCaret
      surface="dark"
      disabled
      onClick={onClick}
      ariaLabel="Call to Action"
    >
      Call to action
    </TextLinkCaret>
  );

  const textLinkCaret = container.querySelector('[class^="StyledAnchor"]');

  if (textLinkCaret) {
    expect(textLinkCaret).toHaveStyleRule('cursor', 'not-allowed');
    expect(textLinkCaret).toHaveStyleRule('color', '#333333');
    expect(textLinkCaret).toHaveStyleRule('font-weight', '700');
    expect(textLinkCaret).toHaveStyleRule('font-size', '16px');
    expect(textLinkCaret).toHaveStyleRule('font-family', 'Verizon-NHG-eDS');
    expect(textLinkCaret).toHaveStyleRule('line-height', '20px');
    expect(textLinkCaret).toHaveStyleRule('letter-spacing', '0.03125rem');
  }
  expect(container.firstChild).toMatchSnapshot();
});

test('<TextLinkCaret disabled> snapshot', () => {
  const { container } = render(
    <TextLinkCaret disabled onClick={onClick}>
      Call to action
    </TextLinkCaret>
  );

  fireEvent.click(container.firstChild);
  fireEvent.keyPress(container.firstChild, {
    key: 'Enter',
    code: 13,
    charCode: 13,
  });

  expect(container.firstChild).toMatchSnapshot();

  const textLinkCaret = container.querySelector('[class^="StyledAnchor"]');

  if (textLinkCaret) {
    expect(textLinkCaret).toHaveStyleRule('cursor', 'not-allowed');
    expect(textLinkCaret).toHaveStyleRule('color', '#d8dada');
    expect(textLinkCaret).toHaveStyleRule('font-weight', '700');
    expect(textLinkCaret).toHaveStyleRule('font-size', '16px');
    expect(textLinkCaret).toHaveStyleRule('font-family', 'Verizon-NHG-eDS');
    expect(textLinkCaret).toHaveStyleRule('line-height', '20px');
    expect(textLinkCaret).toHaveStyleRule('letter-spacing', '0.03125rem');
  }
});

test('<TextLinkCaret typescale> snapshot', () => {
  const { container } = render(
    <TextLinkCaret typescale="VDS" onClick={onClick} size="small">
      Call to action
    </TextLinkCaret>
  );
  expect(container.firstChild).toMatchSnapshot();
});

test('<TextLinkCaret typescale large> snapshot', () => {
  const { container } = render(
    <TextLinkCaret typescale="VDS" onClick={onClick} size="large">
      Call to action
    </TextLinkCaret>
  );
  expect(container.firstChild).toMatchSnapshot();
});

test('<TextLinkCaret iconPosition> snapshot', () => {
  const { container } = render(
    <TextLinkCaret iconPosition="right" onClick={onClick}>
      Call to action
    </TextLinkCaret>
  );
  expect(container.firstChild).toMatchSnapshot();
});

test('<TextLinkCaret> snapshot', () => {
  const { container } = render(
    <TextLinkCaret iconPosition="left" onClick={onClick}>
      Call to Action
      <img alt="textlink text" />
    </TextLinkCaret>
  );
  expect(container.firstChild).toMatchSnapshot();
});
test('<TextLinkCaret iconPosition> snapshot', () => {
  const { container } = render(
    <TextLinkCaret
      iconPosition="left"
      hoverState={true}
      padding="2X"
      useIcon={true}
      typescale="VDS"
      onClick={onClick}
    >
      Call to action
    </TextLinkCaret>
  );
  expect(container.firstChild).toMatchSnapshot();
});

test('<TextLinkCaret iconPosition> snapshot', () => {
  const { container } = render(
    <TextLinkCaret
      iconPosition="right"
      padding="1X"
      useIcon={true}
      onClick={onClick}
    >
      Call to action
    </TextLinkCaret>
  );
  expect(container.firstChild).toMatchSnapshot();
});
test('<TextLinkCaret without text> snapshot', () => {
  const { container } = render(<TextLinkCaret onClick={onClick} />);
  expect(container.firstChild).toMatchSnapshot();
});

test('VDS Button', () => {
  const { container } = render(
    <Button
      hitArea
      hoverState
      focusState
      activeState
      overflowEllipsis
      calculateFontWeight={700}
      smallButtonPadding={false}
    >
      test
    </Button>
  );
  expect(container.firstChild).toMatchSnapshot();
});

// test('VDS ButtonGroup', () => {
//   const { container } = render(
//     <ButtonGroup
//       renderButton='primary'
//       maxWidth="596px"
//       smallButtonSpacing="4X"
//     />
//   );
// });

test('<VDS TextLinkCaret', () => {
  const { container } = render(
    <TextLinkCaret
      useIcon
      calculateFontWeight={700}
      hitArea
      hoverState
      focusState
      activeState
    >
      Call to action
    </TextLinkCaret>
  );
  expect(container.firstChild).toMatchSnapshot();
});

test('<VDS TextLink', () => {
  const { container } = render(
    <TextLink focusState hitArea>
      Call to action
    </TextLink>
  );
  expect(container.firstChild).toMatchSnapshot();
});
