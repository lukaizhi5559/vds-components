import React, { Fragment } from 'react';
import { fireEvent, render } from '@testing-library/react';
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTitle,
  AccordionSubTitle,
  AccordionDetail,
} from '.';

let testFn = jest.fn();
global.scrollBy = () => {};

// mock uuid
jest.mock('@vds-core/utilities', () => {
  const originalModule = jest.requireActual('@vds-core/utilities');
  return {
    __esModule: true, // Use it when dealing with esModules
    ...originalModule,
    generateUUID: jest.fn(() => 'test'),
  };
});

test('<Accordion>', () => {
  expect(true).toBe(true);
});

test('<Accordion single>', () => {
  const { getAllByText, container } = render(
    <Accordion single>
      <AccordionItem>
        <AccordionHeader>Header One</AccordionHeader>
        <AccordionDetail>Detail one</AccordionDetail>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader>Header Two</AccordionHeader>
        <AccordionDetail>Detail two</AccordionDetail>
      </AccordionItem>
    </Accordion>
  );

  const firstAccordionHeader = getAllByText('Header One');
  const secondAccordionHeader = getAllByText('Header Two');

  // toggle first AccordionItem
  fireEvent.click(firstAccordionHeader[1]);

  // toggle second AccordionItem
  fireEvent.click(secondAccordionHeader[1]);
});

test('<Accordion> should handle mouse events', () => {
  const { getAllByText, container } = render(
    <Accordion>
      <AccordionItem>
        <AccordionHeader>Header One</AccordionHeader>
        <AccordionDetail>Detail one</AccordionDetail>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader>Header Two</AccordionHeader>
        <AccordionDetail>Detail two</AccordionDetail>
      </AccordionItem>
    </Accordion>
  );

  const firstAccordionHeader = getAllByText('Header One');
  const secondAccordionHeader = getAllByText('Header Two');

  //MouseEnter event
  fireEvent.mouseEnter(firstAccordionHeader[1]);

  //MouseLeave event
  fireEvent.mouseLeave(firstAccordionHeader[1]);

  firstAccordionHeader[1].focus();

  //MouseDown event
  fireEvent.mouseDown(firstAccordionHeader[1]);
});

test('<AccordionItem opened>', () => {
  const { container, rerender, getAllByText } = render(
    <Accordion>
      <AccordionItem onClick={testFn}>
        <AccordionHeader>Header One</AccordionHeader>
        <AccordionDetail>Detail one</AccordionDetail>
      </AccordionItem>
      <AccordionItem opened>
        <AccordionHeader>Header Two</AccordionHeader>
        <AccordionDetail>Detail two</AccordionDetail>
      </AccordionItem>
    </Accordion>
  );

  const firstAccordionHeader = getAllByText('Header One');
  const secondAccordionHeader = getAllByText('Header Two');

  // toggle first AccordionItem
  fireEvent.click(firstAccordionHeader[1]);

  // toggle second AccordionItem
  fireEvent.click(secondAccordionHeader[1]);

  // Check opened Prop changing state
  rerender(
    <Accordion>
      <AccordionItem onClick={testFn}>
        <AccordionHeader>Header One</AccordionHeader>
        <AccordionDetail>Detail one</AccordionDetail>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader>Header Two</AccordionHeader>
        <AccordionDetail>Detail two</AccordionDetail>
      </AccordionItem>
    </Accordion>
  );

  // toggle first AccordionItem
  fireEvent.click(firstAccordionHeader[1]);

  // toggle second AccordionItem
  fireEvent.click(secondAccordionHeader[1]);
});

test('<AccordionItem opened> should handle <Fragment/> gracefully when present in Render Tree', () => {
  const { container } = render(
    <Accordion>
      <Fragment>
        <AccordionItem>
          <AccordionHeader>Header One</AccordionHeader>
          <AccordionDetail>Detail one</AccordionDetail>
        </AccordionItem>
      </Fragment>
      <Fragment>
        <AccordionItem opened>
          <AccordionHeader>Header Two</AccordionHeader>
          <AccordionDetail>Detail two</AccordionDetail>
        </AccordionItem>
      </Fragment>
    </Accordion>
  );
});

