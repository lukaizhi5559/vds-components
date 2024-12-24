import React, { Component } from 'react';
import styled, { css, keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import { calculateRem } from '@vds-core/utilities';
import UNSAFE_SetEnvRef from '@uie/set-env-ref';

const propTypes = {
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  disableOutsideClick: PropTypes.bool,
  /**
   * @ignore
   */
  onDismiss: PropTypes.func.isRequired,
  /**
   * @ignore
   */
  modalOpened: PropTypes.bool.isRequired,
  /**
   * @ignore
   */
  opened: PropTypes.bool.isRequired,
  /**
   * @ignore
   */
  fullScreenDialog: PropTypes.bool,
  /**
   * @ignore
   */
  surface: PropTypes.string,
};

const modalOpacityAnimation = keyframes`
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
  background-color: ${({ fullScreenDialog, viewport, surface }) =>
    fullScreenDialog || viewport === 'mobile'
      ? 'transparent'
      : surface === 'dark'
      ? 'rgba(255, 255, 255, 0.8)'
      : 'rgba(0, 0, 0, 0.8)'};
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  padding: ${({ fullScreenDialog, viewport }) =>
    fullScreenDialog || viewport === 'mobile' ? '0' : calculateRem(16)};

  @media (max-width: 767px) {
    padding: 0;
  }

  ${({ modalOpened, opened }) =>
    (modalOpened || opened) &&
    css`
      animation: ${modalOpacityAnimation} 0.4s
        cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    `};

  ${({ unmounted }) =>
    unmounted &&
    css`
      animation: ${fadeOut} 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    `};
`;

/**
 * @ignore
 */
class ModalOverlay extends Component {
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
      this.props.onDismiss();
    }
  };

  onClick = e => {
    if (this.props.disableOutsideClick) return;

    if (e.target.contains(this.overlayRef)) {
      this.props.onDismiss();
    }
  };

  refPath = UNSAFE_SetEnvRef();

  render() {
    const {
      children,
      fullScreenDialog,
      noMobilePadding,
      viewport,
      unmounted,
      modalOpened,
      surface,
    } = this.props;

    return (
      // ref will need to be changed to innerRef upon downgrade of styled-components
      <Overlay
        unmounted={unmounted}
        modalOpened={modalOpened}
        fullScreenDialog={fullScreenDialog}
        onMouseDown={this.onClick}
        noMobilePadding={noMobilePadding}
        viewport={viewport}
        {...{ [this.refPath]: elem => (this.overlayRef = elem) }}
        surface={surface}
      >
        {children}
      </Overlay>
    );
  }
}

ModalOverlay.propTypes = propTypes;

export default ModalOverlay;
