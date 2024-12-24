import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { calculateRem } from '@vds-core/utilities';
import { Fonts } from '@vds-core/typography';
import { AccessibilityTokens } from '@vds-tokens/accessibility';
import { TypographyTokens } from '@vds-tokens/typography';

const StyledLabel = styled.label`
  display: inline-flex;
  border-radius: 1rem;
  height: ${({ toggleHeight }) => calculateRem(toggleHeight)};
  width: ${calculateRem(52)};
  overflow: hidden;
  ${({ disabled, surface, keyboardFocused }) =>
    !disabled &&
    keyboardFocused &&
    `
    &:not(:hover) {
      outline: none;
      &::before {
        border: ${calculateRem(
          AccessibilityTokens.focusring.borderwidth.value
        )} ${AccessibilityTokens.focusring.borderstyle.value} ${
      surface === 'dark'
        ? AccessibilityTokens.color.focusring.ondark.value
        : AccessibilityTokens.color.focusring.onlight.value
    };
        border-radius: 1rem;
        content: '';
        height: calc(100% + ${calculateRem(4)});
        left: 50%;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        width: calc(100% + ${calculateRem(4)});
      }
    }
    `}
`;

const ToggleSwitchSlider = styled.span`
  border-radius: 1rem;
  border: ${calculateRem(2)} solid transparent;
  box-sizing: border-box;
  position: relative;
  display: inline-flex;
  cursor: ${({ disabled }) => (disabled ? null : 'pointer')};
  background-color: ${({
    calculateBackgroundColor,
    disabled,
    on,
    surface,
    textPosition,
  }) => calculateBackgroundColor(disabled, on, surface)};
  color: ${({ calculateTextColor, disabled, surface, textPosition }) =>
    calculateTextColor(disabled, surface, textPosition)};
  height: ${({ toggleHeight }) => calculateRem(toggleHeight)};
  transition: background-color 100ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  width: ${calculateRem(52)};
  &::before {
    background-color: ${({ calculateButtonColor, disabled, surface }) =>
      calculateButtonColor(disabled, surface)};
    border-radius: 50%;
    bottom: 0;
    content: '';
    height: ${({ knobSize }) => calculateRem(knobSize)};
    left: ${({ knobLeftPosition, on }) =>
      on ? calculateRem(knobLeftPosition) : 0} !important; 
    margin-bottom: auto;
    margin-top: auto;
    padding-left: 0;
    position: absolute;
    top: 0;
    transition: left 100ms;
    width: ${({ knobSize }) => calculateRem(knobSize)};
    z-index: 1;
    box-shadow: ${({ calculateDropShadow, disabled }) =>
      calculateDropShadow(disabled)};
    };
  }

  &:active,
  &:focus {
    outline: none;
  }

  ${({ showText, textPosition }) =>
    showText &&
    textPosition === 'center' &&
    `
    &::after {
      content: 'Off';
      font-size: ${calculateRem(TypographyTokens.fontsize.body[12].value)};
      line-height: ${calculateRem(TypographyTokens.lineheight.body[16].value)};
      font-weight: ${TypographyTokens.fontweight.bold.value};
      font-family: ${Fonts.VerizonNHGeTX};
      position: absolute;
      right: ${calculateRem(4)};
      top: ${calculateRem(3)};
      z-index: 0;
    }

  `};

  ${({ showText, on, calculateTextColor, disabled, surface, textPosition }) =>
    on &&
    showText &&
    textPosition === 'center' &&
    `
    &::after {
      color: ${calculateTextColor(disabled, surface)};
      content: 'On';
      right: ${calculateRem(24)};
      top: ${calculateRem(3)};
      z-index: 0;
    }
  `};
`;

const ToggleInput = styled.input`
  opacity: 0;
  margin: 0;
  width: 2rem;
  height: 1rem;
  position: absolute;
  top: 0;
  pointer-events: auto;
  &:hover {
    cursor: pointer;
  }
`;

const propTypes = {
  on: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  onKeyPress: PropTypes.func,
  onChange: PropTypes.func,
  name: PropTypes.string,

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
   */
  tabIndex: PropTypes.number,
};

const defaultProps = {
  on: false,
  disabled: false,
  onClick: () => {},
  onKeyPress: () => {},
  onChange: () => {},
  name: null,
};

/**
 * @ignore
 */
class ToggleSwitch extends Component {
  state = {
    keyboardFocused: false,
  };
  _onFocus = () => {
    this.setState({ keyboardFocused: true });
  };

  _onBlur = () => {
    this.setState({ keyboardFocused: false });
  };

  render() {
    const {
      on: onProp,
      disabled,
      onKeyDown,
      handleSwitchClick,
      onChange,
      tabIndex,
      name,
      value,
      calculateTextColor,
      calculateBackgroundColor,
      calculateButtonColor,
      calculateDropShadow,
      analyticsTrack,
      track,
      trackIgnore,
      clickStream,
      surface,
      inputId,
      focusId,
      textPosition,
      showText,
      ariaLabel,
      toggleHeight,
      knobSize,
      knobLeftPosition,
    } = this.props;
    let on = onProp;

    return (
      <StyledLabel
        id={focusId}
        disabled={disabled}
        surface={surface}
        htmlFor={inputId ? inputId : name ? name : 'toggle'}
        keyboardFocused={this.state.keyboardFocused}
        toggleHeight={toggleHeight}
      >
        <ToggleInput
          data-testid="test-toggle"
          aria-label={ariaLabel ? ariaLabel : name}
          type="checkbox"
          disabled={disabled}
          checked={on}
          name={name}
          value={value}
          id={inputId ? inputId : name ? name : 'toggle'}
          tabIndex={tabIndex}
          data-analyticstrack={analyticsTrack}
          data-track={track}
          data-track-ignore={trackIgnore}
          data-clickstream={clickStream}
          onFocus={this._onFocus}
          onBlur={this._onBlur}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onClick={e => handleSwitchClick(e)}
        />

        <ToggleSwitchSlider
          tabIndex={-1}
          aria-hidden={true}
          surface={surface}
          disabled={disabled}
          on={+on}
          calculateTextColor={calculateTextColor}
          calculateBackgroundColor={calculateBackgroundColor}
          calculateButtonColor={calculateButtonColor}
          calculateDropShadow={calculateDropShadow}
          textPosition={textPosition}
          showText={showText}
          toggleHeight={toggleHeight}
          knobSize={knobSize}
          knobLeftPosition={knobLeftPosition}
        />
      </StyledLabel>
    );
  }
}

ToggleSwitch.propTypes = propTypes;
ToggleSwitch.defaultProps = defaultProps;

export default ToggleSwitch;
