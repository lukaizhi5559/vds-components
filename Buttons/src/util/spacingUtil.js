const spacingForButton = (nextButtonType, size) => {
  let rightSpacing;

  if (nextButtonType === 'primary' || nextButtonType === 'secondary') {
    rightSpacing = '3X';
  } else if (nextButtonType === 'textLinkCaret') {
    rightSpacing = '6X';
  } else if (nextButtonType === 'textLink') {
    rightSpacing = '4X';
  } else {
    rightSpacing = 0;
  }

  let bottomSpacing = '3X';

  return {
    rightSpacing: rightSpacing,
    bottomSpacing: bottomSpacing,
  };
};

const spacingForTextLink = (nextButtonType, size) => {
  let topSpacing = size === 'small' ? '3X' : '1X';
  let rightSpacing = '4X';
  let bottomSpacing = size === 'small' ? '5X' : '3X';

  if (nextButtonType === 'textLink') {
    bottomSpacing = size === 'small' ? '5X' : '5X';
  }

  return {
    topSpacing: topSpacing,
    rightSpacing: rightSpacing,
    bottomSpacing: bottomSpacing,
  };
};

const spacingForTextLinkCaret = nextButtonType => {
  return {
    topSpacing: '3X',
    rightSpacing: '6X',
    bottomSpacing: nextButtonType === 'textLink' ? '5X' : '3X',
  };
};

export { spacingForButton, spacingForTextLink, spacingForTextLinkCaret };
