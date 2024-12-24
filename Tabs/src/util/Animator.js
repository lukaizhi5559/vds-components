// This polyfill prevents Intersection Observer from breaking IE
require('intersection-observer');

import React, { Component } from 'react';
import styled, { css, keyframes } from 'styled-components';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import UNSAFE_SetEnvRef from '@uie/set-env-ref';
import animationConfig from './animationConfig';
import { withVDSManager } from '@vds-core/utilities';

const propTypes = {
  /**
   * @ignore
   * ref for component
   */
  // setAnimationRef: PropTypes.func,
  /**
  /**
   * Animation name
   */
  name: PropTypes.oneOf(['slideUp', 'fadeInUp']),
  /**
   * Pass a boolean value to start the animation, if set to true, animation starts when component mounts.
   */
  startAnimation: PropTypes.bool,
  /**
   *
   */
  animated: PropTypes.bool,
};

const defaultProps = {
  // setAnimationRef: () => {},
  name: 'slideUp',
  startAnimation: false,
  animated: true,
};

const buildAnimation = animation => {
  if (animation === {} || !animation) {
    return null;
  }

  const { duration, delay, timingFunction, keyFrame } = animation;
  const animationKeyframe = keyframes`${keyFrame}`;

  // use css helper when using keyframes see https://styled-components.com/docs/basics#animations
  return css`
    animation: ${duration} ${timingFunction} ${delay} ${animationKeyframe};
  `;
};

const AnimatorWrapper = styled.div`
  position: relative;
  ${({ animation, animated }) => animated && buildAnimation(animation)};

  animation-play-state: ${({ startAnimation }) =>
    startAnimation ? 'running' : 'paused'};
`;

class Animator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startAnimation: false,
    };
  }

  componentDidMount = () => {
    // this.props.setAnimationRef(this.animationElem);
    if (this.props.animated) this._setupObserver();
  };

  componentDidUpdate = prevProps => {
    if (prevProps.animated !== this.props.animated) {
      if (this.props.animated) this._setupObserver();
    }
  };

  _setupObserver = () => {
    const options = {
      // root: rootRef,
      rootMargin: '150px 0px 0px 0px',
      threshold: 0,
    };
    this.observer = new IntersectionObserver(this._observationHandler, options);
    let elem = ReactDOM.findDOMNode(this.animationElem);
    if (!this.observer || !elem) return;
    this.observer.observe(elem);
  };

  _observationHandler = (entries, observer) => {
    entries.forEach(entry => {
      this.shouldAnimate = entry.isIntersecting;
      if (this.shouldAnimate) {
        this.setState({ startAnimation: true });
        this.observer.disconnect();
      }
    });
  };

  setAnimationRef = element => {
    this.animationElem = element;
  };

  refKey = UNSAFE_SetEnvRef();

  render() {
    const { name, animated /*, keyFrames*/ } = this.props;

    const { startAnimation } = this.state;

    const animation = animationConfig[name];

    // uncomment bellow if custom keyframes are passed
    // if (keyFrames) {
    //   animation.keyFrame = `${keyFrames}`;
    // }

    return (
      <AnimatorWrapper
        {...{ [this.refKey]: ref => this.setAnimationRef(ref) }}
        animated={animated}
        animation={animation}
        startAnimation={startAnimation}
      >
        {this.props.children}
      </AnimatorWrapper>
    );
  }
}

Animator.propTypes = propTypes;
Animator.defaultProps = defaultProps;

export default withVDSManager(Animator);
