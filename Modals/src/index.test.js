import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { Button } from '../../Buttons/src';
import { Modal, ModalTitle, ModalBody, ModalFooter } from './index';

class ResizeObserver {
  observe() {}
  unobserve() {}
}

beforeEach(() => {
  window.ResizeObserver = ResizeObserver;
  jest.useFakeTimers();
});

jest.mock('@vds-core/utilities', () => {
  const originalModule = jest.requireActual('@vds-core/utilities');
  return {
    __esModule: true, // Use it when dealing with esModules
    ...originalModule,
    generateUUID: jest.fn(() => ''),
  };
});

const buttonData = {
  primary: {
    children: 'Button 1',
  },
  close: {
    children: 'Button 2',
  },
};

test('<Modals default Styles>', () => {
  const { getByText, getByTestId, getByRole } = render(
    <Modal opened viewport="desktop">
      <ModalTitle>I am a heading</ModalTitle>
      <ModalBody>Modal body content</ModalBody>
      <ModalFooter buttonData={buttonData} />
    </Modal>
  );
  //Title styles
  const title = getByText('I am a heading');
  expect(title).toHaveStyleRule('font-size', '2rem', {
    media: '(min-width: 767px)',
  });
  expect(title).toHaveStyleRule('line-height', '2.25rem', {
    media: '(min-width: 767px)',
  });
  expect(title).toHaveStyleRule('font-family', 'Verizon-NHG-eDS');
  expect(title).toHaveStyleRule('color', '#000000');
  //Text styles
  const body = getByText('Modal body content');
  expect(body).toHaveStyleRule('font-size', '1rem');
  expect(body).toHaveStyleRule('line-height', '1.25rem');
  expect(body).toHaveStyleRule('font-family', 'Verizon-NHG-eDS');
  expect(body).toHaveStyleRule('color', '#000000');
  //Button styles
  const bt = getByText('Button 1').parentElement;
  expect(bt).toHaveStyleRule('font-size', '1rem');
  expect(bt).toHaveStyleRule('font-weight', '700');
  expect(bt).toHaveStyleRule('line-height', '1.25rem');
  expect(bt).toHaveStyleRule('border', '0.0625rem solid #000000');
  expect(bt).toHaveStyleRule('color', '#ffffff');
  expect(bt).toHaveStyleRule('background-color', '#000000');
  //Close Icon Button Position styles - Top=0px, Right=0px 48px by 48px
  const cBt = getByTestId('modal-close-button').closest('[class^=IconWrapper]');
  expect(cBt).toHaveStyleRule('position', 'absolute');
  expect(cBt).toHaveStyleRule('display', 'flex');
  expect(cBt).toHaveStyleRule('right', '0px');
  expect(cBt).toHaveStyleRule('top', '0px');
  expect(cBt).toHaveStyleRule('width', '3rem');
  expect(cBt).toHaveStyleRule('height', '3rem');
  expect(cBt).toHaveStyleRule('justify-content', 'center');
  expect(cBt).toHaveStyleRule('align-items', 'center');
  expect(cBt).toHaveStyleRule('z-index', '1');
  //Close Icon size - small
  const cI = getByTestId('modal-close-button').lastChild.firstChild;
  expect(cI).toHaveStyleRule('height', '1.25rem');
  expect(cI).toHaveStyleRule('width', '1.25rem');
  //Close Icon name
  expect(
    cBt.querySelector(
      'path[d="M11.59,10.8l7.11,7.1-.8.8-7.1-7.11L3.7,18.7l-.8-.8L10,10.8,2.9,3.7l.8-.8L10.8,10,17.9,2.9l.8.8Z"]'
    )
  ).toBeTruthy();
  //Modal Window styles
  const wr = getByRole('dialog');
  //Modal Window Border radius
  expect(wr).toHaveStyleRule('border-radius', '0.5rem');
  //Modal Window Background Color
  expect(wr).toHaveStyleRule('background-color', '#ffffff');
  //Modal Window Position - Centered
  const wrp = getByRole('dialog').parentNode;
  expect(wrp).toHaveStyleRule('display', 'flex');
  expect(wrp).toHaveStyleRule('align-items', 'center');
  expect(wrp).toHaveStyleRule('justify-content', 'center');
  //Background Overlay styles - background color
  expect(wrp).toHaveStyleRule('background-color', 'rgba(0,0,0,0.8)');
  //Spacing - Modal
  const space = getByRole('dialog');
  expect(space).toHaveStyleRule('padding', '48px 0px 48px 42px');
  //Spacing - Modal title and Modal Body
  const mtmb = getByTestId('modal-body');
  expect(mtmb).toHaveStyleRule('padding', '1.5rem 0 0 0');
  //Spacing - Modal Body and Modal Footer
  const mbmf = getByTestId('modal-footer');
  expect(mbmf).toHaveStyleRule('padding', '3rem 0 0.25rem 0.125rem');
});

