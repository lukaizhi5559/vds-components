import { render, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import { Notification } from '.';
import { NotificationContainer } from '.';
import { calculateRem } from '../../Utilities/src';
import { LayoutTokens } from '@vds-tokens/layout';
import { ButtonGroup } from '../../Buttons/src';

// mock cuid
jest.mock('@vds-core/utilities', () => {
  const originalModule = jest.requireActual('@vds-core/utilities');
  return {
    __esModule: true, // Use it when dealing with esModules
    ...originalModule,
    generateUUID: jest.fn(() => '1'),
  };
});

test('<Notifications default Styles (type=success)>', () => {
  const { container } = render(
    <Notification
      title="Title"
      subtitle="Lorem ipsum"
      buttonData={[
        {
          children: 'Button one',
        },
      ]}
    />
  );
  //Notification Icon(Success) - name, size and color
  const nIcon = container.querySelector(
    '[class^="IconSVGWrapper"][aria-label="checkmark-alt icon"]'
  );
  expect(nIcon).toHaveStyleRule('height', '1.25rem');
  expect(nIcon).toHaveStyleRule('width', '1.25rem');
  expect(nIcon).toHaveStyleRule('fill', '#000000', {
    modifier: `svg path`,
  });
  //Title styles
  const title = container.querySelector('p[class^="StyledBody"][id^="title"]');
  expect(title).toHaveStyleRule('font-size', '1rem');
  expect(title).toHaveStyleRule('font-weight', '700');
  expect(title).toHaveStyleRule('line-height', '1.25rem');
  expect(title).toHaveStyleRule(
    'font-family',
    'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
  );
  expect(title).toHaveStyleRule('color', '#000000');
  expect(title).toHaveStyleRule('text-decoration', 'none');
  //Text(subtitle) styles
  const subtitle = container.querySelector(
    'p[class^="StyledBody"][id^="subtitle"]'
  );
  expect(subtitle).toHaveStyleRule('font-size', '1rem');
  expect(subtitle).toHaveStyleRule('font-weight', '400');
  expect(subtitle).toHaveStyleRule('line-height', '1.25rem');
  expect(subtitle).toHaveStyleRule(
    'font-family',
    'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
  );
  expect(subtitle).toHaveStyleRule('color', '#000000');
  expect(subtitle).toHaveStyleRule('text-decoration', 'none');
  //Close Button - name, size and color
  const closeIcon = container.querySelector(
    '[class^="StyledSVG-VDS"][aria-label="close icon"]'
  );
  expect(closeIcon).toHaveStyleRule('height', '1.25rem');
  expect(closeIcon).toHaveStyleRule('width', '1.25rem');
  const closeIconPath = container.querySelector(
    '[class^="StyledSVG-VDS"][aria-label="close icon"]'
  );
  expect(closeIconPath).toHaveAttribute('fill', '#000000');
  expect(
    closeIcon.querySelector(
      'path[d="M11.59,10.8l7.11,7.1-.8.8-7.1-7.11L3.7,18.7l-.8-.8L10,10.8,2.9,3.7l.8-.8L10.8,10,17.9,2.9l.8.8Z"]'
    )
  ).toBeTruthy();
  const cBt = container.querySelector(
    'button[class^="StyledButton-VDS"][aria-label="Notification Close"]'
  );

  //VDS Button styles
  const bt = container.querySelector(
    'button[class^="StyledButton"][aria-label="Button one"]'
  );
  expect(bt).toHaveStyleRule('font-size', '0.75rem');
  expect(bt).toHaveStyleRule('font-weight', '700');
  expect(bt).toHaveStyleRule('line-height', '1rem');
  expect(bt).toHaveStyleRule('border', '0.0625rem solid #000000');
  expect(bt).toHaveStyleRule('color', '#000000');
  expect(bt).toHaveStyleRule('background-color', 'transparent');
  //Content area styles
  const ca = container.querySelector('[class^="AlertWrapper"][type="success"]');
  expect(ca).toHaveStyleRule('padding', '1.25rem');
  //container border radius
  expect(ca).toHaveStyleRule('border-radius', '0.25rem');
  expect(ca).toHaveStyleRule('box-sizing', 'border-box');
  //container bg(Success)
  expect(ca).toHaveStyleRule('background-color: #d6f2e0;');
  //width - Maximum (Desktop/Tablet) - Not-Full-bleed
  const wr = container.querySelector('[class^="StyledDiv-VDS"]');
  expect(wr).toHaveStyleRule('max-width', '1272px');
  expect(wr).toHaveStyleRule('width', '100%');
});

test('<Notifications default Styles (type=success) inverted>', () => {
  const { container } = render(
    <Notification
      title="Title"
      subtitle="Lorem ipsum"
      surface="dark"
      buttonData={[
        {
          children: 'Button one',
        },
      ]}
    />
  );
  //Notification Icon(Success) - name, size and color
  const nIcon = container.querySelector(
    '[class^="IconSVGWrapper"][aria-label="checkmark-alt icon"]'
  );
  expect(nIcon).toHaveStyleRule('height', '1.25rem');
  expect(nIcon).toHaveStyleRule('width', '1.25rem');
  expect(nIcon).toHaveStyleRule('fill', '#ffffff', {
    modifier: `svg path`,
  });
  //Title styles
  const title = container.querySelector('p[class^="StyledBody"][id^="title"]');
  expect(title).toHaveStyleRule('font-size', '1rem');
  expect(title).toHaveStyleRule('font-weight', '700');
  expect(title).toHaveStyleRule('line-height', '1.25rem');
  expect(title).toHaveStyleRule(
    'font-family',
    'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
  );
  expect(title).toHaveStyleRule('color', '#ffffff');
  expect(title).toHaveStyleRule('text-decoration', 'none');
  //Text(subtitle) styles
  const subtitle = container.querySelector(
    'p[class^="StyledBody"][id^="subtitle"]'
  );
  expect(subtitle).toHaveStyleRule('font-size', '1rem');
  expect(subtitle).toHaveStyleRule('font-weight', '400');
  expect(subtitle).toHaveStyleRule('line-height', '1.25rem');
  expect(subtitle).toHaveStyleRule(
    'font-family',
    'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
  );
  expect(subtitle).toHaveStyleRule('color', '#ffffff');
  expect(subtitle).toHaveStyleRule('text-decoration', 'none');
  //Close Button - name, size and color
  const closeIcon = container.querySelector(
    '[class^="StyledSVG-VDS"][aria-label="close icon"]'
  );
  expect(closeIcon).toHaveStyleRule('height', '1.25rem');
  expect(closeIcon).toHaveStyleRule('width', '1.25rem');
  const closeIconPath = container.querySelector(
    '[class^="StyledSVG-VDS"][aria-label="close icon"]'
  );
  expect(closeIconPath).toHaveAttribute('fill', '#ffffff');
  expect(
    closeIcon.querySelector(
      'path[d="M11.59,10.8l7.11,7.1-.8.8-7.1-7.11L3.7,18.7l-.8-.8L10,10.8,2.9,3.7l.8-.8L10.8,10,17.9,2.9l.8.8Z"]'
    )
  ).toBeTruthy();

  //VDS Button styles
  const bt = container.querySelector(
    'button[class^="StyledButton"][aria-label="Button one"]'
  );
  expect(bt).toHaveStyleRule('font-size', '0.75rem');
  expect(bt).toHaveStyleRule('font-weight', '700');
  expect(bt).toHaveStyleRule('line-height', '1rem');
  expect(bt).toHaveStyleRule('border', '0.0625rem solid #ffffff');
  expect(bt).toHaveStyleRule('color', '#ffffff');
  expect(bt).toHaveStyleRule('background-color', 'transparent');
  //Content area styles
  const ca = container.querySelector('[class^="AlertWrapper"][type="success"]');
  expect(ca).toHaveStyleRule('padding', '1.25rem');
  //container border radius
  expect(ca).toHaveStyleRule('border-radius', '0.25rem');
  expect(ca).toHaveStyleRule('box-sizing', 'border-box');
  //container bg(Success)
  expect(ca).toHaveStyleRule('background-color: #003614;');
  //width - Maximum (Desktop/Tablet) - Not-Full-bleed
  const wr = container.querySelector('[class^="StyledDiv-VDS"]');
  expect(wr).toHaveStyleRule('max-width', '1272px');
  expect(wr).toHaveStyleRule('width', '100%');
});

test('<Notifications Styles (type=error)>', () => {
  const { container } = render(
    <Notification
      title="Title"
      type="error"
      subtitle="Lorem ipsum"
      buttonData={[
        {
          children: 'Button one',
        },
      ]}
    />
  );
  //Notification Icon(Error) - name, size and color
  const nIcon = container.querySelector(
    '[class^="IconSVGWrapper"][aria-label="error icon"]'
  );
  expect(nIcon).toHaveStyleRule('height', '1.25rem');
  expect(nIcon).toHaveStyleRule('width', '1.25rem');
  expect(nIcon).toHaveStyleRule('fill', '#000000', {
    modifier: `svg path`,
  });
  //Title styles
  const title = container.querySelector('p[class^="StyledBody"][id^="title"]');
  expect(title).toHaveStyleRule('font-size', '1rem');
  expect(title).toHaveStyleRule('font-weight', '700');
  expect(title).toHaveStyleRule('line-height', '1.25rem');
  expect(title).toHaveStyleRule(
    'font-family',
    'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
  );
  expect(title).toHaveStyleRule('color', '#000000');
  expect(title).toHaveStyleRule('text-decoration', 'none');
  //Text(subtitle) styles
  const subtitle = container.querySelector(
    'p[class^="StyledBody"][id^="subtitle"]'
  );
  expect(subtitle).toHaveStyleRule('font-size', '1rem');
  expect(subtitle).toHaveStyleRule('font-weight', '400');
  expect(subtitle).toHaveStyleRule('line-height', '1.25rem');
  expect(subtitle).toHaveStyleRule(
    'font-family',
    'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
  );
  expect(subtitle).toHaveStyleRule('color', '#000000');
  expect(subtitle).toHaveStyleRule('text-decoration', 'none');
  //Close Button - name, size and color
  const closeIcon = container.querySelector(
    '[class^="StyledSVG-VDS"][aria-label="close icon"]'
  );
  expect(closeIcon).toHaveStyleRule('height', '1.25rem');
  expect(closeIcon).toHaveStyleRule('width', '1.25rem');
  const closeIconPath = container.querySelector(
    '[class^="StyledSVG-VDS"][aria-label="close icon"]'
  );
  expect(closeIconPath).toHaveAttribute('fill', '#000000');
  expect(
    closeIcon.querySelector(
      'path[d="M11.59,10.8l7.11,7.1-.8.8-7.1-7.11L3.7,18.7l-.8-.8L10,10.8,2.9,3.7l.8-.8L10.8,10,17.9,2.9l.8.8Z"]'
    )
  ).toBeTruthy();

  //VDS Button styles
  const bt = container.querySelector(
    'button[class^="StyledButton"][aria-label="Button one"]'
  );
  expect(bt).toHaveStyleRule('font-size', '0.75rem');
  expect(bt).toHaveStyleRule('font-weight', '700');
  expect(bt).toHaveStyleRule('line-height', '1rem');
  expect(bt).toHaveStyleRule('border', '0.0625rem solid #000000');
  expect(bt).toHaveStyleRule('color', '#000000');
  expect(bt).toHaveStyleRule('background-color', 'transparent');
  //Content area styles
  const ca = container.querySelector('[class^="AlertWrapper"][type="error"]');
  expect(ca).toHaveStyleRule('padding', '1.25rem');
  //container border radius
  expect(ca).toHaveStyleRule('border-radius', '0.25rem');
  expect(ca).toHaveStyleRule('box-sizing', 'border-box');
  //container bg(Error)
  expect(ca).toHaveStyleRule('background-color', '#ffece0');
  //width - Maximum (Desktop/Tablet) - Not-Full-bleed
  const wr = container.querySelector('[class^="StyledDiv-VDS"]');
  expect(wr).toHaveStyleRule('max-width', '1272px');
  expect(wr).toHaveStyleRule('width', '100%');
});

test('<Notifications Styles (type=error) inverted>', () => {
  const { container } = render(
    <Notification
      title="Title"
      type="error"
      subtitle="Lorem ipsum"
      surface="dark"
      buttonData={[
        {
          children: 'Button one',
        },
      ]}
    />
  );
  //Notification Icon(Error) - name, size and color
  const nIcon = container.querySelector(
    '[class^="IconSVGWrapper"][aria-label="error icon"]'
  );
  expect(nIcon).toHaveStyleRule('height', '1.25rem');
  expect(nIcon).toHaveStyleRule('width', '1.25rem');
  expect(nIcon).toHaveStyleRule('fill', '#ffffff', {
    modifier: `svg path`,
  });
  //Title styles
  const title = container.querySelector('p[class^="StyledBody"][id^="title"]');
  expect(title).toHaveStyleRule('font-size', '1rem');
  expect(title).toHaveStyleRule('font-weight', '700');
  expect(title).toHaveStyleRule('line-height', '1.25rem');
  expect(title).toHaveStyleRule(
    'font-family',
    'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
  );
  expect(title).toHaveStyleRule('color', '#ffffff');
  expect(title).toHaveStyleRule('text-decoration', 'none');
  //Text(subtitle) styles
  const subtitle = container.querySelector(
    'p[class^="StyledBody"][id^="subtitle"]'
  );
  expect(subtitle).toHaveStyleRule('font-size', '1rem');
  expect(subtitle).toHaveStyleRule('font-weight', '400');
  expect(subtitle).toHaveStyleRule('line-height', '1.25rem');
  expect(subtitle).toHaveStyleRule(
    'font-family',
    'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
  );
  expect(subtitle).toHaveStyleRule('color', '#ffffff');
  expect(subtitle).toHaveStyleRule('text-decoration', 'none');
  //Close Button - name, size and color
  const closeIcon = container.querySelector(
    '[class^="StyledSVG-VDS"][aria-label="close icon"]'
  );
  expect(closeIcon).toHaveStyleRule('height', '1.25rem');
  expect(closeIcon).toHaveStyleRule('width', '1.25rem');
  const closeIconPath = container.querySelector(
    '[class^="StyledSVG-VDS"][aria-label="close icon"]'
  );
  expect(closeIconPath).toHaveAttribute('fill', '#ffffff');
  expect(
    closeIcon.querySelector(
      'path[d="M11.59,10.8l7.11,7.1-.8.8-7.1-7.11L3.7,18.7l-.8-.8L10,10.8,2.9,3.7l.8-.8L10.8,10,17.9,2.9l.8.8Z"]'
    )
  ).toBeTruthy();

  //VDS Button styles
  const bt = container.querySelector(
    'button[class^="StyledButton"][aria-label="Button one"]'
  );
  expect(bt).toHaveStyleRule('font-size', '0.75rem');
  expect(bt).toHaveStyleRule('font-weight', '700');
  expect(bt).toHaveStyleRule('line-height', '1rem');
  expect(bt).toHaveStyleRule('border', '0.0625rem solid #ffffff');
  expect(bt).toHaveStyleRule('color', '#ffffff');
  expect(bt).toHaveStyleRule('background-color', 'transparent');
  //Content area styles
  const ca = container.querySelector('[class^="AlertWrapper"][type="error"]');
  expect(ca).toHaveStyleRule('padding', '1.25rem');
  //container border radius
  expect(ca).toHaveStyleRule('border-radius', '0.25rem');
  expect(ca).toHaveStyleRule('box-sizing', 'border-box');
  //container bg(Error)
  expect(ca).toHaveStyleRule('background-color', '#561701');
  //width - Maximum (Desktop/Tablet) - Not-Full-bleed
  const wr = container.querySelector('[class^="StyledDiv-VDS"]');
  expect(wr).toHaveStyleRule('max-width', '1272px');
  expect(wr).toHaveStyleRule('width', '100%');
});

test('<Notifications Styles (type=info)>', () => {
  const { container } = render(
    <Notification
      title="Title"
      type="info"
      subtitle="Lorem ipsum"
      buttonData={[
        {
          children: 'Button one',
        },
      ]}
    />
  );
  //Notification Icon(Error) - name, size and color
  const nIcon = container.querySelector(
    '[class^="IconSVGWrapper"][aria-label="info icon"]'
  );
  expect(nIcon).toHaveStyleRule('height', '1.25rem');
  expect(nIcon).toHaveStyleRule('width', '1.25rem');
  expect(nIcon).toHaveStyleRule('fill', '#000000', {
    modifier: `svg path`,
  });
  //Title styles
  const title = container.querySelector('p[class^="StyledBody"][id^="title"]');
  expect(title).toHaveStyleRule('font-size', '1rem');
  expect(title).toHaveStyleRule('font-weight', '700');
  expect(title).toHaveStyleRule('line-height', '1.25rem');
  expect(title).toHaveStyleRule(
    'font-family',
    'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
  );
  expect(title).toHaveStyleRule('color', '#000000');
  expect(title).toHaveStyleRule('text-decoration', 'none');
  //Text(subtitle) styles
  const subtitle = container.querySelector(
    'p[class^="StyledBody"][id^="subtitle"]'
  );
  expect(subtitle).toHaveStyleRule('font-size', '1rem');
  expect(subtitle).toHaveStyleRule('font-weight', '400');
  expect(subtitle).toHaveStyleRule('line-height', '1.25rem');
  expect(subtitle).toHaveStyleRule(
    'font-family',
    'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
  );
  expect(subtitle).toHaveStyleRule('color', '#000000');
  expect(subtitle).toHaveStyleRule('text-decoration', 'none');
  //Close Button - name, size and color
  const closeIcon = container.querySelector(
    '[class^="StyledSVG-VDS"][aria-label="close icon"]'
  );
  expect(closeIcon).toHaveStyleRule('height', '1.25rem');
  expect(closeIcon).toHaveStyleRule('width', '1.25rem');
  const closeIconPath = container.querySelector(
    '[class^="StyledSVG-VDS"][aria-label="close icon"]'
  );
  expect(closeIconPath).toHaveAttribute('fill', '#000000');
  expect(
    closeIcon.querySelector(
      'path[d="M11.59,10.8l7.11,7.1-.8.8-7.1-7.11L3.7,18.7l-.8-.8L10,10.8,2.9,3.7l.8-.8L10.8,10,17.9,2.9l.8.8Z"]'
    )
  ).toBeTruthy();
  const cBt = container.querySelector(
    'button[class^="StyledButton-VDS"][aria-label="Notification Close"]'
  );
  //VDS Button styles
  const bt = container.querySelector(
    'button[class^="StyledButton"][aria-label="Button one"]'
  );
  expect(bt).toHaveStyleRule('font-size', '0.75rem');
  expect(bt).toHaveStyleRule('font-weight', '700');
  expect(bt).toHaveStyleRule('line-height', '1rem');
  expect(bt).toHaveStyleRule('border', '0.0625rem solid #000000');
  expect(bt).toHaveStyleRule('color', '#000000');
  expect(bt).toHaveStyleRule('background-color', 'transparent');
  //Content area styles
  const ca = container.querySelector('[class^="AlertWrapper"][type="info"]');
  expect(ca).toHaveStyleRule('padding', '1.25rem');
  //container border radius
  expect(ca).toHaveStyleRule('border-radius', '0.25rem');
  expect(ca).toHaveStyleRule('box-sizing', 'border-box');
  //container bg(Info)
  expect(ca).toHaveStyleRule('background-color', '#e3f2fd');
  //width - Maximum (Desktop/Tablet) - Not-Full-bleed
  const wr = container.querySelector('[class^="StyledDiv-VDS"]');
  expect(wr).toHaveStyleRule('max-width', '1272px');
  expect(wr).toHaveStyleRule('width', '100%');
});

test('<Notifications Styles (type=info) inverted>', () => {
  const { container } = render(
    <Notification
      title="Title"
      type="info"
      subtitle="Lorem ipsum"
      surface="dark"
      buttonData={[
        {
          children: 'Button one',
        },
      ]}
    />
  );
  //Notification Icon(Error) - name, size and color
  const nIcon = container.querySelector(
    '[class^="IconSVGWrapper"][aria-label="info icon"]'
  );
  expect(nIcon).toHaveStyleRule('height', '1.25rem');
  expect(nIcon).toHaveStyleRule('width', '1.25rem');
  expect(nIcon).toHaveStyleRule('fill', '#ffffff', {
    modifier: `svg path`,
  });
  //Title styles
  const title = container.querySelector('p[class^="StyledBody"][id^="title"]');
  expect(title).toHaveStyleRule('font-size', '1rem');
  expect(title).toHaveStyleRule('font-weight', '700');
  expect(title).toHaveStyleRule('line-height', '1.25rem');
  expect(title).toHaveStyleRule(
    'font-family',
    'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
  );
  expect(title).toHaveStyleRule('color', '#ffffff');
  expect(title).toHaveStyleRule('text-decoration', 'none');
  //Text(subtitle) styles
  const subtitle = container.querySelector(
    'p[class^="StyledBody"][id^="subtitle"]'
  );
  expect(subtitle).toHaveStyleRule('font-size', '1rem');
  expect(subtitle).toHaveStyleRule('font-weight', '400');
  expect(subtitle).toHaveStyleRule('line-height', '1.25rem');
  expect(subtitle).toHaveStyleRule(
    'font-family',
    'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
  );
  expect(subtitle).toHaveStyleRule('color', '#ffffff');
  expect(subtitle).toHaveStyleRule('text-decoration', 'none');
  //Close Button - name, size and color
  const closeIcon = container.querySelector(
    '[class^="StyledSVG-VDS"][aria-label="close icon"]'
  );
  expect(closeIcon).toHaveStyleRule('height', '1.25rem');
  expect(closeIcon).toHaveStyleRule('width', '1.25rem');
  const closeIconPath = container.querySelector(
    '[class^="StyledSVG-VDS"][aria-label="close icon"]'
  );
  expect(closeIconPath).toHaveAttribute('fill', '#ffffff');
  expect(
    closeIcon.querySelector(
      'path[d="M11.59,10.8l7.11,7.1-.8.8-7.1-7.11L3.7,18.7l-.8-.8L10,10.8,2.9,3.7l.8-.8L10.8,10,17.9,2.9l.8.8Z"]'
    )
  ).toBeTruthy();
  const cBt = container.querySelector(
    'button[class^="StyledButton-VDS"][aria-label="Notification Close"]'
  );
  //VDS Button styles
  const bt = container.querySelector(
    'button[class^="StyledButton"][aria-label="Button one"]'
  );
  expect(bt).toHaveStyleRule('font-size', '0.75rem');
  expect(bt).toHaveStyleRule('font-weight', '700');
  expect(bt).toHaveStyleRule('line-height', '1rem');
  expect(bt).toHaveStyleRule('border', '0.0625rem solid #ffffff');
  expect(bt).toHaveStyleRule('color', '#ffffff');
  expect(bt).toHaveStyleRule('background-color', 'transparent');
  //Content area styles
  const ca = container.querySelector('[class^="AlertWrapper"][type="info"]');
  expect(ca).toHaveStyleRule('padding', '1.25rem');
  //container border radius
  expect(ca).toHaveStyleRule('border-radius', '0.25rem');
  expect(ca).toHaveStyleRule('box-sizing', 'border-box');
  //container bg(Info)
  expect(ca).toHaveStyleRule('background-color', '#002c4d');
  //width - Maximum (Desktop/Tablet) - Not-Full-bleed
  const wr = container.querySelector('[class^="StyledDiv-VDS"]');
  expect(wr).toHaveStyleRule('max-width', '1272px');
  expect(wr).toHaveStyleRule('width', '100%');
});

test('<Notifications Styles (type=warning)>', () => {
  const { container } = render(
    <Notification
      title="Title"
      type="warning"
      subtitle="Lorem ipsum"
      buttonData={[
        {
          children: 'Button one',
        },
      ]}
    />
  );
  //Notification Icon(Error) - name, size and color
  const nIcon = container.querySelector(
    '[class^="IconSVGWrapper"][aria-label="warning icon"]'
  );
  expect(nIcon).toHaveStyleRule('height', '1.25rem');
  expect(nIcon).toHaveStyleRule('width', '1.25rem');
  expect(nIcon).toHaveStyleRule('fill', '#000000', {
    modifier: `svg path`,
  });
  //Title styles
  const title = container.querySelector('p[class^="StyledBody"][id^="title"]');
  expect(title).toHaveStyleRule('font-size', '1rem');
  expect(title).toHaveStyleRule('font-weight', '700');
  expect(title).toHaveStyleRule('line-height', '1.25rem');
  expect(title).toHaveStyleRule(
    'font-family',
    'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
  );
  expect(title).toHaveStyleRule('color', '#000000');
  expect(title).toHaveStyleRule('text-decoration', 'none');
  //Text(subtitle) styles
  const subtitle = container.querySelector(
    'p[class^="StyledBody"][id^="subtitle"]'
  );
  expect(subtitle).toHaveStyleRule('font-size', '1rem');
  expect(subtitle).toHaveStyleRule('font-weight', '400');
  expect(subtitle).toHaveStyleRule('line-height', '1.25rem');
  expect(subtitle).toHaveStyleRule(
    'font-family',
    'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
  );
  expect(subtitle).toHaveStyleRule('color', '#000000');
  expect(subtitle).toHaveStyleRule('text-decoration', 'none');
  //Close Button - name, size and color
  const closeIcon = container.querySelector(
    '[class^="StyledSVG-VDS"][aria-label="close icon"]'
  );
  expect(closeIcon).toHaveStyleRule('height', '1.25rem');
  expect(closeIcon).toHaveStyleRule('width', '1.25rem');
  const closeIconPath = container.querySelector(
    '[class^="StyledSVG-VDS"][aria-label="close icon"]'
  );
  expect(closeIconPath).toHaveAttribute('fill', '#000000');
  expect(
    closeIcon.querySelector(
      'path[d="M11.59,10.8l7.11,7.1-.8.8-7.1-7.11L3.7,18.7l-.8-.8L10,10.8,2.9,3.7l.8-.8L10.8,10,17.9,2.9l.8.8Z"]'
    )
  ).toBeTruthy();
  const cBt = container.querySelector(
    'button[class^="StyledButton-VDS"][aria-label="Notification Close"]'
  );
  //VDS Button styles
  const bt = container.querySelector(
    'button[class^="StyledButton"][aria-label="Button one"]'
  );
  expect(bt).toHaveStyleRule('font-size', '0.75rem');
  expect(bt).toHaveStyleRule('font-weight', '700');
  expect(bt).toHaveStyleRule('line-height', '1rem');
  expect(bt).toHaveStyleRule('border', '0.0625rem solid #000000');
  expect(bt).toHaveStyleRule('color', '#000000');
  expect(bt).toHaveStyleRule('background-color', 'transparent');
  //Content area styles
  const ca = container.querySelector('[class^="AlertWrapper"][type="warning"]');
  expect(ca).toHaveStyleRule('padding', '1.25rem');
  //container border radius
  expect(ca).toHaveStyleRule('border-radius', '0.25rem');
  expect(ca).toHaveStyleRule('box-sizing', 'border-box');
  //container bg(Info)
  expect(ca).toHaveStyleRule('background-color', '#fff9de');
  //width - Maximum (Desktop/Tablet) - Not-Full-bleed
  const wr = container.querySelector('[class^="StyledDiv-VDS"]');
  expect(wr).toHaveStyleRule('max-width', '1272px');
  expect(wr).toHaveStyleRule('width', '100%');
});

test('<Notifications Styles (type=warning) inverted>', () => {
  const { container } = render(
    <Notification
      title="Title"
      type="warning"
      subtitle="Lorem ipsum"
      surface="dark"
      buttonData={[
        {
          children: 'Button one',
        },
      ]}
    />
  );
  //Notification Icon(Error) - name, size and color
  const nIcon = container.querySelector(
    '[class^="IconSVGWrapper"][aria-label="warning icon"]'
  );
  expect(nIcon).toHaveStyleRule('height', '1.25rem');
  expect(nIcon).toHaveStyleRule('width', '1.25rem');
  expect(nIcon).toHaveStyleRule('fill', '#ffffff', {
    modifier: `svg path`,
  });
  //Title styles
  const title = container.querySelector('p[class^="StyledBody"][id^="title"]');
  expect(title).toHaveStyleRule('font-size', '1rem');
  expect(title).toHaveStyleRule('font-weight', '700');
  expect(title).toHaveStyleRule('line-height', '1.25rem');
  expect(title).toHaveStyleRule(
    'font-family',
    'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
  );
  expect(title).toHaveStyleRule('color', '#ffffff');
  expect(title).toHaveStyleRule('text-decoration', 'none');
  //Text(subtitle) styles
  const subtitle = container.querySelector(
    'p[class^="StyledBody"][id^="subtitle"]'
  );
  expect(subtitle).toHaveStyleRule('font-size', '1rem');
  expect(subtitle).toHaveStyleRule('font-weight', '400');
  expect(subtitle).toHaveStyleRule('line-height', '1.25rem');
  expect(subtitle).toHaveStyleRule(
    'font-family',
    'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
  );
  expect(subtitle).toHaveStyleRule('color', '#ffffff');
  expect(subtitle).toHaveStyleRule('text-decoration', 'none');
  //Close Button - name, size and color
  const closeIcon = container.querySelector(
    '[class^="StyledSVG-VDS"][aria-label="close icon"]'
  );
  expect(closeIcon).toHaveStyleRule('height', '1.25rem');
  expect(closeIcon).toHaveStyleRule('width', '1.25rem');
  const closeIconPath = container.querySelector(
    '[class^="StyledSVG-VDS"][aria-label="close icon"]'
  );
  expect(closeIconPath).toHaveAttribute('fill', '#ffffff');
  expect(
    closeIcon.querySelector(
      'path[d="M11.59,10.8l7.11,7.1-.8.8-7.1-7.11L3.7,18.7l-.8-.8L10,10.8,2.9,3.7l.8-.8L10.8,10,17.9,2.9l.8.8Z"]'
    )
  ).toBeTruthy();
  const cBt = container.querySelector(
    'button[class^="StyledButton-VDS"][aria-label="Notification Close"]'
  );
  //VDS Button styles
  const bt = container.querySelector(
    'button[class^="StyledButton"][aria-label="Button one"]'
  );
  expect(bt).toHaveStyleRule('font-size', '0.75rem');
  expect(bt).toHaveStyleRule('font-weight', '700');
  expect(bt).toHaveStyleRule('line-height', '1rem');
  expect(bt).toHaveStyleRule('border', '0.0625rem solid #ffffff');
  expect(bt).toHaveStyleRule('color', '#ffffff');
  expect(bt).toHaveStyleRule('background-color', 'transparent');
  //Content area styles
  const ca = container.querySelector('[class^="AlertWrapper"][type="warning"]');
  expect(ca).toHaveStyleRule('padding', '1.25rem');
  //container border radius
  expect(ca).toHaveStyleRule('border-radius', '0.25rem');
  expect(ca).toHaveStyleRule('box-sizing', 'border-box');
  //container bg(Info)
  expect(ca).toHaveStyleRule('background-color', '#4b3f04');
  //width - Maximum (Desktop/Tablet) - Not-Full-bleed
  const wr = container.querySelector('[class^="StyledDiv-VDS"]');
  expect(wr).toHaveStyleRule('max-width', '1272px');
  expect(wr).toHaveStyleRule('width', '100%');
});

test('<Notifications default Styles in Mobile>', () => {
  const { container } = render(
    <Notification
      title="Title"
      subtitle="Lorem ipsum"
      viewport="mobile"
      buttonData={[
        {
          children: 'Button one',
        },
      ]}
    />
  );
  //Notification Icon(Success) - name, size and color
  const nIcon = container.querySelector(
    '[class^="IconSVGWrapper"][aria-label="checkmark-alt icon"]'
  );
  expect(nIcon).toHaveStyleRule('height', '1rem');
  expect(nIcon).toHaveStyleRule('width', '1rem');
  expect(nIcon).toHaveStyleRule('fill', '#000000', {
    modifier: `svg path`,
  });
  //Title styles
  const title = container.querySelector('p[class^="StyledBody"][id^="title"]');
  expect(title).toHaveStyleRule('font-size', '0.75rem');
  expect(title).toHaveStyleRule('font-weight', '700');
  expect(title).toHaveStyleRule('line-height', '1rem');
  expect(title).toHaveStyleRule(
    'font-family',
    'Verizon-NHG-eTX,Helvetica,Arial,Sans-serif'
  );
  expect(title).toHaveStyleRule('color', '#000000');
  expect(title).toHaveStyleRule('text-decoration', 'none');
  //Text(subtitle) styles
  const subtitle = container.querySelector(
    'p[class^="StyledBody"][id^="subtitle"]'
  );
  expect(subtitle).toHaveStyleRule('font-size', '0.75rem');
  expect(subtitle).toHaveStyleRule('font-weight', '400');
  expect(subtitle).toHaveStyleRule('line-height', '1rem');
  expect(subtitle).toHaveStyleRule(
    'font-family',
    'Verizon-NHG-eTX,Helvetica,Arial,Sans-serif'
  );
  expect(subtitle).toHaveStyleRule('color', '#000000');
  expect(subtitle).toHaveStyleRule('text-decoration', 'none');
  //Close Button - name, size and color
  const closeIcon = container.querySelector(
    '[class^="StyledSVG-VDS"][aria-label="close icon"]'
  );
  expect(closeIcon).toHaveStyleRule('height', '1rem');
  expect(closeIcon).toHaveStyleRule('width', '1rem');
  const closeIconPath = container.querySelector(
    '[class^="StyledSVG-VDS"][aria-label="close icon"]'
  );
  expect(closeIconPath).toHaveAttribute('fill', '#000000');
  expect(
    closeIcon.querySelector(
      'path[d="M11.59,10.8l7.11,7.1-.8.8-7.1-7.11L3.7,18.7l-.8-.8L10,10.8,2.9,3.7l.8-.8L10.8,10,17.9,2.9l.8.8Z"]'
    )
  ).toBeTruthy();
  const cBt = container.querySelector(
    'button[class^="StyledButton-VDS"][aria-label="Notification Close"]'
  );
  //VDS Button styles
  const bt = container.querySelector(
    'button[class^="StyledButton"][aria-label="Button one"]'
  );
  expect(bt).toHaveStyleRule('font-size', '0.75rem');
  expect(bt).toHaveStyleRule('font-weight', '700');
  expect(bt).toHaveStyleRule('line-height', '1rem');
  expect(bt).toHaveStyleRule('border', '0.0625rem solid #000000');
  expect(bt).toHaveStyleRule('color', '#000000');
  expect(bt).toHaveStyleRule('background-color', 'transparent');
  //Content area styles
  const ca = container.querySelector('[class^="AlertWrapper"][type="success"]');
  expect(ca).toHaveStyleRule('padding', '1.25rem');
  //container border radius
  expect(ca).toHaveStyleRule('border-radius', '0.25rem');
  expect(ca).toHaveStyleRule('box-sizing', 'border-box');
  //container bg(Success)
  expect(ca).toHaveStyleRule('background-color: #d6f2e0;');
  //width - Maximum (Desktop/Tablet) - Not-Full-bleed
  const wr = container.querySelector('[class^="StyledDiv-VDS"]');
  expect(wr).toHaveStyleRule('max-width', '1272px');
  expect(wr).toHaveStyleRule('width', '100%');
});

test('<Notifications Styles Full Bleed>', () => {
  const { container } = render(
    <Notification
      title="Title"
      subtitle="Lorem ipsum"
      fullBleed
      buttonData={[
        {
          children: 'Button one',
        },
      ]}
    />
  );
  //width - Maximum (Desktop/Tablet) - Full-bleed
  const ca = container.querySelector('[class^="AlertWrapper"][type="success"]');
  const wr = container.querySelector('[class^="StyledDiv-VDS"]');
  expect(wr).toHaveStyleRule('width', '100%');
  //container border radius Zero
  expect(ca).toHaveStyleRule('border-radius', '0');
  expect(ca).toHaveStyleRule('box-sizing', 'border-box');
});

test('<Notifications Styles Inline>', () => {
  const { container } = render(
    <Notification title="Title" subtitle="Lorem ipsum" inline />
  );
  //width - Maximum (Desktop/Tablet) - Inline
  const ca = container.querySelector('[class^="AlertWrapper"][type="success"]');
  const wr = container.querySelector('[class^="StyledDiv-VDS"]');
  expect(wr).toHaveStyleRule('max-width', '1272px');
  expect(ca).toHaveStyleRule('margin', '0 1.25rem');
  expect(wr).toHaveStyleRule('width', '100%');
  //container border radius
  expect(ca).toHaveStyleRule('border-radius', '0.25rem');
  expect(ca).toHaveStyleRule('box-sizing', 'border-box');
  //Minimum Height
  expect(ca).toHaveStyleRule('min-height', '60px');
});

test('<Notifications Styles Full Bleed in Mobile>', () => {
  const { container } = render(
    <Notification
      title="Title"
      subtitle="Lorem ipsum"
      fullBleed
      viewport="mobile"
      buttonData={[
        {
          children: 'Button one',
        },
      ]}
    />
  );
  //width - Maximum (Desktop/Tablet) - Full-bleed
  const ca = container.querySelector('[class^="AlertWrapper"][type="success"]');
  const wr = container.querySelector('[class^="StyledDiv-VDS"]');
  expect(wr).toHaveStyleRule('width', '100%');
  //container border radius Zero
  expect(ca).toHaveStyleRule('border-radius', '0');
  expect(ca).toHaveStyleRule('box-sizing', 'border-box');
});

test('<Notifications Styles Inline in Mobile>', () => {
  const { container } = render(
    <Notification
      title="Title"
      subtitle="Lorem ipsum"
      inline
      viewport="mobile"
    />
  );
  //width - Maximum (Desktop/Tablet) - Inline
  const ca = container.querySelector('[class^="AlertWrapper"][type="success"]');
  const wr = container.querySelector('[class^="StyledDiv-VDS"]');
  expect(wr).toHaveStyleRule('max-width', '1272px');
  expect(ca).toHaveStyleRule('margin', '0 1rem');
  expect(wr).toHaveStyleRule('width', '100%');
  //container border radius
  expect(ca).toHaveStyleRule('border-radius', '0.25rem');
  expect(ca).toHaveStyleRule('box-sizing', 'border-box');
  //Minimum Height
  expect(ca).toHaveStyleRule('min-height', '48px');
});

test('<Notifications focusring styles on Keyboard Focus>', () => {
  const { container } = render(
    <>
      <button id="bt" />
      <Notification
        title="Title"
        subtitle="Lorem ipsum"
        buttonData={[
          {
            children: 'Button one',
          },
        ]}
      />
    </>
  );
  const btt = container.querySelector('#bt');
  const cBt = container.querySelector(
    'button[class^="StyledButton"][aria-label="Notification Close"]'
  );
  fireEvent.click(btt);
  fireEvent.keyDown(btt, {
    key: 'Tab',
    keyCode: 9,
    charCode: 9,
  });
  expect(cBt).toHaveStyleRule('border', '0.0625rem dashed  #000000', {
    modifier: `:focus:not(:hover)::before`,
  });
});

test('<Notifications Inverted focusring styles on Keyboard Focus>', () => {
  const { container } = render(
    <>
      <button id="bt" />
      <Notification
        title="Title"
        subtitle="Lorem ipsum"
        surface="dark"
        buttonData={[
          {
            children: 'Button one',
          },
        ]}
      />
    </>
  );
  const btt = container.querySelector('#bt');
  const cBt = container.querySelector(
    'button[class^="StyledButton"][aria-label="Notification Close"]'
  );
  fireEvent.click(btt);
  fireEvent.keyDown(btt, {
    key: 'Tab',
    keyCode: 9,
    charCode: 9,
  });
  expect(cBt).toHaveStyleRule('border', '0.0625rem dashed  #ffffff', {
    modifier: `:focus:not(:hover)::before`,
  });
});

test('<Notification>', async () => {
  const { container, getByTestId, queryByTestId } = render(
    <Notification>Default Alert</Notification>
  );

  // alert should be mounted
  expect(getByTestId('alert')).not.toBe(null);
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

//to test _animateIn and _animateOut keyframes functions
Object.defineProperties(window.HTMLElement.prototype, {
  clientHeight: {
    get: function() {
      return this.id === 'wrapper' ? 200 : 0;
    },
  },
});

beforeEach(() => jest.useFakeTimers());
afterEach(cleanup);

test('<Notification disableAnimation>', async () => {
  const { container, getByTestId, rerender } = render(
    <Notification disableAnimation>Default Alert</Notification>
  );

  // alert should be mounted
  expect(getByTestId('alert')).not.toBe(null);

  rerender(
    <Notification showAlert={false} disableAnimation>
      Default Alert
    </Notification>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('<Notification type="warning">', () => {
  const { container } = render(
    <Notification type="warning">Alert</Notification>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('<Notification type="info">', () => {
  const { container } = render(<Notification type="info">Alert</Notification>);

  expect(container.firstChild).toMatchSnapshot();
});

test('<Notification type="success">', () => {
  const { container } = render(
    <Notification type="success">Alert</Notification>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('<Notification type="error">', () => {
  const { container } = render(<Notification type="error">Alert</Notification>);

  expect(container.firstChild).toMatchSnapshot();
});

test('<Notification type="warning">', () => {
  const { container } = render(
    <Notification type="warning">Alert</Notification>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('<Notification type="info">', () => {
  const { container } = render(<Notification type="info">Alert</Notification>);

  expect(container.firstChild).toMatchSnapshot();
});

test('<Notification type="success">', () => {
  const { container } = render(
    <Notification type="success">Alert</Notification>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('<Notification type="error">', () => {
  const { container } = render(<Notification type="error">Alert</Notification>);

  expect(container.firstChild).toMatchSnapshot();
});

test('<Notification showCloseIcon={false}>', () => {
  const { container } = render(
    <Notification type="warning" showCloseIcon={false}>
      Alert
    </Notification>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('<Notification hideCloseButton>', () => {
  const { container } = render(
    <Notification type="warning" hideCloseButton>
      Alert
    </Notification>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('<Notification opened={true}> with hideCloseButton still set to true should throw warning', () => {
  const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});

  const { getByTestId } = render(
    <Notification type="warning" opened={true}>
      Alert
    </Notification>
  );

  fireEvent.click(getByTestId('Notification-close-button'));
});

test('<Notification 1.0> Should render title and subtitle', () => {
  const { getByText, container } = render(
    <Notification
      type="success"
      title="test title"
      subtitle="test subtitle"
    ></Notification>
  );

  const titleElement = getByText('test title');
  const subtitleElement = getByText('test subtitle');
  expect(titleElement).toBeTruthy();
  expect(subtitleElement).toBeTruthy();
  expect(container.firstChild).toMatchSnapshot();
});

test('<Notification 1.0> should render with unMountTime', () => {
  const { container } = render(
    <Notification
      unMountTime={850}
      type="success"
      title="test title"
    ></Notification>
  );

  jest.advanceTimersByTime(850);

  expect(container.firstChild).toMatchSnapshot();
});

test('<Notification 1.0> should render with fullBleed', async () => {
  const { container } = render(
    <Notification fullBleed type="success" title="test title"></Notification>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('<Notification 1.0> should render with inline', async () => {
  const { getByTestId } = render(
    <Notification inline type="success" title="test title"></Notification>
  );
  const alert = getByTestId('alert');
  expect(alert).toHaveStyleRule(
    'margin',
    '0 ' + calculateRem(LayoutTokens.space['5X'].value)
  );
});

test('<Notification 1.0> should render properly in ie browsers', async () => {
  global.navigator.userAgent =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36';
  const { container } = render(
    <Notification
      inlineTreatment
      type="success"
      title="test title"
      ButtonGroup={ButtonGroup}
    ></Notification>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('<Notification 1.0> should render properly in apple devices', () => {
  global.navigator.userAgent =
    'Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148';

  const { container, rerender } = render(
    <Notification
      inlineTreatment
      type="success"
      title="test title"
      ButtonGroup={ButtonGroup}
    />
  );

  //rerender with subtitle
  rerender(
    <Notification
      inlineTreatment
      type="success"
      title="test title"
      subtitle="test sub title"
      ButtonGroup={ButtonGroup}
    />
  );
  expect(container.firstChild).toMatchSnapshot();
});

test('VDS Notification', () => {
  const { container } = render(
    <Notification
      type="warning"
      minHeight="52px"
      maxWidth={'1272px'}
      unMountTime={850}
      fullBleed={true}
      ButtonGroup={ButtonGroup}
    >
      Alert
    </Notification>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('<Notification 1.0 disableAnimation>', () => {
  const { container } = render(
    <Notification
      disableAnimation
      type="success"
      title="test title"
      ButtonGroup={ButtonGroup}
    ></Notification>
  );

  const wrapper = container.firstChild.firstChild;

  fireEvent.click(wrapper);
  expect(container.firstChild).toMatchSnapshot();
});

test('<Notification 1.0 disableAnimation>  should be disappeared when click close button', () => {
  const { getByTestId } = render(
    <Notification
      disableAnimation
      type="success"
      title="test title"
    ></Notification>
  );

  const alert = getByTestId('alert');
  expect(alert).toBeInTheDocument();
  expect(alert).toHaveStyle('display: flex');
  fireEvent.click(getByTestId('Notification-close-button'));
  expect(alert).toHaveStyle('display: none');
});

test('<Notification 1.0> should be disappeared when click close button', () => {
  const { container, getByTestId } = render(
    <Notification
      type="success"
      title="test title"
      unMountTime={450}
      id="wrapper"
    ></Notification>
  );

  const alert = getByTestId('alert');
  expect(alert).toBeInTheDocument();

  //snapshot should be with animation styles
  expect(container.firstChild).toMatchSnapshot();

  fireEvent.click(getByTestId('Notification-close-button'));
  jest.advanceTimersByTime(450);
  expect(alert).not.toBeInTheDocument();
});

// test('<Notification 1.0> should render with buttonData', () => {
//   const { container } = render(
//     <Notification
//
//
//
//
//
//       type="success"
//       title="test title"
//       buttonData={[
//         {
//           children: 'Text me when service is restored',
//           onClick: e => alert('Button clicked!'),
//         },
//         {
//           children: 'Learn more!',
//           onClick: e => alert('Button clicked!'),
//         },
//       ]}
//       ButtonGroup={ButtonGroup}
//     ></Notification>
//   );

//   expect(container.firstChild).toMatchSnapshot();
// });

// test('<Notification 1.0> should render with 1 buttonData', () => {
//   const { container } = render(
//     <Notification
//
//
//
//
//
//       type="success"
//       title="test title"
//       buttonData={[
//         {
//           children: 'Text me when service is restored',
//           onClick: e => alert('Button clicked!'),
//         },
//       ]}
//       ButtonGroup={ButtonGroup}
//     ></Notification>
//   );

//   expect(container.firstChild).toMatchSnapshot();
// });

// test('<Notification 1.0> should render maximum 2 buttons from buttonData', () => {
//   const { container } = render(
//     <Notification
//
//
//
//
//
//       type="success"
//       title="test title"
//       buttonData={[
//         {
//           children: 'Text me when service is restored',
//           onClick: e => alert('Button clicked!'),
//         },
//         {
//           children: 'Learn more!',
//           onClick: e => alert('Button clicked!'),
//         },
//         {
//           children: 'Should not show!',
//           onClick: e => alert('Button clicked!'),
//         },
//       ]}
//       ButtonGroup={ButtonGroup}
//     ></Notification>
//   );

//   expect(container.firstChild).toMatchSnapshot();
// });

test('<Notification 1.0 layout="vertical">', () => {
  const { container } = render(
    <Notification
      disableAnimation318
      type="success"
      title="test title"
      layout="vertical"
    ></Notification>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('<Notification 1.0 layout="horizontal">', () => {
  const { container } = render(
    <Notification
      disableAnimation
      type="success"
      title="test title"
      layout="horizontal"
    ></Notification>
  );

  expect(container.firstChild).toMatchSnapshot();
});

// test('<Notification 1.0 layout="horizontal"> should render with buttonData', () => {
//   const { container, rerender } = render(
//     <Notification
//
//
//
//
//       disableAnimation318
//
//       type="success"
//       title="test title"
//       layout="horizontal"
//       buttonData={[
//         {
//           children: 'Text me when service is restored',
//           onClick: e => alert('Button clicked!'),
//         },
//         {
//           children: 'Learn more!',
//           onClick: e => alert('Button clicked!'),
//         },
//       ]}
//       ButtonGroup={ButtonGroup}
//     ></Notification>
//   );

//   expect(container.firstChild).toMatchSnapshot();
// });

// test('<Notification viewport={"mobile"}>', () => {
//   const { container, rerender } = render(
//     <Notification type="success" viewport={'mobile'}>
//       Chlidren
//     </Notification>
//   );

//   expect(container.firstChild).toMatchSnapshot();
// });

// Notification Containter
test('<NotificationContainer 0.1>', () => {
  const notificationItems = [
    {
      type: 'info',
      showCloseIcon: true,
      disableAnimation: false,
      children: <p>A - Info example...</p>,
    },
    {
      type: 'success',
      showCloseIcon: true,
      disableAnimation: false,
      children: <p>B - Success example...</p>,
    },
  ];
  const { container } = render(
    <NotificationContainer
      childArray={notificationItems}
    ></NotificationContainer>
  );

  expect(container.firstChild).toMatchSnapshot();
});
test('<NotificationContainer 1.0>', () => {
  const notificationItems = [
    {
      type: 'info',
      hideCloseButton: false,
      disableAnimation: false,
      children: <p>A - Info example...</p>,
    },
    {
      type: 'warning',
      hideCloseButton: false,
      disableAnimation: false,
      children: <p>B - Warning example...</p>,
    },
  ];
  const { container } = render(
    <NotificationContainer
      childArray={notificationItems}
    ></NotificationContainer>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('<NotificationContainer> should render with renderNotification prop that passes new Notification component', () => {
  const notificationItems = [
    {
      type: 'error',
      hideCloseButton: false,
      disableAnimation: false,
      children: <p>C - Error example...</p>,
    },
    {
      type: 'success',
      hideCloseButton: false,
      disableAnimation: false,
      children: <p>D - Success example...</p>,
    },
  ];
  const newNotification = props => {
    return (
      <Notification
        {...props}
        disableAnimation
        minHeight="52px"
        maxWidth={'1272px'}
      />
    );
  };
  const { container, rerender } = render(
    <NotificationContainer
      renderNotification={newNotification}
      childArray={notificationItems}
    />
  );

  rerender(
    <NotificationContainer
      renderNotification={newNotification}
      childArray={[notificationItems[1]]}
    />
  );

  expect(container.firstChild).toMatchSnapshot();
});
