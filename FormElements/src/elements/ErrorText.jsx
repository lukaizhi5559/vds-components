import styled from 'styled-components';
import { Body } from '@vds-core/typography';
import { ColorTokens } from '@vds-tokens/color';
import React from 'react';

const ErrorTextWrapper = styled.div`
  margin-top: ${({ errorLabelSpacing }) => errorLabelSpacing};
`;

const ErrorText = props => {
  const {
    errorLabelSpacing,
    errorText,
    error,
    success,
    successText,
    surface,
  } = props;

  return (
    <div role="alert">
      <ErrorTextWrapper errorLabelSpacing={errorLabelSpacing}>
        <Body
          size="small"
          color={
            surface === 'dark'
              ? ColorTokens.elements.primary.ondark.value
              : ColorTokens.elements.primary.onlight.value
          }
        >
          {error ? errorText : success && successText}
        </Body>
      </ErrorTextWrapper>
    </div>
  );
};

export default ErrorText;
