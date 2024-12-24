import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ColorTokens } from '@vds-tokens/color';
import { AccessibilityTokens } from '@vds-tokens/accessibility';
import { calculateRem, hexToRgba } from '@vds-core/utilities';
import { ButtonIcon } from './index';
import { Icon } from '@vds-core/icons';

const focusringWidth = AccessibilityTokens.focusring.borderwidth.value;
const focusringStyle = AccessibilityTokens.focusring.borderstyle.value;
const focusRingLight = AccessibilityTokens.color.focusring.onlight.value;
const focusRingDark = AccessibilityTokens.color.focusring.ondark.value;
const grayPalleteToken = ColorTokens.palette.gray44.value;

describe('kind ghost/default - Light Surface', () => {
  test('default icon button background and icon style', () => {
    const { container } = render(
      <ButtonIcon
        kind="ghost"
        renderIcon={props => <Icon name="app-dialer" {...props} />}
      />
    );
    const iconBtn = container.querySelector('[class^="StyledButton"]');
    expect(iconBtn).toHaveStyleRule('background-color', 'transparent');
    const iconfillcolor = container.querySelector('[class^="StyledSVG"] path');
    expect(iconfillcolor.getAttribute('fill')).toBe(
      ColorTokens.elements.primary.onlight.value
    );
  });
  test('icon button container size for fitToIcon prop - size large', () => {
    const { container } = render(
      <ButtonIcon
        kind="ghost"
        fitToIcon={true}
        renderIcon={props => <Icon name="app-dialer" {...props} />}
      />
    );
    const iconBtn = container.querySelector('[class^="StyledButton"]');
    expect(iconBtn).toHaveStyleRule('width', '100%');
    expect(iconBtn).toHaveStyleRule('width', '100%');
  });
  test('icon button container size for fitToIcon prop - size small', () => {
    const { container } = render(
      <ButtonIcon
        kind="ghost"
        fitToIcon={true}
        size="small"
        renderIcon={props => <Icon name="app-dialer" {...props} />}
      />
    );
    const iconBtn = container.querySelector('[class^="StyledButton"]');
    expect(iconBtn.parentNode).toHaveStyleRule('width', '1.25rem');
    expect(iconBtn.parentNode).toHaveStyleRule('height', '1.25rem');
    expect(iconBtn).toHaveStyleRule('width', '100%');
    expect(iconBtn).toHaveStyleRule('height', '100%');
  });
  test('icon button background styles on hover', () => {
    const { container } = render(
      <ButtonIcon
        kind="ghost"
        renderIcon={props => <Icon name="app-dialer" {...props} />}
      />
    );
    const iconBtn = container.querySelector('[class^="StyledButton"]');
    fireEvent.mouseOver(iconBtn);
    // border color with 6% opacity
    expect(iconBtn).toHaveStyleRule(
      'box-shadow',
      `0 0 0 0.0625rem ${hexToRgba(grayPalleteToken, 0.06)}`,
      {
        modifier: `:hover`,
      }
    );
    // background color with 6% opacity
    expect(iconBtn).toHaveStyleRule(
      'background-color',
      `${hexToRgba(grayPalleteToken, 0.06)}`,
      {
        modifier: `:hover`,
      }
    );
  });
  test('icon color when icon button is active', () => {
    const { container } = render(
      <ButtonIcon
        kind="ghost"
        renderIcon={props => <Icon name="app-dialer" {...props} />}
      />
    );
    const iconBtn = container.querySelector('[class^="StyledButton"]');
    fireEvent.mouseDown(iconBtn);
    expect(iconBtn).toHaveStyleRule(
      'fill',
      `${ColorTokens.interactive.active.onlight.value}`,
      {
        modifier: `:active svg path`,
      }
    );
  });
  test('icon button styles on keyboard focus', () => {
    const { container } = render(
      <ButtonIcon
        kind="ghost"
        renderIcon={props => <Icon name="app-dialer" {...props} />}
      />
    );
    const iconBtn = container.querySelector('[class^="StyledButton"]');
    fireEvent.keyDown(iconBtn, {
      key: 'Tab',
      keyCode: 9,
      charCode: 9,
    });
    expect(iconBtn).toHaveStyleRule(
      'border',
      `${calculateRem(focusringWidth)} ${focusringStyle}  ${focusRingLight}`,
      {
        modifier: `:focus:not(:hover)::before`,
      }
    );
  });
  test('icon color when icon button is disabled', () => {
    const { container } = render(
      <ButtonIcon
        kind="ghost"
        surface={'light'}
        disabled={false}
        renderIcon={props => <Icon name="app-dialer" {...props} />}
      />
    );
    const iconfillcolor = container.querySelector('[class^="StyledSVG"] path');
    expect(iconfillcolor.getAttribute('fill')).toBe('#000000');
  });

  test('Button Icon selectable is selected', () => {
    const { container } = render(
      <ButtonIcon
        kind="ghost"
        surface={'light'}
        disabled={false}
        selectable={true}
        selected={true}
        renderIcon={props => <Icon name="add-to-favorite" {...props} />}
        renderSelectedIcon={props => (
          <Icon name="added-to-favorite" {...props} />
        )}
      />
    );

    const iconBtnSvgPath = container.querySelector(
      '[class^="StyledLabel"] path'
    );
    expect(iconBtnSvgPath.getAttribute('fill')).toBe(
      `${ColorTokens.elements.brandhighlight.value}`
    );
  });

  test('Button Icon selectable custom svg unselected', () => {
    const { container } = render(
      <ButtonIcon
        kind="ghost"
        surface={'light'}
        disabled={false}
        selectable={true}
        selected={false}
        renderIcon={props => (
          <svg
            role="img"
            width="20"
            aria-hidden="false"
            aria-label="add-to-favorite icon"
            viewBox="0 0 21.6 21.6"
          >
            <title>add-to-favorite icon</title>
            <g>
              <path
                d="M10.8,18.7l-7.2-6.9C2.4,10.6,1.8,9.4,1.8,8c0-2.8,2.3-5.1,5.1-5.1c1.6,0,3,0.7,4,1.9c1-1.2,2.4-1.9,3.9-1.9
		c2.8,0,5.1,2.3,5.1,5.1c0,1.8-1,3-2,4L10.8,18.7z M6.9,4c-2.2,0-4,1.8-4,3.9c0,1.1,0.4,2,1.4,3l6.5,6.2l6.3-6
		c1.1-1.1,1.6-2.1,1.6-3.2c0-2.2-1.8-3.9-4-3.9c-1.4,0-2.4,0.8-3.5,2l-0.4,0.5L10.4,6C9.4,4.7,8.3,4,6.9,4z"
                stroke="none"
                fill="#000000"
              ></path>
            </g>
          </svg>
        )}
        renderSelectedIcon={props => (
          <svg
            role="img"
            width="20"
            aria-hidden="false"
            aria-label="added-to-favorite icon"
            viewBox="0 0 21.6 21.6"
          >
            <title>added-to-favorite icon</title>
            <path
              d="M14.7,2.9c-1.5,0-2.9,0.7-3.9,1.9c-1-1.2-2.4-1.9-3.9-1.9C4.1,2.9,1.8,5.2,1.8,8c0,1.4,0.5,2.7,1.5,3.6l7.5,7.1l7.2-6.9
	c1.1-1,1.7-2.3,1.8-3.8C19.8,5.2,17.5,2.9,14.7,2.9z"
              stroke="none"
              fill="#000000"
            ></path>
          </svg>
        )}
      />
    );
    const iconfillcolor = container.querySelector('svg path');
    expect(iconfillcolor.getAttribute('fill')).toBe('#000000');
  });

  test('Button Icon selectable custom svg selected - surface light', () => {
    const { container } = render(
      <ButtonIcon
        kind="ghost"
        surface={'light'}
        disabled={false}
        selectable={true}
        selected={true}
        renderIcon={props => (
          <svg
            role="img"
            width="20"
            aria-hidden="false"
            aria-label="add-to-favorite icon"
            viewBox="0 0 21.6 21.6"
          >
            <title>add-to-favorite icon</title>
            <g>
              <path
                d="M10.8,18.7l-7.2-6.9C2.4,10.6,1.8,9.4,1.8,8c0-2.8,2.3-5.1,5.1-5.1c1.6,0,3,0.7,4,1.9c1-1.2,2.4-1.9,3.9-1.9
		c2.8,0,5.1,2.3,5.1,5.1c0,1.8-1,3-2,4L10.8,18.7z M6.9,4c-2.2,0-4,1.8-4,3.9c0,1.1,0.4,2,1.4,3l6.5,6.2l6.3-6
		c1.1-1.1,1.6-2.1,1.6-3.2c0-2.2-1.8-3.9-4-3.9c-1.4,0-2.4,0.8-3.5,2l-0.4,0.5L10.4,6C9.4,4.7,8.3,4,6.9,4z"
                stroke="none"
                fill="#000000"
              ></path>
            </g>
          </svg>
        )}
        renderSelectedIcon={props => (
          <svg
            role="img"
            width="20"
            aria-hidden="false"
            aria-label="added-to-favorite icon"
            viewBox="0 0 21.6 21.6"
          >
            <title>added-to-favorite icon</title>
            <path
              d="M14.7,2.9c-1.5,0-2.9,0.7-3.9,1.9c-1-1.2-2.4-1.9-3.9-1.9C4.1,2.9,1.8,5.2,1.8,8c0,1.4,0.5,2.7,1.5,3.6l7.5,7.1l7.2-6.9
	c1.1-1,1.7-2.3,1.8-3.8C19.8,5.2,17.5,2.9,14.7,2.9z"
              stroke="none"
              fill="#000000"
            ></path>
          </svg>
        )}
      />
    );
    const iconBtnSvgPath = container.querySelector(
      '[class^="StyledLabel"] path'
    );
    expect(iconBtnSvgPath.getAttribute('fill')).toBe(`#000000`);
  });
});

