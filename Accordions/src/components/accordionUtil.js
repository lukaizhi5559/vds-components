import { ColorTokens } from '@vds-tokens/color';

export const getBackgroundColor = props => {
  const { backgroundColor, surface } = props;

  let backColor = backgroundColor;

  if (!backColor) {
    backColor =
      surface === 'dark'
        ? ColorTokens.background.primary.dark.value
        : ColorTokens.background.primary.light.value;
  }

  return backColor;
};
