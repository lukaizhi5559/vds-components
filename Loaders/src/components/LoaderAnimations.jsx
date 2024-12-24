import { keyframes } from 'styled-components';

const LoadingAnimation = keyframes`
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
`;

const FadeInAnimation = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const FadeOutAnimation = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

export { LoadingAnimation, FadeOutAnimation, FadeInAnimation };
