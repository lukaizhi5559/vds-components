import styled, { css } from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { ColorTokens } from '@vds-tokens/color';
import { LayoutTokens } from '@vds-tokens/layout';
import { checkIfMobileDevice, generateUUID } from '@vds-core/utilities';

const TRACK_WIDTH = 96;
const SCALE_EFFECT = 1.4;

const propTypes = {
  /**
   * Total number of slides within carousel
   */
  numberOfSlides: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  /**
   * Callback for when the track is clicked to progress the carousel forward.
   */
  onMoveForward: PropTypes.func,
  /**
   * Callback for when the track is clicked to progress the carousel backward.
   */
  onMoveBackward: PropTypes.func,
  /**
   * Callback for when the mouse is down on the scrubber. This helps to disable snapping allowing the scrubber to move the carousel 1:1
   */
  onThumbMouseDown: PropTypes.func,
  /**
   * Callback for when the mouse is released on the scrubber. This helps to re enable snapping allowing the carousel to snap at the correct position.
   */
  onThumbMouseUp: PropTypes.func,
  /**
   * Callback for when the mouse is down on the scrubber. This helps to disable snapping allowing the scrubber to move the carousel 1:1
   */
  onThumbTouchStart: PropTypes.func,
  /**
   * Callback for when the mouse is released on the scrubber. This helps to re enable snapping allowing the carousel to snap at the correct position.
   */
  onThumbTouchEnd: PropTypes.func,
  /**
   * Callback when the scrubber has been dragged a certain percentage. The function parameter contains the percentage position the scrubber is currently at.
   */
  onScrubberDrag: PropTypes.func,
  /**
   * The amount of slides visible in the carousel container at one time.
   */
  layout: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Allows a unique id to be passed into the thumb and track of the scrubber
   */
  scrubberId: PropTypes.string,
  /**
   * Percentage value used to set the position of the scrubber. This is used when the carousel container changes position, it will align the position of the scrubber.
   */
  position: PropTypes.number,
  /**
   * @ignore
   */
  selectedGroupIndex: PropTypes.number,
  /**
   * @ignore
   * For storybook purposes only
   */
  enableThumbAnimation: PropTypes.bool,
  /**
   * @ignore
   */
  surface: PropTypes.oneOf(['light', 'dark']),
  /**
   * Allows a string to be provided for analytics.
   */
  'data-analyticstrack': PropTypes.string,
  /**
   * Allows a string to be provided for analytics.
   */
  'data-track': PropTypes.string,
  /**
   * Allows a string to be provided for ignoring analytics tagging.
   */
  'data-track-ignore': PropTypes.string,
  /**
   * Allows a string to be provided for click stream.
   */
  'data-clickstream': PropTypes.string,
};