test('<Modals default Styles Inverted>', () => {
  const { getByText, getByTestId, getByRole } = render(
    <Modal opened viewport="desktop" surface="dark">
      <ModalTitle>I am a heading</ModalTitle>
      <ModalBody>Modal body content</ModalBody>
      <ModalFooter buttonData={buttonData} />
    </Modal>
  );
  //Title styles
  const title = getByText('I am a heading');
  expect(title).toHaveStyleRule('font-size', '2rem', {
    media: '(min-width: 767px)',
  });
  expect(title).toHaveStyleRule('line-height', '2.25rem', {
    media: '(min-width: 767px)',
  });
  expect(title).toHaveStyleRule('font-family', 'Verizon-NHG-eDS');
  expect(title).toHaveStyleRule('color', '#ffffff');
  //Text styles
  const body = getByText('Modal body content');
  expect(body).toHaveStyleRule('font-size', '1rem');
  expect(body).toHaveStyleRule('line-height', '1.25rem');
  expect(body).toHaveStyleRule('font-family', 'Verizon-NHG-eDS');
  expect(body).toHaveStyleRule('color', '#ffffff');
  //Button styles
  const bt = getByText('Button 1').parentElement;
  expect(bt).toHaveStyleRule('font-size', '1rem');
  expect(bt).toHaveStyleRule('font-weight', '700');
  expect(bt).toHaveStyleRule('line-height', '1.25rem');
  expect(bt).toHaveStyleRule('border', '0.0625rem solid #ffffff');
  expect(bt).toHaveStyleRule('color', '#000000');
  expect(bt).toHaveStyleRule('background-color', '#ffffff');
  //Close Icon Button Position styles - Top=0px, Right=0px 48px by 48px
  const cBt = getByTestId('modal-close-button').closest('[class^=IconWrapper]');
  expect(cBt).toHaveStyleRule('position', 'absolute');
  expect(cBt).toHaveStyleRule('display', 'flex');
  expect(cBt).toHaveStyleRule('right', '0px');
  expect(cBt).toHaveStyleRule('top', '0px');
  expect(cBt).toHaveStyleRule('width', '3rem');
  expect(cBt).toHaveStyleRule('height', '3rem');
  expect(cBt).toHaveStyleRule('justify-content', 'center');
  expect(cBt).toHaveStyleRule('align-items', 'center');
  expect(cBt).toHaveStyleRule('z-index', '1');
  //Close Icon name
  expect(
    cBt.querySelector(
      'path[d="M11.59,10.8l7.11,7.1-.8.8-7.1-7.11L3.7,18.7l-.8-.8L10,10.8,2.9,3.7l.8-.8L10.8,10,17.9,2.9l.8.8Z"]'
    )
  ).toBeTruthy();
  //Modal Window styles
  const wr = getByRole('dialog');
  //Modal Window Border radius
  expect(wr).toHaveStyleRule('border-radius', '0.5rem');
  //Modal Window Background Color
  expect(wr).toHaveStyleRule('background-color', '#000000');
  //Modal Window Position - Centered
  const wrp = getByRole('dialog').parentNode;
  expect(wrp).toHaveStyleRule('display', 'flex');
  expect(wrp).toHaveStyleRule('align-items', 'center');
  expect(wrp).toHaveStyleRule('justify-content', 'center');
  //Background Overlay styles - background color
  expect(wrp).toHaveStyleRule('background-color', 'rgba(255,255,255,0.8)');
  //Spacing - Modal
  const space = getByRole('dialog');
  expect(space).toHaveStyleRule('padding', '48px 0px 48px 42px');
  //Spacing - Modal title and Modal Body
  const mtmb = getByTestId('modal-body');
  expect(mtmb).toHaveStyleRule('padding', '1.5rem 0 0 0');
  //Spacing - Modal Body and Modal Footer
  const mbmf = getByTestId('modal-footer');
  expect(mbmf).toHaveStyleRule('padding', '3rem 0 0.25rem 0.125rem');
});

