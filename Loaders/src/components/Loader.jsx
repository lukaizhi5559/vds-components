import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import FocusTrap from 'focus-trap-react';
import { withVDSManager, calculateRem } from '@vds-core/utilities';
import { ColorTokens } from '@vds-tokens/color';
import LoaderPortal from './LoaderPortal';
import {
  FadeInAnimation,
  FadeOutAnimation,
  LoadingAnimation,
} from './LoaderAnimations';

export const propTypes = {
  /**
   * Loader will be active if 'active' prop is passed.
   */
  active: PropTypes.bool,
  /**
   * Loader will be contained in its container by default.
   */
  fullscreen: PropTypes.bool,
  /**
   * Allows an id to be passed to the outermost wrapper of the component.
   */
  id: PropTypes.string,
  /**
   * @ignore
   */
  disableFocusLock: PropTypes.bool,
  /**
   * @ignore
   */
  surface: PropTypes.oneOf(['light', 'dark']),
};

export const defaultProps = {
  active: false,
  fullscreen: false,
  disableFocusLock: false,
  surface: 'light',
};

const StyledOverlay = styled.div`
  background-color: ${({ surface }) =>
    surface === 'dark'
      ? ColorTokens.background.primary.dark.value
      : ColorTokens.background.primary.light.value};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;
  position: ${props => (props.fullscreen ? 'fixed' : 'absolute')};
  display: ${props => (props.active ? 'block' : 'none')};
  animation: ${props => (props.active ? FadeInAnimation : FadeOutAnimation)}
    0.15s linear;
  opacity: 0.8;
`;

const StyledLoader = styled.div`
  outline: none;
  display: ${props => (props.active ? 'block' : 'none')};
  animation: ${props => (props.active ? FadeInAnimation : FadeOutAnimation)}
    0.15s linear;
  content: '';
  position: ${props => (props.fullscreen ? 'fixed' : 'absolute')};
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: ${calculateRem(40)};
  height: ${calculateRem(40)};
  display: block;
  z-index: 3;
  border: ${calculateRem(4)} solid
    ${({ surface }) =>
      surface === 'dark'
        ? ColorTokens.elements.primary.ondark.value
        : ColorTokens.elements.primary.onlight.value};
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${LoadingAnimation} 0.5s infinite linear;
`;

const Loader = ({ active, fullscreen, id, disableFocusLock, surface }) => {
  if (active) {
    if (fullscreen) {
      return (
        <LoaderPortal aria-label="loader container" id={id}>
          <FocusTrap
            focusTrapOptions={{ escapeDeactivates: false }}
            active={!disableFocusLock}
          >
            <StyledOverlay
              active={active}
              aria-label="loader overlay"
              fullscreen={fullscreen}
              surface={surface}
            >
              <StyledLoader
                tabIndex={0}
                active={active}
                aria-label="loader animation"
                surface={surface}
              />
            </StyledOverlay>
          </FocusTrap>
        </LoaderPortal>
      );
    }

    return (
      <StyledOverlay
        active={active}
        aria-label="loader overlay"
        surface={surface}
      >
        <StyledLoader
          tabIndex={0}
          active={active}
          aria-label="loader animation"
          surface={surface}
        />
      </StyledOverlay>
    );
  }

  return null;
};

Loader.propTypes = propTypes;
Loader.defaultProps = defaultProps;

export default withVDSManager(Loader);