test('<Accordion> should handle unknown elements gracefully when present in Render Tree', () => {
  const { container } = render(
    <Accordion>
      <h4>I'm in between Accordion and the first AccordionItem</h4>
      <>
        <AccordionItem>
          <h4>I'm in between AccordionItem and AccordionHeader</h4>
          <AccordionHeader>Header One</AccordionHeader>
          <h4>I'm in between AccordionHeader and AccordionDetail</h4>
          <AccordionDetail>Detail one</AccordionDetail>
        </AccordionItem>
      </>
      <h4>I'm in between AccordionItems</h4>
      <>
        <AccordionItem opened>
          <AccordionHeader>
            <AccordionTitle>Title Two</AccordionTitle>
            <AccordionSubTitle>Sub Title Two</AccordionSubTitle>
          </AccordionHeader>
          <AccordionDetail>Detail two</AccordionDetail>
        </AccordionItem>
      </>
    </Accordion>
  );

  const secondAccordionDetail = container.querySelector(
    '[aria-labelledby="accordionHeader_test_1"]'
  );
});

test('<AccordionItem sticky> should render StickyContainer & Sticky Components', () => {
  const { container } = render(
    <Accordion testMode>
      <Fragment>
        <AccordionItem>
          <AccordionHeader>Header One</AccordionHeader>
          <AccordionDetail>Detail one</AccordionDetail>
        </AccordionItem>
      </Fragment>
      <Fragment>
        <AccordionItem opened sticky>
          <AccordionHeader>Header Two</AccordionHeader>
          <AccordionDetail>Detail two</AccordionDetail>
        </AccordionItem>
      </Fragment>
    </Accordion>
  );

  const firstStickyContainer = container.querySelector(
    '[data-testid="stickycontainer_test_0"]'
  );
  const firstSticky = container.querySelector('[data-testid="sticky_test_0"]');

  const secondStickyContainer = container.querySelector(
    '[data-testid="stickycontainer_test_1"]'
  );
  const secondSticky = container.querySelector('[data-testid="sticky_test_1"]');

  // expect first Sticky Container not to be there, and second to be there
  expect(firstStickyContainer).toBeFalsy();
  expect(firstSticky).toBeFalsy();

  expect(secondStickyContainer).toBeTruthy();
  expect(secondSticky).toBeTruthy();
});

test('<AccordionItem sticky> should handle click event', () => {
  const { container, getAllByText } = render(
    <Accordion testMode>
      <Fragment>
        <AccordionItem>
          <AccordionHeader>Header One</AccordionHeader>
          <AccordionDetail>Detail one</AccordionDetail>
        </AccordionItem>
      </Fragment>
      <Fragment>
        <AccordionItem sticky onClick={testFn}>
          <AccordionHeader>Header Two</AccordionHeader>
          <AccordionDetail>Detail two</AccordionDetail>
        </AccordionItem>
      </Fragment>
    </Accordion>
  );

  const firstStickyContainer = container.querySelector(
    '[data-testid="stickycontainer_test_0"]'
  );
  const firstSticky = container.querySelector('[data-testid="sticky_test_0"]');

  const secondStickyContainer = container.querySelector(
    '[data-testid="stickycontainer_test_1"]'
  );
  const secondSticky = container.querySelector('[data-testid="sticky_test_1"]');

  // expect first Sticky Container not to be there, and second to be there
  expect(firstStickyContainer).toBeFalsy();
  expect(firstSticky).toBeFalsy();

  expect(secondStickyContainer).toBeTruthy();
  expect(secondSticky).toBeTruthy();

  const firstAccordionHeader = getAllByText('Header One');
  const secondAccordionHeader = getAllByText('Header Two');

  // toggle first AccordionItem
  fireEvent.click(firstAccordionHeader[1]);

  // toggle second AccordionItem
  fireEvent.click(secondAccordionHeader[1]);
});

