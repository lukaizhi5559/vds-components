import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { Label, ErrorText, HelperText } from './elements';

// mock cuid
jest.mock('@vds-core/utilities', () => {
  const originalModule = jest.requireActual('@vds-core/utilities');
  return {
    __esModule: true, // Use it when dealing with esModules
    ...originalModule,
    generateUUID: jest.fn(() => 'test'),
  };
});

describe('<FormElements />', () => {
  test('test label render with default props', () => {
    const { container } = render(<Label />);
    expect(container).toMatchSnapshot();
  });

  test('test label inverted', () => {
    const { container } = render(<Label surface="dark" />);
    expect(container).toMatchSnapshot();
  });

  test('test label disabled', () => {
    const { container } = render(<Label disabled label={'label'} />);
    expect(container).toMatchSnapshot();
  });

  test('test label inverted and disabled', () => {
    const { container } = render(<Label surface="dark" disabled />);
    expect(container).toMatchSnapshot();
  });

  // test('test label ifHasTooltip and type : securityCode', () => {
  //   const { container } = render(
  //     <Label
  //       tooltipTitle={'Tooltip Heading'}
  //       tooltipContent={'This is the content for tooltip'}
  //       type={'securityCode'}
  //     />
  //   );
  //   expect(container).toMatchSnapshot();
  // });

  test('test Label with cardType as amex', () => {
    const { container } = render(
      <Label type={'securityCode'} cardType={'amex'} surface="dark" />
    );
    const labelIcon = container.querySelector('[data-testid="tooltip"]');
    fireEvent.click(labelIcon);
    expect(container).toMatchSnapshot();
  });

  test('test Label with cardType as other', () => {
    const { container } = render(
      <Label type={'securityCode'} cardType={'other'} />
    );
    const labelIcon = container.querySelector('[data-testid="tooltip"]');
    fireEvent.click(labelIcon);
    expect(container).toMatchSnapshot();
  });

  // test('test Label with no type but only toolTipTitle', () => {
  //   const { container } = render(
  //     <Label
  //       tooltipTitle={'Tooltip Heading'}
  //       tooltipContent={'This is the content for tooltip'}
  //       cardType={'other'}
  //     />
  //   );
  //   expect(container).toMatchSnapshot();
  // });

  test('test label onClick', () => {
    const { container } = render(<Label label={'to display test label'} />);
    const labelDom = container.firstChild;
    fireEvent.click(labelDom);
  });

  test('test label with required false ', async () => {
    const { container } = render(<Label label={'label'} required={false} />);
    expect(container).toMatchSnapshot();
  });

  test('test label with required false with disabled and inverted ', () => {
    const { container } = render(
      <Label label={'label'} required={false} disabled surface="dark" />
    );
    expect(container).toMatchSnapshot();
  });

  test('test label with required false , inverted and not disabled ', () => {
    const { container } = render(
      <Label label={'label'} required={false} surface="dark" />
    );
    expect(container).toMatchSnapshot();
  });

  test('test label with required false , not inverted and disabled ', () => {
    const { container } = render(
      <Label label={'label'} required={false} disabled />
    );
    expect(container).toMatchSnapshot();
  });

  test('test label with overflowEllipsis true ', () => {
    const { container } = render(
      <Label label={'label'} overflowEllipsis={true} />
    );
    expect(container).toMatchSnapshot();
  });

  test('test label with helperTextPlacement', () => {
    const { container } = render(
      <Label
        label={'My Label text'}
        helperText={'This is to help'}
        helperTextPlacement={'right'}
      />
    );
    expect(container).toMatchSnapshot();
  });

  /** Test cases for HelperText  */
  test('test helpertestComponent with helperTextPlacement', () => {
    const { container } = render(
      <HelperText
        helperText={'This is to help'}
        helperTextPlacement={'right'}
      />
    );

    expect(container).toMatchSnapshot();
  });

  test('test helpertestComponent with disable and not inverted', () => {
    const { container } = render(
      <HelperText
        helperText={'This is to help'}
        helperTextPlacement={'right'}
        disabled
      />
    );

    expect(container).toMatchSnapshot();
  });

  test('test helpertestComponent with disable and inverted', () => {
    const { container } = render(
      <HelperText
        helperText={'This is to help'}
        helperTextPlacement={'right'}
        disabled
        surface="dark"
      />
    );

    expect(container).toMatchSnapshot();
  });

  test('test helpertestComponent with not disable and inverted', () => {
    const { container } = render(
      <HelperText
        helperText={'This is to help'}
        helperTextPlacement={'right'}
        surface="dark"
      />
    );

    expect(container).toMatchSnapshot();
  });

  /** test cases for ErrorText */
  test('test erroText with  errorLabelSpacing', () => {
    const { container } = render(<ErrorText errorLabelSpacing={'30px'} />);
    const errorDiv = container.firstChild.firstChild;
    expect(errorDiv).toHaveStyle('margin-top : 30px');
    //expect(container).toMatchSnapshot()
  });

  test('test errorText with error prop true', () => {
    const { getByText, container } = render(
      <ErrorText error={true} errorText={'this has failed'} />
    );
    expect(getByText('this has failed')).toBeTruthy();
  });

  test('test errorText with Success prop true', () => {
    const { getByText, container } = render(
      <ErrorText success={true} successText={'this is success'} />
    );
    expect(getByText('this is success')).toBeTruthy();
  });
  test('test errorText with Success prop tru and inverted', () => {
    const { container } = render(
      <ErrorText
        success={true}
        successText={'this is success'}
        surface="dark"
      />
    );
    expect(container).toMatchSnapshot();
  });
});
