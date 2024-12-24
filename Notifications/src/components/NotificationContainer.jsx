import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import NotificationItem from './NotificationItem';

const propTypes = {
  childArray: PropTypes.array,
  /**
   * @ignore - Prop that passes new Notification component
   */
  renderNotification: PropTypes.func,
};

const NotificationContainer = props => {
  const { childArray, renderNotification } = props;
  return (
    <Fragment>
      {childArray.map((child, index) => (
        <NotificationItem
          {...child}
          renderNotification={renderNotification}
          key={index}
          index={index}
        />
      ))}
    </Fragment>
  );
};

NotificationContainer.propTypes = propTypes;

export default NotificationContainer;
