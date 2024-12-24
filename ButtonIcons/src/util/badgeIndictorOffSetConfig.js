function getOffset(kind, size, badgeIndicatorOffsetProp) {
  let dafaultValue = { x: '0px', y: '0px' };
  if (size === 'small' || size === 'large') {
    dafaultValue = badgeIndictorOffSetConfig[kind][size];
  }

  return {
    x:
      badgeIndicatorOffsetProp && badgeIndicatorOffsetProp.x
        ? badgeIndicatorOffsetProp.x
        : dafaultValue.x,
    y:
      badgeIndicatorOffsetProp && badgeIndicatorOffsetProp.y
        ? badgeIndicatorOffsetProp.y
        : dafaultValue.y,
  };
}

const badgeIndictorOffSetConfig = {
  ghost: {
    large: { x: '1px', y: '1px' },
    small: { x: '1px', y: '0px' },
  },
  lowContrast: {
    large: { x: '6px', y: '6px' },
    small: { x: '4px', y: '4px' },
  },
  highContrast: {
    large: { x: '6px', y: '6px' },
    small: { x: '4px', y: '4px' },
  },

  getOffset: getOffset,
};

export default badgeIndictorOffSetConfig;
