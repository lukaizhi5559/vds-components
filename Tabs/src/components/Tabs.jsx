import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  withVDSManager,
  calculateRem,
  generateUUID,
  getOS,
} from '@vds-core/utilities';
import UNSAFE_SetEnvRef from '@uie/set-env-ref';
import {
  onContentKeyDownUpHandler,
  onTabNavKeyDownHandler,
  getPhantomLinkPos,
  shiftAndTabPressed,
  setOuterLinkRef,
  handleLinkHover,
  handleLinkLeave,
} from '../util/AccessibilityHelpers';
import PhantomLink from '../util/PhantomLink';
import Animator from '../util/Animator';
import { resize, watchTabs, observeEntrance } from '../util/StickyTabHelper';
import { TextLinkCaret as CoreTextLinkCaret } from '@vds-core/buttons';
import { ColorTokens } from '@vds-tokens/color';
import { AccessibilityTokens } from '@vds-tokens/accessibility';
import { LayoutTokens } from '@vds-tokens/layout';

const _calculateLineColor = surface => {
  return surface === 'dark'
    ? ColorTokens.elements.lowcontrast.ondark.value
    : ColorTokens.elements.lowcontrast.onlight.value;
};

const propTypes = {
  /**
   * Content that will be rendered in the tabs wrapper.
   */
  children: PropTypes.node,
  /**
   * An optional callback that is called when the selectedIndex changes. Passes parameters (event, tabIndex).
   */
  onTabChange: PropTypes.func,
  /**
   * When true, Tabs will have border line. If false is passed then the border line won't be visible.
   */
  borderLine: PropTypes.bool,
  /**
   * The initial Selected Tab's index.
   */
  selectedIndex: PropTypes.number,
  /**
   * If set to 'scroll', Tabs can be overflow and scrollable. With 'none', tabs will not overflow and labels will be wrapped to multiple lines if the label text is long.
   * @note This prop impacts mobile viewports only.
   */
  overflow: PropTypes.oneOf(['scroll', 'none']),
  /**
   * Sets the Position of the Selected/Hover Border Accent for All Tabs.
   */
  indicatorPosition: PropTypes.oneOf(['bottom', 'top']),
  /**
   * When true, Tabs will be sticky to top of page, when orientation is vertical.
   */
  sticky: PropTypes.bool,
  /**
   * When true, Tabs will be sticky to top of page, when orientation is vertical.
   */
  indicatorFillTab: PropTypes.bool,
  /**
   * @ignore
   * Minimum Width for All Tabs, when orientation is horizontal.
   */
  minWidth: PropTypes.string,
  /**
   * @ignore
   * Size of Tabs.
   */
  size: PropTypes.oneOf(['medium', 'large']),
  /**
   * @ignore
   * Width of all Tabs when orientation is vertical, defaults to 25%.
   */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * @ignore
   * If fillContainer prop is passed, it will fill the Tabs to the width of the viewport and all Tabs will be in equal width when orientation is horizontal. This is recommended when there are no more than 2-3 tabs.
   */
  fillContainer: PropTypes.bool,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   */
  tabIndex: PropTypes.number,
  /**
   * @ignore
   */
  TextLinkCaret: PropTypes.func,
  /**
   * Allows a unique ID to be passed to the component.
   */
  id: PropTypes.string,
  /**
   * @ignore
   */
  surface: PropTypes.oneOf(['light', 'dark']),
  /**
   * @ignore
   */
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
  /**
   * Allows a string to be provided for analytics tagging.
   */
  'data-sitecat-level': PropTypes.string,
  /**
   * Allows a string to be provided for analytics tagging.
   */
  'data-sitecat-position': PropTypes.string,
  /**
   * Allows a string to be provided for analytics tagging.
   */
  'data-sitecat-datatrack': PropTypes.string,
  /**
   * Allows a string to be provided for analytics tagging.
   */
  'data-sitecat-cta': PropTypes.string,
  /**
   * @ignore
   * linePosition prop to maintain v1
   */
  linePosition: PropTypes.oneOf(['bottom', 'top', 'none']),
  /**
   * @ignore
   * Enable scrolling animation for tab content.
   */
  animated: PropTypes.bool,
  /**
   * @ignore
   * Pass a boolean value to start the animation on update.
   */
  startAnimation: PropTypes.bool,
};