describe('kind ghost/default - Dark Surface', () => {
  test('default icon button background and icon style', () => {
    const { container } = render(
      <ButtonIcon
        kind="ghost"
        surface="dark"
        renderIcon={props => <Icon name="app-dialer" {...props} />}
      />
    );
    const iconBtn = container.querySelector('[class^="StyledButton"]');
    expect(iconBtn).toHaveStyleRule('background-color', 'transparent');
    const iconfillcolor = container.querySelector('[class^="StyledSVG"] path');
    expect(iconfillcolor.getAttribute('fill')).toBe(
      ColorTokens.elements.primary.ondark.value
    );
  });
  test('icon button background styles on hover', () => {
    const { container } = render(
      <ButtonIcon
        kind="ghost"
        surface="dark"
        renderIcon={props => <Icon name="app-dialer" {...props} />}
      />
    );
    const iconBtn = container.querySelector('[class^="StyledButton"]');
    fireEvent.mouseOver(iconBtn);
    // border color with 6% opacity
    expect(iconBtn).toHaveStyleRule(
      'box-shadow',
      `0 0 0 0.0625rem ${hexToRgba(grayPalleteToken, 0.26)}`,
      {
        modifier: `:hover`,
      }
    );
    // background color with 6% opacity
    expect(iconBtn).toHaveStyleRule(
      'background-color',
      `${hexToRgba(grayPalleteToken, 0.26)}`,
      {
        modifier: `:hover`,
      }
    );
  });
  test('icon color when icon button is active', () => {
    const { container } = render(
      <ButtonIcon
        kind="ghost"
        surface="dark"
        renderIcon={props => <Icon name="app-dialer" {...props} />}
      />
    );
    const iconBtn = container.querySelector('[class^="StyledButton"]');
    fireEvent.mouseDown(iconBtn);
    expect(iconBtn).toHaveStyleRule(
      'fill',
      `${ColorTokens.interactive.active.ondark.value}`,
      {
        modifier: `:active svg path`,
      }
    );
  });
  test('icon button styles on keyboard focus', () => {
    const { container } = render(
      <ButtonIcon
        kind="ghost"
        surface="dark"
        renderIcon={props => <Icon name="app-dialer" {...props} />}
      />
    );
    const iconBtn = container.querySelector('[class^="StyledButton"]');
    fireEvent.keyDown(iconBtn, {
      key: 'Tab',
      keyCode: 9,
      charCode: 9,
    });
    expect(iconBtn).toHaveStyleRule(
      'border',
      `${calculateRem(focusringWidth)} ${focusringStyle}  ${focusRingDark}`,
      {
        modifier: `:focus:not(:hover)::before`,
      }
    );
  });
  test('icon color when icon button is disabled', () => {
    const { container } = render(
      <ButtonIcon
        kind="ghost"
        surface={'dark'}
        disabled={false}
        renderIcon={props => <Icon name="app-dialer" {...props} />}
      />
    );
    const iconfillcolor = container.querySelector('[class^="StyledSVG"] path');
    expect(iconfillcolor.getAttribute('fill')).toBe('#ffffff');
  });

  test('Button Icon selectable is selected', () => {
    const { container } = render(
      <ButtonIcon
        kind="ghost"
        surface={'dark'}
        disabled={false}
        selectable={true}
        selected={true}
        renderIcon={props => <Icon name="add-to-favorite" {...props} />}
        renderSelectedIcon={props => (
          <Icon name="added-to-favorite" {...props} />
        )}
      />
    );

    const iconBtnSvgPath = container.querySelector(
      '[class^="StyledLabel"] path'
    );
    expect(iconBtnSvgPath.getAttribute('fill')).toBe(
      `${ColorTokens.elements.primary.ondark.value}`
    );
  });
});