test('<Accordion header default styles>', () => {
  const { container } = render(
    <Accordion>
      <AccordionItem>
        <AccordionHeader>
          <AccordionTitle>Color and storage</AccordionTitle>
          <AccordionSubTitle>Crown Silver 256GB</AccordionSubTitle>
        </AccordionHeader>
        <AccordionDetail>
          Choose an iPhone color and storage size
        </AccordionDetail>
      </AccordionItem>
    </Accordion>
  );

  // title
  const accordionTitle = container.querySelector('h5[class^="StyledTitle"]');
  expect(accordionTitle).toHaveStyleRule('font-size', '1.25rem');
  expect(accordionTitle).toHaveStyleRule('font-weight', '400');
  expect(accordionTitle).toHaveStyleRule(
    'font-family',
    'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
  );
  expect(accordionTitle).toHaveStyleRule('text-decoration', 'none');
  expect(accordionTitle).toHaveStyleRule('color', '#000000');
  expect(accordionTitle).toHaveStyleRule('margin', '0');
  // sub title
  const accordionSubTitle = container.querySelector('p[class^="StyledBody"]');
  expect(accordionSubTitle).toHaveStyleRule('font-size', '1rem');
  expect(accordionSubTitle).toHaveStyleRule('font-weight', '400');
  expect(accordionSubTitle).toHaveStyleRule(
    'font-family',
    'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
  );
  expect(accordionSubTitle).toHaveStyleRule('letter-spacing', '0.03125rem');
  expect(accordionSubTitle).toHaveStyleRule('text-decoration', 'none');
  expect(accordionSubTitle).toHaveStyleRule('color', '#6f7171');
  expect(accordionSubTitle).toHaveStyleRule('margin', '0');
});

test('<Accordion header styles when surface="dark">', () => {
  const { container } = render(
    <Accordion surface="dark">
      <AccordionItem>
        <AccordionHeader>
          <AccordionTitle>Color and storage</AccordionTitle>
          <AccordionSubTitle>Crown Silver 256GB</AccordionSubTitle>
        </AccordionHeader>
        <AccordionDetail>
          Choose an iPhone color and storage size
        </AccordionDetail>
      </AccordionItem>
    </Accordion>
  );

  // title
  const accordionTitle = container.querySelector('h5[class^="StyledTitle"]');
  expect(accordionTitle).toHaveStyleRule('font-size', '1.25rem');
  expect(accordionTitle).toHaveStyleRule('font-weight', '400');
  expect(accordionTitle).toHaveStyleRule(
    'font-family',
    'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
  );
  expect(accordionTitle).toHaveStyleRule('line-height', '1.5rem');
  expect(accordionTitle).toHaveStyleRule('text-decoration', 'none');
  expect(accordionTitle).toHaveStyleRule('color', '#ffffff');
  expect(accordionTitle).toHaveStyleRule('margin', '0');
  // sub title
  const accordionSubTitle = container.querySelector('p[class^="StyledBody"]');
  expect(accordionSubTitle).toHaveStyleRule('font-size', '1rem');
  expect(accordionSubTitle).toHaveStyleRule('font-weight', '400');
  expect(accordionSubTitle).toHaveStyleRule(
    'font-family',
    'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
  );
  expect(accordionSubTitle).toHaveStyleRule('letter-spacing', '0.03125rem');
  expect(accordionSubTitle).toHaveStyleRule('line-height', '1.25rem');
  expect(accordionSubTitle).toHaveStyleRule('text-decoration', 'none');
  expect(accordionSubTitle).toHaveStyleRule('color', '#a7a7a7');
  expect(accordionSubTitle).toHaveStyleRule('margin', '0');
});

