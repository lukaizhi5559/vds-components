import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { calculateRem } from '@vds-core/utilities';
import Scrollbars from './Scrollbars';
import { ColorTokens } from '@vds-tokens/color';

const _calculateTrackColor = surface => {
  let trackColor;
  if (surface === 'dark') {
    trackColor = ColorTokens.interactive.scrolltrack.ondark.value;
  } else {
    trackColor = ColorTokens.interactive.scrolltrack.onlight.value;
  }
  return trackColor;
};

const _calculateThumbColor = (surface, hover) => {
  let thumbColor;
  if (surface === 'dark' && !hover) {
    thumbColor = ColorTokens.interactive.scrollthumb.ondark.value;
  } else if (hover && surface !== 'dark') {
    thumbColor = ColorTokens.interactive.scrollthumb.hover.onlight.value;
  } else if (hover && surface === 'dark') {
    thumbColor = ColorTokens.interactive.scrollthumb.hover.ondark.value;
  } else {
    thumbColor = ColorTokens.interactive.scrollthumb.onlight.value;
  }
  return thumbColor;
};

const Wrapper = styled.span`
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  &&,
  * {
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const propTypes = {
  wrapperStyle: PropTypes.object,
  contentStyle: PropTypes.object,
  surface: PropTypes.oneOf(['light', 'dark']),
  height: PropTypes.string,
  width: PropTypes.string,
  scrollbarId: PropTypes.string,
  borderRadius: PropTypes.string,
  calculateTrackColor: PropTypes.func,
  calculateThumbColor: PropTypes.func,
};

const defaultProps = {
  calculateTrackColor: _calculateTrackColor,
  calculateThumbColor: _calculateThumbColor,
  borderRadius: calculateRem(2),
};

class ScrollWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientHeight: 0,
      scrollHeight: 0,
      hover: false,
      top: 0,
      scroll: false,
    };
    this.scrollRef = null;
  }

  _handleUpdate = values => {
    const { top, scrollHeight, clientHeight } = values;

    if (
      this.state.top !== top ||
      this.state.scrollHeight !== scrollHeight ||
      this.state.clientHeight !== clientHeight
    ) {
      this.setState({ top, scrollHeight, clientHeight });
    }
  };

  _thumbHeight = () => {
    const { clientHeight, scrollHeight } = this.state;
    return scrollHeight
      ? parseInt((clientHeight * this.state.clientHeight) / scrollHeight)
      : 0;
  };

  _changeBackground = () => {
    this.setState({ hover: !this.state.hover });
  };

  // MARK - Render Function Components
  View = ({
    style,
    calculateThumbColor,
    calculateTrackColor,
    borderRadius,
    surface,
    ...rest
  }) => {
    const viewStyle = {
      display: 'flex',
      boxSizing: 'border-box',
      overflowX: 'hidden',
      margin: 0,
      width: '100%',
      height: '100%',
    };

    return (
      <div
        id={`scrollbar-view-${this.props.scrollbarId}`}
        style={{
          ...style,
          ...viewStyle,
          ...this.props.contentStyle,
        }}
        {...rest}
      />
    );
  };

  Track = ({
    style,
    calculateThumbColor,
    calculateTrackColor,
    borderRadius,
    surface,
    ...rest
  }) => {
    const hideScroll = this._thumbHeight() >= this.state.clientHeight;

    const trackStyle = {
      backgroundColor: this.props.calculateTrackColor(this.props.surface),
      display: hideScroll ? 'none' : 'block',
      top: 0,
      right: 0,
      bottom: 0,
      width: 4,
      cursor: 'pointer',
      borderRadius: this.props.borderRadius,
      overflow: 'hidden',
    };
    return (
      <span
        id={`scrollbar-track-${this.props.scrollbarId}`}
        style={{ ...style, ...trackStyle }}
        onMouseOver={this._changeBackground}
        onMouseOut={this._changeBackground}
        {...rest}
        aria-hidden={true}
      />
    );
  };

  HitArea = () => {
    const hideScroll = this._thumbHeight() >= this.state.clientHeight;

    const HitAreaStyle = {
      position: 'absolute',
      top: 0,
      right: '-22px',
      width: '48px',
      cursor: 'grab',
      height: '100%',
      display: hideScroll ? 'none' : 'block',
    };
    return (
      <span
        style={{ ...HitAreaStyle }}
        onMouseOver={this._changeBackground}
        onMouseOut={this._changeBackground}
      />
    );
  };

  Thumb = ({
    style,
    calculateThumbColor,
    calculateTrackColor,
    borderRadius,
    surface,
    ...rest
  }) => {
    const { hover } = this.state;

    const thumbStyle = {
      backgroundColor: this.props.calculateThumbColor(
        this.props.surface,
        hover
      ),
      height: '100%',
      width: 4,
      left: '22px',
      borderRadius: this.props.borderRadius,
    };

    const grabZoneStyle = {
      cursor: 'pointer',
      width: 48,
      left: '-22px',
      zIndex: 1,
      textAlign: 'center',
    };

    return (
      <span
        style={{ ...style, ...grabZoneStyle }}
        onMouseOver={this._changeBackground}
        onMouseOut={this._changeBackground}
        {...rest}
      >
        <span style={{ ...style, ...thumbStyle }} {...rest} />
      </span>
    );
  };

  render() {
    const {
      contentStyle,
      calculateThumbColor,
      calculateTrackColor,
      borderRadius,
      surface,
      ...rest
    } = this.props;
    return (
      <Wrapper height={this.props.height} width={this.props.width}>
        <Scrollbars
          style={{
            ...this.props.wrapperStyle,
            height: this.props.height,
            width: this.props.width,
          }}
          id={`scrollview-${this.props.scrollbarId}`}
          ref={el => (this.scrollRef = el)}
          renderView={this.View}
          renderTrackVertical={this.Track}
          renderThumbVertical={this.Thumb}
          renderTrackHorizontal={() => <span aria-hidden={true} />}
          renderThumbHorizontal={() => <span />}
          renderHitArea={this.HitArea}
          onUpdate={this._handleUpdate}
          {...rest}
        >
          {this.props.children}
        </Scrollbars>
      </Wrapper>
    );
  }
}

ScrollWrapper.defaultProps = defaultProps;
ScrollWrapper.propTypes = propTypes;
export default ScrollWrapper;