test('<Modals default Styles in Mobile>', () => {
  const { getByText, getByTestId, getByRole } = render(
    <Modal opened viewport="mobile">
      <ModalTitle>I am a heading</ModalTitle>
      <ModalBody>Modal body content</ModalBody>
      <ModalFooter buttonData={buttonData} />
    </Modal>
  );
  //Title styles
  const title = getByText('I am a heading');
  expect(title).toHaveStyleRule('font-size', '1.5rem');
  expect(title).toHaveStyleRule('line-height', '1.75rem');
  expect(title).toHaveStyleRule('font-family', 'Verizon-NHG-eDS');
  expect(title).toHaveStyleRule('color', '#000000');
  //Text styles
  const body = getByText('Modal body content');
  expect(body).toHaveStyleRule('font-size', '1rem');
  expect(body).toHaveStyleRule('line-height', '1.25rem');
  expect(body).toHaveStyleRule('font-family', 'Verizon-NHG-eDS');
  expect(body).toHaveStyleRule('color', '#000000');
  //Button styles
  const bt = getByText('Button 1').parentElement;
  expect(bt).toHaveStyleRule('font-size', '1rem');
  expect(bt).toHaveStyleRule('font-weight', '700');
  expect(bt).toHaveStyleRule('line-height', '1.25rem');
  expect(bt).toHaveStyleRule('border', '0.0625rem solid #000000');
  expect(bt).toHaveStyleRule('color', '#ffffff');
  expect(bt).toHaveStyleRule('background-color', '#000000');
  //Close Icon Button Position styles - Top=0px, Right=0px 48px by 48px
  const cBt = getByTestId('modal-close-button').closest('[class^=IconWrapper]');
  expect(cBt).toHaveStyleRule('position', 'absolute');
  expect(cBt).toHaveStyleRule('display', 'flex');
  expect(cBt).toHaveStyleRule('right', '0px');
  expect(cBt).toHaveStyleRule('top', '0px');
  expect(cBt).toHaveStyleRule('width', '3rem');
  expect(cBt).toHaveStyleRule('height', '3rem');
  expect(cBt).toHaveStyleRule('justify-content', 'center');
  expect(cBt).toHaveStyleRule('align-items', 'center');
  expect(cBt).toHaveStyleRule('z-index', '1');
  //Close Icon name
  expect(
    cBt.querySelector(
      'path[d="M11.59,10.8l7.11,7.1-.8.8-7.1-7.11L3.7,18.7l-.8-.8L10,10.8,2.9,3.7l.8-.8L10.8,10,17.9,2.9l.8.8Z"]'
    )
  ).toBeTruthy();
  //Modal Window styles
  const wr = getByRole('dialog');
  //Modal Window Border radius
  expect(wr).toHaveStyleRule('border-radius', '0');
  //Modal Window Background Color
  expect(wr).toHaveStyleRule('background-color', '#ffffff');
  //Modal Window Position - Centered
  const wrp = getByRole('dialog').parentNode;
  expect(wrp).toHaveStyleRule('display', 'flex');
  expect(wrp).toHaveStyleRule('align-items', 'center');
  expect(wrp).toHaveStyleRule('justify-content', 'center');
  //Background Overlay styles - background color
  expect(wrp).toHaveStyleRule('background-color', 'transparent');
  //Spacing - Modal
  const space = getByRole('dialog');
  expect(space).toHaveStyleRule('padding', '0px 0px 0px 12px');
  //Spacing - Modal title and Modal Body
  const mtmb = getByTestId('modal-body');
  expect(mtmb).toHaveStyleRule('padding', '1.5rem 0 0 0');
  //Spacing - Modal Body and Modal Footer
  const mbmf = getByTestId('modal-footer');
  expect(mbmf).toHaveStyleRule('padding', '3rem 0 0.25rem 0.125rem');
});

