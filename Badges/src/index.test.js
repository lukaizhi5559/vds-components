import { render } from '@testing-library/react';
import React from 'react';
import Badge from './components/Badge';
import BadgeIndicator from './components/BadgeIndicator';
import { calculateRem } from '@vds-core/utilities';
import { ColorTokens } from '@vds-tokens/color';
import { TypographyTokens } from '@vds-tokens/typography';
import { LayoutTokens } from '@vds-tokens/layout';

describe('Renders Badge correctly', () => {
  test('should render Badge', () => {
    const { container } = render(<Badge />);
    expect(container).toMatchSnapshot();
  });
  test('should render Badge with fill color yellow', () => {
    const { container } = render(<Badge fillColor={'yellow'} />);
    expect(container).toMatchSnapshot();
  });
  test('should render Badge with surface as dark', () => {
    const { container } = render(<Badge surface={'dark'} />);
    expect(container).toMatchSnapshot();
  });
  test('should render Badge with surface as dark and fill color', () => {
    const { container } = render(
      <Badge surface={'dark'} fillColor={'yellow'} />
    );
    expect(container).toMatchSnapshot();
  });
  test('should render Badge with fillcolor as green', () => {
    const { container } = render(<Badge fillColor={'green'} />);
    expect(container).toMatchSnapshot();
  });
  test('should render Badge with maxWidth', () => {
    const { container } = render(<Badge maxWidth={'50px'} />);
    expect(container).toMatchSnapshot();
  });
});

