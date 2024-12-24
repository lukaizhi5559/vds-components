import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { calculateRem, withVDSManager } from '@vds-core/utilities';
import { ColorTokens } from '@vds-tokens/color';
import { TypographyTokens } from '@vds-tokens/typography';
import { Fonts } from '@vds-core/typography';

const _calTypography = viewport => {
  return {
    fontSize:
      viewport === 'mobile'
        ? TypographyTokens.fontsize.title[16].value
        : TypographyTokens.fontsize.title[20].value,
    lineHeight:
      viewport === 'mobile'
        ? TypographyTokens.lineheight.title[20].value
        : TypographyTokens.lineheight.title[24].value,
    letterSpacing: 0,
    fontWeight: TypographyTokens.fontweight.bold.value,
    fontFamily: Fonts.VerizonNHGeDS,
  };
};

const propTypes = {
  /**
   * The TableHeader allows Any types as children.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * allows for col or row headers.
   */
  scope: PropTypes.oneOf(['col', 'row']),
  /**
   * @ignore
   */
  viewport: PropTypes.oneOf(['mobile', 'tablet', 'desktop']),
  /**
   * @ignore
   * Function to calculate typography sizes
   */
  calcTypography: PropTypes.func,
  /**
   * Allows a unique ID to be passed to the th element.
   */
  id: PropTypes.string,
  /**
   * Allows extend the TableHeader columns based on given number value.
   */
  colSpan: PropTypes.number,
  /**
   * Allows extend the TableHeader row based on given number value.
   */
  rowSpan: PropTypes.number,
  /**
   * Allows to pass id of related TableHeaders
   */
  headers: PropTypes.string,
};

const defaultProps = {
  children: undefined,
  className: undefined,
  viewport: 'desktop',
  padding: 'standard',
  scope: 'col',
  calcTypography: _calTypography,
};

const StyledTH = styled.th`
  ${({ typographyConfig }) => `
    font-size: ${typographyConfig.fontSize};
    line-height: ${typographyConfig.lineHeight};
    letter-spacing: ${typographyConfig.letterSpacing};
    font-family: ${typographyConfig.fontFamily};
    font-weight: ${typographyConfig.fontWeight};
  `};
  color: ${ColorTokens.elements.primary.onlight.value};
  text-align: left;
  vertical-align: top;
  > :nth-child(n) {
    &:not(:first-child) {
      margin-top: ${calculateRem(14)};
    }
  }
  &:active,
  &:focus,
  &:hover {
    outline: none;
  }
`;

const TableHeader = props => {
  const {
    children,
    calcTypography,
    viewport,
    className,
    scope,
    id,
    colSpan,
    rowSpan,
    headers,
  } = props;
  return (
    <StyledTH
      viewport={viewport}
      typographyConfig={calcTypography(viewport)}
      className={className}
      scope={scope}
      id={id}
      colSpan={colSpan}
      rowSpan={rowSpan}
      headers={headers}
    >
      {children}
    </StyledTH>
  );
};

TableHeader.propTypes = propTypes;
TableHeader.defaultProps = defaultProps;

export default withVDSManager(TableHeader);