describe('Low Contrast - Light Surface - float false ', () => {
  test('Icon button default styles', () => {
    const { container } = render(
      <ButtonIcon
        kind="lowContrast"
        renderIcon={props => <Icon name="app-dialer" {...props} />}
      />
    );

    const iconBtn = container.querySelector('[class^="StyledButton"]');
    expect(iconBtn).toHaveStyleRule(
      'background-color',
      hexToRgba(ColorTokens.palette.gray44.value, 0.06)
    );
  });

  test('Icon button hover styles', () => {
    const { container } = render(
      <ButtonIcon
        kind="lowContrast"
        renderIcon={props => <Icon name="app-dialer" {...props} />}
      />
    );

    const iconBtn = container.querySelector('[class^="StyledButton"]');
    fireEvent.mouseEnter(iconBtn);
    expect(iconBtn).toHaveStyleRule(
      'box-shadow',
      `0 0 0 ${calculateRem(1)} ${hexToRgba(
        ColorTokens.palette.gray44.value,
        0.06
      )}`,
      {
        modifier: `:hover`,
      }
    );
  });

  test('Icon button active styles', () => {
    const { container } = render(
      <ButtonIcon
        kind="lowContrast"
        renderIcon={props => <Icon name="app-dialer" {...props} />}
      />
    );
    const iconBtn = container.querySelector('[class^="StyledButton"]');
    fireEvent.click(iconBtn);
    fireEvent.mouseDown(iconBtn);
    expect(iconBtn).toMatchSnapshot();
    expect(iconBtn).toHaveStyleRule(
      'fill',
      `${ColorTokens.interactive.active.onlight.value}`,
      {
        modifier: `:active svg path`,
      }
    );
  });

  test('Icon button keyboard focus styles', () => {
    const { container } = render(
      <ButtonIcon
        kind="lowContrast"
        renderIcon={props => <Icon name="app-dialer" {...props} />}
      />
    );

    const iconBtn = container.querySelector('[class^="StyledButton"]');
    fireEvent.keyPress(iconBtn, {
      key: 'Tab',
      code: 9,
      charCode: 9,
    });
    expect(iconBtn).toHaveStyleRule('border', '0.0625rem dashed  #000000', {
      modifier: `:focus:not(:hover)::before`,
    });
  });

  test('Button Icon selectable is selected', () => {
    const { container } = render(
      <ButtonIcon
        kind="lowContrast"
        surface={'light'}
        disabled={false}
        selectable={true}
        selected={true}
        renderIcon={props => <Icon name="add-to-favorite" {...props} />}
        renderSelectedIcon={props => (
          <Icon name="added-to-favorite" {...props} />
        )}
      />
    );

    const iconBtnSvgPath = container.querySelector(
      '[class^="StyledLabel"] path'
    );
    expect(iconBtnSvgPath.getAttribute('fill')).toBe(
      `${ColorTokens.elements.brandhighlight.value}`
    );
  });
});

