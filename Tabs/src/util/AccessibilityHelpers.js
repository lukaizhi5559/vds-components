const keyCodeMap = new Map([
  [9, 'tab'],
  [37, 'left'],
  [38, 'up'],
  [39, 'right'],
  [40, 'down'],
  [13, 'enter'],
  [16, 'shift'],
  [32, 'space'],
  [35, 'end'],
  [36, 'home'],
]);

const arrowMap = {
  up: 'up',
  left: 'up',
  right: 'down',
  down: 'down',
};

function getKeyName(keyCode) {
  return keyCode && keyCodeMap.get(keyCode);
}

function getArrowPressed(keyPressed, isDesktop) {
  const isArrow = isDesktop
    ? /up|down|left|right/gi.test(keyPressed)
    : /left|right/gi.test(keyPressed);

  if (!isArrow) return false;

  return arrowMap[keyPressed];
}

function _getNextTabIndex(arrow, elements, index, e) {
  const elementsLength = elements && elements.length;
  let newIndex = index;

  if (!elementsLength) return null;
  e.preventDefault();
  if (arrow === 'end' || (e && e.shiftKey && arrow === 'down')) {
    newIndex = elementsLength - 1;
  } else if (arrow === 'home' || (e && e.shiftKey && arrow === 'up')) {
    newIndex = 0;
  } else if (arrow === 'down' || arrow === 'right') {
    newIndex++;
  } else if (arrow === 'up' || arrow === 'left') {
    newIndex = newIndex === 0 ? elementsLength - 1 : newIndex - 1;
  }
  newIndex = newIndex % elementsLength; //avoid overflow;

  return newIndex;
}

/**
 * @desc Focus on the down, up or current Nav Tab Item.
 * @param {String} keyPressed value either "down" or "up".
 * @param {Object} data with the following props
 * {
 *    focusActiveTab: Boolean,
 *    accessibilityItems: Object,
 *    selectedTabIndex: number,
 *    currentTabIndex: number
 * }
 */
function focusTabItem(keyPressed, data, e) {
  const {
    focusActiveTab,
    navElements,
    selectedTabIndex,
    currentTabIndex,
  } = data;
  let tabIndex = selectedTabIndex;

  if (!(navElements && navElements.length)) return;

  // focusActiveTab
  // if set to true, it will focus the tab selected tab item
  // otherwise it will get the next tab item that needs to be focused
  if (!focusActiveTab) {
    tabIndex = _getNextTabIndex(keyPressed, navElements, currentTabIndex, e);
  } else if (keyPressed === 'home' || keyPressed === 'end') {
    tabIndex = _getNextTabIndex(keyPressed, navElements, currentTabIndex, e);
  }

  navElements && navElements[tabIndex] && navElements[tabIndex].focus();

  return tabIndex;
}

function calculatePhantomLinkPosition(linkElement, sideNavElement) {
  const singleLinkPos = linkElement && linkElement.getBoundingClientRect();
  const sideNavChild = sideNavElement && sideNavElement.firstChild;
  const sideNavPos = sideNavChild && sideNavChild.getBoundingClientRect();

  if (linkElement && sideNavElement) {
    return {
      left: singleLinkPos.left,
      top: sideNavPos.height,
    };
  }

  return null;
}

// focus content element
function focusContent(e, tabs) {
  tabs.currentTabIndex = tabs.state.selectedTabIndex;
  const contentWrapper = tabs.contentWrapperRef;
  if (contentWrapper) {
    e && e.stopPropagation();
    contentWrapper.tabIndex = 0;
    setTimeout(() => {
      contentWrapper.focus();
      return;
    }, 100);
  }
}

// builds the data that is needed to focus a Tab item
function getFocusData(focusActiveTab, tabs) {
  return {
    navElements: tabs.navElements,
    selectedTabIndex: tabs.state.selectedTabIndex,
    focusActiveTab: focusActiveTab,
    currentTabIndex: tabs.currentTabIndex,
  };
}