test('<Modals default Styles in Mobile Inverted>', () => {
  const { getByText, getByTestId, getByRole } = render(
    <Modal opened viewport="mobile" surface="dark">
      <ModalTitle>I am a heading</ModalTitle>
      <ModalBody>Modal body content</ModalBody>
      <ModalFooter buttonData={buttonData} />
    </Modal>
  );
  //Title styles
  const title = getByText('I am a heading');
  expect(title).toHaveStyleRule('font-size', '1.5rem');
  expect(title).toHaveStyleRule('line-height', '1.75rem');
  expect(title).toHaveStyleRule('font-family', 'Verizon-NHG-eDS');
  expect(title).toHaveStyleRule('color', '#ffffff');
  //Text styles
  const body = getByText('Modal body content');
  expect(body).toHaveStyleRule('font-size', '1rem');
  expect(body).toHaveStyleRule('line-height', '1.25rem');
  expect(body).toHaveStyleRule('font-family', 'Verizon-NHG-eDS');
  expect(body).toHaveStyleRule('color', '#ffffff');
  //Button styles
  const bt = getByText('Button 1').parentElement;
  expect(bt).toHaveStyleRule('font-size', '1rem');
  expect(bt).toHaveStyleRule('font-weight', '700');
  expect(bt).toHaveStyleRule('line-height', '1.25rem');
  expect(bt).toHaveStyleRule('border', '0.0625rem solid #ffffff');
  expect(bt).toHaveStyleRule('color', '#000000');
  expect(bt).toHaveStyleRule('background-color', '#ffffff');
  //Close Icon Button Position styles - Top=0px, Right=0px 48px by 48px
  const cBt = getByTestId('modal-close-button').closest('[class^=IconWrapper]');
  expect(cBt).toHaveStyleRule('position', 'absolute');
  expect(cBt).toHaveStyleRule('display', 'flex');
  expect(cBt).toHaveStyleRule('right', '0px');
  expect(cBt).toHaveStyleRule('top', '0px');
  expect(cBt).toHaveStyleRule('width', '3rem');
  expect(cBt).toHaveStyleRule('height', '3rem');
  expect(cBt).toHaveStyleRule('justify-content', 'center');
  expect(cBt).toHaveStyleRule('align-items', 'center');
  expect(cBt).toHaveStyleRule('z-index', '1');
  //Close Icon size - small
  const cI = getByTestId('modal-close-button').lastChild.firstChild;
  expect(cI).toHaveStyleRule('height', '1.25rem');
  expect(cI).toHaveStyleRule('width', '1.25rem');
  //Close Icon name
  expect(
    cBt.querySelector(
      'path[d="M11.59,10.8l7.11,7.1-.8.8-7.1-7.11L3.7,18.7l-.8-.8L10,10.8,2.9,3.7l.8-.8L10.8,10,17.9,2.9l.8.8Z"]'
    )
  ).toBeTruthy();
  //Modal Window styles
  const wr = getByRole('dialog');
  //Modal Window Border radius
  expect(wr).toHaveStyleRule('border-radius', '0');
  //Modal Window Background Color
  expect(wr).toHaveStyleRule('background-color', '#000000');
  //Modal Window Position - Centered
  const wrp = getByRole('dialog').parentNode;
  expect(wrp).toHaveStyleRule('display', 'flex');
  expect(wrp).toHaveStyleRule('align-items', 'center');
  expect(wrp).toHaveStyleRule('justify-content', 'center');
  //Background Overlay styles - background color
  expect(wrp).toHaveStyleRule('background-color', 'transparent');
  //Spacing - Modal
  const space = getByRole('dialog');
  expect(space).toHaveStyleRule('padding', '0px 0px 0px 12px');
  //Spacing - Modal title and Modal Body
  const mtmb = getByTestId('modal-body');
  expect(mtmb).toHaveStyleRule('padding', '1.5rem 0 0 0');
  //Spacing - Modal Body and Modal Footer
  const mbmf = getByTestId('modal-footer');
  expect(mbmf).toHaveStyleRule('padding', '3rem 0 0.25rem 0.125rem');
});

