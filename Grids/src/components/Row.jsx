import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { Row as FlexboxRow } from 'react-styled-flexboxgrid';

const propTypes = {
  /**
   * @ignore
   */
  children: PropTypes.node.isRequired,
};

const RowWrapper = styled.div`
  width: 100%;
`;
const StyledRow = styled(FlexboxRow)`
  max-width: 1272px;
`;

const Row = props => {
  return (
    <RowWrapper bleed={props.bleed} className={props.className}>
      <StyledRow {...props}>{props.children}</StyledRow>
    </RowWrapper>
  );
};

Row.propTypes = propTypes;

export default Row;