describe('Renders Badge indicator correctly', () => {
  test('should render Badge indicator - kind simple', () => {
    const { container } = render(<BadgeIndicator />);
    const BadgeIndicatorContainer = container.querySelector(
      'div[class^="StyledBadgeIndicator"]'
    );
    expect(BadgeIndicatorContainer).toHaveStyleRule('height', calculateRem(16));
    expect(BadgeIndicatorContainer).toHaveStyleRule(
      'min-width',
      calculateRem(16)
    );
    expect(BadgeIndicatorContainer).toHaveStyleRule(
      'border-radius',
      calculateRem(16)
    );
    expect(BadgeIndicatorContainer).toHaveStyleRule(
      'background-color',
      ColorTokens.background.brandhighlight.value
    );
    expect(BadgeIndicatorContainer).toHaveStyleRule(
      'box-shadow',
      `0 0 0 ${calculateRem('1')} ${ColorTokens.palette.white.value}`
    );
    // default dotsize
    const BadgeIndicatorDotSTyle = container.querySelector(
      'div[class^="StyledDot"]'
    );
    expect(BadgeIndicatorDotSTyle).toHaveStyleRule('height', calculateRem('4'));
    expect(BadgeIndicatorDotSTyle).toHaveStyleRule('width', calculateRem('4'));

    expect(container).toMatchSnapshot();
  });

  test('should render Badge indicator - kind simple with surface as dark', () => {
    const { container } = render(<BadgeIndicator surface="dark" />);
    const BadgeIndicatorContainer = container.querySelector(
      'div[class^="StyledBadgeIndicator"]'
    );
    expect(BadgeIndicatorContainer).toHaveStyleRule(
      'box-shadow',
      `0 0 0 ${calculateRem('1')} ${ColorTokens.palette.black.value}`
    );
    expect(container).toMatchSnapshot();
  });

  test('should render Badge indicator - kind numbered', () => {
    const { container, getByTestId } = render(
      <BadgeIndicator kind={'numbered'}>99</BadgeIndicator>
    );
    const BadgeIndicatorContainer = container.querySelector(
      'div[class^="StyledBadgeIndicator"]'
    );
    expect(BadgeIndicatorContainer).toHaveStyleRule(
      'height',
      calculateRem('16')
    );
    expect(BadgeIndicatorContainer).toHaveStyleRule(
      'min-width',
      calculateRem('16')
    );
    expect(BadgeIndicatorContainer).toHaveStyleRule(
      'border-radius',
      calculateRem('16')
    );
    expect(BadgeIndicatorContainer).toHaveStyleRule(
      'background-color',
      ColorTokens.background.brandhighlight.value
    );
    expect(BadgeIndicatorContainer).toHaveStyleRule(
      'box-shadow',
      `0 0 0 ${calculateRem('1')} ${ColorTokens.palette.white.value}`
    );
    const numberedEle = getByTestId('numberedDiv');
    expect(numberedEle.innerHTML).toBe('99');
    expect(container).toMatchSnapshot();
  });

  test('should render Badge indicator - kind numbered with surface as dark', () => {
    const { container, getByTestId } = render(
      <BadgeIndicator kind={'numbered'} surface="dark">
        99
      </BadgeIndicator>
    );
    const BadgeIndicatorContainer = container.querySelector(
      'div[class^="StyledBadgeIndicator"]'
    );
    expect(BadgeIndicatorContainer).toHaveStyleRule(
      'box-shadow',
      `0 0 0 ${calculateRem('1')} ${ColorTokens.palette.black.value}`
    );
    expect(container).toMatchSnapshot();
  });

  test('should render Badge indicator - kind numbered + if number is not passed as children', () => {
    const { container, getByTestId } = render(
      <BadgeIndicator kind={'numbered'} />
    );
    const numberedEle = getByTestId('numberedDiv');
    expect(numberedEle.innerHTML).toBe('0');
    expect(container).toMatchSnapshot();
    expect(container).toMatchSnapshot();
  });

  test('should render Badge indicator - kind numbered with fillColor as Yellow', () => {
    const { container } = render(
      <BadgeIndicator kind={'numbered'} fillColor="yellow">
        99
      </BadgeIndicator>
    );
    const BadgeIndicatorContainer = container.querySelector(
      'div[class^="StyledBadgeIndicator"]'
    );
    const BadgeIndicatorNumber = container.querySelector(
      'div[class^="StyledNumber"]'
    );
    expect(BadgeIndicatorContainer).toHaveStyleRule(
      'background-color',
      ColorTokens.palette.yellow53.value
    );
    expect(BadgeIndicatorNumber).toHaveStyleRule(
      'color',
      ColorTokens.elements.primary.onlight.value
    );
    expect(container).toMatchSnapshot();
  });

  test('should render Badge indicator - kind numbered with fillColor as Green', () => {
    const { container } = render(
      <BadgeIndicator kind={'numbered'} fillColor="green">
        99
      </BadgeIndicator>
    );
    const BadgeIndicatorContainer = container.querySelector(
      'div[class^="StyledBadgeIndicator"]'
    );
    const BadgeIndicatorNumber = container.querySelector(
      'div[class^="StyledNumber"]'
    );
    expect(BadgeIndicatorContainer).toHaveStyleRule(
      'background-color',
      ColorTokens.palette.green26.value
    );
    expect(BadgeIndicatorNumber).toHaveStyleRule(
      'color',
      ColorTokens.elements.primary.ondark.value
    );
    expect(container).toMatchSnapshot();
  });

  test('should render Badge indicator - kind numbered with fillColor as Orange', () => {
    const { container } = render(
      <BadgeIndicator kind={'numbered'} fillColor="orange">
        99
      </BadgeIndicator>
    );
    const BadgeIndicatorContainer = container.querySelector(
      'div[class^="StyledBadgeIndicator"]'
    );
    const BadgeIndicatorNumber = container.querySelector(
      'div[class^="StyledNumber"]'
    );
    expect(BadgeIndicatorContainer).toHaveStyleRule(
      'background-color',
      ColorTokens.palette.orange41.value
    );
    expect(BadgeIndicatorNumber).toHaveStyleRule(
      'color',
      ColorTokens.elements.primary.ondark.value
    );
    expect(container).toMatchSnapshot();
  });

  test('should render Badge indicator - kind numbered with fillColor as Blue', () => {
    const { container } = render(
      <BadgeIndicator kind={'numbered'} fillColor="blue">
        99
      </BadgeIndicator>
    );
    const BadgeIndicatorContainer = container.querySelector(
      'div[class^="StyledBadgeIndicator"]'
    );
    const BadgeIndicatorNumber = container.querySelector(
      'div[class^="StyledNumber"]'
    );
    expect(BadgeIndicatorContainer).toHaveStyleRule(
      'background-color',
      ColorTokens.palette.blue38.value
    );
    expect(BadgeIndicatorNumber).toHaveStyleRule(
      'color',
      ColorTokens.elements.primary.ondark.value
    );
    expect(container).toMatchSnapshot();
  });

  test('should render Badge indicator - kind numbered with fillColor as Gray', () => {
    const { container } = render(
      <BadgeIndicator kind={'numbered'} fillColor="grayHighContrast">
        99
      </BadgeIndicator>
    );
    const BadgeIndicatorContainer = container.querySelector(
      'div[class^="StyledBadgeIndicator"]'
    );
    const BadgeIndicatorNumber = container.querySelector(
      'div[class^="StyledNumber"]'
    );
    expect(BadgeIndicatorContainer).toHaveStyleRule(
      'background-color',
      ColorTokens.palette.gray44.value
    );
    expect(BadgeIndicatorNumber).toHaveStyleRule(
      'color',
      ColorTokens.elements.primary.ondark.value
    );
    expect(container).toMatchSnapshot();
  });

  test('should render Badge indicator - kind numbered with fillColor as Gray Low Contrast', () => {
    const { container } = render(
      <BadgeIndicator kind={'numbered'} fillColor="grayLowContrast">
        99
      </BadgeIndicator>
    );
    const BadgeIndicatorContainer = container.querySelector(
      'div[class^="StyledBadgeIndicator"]'
    );
    const BadgeIndicatorNumber = container.querySelector(
      'div[class^="StyledNumber"]'
    );
    expect(BadgeIndicatorContainer).toHaveStyleRule(
      'background-color',
      ColorTokens.palette.gray85.value
    );
    expect(BadgeIndicatorNumber).toHaveStyleRule(
      'color',
      ColorTokens.elements.primary.onlight.value
    );
    expect(container).toMatchSnapshot();
  });

  test('should render Badge indicator - kind numbered with fillColor as Black', () => {
    const { container } = render(
      <BadgeIndicator kind={'numbered'} fillColor="black">
        99
      </BadgeIndicator>
    );
    const BadgeIndicatorContainer = container.querySelector(
      'div[class^="StyledBadgeIndicator"]'
    );
    const BadgeIndicatorNumber = container.querySelector(
      'div[class^="StyledNumber"]'
    );
    expect(BadgeIndicatorContainer).toHaveStyleRule(
      'background-color',
      ColorTokens.background.primary.dark.value
    );
    expect(BadgeIndicatorNumber).toHaveStyleRule(
      'color',
      ColorTokens.elements.primary.ondark.value
    );
    expect(container).toMatchSnapshot();
  });

  test('should render Badge indicator - kind numbered with fillColor as White', () => {
    const { container } = render(
      <BadgeIndicator kind={'numbered'} fillColor="white">
        99
      </BadgeIndicator>
    );
    const BadgeIndicatorContainer = container.querySelector(
      'div[class^="StyledBadgeIndicator"]'
    );
    const BadgeIndicatorNumber = container.querySelector(
      'div[class^="StyledNumber"]'
    );
    expect(BadgeIndicatorContainer).toHaveStyleRule(
      'background-color',
      ColorTokens.background.primary.light.value
    );
    expect(BadgeIndicatorNumber).toHaveStyleRule(
      'color',
      ColorTokens.elements.primary.onlight.value
    );
    expect(container).toMatchSnapshot();
  });

  test('should render Badge indicator - kind numbered with fillColor as Yellow and Surface as dark', () => {
    const { container } = render(
      <BadgeIndicator kind={'numbered'} fillColor="yellow" surface="dark">
        99
      </BadgeIndicator>
    );
    const BadgeIndicatorContainer = container.querySelector(
      'div[class^="StyledBadgeIndicator"]'
    );
    const BadgeIndicatorNumber = container.querySelector(
      'div[class^="StyledNumber"]'
    );
    expect(BadgeIndicatorContainer).toHaveStyleRule(
      'background-color',
      ColorTokens.palette.yellow53.value
    );
    expect(BadgeIndicatorNumber).toHaveStyleRule(
      'color',
      ColorTokens.elements.primary.onlight.value
    );
    expect(container).toMatchSnapshot();
  });

  test('should render Badge indicator - kind numbered with fillColor as Green and Surface as dark', () => {
    const { container } = render(
      <BadgeIndicator kind={'numbered'} fillColor="green" surface="dark">
        99
      </BadgeIndicator>
    );
    const BadgeIndicatorContainer = container.querySelector(
      'div[class^="StyledBadgeIndicator"]'
    );
    const BadgeIndicatorNumber = container.querySelector(
      'div[class^="StyledNumber"]'
    );
    expect(BadgeIndicatorContainer).toHaveStyleRule(
      'background-color',
      ColorTokens.palette.green36.value
    );
    expect(BadgeIndicatorNumber).toHaveStyleRule(
      'color',
      ColorTokens.elements.primary.onlight.value
    );
    expect(container).toMatchSnapshot();
  });

  test('should render Badge indicator - kind numbered with fillColor as Orange and Surface as dark', () => {
    const { container } = render(
      <BadgeIndicator kind={'numbered'} fillColor="orange" surface="dark">
        99
      </BadgeIndicator>
    );
    const BadgeIndicatorContainer = container.querySelector(
      'div[class^="StyledBadgeIndicator"]'
    );
    const BadgeIndicatorNumber = container.querySelector(
      'div[class^="StyledNumber"]'
    );
    expect(BadgeIndicatorContainer).toHaveStyleRule(
      'background-color',
      ColorTokens.palette.orange58.value
    );
    expect(BadgeIndicatorNumber).toHaveStyleRule(
      'color',
      ColorTokens.elements.primary.onlight.value
    );
    expect(container).toMatchSnapshot();
  });

  test('should render Badge indicator - kind numbered with fillColor as Blue and Surface as dark', () => {
    const { container } = render(
      <BadgeIndicator kind={'numbered'} fillColor="blue" surface="dark">
        99
      </BadgeIndicator>
    );
    const BadgeIndicatorContainer = container.querySelector(
      'div[class^="StyledBadgeIndicator"]'
    );
    const BadgeIndicatorNumber = container.querySelector(
      'div[class^="StyledNumber"]'
    );
    expect(BadgeIndicatorContainer).toHaveStyleRule(
      'background-color',
      ColorTokens.palette.blue46.value
    );
    expect(BadgeIndicatorNumber).toHaveStyleRule(
      'color',
      ColorTokens.elements.primary.onlight.value
    );
    expect(container).toMatchSnapshot();
  });

  test('should render Badge indicator - kind numbered with fillColor as Gray High Contrast and Surface as dark', () => {
    const { container } = render(
      <BadgeIndicator
        kind={'numbered'}
        fillColor="grayHighContrast"
        surface="dark"
      >
        99
      </BadgeIndicator>
    );
    const BadgeIndicatorContainer = container.querySelector(
      'div[class^="StyledBadgeIndicator"]'
    );
    const BadgeIndicatorNumber = container.querySelector(
      'div[class^="StyledNumber"]'
    );
    expect(BadgeIndicatorContainer).toHaveStyleRule(
      'background-color',
      ColorTokens.palette.gray65.value
    );
    expect(BadgeIndicatorNumber).toHaveStyleRule(
      'color',
      ColorTokens.elements.primary.onlight.value
    );
    expect(container).toMatchSnapshot();
  });

  test('should render Badge indicator - kind numbered with fillColor as Gray Low Contrast and Surface as dark', () => {
    const { container } = render(
      <BadgeIndicator
        kind={'numbered'}
        fillColor="grayLowContrast"
        surface="dark"
      >
        99
      </BadgeIndicator>
    );
    const BadgeIndicatorContainer = container.querySelector(
      'div[class^="StyledBadgeIndicator"]'
    );
    const BadgeIndicatorNumber = container.querySelector(
      'div[class^="StyledNumber"]'
    );
    expect(BadgeIndicatorContainer).toHaveStyleRule(
      'background-color',
      ColorTokens.palette.gray20.value
    );
    expect(BadgeIndicatorNumber).toHaveStyleRule(
      'color',
      ColorTokens.elements.primary.ondark.value
    );
    expect(container).toMatchSnapshot();
  });

  test('should render Badge indicator - kind numbered with fillColor as Black and Surface as dark', () => {
    const { container } = render(
      <BadgeIndicator kind={'numbered'} fillColor="black" surface="dark">
        99
      </BadgeIndicator>
    );
    const BadgeIndicatorContainer = container.querySelector(
      'div[class^="StyledBadgeIndicator"]'
    );
    const BadgeIndicatorNumber = container.querySelector(
      'div[class^="StyledNumber"]'
    );
    expect(BadgeIndicatorContainer).toHaveStyleRule(
      'background-color',
      ColorTokens.background.primary.dark.value
    );
    expect(BadgeIndicatorNumber).toHaveStyleRule(
      'color',
      ColorTokens.elements.primary.ondark.value
    );
    expect(container).toMatchSnapshot();
  });

  test('should render Badge indicator - kind numbered with fillColor as White and Surface as dark', () => {
    const { container } = render(
      <BadgeIndicator kind={'numbered'} fillColor="white" surface="dark">
        99
      </BadgeIndicator>
    );
    const BadgeIndicatorContainer = container.querySelector(
      'div[class^="StyledBadgeIndicator"]'
    );
    const BadgeIndicatorNumber = container.querySelector(
      'div[class^="StyledNumber"]'
    );
    expect(BadgeIndicatorContainer).toHaveStyleRule(
      'background-color',
      ColorTokens.background.primary.light.value
    );
    expect(BadgeIndicatorNumber).toHaveStyleRule(
      'color',
      ColorTokens.elements.primary.onlight.value
    );
    expect(container).toMatchSnapshot();
  });

  test('should render Badge indicator - kind numbered + maximum digit', () => {
    const { container, getByTestId } = render(
      <BadgeIndicator kind={'numbered'}>100</BadgeIndicator>
    );
    const numberedEle = getByTestId('numberedDiv');
    expect(numberedEle.innerHTML).toBe('99+');
    expect(container).toMatchSnapshot();
  });

  test('should render Badge indicator - kind numbered + maximum digit none', () => {
    const { container, getByTestId } = render(
      <BadgeIndicator kind={'numbered'} maximumDigits="none">
        10000
      </BadgeIndicator>
    );
    const numberedEle = getByTestId('numberedDiv');
    expect(numberedEle.innerHTML).toBe('10,000');
    expect(container).toMatchSnapshot();
  });

  test('should render Badge indicator - hideBorder', () => {
    const { container } = render(<BadgeIndicator hideBorder />);
    const BadgeIndicatorContainer = container.querySelector(
      'div[class^="StyledBadgeIndicator"]'
    );
    expect(BadgeIndicatorContainer).toHaveStyleRule('box-shadow', undefined);
    expect(container).toMatchSnapshot();
  });

  test('should render Badge indicator - dotSize', () => {
    const { container } = render(<BadgeIndicator dotSize="6" />);
    const BadgeIndicatorDotSTyle = container.querySelector(
      'div[class^="StyledDot"]'
    );
    expect(BadgeIndicatorDotSTyle).toHaveStyleRule('height', calculateRem('6'));
    expect(BadgeIndicatorDotSTyle).toHaveStyleRule('width', calculateRem('6'));
    expect(container).toMatchSnapshot();
  });

  test('should render Badge indicator - container size kind simple', () => {
    const { container } = render(<BadgeIndicator containerSize="24" />);
    const BadgeIndicatorContainer = container.querySelector(
      'div[class^="StyledBadgeIndicator"]'
    );
    expect(BadgeIndicatorContainer).toHaveStyleRule(
      'height',
      calculateRem('24')
    );
    expect(BadgeIndicatorContainer).toHaveStyleRule(
      'min-width',
      calculateRem('24')
    );
    expect(BadgeIndicatorContainer).toHaveStyleRule(
      'border-radius',
      calculateRem('24')
    );
    expect(container).toMatchSnapshot();
  });

  test('should render Badge indicator - leadingCharacter', () => {
    const { container, getByTestId } = render(
      <BadgeIndicator kind={'numbered'} leadingCharacter="+">
        100
      </BadgeIndicator>
    );
    const numberedEle = getByTestId('numberedDiv');
    expect(numberedEle.innerHTML.charAt(0)).toBe('+');
    expect(container).toMatchSnapshot();
  });

  test('should render Badge indicator - trailingText', () => {
    const { container, getByTestId } = render(
      <BadgeIndicator kind={'numbered'} trailingText="new">
        100
      </BadgeIndicator>
    );
    const numberedEle = getByTestId('trailingText');
    expect(numberedEle.innerHTML).toBe(' new');
    expect(container).toMatchSnapshot();
  });

  test('should render Badge indicator - size small', () => {
    const { container } = render(
      <BadgeIndicator kind={'numbered'} size="small">
        99
      </BadgeIndicator>
    );
    const BadgeIndicatorContainer = container.querySelector(
      'div[class^="StyledBadgeIndicator"]'
    );
    expect(BadgeIndicatorContainer).toHaveStyleRule('height', calculateRem(16));
    expect(BadgeIndicatorContainer).toHaveStyleRule(
      'min-width',
      calculateRem(16)
    );
    expect(BadgeIndicatorContainer).toHaveStyleRule(
      'border-radius',
      calculateRem(16)
    );

    const NumberStyle = container.querySelector('div[class^="StyledNumber"]');
    expect(NumberStyle).toHaveStyleRule('font-family', 'Verizon-NHG-eTX');
    expect(NumberStyle).toHaveStyleRule(
      'font-size',
      calculateRem(TypographyTokens.fontsize.body[12].value)
    );
    expect(NumberStyle).toHaveStyleRule(
      'font-weight',
      `${TypographyTokens.fontweight.regular.value}`
    );
    expect(NumberStyle).toHaveStyleRule('letter-spacing', calculateRem(0));
    expect(NumberStyle).toHaveStyleRule('line-height', calculateRem(12));
    expect(NumberStyle).toHaveStyleRule(
      'padding',
      `${calculateRem(2)} ${calculateRem(LayoutTokens.space['1X'].value)}`
    );
    expect(container).toMatchSnapshot();
  });

  test('should render Badge indicator - size medium', () => {
    const { container } = render(
      <BadgeIndicator kind={'numbered'} size="medium">
        99
      </BadgeIndicator>
    );
    const BadgeIndicatorContainer = container.querySelector(
      'div[class^="StyledBadgeIndicator"]'
    );
    expect(BadgeIndicatorContainer).toHaveStyleRule('height', calculateRem(18));
    expect(BadgeIndicatorContainer).toHaveStyleRule(
      'min-width',
      calculateRem(18)
    );
    expect(BadgeIndicatorContainer).toHaveStyleRule(
      'border-radius',
      calculateRem(18)
    );

    const NumberStyle = container.querySelector('div[class^="StyledNumber"]');
    expect(NumberStyle).toHaveStyleRule('font-family', 'Verizon-NHG-eDS');
    expect(NumberStyle).toHaveStyleRule(
      'font-size',
      calculateRem(TypographyTokens.fontsize.body[14].value)
    );
    expect(NumberStyle).toHaveStyleRule(
      'font-weight',
      `${TypographyTokens.fontweight.regular.value}`
    );
    expect(NumberStyle).toHaveStyleRule(
      'letter-spacing',
      calculateRem(TypographyTokens.letterspacing.wide.value)
    );
    expect(NumberStyle).toHaveStyleRule('line-height', calculateRem(14));
    expect(NumberStyle).toHaveStyleRule(
      'padding',
      `${calculateRem(2)} ${calculateRem(6)}`
    );
    expect(container).toMatchSnapshot();
  });

  test('should render Badge indicator - size large', () => {
    const { container } = render(
      <BadgeIndicator kind={'numbered'} size="large">
        99
      </BadgeIndicator>
    );

    const BadgeIndicatorContainer = container.querySelector(
      'div[class^="StyledBadgeIndicator"]'
    );
    expect(BadgeIndicatorContainer).toHaveStyleRule('height', calculateRem(20));
    expect(BadgeIndicatorContainer).toHaveStyleRule(
      'min-width',
      calculateRem(20)
    );
    expect(BadgeIndicatorContainer).toHaveStyleRule(
      'border-radius',
      calculateRem(20)
    );

    const NumberStyle = container.querySelector('div[class^="StyledNumber"]');
    expect(NumberStyle).toHaveStyleRule('font-family', 'Verizon-NHG-eDS');
    expect(NumberStyle).toHaveStyleRule(
      'font-size',
      calculateRem(TypographyTokens.fontsize.body[16].value)
    );
    expect(NumberStyle).toHaveStyleRule(
      'font-weight',
      `${TypographyTokens.fontweight.regular.value}`
    );
    expect(NumberStyle).toHaveStyleRule(
      'letter-spacing',
      calculateRem(TypographyTokens.letterspacing.wide.value)
    );
    expect(NumberStyle).toHaveStyleRule(
      'line-height',
      calculateRem(TypographyTokens.lineheight.body[16].value)
    );
    expect(NumberStyle).toHaveStyleRule(
      'padding',
      `${calculateRem(2)} ${calculateRem(6)}`
    );
    expect(container).toMatchSnapshot();
  });

  test('should render Badge indicator - size XLarge', () => {
    const { container } = render(
      <BadgeIndicator kind={'numbered'} size="XLarge">
        99
      </BadgeIndicator>
    );

    const BadgeIndicatorContainer = container.querySelector(
      'div[class^="StyledBadgeIndicator"]'
    );
    expect(BadgeIndicatorContainer).toHaveStyleRule('height', calculateRem(24));
    expect(BadgeIndicatorContainer).toHaveStyleRule(
      'min-width',
      calculateRem(24)
    );
    expect(BadgeIndicatorContainer).toHaveStyleRule(
      'border-radius',
      calculateRem(24)
    );

    const NumberStyle = container.querySelector('div[class^="StyledNumber"]');
    expect(NumberStyle).toHaveStyleRule('font-family', 'Verizon-NHG-eDS');
    expect(NumberStyle).toHaveStyleRule(
      'font-size',
      calculateRem(TypographyTokens.fontsize.title[20].value)
    );
    expect(NumberStyle).toHaveStyleRule(
      'font-weight',
      `${TypographyTokens.fontweight.regular.value}`
    );
    expect(NumberStyle).toHaveStyleRule('letter-spacing', calculateRem(0));
    expect(NumberStyle).toHaveStyleRule(
      'line-height',
      calculateRem(TypographyTokens.lineheight.title[20].value)
    );
    expect(NumberStyle).toHaveStyleRule(
      'padding',
      `${calculateRem(2)} ${calculateRem(6)}`
    );
    expect(container).toMatchSnapshot();
  });

  test('should render Badge indicator - size 2XLarge', () => {
    const { container } = render(
      <BadgeIndicator kind={'numbered'} size="2XLarge">
        99
      </BadgeIndicator>
    );

    const NumberStyle = container.querySelector('div[class^="StyledNumber"]');
    expect(NumberStyle).toHaveStyleRule('font-family', 'Verizon-NHG-eDS');
    expect(NumberStyle).toHaveStyleRule(
      'font-size',
      calculateRem(TypographyTokens.fontsize.title[24].value)
    );
    expect(NumberStyle).toHaveStyleRule(
      'font-weight',
      `${TypographyTokens.fontweight.regular.value}`
    );
    expect(NumberStyle).toHaveStyleRule('letter-spacing', calculateRem(0));
    expect(NumberStyle).toHaveStyleRule(
      'line-height',
      calculateRem(TypographyTokens.lineheight.title[24].value)
    );
    expect(NumberStyle).toHaveStyleRule(
      'padding',
      `${calculateRem(2)} ${calculateRem(LayoutTokens.space['2X'].value)}`
    );
    expect(container).toMatchSnapshot();
  });

  test('should render Badge indicator - with custom padding', () => {
    const { container } = render(
      <BadgeIndicator
        kind={'numbered'}
        padding={{
          vertical: 4,
          horizontal: 8,
        }}
      >
        99
      </BadgeIndicator>
    );
    const BadgeIndicatorContainer = container.querySelector(
      'div[class^="StyledBadgeIndicator"]'
    );
    expect(BadgeIndicatorContainer).toHaveStyleRule('height', calculateRem(20));
    expect(BadgeIndicatorContainer).toHaveStyleRule(
      'min-width',
      calculateRem(20)
    );
    expect(BadgeIndicatorContainer).toHaveStyleRule(
      'border-radius',
      calculateRem(20)
    );

    const NumberStyle = container.querySelector('div[class^="StyledNumber"]');
    expect(NumberStyle).toHaveStyleRule(
      'padding',
      `${calculateRem(4)} ${calculateRem(8)}`
    );
    expect(container).toMatchSnapshot();
  });
});
