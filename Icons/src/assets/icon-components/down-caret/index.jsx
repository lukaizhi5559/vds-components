import { IconBase, defaultProps, propTypes } from '../../../Icon/IconBase';

import React from 'react';
import { getIconColor } from '../../../Icon/utils';

const DownCaret = props => {
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
          <polygon points="10.8 15.71 1.8 6.71 2.62 5.89 10.8 14.07 18.98 5.89 19.8 6.71 10.8 15.71" />
        </>
      }
      iconName="down-caret"
      viewBox="0 0 21.6 21.6"
      color={getIconColor(props)}
    />
  );
};

DownCaret.propTypes = propTypes;
DownCaret.defaultProps = defaultProps;
DownCaret.displayName = 'VDS_Icon';

export default DownCaret;
