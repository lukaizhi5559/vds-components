import styled, { css, keyframes } from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { calculateRem } from '@vds-core/utilities';
import { ColorTokens } from '@vds-tokens/color';

const propTypes = {
  viewport: PropTypes.oneOf(['mobile', 'desktop', 'tablet']),
  /**
   * @ignore
   */
  fullScreenDialog: PropTypes.bool,
  /**
   * @ignore
   * Configures how far the animation slides in/out
   */
  animationDistance: PropTypes.number,
  /**
   * @ignore
   */
  borderRadius: PropTypes.string,
};

const defaultProps = {
  viewport: 'desktop',
  fullScreenDialog: false,
  animationDistance: 150,
};

/* solution to differential equation to determine progress at time t, with friction of 26 and tension of 200*/
const _calcProgress = t => {
  const { exp, sqrt, sin, cos } = Math;
  return (
    -(13 * exp(-13 * t) * sin(sqrt(31) * t)) / sqrt(31) -
    exp(-13 * t) * cos(sqrt(31) * t) +
    1
  );
};

/*linear interpolation for ios animation*/
const _lerp = (a, b, p) => {
  return a + p * (b - a);
};

/*create lists of animation in and out*/
const _calculateSpring = () => {
  let distVals = [];
  let inVals = [];
  for (var i = 0; i <= 40; i++) {
    /* 40 because animation is 400ms  */
    let p = _calcProgress(i / 100);
    let distance = _lerp(
      0,
      typeof window !== 'undefined' && window.innerHeight,
      p
    );
    distVals.push(distance);
    inVals.push(typeof window !== 'undefined' && window.innerHeight - distance);
  }
  return { distVals: distVals, inVals: inVals };
};

const _animateOut = vals => {
  let keyframeString = '';
  vals.map((val, index) => {
    keyframeString += `${(index / vals.length) * 100}% {top: ${val}px }`;
  });
  return keyframes`${keyframeString}`;
};

const _animateIn = vals => {
  let keyframeString = '';
  vals.map((val, index) => {
    keyframeString += `${(index / vals.length) * 100}% {top: ${val}px }`;
  });

  return keyframes`${keyframeString}`;
};

const modalDialogAnimation = y => keyframes`
  0% {
    transform: translateY(${y}px);
  }
  100% {
    transform: translateY(0);
  }
`;

const fadeOut = y => keyframes`
  0% {
    transform: translateY(0px);
    opacity: 1;
  }
  100% {
    transform: translateY(${y}px);
    opacity: 0;
  }
`;

const _calcPadding = (viewport, fullWidthContent = false) => {
  if (viewport === 'mobile') {
    return fullWidthContent ? '0px' : '0px 0px 0px 12px';
  } else {
    return fullWidthContent ? '48px 0px 48px 0px' : '48px 0px 48px 42px';
  }
};

// Desktop if VDS
//    - width = 560, can accept custom width up to 70% viewport
//    - height = 232, can accept custom height up to 70% viewport + padding
//    - *** ModalDialogWrapper - min-content height 136px, max 70% viewport
// Mobile
//    - width/height 100% viewport

function _calcAnimation(animation, animationDistance) {
  if (animation === 'in') {
    return modalDialogAnimation(animationDistance);
  } else {
    return fadeOut(animationDistance);
  }
}
/**
 * @ignore
 */
const ModalDialog = styled.div`
  background-color: ${({ surface }) =>
    surface === 'dark'
      ? ColorTokens.background.primary.dark.value
      : ColorTokens.background.primary.light.value};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-flow: column nowrap;
  height: 99.7%;
  line-height: ${calculateRem(16)};
  min-height: ${calculateRem(232)};
  position: relative;
  width: 100%;
  outline: none;
  border-radius: ${({ borderRadius }) => borderRadius};
  ${({ modalOpened, viewport, fullScreenDialog, disableAnimation }) =>
    modalOpened &&
    ((viewport === 'tablet' && !fullScreenDialog) || viewport === 'desktop') &&
    !disableAnimation &&
    css`
      animation: 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s
        ${({ animationDistance }) => _calcAnimation('in', animationDistance)};
    `};

  ${({ unmounted, viewport, fullScreenDialog, disableAnimation }) =>
    unmounted &&
    ((viewport === 'tablet' && !fullScreenDialog) || viewport === 'desktop') &&
    !disableAnimation &&
    css`
      animation: ${({ animationDistance }) =>
          _calcAnimation('out', animationDistance)}
        0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    `};
  ${({ modalOpened, viewport, fullScreenDialog, disableAnimation }) =>
    modalOpened &&
    (viewport === 'mobile' || (viewport === 'tablet' && fullScreenDialog)) &&
    !disableAnimation &&
    css`
      animation: ${_animateIn(_calculateSpring().inVals)} 400ms linear 0s;
    `};

  ${({ unmounted, viewport, fullScreenDialog, disableAnimation }) =>
    unmounted &&
    (viewport === 'mobile' || (viewport === 'tablet' && fullScreenDialog)) &&
    !disableAnimation &&
    css`
      animation: ${_animateOut(_calculateSpring().distVals)} 400ms linear 0s;
    `};

  ${({ viewport, modalWidth, fullScreenDialog }) =>
    viewport !== 'mobile' &&
    !fullScreenDialog &&
    css`
      @media (min-width: 767px) {
        height: ${({ modalHeight }) =>
          modalHeight
            ? `${modalHeight + 96}px`
            : `auto`}; /* Hard coded value accounting for vds ModalDialogWrapper's margin and padding */
        ${modalWidth
          ? `
              width: ${modalWidth}; // Don't apply calculateRem because user might pass %, vw, px, or number
              max-width: 70vw;
            `
          : `width: ${calculateRem(560)};`};
        max-height: 70vh;
      }
    `};

  @media (min-width: 767px) {
    padding: ${({ fullWidthContent }) =>
      _calcPadding('desktop', fullWidthContent)};
  }

  padding: ${({ viewport, fullWidthContent }) =>
    _calcPadding(viewport, fullWidthContent)};

  @media (max-width: 767px) {
    padding: ${({ fullWidthContent }) =>
      _calcPadding('mobile', fullWidthContent)};
    border-radius: 0;
  }

  ${({ fullScreenDialog, viewport, mobileHeight }) =>
    fullScreenDialog ||
    (viewport === 'mobile' &&
      `
    height: ${mobileHeight} !important;
    width: 100vw !important;
    max-width: 100vw;
    max-height: 100vh;
    border-radius: 0;
  `)};

  min-height: ${({ viewport }) => viewport === 'mobile' && '100%'};

  @media (max-width: 767px) {
    min-height: 100%;
  }
`;

//padding is 16/48 for VDS

ModalDialog.propTypes = propTypes;
ModalDialog.defaultProps = defaultProps;

export default ModalDialog;
