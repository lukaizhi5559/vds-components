import { IconBase, defaultProps, propTypes } from '../../../Icon/IconBase';

import React from 'react';
import { getIconColor } from '../../../Icon/utils';

const RightCaret = props => {
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
          <polygon points="6.71 19.8 5.89 18.981 14.07 10.799 5.89 2.619 6.71 1.8 15.71 10.799 6.71 19.8" />
        </>
      }
      iconName="right-caret"
      viewBox="0 0 21.6 21.6"
      color={getIconColor(props)}
    />
  );
};

RightCaret.propTypes = propTypes;
RightCaret.defaultProps = defaultProps;
RightCaret.displayName = 'VDS_Icon';

export default RightCaret;
