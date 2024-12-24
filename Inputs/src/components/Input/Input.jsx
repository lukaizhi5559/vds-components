/* istanbul ignore file */

import React from 'react';
import PropTypes from 'prop-types';
import { InputField } from '../InputField';

const propTypes = {
  type: PropTypes.oneOf([
    'text',
    'number',
    'calendar',
    'inlineAction',
    'password',
    'creditCard',
    'tel',
    'date',
    'securityCode',
  ]),
};

const defaultProps = {
  type: 'text',
};

/**
 * @ignore
 */
const Input = ({ type, ...props }) => {
  switch (type) {
    case 'number':
    case 'text':
    case 'inlineAction':
    case 'password':
    case 'creditCard':
    case 'tel':
    case 'date':
    case 'securityCode':
      return <InputField type={type} {...props} />;
    default:
      console.warn('Warning: Native input type ' + type + ' is not supported');
      return <InputField type="text" {...props} />;
  }
};

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
