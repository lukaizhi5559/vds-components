import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { calculateRem } from '@vds-core/utilities';
import { AccessibilityTokens } from '@vds-tokens/accessibility';

const propTypes = {
  /**
   * @ignore
   */
  size: PropTypes.oneOf(['medium', 'small']),
  /**
   * @ignore
   */
  showDialog: PropTypes.bool,
  /**
   * @ignore
   */
  hovered: PropTypes.bool,
  /**
   * @ignore
   */
  activeStyleState: PropTypes.bool,
};

const defaultProps = {
  showDialog: false,
  hovered: false,
  activeStyleState: false,
};

const AnchorIconBase = styled.button`
  display: inline-flex;
  justify-content: center;
  background: none;
  color: inherit;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  transition-delay: 0.2s;
  overflow: visible;
  left: ${calculateRem(4)};
  position: relative;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  ${({ keyboardFocused }) =>
    !keyboardFocused &&
    `
    outline: none;

  `};

  ${({ keyboardFocused, surface, size, mobile, hovered }) =>
    keyboardFocused &&
    !mobile &&
    !hovered &&
    `
    outline: none;
    &:focus {
        &::before {
          border: ${calculateRem(
            AccessibilityTokens.focusring.borderwidth.value
          )} ${AccessibilityTokens.focusring.borderstyle.value} ${
      surface === 'dark'
        ? AccessibilityTokens.color.focusring.ondark.value
        : AccessibilityTokens.color.focusring.onlight.value
    };
          border-radius: 50%;
          content: '';
          height: calc(100% - ${size === 'small' ? 2 : 2}px);
          left: 50%; 
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          width: calc(100% - ${size === 'small' ? 2 : 2}px);
        }
    }
  `};

  ${({ keyboardFocused, surface, size, showDialog, mobile, hovered }) =>
    keyboardFocused &&
    showDialog &&
    !mobile &&
    !hovered &&
    `
    outline: none;
        &::before {
          border: ${calculateRem(
            AccessibilityTokens.focusring.borderwidth.value
          )} ${AccessibilityTokens.focusring.borderstyle.value} ${
      surface === 'dark'
        ? AccessibilityTokens.color.focusring.ondark.value
        : AccessibilityTokens.color.focusring.onlight.value
    };
          border-radius: 50%;
          content: '';
          height: calc(100% - ${size === 'small' ? 2 : 2}px);
          left: 50%; 
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          width: calc(100% - ${size === 'small' ? 2 : 2}px);
        }
    
  `};

  ${({ hovered, surface }) =>
    hovered &&
    surface === 'light' &&
    ` 
       &:focus,
       &.focus-visible {
        outline: none;
        &::after {
          border: none;
          outline: none;
        }
      }
    `};
  svg {
    -webkit-transform: translate(0px, 0px);
  }
`;

AnchorIconBase.propTypes = propTypes;
AnchorIconBase.defaultProps = defaultProps;

export default AnchorIconBase;
