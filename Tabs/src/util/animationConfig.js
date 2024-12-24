const animationConfig = {
  slideUp: {
    duration: '0.6s',
    delay: '0ms',
    timingFunction: 'ease-in-out',
    keyFrame: `
      0% {
        transform: translateY(150px);
        opacity: 0;
      }
      20% {
        opacity: 1;
      }
      100% {
        transform: translateY(0);
      }
    `,
  },
  fadeInUp: {
    duration: '0.4s',
    delay: '0ms',
    timingFunction: 'ease-in-out',
    keyFrame: `
      0% {
        transform: translateY(50px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    `,
  },
};

export default animationConfig;
