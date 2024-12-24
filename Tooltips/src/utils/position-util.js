import { calculateRem } from '@vds-core/utilities';

export const updateDialogPosition = props => {
  const {
    isDialogOnTop,
    customAnchorElement,
    customAnchorPresent,
    size,
  } = props;

  if (!customAnchorPresent) {
    if (isDialogOnTop) {
      /* styles for when dialog is above anchor and no customAnchorElement */
      return `
          bottom: ${calculateRem(size === 'small' ? 27 : 30)};
        &::after {
          transform: translate(-50%) rotate(225deg) !important;
        };
        `;
    }

    /* styles for when dialog is below anchor and no customAnchorElement */
    return `
        top: ${calculateRem(size === 'small' ? 27 : 30)};
        &::before {
          top: ${calculateRem(-5)};
          box-sizing: border-box;
          transform: translate(-50%) rotate(225deg) !important;

          @media not all and (min-resolution:.001dpcm) { 
            @supports (-webkit-appearance:none) {
              top: ${calculateRem(-5.5)};
            }}
          };
      `;
  }

  if (customAnchorPresent) {
    if (isDialogOnTop) {
      /* styles for when dialog is above anchor and customAnchorElement */
      return `

          bottom: ${calculateRem(
            customAnchorElement.getBoundingClientRect().height + 6
          )};
        `;
    }

    /* styles for when dialog is below anchor and customAnchorElement */
    return `

      top: ${calculateRem(
        customAnchorElement.getBoundingClientRect().height + 8
      )};

        &::before {
          top: ${calculateRem(-5)};
          transform: translate(-50%) rotate(225deg) !important;

          /* position fix for safari browsers */
          @media not all and (min-resolution:.001dpcm) { 
            @supports (-webkit-appearance:none) {
              top: ${calculateRem(-5.5)};
            }}
          };
        };
      `;
  }
};
