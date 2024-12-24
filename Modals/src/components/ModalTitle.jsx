import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Fonts } from '@vds-core/typography';
import { calculateRem } from '@vds-core/utilities';
import { ColorTokens } from '@vds-tokens/color';
import { TypographyTokens } from '@vds-tokens/typography';

const propTypes = {
  /**
   * The primitive prop will alter a string provided to the header to be one of h1, h2, h3, h4, h5, h6
   */
  primitive: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  /**
   * Title area Text or React Component that will be shown in the Modal Header.
   * @note If you provide a React Component for this Property, you are responsible for providing all the appropriate formatting as well.
   */
  children: PropTypes.node,
  /**
   * @ignore
   * Inverted style
   */
  surface: PropTypes.oneOf(['light', 'dark']),
  /**
   * @ignore
   * VDS 1.0 padding-right = 48px hit area + 8px offset - 16px padding right on dialog
   */
  rightPadding: PropTypes.bool,
  /**
   * @ignore
   * Custom padding
   */
  padding: PropTypes.string,
};

const defaultProps = {
  children: null,
  primitive: 'h2',
  rightPadding: false,
  padding: '0px',
  surface: 'light',
};

//VDS 1.0 padding-right = 48px hit area + 8px offset - 16px padding right on dialog
const StyledHeader = styled.div`
  ${({ rightPadding }) =>
    rightPadding &&
    `
  padding-right: 40px;
  `}
  &:hover,
  &:active,
  &:visited {
    outline: none;
  }
`;

/**
 * @ignore
 */
const StyledHeaderText = styled.h2`
  color: ${({ surface }) =>
    surface === 'dark'
      ? ColorTokens.elements.primary.ondark.value
      : ColorTokens.elements.primary.onlight.value};
  font-size: ${calculateRem(TypographyTokens.fontsize.title[24].value)};
  line-height: ${calculateRem(TypographyTokens.lineheight.title[28].value)};
  font-family: ${Fonts.VerizonNHGeDS};
  padding: ${({ padding }) => padding};
  margin: 0;
  flex: 1;

  @media (min-width: 767px) {
    font-size: ${calculateRem(TypographyTokens.fontsize.title[32].value)};
    line-height: ${calculateRem(TypographyTokens.lineheight.title[36].value)};
  }
`;

const ModalTitle = props => {
  const {
    children,
    primitive,
    padding: paddingProp,
    rightPadding,
    surface,
  } = props;

  return (
    <StyledHeader rightPadding={rightPadding} data-testid="modal-header">
      <StyledHeaderText
        padding={paddingProp}
        primitive={primitive}
        surface={surface}
      >
        {children}
      </StyledHeaderText>
    </StyledHeader>
  );
};

ModalTitle.propTypes = propTypes;
ModalTitle.defaultProps = defaultProps;

export default ModalTitle;
