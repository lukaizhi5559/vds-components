import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { calculateRem } from '@vds-core/utilities';
import { TypographyTokens } from '@vds-tokens/typography';
import { ColorTokens } from '@vds-tokens/color';
import { Fonts } from '@vds-core/typography';

const propTypes = {
  /**
   * String, React components or HTML elements that will be rendered in the ModalBody.
   */
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.node,
  ]),
  /**
   * @ignore
   * Inverted
   */
  surface: PropTypes.oneOf(['light', 'dark']),
};

const defaultProps = {
  surface: 'light',
};

const StyledModalBody = styled.div`
  flex: 1 0 auto;
  color: ${({ surface }) =>
    surface === 'dark'
      ? ColorTokens.elements.primary.ondark.value
      : ColorTokens.elements.primary.onlight.value};
  line-height: ${calculateRem(TypographyTokens.lineheight.body[20].value)};
  font-size: ${calculateRem(TypographyTokens.fontsize.body[16].value)};
  letter-spacing: ${calculateRem(TypographyTokens.letterspacing.wide.value)};
  font-family: ${Fonts.VerizonNHGeDS};
  padding: ${calculateRem(24)} 0 0 0;
  position: relative;
  &:active {
    outline: none;
  }

  @media (min-width: 767px) {
    line-height: ${calculateRem(TypographyTokens.lineheight.body[20].value)};
    font-size: ${calculateRem(TypographyTokens.fontsize.body[16].value)};
    font-family: ${Fonts.VerizonNHGeDS};
  }
`;

const ModalBody = props => {
  const { children, surface } = props;
  return (
    <StyledModalBody surface={surface} data-testid="modal-body">
      {children}
    </StyledModalBody>
  );
};

ModalBody.propTypes = propTypes;
ModalBody.defaultProps = defaultProps;

export default ModalBody;
