import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ColorTokens } from '@vds-tokens/color';

// Style properties
const colorDefault = ColorTokens.elements.primary.onlight.value;
const colorInverted = ColorTokens.elements.primary.ondark.value;

const propTypes = {
  /**
   * @ignore
   */
  surface: PropTypes.oneOf(['light', 'dark']),
  /**
   * Content that will be passed to the list.
   */
  children: PropTypes.node,
  /**
   * If provided, used as string that labels the element for accessibility.
   */
  ariaLabel: PropTypes.string,
  /**
   * Allows a unique ID to be passed to the component.
   */
  id: PropTypes.string,
};

const defaultProps = {
  surface: 'light',
};

const StyledUl = styled.ul`
  padding: 0;
  margin: 0;
  li,
  ul li {
    color: ${({ surface }) =>
      surface === 'dark' ? colorInverted : colorDefault} !important;
  }
`;

const UnorderedList = props => {
  const { id, children, className, surface } = props;

  return (
    <StyledUl id={id} className={className} surface={surface}>
      {children}
    </StyledUl>
  );
};

UnorderedList.propTypes = propTypes;
UnorderedList.defaultProps = defaultProps;
UnorderedList.displayName = 'UnorderedList';

export default UnorderedList;
