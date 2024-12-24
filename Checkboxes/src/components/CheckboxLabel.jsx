import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { calculateRem } from '@vds-core/utilities';
import { Fonts } from '@vds-core/typography';
import { TypographyTokens } from '@vds-tokens/typography';
import { AccessibilityTokens } from '@vds-tokens/accessibility';

//22 + 2px offset each side
const OUTLINE_SIZE = calculateRem(26);

const propTypes = {
  disabled: PropTypes.bool,
};

const defaultProps = {
  disabled: false,
};

/**
 * @ignore
 */
const CheckboxLabelWrapper = styled.label`
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  line-height: ${TypographyTokens.lineheight.body[20].value};
  font-size: ${TypographyTokens.fontsize.body[16].value};
  font-family: ${Fonts.VerizonNHGeDS};
  letter-spacing: ${({ letterSpacing }) =>
    letterSpacing ? letterSpacing : TypographyTokens.letterspacing.wide.value};
  ${({ errored }) =>
    errored &&
    `
  margin-bottom: 9px; //8px + 1px additonal border outside aligned
  `};
  ${({ disabled }) =>
    disabled &&
    `
    cursor: default;
  `};

  color: ${({ color }) => color};

  input[type='checkbox'] {
    position: absolute;
    opacity: 0;
    overflow: hidden;
    padding: 0;
    border: 0;
    white-space: nowrap;
    z-index: 1;
    &:hover {
      cursor: pointer;
    }
    ${({ showFocus, color, focusBorderRadius }) =>
      showFocus &&
      `
      &:focus {
        outline: none;
        + svg {
          outline: none;
        } 
        &:not(:hover):not(:visited):not(:active) + span {
          &::after {
            background: transparent;
            border: ${calculateRem(
              AccessibilityTokens.focusring.borderwidth.value
            )} ${AccessibilityTokens.focusring.borderstyle.value} ${color};
            box-sizing: border-box;
            content: '';
            height: ${OUTLINE_SIZE};
            left: 50%;
            position: absolute;
            top: 50%;
            transform: translate(-50%, -50%);
            width: ${OUTLINE_SIZE};
            border-radius: ${focusBorderRadius};
          }
        }
      }
      `};
  }
`;

const CheckboxLabel = props => {
  return (
    <CheckboxLabelWrapper
      {...props}
      disabled={props.disabled}
      color={props.color}
    />
  );
};
CheckboxLabel.propTypes = propTypes;
CheckboxLabel.defaultProps = defaultProps;

export default CheckboxLabel;
