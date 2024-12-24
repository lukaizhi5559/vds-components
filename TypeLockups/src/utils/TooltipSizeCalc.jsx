export const _findTooltipSize = (
  tooltipSizeFromTooltip,
  typographySize,
  viewport
) => {
  let tooltipSize;
  let fixedSizeList = ['bodyMedium', 'bodySmall'];
  let canIUseTypographyTooltipSize =
    !!fixedSizeList.includes(typographySize) ||
    tooltipSizeFromTooltip === undefined;
  if (!canIUseTypographyTooltipSize) {
    return tooltipSizeFromTooltip;
  }
  if (canIUseTypographyTooltipSize) {
    tooltipSize = _fetchSizefromTypography(typographySize, viewport);
    return tooltipSize;
  }
};

const _fetchSizefromTypography = (typographySize, viewport) => {
  const desktopMap = {
    featureMedium: 'medium',
    featureSmall: 'medium',
    featureXSmall: 'medium',
    title2XLarge: 'medium',
    titleXLarge: 'medium',
    titleLarge: 'medium',
    titleMedium: 'medium',
    titleSmall: 'medium',
    bodyLarge: 'medium',
    bodyMedium: 'small',
    bodySmall: 'small',
  };

  const mobileMap = {
    featureMedium: 'medium',
    featureSmall: 'medium',
    featureXSmall: 'medium',
    title2XLarge: 'medium',
    titleXLarge: 'medium',
    titleLarge: 'medium',
    titleMedium: 'medium',
    titleSmall: 'medium',
    bodyLarge: 'medium',
    bodyMedium: 'small',
    bodySmall: 'small',
  };
  let tooltipSizeFromTypography;
  if (viewport !== 'mobile') {
    tooltipSizeFromTypography = desktopMap[typographySize];
    return tooltipSizeFromTypography;
  }

  if (viewport === 'mobile') {
    tooltipSizeFromTypography = mobileMap[typographySize];
    return tooltipSizeFromTypography;
  }
};
