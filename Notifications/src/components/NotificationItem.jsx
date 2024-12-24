import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CoreNotification from './Notification';

const propTypes = {
  /**
   * @ignore - Prop that passes new Notification component
   */
  renderNotification: PropTypes.func,
};

class NotificationItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate = (nextProps, nextState) => this.props !== nextProps;

  render() {
    const { index, renderNotification } = this.props;
    const NotificationComponent = renderNotification
      ? renderNotification
      : CoreNotification;
    return (
      <NotificationComponent {...this.props} disableAnimation={index !== 0} />
    );
  }
}

NotificationItem.propTypes = propTypes;

export default NotificationItem;
