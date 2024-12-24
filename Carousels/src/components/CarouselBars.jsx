import { findDOMNode } from 'react-dom';
import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { withVDSManager, calculateRem } from '@vds-core/utilities';
import { ColorTokens } from '@vds-tokens/color';
import { LayoutTokens } from '@vds-tokens/layout';
import { AccessibilityTokens } from '@vds-tokens/accessibility';

function _calculateBarColor(selected, surface) {
  let barColor;
  let darkMode = surface === 'dark';
  if (selected && !darkMode) {
    barColor = ColorTokens.elements.primary.onlight.value;
  } else if (selected && darkMode) {
    barColor = ColorTokens.elements.primary.ondark.value;
  } else if (!selected && darkMode) {
    barColor = ColorTokens.elements.secondary.ondark.value;
  } else {
    barColor = ColorTokens.elements.secondary.onlight.value;
  }
  return barColor;
}

const propTypes = {
  /**
   * @ignore name used for 3.x only. Remap in 1.x to currentSlide/ activeSlide
   * The current selected slide/bar of the carousel.
   */
  selectedSlide: PropTypes.number,
  /**
   * Allows a unique ID to be passed to the component.
   */
  id: PropTypes.string,
  /**
   *	Unique identifier value for 'aria-controls'.
   */
  uniqueId: PropTypes.string.isRequired,
  /**
   * If provided, used as string that labels the element for accessibility.
   */
  ariaLabel: PropTypes.string,
  /**
   * Total number of slides to render total 'Bars'.
   */
  slideCount: PropTypes.number.isRequired,
  /**
   * Function called when a bar is clicked.
   */
  onChange: PropTypes.func,
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
  /**
   * Function that returns an aria label for each carousel bar
   */
  slideAriaLabel: PropTypes.func,
  /**
   * @ignore
   */
  calculateBarColor: PropTypes.func,
  /**
   * @ignore
   */
  borderRadius: PropTypes.string,
  /**
   * @ignore
   */
  surface: PropTypes.oneOf(['light', 'dark']),
};

const defaultProps = {
  surface: 'light',
  focusState: null,
  calculateBarColor: _calculateBarColor,
  borderRadius: '2px',
};

const StyledSwiperList = styled.ol`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 0;
`;

const StyledSwiperDot = styled.li`
  position: relative;
  display: block;
  width: ${calculateRem(24)};
  margin-right: ${calculateRem(LayoutTokens.space['1X'].value)};
  cursor: pointer;
  height: ${calculateRem(4)};
  outline-offset: ${AccessibilityTokens.focusring.space.offset.value};
  outline-color: white;
  outline: none;

  &:active,
  &:hover {
    outline: none;
  }

  &::before {
    content: '';
    position: absolute;
    height: ${calculateRem(8)};
    top: -3px;
    left: -3px;
    right: -3px;
  }

  &:focus:not(:hover) {
    &::before {
      outline: none;
      border: ${calculateRem(1)}
        ${({ surface }) =>
          surface === 'dark'
            ? AccessibilityTokens.color.focusring.ondark.value
            : AccessibilityTokens.color.focusring.onlight.value}
        dashed;
      border-radius: ${({ borderRadius }) => `calc(${borderRadius} * 2)`};
    }
  }

  &::after {
    content: '';
    position: absolute;
    height: ${calculateRem(1)};
    bottom: 0%;
    left: 0;
    right: 0;
    background-color: ${ColorTokens.palette.gray65.value};
    transition: height 250ms, background-color 250ms;
  }

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    &::after {
      height: ${calculateRem(4)};
      transition: height 250ms, background-color 250ms;
    }
  }

  ${({ calculateBarColor, selected, surface, borderRadius }) =>
    selected &&
    `
      &::after {
        height: ${calculateRem(4)};
        background-color: ${calculateBarColor(selected, surface)};
        transition: height 250ms, background-color 250ms;
        border-radius: ${borderRadius}
      }
    `};

  ${({ calculateBarColor, selected, surface, borderRadius }) =>
    !selected &&
    `
    &:focus{
        &::before {
        outline-color: ${
          surface === 'dark'
            ? AccessibilityTokens.color.focusring.ondark.value
            : AccessibilityTokens.color.focusring.onlight.value
        };
        }
      }
      ::after {
        background-color: ${calculateBarColor(selected, surface)};
        transition: height 250ms, background-color 250ms;
        border-radius: ${borderRadius}
      }
    `};
`;