// checks if a tab item is focused
const hasTabAFocusElement = navElements => {
  return !!(
    navElements &&
    navElements.length &&
    navElements.filter(
      elem => typeof document !== 'undefined' && document.activeElement === elem
    ).length
  );
};

/**
 * @return  true if Shift+tab was pressed, otherwise false
 *
 * @param {Event} e event
 * @param {String} keypressed keyname or key code
 * @param {Callback object} callback function object
 * @param {Boolean} propagateEvent
 *
 * @description "callback called on keydown and keyup events, that checks if Shift+tab was pressed and runs a callback if it  was passed"
 */
const shiftAndTabPressed = (e, tabs, keypressed, callback, propagateEvent) => {
  const _keyPressed = keypressed || getKeyName(e.keyCode) || e.keyCode;
  tabs.keyPressed[_keyPressed] = e.type === 'keydown';
  let shiftAndTab = false;

  // getModifierState for checking if shift was already pressed before the event occurrend.
  // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState
  const shiftActive =
    tabs.keyPressed['shift'] || (e && e.getModifierState('Shift'));

  if (
    !shiftActive &&
    typeof document !== 'undefined' &&
    tabs.outerLink === document.activeElement
  )
    return shiftAndTab;

  if (tabs.keyPressed['tab'] && shiftActive) {
    if (!propagateEvent) {
      e && e.preventDefault();
      e && e.stopPropagation();
    }
    if (callback) callback(e, tabs);

    shiftAndTab = true;
  }

  return shiftAndTab;
};

// callback passed when shift+tab is pressed when content is on focus.
const contentShiftAndTabCB = (e, tabs) => {
  const focusData = getFocusData(true, tabs);
  const shiftActive = e && e.getModifierState('Shift');
  const contentFocus =
    typeof document !== 'undefined' &&
    tabs.contentWrapperRef === document.activeElement;

  if (contentFocus && shiftActive) {
    e && e.preventDefault();
    e && e.stopPropagation();
    focusTabItem(null, focusData, e);
  }
};

// callback passed when shift+tab is pressed on a horizontal tab item
const horizontalShiftAndTabCB = (e, tabs) => {
  const hasTabAFocusItem = hasTabAFocusElement(tabs.navElements);
  // if viewAll is focused, let browser handle Shift+tab
  const isOuterLinkFocus =
    tabs.outerLink &&
    typeof document !== 'undefined' &&
    tabs.outerLink === document.activeElement;

  if (isOuterLinkFocus || (hasTabAFocusItem && !tabs.outerLink)) {
    tabs.keyPressed = {};
    tabs.currentTabIndex = tabs.state.selectedTabIndex;
    return;
  }

  if (hasTabAFocusItem && tabs.outerLink) {
    e && e.preventDefault();
    e && e.stopPropagation();
    tabs.outerLink.focus();
  }
};

// callback passed when shift+tab is pressed on a vertical tab item
const verticalShiftAndTabCB = (event, tabs) => {
  const focusData = getFocusData(true, tabs);
  const hasTabAFocusItem = hasTabAFocusElement(tabs.navElements);

  if (hasTabAFocusItem) {
    tabs.keyPressed = {};
    tabs.currentTabIndex = tabs.state.selectedTabIndex;
    return;
  }

  event && event.preventDefault();
  event && event.stopPropagation();

  if (
    typeof document !== 'undefined' &&
    tabs.outerLink === document.activeElement
  )
    focusTabItem(null, focusData, event);
};

function traverseHorizontalTab(event, keyPressed, tabs) {
  const focusData = getFocusData(true, tabs);
  if (keyPressed === 'tab') {
    if (typeof document !== 'undefined') {
      tabs.currentTabIndex = tabs.state.selectedTabIndex;
      focusTabItem(keyPressed, focusData, event);
      return;
    }
  } else if (keyPressed === 'end' || keyPressed === 'home') {
    focusTabItem(keyPressed, focusData, event);
    return;
  }
}

