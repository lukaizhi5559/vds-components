import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { calculateRem } from '@vds-core/utilities';
import {
  BodyConfig,
  TypographyConfig,
  Micro,
  Body,
} from '@vds-core/typography';

const propTypes = {
  /**
   * @ignore config for passing though typography
   */
  bodyConfig: PropTypes.object,
  /**
   * @ignore
   */
  margin: PropTypes.string,
  /**
   * @ignore
   */
  typescale: PropTypes.string,
};

const defaultProps = {
  bodyConfig: BodyConfig,
  margin: calculateRem(4),
  typescale: TypographyConfig.getTypescale(),
};

const InputTextWrapper = styled.div`
  display: block;
  margin-top: ${({ margin, typescale }) =>
    typescale === 'VDS' ? calculateRem(8) : margin};
`;

const _configureTypography = (bodyConfig, typescale, children) => {
  if (typescale === 'VDS') {
    return (
      <Body config={bodyConfig} typescale={typescale} className="formText">
        {children}
      </Body>
    );
  } else {
    return <Micro className="formText">{children}</Micro>;
  }
};

/**
 * @ignore
 */
const InputText = ({ margin, bodyConfig, typescale, children }) => {
  return (
    <div role="alert">
      <InputTextWrapper typescale={typescale} margin={margin}>
        {_configureTypography(bodyConfig, typescale, children)}
      </InputTextWrapper>
    </div>
  );
};

InputText.propTypes = propTypes;
InputText.defaultProps = defaultProps;

export default InputText;