const defaultProps = {
  onTabChange: undefined,
  borderLine: true,
  calculateLineColor: _calculateLineColor,
  selectedIndex: 0,
  indicatorPosition: 'bottom',
  indicatorFillTab: false,
  minWidth: '44px',
  size: 'medium',
  className: null,
  TextLinkCaret: CoreTextLinkCaret,
  orientation: 'horizontal',
  overflow: 'scroll',
  fillContainer: false,
  surface: 'light',
  animated: false,
  startAnimation: false,
};

const TabsWrapper = styled.div`
  display: flex;
  flex-direction: ${({ isDesktop, orientation }) =>
    isDesktop ? (orientation === 'horizontal' ? 'column' : 'row') : 'column'};
`;

const FlexColWrapper = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 1 auto;
`;

const FlexRowWrapper = styled.span`
  display: flex;
  flex-direction: ${({ orientation, isDesktop }) =>
    !isDesktop || orientation === 'horizontal' ? 'column' : 'row'};
  flex: 1 1 auto;
  width: 100%;
`;

const ScreenReaderText = styled.span`
  display: block;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
  outline: 0;

  &:focus:not(:hover) {
    &&:after {
      content: ' ';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      border: ${AccessibilityTokens.focusring.borderwidth.value} dashed
        ${({ surface }) =>
          surface !== 'dark'
            ? AccessibilityTokens.color.focusring.onlight.value
            : AccessibilityTokens.color.focusring.ondark.value};
    }
  }
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  flex-basis: ${({ orientation }) =>
    orientation === 'horizontal' ? 'auto' : '0px'};
  width: ${({ isDesktop }) => (isDesktop ? '100%' : 'auto')};
  height: fit-content;
  position: relative;

  &:focus:not(:hover):focus-visible {
    outline: ${AccessibilityTokens.focusring.borderwidth.value} dashed
      ${({ surface }) =>
        surface !== 'dark'
          ? AccessibilityTokens.color.focusring.onlight.value
          : AccessibilityTokens.color.focusring.ondark.value};
  }
  &:hover {
    outline: none;
    border: none;

    & ${ScreenReaderText} {
      opacity: 0;
    }
  }
`;

const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-left: ${({ borderLine, lineColor }) =>
    borderLine && `1px solid ${lineColor}`};
`;

const SideNavigation = styled.div`
  ${({ isDesktop, orientation, width }) =>
    isDesktop &&
    orientation !== 'horizontal' &&
    `
      min-width: ${width}; 
      width: ${width};
  `}
`;

const LinkWrapper = styled.div`
  margin-bottom: 24px;
  margin-top: 0;
  ${({ isDesktop, orientation }) =>
    isDesktop &&
    orientation === 'vertical' &&
    `
    margin-bottom: 0;
    margin-top: 32px;
  `};
  ${({ positionLink }) =>
    positionLink &&
    `
      position: absolute;
      top: ${positionLink + 32}px;
  `};
`;

const ChildWrapper = styled.div`
  width: 100%;
`;

const StickyWrapper = styled.div`
  ${({ sticky, stickToTop, stickToBottom, headerOffset, navWidth }) =>
    sticky &&
    (stickToBottom
      ? `
      position: fixed;
      bottom: 0;
      max-width: ${navWidth}px;
    `
      : stickToTop
      ? ` 
      position: relative;
    `
      : `
      position: sticky;
      top: ${headerOffset || 0};
      padding-top: ${calculateRem(LayoutTokens.space['4X'].value)};
    `)}
`;

const ChildrenContentWrapper = styled.div``;