function traverseVerticalTab(event, keyPressed, tabs) {
  const selectedTab = tabs.navElements[tabs.state.selectedTabIndex];
  const tabItem = tabs.navElements[tabs.currentTabIndex];
  const shouldFocusContent = tabs.outerLink
    ? [selectedTab, tabs.outerLink].includes(document.activeElement)
    : tabItem === document.activeElement;
  const setPhantomLinkState = phantomLinkActive => {
    tabs.setState({
      phantomLinkActive,
    });
  };

  if (keyPressed === 'tab') {
    event && event.preventDefault();

    if (shouldFocusContent) {
      // set phantomLink state if outerLink is present.
      if (tabs.outerLink) {
        const activatePhantomLink =
          (event.target && event.target.innerHTML) !==
          (tabs.outerLink && tabs.outerLink.innerHTML);

        setPhantomLinkState(activatePhantomLink);
      }
      focusContent(event, tabs);
    } else if (tabs.outerLink) {
      tabs.outerLink.focus();
      tabs.currentTabIndex = tabs.state.selectedTabIndex;
    }
  } else if (keyPressed === 'end' || keyPressed === 'home') {
    const focusData = getFocusData(true, tabs);
    focusTabItem(keyPressed, focusData, event);
    return;
  }
}

/**
 * @desc checks arrows keys pressed to navigate the nav tab items, and also checks if tab key is pressed to focus on content.
 * @return undefined
 * @param {Object} e event object passed to function
 */
const onTabNavKeyDownHandler = (e, tabs) => {
  const isDesktop = tabs._isDesktopViewport();
  const keyPressed = getKeyName(e.keyCode);
  const arrow = getArrowPressed(keyPressed, isDesktop);
  const focusData = getFocusData(false, tabs);
  const isShiftAndTabPressed = shiftAndTabPressed(
    e,
    tabs,
    keyPressed,
    isDesktop ? verticalShiftAndTabCB : horizontalShiftAndTabCB,
    true
  );

  // shift+tab needs to be pressed and released so that shift is not trapped.
  // for convinience find a way to tab back while shift key is kept pressed.
  if (isShiftAndTabPressed) return;

  if (isDesktop) {
    traverseVerticalTab(e, keyPressed, tabs);
  } else {
    traverseHorizontalTab(e, keyPressed, tabs);
  }

  if (
    arrow &&
    typeof document !== 'undefined' &&
    tabs.outerLink !== document.activeElement
  ) {
    e.preventDefault();
    tabs.currentTabIndex = focusTabItem(arrow, focusData, e);
  }

  if (e.keyCode === 13 || e.keyCode === 32) {
    setTimeout(() => {
      if (tabs.tabPanelDescriptionRef) {
        tabs.tabPanelDescriptionRef.focus();
      } else {
        tabs.contentWrapperRef.focus();
      }
      return;
    }, 100);
  }

  return;
};

/**
 * @desc Checks if shift + tab is pressed at the same time and goes back to the selected nav tab item.
 * @return undefined value or nothing;
 * @param {Object} e event object
 */
const onContentKeyDownUpHandler = (e, tabs) => {
  shiftAndTabPressed(e, tabs, null, () => contentShiftAndTabCB(e, tabs), true);
};

const getPhantomLinkPos = (outerLink, tabWrapperRef) => {
  return calculatePhantomLinkPosition(outerLink, tabWrapperRef);
};

const setOuterLinkRef = (ref, tabs) => {
  tabs.outerLink = ref;
};

const handleLinkHover = linkWrapper => {
  if (linkWrapper && linkWrapper.style) linkWrapper.style.opacity = '0';
};

const handleLinkLeave = linkWrapper => {
  setTimeout(() => {
    if (linkWrapper && linkWrapper.style) linkWrapper.style.opacity = '1';
  }, 350);
};

export {
  onContentKeyDownUpHandler,
  onTabNavKeyDownHandler,
  shiftAndTabPressed,
  getPhantomLinkPos,
  setOuterLinkRef,
  handleLinkHover,
  handleLinkLeave,
};