test('<Modal>', () => {
  const { getByTestId, getByText, queryByTestId } = render(
    <Modal
      ariaLabel="A label describing the Modal\'s current content"
      toggleButton={<Button data-testid="button">Toggle Modal</Button>}
    >
      <ModalTitle>Header</ModalTitle>
      <ModalBody>Modal body content</ModalBody>
      <ModalFooter>Modal footer content</ModalFooter>
    </Modal>
  );

  const triggerButton = getByTestId('button');
  fireEvent.click(triggerButton);
  expect(getByTestId('modal-close-button')).toBeTruthy();
  expect(getByTestId('modal-header')).toBeTruthy();
  expect(getByTestId('modal-body')).toBeTruthy();
  expect(getByTestId('modal-footer')).toBeTruthy();
  expect(getByText('Header')).toBeTruthy();
  expect(getByText('Header').tagName).toBe('H2');

  fireEvent.click(getByTestId('modal-close-button'));
  // use runAllTimers to get around CSS animation time to complete
  jest.runAllTimers();
  expect(queryByTestId('modal-header')).toBeFalsy();
  expect(queryByTestId('modal-body')).toBeFalsy();
  expect(queryByTestId('modal-footer')).toBeFalsy();
});

test('<Modal> test ModalTitle accepts element type node', () => {
  const { getByTestId, getByText, queryByTestId } = render(
    <Modal
      ariaLabel="A label describing the Modal\'s current content"
      opened
      closeButton={undefined}
      toggleButton={<Button data-testid="button">Toggle Modal</Button>}
    >
      <ModalTitle>
        <div data-testid="modal-header-div">
          <h2>Modal React Component Header</h2>
        </div>
      </ModalTitle>
      <ModalBody>Modal body content</ModalBody>
      <ModalFooter>Modal footer content</ModalFooter>
    </Modal>
  );
  expect(queryByTestId('modal-header-div')).toBeTruthy();
  expect(getByText('Modal React Component Header').tagName).toBe('H2');
});

test('<Modal> test React Component default Close action', () => {
  const { getByTestId, getByText, queryByTestId } = render(
    <Modal
      ariaLabel="A label describing the Modal\'s current content"
      closeButton={<button data-testid="custom-close-button">X</button>}
      opened
    >
      <ModalTitle>Modal Custom Close Button</ModalTitle>
      {/* <p>Test Custom Close Button</p> */}
    </Modal>
  );
  const closeButton = getByTestId('custom-close-button');
  expect(closeButton).toBeTruthy();
  expect(closeButton.textContent).toEqual('X');
  expect(getByText('Modal Custom Close Button').tagName).toBe('H2');
  fireEvent.click(closeButton);
  expect(queryByTestId('modal-close-button')).toBeFalsy();
});

test('<ModalBase> test onOpenedChanged callback', () => {
  let currentModalOpened = true;
  const checkChanged = val => {
    currentModalOpened = val;
  };
  const { getByTestId } = render(
    <Modal
      ariaLabel="A label describing the Modal\'s current content"
      onOpenedChange={checkChanged}
      // closeButton={<button data-testid="close-button">X</button>}
      opened
    >
      <ModalTitle>Modal Custom Close Button</ModalTitle>
      {/* <p>Test Custom Close Button</p> */}
    </Modal>
  );
  const closeButton = getByTestId('modal-close-button');
  fireEvent.click(closeButton);
  expect(currentModalOpened).toBe(false);
});

test('<Modal> opened is true, no toggleButton', () => {
  const { getByText } = render(
    <Modal ariaLabel="A label describing the Modal\'s current content" opened>
      <h2>True No Toggle</h2>
    </Modal>
  );
  expect(getByText('True No Toggle')).toBeTruthy();
});

test('<Modal> opened is false, no toggleButton', () => {
  const { container } = render(
    <Modal
      ariaLabel="A label describing the Modal\'s current content"
      opened={false}
    >
      <h2>False No Toggle</h2>
    </Modal>
  );
  expect(container.querySelector('[class^="ModalContainer"]')).toBeNull();
});

test('<Modal> test ModalFooter as a child', () => {
  const { getByText } = render(
    <Modal ariaLabel="A label describing the Modal\'s current content" opened>
      <h2>Modal with Child Footer</h2>
      <ModalFooter>Modal Child Footer</ModalFooter>
    </Modal>
  );
  expect(getByText('Modal Child Footer')).toBeTruthy();
});

