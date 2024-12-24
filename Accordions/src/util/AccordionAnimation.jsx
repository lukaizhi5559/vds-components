import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cx from 'classnames';

const propTypes = {
  children: PropTypes.any.isRequired,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

const ANIMATION_STATE_CLASSES = {
  animating: 'rah-animating',
  animatingUp: 'rah-animating--up',
  animatingDown: 'rah-animating--down',
  animatingToHeightZero: 'rah-animating--to-height-zero',
  animatingToHeightAuto: 'rah-animating--to-height-auto',
  animatingToHeightSpecific: 'rah-animating--to-height-specific',
  static: 'rah-static',
  staticHeightZero: 'rah-static--height-zero',
  staticHeightAuto: 'rah-static--height-auto',
  staticHeightSpecific: 'rah-static--height-specific',
};

function startAnimationHelper(callback) {
  const requestAnimationFrameIDs = [];

  requestAnimationFrameIDs[0] = requestAnimationFrame(() => {
    requestAnimationFrameIDs[1] = requestAnimationFrame(() => {
      callback();
    });
  });

  return requestAnimationFrameIDs;
}

function cancelAnimationFrames(requestAnimationFrameIDs) {
  requestAnimationFrameIDs.forEach(id => cancelAnimationFrame(id));
}

const AnimationWrapper = styled.div``;

class AccordionAnimation extends React.Component {
  constructor(props) {
    super(props);
    this.animationFrameIDs = [];
    let height = props.height;
    let overflow = null;
    this.state = {
      animationStateClasses: {},
      height,
      overflow,
      shouldUseTransitions: false,
    };
  }

  componentDidMount() {
    const { opened } = this.props;
    if (opened) {
      this.contentElement.style.display = '';
    } else {
      this.contentDisplay = setTimeout(() => {
        this.contentElement.style.display = 'none';
      }, 350);
    }
    this.animationStateClasses = { ...ANIMATION_STATE_CLASSES };
    const animationStateClasses = this.getStaticStateClasses(this.state.height);
    this.setState({ animationStateClasses: animationStateClasses });
  }

  componentDidUpdate(prevProps, prevState) {
    const { height, opened } = this.props;
    const isCurrentHeightAuto = prevState.height === 'auto';

    if (this.contentElement && height !== prevProps.height) {
      this.showContent(prevState.height);
      this.contentElement.style.overflow = 'hidden';
      const contentHeight = this.contentElement.offsetHeight;
      this.contentElement.style.overflow = '';

      let newHeight = null;
      const timeoutState = {
        height: null,
        overflow: 'hidden',
      };

      if (height === 0) {
        newHeight = height;
        timeoutState.height = newHeight;
      } else {
        newHeight = contentHeight;
        timeoutState.height = 'auto';
        timeoutState.overflow = null;
      }

      if (isCurrentHeightAuto) {
        timeoutState.height = newHeight;
        newHeight = contentHeight;
      }

      const animationStateClasses = cx({
        [this.animationStateClasses.animating]: true,
        [this.animationStateClasses.animatingUp]:
          prevProps.height === 'auto' || height < prevProps.height,
        [this.animationStateClasses.animatingDown]:
          height === 'auto' || height > prevProps.height,
        [this.animationStateClasses.animatingToHeightZero]:
          timeoutState.height === 0,
        [this.animationStateClasses.animatingToHeightAuto]:
          timeoutState.height === 'auto',
      });

      const timeoutAnimationStateClasses = this.getStaticStateClasses(
        timeoutState.height
      );
      this.setState({
        animationStateClasses,
        height: newHeight,
        overflow: 'hidden',
        shouldUseTransitions: !isCurrentHeightAuto,
      });

      clearTimeout(this.timeoutID);
      clearTimeout(this.animationClassesTimeoutID);

      if (isCurrentHeightAuto) {
        timeoutState.shouldUseTransitions = true;

        cancelAnimationFrames(this.animationFrameIDs);
        this.animationFrameIDs = startAnimationHelper(() => {
          this.setState(timeoutState);
        });

        this.animationClassesTimeoutID = setTimeout(() => {
          this.setState({
            animationStateClasses: timeoutAnimationStateClasses,
            shouldUseTransitions: false,
          });

          this.hideContent(timeoutState.height);
        }, 350);
      } else {
        this.timeoutID = setTimeout(() => {
          timeoutState.animationStateClasses = timeoutAnimationStateClasses;
          timeoutState.shouldUseTransitions = false;

          this.setState(timeoutState);

          if (height !== 'auto') {
            this.hideContent(newHeight);
          }
        }, 350);
      }
    }

    // wait until is callapsed to change the overflow to visible.
    if (prevProps.opened !== opened && opened && isCurrentHeightAuto) {
      this.overflowTimeoutId = setTimeout(() => {
        this.setState({
          overflow: 'visible',
        });
      }, 0);
    }
  }

  componentWillUnmount() {
    cancelAnimationFrames(this.animationFrameIDs);
    clearTimeout(this.timeoutID);
    clearTimeout(this.animationClassesTimeoutID);
    clearTimeout(this.overflowTimeoutId);
    clearTimeout(this.contentDisplay);

    this.timeoutID = null;
    this.animationClassesTimeoutID = null;
    this.animationStateClasses = null;
    this.overflowTimeoutId = null;
    this.contentDisplay = null;
  }

  showContent(height) {
    if (height === 0) {
      this.contentElement.style.display = '';
    }
  }

  hideContent(newHeight) {
    if (newHeight === 0) {
      this.contentElement.style.display = 'none';
    }
  }

  getStaticStateClasses(height) {
    return cx({
      [this.animationStateClasses.static]: true,
      [this.animationStateClasses.staticHeightZero]: height === 0,
      [this.animationStateClasses.staticHeightSpecific]: height > 0,
      [this.animationStateClasses.staticHeightAuto]: height === 'auto',
    });
  }

  render() {
    const { children } = this.props;
    const {
      height,
      overflow,
      animationStateClasses,
      shouldUseTransitions,
    } = this.state;

    const componentStyle = {
      height,
      overflow: this.state.overflow,
      transition: 'height 350ms ease',
    };
    const contentStyle = { transition: 'opacity 350ms ease' };

    if (height === 0) {
      contentStyle.opacity = 0;
    }

    const componentClasses = cx({
      [animationStateClasses]: true,
      VDS__: true,
    });

    return (
      <div
        aria-hidden={height === 0}
        className={componentClasses}
        style={componentStyle}
      >
        <div
          style={contentStyle}
          ref={el => {
            if (el) this.contentElement = el;
          }}
        >
          {children}
        </div>
      </div>
    );
  }
}

AccordionAnimation.propTypes = propTypes;

export default AccordionAnimation;