describe('Low Contrast - Light Surface - float true ', () => {
  test('Icon button default styles', () => {
    const { container } = render(
      <ButtonIcon
        kind="lowContrast"
        floating={true}
        renderIcon={props => <Icon name="app-dialer" {...props} />}
      />
    );

    const iconBtn = container.querySelector('[class^="StyledButton"]');
    expect(iconBtn).toHaveStyleRule(
      'background-color',
      ColorTokens.background.primary.light.value
    );
    expect(iconBtn).toHaveStyleRule(
      'box-shadow',
      '0px 1px 10px rgba(0,0,0,0.12),0px 2px 4px rgba(0,0,0,0.05)',
      {
        modifier: `:not(:hover)::after`,
      }
    );
  });

  test('Icon button hover styles', () => {
    const { container } = render(
      <ButtonIcon
        kind="lowContrast"
        floating={true}
        renderIcon={props => <Icon name="app-dialer" {...props} />}
      />
    );

    const iconBtn = container.querySelector('[class^="StyledButton"]');
    fireEvent.mouseEnter(iconBtn);

    expect(iconBtn).toHaveStyleRule(
      'box-shadow',
      `0 0 0 0.0625rem ${ColorTokens.elements.primary.ondark.value}`,
      {
        modifier: `:hover`,
      }
    );
    // expect(iconBtn).toHaveStyleRule(
    //   'border',
    //   `0.0625rem solid ${ColorTokens.elements.lowcontrast.onlight.value}`
    // );
  });

  test('Icon button keyboard focus styles', () => {
    const { container } = render(
      <ButtonIcon
        kind="lowContrast"
        floating={true}
        renderIcon={props => <Icon name="app-dialer" {...props} />}
      />
    );

    const iconBtn = container.querySelector('[class^="StyledButton"]');
    fireEvent.keyPress(iconBtn, {
      key: 'Tab',
      code: 9,
      charCode: 9,
    });
    expect(iconBtn).toHaveStyleRule('border', '0.0625rem dashed  #000000', {
      modifier: `:focus:not(:hover)::before`,
    });
  });
});