test('<Modal> Should not dismiss modal when disableOutsideClick', () => {
  const { getByTestId, container } = render(
    <Modal
      ariaLabel="A label describing the Modal\'s current content"
      opened
      disableOutsideClick
    >
      <ModalTitle>Modal with Header</ModalTitle>
      <ModalBody>Modal with Header</ModalBody>
      <ModalFooter>Modal First Footer</ModalFooter>
    </Modal>
  );

  expect(getByTestId('modal-header')).toBeTruthy();
  expect(getByTestId('modal-body')).toBeTruthy();
  expect(getByTestId('modal-footer')).toBeTruthy();
});

// test('<Modal> Should dismiss modal when disableOutsideClick', () => {
//   const { queryByTestId, container } = render(
//     <Modal
//       ariaLabel="A label describing the Modal\'s current content"
//       opened
//     >
//       <ModalTitle>Modal with Header</ModalTitle>
//       <ModalBody>Modal with Header</ModalBody>
//       <ModalFooter>Modal First Footer</ModalFooter>
//     </Modal>
//   );
//   const overlay = container.querySelector('[class^="Overlay"]'); // Click on overlay should close modal
//   // fireEvent.click(overlay);
//   jest.runAllTimers();
//   expect(queryByTestId('modal-header')).toBeFalsy();
//   expect(queryByTestId('modal-body')).toBeFalsy();
//   expect(queryByTestId('modal-footer')).toBeFalsy();
// });

test('<Modal> Should dismiss modal when prop to update modal is changed', () => {
  const { getByTestId, rerender, queryByTestId } = render(
    <Modal
      ariaLabel="A label describing the Modal\'s current content"
      toggleButton={<Button data-testid="button">Toggle Modal</Button>}
    >
      <ModalTitle>Modal with Header</ModalTitle>
      <ModalBody>Modal with Header</ModalBody>
      <ModalFooter>Modal First Footer</ModalFooter>
    </Modal>
  );

  const triggerButton = getByTestId('button');
  fireEvent.click(triggerButton);

  expect(getByTestId('modal-header')).toBeTruthy();
  expect(getByTestId('modal-body')).toBeTruthy();
  expect(getByTestId('modal-footer')).toBeTruthy();

  rerender(
    <Modal
      ariaLabel="A label describing the Modal\'s current content"
      opened={false}
    >
      <ModalTitle>Modal with Header</ModalTitle>
      <ModalBody>Modal with Header</ModalBody>
      <ModalFooter>Modal First Footer</ModalFooter>
    </Modal>
  );

  // use runAllTimers to get around CSS animation time to complete
  jest.runAllTimers();

  expect(queryByTestId('modal-header')).toBeFalsy();
  expect(queryByTestId('modal-body')).toBeFalsy();
  expect(queryByTestId('modal-footer')).toBeFalsy();
});

test('<Modal> Should dismiss modal when escape keydown', async () => {
  const { getByTestId, queryByTestId } = render(
    <Modal
      ariaLabel="A label describing the Modal\'s current content"
      toggleButton={<Button data-testid="button">Toggle Modal</Button>}
    >
      <ModalTitle>Modal with Header</ModalTitle>
      <ModalBody>Modal with Header</ModalBody>
      <ModalFooter>Modal First Footer</ModalFooter>
    </Modal>
  );

  const triggerButton = getByTestId('button');
  fireEvent.click(triggerButton);

  expect(getByTestId('modal-header')).toBeTruthy();
  expect(getByTestId('modal-body')).toBeTruthy();
  expect(getByTestId('modal-footer')).toBeTruthy();

  fireEvent.keyDown(document.body, {
    key: 'Escape',
    keyCode: 27,
    which: 27,
  });

  // use runAllTimers to get around CSS animation time to complete
  jest.runAllTimers();

  expect(queryByTestId('modal-header')).toBeFalsy();
  expect(queryByTestId('modal-body')).toBeFalsy();
  expect(queryByTestId('modal-footer')).toBeFalsy();
});