test('<Accordion Item default styles">', () => {
  const { container } = render(
    <Accordion>
      <AccordionItem>
        <AccordionHeader>
          <AccordionTitle>Color and storage</AccordionTitle>
          <AccordionSubTitle>Crown Silver 256GB</AccordionSubTitle>
        </AccordionHeader>
        <AccordionDetail>
          Choose an iPhone color and storage size
        </AccordionDetail>
      </AccordionItem>
    </Accordion>
  );

  // top line
  const topline = container.querySelector('[class^="StyledLine"]');
  expect(topline).toHaveStyleRule('height', '0.0625rem');
  expect(topline).toHaveStyleRule('background-color', '#d8dada');
  // accordion header panel button
  const accordionItem = container.querySelector(
    'div[class^="InnerElementWrapper-VDS"]'
  );
  expect(accordionItem).toHaveStyleRule('font-size', '20px');
  expect(accordionItem).toHaveStyleRule('font-weight', '400');
  expect(accordionItem).toHaveStyleRule('font-family', 'Verizon-NHG-eDS');
  expect(accordionItem).toHaveStyleRule('text-align', 'left');
  expect(accordionItem).toHaveStyleRule('overflow-wrap', 'break-word');
  expect(accordionItem).toHaveStyleRule('line-height', '24px');
  expect(accordionItem).toHaveStyleRule('min-height', '24px');
  expect(accordionItem).toHaveStyleRule('border', '0');
  expect(accordionItem).toHaveStyleRule('margin-bottom', '0');
  expect(accordionItem).toHaveStyleRule('color', '#000000');
  expect(accordionItem).toHaveStyleRule('cursor', 'pointer');
  // expect(accordionItem).toHaveStyleRule('background-color', '#ffffff');
  expect(accordionItem).toHaveStyleRule('background', 'none');
  expect(accordionItem).toHaveStyleRule('padding-right', '2.5rem');
  expect(accordionItem).toHaveStyleRule(
    'transition',
    'padding-bottom 350ms ease'
  );
  // accordion detail
  const accordionDetail = container.querySelector(
    '[class^="StyledAccordionDetail"]'
  );
  expect(accordionDetail).toHaveStyleRule('font-size', '1rem');
  expect(accordionDetail).toHaveStyleRule('font-family', 'Verizon-NHG-eDS');
  expect(accordionDetail).toHaveStyleRule('letter-spacing', '0.03125rem');
  expect(accordionDetail).toHaveStyleRule('overflow-wrap', 'break-word');
  expect(accordionDetail).toHaveStyleRule('color', '#000000');
  // expect(accordionDetail).toHaveStyleRule('background-color', '#ffffff');
  expect(accordionDetail).toHaveStyleRule('padding-top', '0');
  expect(accordionDetail).toHaveStyleRule('transition', 'padding 350ms');
});

test('<Accordion Item styles when surface="dark">', () => {
  const { container } = render(
    <Accordion surface="dark">
      <AccordionItem>
        <AccordionHeader>
          <AccordionTitle>Color and storage</AccordionTitle>
          <AccordionSubTitle>Crown Silver 256GB</AccordionSubTitle>
        </AccordionHeader>
        <AccordionDetail>
          Choose an iPhone color and storage size
        </AccordionDetail>
      </AccordionItem>
    </Accordion>
  );

  // top line
  const topline = container.querySelector('[class^="StyledLine"]');
  expect(topline).toHaveStyleRule('background-color', '#333333');
  // accordion header panel button
  const accordionItem = container.querySelector(
    'div[class^="InnerElementWrapper-VDS"]'
  );
  expect(accordionItem).toHaveStyleRule('font-size', '20px');
  expect(accordionItem).toHaveStyleRule('font-weight', '400');
  expect(accordionItem).toHaveStyleRule('font-family', 'Verizon-NHG-eDS');
  expect(accordionItem).toHaveStyleRule('text-align', 'left');
  expect(accordionItem).toHaveStyleRule('overflow-wrap', 'break-word');
  expect(accordionItem).toHaveStyleRule('line-height', '24px');
  expect(accordionItem).toHaveStyleRule('min-height', '24px');
  expect(accordionItem).toHaveStyleRule('border', '0');
  expect(accordionItem).toHaveStyleRule('margin-bottom', '0');
  expect(accordionItem).toHaveStyleRule('color', '#ffffff');
  expect(accordionItem).toHaveStyleRule('cursor', 'pointer');
  // expect(accordionItem).toHaveStyleRule('background-color', '#000000');
  expect(accordionItem).toHaveStyleRule('background', 'none');
  expect(accordionItem).toHaveStyleRule('padding-right', '2.5rem');
  expect(accordionItem).toHaveStyleRule(
    'transition',
    'padding-bottom 350ms ease'
  );
  // accordion detail
  const accordionDetail = container.querySelector(
    '[class^="StyledAccordionDetail"]'
  );
  expect(accordionDetail).toHaveStyleRule('font-size', '1rem');
  expect(accordionDetail).toHaveStyleRule('font-family', 'Verizon-NHG-eDS');
  expect(accordionDetail).toHaveStyleRule('letter-spacing', '0.03125rem');
  expect(accordionDetail).toHaveStyleRule('line-height', '1.25rem');
  expect(accordionDetail).toHaveStyleRule('overflow-wrap', 'break-word');
  expect(accordionDetail).toHaveStyleRule('color', '#ffffff');
  // expect(accordionDetail).toHaveStyleRule('background-color', '#000000');
  expect(accordionDetail).toHaveStyleRule('padding-top', '0');
  expect(accordionDetail).toHaveStyleRule('transition', 'padding 350ms');
});

