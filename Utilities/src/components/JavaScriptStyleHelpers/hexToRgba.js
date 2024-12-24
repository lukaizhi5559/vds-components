const hexToRgba = (colorString, opacity = 1) => {
  const red = colorString.substr(1, 2),
    green = colorString.substr(3, 2),
    blue = colorString.substr(5, 2);

  const red10 = parseInt(red, 16),
    green10 = parseInt(green, 16),
    blue10 = parseInt(blue, 16);

  return `rgba(${red10},${green10},${blue10},${opacity})`;
};

export default hexToRgba;
