import React from 'react';
import styled from 'styled-components';
import { calculateRem } from '@vds-core/utilities';
import { Body } from '@vds-core/typography';

const InputTextWrapper = styled.div`
  display: block;
  margin-top: ${calculateRem(8)};
`;

/**
 * @ignore
 */
const InputText = ({ children, fontFamily, color }) => {
  return (
    <div role="alert">
      <InputTextWrapper>
        <Body size="small" fontFamily={fontFamily && fontFamily} color={color}>
          {children}
        </Body>
      </InputTextWrapper>
    </div>
  );
};

export default InputText;
