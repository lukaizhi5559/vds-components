import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ToggleSwitch from './ToggleSwitch';
import { ColorTokens } from '@vds-tokens/color';
import {
  withVDSManager,
  calculateRem,
  generateUUID,
  hexToRgba,
} from '@vds-core/utilities';
import { Fonts } from '@vds-core/typography';
import { TypographyTokens } from '@vds-tokens/typography';
import { LayoutTokens } from '@vds-tokens/layout';

function _calculateBackgroundColor(disabled, on, surface) {
  if (disabled && surface === 'dark') {
    return ColorTokens.interactive.disabled.ondark.value;
  } else if (disabled && surface === 'light') {
    return ColorTokens.interactive.disabled.onlight.value;
  } else if (!disabled && surface === 'dark') {
    return on
      ? ColorTokens.palette.green36.value
      : ColorTokens.palette.gray44.value;
  } else {
    return on
      ? ColorTokens.palette.green26.value
      : ColorTokens.palette.gray44.value;
  }
}

function _calculateTextColor(disabled, surface) {
  if (disabled && surface === 'dark') {
    return ColorTokens.elements.secondary.ondark.value;
  } else if (disabled && surface === 'light') {
    return ColorTokens.elements.secondary.onlight.value;
  } else if (!disabled && surface === 'dark') {
    return ColorTokens.elements.primary.ondark.value;
  } else {
    return ColorTokens.elements.primary.onlight.value;
  }
}

function _calculateButtonColor(disabled, surface) {
  if (disabled && surface === 'light') {
    return ColorTokens.palette.gray95.value;
  } else if (disabled && surface === 'dark') {
    return ColorTokens.palette.gray44.value;
  } else {
    return ColorTokens.elements.primary.ondark.value;
  }
}

function _calculateDropShadow(disabled) {
  if (disabled) {
    return `0px 1px 10px ${hexToRgba(
      ColorTokens.palette.black.value,
      0.1
    )}, 0px 2px 4px ${hexToRgba(ColorTokens.palette.black.value, 0.04)}`;
  } else {
    return `0px 1px 10px ${hexToRgba(
      ColorTokens.palette.black.value,
      0.24
    )}, 0px 2px 4px ${hexToRgba(ColorTokens.palette.black.value, 0.08)}`;
  }
}

function _statusText(on) {
  if (!!on && on) return 'On';
  else return 'Off';
}

const propTypes = {
  /**
   * If provided, the toggle will be rendered in the disabled State.
   */
  disabled: PropTypes.bool,
  /**
   * Value given to toggle that will be returned by event handler function given to onChange prop.
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  /**
   * @ignore
   */
  name: PropTypes.string,
  /**
   * If provided, the Toggle will be toggled to its active state.
   */
  on: PropTypes.bool,
  /**
   * Function called on toggle of toggle that returns value assigned to toggle.
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   * Function that determines text color of Toggle
   */
  calculateTextColor: PropTypes.func,
  /**
   * @ignore
   * Function that determines background color of Toggle
   */
  calculateBackgroundColor: PropTypes.func,
  /**
   * @ignore
   * Function that determines background color of Toggle button
   */
  calculateButtonColor: PropTypes.func,
  /**
   * @ignore
   * Function that determines drop shadow of Toggle button
   */
  calculateDropShadow: PropTypes.func,
  /**
   * Aria label used for the Toggle.
   */
  ariaLabel: PropTypes.string,
  /**
   * Allows a string to be provided for analytics.
   *
   */
  'data-analyticstrack': PropTypes.string,
  /**
   * Allows a string to be provided for analytics.
   *
   */
  'data-track': PropTypes.string,
  /**
   * Allows a string to be provided for ignoring analytics tagging.
   */
  'data-track-ignore': PropTypes.string,
  /**
   * Allows a string to be provided for click stream.
   *
   */
  'data-clickstream': PropTypes.string,
  /**
   * Allows an id to be passed to the outermost wrapper of the component
   */
  id: PropTypes.string,
  /**
   * Allows a unique ID to be passed to the input element.
   */
  inputId: PropTypes.string,
  /**
   * @ignore
   */
  tabIndex: PropTypes.number,
  /**
   * @ignore
   */
  textPosition: PropTypes.oneOf(['left', 'right', 'center']),
  /**
   * @ignore
   */
  textWeight: PropTypes.oneOf(['regular', 'bold']),
  /**
   * @ignore
   */
  textSize: PropTypes.oneOf(['small', 'large']),
  /**
   * @ignore
   */
  showText: PropTypes.bool,
  /**
   * @ignore
   */
  surface: PropTypes.oneOf(['light', 'dark']),
  /**
   * @ignore
   */
  statusText: PropTypes.func,
  /**
   * @ignore
   */
  toggleHeight: PropTypes.number,
  /**
   * @ignore
   */
  knobSize: PropTypes.number,
  /**
   * @ignore
   */
  knobLeftPosition: PropTypes.number,
};

