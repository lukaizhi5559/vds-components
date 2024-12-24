import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { calculateRem } from '@vds-core/utilities';
import { Body } from '@vds-core/typography';
import { ColorTokens } from '@vds-tokens/color';
import { LayoutTokens } from '@vds-tokens/layout';

const _calculateHelperTextColor = (disabled, surface) => {
  return disabled && surface !== 'dark'
    ? ColorTokens.interactive.disabled.onlight.value
    : disabled && surface === 'dark'
    ? ColorTokens.interactive.disabled.ondark.value
    : !disabled && surface === 'dark'
    ? ColorTokens.elements.secondary.ondark.value
    : ColorTokens.elements.secondary.onlight.value;
};

const propTypes = {
  /**
   * @ignore
   */
  calculateHelperTextColor: PropTypes.func,
};

const defaultProps = {
  calculateHelperTextColor: _calculateHelperTextColor,
};

const HelperTextWrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  width: 100%;
  box-sizing: border-box;
  ${({ helperTextPlacement }) =>
    helperTextPlacement === 'right' &&
    `
    position: relative;
    width: 50%;
    padding-top: 0px;
    padding-left: ${calculateRem(LayoutTokens.space['3X'].value)};
  `};
  ${({ helperTextPlacement }) =>
    helperTextPlacement === 'bottom' &&
    `
    padding-top: ${calculateRem(LayoutTokens.space['2X'].value)};
  `};
`;

const HelperText = props => {
  const {
    helperText,
    helperTextPlacement,
    disabled,
    surface,
    calculateHelperTextColor,
  } = props;
  return (
    <HelperTextWrapper
      aria-hidden="true"
      helperTextPlacement={helperTextPlacement}
    >
      <Body size="small" color={calculateHelperTextColor(disabled, surface)}>
        {helperText}
      </Body>
    </HelperTextWrapper>
  );
};

HelperText.defaultProps = defaultProps;
HelperText.propTypes = propTypes;

export default HelperText;
