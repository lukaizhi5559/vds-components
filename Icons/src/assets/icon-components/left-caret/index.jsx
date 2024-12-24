import { IconBase, defaultProps, propTypes } from '../../../Icon/IconBase';

import React from 'react';
import { getIconColor } from '../../../Icon/utils';

const LeftCaret = props => {
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
          <polygon points="14.89 19.8 5.89 10.799 14.89 1.8 15.71 2.619 7.53 10.799 15.71 18.981 14.89 19.8" />
        </>
      }
      iconName="left-caret"
      viewBox="0 0 21.6 21.6"
      color={getIconColor(props)}
    />
  );
};

LeftCaret.propTypes = propTypes;
LeftCaret.defaultProps = defaultProps;
LeftCaret.displayName = 'VDS_Icon';

export default LeftCaret;
