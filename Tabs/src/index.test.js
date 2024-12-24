import React, { Fragment } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Tabs, Tab, TabButton } from '.';
import { TextLinkCaret } from '@vds-core/buttons';
import PhantomLink from './util/PhantomLink';
import styled from 'styled-components';

global.uniqueId = 100000;

// mock uuid
jest.mock('@vds-core/utilities', () => {
  const originalModule = jest.requireActual('@vds-core/utilities');
  return {
    __esModule: true, // Use it when dealing with esModules
    ...originalModule,
    generateUUID: jest.fn(() => `${++global.uniqueId}`),
  };
});

beforeEach(() => jest.useFakeTimers());

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

const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 180px;
  max-height: 200px;
  widht: 1200px;
`;
const StyledEmptyTab = styled.div``;

const longContent = ` Similique in velit vero, libero porro ut. Similique in velit vero, Similique in velit vero, libero porro ut.Similique in velit vero, libero porro ut.libero porro ut. Similique in velit vero, libero porro ut.Similique in velit vero, libero porro ut. Similique in velit vero, libero porro ut. Similique in velit vero, libero porro ut. Similique in velit vero, libero porro ut. Temporibus earum fuga error libero explicabo numquam officia libero explicabo numquam officiLg
Similique in velit vero, libero porro ut. Similique in velit vero, Similique in velit vero, libero porro ut.Similique in velit vero, libero porro ut.libero porro ut. Similique in velit vero, libero porro ut.Similique in velit vero, libero porro ut. Similique in velit vero, libero porro ut. Similique in velit vero, libero porro ut. Similique in velit vero, libero porro ut. Temporibus earum fuga error libero explicabo numquam officia libero explicabo numquam officiLg
Similique in velit vero, libero porro ut. Similique in velit vero, Similique in velit vero, libero porro ut.Similique in velit vero, libero porro ut.libero porro ut. Similique in velit vero, libero porro ut.Similique in velit vero, libero porro ut. Similique in velit vero, libero porro ut. Similique in velit vero, libero porro ut. Similique in velit vero, libero porro ut. Temporibus earum fuga error libero explicabo numquam officia libero explicabo numquam officiLg`;

test('Tab default styles vertical orientation & sticky', () => {
  const { container } = render(
    <Tabs orientation="vertical" sticky={true}>
      <Tab label="Tab 1" uniqueId="tab1"></Tab>
      <Tab label="Tab 2"></Tab>
    </Tabs>
  );
  const sticky = container.querySelector('[class^="StickyWrapper"]');
  const stickyStyles = window.getComputedStyle(sticky)._values;
  //Sticky Tabs (vertical only) styles
  expect(stickyStyles['position']).toBe('sticky');
  expect(stickyStyles['top']).toBe('0px');
  expect(stickyStyles['padding-top']).toBe('1rem');
  //Default Orientation styles
  const tabsWrap = container.querySelector('[class^="TabsWrapper"]');
  const tabsStyles = window.getComputedStyle(tabsWrap)._values;
  expect(tabsStyles['display']).toBe('flex');
  expect(tabsStyles['flex-direction']).toBe('row');
  //Default borderLine & Border color styles
  const border = container.querySelector('[class^="TabsContainer"]');
  const borderLine = window.getComputedStyle(border)._values;
  expect(borderLine['border-left']).toBe('1px solid #d8dada');
  //Default indicatorPosition styles
  const buttonOne = container.querySelectorAll('a')[0];
  const btText = buttonOne.querySelector('[class^="StyledBody"]');
  expect(btText).toHaveTextContent('Tab 1');
  //Default Size styles
  const font = container.querySelector('[class^="StyledBody"]');
  const fontStyles = window.getComputedStyle(font)._values;
  expect(fontStyles['font-size']).toBe('1rem');
  expect(fontStyles['font-weight']).toBe('700');
  expect(fontStyles['font-family']).toBe(
    'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
  );
  expect(fontStyles['line-height']).toBe('1.25rem');
  expect(fontStyles['letter-spacing']).toBe('0.03125rem');
  expect(fontStyles['text-decoration']).toBe('none');
  expect(fontStyles['color']).toBe('rgb(0, 0, 0)');
  //Default Spacing styles
  const tHover = container.querySelectorAll('[class^="StyledBody"]')[1];
  const tHoverStyles = window.getComputedStyle(tHover)._values;
  expect(tHoverStyles['color']).toBe('rgb(111, 113, 113)');
  fireEvent.mouseOver(tHover);
  expect(tHoverStyles['color']).toBe('rgb(111, 113, 113)');
});

test('Tab default styles', () => {
  const { container } = render(
    <>
      <button id="testBt"></button>
      <Tabs>
        <Tab label="Tab 1" uniqueId="testing">
          <StyledEmptyTab />
        </Tab>
        <Tab label="Tab 2">
          <StyledEmptyTab />
        </Tab>
        <Tab label="Tab 3"></Tab>
        <Tab label="Tab 4">
          <StyledEmptyTab />
        </Tab>
      </Tabs>
    </>
  );
  const tabsWrap = container.querySelector('[class^="TabsWrapper"]');
  const tabsStyles = window.getComputedStyle(tabsWrap)._values;
  //Default Orientation styles
  expect(tabsStyles['display']).toBe('flex');
  expect(tabsStyles['flex-direction']).toBe('column');
  //Default borderLine & Border color styles
  const border = container.querySelector('[class^="StyledTabList"]');
  const borderLine = window.getComputedStyle(border)._values;
  expect(borderLine['box-shadow']).toBe('0px -1px 0px 0px #d8dada inset');
  //Default indicatorPosition styles
  const buttonOne = container.querySelectorAll('button')[1];
  expect(buttonOne).toHaveTextContent('Tab 1');
  /* const indicatorStyles = window.getComputedStyle(buttonOne)._values;
  expect(indicatorStyles['border-top']).toBe('4px solid transparent'); */
  //Default Size styles
  const font = container.querySelector('[class^="StyledBody"]');
  const fontStyles = window.getComputedStyle(font)._values;
  expect(fontStyles['font-size']).toBe('1rem');
  expect(fontStyles['font-weight']).toBe('700');
  expect(fontStyles['font-family']).toBe(
    'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
  );
  expect(fontStyles['line-height']).toBe('1.25rem');
  expect(fontStyles['letter-spacing']).toBe('0.03125rem');
  expect(fontStyles['text-decoration']).toBe('none');
  expect(fontStyles['color']).toBe('rgb(0, 0, 0)');
  //Default Spacing styles
  const space = container.querySelectorAll('li[class^="StyledTab"]')[0];
  expect(space).toHaveStyleRule('margin', '0 1.5rem 0 0');
  //Width, spacing, Hit area
  /*  const hit = container.querySelectorAll('button[class^="StyledTabButton"]')[0];
  const hitStyles = window.getComputedStyle(hit)._values;
  expect(hitStyles['min-height']).toBe('44px');
  expect(hitStyles['min-width']).toBe('44px');
  expect(hitStyles['width']).toBe('auto'); */
  //Default Text color(non-selected tab)
  const text = container.querySelectorAll('button')[2];
  const textStyles = window.getComputedStyle(text.firstChild)._values;
  expect(textStyles['color']).toBe('rgb(111, 113, 113)');
  const tHover = container.querySelectorAll('[class^="StyledBody"]')[2];
  fireEvent.mouseOver(tHover);
  const tHoverStyles = window.getComputedStyle(tHover)._values;
  expect(tHoverStyles['color']).toBe('rgb(0, 0, 0)');
  //Animation styles - are disabled by default in 3.0
  // const ani = container.querySelector('[class^="AnimatorWrapper"]');
  // const anims = window.getComputedStyle(ani)._values;
  // expect(anims['animation']).toBe('0.4s ease-in-out 0ms gguTWq');
  // expect(anims['animation-play-state']).toBe('paused');
});

test('Tab default styles inverted', () => {
  const { container } = render(
    <Tabs surface="dark">
      <Tab label="Tab 1" uniqueId="testing2">
        <StyledEmptyTab />
      </Tab>
      <Tab label="Tab 2">
        <StyledEmptyTab />
      </Tab>
      <Tab label="Tab 3"></Tab>
      <Tab label="Tab 4">
        <StyledEmptyTab />
      </Tab>
    </Tabs>
  );
  //Default borderLine & Border color styles
  const border = container.querySelector('[class^="StyledTabList"]');
  const borderLine = window.getComputedStyle(border)._values;
  expect(borderLine['box-shadow']).toBe('0px -1px 0px 0px #333333 inset');
  //Default indicatorPosition styles
  const buttonOne = container.querySelectorAll('button')[0];
  expect(buttonOne).toHaveTextContent('Tab 1');
  //const indicatorStyles = window.getComputedStyle(buttonOne)._values;
  //expect(indicatorStyles['border-top']).toBe('4px solid transparent');
  //Default Size styles
  const font = container.querySelector('[class^="StyledBody"]');
  const fontStyles = window.getComputedStyle(font)._values;
  expect(fontStyles['font-size']).toBe('1rem');
  expect(fontStyles['font-weight']).toBe('700');
  expect(fontStyles['font-family']).toBe(
    'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
  );
  expect(fontStyles['line-height']).toBe('1.25rem');
  expect(fontStyles['letter-spacing']).toBe('0.03125rem');
  expect(fontStyles['text-decoration']).toBe('none');
  expect(fontStyles['color']).toBe('rgb(255, 255, 255)');
  //Default Spacing styles
  const space = container.querySelectorAll('li[class^="StyledTab"]')[0];
  expect(space).toHaveStyleRule('margin', '0 1.5rem 0 0');
  //Width, spacing, Hit area
  /* const hit = container.querySelectorAll('[class^="StyledTabButton"]')[0];
  const hitStyles = window.getComputedStyle(hit)._values;
  expect(hitStyles['min-height']).toBe('44px');
  expect(hitStyles['min-width']).toBe('44px');
  expect(hitStyles['width']).toBe('auto'); */
  //Default Text color(non-selected tab)
  const text = container.querySelectorAll('button')[2];
  const textStyles = window.getComputedStyle(text.firstChild)._values;
  expect(textStyles['color']).toBe('rgb(167, 167, 167)');
  const tHover = container.querySelectorAll('[class^="StyledBody"]')[2];
  fireEvent.mouseOver(tHover);
  const tHoverStyles = window.getComputedStyle(tHover)._values;
  expect(tHoverStyles['color']).toBe('rgb(255, 255, 255)');
  //Animation styles - are disabled by default in 3.0
  // const ani = container.querySelector('[class^="AnimatorWrapper"]');
  // const anims = window.getComputedStyle(ani)._values;
  // expect(anims['animation']).toBe('0.4s ease-in-out 0ms gguTWq');
  // expect(anims['animation-play-state']).toBe('paused');
});
test('Tab styles borderLine false horizontal', () => {
  const { container } = render(
    <Tabs borderLine={false}>
      <Tab label="Tab 1" uniqueId="tab1">
        <StyledEmptyTab />
      </Tab>
      <Tab label="Tab 2">
        <StyledEmptyTab />
      </Tab>
    </Tabs>
  );
  //borderLine styles
  const border = container.querySelector('[class^="StyledTabList"]');
  const borderLine = window.getComputedStyle(border)._values;
  expect(borderLine['box-shadow']).toBe(undefined);
});
test('Tab styles borderLine false vertical', () => {
  const { container } = render(
    <Tabs borderLine={false} orientation="vertical">
      <Tab label="Tab 1" uniqueId="tab1">
        <StyledEmptyTab />
      </Tab>
      <Tab label="Tab 2">
        <StyledEmptyTab />
      </Tab>
    </Tabs>
  );
  //borderLine styles
  const border = container.querySelector('[class^="TabsContainer"]');
  const borderLine = window.getComputedStyle(border)._values;
  expect(borderLine['border-left']).toBe(undefined);
});
test('Tab styles Size Large', () => {
  const { container } = render(
    <Tabs size="large">
      <Tab label="Tab 1" uniqueId="testing">
        <StyledEmptyTab />
      </Tab>
      <Tab label="Tab 2">
        <StyledEmptyTab />
      </Tab>
    </Tabs>
  );
  //Default Size styles
  /* const font = container.querySelector('span[class^="StyledTitle-VDS"]');
  const fontStyles = window.getComputedStyle(font);
  expect(fontStyles['font-size']).toBe('1.25rem');
  expect(fontStyles['font-weight']).toBe('700');
  expect(fontStyles['font-family']).toBe(
    'Verizon-NHG-eDS,Helvetica,Arial,Sans-serif'
  );
  expect(fontStyles['line-height']).toBe('1.5rem');
  expect(fontStyles['text-decoration']).toBe('none');
  expect(fontStyles['color']).toBe('rgb(0, 0, 0)'); */
  //Default Hit area for Large Tabs
  const hit = container.querySelectorAll('[class^="StyledTabButton"]')[0];
  const hitStyles = window.getComputedStyle(hit)._values;
  expect(hitStyles['min-height']).toBe('56px');
  expect(hitStyles['min-width']).toBe('44px');
  expect(hitStyles['width']).toBe('auto');
});

describe('<Tabs>', () => {
  // TESTS
  beforeEach(() => jest.useFakeTimers());

  const originalOffsetHeight = Object.getOwnPropertyDescriptor(
    window,
    'innerHeight'
  );
  const originalOffsetWidth = Object.getOwnPropertyDescriptor(
    window,
    'innerWidth'
  );

  beforeAll(() => {
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: 200,
    });
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: 800,
    });
  });
  test('should render and match snapshot', () => {
    // Set the global uniqueId for uuid() to prevent Snapshot failures
    global.uniqueId = 100000;

    const { container } = render(
      <Tabs>
        <Tab label="Hello">
          <h3 className="Hello">Hello</h3>
        </Tab>
        <Tab label="Goodbye">
          <h3 className="Goodbye">Goodbye</h3>
        </Tab>
      </Tabs>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('VDS Tab', () => {
    // Set the global uniqueId for uuid() to prevent Snapshot failures
    global.uniqueId = 100000;

    const { container } = render(
      <Tabs>
        <Tab label="Hello">
          <h3 className="Hello">Hello</h3>
        </Tab>
        <Tab label="Hello">
          <h3 className="Goodbye">Goodbye</h3>
        </Tab>
      </Tabs>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render no accent fill/top border', () => {
    // Set the global uniqueId for uuid() to prevent Snapshot failures
    global.uniqueId = 100000;

    const { container } = render(
      <Tabs borderPosition="top">
        <Tab label="Hello" indicatorFillTab={false}>
          <h3 className="Hello">Hello</h3>
        </Tab>
        <Tab label="Goodbye">
          <h3 className="Goodbye">Goodbye</h3>
        </Tab>
      </Tabs>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render TabButton', () => {
    const { container } = render(
      <Tabs borderPosition="top" indicatorFillTab>
        <Tab label="Hello">
          <h3 className="Hello">Hello</h3>
        </Tab>
        <Tab label="Goodbye">
          <h3 className="Goodbye">Goodbye</h3>
        </Tab>
      </Tabs>
    );

    fireEvent.click(container.firstChild);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('render tabs with child and content', () => {
    //jest.runAllTimers();
    const { container, getByRole, rerender } = render(
      <Tabs
        onTabChange={jest.fn()}
        sticky={true}
        orientation={'vertical'}
        viewport={'desktop'}
        selectedIndex={0}
      >
        <Tab label="Hello" uniqueId="tabOne">
          <React.Fragment>
            <h3 className="hello" id="content1">
              {'Hello 123'}
            </h3>
            <div className="hello" id="content1">
              {longContent}
            </div>
          </React.Fragment>
        </Tab>
        <Tab label="Hello 2" uniqueId="tabTwo">
          <h3 className="Goodbye" id="content2">
            {longContent}
          </h3>
        </Tab>
        <Tab label="Hello 3" uniqueId="tabThree">
          <h3 className="Goodbye" id="content3">
            {longContent}
          </h3>
        </Tab>
      </Tabs>
    );
    //window.resizeTo('200','200')
    jest.runAllTimers();
    const wrapperDom = getByRole('tabpanel');
    fireEvent.keyDown(wrapperDom);
    fireEvent.keyUp(wrapperDom);
    expect(wrapperDom).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
  test('render tabs with child and content with specific height', () => {
    //jest.runAllTimers();
    const { container, rerender } = render(
      <TabsContainer>
        <Tabs
          onTabChange={jest.fn()}
          indicatorPosition={'bottom'}
          sticky={true}
          orientation={'vertical'}
          viewport={'mobile'}
          selectedIndex={0}
          overflow={'scroll'}
        >
          <Tab label="Hello" uniqueId="tabOne" tabIndex={0}>
            <React.Fragment>
              <h3 className="hello" id="content1">
                {'Hello 123'}
              </h3>
              <div className="hello" id="content1">
                {longContent}
              </div>
            </React.Fragment>
          </Tab>
          <Tab label="Hello 2" uniqueId="tabTwo" tabIndex={1}>
            <h3 className="Goodbye" id="content2">
              {longContent}
            </h3>
          </Tab>
          <Tab label="Hello 3" uniqueId="tabThree" tabIndex={2}>
            <h3 className="Goodbye" id="content3">
              {longContent}
            </h3>
          </Tab>
        </Tabs>
      </TabsContainer>
    );
    jest.runAllTimers();

    rerender(
      <TabsContainer>
        <Tabs
          onTabChange={jest.fn()}
          sticky={true}
          indicatorPosition={'bottom'}
          orientation={'vertical'}
          viewport={'mobile'}
          selectedIndex={0}
          overflow={'scroll'}
        >
          <Tab label="Hello" uniqueId="tabOne" tabIndex={0}>
            <React.Fragment>
              <h3 className="hello" id="content1">
                {'Hello 123'}
              </h3>
              <div className="hello" id="content1">
                {longContent}
              </div>
            </React.Fragment>
          </Tab>
          <Tab label="Hello 3" uniqueId="tabThree" tabIndex={2}>
            <h3 className="Goodbye" id="content3">
              {longContent}
            </h3>
          </Tab>
        </Tabs>
      </TabsContainer>
    );
    jest.runAllTimers();
    //expect(wrapperDom.getAttribute('tabindex')).toBe("0");
    //fireEvent.scroll(container,{ target: { scrollY: 100 }});
    expect(container).toMatchSnapshot();
  });

  test('<Tab/> - ctaLink with viewport tablest', () => {
    const ctaLink = {
      children: 'View all products A-Z',
      onClick: () => alert('clicked'),
      size: 'large',
      type: 'standAlone',
    };
    const { container, getAllByTestId, rerender } = render(
      <Tabs ctaLink={ctaLink} selectedIndex={0} viewport="tablet">
        <Tab label="testTab1" selected>
          <div>Content one</div>
        </Tab>
        <Tab label="testTab2">
          <div>Content two</div>
        </Tab>
      </Tabs>
    );
    const phantomLink = getAllByTestId('TextLinkCaret')[0].parentNode;
    fireEvent.mouseEnter(phantomLink);
    fireEvent.mouseLeave(phantomLink);

    expect(container).toMatchSnapshot();
  });

  test('<Tab/> - should check visibility change', () => {
    const { container, getAllByTestId, rerender } = render(
      <Tabs viewport="desktop">
        <Tab label="testTab1">
          <div>Content one</div>
        </Tab>
        <Tab label="testTab2">
          <div>Content two</div>
        </Tab>
      </Tabs>
    );

    rerender(
      <Tabs selectedIndex={1} viewport="desktop">
        <Tab label="testTab1">
          <div>Content one</div>
        </Tab>
        <Tab label="testTab2" selected>
          <div>Content two</div>
        </Tab>
      </Tabs>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('<Tab/> - should check visibility change on click', () => {
    const { container, getAllByTestId, rerender } = render(
      <Tabs viewport="desktop">
        <Tab label="testTab1" uniqueId={'tabOne'} isSelected>
          <div>Content one</div>
        </Tab>
        <Tab label="testTab2" uniqueId={'tabTwo'} hide>
          <div>Content two</div>
        </Tab>
      </Tabs>
    );
    const tab1 = container.querySelector('#tab_tabOne');
    //const tabPanel = getByRole('tabpanel')

    fireEvent.focus(tab1);
    fireEvent.click(tab1);

    expect(container.firstChild).toMatchSnapshot();
  });
  test('<Tab/> - should check visibility change selected on click', () => {
    const { container } = render(
      <Tabs viewport="desktop" sticky={true}>
        <Tab label="testTab1" uniqueId={'tabOne'}>
          <div>Content one</div>
        </Tab>
        <Tab label="testTab2" uniqueId={'tabTwo'} selected={1}>
          <div>{longContent}</div>
        </Tab>
      </Tabs>
    );
    jest.runAllTimers();
    const tab1 = container.querySelector('#tab_tabOne');
    //const tabPanel = getByRole('tabpanel')

    fireEvent.focus(tab1);
    fireEvent.click(tab1);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('<Tab/> - should with linePosition as bottom', () => {
    const { container } = render(
      <Tabs viewport="desktop" indicatorPosition={'bottom'} selectedIndex={0}>
        <Tab label="testTab1" uniqueId={'tabOne'} onBlur={jest.fn()}>
          <div>Content one</div>
        </Tab>
        <Tab label="testTab2" uniqueId={'tabTwo'} onBlur={jest.fn()}>
          <div>{longContent}</div>
        </Tab>
      </Tabs>
    );
    jest.runAllTimers();

    expect(container.firstChild).toMatchSnapshot();
  });
});

// const isPanelHidden = (wrapper, panel) => {
//   const searchFor = `${panel}`;
//   expect(
//     wrapper
//       .find(searchFor)
//       .filter('div')
//       .html()
//       .replace(/\s*/g, '')
//   ).toMatch(/aria-hidden="true"/);
//   expect(
//     wrapper
//       .find(searchFor)
//       .filter('div')
//       .html()
//       .replace(/\s*/g, '')
//   ).toMatch(/display:none/);
// };

// const isPanelVisible = (wrapper, panel) => {
//   const searchFor = `${panel}`;
//   expect(
//     wrapper
//       .find(searchFor)
//       .filter('div')
//       .html()
//       .replace(/\s*/g, '')
//   ).toMatch(/aria-hidden="false"/);
//   expect(
//     wrapper
//       .find(searchFor)
//       .filter('div')
//       .html()
//       .replace(/\s*/g, '')
//   ).not.toMatch(/display:none/);
// };

// // Accepts an Enzyme shallow wrapper, and an index equal to 0 or 1
// const expectOnlyActivePanelIsVisible = (wrapper, index) => {
//   const panels = ['#panelHello', '#panelGoodbye'];

//   if (index >= panels.length) {
//     throw Error(
//       `expectContentVisibleInPanel expected an index < ${panels.length}`
//     );
//   }

//   // Tested that the provided panel is visible
//   panels.forEach((panelName, i) => {
//     if (i === index) {
//       isPanelVisible(wrapper, panels[index]);
//     } else {
//       isPanelHidden(wrapper, panels[i]);
//     }
//   });
// };

// // Tabs
// const hasTabActiveProps = (wrapper, index) => {
//   // Can't inspect the element itself it's too deep in the Virtual DOM Tree
//   const ii = index;
//   const elements = wrapper
//     .find('ul')
//     .children()
//     .getElements();

//   return elements[index].props.isActive;
// };

// // Accepts an Enzyme shallow wrapper, and an index equal to 0 or 1
// const expectOnlyActiveTabSelected = (wrapper, index) => {
//   const tabs = [0, 1];

//   if (index >= tabs.length) {
//     throw Error(
//       `expectContentVisibleIntab expected an index < ${tabs.length}`
//     );
//   }

//   // Tested that the provided tab is visible
//   tabs.forEach((tabName, i) => {
//     if (i === index) {
//       expect(hasTabActiveProps(wrapper, i)).toBe(true);
//     } else {
//       expect(hasTabActiveProps(wrapper, i)).toBe(false);
//     }
//   });
// };

test('<Tabs/>', () => {
  const { getByText } = render(
    <Tabs>
      <Tab label="Tab1">
        <h2>Tab 1 content</h2>
      </Tab>
      <Tab label="Tab2">
        <h2>Tab 2 content</h2>
      </Tab>
      <Tab label="Tab3">
        <h2>Tab 3 content</h2>
      </Tab>
    </Tabs>
  );

  // Expect 3 tabs, each tab is li and content for each
  expect(document.querySelectorAll('li').length).toBe(3);

  // Expect the first tab to be the selected tab.
  expect(
    document.querySelector('li').firstChild.getAttribute('aria-selected')
  ).toBe('true');

  // Expect 3 labelled content divs, one not hidden
  // expect(getByText('Tab 1 content')).toBeTruthy();
  // expect(
  //   getByText('Tab 1 content').parentElement.getAttribute('aria-labelledby')
  // ).toBe('Tab1');
  // expect(
  //   getByText('Tab 1 content').parentElement.getAttribute('aria-hidden')
  // ).toBe('false');
  // expect(getByText('Tab 2 content')).toBeTruthy();
  // expect(
  //   getByText('Tab 2 content').parentElement.getAttribute('aria-labelledby')
  // ).toBe('Tab2');
  // expect(
  //   getByText('Tab 2 content').parentElement.getAttribute('aria-hidden')
  // ).toBe('true');
  // expect(getByText('Tab 3 content')).toBeTruthy();
  // expect(
  //   getByText('Tab 3 content').parentElement.getAttribute('aria-labelledby')
  // ).toBe('Tab3');
  // expect(
  //   getByText('Tab 3 content').parentElement.getAttribute('aria-hidden')
  // ).toBe('true');

  // Click on the second tab
  // fireEvent.click(document.querySelectorAll('li')[1]);
  // expect(
  //   getByText('Tab 1 content').parentElement.getAttribute('aria-hidden')
  // ).toBe('true');
  // expect(
  //   getByText('Tab 2 content').parentElement.getAttribute('aria-hidden')
  // ).toBe('false');
});

test('<Tabs /> inverted', () => {
  const { container } = render(
    <Tabs surface="dark">
      <Tab label="Tab1">
        <span>content</span>
      </Tab>
      <Tab label="Tab2">
        <span>content</span>
        <span>content</span>
      </Tab>
      <Tab label="Tab3" />
    </Tabs>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('<Tabs /> orientation="vertical"', () => {
  const { container } = render(
    <Tabs orientation="vertical" viewport="desktop">
      <Tab label="Tab1" />
      <Tab label="Tab2" />
      <Tab label="Tab3" />
    </Tabs>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('<Tabs /> selectedIndex', () => {
  const { container, getByText } = render(
    <Tabs selectedIndex={1}>
      <Tab label="Tab1">
        <h2>Tab 1 content</h2>
      </Tab>
      <Tab label="Tab2">
        <h2>Tab 2 content</h2>
      </Tab>
      <Tab label="Tab3">
        <h2>Tab 3 content</h2>
      </Tab>
    </Tabs>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('<Tab /> isActive override activeTabIndex', () => {
  const { getByText } = render(
    <Tabs activeTabIndex={0}>
      <Tab label="Tab1">
        <h2>Tab 1 content</h2>
      </Tab>
      <Tab label="Tab2" isActive>
        <h2>Tab 2 content</h2>
      </Tab>
      <Tab label="Tab3">
        <h2>Tab 3 content</h2>
      </Tab>
    </Tabs>
  );

  // Expect first tab NOT to be 'selected'
  // expect(
  //   document.querySelectorAll('li')[0].firstChild.getAttribute('aria-selected')
  // ).toBe('false');
  // // Expect second tab to be 'selected'
  // expect(
  //   document.querySelectorAll('li')[1].firstChild.getAttribute('aria-selected')
  // ).toBe('true');

  // // Expect only the second tab to show content
  // expect(
  //   getByText('Tab 1 content').parentElement.getAttribute('aria-hidden')
  // ).toBe('true');
  // expect(
  //   getByText('Tab 2 content').parentElement.getAttribute('aria-hidden')
  // ).toBe('false');
  // expect(
  //   getByText('Tab 3 content').parentElement.getAttribute('aria-hidden')
  // ).toBe('true');
});

test('<Tab /> isActive change updates Active Tab', () => {
  const { getByText, rerender } = render(
    <Tabs activeTabIndex={0}>
      <Tab label="Tab1">
        <h2>Tab 1 content</h2>
      </Tab>
      <Tab label="Tab2">
        <h2>Tab 2 content</h2>
      </Tab>
      <Tab label="Tab3">
        <h2>Tab 3 content</h2>
      </Tab>
    </Tabs>
  );

  // Expect first tab is 'selected'
  // expect(
  //   document.querySelectorAll('li')[0].firstChild.getAttribute('aria-selected')
  // ).toBe('true');

  // Set isActive on 2nd Tab
  rerender(
    <Tabs activeTabIndex={1}>
      <Tab label="Tab1">
        <h2>Tab 1 content</h2>
      </Tab>
      <Tab label="Tab2" isActive>
        <h2>Tab 2 content</h2>
      </Tab>
      <Tab label="Tab3">
        <h2>Tab 3 content</h2>
      </Tab>
    </Tabs>
  );

  // Expect first tab NOT to be 'selected'
  // expect(
  //   document.querySelectorAll('li')[0].firstChild.getAttribute('aria-selected')
  // ).toBe('false');
  // // Expect second tab to be 'selected'
  // expect(
  //   document.querySelectorAll('li')[1].firstChild.getAttribute('aria-selected')
  // ).toBe('true');

  // // Expect only the second tab to show content
  // expect(
  //   getByText('Tab 1 content').parentElement.getAttribute('aria-hidden')
  // ).toBe('true');
  // expect(
  //   getByText('Tab 2 content').parentElement.getAttribute('aria-hidden')
  // ).toBe('false');
  // expect(
  //   getByText('Tab 3 content').parentElement.getAttribute('aria-hidden')
  // ).toBe('true');
});

test('<Tab /> hide a Tab', () => {
  const { getByText, rerender } = render(
    <Tabs activeTabIndex={1}>
      <Tab label="Tab1">
        <h2>Tab 1 content</h2>
      </Tab>
      <Tab label="Tab2" hide={0}>
        <h2>Tab 2 content</h2>
      </Tab>
      <Tab label="Tab3">
        <h2>Tab 3 content</h2>
      </Tab>
    </Tabs>
  );

  // Set hide = 2 on 2nd Tab
  rerender(
    <Tabs activeTabIndex={1}>
      <Tab label="Tab1">
        <h2>Tab 1 content</h2>
      </Tab>
      <Tab label="Tab2" hide={2}>
        <h2>Tab 2 content</h2>
      </Tab>
      <Tab label="Tab3">
        <h2>Tab 3 content</h2>
      </Tab>
    </Tabs>
  );

  // Expect 2 tabs, each tab is li and content for each
  // expect(document.querySelectorAll('li').length).toBe(2);

  // Expect first tab NOT to be 'selected'
  // expect(
  //   document.querySelectorAll('li')[0].firstChild.getAttribute('aria-selected')
  // ).toBe('false');
  // // Expect third tab to be 'selected'.  Note: Checking Tab[1] because Tab 1 was hidden, which means it won't be rendered by React
  // expect(
  //   document.querySelectorAll('li')[1].firstChild.getAttribute('aria-selected')
  // ).toBe('true');

  // // Expect only the second tab to show content
  // expect(
  //   getByText('Tab 1 content').parentElement.getAttribute('aria-hidden')
  // ).toBe('true');
  // expect(
  //   getByText('Tab 2 content').parentElement.getAttribute('aria-hidden')
  // ).toBe('true');
  // expect(
  //   getByText('Tab 3 content').parentElement.getAttribute('aria-hidden')
  // ).toBe('false');
});

test('<Tab/> should handle <Fragments/> when present in Render Tree', () => {
  // Set the global uniqueId for uuid() to prevent Snapshot failures
  global.uniqueId = 100000;

  const { container, getByText, rerender } = render(
    <Tabs>
      <Fragment>
        <Tab label="Tab1">
          <h2>Tab 1 content</h2>
        </Tab>
      </Fragment>
      <Fragment>
        <Tab label="Tab2">
          <h2>Tab 2 content</h2>
        </Tab>
      </Fragment>
      <Fragment>
        <Tab label="Tab3">
          <h2>Tab 3 content</h2>
        </Tab>
      </Fragment>
    </Tabs>
  );

  expect(container.firstChild).toMatchSnapshot();

  // Set hide = 2 on 2nd Tab
  rerender(
    <Tabs activeTabIndex={1}>
      <Fragment>
        <Tab label="Tab1">
          <h2>Tab 1 content</h2>
        </Tab>
      </Fragment>
      <Fragment>
        <Tab label="Tab2" hide={2}>
          <h2>Tab 2 content</h2>
        </Tab>
      </Fragment>
      <Fragment>
        <Tab label="Tab3">
          <h2>Tab 3 content</h2>
        </Tab>
      </Fragment>
    </Tabs>
  );

  // Expect 2 tabs, each tab is li and content for each
  // expect(document.querySelectorAll('li').length).toBe(2);

  // Expect first tab NOT to be 'selected'
  // expect(
  //   document.querySelectorAll('li')[0].firstChild.getAttribute('aria-selected')
  // ).toBe('false');
  // // Expect third tab to be 'selected'.  Note: Checking Tab[1] because Tab 1 was hidden, which means it won't be rendered by React
  // expect(
  //   document.querySelectorAll('li')[1].firstChild.getAttribute('aria-selected')
  // ).toBe('true');

  // Expect only the second tab to show content
  // expect(
  //   getByText('Tab 1 content').parentElement.getAttribute('aria-hidden')
  // ).toBe('true');
  // expect(
  //   getByText('Tab 2 content').parentElement.getAttribute('aria-hidden')
  // ).toBe('true');
  // expect(
  //   getByText('Tab 3 content').parentElement.getAttribute('aria-hidden')
  // ).toBe('false');
});

test('<Tabs/> should update tab label content when passed new props', () => {
  // Set the global uniqueId for uuid() to prevent Snapshot failures
  global.uniqueId = 100000;

  const { container, rerender } = render(
    <Tabs>
      <Fragment>
        <Tab label="Tab1">
          <h2>Tab 1 content</h2>
        </Tab>
      </Fragment>
      <Fragment>
        <Tab label="Tab2">
          <h2>Tab 2 content</h2>
        </Tab>
      </Fragment>
      <Fragment>
        <Tab label="Tab3">
          <h2>Tab 3 content</h2>
        </Tab>
      </Fragment>
    </Tabs>
  );

  // expect(container.querySelectorAll('button').length).toBe(3);
  // const buttonOne = container.querySelectorAll('button')[0];
  // expect(buttonOne).toHaveTextContent('Tab1');

  // expect(container.querySelectorAll('h2').length).toBe(3);
  // const headingTwo = container.querySelectorAll('h2')[1];
  // expect(headingTwo).toHaveTextContent('Tab 2 content');

  rerender(
    <Tabs activeTabIndex={1} tabChange={() => {}}>
      <Fragment>
        <Tab label="New Tab1">
          <h2>Tab 1 content</h2>
        </Tab>
      </Fragment>
      <Fragment>
        <Tab label="Tab2">
          <h2>New Tab 2 content</h2>
        </Tab>
      </Fragment>
      <Fragment>
        <Tab label="Tab3">
          <h2>Tab 3 content</h2>
        </Tab>
      </Fragment>
    </Tabs>
  );
  // fireEvent.click(container.firstChild.firstChild.firstChild);
  // expect(buttonOne).toHaveTextContent('New Tab1');
  // expect(headingTwo).toHaveTextContent('New Tab 2 content');
});

test('<Tab/> - componentDidUpdate', () => {
  let testFn = jest.fn();
  const { container, rerender } = render(
    <Tab label="testTab" handleVisibilityChange={testFn} />
  );

  rerender(<Tab label="testTab" />);
  expect(container).toMatchSnapshot();
});

test('<Tab/> - borderLine={false}', () => {
  const { container, rerender } = render(
    <Tabs borderLine={false}>
      <Tab label="testTab1" />
      <Tab label="testTab2" />
    </Tabs>
  );

  expect(container).toMatchSnapshot();
});

test('<Tab/> - size={"large"}', () => {
  const { container, rerender } = render(
    <Tabs size={'large'}>
      <Tab label="testTab1" />
      <Tab label="testTab2" />
    </Tabs>
  );

  expect(container).toMatchSnapshot();
});

test('<Tab/> - indicatorPosition={"top"}', () => {
  const { container, rerender } = render(
    <Tabs indicatorPosition={'top'}>
      <Tab label="testTab1" />
      <Tab label="testTab2" />
    </Tabs>
  );

  expect(container).toMatchSnapshot();
});

test('<Tab/> - sticky', () => {
  const { container, rerender } = render(
    <Tabs sticky viewport="desktop" orientation="vertical">
      <Tab label="testTab1" />
      <Tab label="testTab2" />
    </Tabs>
  );

  expect(container).toMatchSnapshot();
});

test('<Tab/> - ctaLink', () => {
  const ctaLink = {
    children: 'View all products A-Z',
    onClick: () => alert('clicked'),
    size: 'large',
    type: 'standAlone',
  };
  const { container, getAllByTestId, rerender } = render(
    <Tabs
      ctaLink={ctaLink}
      selectedIndex={0}
      viewport="desktop"
      orientation="vertical"
    >
      <Tab label="testTab1">
        <div>Content one</div>
      </Tab>
      <Tab label="testTab2">
        <div>Content two</div>
      </Tab>
    </Tabs>
  );
  const phantonLink = getAllByTestId('TextLinkCaret')[1].parentNode;
  fireEvent.mouseEnter(phantonLink);
  fireEvent.mouseLeave(phantonLink);

  expect(container).toMatchSnapshot();
});

test('VDS Tab tab with uniqueId', () => {
  // Set the global uniqueId for uuid() to prevent Snapshot failures
  global.uniqueId = 100000;

  const { container } = render(
    <Tabs>
      <Tab label="Hello" uniqueId="tabOne">
        <h3 className="Hello">Hello</h3>
      </Tab>
      <Tab label="Hello" uniqueId="tabTwo">
        <h3 className="Goodbye">Goodbye</h3>
      </Tab>
    </Tabs>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('render tabs with child and selected prop', () => {
  // Set the global uniqueId for uuid() to prevent Snapshot failures
  global.uniqueId = 100000;

  const { container } = render(
    <Tabs>
      <Tab label="Hello" uniqueId="tabOne" selected>
        <h3 className="Hello">Hello</h3>
      </Tab>
      <Tab label="Hello" uniqueId="tabTwo">
        <h3 className="Goodbye">Goodbye</h3>
      </Tab>
    </Tabs>
  );
  expect(
    container
      .querySelector('#tab_tabOne')
      .firstChild.getAttribute('aria-selected')
  ).toBe('true');
  //expect(container.firstChild).toMatchSnapshot();
});
test('render tabs with child and onTabChange prop', () => {
  const { container } = render(
    <Tabs onTabChange={jest.fn()}>
      <Tab
        label="Hello"
        uniqueId="tabOne"
        onClick={jest.fn()}
        onTabChange={jest.fn()}
      >
        <h3 className="Hello">Hello</h3>
      </Tab>
      <Tab label="Hello" uniqueId="tabTwo">
        <h3 className="Goodbye">Goodbye</h3>
      </Tab>
    </Tabs>
  );

  const tab1 = container.querySelector('#tab_tabOne');
  fireEvent.click(tab1);

  expect(container.firstChild).toMatchSnapshot();
});
test('render tabs with child and onTabChange prop and selected', () => {
  const { container } = render(
    <Tabs onTabChange={jest.fn()}>
      <Tab label="Hello" uniqueId="tabOne" selected>
        <h3 className="Hello">Hello</h3>
      </Tab>
      <Tab label="Hello" uniqueId="tabTwo">
        <h3 className="Goodbye">Goodbye</h3>
      </Tab>
    </Tabs>
  );

  const tab2 = container.querySelector('#tab_tabTwo');
  fireEvent.click(tab2);
  expect(
    container
      .querySelector('#tab_tabTwo')
      .firstChild.getAttribute('aria-selected')
  ).toBe('true');

  expect(container.firstChild).toMatchSnapshot();
});
test('render tabs with children prop ', () => {
  const { container, getByRole } = render(
    <Tabs onTabChange={jest.fn()} sticky={true} orientation={'vertical'}>
      <Tab label="Hello" uniqueId="tabOne" selected>
        <h3 className="Hello">Hello</h3>
      </Tab>
      <Tab label="Hello2" uniqueId="tabTwo">
        <h3 className="Goodbye">Goodbye</h3>
      </Tab>
    </Tabs>
  );

  const tab1 = container.querySelector('#tab_tabOne');
  const tabPanel = getByRole('tabpanel');

  fireEvent.focus(tab1);
  //fireEvent.blur(tab1)
  expect(tabPanel).toBeTruthy();
  const tab2 = container.querySelector('#tab_tabTwo');
  fireEvent.click(tab2.parentNode);
  //jest.runAllTimers()
  //expect(tabPanel).toHaveAttribute('tabindex', '1');
  //expect(container.querySelector('#tab_tabTwo').firstChild.getAttribute('aria-selected')).toBe('true');

  expect(container.firstChild).toMatchSnapshot();
});

describe('<Tab /> component test', () => {
  test('Test tab with events', () => {
    const { container, rerender } = render(
      <Tab handleVisibilityChange={jest.fn()} uniqueId="tabOne" label="Hello">
        <h3 id="content1" selected={true}>
          Hello
        </h3>
      </Tab>
    );
    const tab1 = container.querySelector('#tab_tabOne');
    fireEvent.focus(tab1);
    fireEvent.mouseOver(tab1);
    fireEvent.keyDown(tab1, { keyCode: 13, charCode: 13, code: 13 });
    fireEvent.mouseOut(tab1);
    expect(container).toMatchSnapshot();
    rerender(
      <Tab uniqueId="tabOne" handleVisibilityChange={jest.fn()} label="Hello">
        <h3 id="content1" selected={false}>
          Hello
        </h3>
      </Tab>
    );
  });
  test('Test tab with events keyDown with code 32', () => {
    const { container, rerender } = render(
      <Tab handleVisibilityChange={jest.fn()} uniqueId="tabOne" label="Hello">
        <h3 id="content1">Hello</h3>
      </Tab>
    );
    const tab1 = container.querySelector('#tab_tabOne');
    fireEvent.focus(tab1);
    fireEvent.mouseOver(tab1);
    fireEvent.keyDown(tab1, { keyCode: 32, charCode: 32, code: 32 });
    fireEvent.mouseOut(tab1);
    expect(container).toMatchSnapshot();
  });
  test('Test tab on mouseDown', () => {
    global.navigator.userAgent =
      'Mozilla/5.0 (Mobile; rv:18.0) Gecko/18.0 Firefox/18.0';

    const { container, rerender } = render(
      <Tab
        fillContainer={true}
        onMouseDown={jest.fn()}
        uniqueId="tabOne"
        label="Hello"
        selected={true}
      >
        <h3 id="content1">Hello</h3>
      </Tab>
    );
    const tab1 = container.querySelector('#tab_tabOne');
    fireEvent.focus(tab1);
    fireEvent.mouseOver(tab1);
    fireEvent.keyDown(tab1, { keyCode: 13, charCode: 13, code: 13 });
    fireEvent.mouseDown(tab1);
    expect(container).toMatchSnapshot();
  });
  test('Test tab with secific width', () => {
    const { container, rerender } = render(
      <Tab
        width={100}
        uniqueId="tabOne"
        size={'large'}
        label="Hello"
        surface="dark"
      >
        <h3 id="content1">Hello</h3>
      </Tab>
    );
    const tab1 = container.querySelector('#tab_tabOne');
    fireEvent.focus(tab1);
    fireEvent.mouseOver(tab1);
    fireEvent.keyDown(tab1, { keyCode: 13, charCode: 13, code: 13 });
    fireEvent.mouseDown(tab1);
    expect(container).toMatchSnapshot();
  });
});

describe('<TabButton /> tests', () => {
  test('should render tabbutton ', () => {
    const { container } = render(
      <TabButton label={'Button 1'} uniqueId="ButtonOne">
        Button1
      </TabButton>
    );
    expect(container).toMatchSnapshot();
  });
  test('should render tabbutton with inverted', () => {
    const { container } = render(
      <TabButton label={'Button 1'} uniqueId="ButtonOne" surface="dark">
        Button1
      </TabButton>
    );
    fireEvent.click(container.firstChild);
    fireEvent.blur(container.firstChild);
    expect(container).toMatchSnapshot();
  });
});

describe('<Phantom Link /> tests', () => {
  test('should render tabbutton ', () => {
    const ctaLink = {
      children: 'View all products A-Z',
      onClick: () => alert('clicked'),
      size: 'large',
      type: 'standAlone',
    };
    const { container } = render(
      <PhantomLink
        ctaLink={ctaLink}
        onMouseEnter={jest.fn()}
        onMouseLeave={jest.fn()}
        isSelected={true}
        orientation={'vertical'}
        isDesktop={true}
        getPosition={() => {}}
        TextLinkCaret={TextLinkCaret}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
