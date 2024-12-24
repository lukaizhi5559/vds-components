import React, { Component } from 'react';
import styled, { css, keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import { calculateRem } from '@vds-core/utilities';
import UNSAFE_SetEnvRef from '@uie/set-env-ref';
import { ColorTokens } from '@vds-tokens/color';

const propTypes = {
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  dialogOpened: PropTypes.bool.isRequired,
  /**
   * @ignore
   */
  opened: PropTypes.bool.isRequired,
  /**
   * @ignore
   */
  fullScreenDialog: PropTypes.bool,
};

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

// Disable automatic passing down of props with external component (Reach UI) https://github.com/styled-components/styled-components/issues/135
const Overlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ surface }) =>
    surface === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'};
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  padding: ${calculateRem(16)};

  ${({ dialogOpened, opened }) =>
    (dialogOpened || opened) &&
    css`
      animation: 0.1s linear 0s ${fadeIn};
    `};

  ${({ unmounted }) =>
    unmounted &&
    css`
      animation: 0.1s linear 0s ${fadeOut};
    `};
`;

/**
 * @ignore
 */
class TooltipDialogOverlay extends Component {
  componentDidMount() {
    typeof document !== 'undefined' &&
      document.addEventListener('keydown', this.handleDown);
  }

  componentWillUnmount() {
    typeof document !== 'undefined' &&
      document.removeEventListener('keydown', this.handleDown);
  }

  handleDown = e => {
    if (e.keyCode === 27) {
      // this.props.onDismiss();
    }
  };

  refPath = UNSAFE_SetEnvRef();

  render() {
    const {
      children,
      fullScreenDialog,
      noMobilePadding,
      viewport,
      surface,
      dialogOpened,
      unmounted,
    } = this.props;

    return (
      // ref will need to be changed to innerRef upon downgrade of styled-components
      <Overlay
        fullScreenDialog={fullScreenDialog}
        noMobilePadding={noMobilePadding}
        viewport={viewport}
        surface={surface}
        dialogOpened={dialogOpened}
        unmounted={unmounted}
        {...{ [this.refPath]: elem => (this.overlayRef = elem) }}
      >
        {children}
      </Overlay>
    );
  }
}

TooltipDialogOverlay.propTypes = propTypes;

export default TooltipDialogOverlay;
