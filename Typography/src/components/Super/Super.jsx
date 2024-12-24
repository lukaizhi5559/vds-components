import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { Fonts } from '../../fonts';

const propTypes = {
  /**
   * If true, custom superscript styles will be applied
   */
  superscriptSmall: PropTypes.bool,
  /**
   * @ignore
   */
  feature: PropTypes.bool,
  /**
   * Assigns an testid to the component
   */
  'data-testid': PropTypes.string,
  /**
   * String or number that is used to render as the superscript
   */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

const StyledSuper = styled.sup`
  ${({ feature, size }) =>
    feature &&
    `
    position: relative;
    font-size: ${size / 2}px;
    line-height: 0px;
    font-family: ${Fonts.VerizonNHGeDS};
  `};
`;

const Super = props => {
  const {
    fontSize,
    children,
    superscriptSmall,
    feature,
    'data-testid': testId,
  } = props;
  const stringifiedChildren = children.toString();
  const size = fontSize && parseInt(fontSize, 10);
  let Wrapper, superProps;
  /**
   * This is to avoid adding size and feature when the element is a span
   * "invalid dom attribute of..."/ transient prop error
   */
  if (superscriptSmall) {
    Wrapper = StyledSuper;
    superProps = {
      size,
      feature,
    };
  } else {
    Wrapper = 'span';
    superProps = {};
  }

  function _convertToUnicode(char, i) {
    char = char.toString();
    switch (char) {
      case '0':
        return '\u2070';
      case '1':
        return '\u00B9';
      case '2':
        return '\u00B2';
      case '3':
        return '\u00B3';
      case '4':
        return '\u2074';
      case '5':
        return '\u2075';
      case '6':
        return '\u2076';
      case '7':
        return '\u2077';
      case '8':
        return '\u2078';
      case '9':
        return '\u2079';
      default:
        return superscriptSmall ? char : <sup key={i}>{char}</sup>;
    }
  }

  function _parseChildren(children) {
    return [...children].map((char, i) => {
      return _convertToUnicode(char, i);
    });
  }

  if (typeof children !== 'string' && typeof children !== 'number') {
    console.warn(
      'Super element only allows children of type string or number.'
    );
    return null;
  }

  return (
    <Wrapper {...superProps} data-testid={testId}>
      {_parseChildren(stringifiedChildren)}
    </Wrapper>
  );
};

Super.propTypes = propTypes;
Super.displayName = 'Super';
export default Super;