class CarouselBars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedBar: 0,
    };

    this.barRefs = [];
  }

  _setSlotRef = (element, index) => {
    if (!element) return;

    this.barRefs[index] = element;
  };

  _blurElements = e => {
    if (typeof document !== 'undefined') return;
    [e.target, document.activeElement].forEach(element => {
      // IE9 throws an "Unspecified error" accessing document.activeElement from an <iframe>
      try {
        // Support: IE9+
        // If the <body> is blurred, IE will switch windows
        element && element.nodeName.toLowerCase() !== 'body' && element.blur();
      } catch (error) {}
    });
  };

  _goSlide = (e, index) => {
    const { onChange } = this.props;
    e.preventDefault();
    if (e.type === 'click') {
      this._blurElements(e);
    }
    onChange && onChange(index, false);
  };

  _onMouseDown = e => {
    e.preventDefault();
    this._blurElements(e);
  };

  _onKeyDown = e => {
    const { focusedBar } = this.state;
    const { onChange } = this.props;
    const eventKey = e && e.nativeEvent && e.nativeEvent.key;

    switch (eventKey) {
      case 'ArrowRight':
        if (focusedBar + 1 === this.barRefs.length) {
          onChange && onChange(0, false);
          this.setState({ focusedBar: 0 });
          return findDOMNode(this.barRefs[0]).focus();
        } else {
          onChange && onChange(focusedBar + 1, false);
          this.setState({ focusedBar: focusedBar + 1 });
          return findDOMNode(this.barRefs[focusedBar + 1]).focus();
        }
      case 'ArrowLeft':
        if (focusedBar - 1 < 0) {
          onChange && onChange(this.barRefs.length - 1);
          this.setState({ focusedBar: this.barRefs.length - 1 });
          return findDOMNode(this.barRefs[this.barRefs.length - 1]).focus();
        } else {
          onChange && onChange(focusedBar - 1, false);
          this.setState({ focusedBar: focusedBar - 1 });
          return findDOMNode(this.barRefs[focusedBar - 1]).focus();
        }
      case 'Tab':
      default:
        return;
    }
  };

  render() {
    const {
      slideCount,
      selectedSlide,
      surface,
      uniqueId,
      ariaLabel,
      'data-analyticstrack': analyticsTrack,
      'data-track': track,
      'data-track-ignore': ignoreTrack,
      'data-clickstream': clickStream,
      slideAriaLabel,
      calculateBarColor,
      borderRadius,
    } = this.props;

    // this is a tabbed carousel so we do not need a aria-roledescription
    return (
      <StyledSwiperList
        {...this.props}
        aria-label={ariaLabel}
        aria-controls={uniqueId}
        role={`tablist`}
      >
        {Array.from({ length: slideCount }).map((element, index) => {
          let defaultAriaLabel = `Go to slide ${index + 1} of ${slideCount} ${
            selectedSlide === index + 1 ? '' : ' unselected'
          }`;

          return (
            <StyledSwiperDot
              data-clickstream={clickStream}
              data-track={track}
              data-track-ignore={ignoreTrack}
              data-analyticstrack={analyticsTrack}
              onMouseDown={this._onMouseDown}
              key={index}
              selected={selectedSlide === index}
              data-index={index}
              aria-selected={selectedSlide === index ? true : null}
              onKeyDown={this._onKeyDown}
              surface={surface}
              onClick={e => this._goSlide(e, index)}
              aria-label={
                slideAriaLabel
                  ? slideAriaLabel(defaultAriaLabel, index)
                  : defaultAriaLabel
              }
              aria-atomic={true}
              aria-live={'polite'}
              tabIndex={selectedSlide === index ? 0 : -1}
              role={`tab`}
              ref={el => this._setSlotRef(el, index)}
              calculateBarColor={calculateBarColor}
              borderRadius={borderRadius}
            />
          );
        })}
      </StyledSwiperList>
    );
  }
}

CarouselBars.propTypes = propTypes;
CarouselBars.defaultProps = defaultProps;

export default withVDSManager(CarouselBars);
