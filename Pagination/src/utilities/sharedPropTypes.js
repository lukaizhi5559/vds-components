import React from 'react';
import PropTypes from 'prop-types';

export default {
  baseUrl: PropTypes.func,
  current: PropTypes.number,
  selectedPage: PropTypes.number,
  selectPage: PropTypes.func,
  total: PropTypes.number.isRequired,
  surface: PropTypes.oneOf(['light', 'dark']),
  focusBorderRadius: PropTypes.string,
};
