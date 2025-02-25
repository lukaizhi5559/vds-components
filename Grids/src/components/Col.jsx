import React from 'react';
import PropTypes from 'prop-types';
import { Col as FlexboxCol } from 'react-styled-flexboxgrid';

const propTypes = {
  /**
   * Children for the Col component
   */
  children: PropTypes.node.isRequired,
  /**
   * When provided, will set sizes for the specific Col component for each viewport, and override the Grid level settings
   */
  colSizes: PropTypes.object,
  /**
   * Allows an id to be passed to the col
   */
  id: PropTypes.string,
};

const defaultProps = {
  colSizes: {},
};

const Col = props => (
  <FlexboxCol {...props.colSizes} {...props}>
    {props.children}
  </FlexboxCol>
);

Col.propTypes = propTypes;
Col.defaultProps = defaultProps;

export default Col;
