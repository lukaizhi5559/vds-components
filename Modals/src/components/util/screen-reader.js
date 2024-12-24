//  Find DOM children and set aria-hidden to true
// to avoid talkback from annoucing elements outside the Modal Dialog
function OpenDialog() {
  const { body } = document;
  const siblings = body.children;
  const portal =
    typeof document !== 'undefined' ? document.getElementById('portal') : null;

  for (let i = 0; i < siblings.length; i++) {
    const sibling = siblings[i];

    if (
      sibling.setAttribute &&
      sibling !== portal &&
      sibling.tagName !== 'SCRIPT'
    ) {
      sibling.setAttribute(
        'data-old-aria-hidden',
        sibling.ariaHidden || 'null'
      );
      sibling.setAttribute('aria-hidden', 'true');
    }
  }
}

// Revert aria-hidden
function CloseDialog() {
  const { body } = document;
  const siblings = body.children;

  for (let i = 0; i < siblings.length; i++) {
    const sibling = siblings[i];

    if (sibling.setAttribute) {
      sibling.removeAttribute('data-old-aria-hidden');
      sibling.removeAttribute('aria-hidden');
      sibling.removeAttribute('inert');
    }
  }
}

export default {
  OpenDialog,
  CloseDialog,
};
