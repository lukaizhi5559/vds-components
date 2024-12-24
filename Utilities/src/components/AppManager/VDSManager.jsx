import React from 'react';
import PropTypes from 'prop-types';
import ViewportManager from './ViewportManager';

let breakpoints = {
  xs: '320px',
  sm: '480px',
  md: '767px',
  lg: '991px',
  xl: '1024px',
  xxl: '1272px',
};

const propTypes = {
  /**
   * @ignore
   * If provided, the given value will be the max-width of the mobile viewport.
   */
  maxMobile: PropTypes.string,
  /**
   * @ignore
   * If provided, the given value will be the min-width of the tablet viewport.
   */
  maxMobileLarge: PropTypes.string,
  /**
   * @ignore
   * If provided, the given value will be the max-width of the tablet viewport.
   */
  maxTablet: PropTypes.string,
  /**
   * @ignore
   * If provided, the given value will be the max-width of the tabletLarge viewport.
   */
  maxTabletLarge: PropTypes.string,
  /**
   * @ignore
   * If provided, the given value will be the min-desktop of the tablet viewport.
   */
  minDesktop: PropTypes.string,
};

const defaultProps = {
  maxMobile: '479px', // 320 - 479
  maxMobileLarge: breakpoints.md, // 480 - 767
  maxTablet: breakpoints.lg, // 768 - 991
  maxTabletLarge: '1023px', // 992 - 1023
  minDesktop: breakpoints.xl, // 1024 - any
};

/**
 * This is the root class to manage a variety of things for applications utilizing VDS.
 * A user will implement this class as a Wrapper around their application once.
 */
class VDSManager extends React.Component {
  constructor(props) {
    super(props);
    ViewportManager.register(this.props);
  }

  componentWillUnmount() {
    ViewportManager.unregister(this.props);
  }

  render() {
    if (!this.props.children) {
      return null;
    }
    return this.props.children;
  }
}

VDSManager.defaultProps = defaultProps;
VDSManager.propTypes = propTypes;

export default VDSManager;
