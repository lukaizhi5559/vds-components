import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { Tooltip, TooltipPopover } from '.';
import { calculateRem } from '../../Utilities/src';
import TrailingTooltip from './components/TrailingTooltip';
import styled from 'styled-components';

// mock uuid
jest.mock('@vds-core/utilities', () => {
  const originalModule = jest.requireActual('@vds-core/utilities');
  return {
    __esModule: true, // Use it when dealing with esModules
    ...originalModule,
    generateUUID: jest.fn(() => 'test'),
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

// set up to useFakeTimers because of 200ms delay on actions
beforeEach(() => jest.useFakeTimers());
const longContent = ` Similique in velit vero, libero porro ut. Similique in velit vero, Similique in velit vero, libero porro ut.Similique in velit vero, libero porro ut.libero porro ut. Similique in velit vero, libero porro ut.Similique in velit vero, libero porro ut. Similique in velit vero, libero porro ut. Similique in velit vero, libero porro ut. Similique in velit vero, libero porro ut. Temporibus earum fuga error libero explicabo numquam officia libero explicabo numquam officiLg
  Similique in velit vero, libero porro ut. Similique in velit vero, Similique in velit vero, libero porro ut.Similique in velit vero, libero porro ut.libero porro ut. Similique in velit vero, libero porro ut.Similique in velit vero, libero porro ut. Similique in velit vero, libero porro ut. Similique in velit vero, libero porro ut. Similique in velit vero, libero porro ut. Temporibus earum fuga error libero explicabo numquam officia libero explicabo numquam officiLg
  Similique in velit vero, libero porro ut. Similique in velit vero, Similique in velit vero, libero porro ut.Similique in velit vero, libero porro ut.libero porro ut. Similique in velit vero, libero porro ut.Similique in velit vero, libero porro ut. Similique in velit vero, libero porro ut. Similique in velit vero, libero porro ut. Similique in velit vero, libero porro ut. Temporibus earum fuga error libero explicabo numquam officia libero explicabo numquam officiLg`;

const shortContent =
  'Lorem ipsum dolor sit amet con adipisiLorem ipsum dolor sit amet con adipisicing elit.cing elit.';
const title = 'Lorem Header';
const content = 'Lorem Ipsum';

const CenterContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  overflow: auto;
`;

test('Tooltip default styles', () => {
  const { container, getByTestId } = render(
    <CenterContent>
      <Tooltip title={title} iconFillColor="primary">
        {content}
      </Tooltip>
    </CenterContent>
  );
  const iconBtn = container.querySelector('[data-testid="tooltip"]').lastChild
    .firstChild.firstChild;
  fireEvent.click(iconBtn);
  jest.runAllTimers();
  //Tooltip default Title Font styles
  const titleWrap = container.querySelector('[class^="StyledHeading"]');
  const titleStyles = window.getComputedStyle(titleWrap)._values;
  expect(titleStyles['font-family']).toBe('Verizon-NHG-eTX');
  expect(titleStyles['font-size']).toBe('12px');
  expect(titleStyles['line-height']).toBe('16px');
  expect(titleStyles['font-weight']).toBe('700');
  //Tooltip default Content Font styles
  const contentWrap = container.querySelector('[class^="StyledContent"]');
  const contentStyles = window.getComputedStyle(contentWrap)._values;
  expect(contentStyles['font-family']).toBe('Verizon-NHG-eTX');
  expect(contentStyles['font-size']).toBe('12px');
  expect(contentStyles['line-height']).toBe('16px');
  // expect(contentStyles['font-weight']).toBe('400');

  //Tooltip default Text color
  const tooltipWrap = container.querySelector('[data-testid="dialog"]');
  const tooltipStyles = window.getComputedStyle(tooltipWrap)._values;
  expect(tooltipStyles['color']).toBe('rgb(0, 0, 0)');
  //Tooltip default BackGround color
  expect(tooltipStyles['background-color']).toBe('rgb(255, 255, 255)');
  //Tooltip default Border styles
  expect(tooltipStyles['border']).toBe('0.0625rem solid #000000');
  expect(tooltipStyles['border-radius']).toBe('4px');
  //Tooltip width
  expect(tooltipStyles['max-width']).toBe('14rem');
  expect(tooltipStyles['width']).toBe('14rem');
  //Tooltip max-height
  expect(tooltipStyles['max-height']).toBe('12.75rem');
  //Tooltip min-height
  expect(tooltipStyles['min-height']).toBe('2.5rem');

  //Pointer default BackGround color & Border styles
  const pointerStyles = window.getComputedStyle(tooltipWrap, ':before')._values;
  expect(pointerStyles['background-color']).toBe('rgb(255, 255, 255)');
  expect(pointerStyles['border-width']).toBe('0.0625rem');
  expect(pointerStyles['border-color']).toBe('#000000');
  expect(pointerStyles['transform']).toBe('translateX(-50%)');

  //Icon default color
  const svgIcon = container.querySelector('[class^="StyledSVG-VDS"]');
  expect(svgIcon).toHaveAttribute('fill', '#000000');
  //Icon Hover(Mouse Only) styles
  fireEvent.mouseOver(svgIcon);
  expect(
    svgIcon.hasChildNodes(
      '<path d="M10.80011,1.36129a9.43848,9.43848,0,1,0,9.43848,9.43848A9.43847,9.43847,0,0,0,10.80011,1.36129Zm0,16.877a7.43848,7.43848,0,1,1,7.43848-7.43848A7.43849,7.43849,0,0,1,10.80011,18.23825ZM11.625,7.45849H9.95V5.78344h1.675ZM9.95834,9.11663H11.65v6.69989H9.95834Z" stroke="none" fill="#000000"></path>'
    )
  ).toBeTruthy();
  //Icon Active (Primary and Default) color

  fireEvent.mouseDown(iconBtn);
  expect(iconBtn).toHaveStyleRule('fill', '#6f7171', {
    modifier: `:active svg path`,
  });

  //Spacing - Inner padding(Top, Bottom, Left)
  fireEvent.click(iconBtn);

  expect(tooltipStyles['padding']).toBe('0.75rem 0px 0.75rem 0.75rem');
  //Spacing - Inner padding(Right)
  const dWithoutScrollStyles = window.getComputedStyle(tooltipWrap.firstChild)
    ._values;
  expect(dWithoutScrollStyles['padding-right']).toBe('12px');
  //Spacing - between Title and Content
  expect(titleStyles['margin-bottom']).toBe('4px');
});

test('Tooltip default styles inverted', () => {
  const { container, getByTestId } = render(
    <CenterContent>
      <Tooltip surface="dark" title={title} iconFillColor="primary">
        {content}
      </Tooltip>
    </CenterContent>
  );

  const iconBtn = container.querySelector('[data-testid="tooltip"]').lastChild
    .firstChild.firstChild;
  fireEvent.mouseEnter(iconBtn);
  jest.runAllTimers();
  //Tooltip default Title Font styles
  const titleWrap = container.querySelector('[class^="StyledHeading"]');
  const titleStyles = window.getComputedStyle(titleWrap)._values;
  expect(titleStyles['font-family']).toBe('Verizon-NHG-eTX');
  expect(titleStyles['font-size']).toBe('12px');
  expect(titleStyles['line-height']).toBe('16px');
  expect(titleStyles['font-weight']).toBe('700');
  //Tooltip default Content Font styles
  const contentWrap = container.querySelector('[class^="StyledContent"]');
  const contentStyles = window.getComputedStyle(contentWrap)._values;
  expect(contentStyles['font-family']).toBe('Verizon-NHG-eTX');
  expect(contentStyles['font-size']).toBe('12px');
  expect(contentStyles['line-height']).toBe('16px');
  // expect(contentStyles['font-weight']).toBe('400');

  //Tooltip default Text color
  const tooltipWrap = container.querySelector('[data-testid="dialog"]');
  const tooltipStyles = window.getComputedStyle(tooltipWrap)._values;
  expect(tooltipStyles['color']).toBe('rgb(255, 255, 255)');
  //Tooltip default BackGround color
  expect(tooltipStyles['background-color']).toBe('rgb(0, 0, 0)');
  //Tooltip default Border styles
  expect(tooltipStyles['border']).toBe('0.0625rem solid #ffffff');
  expect(tooltipStyles['border-radius']).toBe('4px');
  //Tooltip width
  expect(tooltipStyles['max-width']).toBe('14rem');
  expect(tooltipStyles['width']).toBe('14rem');
  //Tooltip max-height
  expect(tooltipStyles['max-height']).toBe('12.75rem');
  //Tooltip min-height
  expect(tooltipStyles['min-height']).toBe('2.5rem');

  //Pointer default BackGround color & Border styles
  const pointerStyles = window.getComputedStyle(tooltipWrap, ':before')._values;
  expect(pointerStyles['background-color']).toBe('rgb(0, 0, 0)');
  expect(pointerStyles['border-width']).toBe('0.0625rem');
  expect(pointerStyles['border-color']).toBe('#ffffff');
  expect(pointerStyles['transform']).toBe('translateX(-50%)');

  //Icon default color
  const svgIcon = container.querySelector('[class^="StyledSVG-VDS"]');
  expect(svgIcon).toHaveAttribute('fill', '#ffffff');
  //Icon Hover(Mouse Only) styles
  fireEvent.mouseOver(svgIcon);
  expect(
    svgIcon.hasChildNodes(
      '<path d="M10.80011,1.36129a9.43848,9.43848,0,1,0,9.43848,9.43848A9.43847,9.43847,0,0,0,10.80011,1.36129Zm0,16.877a7.43848,7.43848,0,1,1,7.43848-7.43848A7.43849,7.43849,0,0,1,10.80011,18.23825ZM11.625,7.45849H9.95V5.78344h1.675ZM9.95834,9.11663H11.65v6.69989H9.95834Z" stroke="none" fill="#000000"></path>'
    )
  ).toBeTruthy();
  //Icon Active (Primary and Default) color
  fireEvent.mouseDown(iconBtn);
  expect(iconBtn).toHaveStyleRule('fill', '#a7a7a7', {
    modifier: ':active svg path',
  });
  //Spacing - Inner padding(Top, Bottom, Left)
  fireEvent.click(iconBtn);
  expect(tooltipStyles['padding']).toBe('0.75rem 0px 0.75rem 0.75rem');
  //Spacing - Inner padding(Right)
  const dWithoutScrollStyles = window.getComputedStyle(tooltipWrap.firstChild)
    ._values;
  expect(dWithoutScrollStyles['padding-right']).toBe('12px');
  //Spacing - between Title and Content
  expect(titleStyles['margin-bottom']).toBe('4px');
});

test('Tooltip Icon fill color secondary', () => {
  const { container, getByTestId } = render(
    <CenterContent>
      <Tooltip title={title} iconFillColor="secondary"></Tooltip>
    </CenterContent>
  );
  const svgIcon = container.querySelector('[class^="StyledSVG-VDS"]');
  expect(svgIcon).toHaveAttribute('fill', '#6f7171');
  //Icon Active (Secondary) color
  const iconBtn = container.querySelector('[class^="AnchorIconWrapper-VDS"]');
  fireEvent.mouseDown(iconBtn.lastChild.firstChild.firstChild);
  expect(iconBtn).toHaveStyleRule('fill', '#a7a7a7', {
    modifier: 'button:active svg path',
  });
});

test('Tooltip Icon fill color brandHighlight', () => {
  const { container } = render(
    <CenterContent>
      <Tooltip title={title} iconFillColor="brandHighlight"></Tooltip>
    </CenterContent>
  );
  const svgIcon = container.querySelector('[class^="StyledSVG-VDS"]');
  expect(svgIcon).toHaveAttribute('fill', '#ee0000');
});

test('Tooltip Icon fill color secondary on Inverted', () => {
  const { container, getByTestId } = render(
    <CenterContent>
      <Tooltip title={title} surface="dark" iconFillColor="secondary"></Tooltip>
    </CenterContent>
  );
  const svgIcon = container.querySelector('[class^="StyledSVG-VDS"]');
  expect(svgIcon).toHaveAttribute('fill', '#a7a7a7');
  //Icon Active (Secondary) color
  const iconBtn = container.querySelector('[class^="AnchorIconWrapper-VDS"]');
  fireEvent.mouseDown(iconBtn.lastChild.firstChild.firstChild);
  expect(iconBtn).toHaveStyleRule('fill', '#6f7171', {
    modifier: 'button:active svg path',
  });
});

describe('<Tooltip>', () => {
  test('VDS Tooltip', () => {
    const { container } = render(
      <Tooltip
        title={title}
        surface="light"
        focusState
        hoverState
        activeState
        dialogPadding={calculateRem(12, 12, 12, 12)}
      >
        {content}
      </Tooltip>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render anchor correctly', () => {
    const { container } = render(<Tooltip title={title}>{content}</Tooltip>);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render surface dark anchor correctly', () => {
    const { container } = render(
      <Tooltip title={title} surface="dark">
        {content}
      </Tooltip>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render secondary small anchor correctly', () => {
    const { container } = render(
      <Tooltip title={title} secondary size="small">
        {content}
      </Tooltip>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render surface dark secondary anchor correctly', () => {
    const { container } = render(
      <Tooltip title={title} surface="dark" secondary>
        {content}
      </Tooltip>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render custom anchor element', () => {
    const { container } = render(
      <Tooltip
        anchorElement={({ ariaDescribedBy, ariaExpanded }) => (
          <button>native hyperlink tooltip</button>
        )}
      >
        {content}
      </Tooltip>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render large dialog correctly', () => {
    const { container, getByTestId } = render(
      <Tooltip title={title}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, error quis!
        Quasi esse vitae dolore accusamus quam tenetur natus odio non sapiente
        adipisci debitis nisi aliquid facilis, minima quia distinctio. Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Ea, error quis! Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Ea, error quis! Quasi
        esse vitae dolore accusamus quam tenetur natus odio non sapiente
        adipisci debitis nisi aliquid facilis, minima quia distinctio. Quasi
        esse vitae dolore accusamus quam tenetur natus odio non sapiente
        adipisci debitis nisi aliquid facilis, minima quia distinctio. Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Ea, error quis! Quasi
        esse vitae dolore accusamus quam tenetur natus odio non sapiente
        adipisci debitis nisi aliquid facilis, minima quia distinctio. Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Ea, error quis! Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Ea, error quis! Quasi
        esse vitae dolore accusamus quam tenetur natus odio non sapiente
        adipisci debitis nisi aliquid facilis, minima quia distinctio. Quasi
        esse vitae dolore accusamus quam tenetur natus odio non sapiente
        adipisci debitis nisi aliquid facilis, minima quia distinctio.
      </Tooltip>
    );

    const iconBtn = container.querySelector('[data-testid="tooltip"]').lastChild
      .firstChild;
    const button = getByTestId('tooltip');
    // tooltip dialog should be closed
    expect(button.getAttribute('aria-expanded')).toBe('false');

    // fire event on hitArea
    fireEvent.mouseEnter(iconBtn);

    // run all fake timers
    jest.runAllTimers();

    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('<Tooltip> iconFillColor prop', () => {
  const title = 'Lorem title';
  const content = 'Lorem content';

  test('should render secondary color on surface light', () => {
    const { container } = render(
      <Tooltip title={title} iconFillColor="secondary">
        {content}
      </Tooltip>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render primary color on surface dark', () => {
    const { container } = render(
      <Tooltip title={title} surface="dark">
        {content}
      </Tooltip>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render secondary color on surface dark', () => {
    const { container } = render(
      <Tooltip title={title} iconFillColor="secondary" surface="dark">
        {content}
      </Tooltip>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render brandhighlight color on surface light', () => {
    const { container } = render(
      <Tooltip title={title} iconFillColor="brandHighlight">
        {content}
      </Tooltip>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render brandhighlight color on surface dark', () => {
    const { container } = render(
      <Tooltip title={title} iconFillColor="brandHighlight" surface="dark">
        {content}
      </Tooltip>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render custom color on surface light', () => {
    const { container } = render(
      <Tooltip title={title} iconFillColor="#00AC3E">
        {content}
      </Tooltip>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render custom color on surface dark', () => {
    const { container } = render(
      <Tooltip title={title} iconFillColor="#00AC3E" surface="dark">
        {content}
      </Tooltip>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('<Tooltip> Mouse Functionality', () => {
  const title = 'Lorem title';
  const content = 'Lorem content';

  test('should open dialog onMouseEnter HitArea', () => {
    const { container, getByTestId, getByText } = render(
      <Tooltip title={title}>{content}</Tooltip>
    );

    const iconBtn = container.querySelector('[data-testid="tooltip"]').lastChild
      .firstChild;
    const button = getByTestId('tooltip');
    // tooltip dialog should be closed
    expect(button.getAttribute('aria-expanded')).toBe('false');

    // fire event on hitArea
    fireEvent.mouseEnter(iconBtn);

    // run all fake timers
    jest.runAllTimers();

    expect(button.getAttribute('aria-expanded')).toBe('true');

    const dialogContainer = getByTestId('dialog');

    // check that the dialog is no longer hidden
    expect(dialogContainer.getAttribute('aria-hidden')).toBe('false');
    // check that text of tooltip dialog is being rendered
    expect(getByText(title).textContent).toBe(title);
    expect(getByText(content).textContent).toBe(content);
    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(content)).toBeInTheDocument();
  });

  test('should keep dialog active when onMouseEnter HoverArea', () => {
    const { container, getByTestId, getByText } = render(
      <Tooltip title={title}>{content}</Tooltip>
    );

    const iconBtn = container.querySelector('[data-testid="tooltip"]').lastChild
      .firstChild;
    const button = getByTestId('tooltip');
    // tooltip dialog should be closed
    expect(button.getAttribute('aria-expanded')).toBe('false');

    // fire event on hitArea
    fireEvent.mouseEnter(iconBtn);

    // run all fake timers
    jest.runAllTimers();

    // expect aria-expanded to be true after event
    expect(button.getAttribute('aria-expanded')).toBe('true');

    const dialogContainer = getByTestId('dialog');

    // check that the dialog is no longer hidden
    expect(dialogContainer.getAttribute('aria-hidden')).toBe('false');

    // check that text of tooltip dialog is being rendered
    expect(getByText(title).textContent).toBe(title);
    expect(getByText(content).textContent).toBe(content);
    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(content)).toBeInTheDocument();
  });

  test('should keep dialog active when onMouseEnter Dialog', () => {
    const { container, getByTestId, getByText } = render(
      <Tooltip title={title}>{content}</Tooltip>
    );

    const iconBtn = container.querySelector('[data-testid="tooltip"]').lastChild
      .firstChild;
    const button = getByTestId('tooltip');
    // tooltip dialog should be closed
    expect(button.getAttribute('aria-expanded')).toBe('false');

    // fire event on hitArea
    fireEvent.mouseEnter(iconBtn);

    // run all fake timers
    jest.runAllTimers();

    const dialog = getByTestId('dialog');
    // move mouse into dialog area
    fireEvent.mouseEnter(dialog);

    // expect aria-expanded to be true after event
    expect(button.getAttribute('aria-expanded')).toBe('true');

    const dialogContainer = getByTestId('dialog');

    // check that the dialog is no longer hidden
    expect(dialogContainer.getAttribute('aria-hidden')).toBe('false');

    // check that text of tooltip dialog is being rendered
    expect(getByText(title).textContent).toBe(title);
    expect(getByText(content).textContent).toBe(content);
    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(content)).toBeInTheDocument();
  });

  test('should set render achor element with z-index', () => {
    const { container, getByTestId, getByText } = render(
      <Tooltip
        title={title}
        renderAnchorElement={() => (
          <a data-testid="anchor-link" aria-haspopup="true" tabIndex={0}>
            native hyperlink tooltip
          </a>
        )}
      >
        {longContent}
      </Tooltip>
    );

    const hitArea = getByTestId('anchor-link');
    fireEvent.mouseEnter(hitArea);
    expect(getByText('native hyperlink tooltip')).toBeInTheDocument();
    //const button = getByTestId('tooltip');
    // tooltip dialog should be closed
    expect(container.firstChild).toMatchSnapshot();
  });
  test('should not close dialog onClick inside Dialog and anchor elem clicked', () => {
    const { container, getByTestId, getByText } = render(
      <Tooltip title={title}>{content}</Tooltip>
    );

    const iconBtn = container.querySelector('[data-testid="tooltip"]').lastChild
      .firstChild;
    const button = getByTestId('tooltip');
    // tooltip dialog should be closed
    expect(button.getAttribute('aria-expanded')).toBe('false');

    // fire event on hitArea
    fireEvent.mouseEnter(iconBtn);

    // run all fake timers
    jest.runAllTimers();

    const dialog = getByTestId('dialog');
    // move mouse into dialog area
    fireEvent.mouseEnter(dialog);

    // expect aria-expanded to be true after event
    expect(button.getAttribute('aria-expanded')).toBe('true');

    const dialogContainer = getByTestId('dialog');

    // check that the dialog is no longer hidden
    expect(dialogContainer.getAttribute('aria-hidden')).toBe('false');

    // check that text of tooltip dialog is being rendered
    expect(getByText(title).textContent).toBe(title);
    expect(getByText(content).textContent).toBe(content);
    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(content)).toBeInTheDocument();

    // mouse remain in dialog area
    fireEvent.click(dialog);

    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(dialogContainer).toBeInTheDocument();
  });

  test('should close dialog onMouseLeave HitArea', () => {
    const { container, getByTestId, getByText } = render(
      <Tooltip title={title}>{content}</Tooltip>
    );

    const iconBtn = container.querySelector('[data-testid="tooltip"]').lastChild
      .firstChild;
    const button = getByTestId('tooltip');
    // tooltip dialog should be closed
    expect(button.getAttribute('aria-expanded')).toBe('false');

    // fire event on hitArea
    fireEvent.mouseEnter(iconBtn);
    fireEvent.click(button);

    // run all fake timers
    jest.runAllTimers();

    // expect aria-expanded to be true after event
    expect(button.getAttribute('aria-expanded')).toBe('true');

    const dialogContainer = getByTestId('dialog');

    // check that the dialog is no longer hidden
    expect(dialogContainer.getAttribute('aria-hidden')).toBe('false');

    // check that text of tooltip dialog is being rendered
    expect(getByText(title).textContent).toBe(title);
    expect(getByText(content).textContent).toBe(content);
    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(content)).toBeInTheDocument();

    // mouse leave hit area
    fireEvent.mouseLeave(button);

    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(dialogContainer).not.toBeInTheDocument();
  });

  test('should close dialog onMouseLeave Dialog', () => {
    const { container, getByTestId, getByText } = render(
      <Tooltip title={title}>{content}</Tooltip>
    );

    const iconBtn = container.querySelector('[data-testid="tooltip"]').lastChild
      .firstChild;
    const button = getByTestId('tooltip');
    // tooltip dialog should be closed
    expect(button.getAttribute('aria-expanded')).toBe('false');

    // fire event on hitArea
    fireEvent.mouseEnter(iconBtn);

    // run all fake timers
    jest.runAllTimers();

    const dialog = getByTestId('dialog');
    // move mouse into dialog area
    fireEvent.mouseEnter(dialog);

    // expect aria-expanded to be true after event
    expect(button.getAttribute('aria-expanded')).toBe('true');

    const dialogContainer = getByTestId('dialog');

    // check that the dialog is no longer hidden
    expect(dialogContainer.getAttribute('aria-hidden')).toBe('false');

    // check that text of tooltip dialog is being rendered
    expect(getByText(title).textContent).toBe(title);
    expect(getByText(content).textContent).toBe(content);
    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(content)).toBeInTheDocument();

    // mouse leave dialog area
    fireEvent.mouseLeave(dialog);

    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(dialogContainer).not.toBeInTheDocument();
  });

  test('should open and close dialog when Enter Keypress', () => {
    const { container, getByText, getByTestId } = render(
      <Tooltip title={title}>{content}</Tooltip>
    );

    const button = getByTestId('tooltip').lastChild.firstChild.firstChild;
    // tooltip dialog should be closed
    expect(button.getAttribute('aria-expanded')).toBe('false');

    // focus button and fire keyDown to open dialog
    fireEvent.focus(button);
    fireEvent.click(button);
    fireEvent.keyDown(button, {
      key: 'Enter',
      code: 13,
      charCode: 13,
    });
    //expect(container.firstChild).toMatchSnapshot()

    expect(button.getAttribute('aria-expanded')).toBe('true');

    const dialogContainer = getByTestId('dialog');

    // check that the dialog is no longer hidden
    expect(dialogContainer.getAttribute('aria-hidden')).toBe('true');

    // check that text of tooltip dialog is being rendered
    expect(getByText(title).textContent).toBe(title);
    expect(getByText(content).textContent).toBe(content);
    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(content)).toBeInTheDocument();

    // fire event to toggle dialog with enter key
    fireEvent.click(button);
    fireEvent.keyDown(button, {
      key: 'Enter',
      code: 13,
      charCode: 13,
    });

    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(dialogContainer).not.toBeInTheDocument();
  });

  test('should close dialog when Shift Keypress && Tab && dialog open', () => {
    const { container, getByText, getByTestId } = render(
      <Tooltip title={title}>{content}</Tooltip>
    );

    const button = getByTestId('tooltip');
    expect(button.getAttribute('aria-expanded')).toBe('false');

    const iconBtn = container.querySelector('[data-testid="tooltip"]').lastChild
      .firstChild;
    expect(button.getAttribute('aria-expanded')).toBe('false');

    fireEvent.mouseEnter(iconBtn);

    // run all fake timers
    jest.runAllTimers();

    expect(button.getAttribute('aria-expanded')).toBe('true');

    const dialogContainer = getByTestId('dialog');

    expect(dialogContainer.getAttribute('aria-hidden')).toBe('false');

    fireEvent.keyDown(dialogContainer);

    fireEvent.keyDown(button, {
      shiftKey: true,
      keyCode: 9,
      code: 9,
      charCode: 9,
      key: 'shift',
    });

    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(dialogContainer).not.toBeInTheDocument();
  });

  test('should close dialog when Shift Keypress && Tab && dialog open and achorElement', () => {
    const { container, getByText, getByTestId } = render(
      <Tooltip
        title={title}
        renderAnchorElement={({ ariaDescribedBy, ariaExpanded }) => (
          <button data-testid={'button-link'} onBlur={() => {}}>
            native hyperlink tooltip
          </button>
        )}
      >
        {content}
      </Tooltip>
    );

    const button = getByTestId('button-link');
    //expect(button.getAttribute('aria-expanded')).toBe('false');

    //const hitArea = getByTestId('hit-area');
    expect(button.getAttribute('aria-expanded')).toBe('false');
    //fireEvent.(button);
    fireEvent.mouseEnter(button);

    // run all fake timers
    jest.runAllTimers();

    expect(button.getAttribute('aria-expanded')).toBe('true');

    const dialogContainer = getByTestId('dialog');

    expect(dialogContainer.getAttribute('aria-hidden')).toBe('false');

    fireEvent.keyDown(dialogContainer);

    fireEvent.keyDown(button, {
      shiftKey: true,
      keyCode: 9,
      code: 9,
      charCode: 9,
      key: 'shift',
    });

    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(dialogContainer).not.toBeInTheDocument();
  });

  test('should open dialog onMouseEnter custom anchor element', () => {
    const { container, getByTestId } = render(
      <Tooltip
        title={title}
        anchorElement={({ ariaDescribedBy, ariaExpanded }) => (
          <button onBlur={() => {}}>native hyperlink tooltip</button>
        )}
      >
        {content}
      </Tooltip>
    );

    const button = container.querySelector('button[aria-expanded]');
    // tooltip dialog should be closed

    // fire event on button
    fireEvent.mouseEnter(button);
    // callback custom mouse events from user
    fireEvent.mouseDown(button);
    fireEvent.mouseUp(button);
    fireEvent.mouseLeave(button);

    // run all fake timers
    jest.runAllTimers();

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render surface dark with achorIcon', () => {
    const { container, getByTestId } = render(
      <Tooltip title={title} surface="dark" size={'small'}>
        {content}
      </Tooltip>
    );
    const button = getByTestId('tooltip');
    // tooltip dialog should be closed
    expect(button.getAttribute('aria-expanded')).toBe('false');

    // focus button and fire keyDown to open dialog
    fireEvent.focus(button);
    fireEvent.click(button);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render tooltip dialog with invertes', () => {
    const { container, getByTestId } = render(
      <Tooltip
        title={title}
        calculateTrackColor={jest.fn()}
        calculateThumbColor={jest.fn()}
        surface="dark"
      >
        {longContent}
      </Tooltip>
    );
    const button = getByTestId('tooltip');
    // tooltip dialog should be closed
    expect(button.getAttribute('aria-expanded')).toBe('false');

    // focus button and fire keyDown to open dialog
    fireEvent.focus(button);
    fireEvent.mouseOver(button);
    fireEvent.click(button);
    jest.runAllTimers();
    const dialogContainer = getByTestId('dialog');

    expect(dialogContainer.getAttribute('aria-hidden')).toBe('false');
    fireEvent.focus(dialogContainer);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render tooltip dialog with invertes', () => {
    const { container, getByTestId } = render(
      <Tooltip
        title={title}
        calculateTrackColor={() => '#d8dada'}
        calculateThumbColor={() => '#d8dada'}
        surface={'dark'}
        scrollBarId={'asdsdfff123'}
      >
        {longContent}
      </Tooltip>
    );
    const button = getByTestId('tooltip');
    // tooltip dialog should be closed
    expect(button.getAttribute('aria-expanded')).toBe('false');

    // focus button and fire keyDown to open dialog
    //fireEvent.focus(button);
    fireEvent.mouseOver(button);
    fireEvent.click(button);
    jest.runAllTimers();
    const dialogContainer = getByTestId('dialog');

    fireEvent.keyDown(dialogContainer.firstChild, {
      keyCode: 13,
      code: 13,
      charCode: 13,
      key: 'enter',
    });

    expect(dialogContainer.getAttribute('aria-hidden')).toBe('false');
    fireEvent.focus(dialogContainer);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render tooltip dialog with scroll and anchorElement', () => {
    const { container, getByTestId } = render(
      <Tooltip
        title={title}
        surface={'dark'}
        scrollBarId={'asdsdfff123'}
        renderAnchorElement={() => (
          <a
            data-testid="tooltip"
            ref="dialog"
            href="#"
            onMouseLeave={() => {}}
            onMouseEnter={() => {}}
            onKeyDown={() => {}}
            aria-haspopup="true"
            tabIndex={0}
          >
            native hyperlink tooltip
          </a>
        )}
      >
        {longContent}
      </Tooltip>
    );
    const button = getByTestId('tooltip');
    // tooltip dialog should be closed
    expect(button.getAttribute('aria-expanded')).toBe('false');

    // focus button and fire keyDown to open dialog
    //fireEvent.focus(button);
    fireEvent.mouseOver(button);
    fireEvent.click(button);
    jest.runAllTimers();
    const dialogContainer = getByTestId('dialog');

    fireEvent.keyDown(dialogContainer.firstChild, {
      keyCode: 13,
      code: 13,
      charCode: 13,
      key: 'enter',
    });

    expect(dialogContainer.getAttribute('aria-hidden')).toBe('false');
    fireEvent.focus(button);
    fireEvent.click(container.firstChild);
    jest.runAllTimers();
    //expect(dialogContainer.getAttribute('aria-hidden')).toBe('true');

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render tooltip dialog with scroll and anchorElement and disabled', () => {
    const { container, getByTestId } = render(
      <Tooltip
        title={title}
        surface={'dark'}
        scrollBarId={'asdsdfff123'}
        disabled
        renderAnchorElement={() => (
          <a
            data-testid="tooltip"
            ref="dialog"
            href="#"
            onMouseLeave={() => {}}
            onMouseEnter={() => {}}
            onKeyDown={() => {}}
            aria-haspopup="true"
            tabIndex={0}
          >
            native hyperlink tooltip
          </a>
        )}
      >
        {longContent}
      </Tooltip>
    );
    const button = getByTestId('tooltip');
    // tooltip dialog should be closed
    expect(button.getAttribute('aria-expanded')).toBe('false');

    // focus button and fire keyDown to open dialog
    //fireEvent.focus(button);
    fireEvent.mouseOver(button);
    fireEvent.click(button);
    jest.runAllTimers();

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render tooltip dialog with onKeyDown and anchorElement', () => {
    const { container, getByTestId, rerender } = render(
      <Tooltip
        title={title}
        surface={'dark'}
        scrollBarId={'asdsdfff123'}
        onKeyDown={() => {}}
        onClick={() => {}}
        onMouseLeave={() => {}}
        renderAnchorElement={() => (
          <a
            data-testid="tooltip"
            ref="dialog"
            href="#"
            onMouseLeave={() => {}}
            onClick={() => {}}
            onMouseEnter={() => {}}
          >
            native hyperlink tooltip
          </a>
        )}
      >
        {longContent}
      </Tooltip>
    );
    const button = getByTestId('tooltip');
    // tooltip dialog should be closed
    expect(button.getAttribute('aria-expanded')).toBe('false');

    // focus button and fire keyDown to open dialog
    //fireEvent.focus(button);
    fireEvent.mouseOver(button);
    fireEvent.click(button);
    jest.runAllTimers();
    const dialogContainer = getByTestId('dialog');
    expect(dialogContainer.getAttribute('aria-hidden')).toBe('false');

    fireEvent.mouseOver(dialogContainer.firstChild);
    fireEvent.focus(dialogContainer.firstChild);
    fireEvent.keyDown(dialogContainer.firstChild, {
      keyCode: 32,
      code: 33,
      charCode: 32,
      key: 'spacebar',
    });
    fireEvent.mouseLeave(dialogContainer);

    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('<TrailingTooltip />', () => {
  test('should render trailing toolip', () => {
    const { container } = render(
      <TrailingTooltip title={title} typographyColor="#d8dada">
        {content}
      </TrailingTooltip>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
  test('should render trailing toolip with cllidren', () => {
    const { container } = render(
      <TrailingTooltip title={title} typographyColor="#d8dada">
        <span>{content}</span>
        <span>{content}</span>
      </TrailingTooltip>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
  test('should render trailing toolip with cllidren undefined', () => {
    const { container } = render(
      <TrailingTooltip
        title={title}
        typographyColor="#d8dada"
      ></TrailingTooltip>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
  test('should render trailing toolip with with type micro', () => {
    const { container } = render(
      <TrailingTooltip
        title={title}
        typographyType="micro"
        typographyColor="#d8dada"
      >
        {content}
      </TrailingTooltip>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
  test('should render trailing toolip with with Trailing element height', () => {
    const { container } = render(
      <TrailingTooltip
        title={title}
        typographyType="body"
        typographySize="medium"
        typographyColor="#d8dada"
      >
        {content}
      </TrailingTooltip>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
  test('should render trailing toolip with with Trailing element height - large', () => {
    const { container } = render(
      <TrailingTooltip
        title={title}
        typographyType="body"
        typographySize="large"
        typographyColor="#d8dada"
      >
        {content}
      </TrailingTooltip>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
  test('should render trailing toolip with with type as tile and size - large', () => {
    const { container } = render(
      <TrailingTooltip
        title={title}
        typographyType="title"
        typographySize="large"
        typographyColor="#d8dada"
      >
        {content}
      </TrailingTooltip>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  test('should render trailing toolip with with type as tile and size - large viewport-mobile', () => {
    const { container } = render(
      <TrailingTooltip
        title={title}
        typographyType="title"
        typographySize="large"
        viewport="mobile"
        typographyColor="#d8dada"
      >
        {content}
      </TrailingTooltip>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  test('should render trailing toolip with with type as tile and size - small', () => {
    const { container } = render(
      <TrailingTooltip
        title={title}
        typographyType="title"
        typographySize="small"
        typographyColor="#d8dada"
      >
        {content}
      </TrailingTooltip>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  test('should render trailing toolip with with type as tile and size - large viewport-mobile', () => {
    const { container } = render(
      <TrailingTooltip
        title={title}
        typographyType="title"
        typographySize="small"
        viewport="mobile"
        typographyColor="#d8dada"
      >
        {content}
      </TrailingTooltip>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  test('should render trailing toolip with with type as title and size - XLarge', () => {
    const { container } = render(
      <TrailingTooltip
        title={title}
        typographyType="title"
        typographySize="XLarge"
        typographyColor="#d8dada"
      >
        {content}
      </TrailingTooltip>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  test('should render trailing toolip with with type as tile and size - Xlarge viewport-mobile', () => {
    const { container } = render(
      <TrailingTooltip
        title={title}
        typographyType="title"
        typographySize="XLarge"
        viewport="mobile"
        typographyColor="#d8dada"
      >
        {content}
      </TrailingTooltip>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  test('should render trailing toolip with with type as title and size - 2XLarge', () => {
    const { container } = render(
      <TrailingTooltip
        title={title}
        typographyType="title"
        typographySize="2XLarge"
        typographyColor="#d8dada"
      >
        {content}
      </TrailingTooltip>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  test('should render trailing toolip with with type as tile and size - 2Xlarge viewport-mobile', () => {
    const { container } = render(
      <TrailingTooltip
        title={title}
        typographyType="title"
        typographySize="2XLarge"
        viewport="mobile"
        typographyColor="#d8dada"
      >
        {content}
      </TrailingTooltip>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  test('should render trailing toolip with with type as title and size - medium', () => {
    const { container } = render(
      <TrailingTooltip
        title={title}
        typographyType="title"
        typographySize="medium"
        typographyColor="#d8dada"
      >
        {content}
      </TrailingTooltip>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  test('should render trailing toolip with with type as tile and size - medium viewport-mobile', () => {
    const { container } = render(
      <TrailingTooltip
        title={title}
        surface={'dark'}
        typographyType="title"
        typographySize="medium"
        viewport="mobile"
      >
        {content}
      </TrailingTooltip>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('<TooltipPopover />', () => {
  const originalOffsetHeight = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    'offsetHeight'
  );
  const originalOffsetWidth = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    'offsetWidth'
  );

  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      value: 500,
    });
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      value: 500,
    });
  });

  afterAll(() => {
    Object.defineProperty(
      HTMLElement.prototype,
      'offsetHeight',
      originalOffsetHeight
    );
    Object.defineProperty(
      HTMLElement.prototype,
      'offsetWidth',
      originalOffsetWidth
    );
  });

  test('Tooltip scroll styles', () => {
    const { container, getByTestId } = render(
      <Tooltip title={title} content={shortContent} containerId={'21233asdf'}>
        {shortContent}
      </Tooltip>
    );
    const button = getByTestId('tooltip').lastChild.firstChild.firstChild;
    fireEvent.click(button);
    const dialogContainer = getByTestId('dialog');
    const scroll = dialogContainer.querySelector('#scrollbar-track-test');
    //Thumb/scrub styles
    const scrollChild = scroll.querySelector('span');
    const scrolls = scrollChild.querySelector('span');
    expect(scrolls).toHaveStyle(`background-color: rgb(111, 113, 113)`);
    expect(scrolls).toHaveStyle(`width: 4px`);
    expect(scrolls).toHaveStyle(`border-radius: 0.125rem`);
    //Track/Background styles
    const scrollStyles = window.getComputedStyle(scroll)._values;
    expect(scrollStyles['background-color']).toBe('rgb(216, 218, 218)');
    expect(scrollStyles['width']).toBe('4px');
    expect(scrollStyles['border-radius']).toBe('0.125rem');
    //Scroll Hover styles
    fireEvent.mouseOver(scrolls);
    const scrollHoverStyles = window.getComputedStyle(scrolls, ':hover')
      ._values;
    expect(scrollHoverStyles['background-color']).toBe('rgb(51, 51, 51)');
    //Spacing - Inner padding(Right) - 4px + 8px
    const dWithScroll = container.querySelector(
      '[class^="InnerDialogWithScrollContentWrapper"]'
    );

    const dWithScrollStyles = window.getComputedStyle(dWithScroll)._values;
    expect(dWithScrollStyles['padding-right']).toBe('4px');
    const spacingRight = dialogContainer.querySelector('#scrollbar-view-test');
    const spacingRightStyles = window.getComputedStyle(spacingRight)._values;
    expect(spacingRightStyles['padding-right']).toBe('8px');
    //Spacing - between Title and Content
    const titleWrap = container.querySelector('[class^="StyledHeading"]');
    const titleStyles = window.getComputedStyle(titleWrap)._values;
    expect(titleStyles['margin-bottom']).toBe('4px');
  });

  test('Tooltip scroll styles Inverted', () => {
    const { getByTestId } = render(
      <Tooltip
        title={title}
        surface="dark"
        content={shortContent}
        containerId={'21233asdf'}
      >
        <span>{shortContent}</span>
      </Tooltip>
    );
    const button = getByTestId('tooltip').lastChild.firstChild.firstChild;
    fireEvent.click(button);
    const dialogContainer = getByTestId('dialog');
    const scroll = dialogContainer.querySelector('#scrollbar-track-test');
    //Thumb/scrub styles
    const scrollChild = scroll.querySelector('span');
    const scrolls = scrollChild.querySelector('span');
    expect(scrolls).toHaveStyle(`background-color: rgb(167, 167, 167)`);
    expect(scrolls).toHaveStyle(`width: 4px`);
    expect(scrolls).toHaveStyle(`border-radius: 0.125rem`);
    //Track/Background styles
    const scrollStyles = window.getComputedStyle(scroll)._values;
    expect(scrollStyles['background-color']).toBe('rgb(51, 51, 51)');
    expect(scrollStyles['width']).toBe('4px');
    expect(scrollStyles['border-radius']).toBe('0.125rem');
    //Scroll Hover styles
    fireEvent.mouseOver(scrolls);
    const scrollHoverStyles = window.getComputedStyle(scrolls, ':hover')
      ._values;
    expect(scrollHoverStyles['background-color']).toBe('rgb(216, 218, 218)');
  });

  test('Should render TooltipDialog with setHasScrollableContent', () => {
    const { container, getByTestId } = render(
      <Tooltip title={title} content={shortContent} containerId={'21233asdf'}>
        {shortContent}
      </Tooltip>
    );
    const button = getByTestId('tooltip').lastChild.firstChild.firstChild;
    // tooltip dialog should be closed
    expect(button.getAttribute('aria-expanded')).toBe('false');
    // focus button and fire keyDown to open dialog
    fireEvent.focus(button);
    fireEvent.click(button);
    fireEvent.keyDown(button, {
      key: 'Enter',
      code: 13,
      charCode: 13,
    });

    const dialogContainer = getByTestId('dialog');

    // check that the dialog is no longer hidden
    expect(dialogContainer.getAttribute('aria-hidden')).toBe('true');
    expect(dialogContainer).toMatchSnapshot();
  });
  test('Should render TooltipPopover with setHasScrollableContent', () => {
    const { container, getByTestId } = render(
      <Tooltip title={title} content={shortContent} containerId={'21233asdf'}>
        {shortContent}
      </Tooltip>
    );
    const button = getByTestId('tooltip').lastChild.firstChild.firstChild;
    // tooltip dialog should be closed
    expect(button.getAttribute('aria-expanded')).toBe('false');

    // focus button and fire keyDown to open dialog
    fireEvent.focus(button);
    fireEvent.click(button);
    fireEvent.keyDown(button, {
      key: 'Enter',
      code: 13,
      charCode: 13,
    });
    jest.runAllTimers();

    const dialogContainer = getByTestId('dialog');
    fireEvent.focus(dialogContainer);
  });

  test('should close dialog when Tab && dialog open', () => {
    const { container, getByText, getByTestId } = render(
      <Tooltip
        title={title}
        renderAnchorElement={({ ariaDescribedBy, ariaExpanded }) => (
          <button
            href="#"
            aria-describedby={ariaDescribedBy}
            aria-expanded={ariaExpanded}
            aria-haspopup="true"
            onClick={e => e.preventDefault()}
          >
            native hyperlink tooltip
          </button>
        )}
      >
        {content}
      </Tooltip>
    );

    const button = container.querySelector('button[aria-expanded]');

    // tooltip dialog should be closed
    expect(button.getAttribute('aria-expanded')).toBe('false');

    // focus button and fire keyDown to open dialog
    fireEvent.focus(button);
    fireEvent.keyDown(button, { keyCode: 32, code: 32, charCode: 32 });

    // expect(button.getAttribute('aria-expanded')).toBe('true');

    const dialogContainer = getByTestId('dialog');

    fireEvent.keyDown(button, { keyCode: 9, code: 9, charCode: 9 });

    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(dialogContainer).not.toBeInTheDocument();
  });

  test('should close dialog when Tab && dialog open onMouseLeave', () => {
    const { container, getByText, getByTestId } = render(
      <Tooltip
        title={title}
        renderAnchorElement={({ ariaDescribedBy, ariaExpanded }) => (
          <button
            href="#"
            aria-describedby={ariaDescribedBy}
            aria-expanded={ariaExpanded}
            aria-haspopup="true"
            onMouseLeave={e => e.preventDefault()}
          >
            native hyperlink tooltip
          </button>
        )}
      >
        {content}
      </Tooltip>
    );

    const button = container.querySelector('button[aria-expanded]');

    // tooltip dialog should be closed
    expect(button.getAttribute('aria-expanded')).toBe('false');

    fireEvent.focus(button);
    fireEvent.keyDown(button, { keyCode: 32, code: 32, charCode: 32 });
    const dialogContainer = getByTestId('dialog');
    fireEvent.mouseLeave(button);

    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(dialogContainer).not.toBeInTheDocument();
  });

  test('should close dialog when Tab && dialog open onKeyDown', () => {
    const { container, getByText, getByTestId } = render(
      <Tooltip
        title={title}
        renderAnchorElement={({ ariaDescribedBy, ariaExpanded }) => (
          <button
            href="#"
            aria-describedby={ariaDescribedBy}
            aria-expanded={ariaExpanded}
            aria-haspopup="true"
            onKeyDown={e => e.preventDefault()}
          >
            native hyperlink tooltip
          </button>
        )}
      >
        {shortContent}
      </Tooltip>
    );

    const button = container.querySelector('button[aria-expanded]');

    // tooltip dialog should be closed
    expect(button.getAttribute('aria-expanded')).toBe('false');

    fireEvent.focus(button);
    fireEvent.keyDown(button, { keyCode: 32, code: 32, charCode: 32 });
    const dialogContainer = getByTestId('dialog');
    fireEvent.mouseLeave(button);

    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(dialogContainer).not.toBeInTheDocument();
  });

  test('should render dialog and check for scrollbar id', () => {
    const { container, getByText, getByTestId } = render(
      <CenterContent>
        <Tooltip
          title={title}
          scrollBarId={'asdsdfff123'}
          size={'small'}
          surface={'light'}
          renderAnchorElement={({ ariaDescribedBy, ariaExpanded }) => (
            <button
              href="#"
              aria-describedby={ariaDescribedBy}
              aria-expanded={ariaExpanded}
              aria-haspopup="true"
            >
              native hyperlink tooltip
            </button>
          )}
        >
          {longContent}
        </Tooltip>
      </CenterContent>
    );

    const button = container.querySelector('button[aria-expanded]');

    // tooltip dialog should be closed
    expect(button.getAttribute('aria-expanded')).toBe('false');

    fireEvent.focus(button);
    fireEvent.keyDown(button, { keyCode: 32, code: 32, charCode: 32 });
    const dialogContainer = getByTestId('dialog');
  });
  test('should render dialog with scroll and inverted', () => {
    const { container, getByText, getByTestId } = render(
      <CenterContent>
        <Tooltip
          title={title}
          scrollBarId={'asdsdfff123'}
          surface={'light'}
          content={longContent}
          renderAnchorElement={({ ariaDescribedBy, ariaExpanded }) => (
            <a href="#">native hyperlink tooltip</a>
          )}
        >
          {longContent}
        </Tooltip>
      </CenterContent>
    );

    const button = container.querySelector('a[aria-expanded]');

    // tooltip dialog should be closed
    expect(button.getAttribute('aria-expanded')).toBe('false');

    fireEvent.focus(button);
    fireEvent.keyDown(button, { keyCode: 32, code: 32, charCode: 32 });
    jest.runAllTimers();
    const dialogContainer = getByTestId('dialog');
    expect(button.getAttribute('aria-expanded')).toBe('true');

    expect(container.firstChild).toMatchSnapshot();
  });
  test('should render dialog with no anchor element scroll', () => {
    const { container, getByText, getByTestId } = render(
      <CenterContent>
        <Tooltip
          title={title}
          scrollBarId={'asdsdfff123'}
          size={'small'}
          surface={'light'}
          renderAnchorElement={({ ariaDescribedBy, ariaExpanded }) => (
            <button
              href="#"
              aria-describedby={ariaDescribedBy}
              aria-expanded={ariaExpanded}
              aria-haspopup="true"
            >
              native hyperlink tooltip
            </button>
          )}
        >
          {longContent}
        </Tooltip>
      </CenterContent>
    );

    const button = container.querySelector('button[aria-expanded]');

    // tooltip dialog should be closed
    expect(button.getAttribute('aria-expanded')).toBe('false');

    fireEvent.focus(button);
    fireEvent.keyDown(button, { keyCode: 32, code: 32, charCode: 32 });
    //const dialogContainer = getByTestId('dialog');
  });
  // test('should render dialog with scroll and inverted', () => {
  //   global.navigator.userAgent =
  //     'Mozilla/5.0 (Mobile; rv:18.0) Gecko/18.0 Firefox/18.0';
  //   const { container, getByText, getByTestId } = render(
  //     <CenterContent>
  //       <Tooltip
  //         title={title}
  //         surface={'dark'}
  //         content={longContent}
  //         onClick={jest.fn()}
  //       >
  //         {longContent}
  //       </Tooltip>
  //     </CenterContent>
  //   );

  //   const button = getByTestId('tooltip');

  //   // tooltip dialog should be closed
  //   expect(button.getAttribute('aria-expanded')).toBe('false');

  //   fireEvent.focus(button);
  //   fireEvent.click(button);
  //   fireEvent.keyDown(button, {
  //     key: 'Enter',
  //     code: 13,
  //     charCode: 13,
  //   });
  //   jest.runAllTimers();
  //   const dialogContainer = getByTestId('dialog');
  //   const scrollbarContainer = dialogContainer.querySelector(
  //     '#scrollbar-track-asdf2134'
  //   );
  //   fireEvent.mouseOver(scrollbarContainer);
  //   fireEvent.focus(scrollbarContainer);
  //   fireEvent.click(scrollbarContainer);

  //   expect(container.firstChild).toMatchSnapshot();
  // });

  // test('should render dialog with scroll and not inverted', () => {
  //   const { container, getByText, getByTestId } = render(
  //     <CenterContent>
  //       <Tooltip
  //         title={title}
  //         surface={'light'}
  //         content={longContent}
  //         onClick={jest.fn()}
  //         onKeyDown={jest.fn()}
  //       >
  //         {longContent}
  //       </Tooltip>
  //     </CenterContent>
  //   );

  //   const button = getByTestId('tooltip');

  //   // tooltip dialog should be closed
  //   expect(button.getAttribute('aria-expanded')).toBe('false');

  //   fireEvent.focus(button);
  //   fireEvent.click(button);
  //   fireEvent.keyDown(button, {
  //     key: 'Enter',
  //     code: 13,
  //     charCode: 13,
  //   });
  //   jest.runAllTimers();
  //   const dialogContainer = getByTestId('dialog');

  //   const scrollbarContainer = dialogContainer.querySelector(
  //     '#scrollbar-track-asdf2134'
  //   );
  //   fireEvent.mouseOver(scrollbarContainer);
  //   const scrollBarView = dialogContainer.querySelector(
  //     '#scrollbar-view-asdf2134'
  //   );
  //   fireEvent.focus(scrollBarView);
  //   fireEvent.keyDown(scrollBarView, {
  //     key: 'Enter',
  //     code: 13,
  //     charCode: 13,
  //   });

  //   expect(container.firstChild).toMatchSnapshot();
  // });

  // test('should render dialog with scroll and containerId', () => {
  //   const { container, getByText, getByTestId } = render(
  //     <CenterContent>
  //       <Tooltip
  //         title={title}
  //         surface={'light'}
  //         content={longContent}
  //         containerId={'ew-container-id'}
  //       >
  //         {longContent}
  //       </Tooltip>
  //       <div id="ew-container-id"></div>
  //     </CenterContent>
  //   );

  //   const button = getByTestId('tooltip');

  //   // tooltip dialog should be closed
  //   expect(button.getAttribute('aria-expanded')).toBe('false');

  //   fireEvent.mouseOver(button);
  //   fireEvent.click(button);
  //   fireEvent.keyDown(button, {
  //     key: 'Enter',
  //     code: 13,
  //     charCode: 13,
  //   });
  //   jest.runAllTimers();
  //   const dialogContainer = getByTestId('dialog');

  //   const scrollbarContainer = dialogContainer.querySelector(
  //     '#scrollbar-view-asdf2134'
  //   );

  //   expect(container.firstChild).toMatchSnapshot();
  // });
});
