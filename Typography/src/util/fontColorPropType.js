const brandColors = [
  '#000000',
  '#FFFFFF',
  '#ffffff',
  '#F6F6F6',
  '#f6f6f6',
  '#D8DADA',
  '#6f7171',
  '#d8dada',
  '#6F7171',
  '#747676',
  '#333333',
  '#0088CE',
  '#0088ce',
  '#d52b1e',
  '#D52B1E',
];

const colorExists = color => {
  if (!color) {
    return console.error('Need a color passed through');
  }

  return brandColors.indexOf(color) > -1;
};

const fontColorChecker = (props, propName, componentName) => {
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

const fontColorPropType = createChainableTypeChecker(fontColorChecker);

export default fontColorPropType;