const buildBorderStyle = props => {
  const { borderLine, indicatorPosition, lineColor, linePosition } = props; // Props from TabsComponent not Tabs itself

  // for v1:
  // linePosition is decoupled from indicatorPosition.
  // for v3: only use indicatorPosition to determine the position of the overall border
  if (linePosition !== undefined) {
    return (
      borderLine &&
      `box-shadow: 0px ${
        linePosition === 'top' ? '1px' : '-1px'
      } 0px 0px ${lineColor} inset;`
    );
  }

  if (!!indicatorPosition && !linePosition) {
    return (
      borderLine &&
      `box-shadow: 0px ${
        indicatorPosition === 'top' ? '1px' : '-1px'
      } 0px 0px ${lineColor} inset;`
    );
  }
};

const StyledTabList = styled.ul`
  display: flex;
  margin: 0;
  padding: ${({ indicatorPosition }) =>
    indicatorPosition === 'top'
      ? `${calculateRem(1)} 0 0 0`
      : `0 0 ${calculateRem(1)} 0`};
  list-style-type: none;
  ${({ isDesktop, overflow }) =>
    !isDesktop &&
    overflow === 'scroll' &&
    `
      overflow-x: scroll;
      overflow: visible;
      overflow-y: hidden;
    `};
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  ${props => buildBorderStyle(props)};
`;

export class Tabs extends Component {
  constructor(props) {
    super(props);

    this.observer = undefined;
    this.tabRef = undefined;
    this.resizeIsSelected = false;
    this.selectedIndex = this.props.selectedIndex;
    // We need a set of Unique Ids to match the Tabs with the Panels
    this.uniqueIds = {};
    this.childrenElements = this.ignoreFragments(this.props.children);
    this.linkRef = null;
    this.linkWrapper = null;
    this.tabWrapperRef = null;
    this.stickyWrapper = null;
    this.contentWrapperRef = undefined;
    this.tabPanelDescriptionRef = undefined;
    this.keyPressed = {};
    this.navElements = [];
    this.currentTabIndex = this.selectedIndex; //must be called in the accessibility to handle arrow keys nav
    this.outerLinkId = generateUUID();
    this._removeHidden(this.childrenElements).forEach((child, tabIndex) => {
      this.uniqueIds[tabIndex] = generateUUID().substr(-6);
      // Check for explicit setting of isSelected on a Tab
      if (child.props.selected) {
        this.selectedIndex = tabIndex;
      }
    });

    // if (this.childrenElements && React.Children) {
    //   React.Children.map(this.childrenElements, elem => {
    //     let selectedState = elem.props.selected;
    //     if (selectedState) this.overrideSelected = true;
    //   });
    // }

    this.state = {
      selectedTabIndex: this.overrideSelected ? undefined : this.selectedIndex,
      tabsChildren: this.childrenElements,
      uniqueIds: this.uniqueIds,
      stickToBottom: false,
      stickToTop: false,
      windowHeight: typeof window !== 'undefined' && window.innerHeight,
      navElements: [],
      outerLink: null, // link used above or below tab nav items
      phantomLinkSelected: false,
    };
  }
  isAndroid = getOS() === 'android';
  componentDidMount() {
    const { sticky } = this.props;
    const { windowHeight } = this.state;
    if (sticky && !this.resizeIsSelected) {
      // window.addEventListener('resize', e => resize(e, this));
      this.resizeIsSelected = true;
    }

    setTimeout(() => {
      if (this.contentWrapperRef && this.stickyWrapper && this.tabWrapperRef) {
        const tabsDiff = this.stickyWrapper.offsetHeight - windowHeight;
        const contentHeight = this.contentWrapperRef.offsetHeight;
        if (contentHeight - windowHeight > 0 && sticky && tabsDiff > 0) {
          observeEntrance(this.contentWrapperRef, tabsDiff, this);
        } else {
          if (this.tabObserver) this.tabObserver.disconnect();
          if (this.stickToTop || this.stickToBottom) {
            this.setState({
              stickToTop: false,
              stickToBottom: false,
            });
          }
        }
      }
    }, 35);
  }

