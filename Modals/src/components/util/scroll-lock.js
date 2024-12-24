// src/utils/scroll-lock.js
const $body = typeof document !== 'undefined' && document.querySelector('body');
let div = typeof document !== 'undefined' && document.createElement('div');
if (div) {
  div.style.overflowY = 'scroll';
  div.style.width = '50px';
  div.style.height = '50px';
  div.style.position = 'absolute';
  div.style.visibility = 'hidden';
}

export default {
  enable() {
    const bodyComputedStyle = getComputedStyle($body);
    $body.style.overflow = 'hidden';
    $body.style.width = `calc(100% - ${bodyComputedStyle.marginLeft} - ${bodyComputedStyle.marginRight})`;
    if (
      typeof window !== 'undefined' &&
      window.innerHeight < $body.clientHeight
    ) {
      $body && $body.append(div);
      $body.style.paddingRight = `${div.offsetWidth - div.clientWidth}px`;
      $body.style.boxSizing = 'border-box';
    }
  },
  disable() {
    $body.style.removeProperty('overflow');
    $body.style.removeProperty('width');
    $body.style.removeProperty('padding-right');
    $body.style.removeProperty('box-sizing');
    div.remove();
  },
};
