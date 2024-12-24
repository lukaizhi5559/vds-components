import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { calculateRem } from '@vds-core/utilities';
import { Fonts } from '../../fonts';

const propTypes = {
  primitive: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span']),
  children: PropTypes.node,
};

const defaultProps = {
  children: null,
  primitive: 'p',
};
/**
 * @ignore
 */
const StyledTypography = styled(
  ({
    fontSize,
    fontWeight,
    lineheight,
    fontFamily,
    letterSpacing,
    colorConfig,
    color,
    bold,
    strikethrough,
    fontsconfig,
    primitive,
    children,
    ...rest
  }) => {
    return React.createElement(primitive, rest, children);
  }
)`
  font-size: ${({ fontSize }) => calculateRem(fontSize)};
  font-weight: ${({ fontWeight }) => fontWeight};
  line-height: ${({ lineheight }) => calculateRem(lineheight)};
  font-family: ${({ fontFamily }) =>
    fontFamily + ', Helvetica, Arial, Sans-serif'};
  letter-spacing: ${({ letterSpacing }) =>
    letterSpacing && calculateRem(letterSpacing)};
  color: ${({ color }) => color};
  margin: 0;
  text-decoration: none;
`;

/**
 * @ignore
 */
const Typography = props => {
  const { primitive, children } = props;

  if (Fonts.checkFontLoaded && !Fonts.checkFontLoaded()) {
    Fonts.loadFonts && Fonts.loadFonts();
  }

  return (
    <StyledTypography {...props} primitive={primitive}>
      {children}
    </StyledTypography>
  );
};

Typography.propTypes = propTypes;
Typography.defaultProps = defaultProps;

export default Typography;