const defaultProps = {
  disabled: false,
  onChange: () => {},
  name: null,
  showText: false,
  calculateTextColor: _calculateTextColor,
  calculateBackgroundColor: _calculateBackgroundColor,
  calculateButtonColor: _calculateButtonColor,
  calculateDropShadow: _calculateDropShadow,
  statusText: _statusText,
  textPosition: 'left',
  textWeight: 'regular',
  textSize: 'small',
  surface: 'light',
  toggleHeight: 28,
  knobSize: 24,
  knobLeftPosition: 24,
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ToggleWrapper = styled.div`
  border-radius: ${calculateRem(16)};
  display: inline-block;
  position: relative;
  height: ${({ toggleHeight }) => calculateRem(toggleHeight)};
  outline: 0;
`;

const TextWrapper = styled.div`
  ${({ textSize }) =>
    textSize === 'large'
      ? `
        font-size: ${calculateRem(TypographyTokens.fontsize.body[16].value)};
        line-height: ${calculateRem(
          TypographyTokens.lineheight.body[20].value
        )};
        font-family: ${Fonts.VerizonNHGeDS};
        letter-spacing: ${TypographyTokens.letterspacing.wide.value};
      `
      : `
        font-size: ${calculateRem(TypographyTokens.fontsize.body[12].value)};
        line-height: ${calculateRem(
          TypographyTokens.lineheight.body[16].value
        )};
        font-family: ${Fonts.VerizonNHGeTX};
      `}
  font-weight: ${({ textWeight }) =>
    textWeight === 'bold'
      ? TypographyTokens.fontweight.bold.value
      : TypographyTokens.fontweight.regular.value};
  ${({ textPosition }) =>
    textPosition === 'right'
      ? `padding-left: ${calculateRem(
          LayoutTokens.space['3X'].value
        )}; padding-right: 0;
        text-align: left;
      `
      : `padding-right: ${calculateRem(
          LayoutTokens.space['3X'].value
        )}; padding-left: 0;
      text-align: right;`}
  
`;

const HitArea = styled.span`
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  text-align: center;
  top: 50%;
  cursor: pointer;
  display: inline-block;
  height: ${calculateRem(44)};
  width: 100%;
`;

class Toggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      on: this.props.on || false,
      hovered: false, //hover state is use to check if clicking on the toggle is a real mouse event. screen readers read key events as mouse events, so if its hovered we will know if its really a click.
    };
  }
  componentDidMount() {
    this.isControlled = this.props.on !== undefined;
    this.toggleId = this.props.inputId ? this.props.inputId : generateUUID();
    this.focusId = generateUUID();
  }
  componentDidUpdate = prevProps => {
    if (prevProps.on !== this.props.on) {
      this.setState({ on: this.props.on });
    }
  };

  handleSwitchClick = e => {
    e.stopPropagation();
    if (this.props.disabled) return;
    if (e.type === 'click' && this.state.hovered)
      typeof document !== 'undefined' && document.activeElement.blur();
    this.props.onChange(e, {
      name: this.props.name,
      value: this.props.value,
      on: !this.state.on,
      index: this.props.index,
    });
    !this.isControlled && this.setState({ on: !this.state.on });
  };

  handleSwitchKeypress = e => {
    let space = e.keyCode === 32;
    let enter = e.keyCode === 13;
    if (space) e.preventDefault();
    if ((enter || space) && e.type !== 'click') {
      this.handleSwitchClick(e);
      this.props.onKeyDown && this.props.onKeyDown(e);
    }
  };

  setHoverTrue = e => this.setState({ hovered: true });
  setHoverFalse = e => this.setState({ hovered: false });

  render() {
    const {
      disabled,
      value,
      name,
      showText,
      calculateTextColor,
      calculateBackgroundColor,
      calculateButtonColor,
      calculateDropShadow,
      id,
      tabIndex,
      'data-analyticstrack': analyticsTrack,
      'data-track': track,
      'data-track-ignore': trackIgnore,
      'data-clickstream': clickStream,
      textPosition,
      textWeight,
      textSize,
      surface,
      statusText,
      ariaLabel,
      toggleHeight,
      knobSize,
      knobLeftPosition,
    } = this.props;

    const _renderText = () => {
      return (
        <TextWrapper
          textPosition={textPosition}
          calculateTextColor={calculateTextColor}
          textWeight={textWeight}
          textSize={textSize}
          showText={showText}
          style={{ color: calculateTextColor(disabled, surface) }}
        >
          {statusText(this.state.on)}
        </TextWrapper>
      );
    };

    return (
      <Container>
        {textPosition === 'left' && showText && _renderText()}
        <ToggleWrapper
          onClick={e => e.stopPropagation()}
          id={id}
          onMouseOver={this.setHoverTrue}
          onMouseLeave={this.setHoverFalse}
          onKeyDown={this.handleSwitchKeypress}
          toggleHeight={toggleHeight}
        >
          <HitArea
            data-testid="test-hitArea"
            aria-hidden={true}
            onClick={disabled ? null : e => this.handleSwitchClick(e)}
          />
          <ToggleSwitch
            data-testid="test-toggle"
            name={name}
            value={value}
            on={this.state.on}
            disabled={disabled}
            tabIndex={disabled ? -1 : tabIndex ? tabIndex : 0}
            calculateTextColor={calculateTextColor}
            calculateBackgroundColor={calculateBackgroundColor}
            calculateButtonColor={calculateButtonColor}
            calculateDropShadow={calculateDropShadow}
            analyticsTrack={analyticsTrack}
            track={track}
            trackIgnore={trackIgnore}
            clickStream={clickStream}
            showText={showText}
            surface={surface}
            inputId={this.toggleId}
            focusId={this.focusId}
            handleSwitchClick={this.handleSwitchClick}
            textPosition={textPosition}
            ariaLabel={ariaLabel}
            toggleHeight={toggleHeight}
            knobSize={knobSize}
            knobLeftPosition={knobLeftPosition}
          />
        </ToggleWrapper>
        {textPosition === 'right' && showText && _renderText()}
      </Container>
    );
  }
}

Toggle.propTypes = propTypes;
Toggle.defaultProps = defaultProps;

export default withVDSManager(Toggle);
