import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { ColorTokens } from '@vds-tokens/color';
import { calculateRem } from '@vds-core/utilities';

//style properties
const iconHeight = 20;
const selectedFillCircleSize = calculateRem('10px');
const colorSelected = ColorTokens.elements.primary.onlight.value;
const colorSelectedInverted = ColorTokens.elements.primary.ondark.value;
const colorDisabled = ColorTokens.interactive.disabled.onlight.value;
const colorDisabledInverted = ColorTokens.interactive.disabled.ondark.value;

const propTypes = {
  /**
   * @ignore
   */
  disabled: PropTypes.bool,
  /**
   * @ignore
   */
  height: PropTypes.number,
  /**
   * @ignore
   */
  width: PropTypes.number,
  /**
   * @ignore
   */
  selected: PropTypes.bool,
  /**
   * @ignore
   */
  surface: PropTypes.oneOf(['light', 'dark']),
  //Deprecated
  checked: PropTypes.bool,
};

const defaultProps = {
  disabled: false,
  height: iconHeight,
  width: iconHeight,
  surface: 'light',
};

const StyledWrapper = styled.div`
  box-sizing: border-box;
`;

const StyledOuterCircle = styled.div`
  align-items: center;
  border-radius: 50%;
  display: flex;
  height: ${calculateRem(iconHeight)};
  justify-content: center;
  left: ${calculateRem(-iconHeight)};
  position: absolute;
  right: 0;
  top: 0;
  width: ${calculateRem(iconHeight)};
  box-sizing: border-box;
`;

const StyledInnerCircle = styled.div`
  background-color: ${({ surface }) =>
    surface === 'dark' ? colorSelectedInverted : colorSelected};
  border-radius: 50%;
  height: ${selectedFillCircleSize};
  width: ${selectedFillCircleSize};
  position: absolute;

  ${({ disabled, surface }) =>
    disabled &&
    `
  background-color: ${
    surface === 'dark' ? colorDisabledInverted : colorDisabled
  }`}
`;

/**
 * @ignore
 */
const RadioButtonIcon = props => {
  const { disabled, surface } = props;
  const selected = props.checked || props.selected || false;
  return (
    <StyledWrapper>
      <StyledOuterCircle
        {...props}
        className="radioOuter"
        focusable="false"
        aria-hidden={true}
        surface={surface}
        selected={selected}
      >
        {selected && (
          <StyledInnerCircle disabled={disabled} surface={surface} />
        )}
      </StyledOuterCircle>
    </StyledWrapper>
  );
};

RadioButtonIcon.defaultProps = defaultProps;
RadioButtonIcon.propTypes = propTypes;

export default RadioButtonIcon;
