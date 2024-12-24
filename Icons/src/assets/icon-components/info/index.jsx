import { IconBase, defaultProps, propTypes } from '../../../Icon/IconBase';

import React from 'react';
import { getIconColor } from '../../../Icon/utils';

const Info = props => {
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
          <path
            class="cls-1"
            d="M19.8,10.8a9,9,0,1,0-9,9A9.01054,9.01054,0,0,0,19.8,10.8Zm-1.12488,0A7.87513,7.87513,0,1,1,10.8,2.92486,7.88411,7.88411,0,0,1,18.67509,10.8ZM11.625,7.45852H9.95v-1.675h1.675ZM9.95834,9.11662H11.65v6.6999H9.95834Z"
          />
        </>
      }
      iconName="info"
      viewBox="0 0 21.6 21.6"
      color={getIconColor(props)}
    />
  );
};

Info.propTypes = propTypes;
Info.defaultProps = defaultProps;
Info.displayName = 'VDS_Icon';

export default Info;