  componentWillUnmount() {
    const { sticky } = this.props;
    if (sticky && this.resizeIsSelected) {
      // window.removeEventListener('resize', e => resize(e, this));
      this.resizeIsSelected = false;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { sticky, selectedIndex } = this.props;
    const { windowHeight } = this.state;
    const tabChanged = this._tabHasChanged(prevProps);

    if (sticky && !this.resizeIsSelected) {
      // window.addEventListener('resize', e => resize(e, this));
      this.resizeIsSelected = true;
    }

    if (this.state.stickToBottom)
      typeof window !== 'undefined' &&
        window.addEventListener('scroll', e => watchTabs(e, this));
    else
      typeof window !== 'undefined' &&
        window.removeEventListener('scroll', e => watchTabs(e, this));

    if (selectedIndex !== prevProps.selectedIndex) {
      let newIndex = selectedIndex;
      this.setState({ selectedTabIndex: newIndex });
    }

    if (tabChanged !== -1) this.setState({ selectedTabIndex: tabChanged });

    setTimeout(() => {
      if (this.contentWrapperRef && this.stickyWrapper && this.tabWrapperRef) {
        const contentHeight = this.contentWrapperRef.offsetHeight;
        const tabsDiff = this.stickyWrapper.offsetHeight - windowHeight;
        if (
          contentHeight - window &&
          windowHeight > 0 &&
          sticky &&
          tabsDiff > 0
        ) {
          observeEntrance(this.contentWrapperRef, tabsDiff, this);
        } else {
          if (this.tabObserver) this.tabObserver.disconnect();
          if (this.stickToTop || this.stickToBottom) {
            this.setState({
              stickToTop: false,
              stickToBottom: false,
            });
          }
        }
      }
    }, 35);

    prevState.tabsChildren.forEach((child, index) => {
      const tabsChildren = this.ignoreFragments(this.props.children);

      /* Handle for when a tab is removed of children do not exist*/
      if (!tabsChildren || !tabsChildren[index] || !tabsChildren[index].props) {
        return;
      }

      const currentPanelContent = tabsChildren[index].props.children;
      const currentPanelLabel = tabsChildren[index].props.label;

      // TODO: look into an optimization for tabsChildren being replaced individually
      if (prevProps.children !== this.props.children) {
        const updatedChildren = this.ignoreFragments(this.props.children);
        this.setState({ tabsChildren: updatedChildren });
      }
      if (child.props.hide !== tabsChildren[index].props.hide) {
        this.setState({ tabsChildren });
      }

      if (child.props.label !== currentPanelLabel) {
        this.setState({ tabsChildren });
      }

      if (child.props.children !== currentPanelContent) {
        this.setState({ tabsChildren });
      }
    });
  }

  _tabHasChanged = prevProps => {
    const extractSelected = child => child.props.selected;
    const prevArray = prevProps.children.map(extractSelected);
    const propArray = this.props.children.map(extractSelected);

    return propArray.findIndex(
      (value, index) => value !== prevArray[index] && !!value
    );
  };

  _isDesktopViewport = () => {
    const { viewport, orientation } = this.props;
    return (
      (/desktop/g.test(viewport) || viewport === 'tablet') &&
      orientation === 'vertical'
    );
  };

  ignoreFragments = childrenArray => {
    return childrenArray
      .filter(child => typeof child !== 'boolean')
      .map(child => {
        if (child.type === React.Fragment) {
          return child.props.children instanceof Array
            ? child.props.children[0]
            : child.props.children;
        } else {
          return child;
        }
      });
  };

  // This function finds the First Child (Tab) that is currently visible starting with the fromIndex
  getFirstVisibleChild(fromIndex = 0) {
    let firstVisibleChildIndex = -1;
    this.state.tabsChildren.forEach((child, index) => {
      if (
        index >= fromIndex &&
        firstVisibleChildIndex === -1 &&
        !child.props.hide
      ) {
        firstVisibleChildIndex = index;
      }
    });

    return firstVisibleChildIndex;
  }

  // Set the selected tab
  handleTabClick(selectedTabIndex, childFunction, e) {
    const { onTabChange } = this.props;
    e.persist();

    this.setState({ selectedTabIndex }, () => {
      if (typeof onTabChange !== 'undefined' && onTabChange) {
        onTabChange(e, selectedTabIndex);
      }

      if (childFunction) {
        childFunction(e, selectedTabIndex);
      }
    });
  }

  _mapChildrenForTabs = () => {
    const {
      viewport,
      orientation,
      surface,
      overflow,
      fillContainer,
    } = this.props;
    const { uniqueIds, selectedTabIndex } = this.state;
    const isDesktop = /desktop/g.test(viewport) || viewport === 'tablet';
    const children = this._removeHidden(this.props.children);
    return children.map((child, index) => {
      const {
        'data-analyticstrack': analyticsTrack,
        'data-track': track,
        'data-track-ignore': ignoreTrack,
        'data-clickstream': clickStream,
        onClick,
      } = child.props;

      // Check for Explicit override of uniqueId on this Tab
      if (typeof child.props.uniqueId !== 'undefined') {
        uniqueIds[index] = child.props.uniqueId;
      }
      let uniqueId = uniqueIds[index];
      let numberOfTabs = children.length;
      return React.cloneElement(child, {
        viewport: viewport,
        key: index + 1,
        orientation: orientation,
        index: index,
        selected: index === selectedTabIndex,
        onClick: evt => {
          this.handleTabClick(index, onClick, evt);
        },
        setRef: tab => (this.navElements[index] = tab),
        handleVisibilityChange: this._handleChildVisibilityChange,
        children: orientation === 'vertical' && children,
        hide: child.props.hide,
        indicatorFillTab: this.props.indicatorFillTab,
        indicatorPosition: this.props.indicatorPosition,
        minWidth: child.props.minWidth || this.props.minWidth,
        width: child.props.width,
        fillContainer: fillContainer,
        size: this.props.size,
        uniqueId,
        analyticsTrack: analyticsTrack,
        track: track,
        ignoreTrack: ignoreTrack,
        clickStream: clickStream,
        numberOfTabs: numberOfTabs,
        surface: surface,
        overflow: overflow,
        onBlur: () => (this.navElements[selectedTabIndex].tabIndex = 0),
      });
    });
  };

  _checkChildren = () => {
    const { children } = this.props;

    return children.map((child, index) => {
      return child;
    });
  };

  refProp = UNSAFE_SetEnvRef(); // use it to set either ref or innerRef prop

  _cloneAndAddProps = (children, viewport) => {
    if (!children) return null;
    const { surface } = this.props;
    if (
      children &&
      children.type &&
      children.type.displayName &&
      children.type.displayName.includes('TileNavigation')
    ) {
      return (
        <ChildrenContentWrapper>
          {React.cloneElement(children, {
            ...children.props[viewport],
            ...children.props,
            tabsChild: true,
          })}
        </ChildrenContentWrapper>
      );
    } else if (children && !children.type) {
      return children;
    }

    if (children.length > 1) {
      return children.map((child, index) => {
        return React.cloneElement(child, {
          surface: surface,
          color:
            surface === 'dark'
              ? ColorTokens.palette.white.value
              : ColorTokens.palette.black.value,
          ...child.props,
          key: index,
        });
      });
    } else {
      return React.cloneElement(children, {
        surface: surface,
        color:
          surface === 'dark'
            ? ColorTokens.palette.white.value
            : ColorTokens.palette.black.value,
        ...children.props[viewport],
        ...children.props,
      });
    }
  };
  _removeHidden = filteredChildren => {
    return filteredChildren.filter(child => !child.props.hide);
  };
  _determineTabWidth = width => {
    if (typeof width === 'number') {
      return calculateRem(width);
    } else if (typeof width === 'string') {
      return width;
    } else {
      return '25%';
    }
  };

  onKeyShiftTab = e => {
    const { uniqueIds, selectedTabIndex } = this.state;
    const { children } = this.props;
    if (
      (e.shiftKey && e.keyCode == 9) ||
      children[selectedTabIndex].props.tabPanelAriaLabel
    ) {
      typeof document !== 'undefined'
        ? (document.getElementById(
            `tabpanel-${uniqueIds[selectedTabIndex]}`
          ).tabIndex = -1)
        : null;
    } else {
      typeof document !== 'undefined'
        ? (document.getElementById(
            `tabpanel-${uniqueIds[selectedTabIndex]}`
          ).tabIndex = 0)
        : null;
    }
  };

  render() {
    const {
      viewport,
      ctaLink, // for VDS Marketing only
      animated,
      startAnimation,
      borderLine,
      indicatorPosition,
      calculateLineColor,
      orientation,
      overflow,
      headerOffset,
      sticky,
      TextLinkCaret,
      id,
      width,
      surface,
      linePosition,
    } = this.props;
    const children = this._removeHidden(this.props.children);
    const {
      selectedTabIndex,
      stickToBottom,
      stickToTop,
      uniqueIds,
    } = this.state;
    const isDesktop = /desktop/g.test(viewport) || viewport === 'tablet';
    const TabsComponent =
      orientation === 'horizontal' || !isDesktop
        ? StyledTabList
        : TabsContainer;
    const selectedTabLabel = !!children[selectedTabIndex].props
      ? children[selectedTabIndex].props.label
      : null;
    const selectedTabPanelAriaLabel = !!children[selectedTabIndex].props
      ? children[selectedTabIndex].props.tabPanelAriaLabel // tabPanelAriaLabel prop is used to specify each tab's ariaLabel
      : undefined;

    const TextLink = ({
      viewport,
      ctaLink,
      orientation,
      positionLink,
      onKeyDown,
    }) => {
      return (
        <LinkWrapper
          positionLink={positionLink}
          viewport={viewport}
          isDesktop={isDesktop}
          orientation={orientation}
          {...{ [this.refProp]: elem => (this.linkWrapper = elem) }}
        >
          <TextLinkCaret
            id={this.outerLinkId}
            onKeyDown={onKeyDown}
            {...{ [this.refProp]: elem => (this.outerLink = elem) }}
            {...ctaLink}
            surface={surface}
          />
        </LinkWrapper>
      );
    };

    return (
      <TabsWrapper
        isDesktop={isDesktop}
        orientation={orientation}
        id={id}
        {...{ [this.refProp]: elem => (this.tabRef = elem) }}
      >
        {this._checkChildren() ? (
          <FlexColWrapper>
            {/* TABS WRAPPER */}
            <FlexRowWrapper
              onKeyDown={this.onKeyShiftTab}
              isDesktop={isDesktop}
              orientation={orientation}
            >
              <SideNavigation
                {...{ [this.refProp]: elem => (this.tabWrapperRef = elem) }}
                isDesktop={isDesktop}
                onKeyDown={e => onTabNavKeyDownHandler(e, this)}
                onKeyUp={e => shiftAndTabPressed(e, this, null, null, false)}
                orientation={orientation}
                width={this._determineTabWidth(width, orientation)}
              >
                <StickyWrapper
                  {...{ [this.refProp]: elem => (this.stickyWrapper = elem) }}
                  sticky={orientation === 'vertical' && isDesktop && sticky}
                  stickToBottom={stickToBottom}
                  stickToTop={stickToTop}
                  navWidth={
                    this.tabWrapperRef && this.tabWrapperRef.offsetWidth
                  }
                  headerOffset={headerOffset}
                >
                  <div>
                    {ctaLink &&
                      ctaLink !== {} &&
                      (!isDesktop || orientation === 'horizontal') && (
                        <TextLink
                          viewport={viewport}
                          isDesktop={isDesktop}
                          ctaLink={ctaLink}
                          orientation={orientation}
                          TextLinkCaret={TextLinkCaret}
                        />
                      )}
                    <TabsComponent
                      viewport={viewport}
                      selectedIndex={selectedTabIndex}
                      selectedTabIndex={selectedTabIndex}
                      borderLine={borderLine}
                      indicatorPosition={indicatorPosition}
                      lineColor={calculateLineColor(surface)}
                      isDesktop={isDesktop}
                      overflow={overflow}
                      role="tablist"
                      surface={surface}
                      linePosition={linePosition}
                    >
                      {this._mapChildrenForTabs()}
                    </TabsComponent>
                    {ctaLink &&
                      ctaLink !== {} &&
                      (isDesktop && orientation !== 'horizontal') && (
                        <TextLink
                          isDesktop={isDesktop}
                          ctaLink={ctaLink}
                          orientation={orientation}
                        />
                      )}
                  </div>
                </StickyWrapper>
              </SideNavigation>
              {/* CONTENT WRAPPER */}
              <ContentWrapper
                {...{ [this.refProp]: elem => (this.contentWrapperRef = elem) }}
                isDesktop={isDesktop}
                onKeyDown={e => onContentKeyDownUpHandler(e, this)}
                onKeyUp={e => onContentKeyDownUpHandler(e, this)}
                role="tabpanel"
                surface={surface}
                orientation={orientation}
                id={`tabpanel-${uniqueIds[selectedTabIndex]}`}
                tabIndex={0}
                aria-label={
                  this.isAndroid
                    ? `${selectedTabLabel && selectedTabLabel} 
                                    tab selected ${selectedTabIndex + 1} of ${
                        this._removeHidden(this.props.children).length
                      } 
                                    ${
                                      selectedTabPanelAriaLabel
                                        ? selectedTabPanelAriaLabel
                                        : ''
                                    }`
                    : undefined
                }
              >
                {Array.isArray(children) &&
                  children.map((child, index) => {
                    const { children, viewport } = child.props;
                    if (children && index === selectedTabIndex) {
                      return (
                        <ChildWrapper
                          key={index}
                          tabIndex={this.isAndroid && 0}
                        >
                          <Animator
                            name="fadeInUp"
                            animated={animated}
                            startAnimation={startAnimation}
                          >
                            {!this.isAndroid && (
                              <ScreenReaderText
                                {...{
                                  [this.refProp]: elem =>
                                    (this.tabPanelDescriptionRef = selectedTabPanelAriaLabel
                                      ? elem
                                      : undefined),
                                }}
                                tabIndex={
                                  selectedTabPanelAriaLabel ? 0 : undefined
                                }
                              >
                                {`${selectedTabLabel &&
                                  selectedTabLabel} tab selected ${selectedTabIndex +
                                  1} of ${
                                  this._removeHidden(this.props.children).length
                                } ${
                                  selectedTabPanelAriaLabel
                                    ? selectedTabPanelAriaLabel
                                    : ''
                                } `}
                              </ScreenReaderText>
                            )}
                            {this._cloneAndAddProps(children, viewport)}
                          </Animator>
                        </ChildWrapper>
                      );
                    }
                  })}
                {!sticky &&
                  ctaLink &&
                  (isDesktop || orientation === 'vertical') && (
                    <PhantomLink
                      ctaLink={ctaLink}
                      onMouseEnter={() => handleLinkHover(this.linkWrapper)}
                      onMouseLeave={() => handleLinkLeave(this.linkWrapper)}
                      isSelected={this.state.phantomLinkSelected}
                      orientation={orientation}
                      isDesktop={this._isDesktopViewport()}
                      getPosition={() =>
                        getPhantomLinkPos(this.outerLink, this.tabWrapperRef)
                      }
                      TextLinkCaret={TextLinkCaret}
                    />
                  )}
              </ContentWrapper>
            </FlexRowWrapper>
          </FlexColWrapper>
        ) : (
          ''
        )}
      </TabsWrapper>
    );
  }
}

Tabs.defaultProps = defaultProps;
Tabs.propTypes = propTypes;

export default withVDSManager(Tabs);
