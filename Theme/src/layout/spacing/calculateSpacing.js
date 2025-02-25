import { calculateRem } from '@vds-core/utilities';
import { vdsSpacingScale } from './spacingScale';

let SpacingConfig = {
  factor: 4,
  scale: vdsSpacingScale,
};

function setSpacingFactor(factor) {
  if (typeof factor !== 'number') {
    return console.error('The factor passed is not a number!');
  }

  SpacingConfig.factor = factor;
}

function getSpacingFactor() {
  return SpacingConfig.factor;
}

function setSpacingScale(scale) {
  if (typeof scale !== 'object') {
    return console.error('The config passed is not an object!');
  }
  SpacingConfig.scale = scale;
}

function getSpacingScale() {
  return SpacingConfig.scale;
}

function calculateSpacing(unitName, unit) {
  const { scale, factor } = SpacingConfig;

  const num = scale[unitName] * factor;
  if (!num) {
    return console.error('Size is not supported by spacing scale!');
  }
  return unit === 'rem' ? calculateRem(num) : `${num}px`;
}

export {
  setSpacingFactor,
  getSpacingFactor,
  setSpacingScale,
  getSpacingScale,
  calculateSpacing,
};
