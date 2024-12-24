import { ColorTokens } from '@vds-tokens/color';

const brandColors = [
  ColorTokens.palette.red.value,
  ColorTokens.palette.black.value,
  ColorTokens.palette.white.value,
  ColorTokens.palette.gray95.value,
  ColorTokens.palette.gray85.value,
  ColorTokens.palette.gray65.value,
  ColorTokens.palette.gray44.value,
  ColorTokens.palette.gray20.value,
  ColorTokens.palette.gray11.value,
  ColorTokens.palette.orange94.value,
  ColorTokens.palette.orange83.value,
  ColorTokens.palette.orange71.value,
  ColorTokens.palette.orange58.value,
  ColorTokens.palette.orange41.value,
  ColorTokens.palette.orange24.value,
  ColorTokens.palette.orange17.value,
  ColorTokens.palette.yellow94.value,
  ColorTokens.palette.yellow87.value,
  ColorTokens.palette.yellow74.value,
  ColorTokens.palette.yellow53.value,
  ColorTokens.palette.yellow39.value,
  ColorTokens.palette.yellow20.value,
  ColorTokens.palette.yellow15.value,
  ColorTokens.palette.blue94.value,
  ColorTokens.palette.blue82.value,
  ColorTokens.palette.blue62.value,
  ColorTokens.palette.blue46.value,
  ColorTokens.palette.blue38.value,
  ColorTokens.palette.blue21.value,
  ColorTokens.palette.blue15.value,
  ColorTokens.palette.green91.value,
  ColorTokens.palette.green77.value,
  ColorTokens.palette.green61.value,
  ColorTokens.palette.green36.value,
  ColorTokens.palette.green26.value,
  ColorTokens.palette.green15.value,
  ColorTokens.palette.green10.value,
  ColorTokens.palette.pink87.value,
  ColorTokens.palette.pink76.value,
  ColorTokens.palette.pink62.value,
  ColorTokens.palette.pink46.value,
  ColorTokens.palette.pink25.value,
  ColorTokens.palette.purple85.value,
  ColorTokens.palette.purple75.value,
  ColorTokens.palette.purple60.value,
  ColorTokens.palette.purple39.value,
  ColorTokens.palette.purple20.value,
];

const colorExists = color => {
  if (!color) {
    return console.error('Need a color passed through');
  }
  return brandColors.indexOf(color.toLowerCase()) > -1;
};

const brandColorChecker = (props, propName, componentName) => {
  if (props && props[propName]) {
    const ColorExists = colorExists(props[propName]);

    if (!ColorExists) {
      return console.warn(
        `The color, ${props[propName]} is not a defined prop for ${componentName} `
      );
    }
  }
  return null;
};

const createChainableTypeChecker = validate => {
  function checkType(props, propName, componentName) {
    componentName = componentName || 'ANONYMOUS';
    if (props[propName] == null) {
      return null;
    } else {
      return validate(props, propName, componentName);
    }
  }

  function checkReqType(props, propName, componentName) {
    componentName = componentName || 'ANONYMOUS';
    if (props[propName] == null) {
      return console.warn(
        `Required ${propName} was not specified in ${componentName}`
      );
    } else {
      return validate(props, propName, componentName);
    }
  }

  // const chainedCheckType = checkType.bind(null, false);

  // chainedCheckType.isRequired = checkType.bind(null, true);

  const chainedCheckType = checkType.bind();
  chainedCheckType.isRequired = checkReqType.bind();

  return chainedCheckType;
};

const brandColor = createChainableTypeChecker(brandColorChecker);

export default brandColor;