const defaultProps = {
  surface: 'light',
  enableThumbAnimation: false,
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.1s;
  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color: transparent; // Prevent blue highlight on Android
`;

const Track = styled.div`
  -webkit-user-select: none; // Disable magnifier on iOS
  -webkit-touch-callout: none;
  -webkit-user-callout: none;
  -webkit-user-drag: none;
  -webkit-user-modify: none;
  -webkit-highlight: none;
  -webkit-tap-highlight-color: transparent; // Prevent blue highlight on Android
  position: relative;
  width: ${TRACK_WIDTH}px;
  height: ${({ hovered }) =>
    hovered ? LayoutTokens.space['2X'].value : LayoutTokens.space['1X'].value};
  transition: height 100ms linear, width 100ms linear,
    border-radius 100ms linear;
  box-sizing: border-box;
  border-radius: ${LayoutTokens.space['1X'].value};
  background-color: ${({ surface }) =>
    ColorTokens.interactive.scrolltrack[`on${surface}`].value};

  &::before {
    min-height: 44px;
    min-width: 44px;
    width: 100%;
    height: 100%;
    position: absolute;
    content: '';
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    -webkit-tap-highlight-color: transparent; // Prevent blue highlight on Android
  }
  ${({
    surface,
    percentageLeft,
    percentageRight,
    sideClicked,
    scrubberWidth,
    dragging,
  }) =>
    !dragging &&
    css`
      &:active:not(:focus):not(:focus-within) {
        :after {
          postition: absolute;
          border-radius: 12px;
          content: '';
          height: 100%;
          left: 50%;
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          opacity: 15%;
          background: -webkit-linear-gradient(
            to ${sideClicked === 'right' ? 'left' : 'right'},
            ${surface === 'light'
                ? ColorTokens.palette.black.value
                : ColorTokens.palette.white.value}
              calc(
                ${sideClicked === 'left' ? percentageLeft : percentageRight}% +
                  ${scrubberWidth - 5}px
              ),
            ${surface === 'light'
                ? ColorTokens.palette.gray85.value
                : ColorTokens.palette.gray20.value}
              calc(
                ${sideClicked === 'left' ? percentageLeft : percentageRight}% +
                  ${scrubberWidth - 5}px
              )
          );
          background: linear-gradient(
            to ${sideClicked === 'right' ? 'left' : 'right'},
            ${surface === 'light'
                ? ColorTokens.palette.black.value
                : ColorTokens.palette.white.value}
              calc(
                ${sideClicked === 'left' ? percentageLeft : percentageRight}% +
                  ${scrubberWidth - 5}px
              ),
            ${surface === 'light'
                ? ColorTokens.palette.gray85.value
                : ColorTokens.palette.gray20.value}
              calc(
                ${sideClicked === 'left' ? percentageLeft : percentageRight}% +
                  ${scrubberWidth - 5}px
              )
          );
        }
      }
    `}
`;

const Thumb = styled.div`
  touch-action: manipulation;
  -webkit-user-select: none; // Disable magnifier on iOS
  -webkit-touch-callout: none;
  -webkit-user-callout: none;
  -webkit-user-drag: none;
  -webkit-user-modify: none;
  -webkit-highlight: none;
  -webkit-tap-highlight-color: transparent; // Prevent blue highlight on Android
  position: absolute;
  will-change: transform;
  ${({ enableThumbAnimation }) =>
    enableThumbAnimation
      ? css`
          -webkit-transition: height 100ms linear, left 100ms linear;
          -moz-transition: height 100ms linear, left 100ms linear;
          -o-transition: height 100ms linear, left 100ms linear;
          transition: height 100ms linear, left 100ms linear;
        `
      : css`
          -webkit-transition: height 100ms linear, left 0ms linear;
          -moz-transition: height 100ms linear, left 0ms linear;
          -o-transition: height 100ms linear, left 0ms linear;
          transition: height 100ms linear, left 0ms linear;
        `}
  left: ${({ left }) => left}px;
  border-radius: ${LayoutTokens.space['1X'].value};
  height: ${({ hovered }) =>
    hovered ? LayoutTokens.space['2X'].value : LayoutTokens.space['1X'].value};
  min-width: ${({ hovered }) =>
    hovered ? LayoutTokens.space['5X'].value : LayoutTokens.space['4X'].value};
  width: ${({ scrubberWidth }) => scrubberWidth}px;
  outline: none;
  background-color: ${({ surface }) =>
    ColorTokens.interactive.scrollthumb[`on${surface}`].value};
  z-index: 1;

  /** HIT AREA **/
  &::before {
    min-height: 44px;
    min-width: 44px;
    width: 100%;
    height: 100%;
    position: absolute;
    content: '';
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    -webkit-tap-highlight-color: transparent; // Prevent blue highlight on Android
  };
`;

class CarouselScrollbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideClicked: null,
      hovered: null,
      dragging: false,
      dragDirection: null,
      scrolling: false,
      left: this.props.position || 0,
    };
    this._id = this.props.scrubberId
      ? this.props.scrubberId
      : `${generateUUID()}`;
    this.thumbId = `${this._id}-thumb`;
    this.trackId = `${this._id}-track`;
  }

  _onThumbMouseUp = e => {
    const { onThumbMouseUp } = this.props;
    this.thumb && this.thumb.blur();
    e.stopPropagation();
    onThumbMouseUp && onThumbMouseUp(e);
    this.state.mouse?.clientX &&
      this.setState({ mouse: null, amountMouseMoved: null, scrolling: false });
    typeof window !== 'undefined' &&
      window.removeEventListener('mousemove', this._onMouseMove, true);
  };

  _onThumbTouchEnd = e => {
    const { onThumbTouchEnd } = this.props;
    if (this.touchTimer) clearTimeout(this.touchTimer);
    this.touchTimer = null;
    this.setState({ hovered: false, dragging: false });
    onThumbTouchEnd && onThumbTouchEnd(e);
    this.state.mouse?.clientX &&
      this.setState({ mouse: null, amountMouseMoved: null, scrolling: false });
    typeof window !== 'undefined' &&
      window.removeEventListener('touchmove', this._onMouseMove, true);
  };

  isTouchDevice = checkIfMobileDevice();

  _onWindowMouseUp = e => {
    this.thumb && this.thumb.blur();
    this._onThumbMouseUp(e);
  };

  componentDidMount = () => {
    const { layout, numberOfSlides } = this.props;
    const { left } = this.state;
    this.thumb =
      typeof document !== 'undefined' && document.getElementById(this.thumbId);
    this.track =
      typeof document !== 'undefined' && document.getElementById(this.trackId);
    this.scrubberWidth = (TRACK_WIDTH / numberOfSlides) * parseInt(layout);
    this.reachedEndOfTrack = left >= TRACK_WIDTH - this.scrubberWidth;
    this.percentageLeft = (left / TRACK_WIDTH) * 100;
    this.percentageRight = 100 - this.percentageLeft - this.scrubberWidth;
    typeof window !== 'undefined' &&
      window.addEventListener('touchend', this._onThumbTouchEnd);
    typeof window !== 'undefined' &&
      window.addEventListener('mouseup', this._onWindowMouseUp);

    // 96 - 24 = 72. Have to ensure the max movable width of the track is track_width minus the scrubberWidth
    this.maxScrollableWidth = TRACK_WIDTH - this.scrubberWidth;
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { layout, numberOfSlides, position } = this.props;
    const { left, scrolling } = this.state;
    if (
      parseInt(prevProps.layout) !== parseInt(layout) ||
      prevProps.numberOfSlides !== numberOfSlides
    ) {
      this.scrubberWidth = (TRACK_WIDTH / numberOfSlides) * parseInt(layout);
      this.maxScrollableWidth = TRACK_WIDTH - this.scrubberWidth;
    }
    if (
      prevProps.position !== position &&
      position <= this.maxScrollableWidth &&
      scrolling === false
    ) {
      // props.position is in points. Have to multiply this with maxScrollableWidth
      this.setState({ left: position * this.maxScrollableWidth });
    }
    if (prevState.left !== left) {
      this.percentageLeft = (left / TRACK_WIDTH) * 100;
      this.percentageRight = 100 - this.percentageLeft - this.scrubberWidth;
      this.reachedEndOfTrack = left >= TRACK_WIDTH - this.scrubberWidth;
    }
  };

  _onMouseMove = e => {
    const _clientX = this._getClientX(e);
    const { amountMouseMoved, mouse } = this.state;
    const { onScrubberDrag } = this.props;
    const endOfTrackPosition = TRACK_WIDTH - this.scrubberWidth;
    const newMouseMoved = _clientX - mouse.clientX;
    if (newMouseMoved === amountMouseMoved) return;

    const newLeft = mouse.left + newMouseMoved;

    if (newLeft <= 0) this.setState({ left: 0, newMouseMoved });
    else if (newLeft >= endOfTrackPosition)
      this.setState({
        left: endOfTrackPosition,
        amountMouseMoved: newMouseMoved,
      });
    else this.setState({ left: newLeft, newMouseMoved });

    if (onScrubberDrag) {
      const dragPercentage = newLeft / (TRACK_WIDTH - this.scrubberWidth);
      onScrubberDrag(dragPercentage);
    }
  };

  _onThumbMouseDown = e => {
    const { onThumbMouseDown } = this.props;
    this.thumb && this.thumb.blur();
    e.stopPropagation();
    let x = this._getClientX(e);
    onThumbMouseDown && onThumbMouseDown(e);

    /**
     *
     * these are tracked so we know the initial positions
     * of both the scrubber and the mouse before dragging so we can calculate
     * where we want it and how far its allowed to move.
     */
    this.setState({
      mouse: {
        clientX: x,
        left: this.state.left,
      },
      scrolling: true,
    });
    typeof window !== 'undefined' &&
      window.addEventListener('mousemove', this._onMouseMove, true);
  };

  _onThumbTouchStart = e => {
    const { onThumbTouchStart } = this.props;
    this.setState({ dragging: true }); // Prevent shading when dragging the scrubber
    this.touchTimer = setTimeout(() => {
      this.setState({ hovered: true });
    }, 100);
    onThumbTouchStart && onThumbTouchStart(e);
    let x = this._getClientX(e);
    this.setState({
      mouse: {
        clientX: x,
        left: this.state.left,
      },
      scrolling: true,
    });
    typeof window !== 'undefined' &&
      window.addEventListener('touchmove', this._onMouseMove, true);
  };

  _getClientX = e => {
    return e.targetTouches && e.targetTouches[0]
      ? e.targetTouches[0].clientX // If this is a touch device
      : e.clientX;
  };

  _onMoveForward = e => {
    const { onMoveForward } = this.props;
    onMoveForward && onMoveForward(e);
  };

  _onMoveBackward = e => {
    const { onMoveBackward } = this.props;
    onMoveBackward && onMoveBackward(e);
  };

  //on mouse down of the track this will display the overlay shading giving the user
  // feedback that they have clicked a specific side
  _onMouseDownTrack = e => {
    const { left } = this.state;
    // const { left: trackLeft } = e.target.getBoundingClientRect();
    const trackLeft = e.target?.getBoundingClientRect()?.left;

    const clickedDistanceFromLeft = this._getClientX(e) - Math.round(trackLeft);

    if (left === undefined || clickedDistanceFromLeft < left * SCALE_EFFECT) {
      this.setState({ sideClicked: 'left' });
    } else {
      this.setState({ sideClicked: 'right' });
    }
  };

  //on mouse up after clicking the track moves the scrubber
  _onMouseUpTrack = e => {
    const { sideClicked } = this.state;
    if (sideClicked === 'left') return this._onMoveBackward(e);
    else return this._onMoveForward(e);
  };

  _setHovered = () => this.setState({ hovered: !this.state.hovered });

  _getGroupIndex = () => {
    const { layout, numberOfSlides } = this.props;
    const tilesVisible = parseInt(layout);
    const slideIndex =
      tilesVisible < 2
        ? Math.round((numberOfSlides * this.percentageLeft) / 100)
        : Math.floor((numberOfSlides * this.percentageLeft) / 100);

    const groupIndex = Math.ceil(slideIndex / tilesVisible) + 1;

    return tilesVisible < 2 ? slideIndex + 1 : groupIndex;
  };

  render() {
    const { left, hovered, sideClicked, dragging } = this.state;
    const {
      surface,
      enableThumbAnimation,
      'data-track': track,
      'data-track-ignore': trackIgnore,
      'data-analyticstrack': analyticsTrack,
      'data-clickstream': clickStream,
    } = this.props;

    return (
      <Wrapper
        {...(!this.isTouchDevice && {
          onMouseEnter: this._setHovered,
          onMouseLeave: this._setHovered,
        })}
      >
        <Track
          className="scrollbar-track"
          id={this.trackId}
          hovered={hovered}
          scrubberWidth={this.scrubberWidth}
          percentageRight={this.percentageRight}
          percentageLeft={this.percentageLeft}
          sideClicked={sideClicked}
          onMouseDown={this._onMouseDownTrack}
          onMouseUp={this._onMouseUpTrack}
          onTouchStart={this._onMouseDownTrack}
          onTouchEnd={this._onMouseUpTrack}
          surface={surface}
          dragging={dragging}
          isTouchDevice={this.isTouchDevice}
        >
          <Thumb
            id={this.thumbId}
            onTouchStart={this._onThumbTouchStart}
            onTouchEnd={this._onThumbTouchEnd}
            onMouseDown={this._onThumbMouseDown}
            onMouseUp={this._onThumbMouseUp}
            enableThumbAnimation={enableThumbAnimation}
            hovered={hovered}
            surface={surface}
            scrubberWidth={this.scrubberWidth}
            left={left}
            data-track={track}
            data-track-ignore={trackIgnore}
            data-analyticstrack={analyticsTrack}
            data-clickstream={clickStream}
          />
        </Track>
      </Wrapper>
    );
  }
}

CarouselScrollbar.defaultProps = defaultProps;
CarouselScrollbar.propTypes = propTypes;
export default CarouselScrollbar;