test('<Accordion trigger type(Icon) default styles>', () => {
  const { container } = render(
    <Accordion>
      <AccordionItem>
        <AccordionHeader triggerType="icon" bold={true}>
          <AccordionTitle>Color and storage</AccordionTitle>
          <AccordionSubTitle>Crown Silver 256GB</AccordionSubTitle>
        </AccordionHeader>
        <AccordionDetail>Choose your payment method</AccordionDetail>
      </AccordionItem>
    </Accordion>
  );

  const triggerIcon = container.querySelector(
    '[class^="TriggerIconWrapper-VDS"]'
  );
});
test('<Accordion trigger type(TextLink) default styles>', () => {
  const { container } = render(
    <Accordion>
      <AccordionItem>
        <AccordionHeader triggerType="link">Payment Method</AccordionHeader>
        <AccordionDetail>Choose your payment method</AccordionDetail>
      </AccordionItem>
    </Accordion>
  );

  // accordion trigger link wrapper styles
  const triggerLinkWrapper = container.querySelector(
    '[class^="toggleIconWrapper"]'
  );
  expect(triggerLinkWrapper).toHaveStyle(
    'max-width: 25%;position: absolute; right: 3px; top: 2rem; padding-left: 1rem;'
  );
  const anchorLink = container.querySelector('[class^="StyledAnchor"]');
  // Define hit area for the link
  expect(anchorLink.firstChild).toHaveStyleRule('display', 'inline');
  expect(anchorLink.firstChild).toHaveStyleRule('box-sizing', 'content-box');
  expect(anchorLink.firstChild).toHaveStyleRule('cursor', 'pointer');
  expect(anchorLink.firstChild).toHaveStyleRule('height', '2.75rem');
  expect(anchorLink.firstChild).toHaveStyleRule('left', '50%');
  expect(anchorLink.firstChild).toHaveStyleRule('top', '50%');
  expect(anchorLink.firstChild).toHaveStyleRule(
    'transform',
    'translate(-50%,-50%)'
  );

  // anchor link text node styles
  expect(anchorLink.lastChild).toHaveStyle(
    'display: inline-block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; vertical-align: text-top;'
  );
  //Hover (Mouse Only) - text link will highlight the border bottom color
  fireEvent.mouseOver(anchorLink);
  expect(anchorLink).toHaveStyleRule(
    'border-bottom',
    '0.125rem solid #000000',
    {
      modifier: `:hover`,
    }
  );
});