describe('Low Contrast - Dark Surface - float false ', () => {
  test('Icon button default styles', () => {
    const { container } = render(
      <ButtonIcon
        kind="lowContrast"
        surface="dark"
        renderIcon={props => <Icon name="app-dialer" {...props} />}
      />
    );

    const iconBtn = container.querySelector('[class^="StyledButton"]');
    expect(iconBtn).toHaveStyleRule(
      'background-color',
      hexToRgba(ColorTokens.palette.gray44.value, 0.26)
    );
  });

  test('Icon button hover styles', () => {
    const { container } = render(
      <ButtonIcon
        kind="lowContrast"
        surface="dark"
        renderIcon={props => <Icon name="app-dialer" {...props} />}
      />
    );

    const iconBtn = container.querySelector('[class^="StyledButton"]');
    fireEvent.mouseEnter(iconBtn);
    expect(iconBtn).toHaveStyleRule(
      'box-shadow',
      `0 0 0 ${calculateRem(1)} ${hexToRgba(
        ColorTokens.palette.gray44.value,
        0.26
      )}`,
      {
        modifier: `:hover`,
      }
    );
  });

  test('Icon button keyboard focus styles', () => {
    const { container } = render(
      <ButtonIcon
        kind="lowContrast"
        surface="dark"
        renderIcon={props => <Icon name="app-dialer" {...props} />}
      />
    );

    const iconBtn = container.querySelector('[class^="StyledButton"]');
    fireEvent.keyPress(iconBtn, {
      key: 'Tab',
      code: 9,
      charCode: 9,
    });
    expect(iconBtn).toHaveStyleRule('border', '0.0625rem dashed  #ffffff', {
      modifier: `:focus:not(:hover)::before`,
    });
  });
});

describe('High Contrast - Light Surface ', () => {
  test('Icon button default styles', () => {
    const { container } = render(
      <ButtonIcon
        kind="highContrast"
        surface="light"
        renderIcon={props => <Icon name="app-dialer" {...props} />}
      />
    );

    const iconBtn = container.querySelector('[class^="StyledButton"]');
    expect(iconBtn).toHaveStyleRule(
      'background-color',
      ColorTokens.elements.primary.onlight.value
    );
    const iconfillcolor = container.querySelector('[class^="StyledSVG"] path');
    expect(iconfillcolor.getAttribute('fill')).toBe(
      ColorTokens.elements.primary.ondark.value
    );
  });

  test('Button Icon selectable is selected', () => {
    const { container } = render(
      <ButtonIcon
        kind="highContrast"
        surface={'light'}
        disabled={false}
        selectable={true}
        selected={true}
        renderIcon={props => <Icon name="add-to-favorite" {...props} />}
        renderSelectedIcon={props => (
          <Icon name="added-to-favorite" {...props} />
        )}
      />
    );

    const iconfillcolor = container.querySelector('[class^="StyledSVG"] path');
    expect(iconfillcolor.getAttribute('fill')).toBe(
      `${ColorTokens.elements.primary.ondark.value}`
    );
  });
});

describe('ButtonIcon - with BadgeIndicator', () => {
  test('render with badge indicator', () => {
    const { container } = render(
      <ButtonIcon
        kind="highContrast"
        surface={'light'}
        renderIcon={props => <Icon name="add-to-favorite" {...props} />}
        showBadgeIndicator
      />
    );

    expect(container).toMatchSnapshot();
  });
});
