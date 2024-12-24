import { css } from 'styled-components';

const parseAspectRatio = (aspectRatio) => {
  const [ width, height ] = aspectRatio.replace(':', '/').split('/').map(ratioItem => parseInt(ratioItem.trim()));
  const percentage = (height / width) * 100;
  return `${percentage.toFixed(2)}%`;
};

const aspectRatioPolyfill = (ratio) => {
  return css`
    @supports not (aspect-ratio: auto) {
      &::before {
        float: left;
        padding-top: ${parseAspectRatio(ratio)};
        content: "";
      }
      &::after {
        display: block;
        content: "";
        clear: both;
      }
    }
  `};

export default aspectRatioPolyfill;