test('<Accordion trigger type(TextLink) when opened>', () => {
  const { container } = render(
    <Accordion>
      <AccordionItem>
        <AccordionHeader triggerType="link" openAccordionTriggerLabel="Explore">
          Header One
        </AccordionHeader>
        <AccordionDetail>Upgrade your storage.</AccordionDetail>
      </AccordionItem>
    </Accordion>
  );

  // trigger type link should match the openAccordionTriggerLabel prop text
  const triggerLinkText = container.querySelector('[class^="StyledAnchor"]')
    .lastChild.textContent;
  expect(triggerLinkText).toBe('Explore');
});

test('<Accordion trigger type(TextLink) when closed>', () => {
  const { container } = render(
    <Accordion>
      <AccordionItem opened>
        <AccordionHeader
          triggerType="link"
          closeAccordionTriggerLabel="Collapse"
        >
          Header One
        </AccordionHeader>
        <AccordionDetail>Upgrade your storage.</AccordionDetail>
      </AccordionItem>
    </Accordion>
  );

  // trigger type link should match the closeAccordionTriggerLabel prop text
  const triggerLinkText = container.querySelector('[class^="StyledAnchor"]')
    .lastChild.textContent;
  expect(triggerLinkText).toBe('Collapse');
});

test('<Accordion trigger type(Icon/TextLink) surface="light" styles>', () => {
  const { container } = render(
    <Accordion>
      <AccordionItem>
        <AccordionHeader triggerType="icon">Computer Storage</AccordionHeader>
        <AccordionDetail>header one detail description</AccordionDetail>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader triggerType="link">Payment Method</AccordionHeader>
        <AccordionDetail>header two detail description</AccordionDetail>
      </AccordionItem>
    </Accordion>
  );

  // trigger type SVG arrow icon default color
  const arrowIcon = container.querySelector('[class^="TriggerIconSVGWrapper"]');
});

test('<Accordion trigger type(Icon/TextLink) surface="dark" styles>', () => {
  const { container } = render(
    <Accordion surface="dark">
      <AccordionItem>
        <AccordionHeader triggerType="icon">Computer Storage</AccordionHeader>
        <AccordionDetail>header one detail description</AccordionDetail>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader triggerType="link">Payment Method</AccordionHeader>
        <AccordionDetail>header two detail description</AccordionDetail>
      </AccordionItem>
    </Accordion>
  );

  // trigger type SVG arrow icon inverted color
  const arrowIcon = container.querySelector('[class^="StyledSVG-VDS"]');
  expect(arrowIcon.querySelector('path[fill="#ffffff"]')).toBeTruthy;
});

test('<Viewport when accordion is opened>', () => {
  const { getAllByText, container } = render(
    <Accordion>
      <AccordionItem opened>
        <AccordionHeader>Header One</AccordionHeader>
        <AccordionDetail>Upgrade your storage</AccordionDetail>
      </AccordionItem>
    </Accordion>
  );

  const firstAccordionHeader = getAllByText('Header One');
  firstAccordionHeader[0].parentElement.getAttribute('aria-expanded').toBeFalsy;
  // button container spacing when accordion is opened
  const accordionItem = container.querySelector(
    'div[class^="InnerElementWrapper-VDS"]'
  );
  expect(accordionItem).toHaveStyleRule('padding-top', '32px');
  expect(accordionItem).toHaveStyleRule('padding-bottom', '24px');
});

test('<Viewport when accordion is closed>', () => {
  const { getAllByText, container } = render(
    <Accordion>
      <AccordionItem>
        <AccordionHeader>Header One</AccordionHeader>
        <AccordionDetail>Upgrade your storage</AccordionDetail>
      </AccordionItem>
    </Accordion>
  );

  const firstAccordionHeader = getAllByText('Header One');
  firstAccordionHeader[0].parentElement.getAttribute('aria-expanded')
    .toBeTruthy;
  // button container spacing when accordion is closed
  const accordionItem = container.querySelector(
    'div[class^="InnerElementWrapper-VDS"]'
  );
  expect(accordionItem).toHaveStyleRule('padding-top', '32px');
  expect(accordionItem).toHaveStyleRule('padding-bottom', '32px');
  // trigger icon position when accordion is closed
});
