import styled, { css } from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { calculateRem } from '@vds-core/utilities';
import { ColorTokens } from '@vds-tokens/color';
import { TypographyTokens } from '@vds-tokens/typography';
import { FormControlsTokens } from '@vds-tokens/form-controls';
import { Fonts } from '@vds-core/typography';

const WrapperProps = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  transparentBackground: PropTypes.bool,
  borderColor: PropTypes.string,
};

const WrapperDefaultProps = {
  checked: false,
  transparentBackground: false,
  disabled: false,
};

const findWidth = width => {
  if (typeof width === 'string') return width;
  return calculateRem(width);
};

// For backward compatibility with v1
const findFont = fontSize => {
  if (typeof fontSize === 'string') {
    return fontSize === '12px' ? Fonts.VerizonNHGeTX : Fonts.VerizonNHGeDS;
  } else {
    return fontSize === 12 ? Fonts.VerizonNHGeTX : Fonts.VerizonNHGeDS;
  }
};

const RadioBoxLabelWrapper = styled.div`
  align-items: center;
  border-radius: ${({ borderRadius }) => borderRadius};
  border: ${({ borderColor, surface }) =>
    `1px solid ${
      surface === 'dark'
        ? FormControlsTokens.color.border.ondark.value
        : borderColor
    }`};
  display: block;
  flex: ${props =>
    props.orientation === 'vertical'
      ? '1 1 auto'
      : props.width
      ? `0 0 ${findWidth(props.width)}`
      : '1'};
  font-size: ${({ fontSize }) => calculateRem(fontSize)};
  letter-spacing: ${({ letterSpacing }) => calculateRem(letterSpacing)};
  line-height: ${({ lineHeight }) => calculateRem(lineHeight)};
  font-family: ${({ fontSize }) => findFont(fontSize)};
  height: 100%;
  min-height: ${({ height }) => (height ? height : calculateRem(44))};
  position: relative;
  width: ${props => (props.width ? findWidth(props.width) : '100%')};
  max-width: 100%;
  box-sizing: border-box;
  background-color: ${({ surface, transparentBackground }) =>
    transparentBackground
      ? 'transparent'
      : surface === 'dark'
      ? FormControlsTokens.color.background.ondark.value
      : FormControlsTokens.color.background.onlight.value};
  color: ${({ disabled, surface }) =>
    disabled
      ? surface === 'dark'
        ? ColorTokens.interactive.disabled.ondark.value
        : ColorTokens.interactive.disabled.onlight.value
      : surface === 'dark'
      ? ColorTokens.elements.primary.ondark.value
      : ColorTokens.elements.primary.onlight.value};
  ${({
    disabled,
    checked,
    orientation,
    borderActiveIndicator,
    borderColorSelected,
  }) =>
    borderActiveIndicator === 'highlight' &&
    !disabled &&
    orientation === 'horizontal' &&
    `
    &::before {
      background:  ${checked ? borderColorSelected : 'none'};
      box-shadow: 'none';
      content: '';
      height: ${calculateRem(4)};
      left: -1px;
      right: -1px;
      position: absolute;
      top: -1px;
      z-index: 1;
    }
  `};

  ${({
    disabled,
    checked,
    orientation,
    borderActiveIndicator,
    borderColorSelected,
  }) =>
    borderActiveIndicator === 'highlight' &&
    !disabled &&
    orientation === 'vertical' &&
    `
    &::before {
      background:  ${checked ? borderColorSelected : 'none'};
      box-shadow: 'none';
      content: '';
      width: ${calculateRem(4)};
      left: -1px;
      position: absolute;
      top: -1px;
      bottom: -1px;
      z-index: 1;
    }
  `};
  ${({ disabled, surface }) =>
    disabled &&
    `
    border-color: ${
      surface === 'dark'
        ? ColorTokens.interactive.disabled.ondark.value
        : ColorTokens.interactive.disabled.onlight.value
    }`};

  ${({
    disabled,
    checked,
    borderActiveIndicator,
    borderColorActive,
    surface,
  }) =>
    !disabled &&
    checked &&
    borderActiveIndicator === 'outline' &&
    `
       border: 1px solid ${
         surface === 'dark'
           ? ColorTokens.elements.primary.ondark.value
           : borderColorActive
       };
       box-shadow: ${`0 0 0 
        ${calculateRem(FormControlsTokens.border.width.value)}
        ${
          surface === 'dark'
            ? ColorTokens.elements.primary.ondark.value
            : borderColorActive
        };`};
     `};
  ${({ disabled, checked, borderActiveIndicator, borderColorActive }) =>
    !disabled &&
    checked &&
    borderActiveIndicator === 'highlight' &&
    `
       border-color: ${borderColorActive};

     `};

  ${({ disabled, checked, active, surface, borderColorActive }) =>
    !disabled &&
    !checked &&
    active &&
    `
       border: 1px solid ${
         surface === 'dark'
           ? ColorTokens.elements.primary.ondark.value
           : borderColorActive
       };
       box-shadow: ${`0 0 0 
        ${calculateRem(FormControlsTokens.border.width.value)}
        ${
          surface === 'dark'
            ? ColorTokens.elements.primary.ondark.value
            : borderColorActive
        };`};
     `};

  ${({ disabled, checked, active, hovered, borderColor, surface }) =>
    !disabled &&
    !checked &&
    !active &&
    hovered &&
    `
     &:hover {
       border: 1px solid ${
         surface === 'dark'
           ? FormControlsTokens.color.border.ondark.value
           : borderColor
       };
       box-shadow: ${`0 0 0 
          ${calculateRem(FormControlsTokens.border.width.value)}
          ${
            surface === 'dark'
              ? FormControlsTokens.color.border.ondark.value
              : borderColor
          };`};
     }
     `};
  outline: 0;
`;

