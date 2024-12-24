import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  boolean,
  select,
  text,
  number,
} from '@storybook/addon-knobs';
import { Notification, NotificationContainer } from './index';
import { withState } from '@dump247/storybook-state';
import { VDSManager } from '@vds-core/utilities';

const Content = styled.p`
  margin: 0;
`;

const viewportOptions = ['mobile', 'desktop', 'tablet'];

let notifcationTypes = {
  error: 'error',
  info: 'info',
  success: 'success',
  warning: 'warning',
};

const notificationItems = [
  {
    type: 'info',
    hideCloseButton: false,
    disableAnimation: false,
    children: (
      <Content>
        A - Info example... Your next billing cycle will begin on Sunday, March
        12.​ To learn more
      </Content>
    ),
  },
  {
    type: 'warning',
    hideCloseButton: false,
    disableAnimation: false,
    children: (
      <Content>
        B - Warning example... Your next billing cycle will begin on Sunday,
        March 12.​ To learn more
      </Content>
    ),
  },
  {
    type: 'error',
    hideCloseButton: false,
    disableAnimation: false,
    children: (
      <Content>
        C - Error example... Your next billing cycle will begin on Sunday, March
        12.​ To learn more
      </Content>
    ),
  },
  {
    type: 'success',
    hideCloseButton: false,
    disableAnimation: false,
    children: (
      <Content>
        D - Success example... Your next billing cycle will begin on Sunday,
        March 12.​ To learn more
      </Content>
    ),
  },
];

storiesOf('Brand3.0/Notifications', module)
  .addDecorator(withKnobs)

  .add('Notification', () => {
    const hideCloseBtnKnob = boolean('hideCloseButton', false);
    const fullBleedKnob = boolean('fullBleed', false);
    const disableAnimationKnob = boolean('disableAnimation', false);
    const openedKnob = boolean('opened', true);
    const inlineTreatmentKnob = boolean('inline', false);
    const surfaceKnob = select('surface', ['light', 'dark'], 'light');
    const typeKnob = select('type', notifcationTypes, 'error');
    const layoutKnob = select('layout', ['vertical', 'horizontal', ''], '');
    const titleKnob = text('title', 'Test title');
    const subtitleKnob = text('subtitle', '');
    const hideButtonGroup = boolean('hide button group', false);
    const buttonOneKnob = text(
      'button one text',
      'Text me when service is restored'
    );
    const buttonTwoKnob = text('button two text', '');

    const twoButtonData = [
      {
        children: buttonOneKnob,
        onClick: e => alert('Button clicked!'),
      },
      {
        children: buttonTwoKnob,
        onClick: e => alert('Button clicked!'),
      },
    ];

    const oneButtonData = [
      {
        children: buttonOneKnob,
        onClick: e => alert('Button clicked!'),
      },
    ];

    return (
      <VDSManager>
        <Notification
          type={typeKnob}
          title={titleKnob}
          subtitle={subtitleKnob}
          layout={layoutKnob}
          hideCloseButton={hideCloseBtnKnob}
          fullBleed={fullBleedKnob}
          surface={surfaceKnob}
          opened={openedKnob}
          disableAnimation={disableAnimationKnob}
          inline={inlineTreatmentKnob}
          buttonData={
            hideButtonGroup || !buttonOneKnob
              ? undefined
              : buttonTwoKnob
              ? twoButtonData
              : oneButtonData
          }
        />
      </VDSManager>
    );
  })

  .add(
    'NotificationContainer',
    withState({
      children: null,
      previousItemCount: 3,
      initialLoad: true,
      previousIndex: 0,
    })(({ store }) => {
      const label = 'numberOfOptions';
      const defaultValue = 3;
      const options = {
        range: true,
        min: 2,
        max: 8,
        step: 1,
      };

      var itemsCopy = Array.from(notificationItems),
        children,
        prevCount,
        newChild;

      if (!store.state.children) store.set({ children: itemsCopy });

      const numberOfOptions = number(label, defaultValue, options);

      function _renderChildren() {
        if (store.state.initialLoad) {
          store.set({ initialLoad: false });
          return store.state.children;
        }

        children = store.state.children;
        prevCount = store.state.previousItemCount;
        if (prevCount < numberOfOptions) {
          newIndex = store.state.previousIndex + 1;
          if (newIndex === totalOptions) newIndex = 0;
          newChild = notificationItems[newIndex];
          children.unshift(newChild);
          store.set({
            previousItemCount: prevCount + 1,
            previousIndex: newIndex,
          });
        } else if (prevCount > numberOfOptions) {
          children.splice(children.length - 1, 1);
          store.set({ previousItemCount: prevCount - 1 });
        }
        return children;
      }

      if (children && children.length !== store.state.children)
        store.set({ children: children });

      return <NotificationContainer childArray={_renderChildren()} />;
    })
  );
