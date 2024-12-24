import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import wrapWithManager from './components/AppManager/withVDSManager';
import VDSManager from './components/AppManager/VDSManager';
import styled from 'styled-components';

const Title = styled.h1``;

class TestManager extends React.PureComponent {
  render() {
    return (
      <Title className={this.props.className}>
        {this.props.viewport || 'Hello!'}
      </Title>
    );
  }
}

const TestManagerWithHOCRegular = wrapWithManager(TestManager);

const TestManagerWithHOCExpanded = wrapWithManager(TestManager, true);

storiesOf('Brand3.0/Utilities', module)
  .addDecorator(withKnobs)

  .add('Viewport Manager', () => {
    return (
      <VDSManager>
        <TestManagerWithHOCRegular />
      </VDSManager>
    );
  })

  .add('Viewport Manager - Expanded viewports', () => {
    return (
      <VDSManager>
        <TestManagerWithHOCExpanded />
      </VDSManager>
    );
  });
