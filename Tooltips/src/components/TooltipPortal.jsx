import { Component } from 'react';
import ReactDOM from 'react-dom';
import React from 'react';
import PropTypes from 'prop-types';

const { body } = typeof document !== 'undefined' && document;

const propTypes = {
  /**
   * @ignore
   */
  children: PropTypes.node,
};

/**
 * @ignore
 */
class TooltipPortal extends Component {
  constructor(props) {
    super(props);
    this.el = typeof document !== 'undefined' && document.createElement('div');
    if (this.el) this.el.id = 'tooltip-portal';
  }

  componentDidMount() {
    body.appendChild(this.el);
  }

  componentWillUnmount() {
    body.removeChild(this.el);
  }

  render() {
    const { children } = this.props;
    return this.el ? ReactDOM.createPortal(children, this.el) : null;
  }
}

TooltipPortal.propTypes = propTypes;

export default TooltipPortal;