const LabelBase = styled.label`
  cursor: ${({ disabled }) => (disabled ? 'normal' : 'pointer')};
  height: 100%;
  z-index: 1;

  &:active,
  &:hover {
    outline: 0;
  }
`;

const sharedLabelStyles = css`
  display: block;
  padding: ${calculateRem(FormControlsTokens.space.inset.value)};

  .LabelContent {
    display: block;
  }
`;

const RadioBoxLabel = styled(LabelBase)`
  ${sharedLabelStyles};
  font-weight: ${({ fontWeight }) => fontWeight};
  font-size: ${({ fontSize }) => calculateRem(fontSize)};
  letter-spacing: ${({ letterSpacing }) => calculateRem(letterSpacing)};
  line-height: ${({ lineHeight }) => calculateRem(lineHeight)};
  font-family: ${({ fontSize }) => findFont(fontSize)};
`;

const StackedLabel = styled(LabelBase)`
  ${sharedLabelStyles};
  flex-grow: 1;
  font-weight: ${TypographyTokens.fontweight.bold.value};
  font-size: ${({ fontSize }) => calculateRem(fontSize)};
  letter-spacing: ${({ letterSpacing }) => calculateRem(letterSpacing)};
  line-height: ${({ lineHeight }) => calculateRem(lineHeight)};
  font-family: ${({ fontSize }) => findFont(fontSize)};

  > * {
    &:not(:last-child) {
      margin-bottom: ${calculateRem(2)};
    }
  }
`;

const SubLabel = styled.span`
  display: block;
  font-size: ${({ fontSize }) => calculateRem(fontSize)};
  letter-spacing: ${({ letterSpacing }) => calculateRem(letterSpacing)};
  line-height: ${({ lineHeight }) => calculateRem(lineHeight)};
  font-family: ${({ fontSize }) => findFont(fontSize)};
  font-weight: ${TypographyTokens.fontweight.regular.value};
  margin: 0;
  pointer-events: none;
`;

RadioBoxLabelWrapper.propTypes = WrapperProps;
RadioBoxLabelWrapper.defaultProps = WrapperDefaultProps;

export { RadioBoxLabelWrapper, RadioBoxLabel, SubLabel, StackedLabel };