test('<Modal> test with click events', () => {
  const { getByTestId, getByText, queryByTestId } = render(
    <Modal
      width={560}
      disableOutsideClick={true}
      onOpenedChange={() => {}}
      preventBackButton={true}
      ariaLabel="A label describing the Modal\'s current content"
      toggleButton={<Button data-testid="button">Toggle Modal</Button>}
    >
      <ModalTitle>Header</ModalTitle>
      <ModalBody>Modal body content</ModalBody>
      <ModalFooter>Modal footer content</ModalFooter>
    </Modal>
  );

  const triggerButton = getByTestId('button');
  fireEvent.click(triggerButton);
  fireEvent(
    window,
    new window.PopStateEvent('popstate', {
      location: 'http://www.example.com/?page=1',
      state: { page: 1 },
    })
  );
  fireEvent.keyDown(triggerButton, {
    key: 'Enter',
    keyCode: 13,
    charCode: 13,
  });
  fireEvent.click(getByTestId('modal-header'), {
    type: 'click',
    clientX: 5,
    clientY: 8,
  });
  fireEvent.click(getByTestId('modal-body'), {
    type: 'click',
    clientX: 5,
    clientY: 5,
  });
  fireEvent.keyDown(getByTestId('modal-body'), {
    key: 'Tab',
    keyCode: 9,
    charCode: 9,
  });

  expect(getByTestId('modal-close-button')).toBeTruthy();
  expect(getByTestId('modal-header')).toBeTruthy();
  expect(getByTestId('modal-body')).toBeTruthy();
  expect(getByTestId('modal-footer')).toBeTruthy();
});

test('<Modal> test without close button', () => {
  const { getByTestId, getByText } = render(
    <Modal
      ariaLabel="A label describing the Modal\'s current content"
      opened
      closeButton={null}
      showCloseButton={undefined}
      toggleButton={<Button data-testid="button">Toggle Modal</Button>}
    >
      <ModalTitle>Modal React Component Header</ModalTitle>
      <ModalBody>Modal body content</ModalBody>
      <ModalFooter>Modal footer content</ModalFooter>
    </Modal>
  );

  expect(getByTestId('modal-header')).toBeTruthy();
  expect(getByTestId('modal-body')).toBeTruthy();
  expect(getByTestId('modal-footer')).toBeTruthy();
});

test('<Modal> test close button with mouse events', () => {
  const { getByTestId, getByText } = render(
    <Modal
      ariaLabel="A label describing the Modal\'s current content"
      opened
      closeButton={undefined}
      styleConfig={{ modalCloseButton: { interactiveStates: true } }}
      toggleButton={<Button data-testid="button">Toggle Modal</Button>}
    >
      <ModalTitle>Modal React Component Header</ModalTitle>
      <ModalBody>Modal body content</ModalBody>
      <ModalFooter>Modal footer content</ModalFooter>
    </Modal>
  );
  //MouseEnter event
  fireEvent.mouseEnter(getByTestId('modal-close-button'));

  //MouseLeave event
  fireEvent.mouseLeave(getByTestId('modal-close-button'));

  fireEvent.mouseDown(getByTestId('modal-close-button'), {
    currentTarget: getByTestId('modal-close-button'),
  });

  expect(getByTestId('modal-header')).toBeTruthy();
  expect(getByTestId('modal-body')).toBeTruthy();
  expect(getByTestId('modal-footer')).toBeTruthy();
});

test('<Modal> test React Component default Close button with custom click action ', () => {
  const { getByTestId, getByText, queryByTestId } = render(
    <Modal
      ariaLabel="A label describing the Modal\'s current content"
      closeButton={
        <button onClick={() => {}} data-testid="custom-close-button">
          X
        </button>
      }
      opened
    >
      <ModalTitle>Modal Custom Close Button</ModalTitle>
      {/* <p>Test Custom Close Button</p> */}
    </Modal>
  );
  const closeButton = getByTestId('custom-close-button');
  expect(closeButton).toBeTruthy();
  expect(closeButton.textContent).toEqual('X');
  expect(getByText('Modal Custom Close Button').tagName).toBe('H2');
  fireEvent.click(closeButton);
  expect(queryByTestId('modal-close-button')).toBeFalsy();
});

test('<Modal> Inverted ', () => {
  const { container, getByTestId } = render(
    <Modal
      ariaLabel="A label describing the Modal\'s current content"
      opened
      surface="dark"
    >
      <ModalTitle>Modal Inverted</ModalTitle>
      <ModalBody>Inverted Body Text</ModalBody>
    </Modal>
  );

  // expect(document.querySelector('path[fill="#ffffff"]')).toBeTruthy();
  // expect(window.getComputedStyle(document.querySelector('h2')).color).toBe(
  //   'rgb(255, 255, 255)'
  // );
  // expect(window.getComputedStyle(getByTestId('modal-body')).color).toBe(
  //   'rgb(255, 255, 255)'
  // );
});
