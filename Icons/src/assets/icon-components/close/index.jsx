import { IconBase, defaultProps, propTypes } from '../../../Icon/IconBase';

import React from 'react';
import { getIconColor } from '../../../Icon/utils';

const Close = props => {
  let { ariaHidden, ariaLabel, size, surface, id, tabIndex } = props;
  return (
    <IconBase
      ariaHidden={ariaHidden}
      ariaLabel={ariaLabel}
      size={size}
      surface={surface}
      id={id}
      tabIndex={tabIndex}
      svgContent={
        <>
          <path d="M11.59,10.8l7.11,7.1-.8.8-7.1-7.11L3.7,18.7l-.8-.8L10,10.8,2.9,3.7l.8-.8L10.8,10,17.9,2.9l.8.8Z" />
        </>
      }
      iconName="close"
      viewBox="0 0 21.6 21.6"
      color={getIconColor(props)}
    />
  );
};

Close.propTypes = propTypes;
Close.defaultProps = defaultProps;
Close.displayName = 'VDS_Icon';

export default Close;
