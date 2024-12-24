import styled, { css } from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { calculateRem } from '@vds-core/utilities';
import { ColorTokens } from '@vds-tokens/color';
import { FormControlsTokens } from '@vds-tokens/form-controls';
import { AccessibilityTokens } from '@vds-tokens/accessibility';

// Use checkmark-bold.svg
const CheckmarkBoldIcon = (
  <svg
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 21.6 21.6"
  >
    <path d="M8,19.1l-7-7l2.5-2.5L8,14L18.1,3.8l2.5,2.5L8,19.1z" />
  </svg>
);

const _calculateBorderColor = ({
  disabled,
  error,
  surface,
  hovered,
  selected,
}) => {
  if (disabled) {
    return surface === 'dark'
      ? ColorTokens.interactive.disabled.ondark.value
      : ColorTokens.interactive.disabled.onlight.value;
  }

  if (error) {
    return surface === 'dark'
      ? ColorTokens.feedback.error.ondark.value
      : ColorTokens.feedback.error.onlight.value;
  }

  if (hovered && !selected) {
    return surface === 'dark'
      ? ColorTokens.elements.secondary.ondark.value
      : ColorTokens.elements.secondary.onlight.value;
  }

  return surface === 'dark'
    ? FormControlsTokens.color.border.ondark.value
    : FormControlsTokens.color.border.onlight.value;
};

const _calculateAdditionalBorderColor = (surface, error, selected) => {
  if (error) {
    return surface === 'dark'
      ? ColorTokens.feedback.error.ondark.value
      : ColorTokens.feedback.error.onlight.value;
  }

  if (selected) {
    return surface === 'dark'
      ? FormControlsTokens.color.border.hover.ondark.value
      : FormControlsTokens.color.border.hover.onlight.value;
  }

  return surface === 'dark'
    ? ColorTokens.elements.secondary.ondark.value
    : ColorTokens.elements.secondary.onlight.value;
};

const _calculateCheckboxBackgroundColor = ({
  disabled,
  selected,
  surface,
  error,
}) => {
  if (disabled && selected) {
    return surface === 'dark'
      ? ColorTokens.interactive.disabled.ondark.value
      : ColorTokens.interactive.disabled.onlight.value;
  }
  if (selected) {
    return surface === 'dark'
      ? ColorTokens.elements.primary.ondark.value
      : ColorTokens.elements.primary.onlight.value;
  }
  if (error && !disabled) {
    return surface === 'dark'
      ? ColorTokens.feedback.error.background.ondark.value
      : ColorTokens.feedback.error.background.onlight.value;
  }
  return 'transparent';
};

const _calculateBorderWidth = ({ selected }) => {
  return selected
    ? 0
    : calculateRem(AccessibilityTokens.focusring.borderwidth.value);
};
const _calculateBoxShadow = ({
  hovered,
  disabled,
  surface,
  error,
  selected,
}) => {
  return hovered && !disabled
    ? ` 0 0 0 ${calculateRem(
        FormControlsTokens.border.width.value
      )} ${_calculateAdditionalBorderColor(surface, error, selected)}`
    : `none`;
};

const propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  height: PropTypes.number,
  selected: PropTypes.bool,
  hovered: PropTypes.bool,
  width: PropTypes.number,
  /**
   * @ignore
   */
  surface: PropTypes.oneOf(['light', 'dark']),
  calculateBorderWidth: PropTypes.func,
  calculateBoxShadow: PropTypes.func,
  calculateCheckboxBackgroundColor: PropTypes.func,
  calculateBorderColor: PropTypes.func,
};

const defaultProps = {
  disabled: false,
  error: false,
  height: 20,
  width: 20,
  surface: 'light',
  hovered: false,
  calculateBorderWidth: _calculateBorderWidth,
  calculateCheckboxBackgroundColor: _calculateCheckboxBackgroundColor,
  calculateBorderColor: _calculateBorderColor,
  calculateBoxShadow: _calculateBoxShadow,
};

const CHECK_SIZE = 20;

const sharedHitAreaStyles = css`
  left: ${calculateRem(10)};
  position: absolute;
  transform: translate(-50%, -50%);
  text-align: center;
  top: 50%;
`;

const HitArea = styled.div`
  ${sharedHitAreaStyles};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  display: inline-block;
  height: ${calculateRem(44)};
  width: ${calculateRem(44)};
`;

const StyledWrapper = styled.span`
  box-sizing: border-box;
  display: inline-block;
  content: '';
  height: ${calculateRem(CHECK_SIZE)};
  left: 50%;
  position: relative;
  top: 50%;
  transform: translate(-50%, -50%);
  width: ${calculateRem(CHECK_SIZE)};
`;

const StyledInner = styled.span`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  top: 50%;
  left: 50%;
  box-sizing: border-box;
  width: ${calculateRem(CHECK_SIZE)};
  height: ${calculateRem(CHECK_SIZE)};
  transform: translate(-50%, -50%);
  background-color: ${({ calculateCheckboxBackgroundColor, ...props }) =>
    calculateCheckboxBackgroundColor(props)};
  border-style: solid;
  border-color: ${({ calculateBorderColor, ...props }) =>
    calculateBorderColor(props)};
  border-radius: ${({ borderRadius }) => borderRadius};
  border-width: ${({ calculateBorderWidth, ...props }) =>
    calculateBorderWidth(props)};
  box-shadow: ${({ calculateBoxShadow, ...props }) =>
    calculateBoxShadow(props)};
  ${({ surface, disabled }) =>
    !disabled &&
    `
    &:active {
      border-color: ${
        surface === 'dark'
          ? ColorTokens.elements.primary.ondark.value
          : ColorTokens.elements.primary.onlight.value
      };
      &:hover {
        box-shadow: 0 0 0 ${calculateRem(
          FormControlsTokens.border.width.value
        )} ${
      surface === 'dark'
        ? ColorTokens.elements.primary.ondark.value
        : ColorTokens.elements.primary.onlight.value
    }
      }
    }
  `}
`;

const IconSVGWrapper = styled.div`
  display: flex;
  height: ${({ iconSize }) => calculateRem(iconSize)};
  width: ${({ iconSize }) => calculateRem(iconSize)};
  min-height: ${({ iconSize }) => calculateRem(iconSize)};
  min-width: ${({ iconSize }) => calculateRem(iconSize)};
  ${({ tabIndex }) =>
    tabIndex < 0 &&
    `
    outline: none;
    pointer-events: none;
  `};
  &:active,
  &:focus {
    outline: none;
  }
  svg {
    path {
      fill: ${({ iconColor }) => iconColor};
    }
  }
`;

/**
 * @ignore
 */
const CheckboxIcon = props => {
  const selected = props.selected || false;
  return (
    <StyledWrapper>
      <HitArea
        error={props.error}
        disabled={props.disabled}
        surface={props.surface}
      />
      <StyledInner
        {...props}
        hovered={props.hovered}
        error={props.error}
        disabled={props.disabled}
        surface={props.surface}
        className="styledInner"
      >
        {selected && (
          <IconSVGWrapper
            aria-hidden={true}
            iconSize={12}
            tabIndex={-1}
            iconColor={
              props.surface === 'dark'
                ? ColorTokens.elements.primary.onlight.value
                : ColorTokens.elements.primary.ondark.value
            }
          >
            {CheckmarkBoldIcon}
          </IconSVGWrapper>
        )}
      </StyledInner>
    </StyledWrapper>
  );
};

CheckboxIcon.defaultProps = defaultProps;
CheckboxIcon.propTypes = propTypes;

export default CheckboxIcon;
