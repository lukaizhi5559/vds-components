import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
class LoaderPortal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mounted: false, // Has to have this state to prevent react-hydration issue with SSR/SSG
    };
  }

  componentDidMount() {
    // NOTE: Create the div here so it's compatible with SSR/SSG
    this.el = typeof document !== 'undefined' && document.createElement('div');
    this.setState({ mounted: true });
    body.appendChild(this.el);
  }

  componentWillUnmount() {
    body.removeChild(this.el);
  }

  render() {
    return this.state.mounted
      ? ReactDOM.createPortal(this.props.children, this.el)
      : null;
  }
}

LoaderPortal.propTypes = propTypes;

export default LoaderPortal;
