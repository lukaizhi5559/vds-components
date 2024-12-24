import { ColorTokens } from '@vds-tokens/color';
export const getIconColor = ({ lineColor, color, surface }) => {
  let iconColor = lineColor || color;
  //If inverted and no color specified
  if (surface === 'dark' && !color && !lineColor) {
    iconColor = ColorTokens.elements.primary.ondark.value;
    //If inverted and color black
  } else if (
    surface === 'dark' &&
    (color === 'black' ||
      color === ColorTokens.elements.primary.onlight.value ||
      color === 'Black')
  ) {
    iconColor = ColorTokens.elements.primary.ondark.value;
  }

  return iconColor;
};
