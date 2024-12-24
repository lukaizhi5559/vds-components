import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { calculateRem } from '@vds-core/utilities';
import { Fonts } from '@vds-core/typography';
import InputText from './InputText';

const propTypes = {
  errorText: PropTypes.string,
  errorMarginLeft: PropTypes.string,
};

const defaultProps = {
  errorMarginLeft: calculateRem(-1),
};

// The reason for this funky padding is so that I can fix the checkbox without
// completely refactoring the svg implemenation. This will be fixed on a later pass.
const StyleCheckboxError = styled.div`
  position: relative;
  margin-top: 0;
  left: ${({ errorMarginLeft }) => errorMarginLeft};
`;

/**
 * @ignore
 */
const CheckboxError = props => {
  const { errorText, color, errorMarginLeft } = props;

  return (
    <StyleCheckboxError errorMarginLeft={errorMarginLeft}>
      <InputText color={color} fontFamily={Fonts.VerizonNHGeTX}>
        {errorText}
      </InputText>
    </StyleCheckboxError>
  );
};

CheckboxError.propTypes = propTypes;
CheckboxError.defaultProps = defaultProps;
export default CheckboxError;
