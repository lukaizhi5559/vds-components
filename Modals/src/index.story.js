import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import { Button } from '@vds-core/buttons';
import { Modal, ModalTitle, ModalBody, ModalFooter } from './index';

const buttonData = {
  primary: {
    children: 'Lorem Ipsum',
    onClick: () => alert('Clicked Primary'),
  },
  close: {
    children: 'Lorem Ipsum',
    onClick: () => alert('Closing Modal'),
  },
};

const longModalBody = `
This Modal uses the Default Header Close Button. Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Sed tempor Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Sed tempor Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              tempor This Modal uses the Default Header Close Button. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed tempor Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Sed tempor This Modal uses the Default Header Close Button.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed tempor Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Sed tempor Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed tempor This Modal uses the Default Header
              Close Button. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Sed tempor Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed tempor Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed tempor Lorem ipsum dolor sit
              amet, consectetur adipiscing elit. Sed tempor This Modal uses the
              Default Header Close Button. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed tempor Lorem ipsum dolor sit
              amet, consectetur adipiscing elit. Sed tempor Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Sed tempor Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Sed tempor This Modal
              uses the Default Header Close Button. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed tempor Lorem ipsum dolor sit
              amet, consectetur adipiscing elit. Sed tempor Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Sed tempor Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Sed tempor This Modal
              uses the Default Header Close Button. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed tempor Lorem ipsum dolor sit
              amet, consectetur adipiscing elit. Sed tempor Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Sed tempor Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Sed tempor This Modal
              uses the Default Header Close Button. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed tempor Lorem ipsum dolor sit
              amet, consectetur adipiscing elit. Sed tempor Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Sed tempor Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Sed tempor

`;

storiesOf('Brand3.0/Modals', module)
  .addDecorator(withKnobs)

  .add('Modal - Controlled', () => {
    const viewportOpts = ['desktop', 'tablet', 'mobile'];
    const fullscreenKnob = boolean('fullscreen', false);
    return (
      <Fragment>
        <Modal
          toggleButton={<Button data-testid="btn"> Show Modal </Button>}
          disableAnimation={boolean('disableAnimation', false)}
          fullScreenDialog={fullscreenKnob}
          viewport={select('viewport', viewportOpts, 'desktop')}
          ariaLabel="Testing Modal"
          opened={boolean('opened', false, 'Props')}
          disableOutsideClick={boolean('disableOutsideClick', false, 'Props')}
          width={text('custom width', '')}
          surface={select('surface', ['light', 'dark'], 'light')}
        >
          <ModalTitle>I am a heading</ModalTitle>
          <ModalBody>
            {/* {longModalBody} */}
            tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            tempor
          </ModalBody>
          <ModalFooter buttonData={buttonData} />
        </Modal>
      </Fragment>
    );
  })

  .add(
    'Modal - Uncontrolled',
    withState({ modalOpened: false })(({ store }) => {
      function _toggleModal() {
        store.set({ modalOpened: !store.state.modalOpened });
      }
      function _modalChanged(modalOpened) {
        store.set({ modalOpened: modalOpened });
      }

      const viewportOpts = ['desktop', 'tablet', 'mobile'];
      const fullscreenKnob = boolean('fullscreen', false);
      const surfaceKnob = select('surface', ['light', 'dark'], 'light');
      return (
        <Fragment>
          <Button onClick={_toggleModal}> Show Modal </Button>
          <Modal
            fullScreenDialog={fullscreenKnob}
            viewport={select('viewport', viewportOpts, 'desktop')}
            ariaLabel="Testing Modal"
            hideCloseButton={boolean('hideCloseButton', false)}
            showCloseButton={undefined}
            onOpenedChange={_modalChanged}
            opened={store.state.modalOpened}
            disableOutsideClick={boolean('disableOutsideClick', false, 'Props')}
            modalHeight={text('custom height', '')}
            modalWidth={text('custom width', '')}
            surface={surfaceKnob}
          >
            <ModalTitle>I am a heading</ModalTitle>
            <ModalBody>{longModalBody}</ModalBody>
            <ModalFooter>
              <Button size="large" onClick={_toggleModal} surface={surfaceKnob}>
                Close
              </Button>
            </ModalFooter>
          </Modal>
        </Fragment>
      );
    })
  );
