import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { calculateRem, hexToRgba } from '@vds-core/utilities';
import { Fonts } from '@vds-core/typography';
import { TextLink } from '@vds-core/buttons';
import { AccessibilityTokens } from '@vds-tokens/accessibility';
import { ColorTokens } from '@vds-tokens/color';
import { LayoutTokens } from '@vds-tokens/layout';
import { TypographyTokens } from '@vds-tokens/typography';
import UNSAFE_SetEnvRef from '@uie/set-env-ref';
import { ButtonIcon } from '@vds-core/button-icons';
import DownCaret from '@vds-core/icons/down-caret';
import { getNodeText } from '@vds-core/utilities';

const PADDING_DEFAULT_MOBILE = LayoutTokens.space['6X'].value; // 24px
const PADDING_DEFAULT_NON_MOBILE = LayoutTokens.space['8X'].value; // 32px

const _calcTextPaddingRight = (
  viewport,
  alwaysOpen,
  triggerType,
  triggerLinkWidth
) => {
  const isMobile = viewport === 'mobile';

  if (alwaysOpen) {
    return 0;
  } else {
    if (triggerType === 'icon') {
      return isMobile
        ? calculateRem(32) // 8px padding plus width of icon 24px
        : calculateRem(40); // 12px padding plus width of icon 28px
    }
    return isMobile
      ? calculateRem(triggerLinkWidth)
      : calculateRem(triggerLinkWidth);
  }
};

const _getCustomTitleSize = (viewport, customChildrenTypography) => {
  const isMobile = viewport === 'mobile';

  if (customChildrenTypography) {
    return TypographyTokens.fontsize.body[16].value;
  }
  return isMobile
    ? TypographyTokens.fontsize.title[16].value
    : TypographyTokens.fontsize.title[20].value;
};

const _getCustomTitleLetterSpacing = (viewport, customChildrenTypography) => {
  if (customChildrenTypography) {
    return TypographyTokens.letterspacing.wide.value;
  }
};

const _getCustomTitleLineHeight = (viewport, customChildrenTypography) => {
  const isMobile = viewport === 'mobile';

  if (customChildrenTypography) {
    return TypographyTokens.lineheight.body[20].value;
  }
  return isMobile
    ? TypographyTokens.lineheight.title[20].value
    : TypographyTokens.lineheight.title[24].value;
};

const _calcTextLinkSize = viewport => {
  const isMobile = viewport === 'mobile';

  return isMobile ? 'small' : 'large';
};

const _calcPaddingTop = viewport => {
  const isMobile = viewport === 'mobile';

  return isMobile ? PADDING_DEFAULT_MOBILE : PADDING_DEFAULT_NON_MOBILE;
};

const _calcPaddingBottom = (viewport, opened) => {
  const isMobile = viewport === 'mobile';

  if (opened) {
    return isMobile
      ? LayoutTokens.space['4X'].value // 12px
      : LayoutTokens.space['6X'].value; // 16px
  }
  return isMobile ? PADDING_DEFAULT_MOBILE : PADDING_DEFAULT_NON_MOBILE;
};

const _calcTextLinkColor = (surface, hovered, clicked) => {
  const backgroundMode = surface === 'dark' ? 'ondark' : 'onlight';
  return clicked
    ? ColorTokens.interactive.active[backgroundMode].value
    : ColorTokens.elements.primary[backgroundMode].value;
};

const _calcTextLinkBorder = (surface, hovered, clicked) => {
  const backgroundMode = surface === 'dark' ? 'ondark' : 'onlight';
  return clicked
    ? `${calculateRem(2)} solid ${
        ColorTokens.interactive.active[backgroundMode].value
      }`
    : hovered
    ? `${calculateRem(2)} solid ${
        ColorTokens.elements.primary[backgroundMode].value
      }`
    : `${calculateRem(1)} solid ${
        ColorTokens.elements.primary[backgroundMode].value
      }`;
};

const propTypes = {
  /**
   * When true, the header will take on the properties of an opened drawer.
   * @ignore
   */
  opened: PropTypes.bool,
  /**
   * Components to render inside of the AccordionHeader. Can be any node but it is recommended to use provided components AccordionTitle and AccordionSubTitle.
   */
  children: PropTypes.node.isRequired,
  /**
   * If provided, this function will be called if this AccordionHeader is clicked. This will return (event, opened state of the accordion item).
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  onTrigger: PropTypes.func,
  /**
   * @ignore
   */
  groupIndex: PropTypes.number,
  /**
   * @ignore
   */
  groupId: PropTypes.string,
  /**
   * @ignore
   */
  sticky: PropTypes.bool,
  /**
   * @ignore
   */
  style: PropTypes.object, // <- Used for react-sticky
  /**
   * @ignore
   */
  testMode: PropTypes.bool,
  /**
   *	Header action item will be set either an icon or link based on string passed.
   */
  triggerType: PropTypes.oneOf(['icon', 'link']),
  /**
   * If provided, will render the label for text link trigger in the closed state
   */
  openAccordionTriggerLabel: PropTypes.string,
  /**
   * If provided, will render the label for text link trigger in the opened state
   */
  closeAccordionTriggerLabel: PropTypes.string,
  /**
   * @ignore
   * When true, the drawer will remain opened and not be able to close.
   * Prop will be passed from AccordionItem
   */
  alwaysOpen: PropTypes.bool,
  /**
   * Set the styling of the component to the desktop, tablet, or mobile size based on passed prop. Desktop and tablet are the same size.
   */
  viewport: PropTypes.oneOf(['desktop', 'mobile', 'tablet']),
  /**
   * Passes a new primitive to the AccordionHeader Component
   */
  primitive: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div']),
  /**
   * Aria label used for accordion header.
   */
  ariaLabel: PropTypes.string,
  /**
   * @ignore
   * Optional TextLink component for 1.0. Defaults to TextLink 3.0
   */
  TextLinkComponent: PropTypes.func,
  /**
   * @ignore
   * Small for 1.0
   * Defaults to small mobile and large desktop for 3.0
   */
  calcTextLinkSize: PropTypes.func,
  /**
   * @ignore
   * focusRing border. Defaults to true for 3.0
   */
  focusRingBorderRadius: PropTypes.bool,
  /**
   * @ignore
   * When passing in children in children wrapper, will default to Title configs for 3.0
   */
  customChildrenTypography: PropTypes.bool,
  /**
   * @ignore
   * If passes in custom child in header, bold will turn the custom child passed in bold
   */
  bold: PropTypes.bool,
  /**
   * @ignore
   * If enabled, don't render border-top used for 1.0
   */
  topLine: PropTypes.bool,
  /**
   * @ignore
   * Function to render padding top 8px for 1.0.
   * Else 32px for desktop/tablet and 24px for mobile
   */
  calcPaddingTop: PropTypes.func,
  /**
   * @ignore
   * Function to render padding bottom
   */
  calcPaddingBottom: PropTypes.func,
  /**
   * @ignore
   * If enabled, will render 60px padding right for ChildrenWrapper.
   */
  calcTextPaddingRight: PropTypes.func,
  /**
   * @ignore
   * If enabled, render top position of toggle icon wrapper to 8.
   * Defaults to 24 (mobile) and 32 (desktop/tablet) for 3.0
   */
  calcToggleIconPositionHover: PropTypes.func,
  /**
   * @ignore
   * if provided, toggle icon transition time is 350ms for 1.0. Defaults to 330ms for 3.0
   */
  toggleIconTransitionTime: PropTypes.string,
  /**
   * @ignore
   */
  fixedTextLinkLabel: PropTypes.bool,
  /**
   * @ignore
   * Function to calculate textLink color.
   */
  calcTextLinkColor: PropTypes.func,
  /**
   * @ignore
   * Function to calculate textLink bottom border.
   */
  calcTextLinkBorder: PropTypes.func,
  /**
   * @ignore
   */
  surface: PropTypes.oneOf(['light', 'dark']),
  /**
   * @ignore
   */
  analyticsTrack: PropTypes.string,
  /**
   * @ignore
   */
  track: PropTypes.string,
  /**
   * @ignore
   */
  trackIgnore: PropTypes.string,
  /**
   * @ignore
   */
  clickStream: PropTypes.string,
  /**
   * @ignore
   */
  cta: PropTypes.string,
  /**
   * @ignore
   */
  level: PropTypes.string,
  /**
   * @ignore
   */
  position: PropTypes.string,
  /**
   * @ignore
   */
  dataTrack: PropTypes.string,
  /**
   * Config object for AccordionHeader trigger
   */
  trigger: PropTypes.shape({
    type: PropTypes.oneOf(['icon', 'link']),
    openLabel: PropTypes.string,
    closeLabel: PropTypes.string,
    id: PropTypes.string,
    ariaLabel: PropTypes.string,
    onClick: PropTypes.func,
  }),
  /**
   * @ignore
   * Used to render custom trigger icon for 1.x
   */
  renderTriggerIcon: PropTypes.func,
};

const defaultProps = {
  opened: false,
  onClick: null,
  onTrigger: () => {},
  groupIndex: 1,
  groupId: null,
  surface: 'light',
  sticky: false,
  style: {},
  testMode: false,
  triggerType: 'icon',
  alwaysOpen: false,
  viewport: 'desktop',
  //1.0
  primitive: 'div',
  ariaLabel: undefined,
  //3.0
  TextLinkComponent: TextLink,
  focusRingBorderRadius: true,
  primaryColor: false,
  bold: false,
  topLine: true,
  toggleIconPositionSmall: false,
  toggleIconTransitionTime: '330ms',
  closeAccordionTriggerLabel: 'Cancel',
  openAccordionTriggerLabel: 'Change',
  fixedTextLinkLabel: false,
  calcPaddingTop: _calcPaddingTop,
  calcPaddingBottom: _calcPaddingBottom,
  calcTextLinkSize: _calcTextLinkSize,
  calcTextPaddingRight: _calcTextPaddingRight,
  calcTextLinkColor: _calcTextLinkColor,
  calcTextLinkBorder: _calcTextLinkBorder,
};

const TriggerLinkWrapper = styled.div`
  ${({ triggerType, viewport, fixedTextLinkLabel }) =>
    triggerType === 'link' &&
    !fixedTextLinkLabel &&
    `
  max-width: ${viewport === 'mobile' ? '50%' : '25%'};
  position: absolute;
  right: 3px; // To avoid cut off
  top:  ${calculateRem(32)};
  span:last-child {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: text-top;
  }
  `}
  > * {
    outline: none;
  }
  padding-left: ${calculateRem(16)};
`;

const TriggerIconWrapper = styled.span`
  display: inline-block;
  flex: 1;
  position: absolute;
  right: 0;
  > * {
    outline: none;
  }
  transition: ${({ toggleIconTransitionTime }) =>
    `top ${toggleIconTransitionTime} cubic-bezier(0.22, 0.61, 0.36, 1);`};
  height: auto;
  top: ${({ triggerPosition }) => triggerPosition};

  ${({ opened, triggerType, toggleIconTransitionTime }) =>
    triggerType === 'icon' &&
    `
  justify-content: ${opened ? 'flex-start' : 'flex-end'};
  transform: rotate(${opened ? `-180deg` : `0deg`});
  transition: transform ${toggleIconTransitionTime} cubic-bezier(0.22, 0.61, 0.36, 1), top ${toggleIconTransitionTime} cubic-bezier(0.22,0.61,0.36,1); 
`};
  &:focus {
    outline: none;
  }
  svg {
    overflow: visible; //safari cuts off the border if overflow is not visible
  }
`;

const OuterElementWrapper = styled.div`
  outline: none;
  position: relative;
`;

const InnerElementWrapper = styled.div`
  text-align: left;
  margin-bottom: 0;
  padding: 0;
  background: none;
  border: 0;
  overflow: visible;
  padding-right: ${({ paddingRight }) => paddingRight};
  ${({ paddingTop, paddingBottom }) =>
    `
  padding-top:  ${paddingTop};
  padding-bottom: ${paddingBottom};
  transition: padding-bottom 350ms ease;
  `};
  color: ${({ surface }) =>
    surface === 'dark'
      ? ColorTokens.elements.primary.ondark.value
      : ColorTokens.elements.primary.onlight.value};
  cursor: ${({ alwaysOpen }) => (alwaysOpen ? 'default' : 'pointer')};
  word-wrap: break-word;
  overflow-wrap: break-word;
  font-family: ${Fonts.VerizonNHGeDS};
  ${({ viewport, customChildrenTypography }) => css`
    font-size: ${_getCustomTitleSize(viewport, customChildrenTypography)};
    letter-spacing: ${_getCustomTitleLetterSpacing(
      viewport,
      customChildrenTypography
    )};
    min-height: ${_getCustomTitleLineHeight(
      viewport,
      customChildrenTypography
    )};
    line-height: ${_getCustomTitleLineHeight(
      viewport,
      customChildrenTypography
    )};
  `};
  font-weight: ${({ bold }) =>
    bold
      ? TypographyTokens.fontweight.bold.value
      : TypographyTokens.fontweight.regular.value};
  &:active,
  &:hover,
  &:focus {
    outline: none;
  }
`;

const StyledAccordionButton = styled.button`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border: none;
  background: none;
  padding: 0;
  box-sizing: border-box;
  outline: none;
  overflow: visible;
  pointer-events: auto;
  color: ${({ surface }) =>
    surface === 'dark'
      ? ColorTokens.elements.primary.ondark.value
      : ColorTokens.elements.primary.onlight.value};
  cursor: ${({ alwaysOpen }) => (alwaysOpen ? 'default' : 'pointer')};
  word-wrap: break-word;
  overflow-wrap: break-word;
  font-family: ${Fonts.VerizonNHGeDS};
  ${({ viewport, customChildrenTypography }) => css`
    font-size: ${_getCustomTitleSize(viewport, customChildrenTypography)};
    letter-spacing: ${_getCustomTitleLetterSpacing(
      viewport,
      customChildrenTypography
    )};
    min-height: ${_getCustomTitleLineHeight(
      viewport,
      customChildrenTypography
    )};
    line-height: ${_getCustomTitleLineHeight(
      viewport,
      customChildrenTypography
    )};
  `};
  font-weight: ${({ bold }) =>
    bold
      ? TypographyTokens.fontweight.bold.value
      : TypographyTokens.fontweight.regular.value};
  &:active,
  &:hover,
  &:focus {
    outline: none;
  }
  &:active,
  &:hover,
  &:focus {
    outline: none;
  }

  ${({ surface, focusRingBorderRadius, triggerType }) =>
    `
    &::-moz-focus-inner, 
    ::-moz-focus-inner {
      border: 0;
    }
    ${
      triggerType === 'icon'
        ? `
    &:hover {
      .toggleIconWrapper > div {
        border-color: transparent !important;
      }
      .toggleIconWrapper a {
        outline: none;
        box-shadow: 0 0 0 0.0625rem ${hexToRgba(
          ColorTokens.palette.gray44.value,
          surface == 'dark' ? 0.26 : 0.06
        )};
        background-color: ${hexToRgba(
          ColorTokens.palette.gray44.value,
          surface == 'dark' ? 0.26 : 0.06
        )};
      }
    }
    &:active {
      .toggleIconWrapper > div {
        border-color: transparent !important;
      }
      .toggleIconWrapper a {
        svg {
          path, polygon {
            fill: ${ColorTokens.interactive.active[`on${surface}`].value};
          }
        }
      }
    }
    `
        : `
    &:hover {
      .toggleIconWrapper > div {
        border-color: transparent !important;
      }
    }
    &:active {
      .toggleIconWrapper > div {
        border-color: transparent !important;
      }
    }
    `
    }
    &:focus {
      outline: none;
      &:not(:hover) {
        ${
          triggerType === 'link'
            ? `
        a {
            &:after {
              content: "";
              position: absolute;
              top: ${calculateRem(-3)};
              bottom: ${calculateRem(-4)};
              right: ${calculateRem(-3)};
              left: ${calculateRem(-3)};
              box-sizing: border-box;
              border: ${
                surface === 'dark'
                  ? `${calculateRem(
                      AccessibilityTokens.focusring.borderwidth.value
                    )} ${AccessibilityTokens.focusring.borderstyle.value} ${
                      AccessibilityTokens.color.focusring.ondark.value
                    }`
                  : `${calculateRem(
                      AccessibilityTokens.focusring.borderwidth.value
                    )} ${AccessibilityTokens.focusring.borderstyle.value} ${
                      AccessibilityTokens.color.focusring.onlight.value
                    }`
              };
              border-radius: ${focusRingBorderRadius ? calculateRem(2) : 0};
          }
        }
        `
            : `
      a:after{
        content: '';
        box-sizing: border-box;
        border: 0.0625rem dashed ${AccessibilityTokens.color.focusring[`on${surface}`].value} ;
        border-radius: 50%;
        position: absolute;
        width: calc(100% - 0.125rem);
        height: calc(100% - 0.125rem);
      }
      `
        }

        
      &:not(:hover):not(:focus-visible) {
        a,button {
          &:after {
            border: none; // Only display focus state on keyboard focus, not when accordion is clicked
          }
        }
    }
  `};
  ${({ renderTriggerIcon, focusRingBorderRadius, surface }) =>
    renderTriggerIcon &&
    `&:focus {
      .toggleIconWrapper > div {
        box-sizing: border-box;
        border: ${
          surface === 'dark'
            ? `${calculateRem(
                AccessibilityTokens.focusring.borderwidth.value
              )} ${AccessibilityTokens.focusring.borderstyle.value} ${
                AccessibilityTokens.color.focusring.ondark.value
              }`
            : `${calculateRem(
                AccessibilityTokens.focusring.borderwidth.value
              )} ${AccessibilityTokens.focusring.borderstyle.value} ${
                AccessibilityTokens.color.focusring.onlight.value
              }`
        };
        border-radius: ${focusRingBorderRadius ? calculateRem(2) : 0};
    }`}
  &:focus:not(:hover):not(:focus-visible) {
    .toggleIconWrapper > div {
      border: none; // Only display focus state on keyboard focus, not when accordion is clicked
    }
  }
`;

const ScreenReaderText = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

//margin 0 and fontsize inherit are there to ignore defualt styling of h tags
const WrapperDiv = styled(
  ({
    groupIndex,
    topLineType,
    surface,
    triggerType,
    opened,
    primitive,
    topLine,
    viewport,
    triggerHoverPosition,
    textLinkColor,
    textLinkBorder,
    ...rest
  }) => {
    return React.createElement(primitive, rest);
  }
)`
  margin: 0;
  font-size: inherit;
  ${({ topLine, groupIndex, topLineType }) =>
    !topLine &&
    topLineType &&
    css`
      border-top: ${calculateRem(
          !groupIndex && topLineType === 'heavy' ? 4 : 1
        )}
        solid
        ${({ surface }) =>
          surface === 'dark'
            ? ColorTokens.elements.primary.ondark.value
            : ColorTokens.elements.primary.onlight.value};
    `}
  padding-top: 0;
  position: relative;
  width: 100%;
  ${({ groupIndex, topLine }) =>
    groupIndex &&
    !topLine &&
    `
    border-top: none;
  `};
  ${({ triggerType, textLinkColor, textLinkBorder }) =>
    triggerType === 'link' &&
    css`
      a {
        color: ${textLinkColor};
        border-bottom: ${textLinkBorder};
      }
    `};
  ${({ triggerType, triggerHoverPosition }) =>
    triggerType !== 'link' &&
    `
      &:hover .toggleIconWrapper {
          cursor: pointer;
          top: ${triggerHoverPosition};
      }
  `};
`;

class AccordionHeader extends Component {
  static componentType = 'AccordionHeader';
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      hovered: false,
      triggerLinkWidth: typeof window !== 'undefined' && window.innerWidth / 4,
    };
  }

  componentDidMount = () => {
    typeof window !== 'undefined' &&
      window.addEventListener('resize', this.getTriggerLinkWidth);
    this.getTriggerLinkWidth();
    const { groupId } = this.props;
    this.accordionHeaderId = `accordionHeader_${groupId}`;
    this.accordionAriaControlsId = `accordionDetail_${groupId}`;
    this.accordionHeaderLabelId = `accordionHeaderLabel_${groupId}`;
  };

  componentWillUnmount = () => {
    typeof window !== 'undefined' &&
      window.removeEventListener('resize', this.getTriggerLinkWidth);
  };

  componentDidUpdate = prevProps => {
    const { opened } = prevProps;

    const nextState = {};

    if (opened !== this.props.opened) {
      this.getTriggerLinkWidth();
    }
  };

  getTriggerLinkWidth = () => {
    const triggerType =
      this.props.trigger && this.props.trigger.type
        ? this.props.trigger.type
        : this.props.triggerType;
    if (triggerType === 'link' && this.triggerRef) {
      this.setState({
        triggerLinkWidth: this.triggerRef.getBoundingClientRect().width,
      });
    }
  };

  isFirefox = (() =>
    typeof navigator !== 'undefined' &&
    navigator.userAgent.toLowerCase().indexOf('firefox') > -1)();

  _clicked = e => {
    const { groupId } = this.props;
    const { hovered } = this.state;
    let focusWrapper = document
      .getElementById(`accordionHeader_${groupId}`)
      ?.querySelector('svg');

    if (this.isFirefox && hovered) {
      //JAWS reads key events as mouse events, so if hovered that means this is a real click
      focusWrapper.style.border = 'none'; // removing border is better than blurring
    }

    this.setState({ clicked: !this.state.clicked });
  };

  _clearStates = e => {
    this.setState({ clicked: false, hovered: false });
  };

  _getTriggerLabel = () => {
    const {
      openAccordionTriggerLabel,
      closeAccordionTriggerLabel,
      trigger,
      opened,
    } = this.props;

    if (opened) {
      return (
        (trigger && trigger.closeLabel) ||
        closeAccordionTriggerLabel ||
        'Cancel'
      );
    } else {
      return (
        (trigger && trigger.openLabel) || openAccordionTriggerLabel || 'Change'
      );
    }
  };

  refPath = UNSAFE_SetEnvRef();

  render() {
    const {
      opened,
      children,
      onClick,
      groupIndex,
      groupId,
      surface,
      sticky,
      style,
      testMode,
      viewport,
      triggerType: triggerTypeProp,
      alwaysOpen,
      onTrigger,
      //1.0
      analyticsTrack,
      track,
      trackIgnore,
      clickStream,
      cta,
      level,
      position,
      dataTrack,
      topLineType,
      primitive,
      ariaLabel,
      TextLinkComponent,
      calcTextLinkSize,
      focusRingBorderRadius,
      bold,
      customChildrenTypography,
      calcPaddingBottom,
      calcPaddingTop,
      calcTextPaddingRight,
      calcToggleIconPositionHover,
      toggleIconTransitionTime,
      fixedTextLinkLabel,
      calcTextLinkColor,
      calcTextLinkBorder,
      trigger,
      renderTriggerIcon,
    } = this.props;

    const triggerType =
      trigger && trigger.type ? trigger.type : triggerTypeProp;
    const isMobile = viewport === 'mobile';
    const focusWrapper =
      typeof document !== 'undefined' &&
      document
        .getElementById(`accordionHeader_${groupId}`)
        ?.querySelector('svg');

    const childrenContent = getNodeText(children);

    const _onClick = e => {
      onClick && onClick(e);
      trigger && trigger.onClick && trigger.onClick(e);
      onTrigger && onTrigger(e);

      this.getTriggerLinkWidth();
    };

    const _onFocus = e => {
      //set styles for firefox because we cant use tabindex -1
      if (this.isFirefox) {
        focusWrapper.style.border = `
          ${AccessibilityTokens.focusring.borderwidth.value}
          ${AccessibilityTokens.focusring.borderstyle.value}
          ${
            surface === 'dark'
              ? AccessibilityTokens.color.focusring.ondark.value
              : AccessibilityTokens.color.focusring.onlight.value
          }`;
        if (focusRingBorderRadius) {
          focusWrapper.style.borderRadius = calculateRem(2);
        }
      }
    };
    const _onBlur = e =>
      this.isFirefox ? (focusWrapper.style.border = 'none') : null;

    const _onHover = e => this.setState({ hovered: true });

    const TriggerComponentWrapper =
      triggerType === 'link' && !fixedTextLinkLabel
        ? TriggerLinkWrapper
        : TriggerIconWrapper;

    const { triggerLinkWidth } = this.state;

    return (
      <WrapperDiv
        data-testid={sticky && testMode ? `sticky_${groupId}` : undefined}
        id={this.accordionHeaderId}
        groupIndex={groupIndex}
        surface={surface}
        triggerType={triggerType}
        opened={opened}
        topLineType={topLineType}
        primitive={primitive}
        triggerHoverPosition={
          renderTriggerIcon
            ? calcToggleIconPositionHover(viewport, opened)
            : undefined
        }
        viewport={viewport}
        textLinkColor={calcTextLinkColor(
          surface,
          this.state.hovered,
          this.state.clicked
        )}
        textLinkBorder={calcTextLinkBorder(
          surface,
          this.state.hovered,
          this.state.clicked
        )}
      >
        <OuterElementWrapper
          paddingTop={calcPaddingTop(viewport)}
          paddingBottom={calcPaddingBottom(viewport, opened || alwaysOpen)}
          paddingRight={calcTextPaddingRight(
            viewport,
            alwaysOpen,
            triggerType,
            triggerLinkWidth
          )}
        >
          <StyledAccordionButton
            className="accordionButton"
            focusRingBorderRadius={focusRingBorderRadius}
            aria-expanded={opened}
            aria-controls={this.accordionAriaControlsId}
            id={trigger && trigger.id ? trigger.id : undefined}
            onClick={_onClick}
            type="button"
            role="button"
            tabIndex={0}
            onFocus={_onFocus}
            onBlur={_onBlur}
            surface={surface}
            onMouseDown={this._clicked}
            onMouseUp={this._clicked}
            onMouseEnter={_onHover}
            onMouseLeave={this._clearStates}
            aria-label={
              trigger && trigger.ariaLabel
                ? trigger.ariaLabel
                : ariaLabel
                ? ariaLabel
                : ``
            }
            data-clickstream={clickStream}
            data-analyticstrack={analyticsTrack}
            data-track={track}
            data-track-ignore={trackIgnore}
            data-sitecat-datatrack={dataTrack}
            data-sitecat-position={position}
            data-sitecat-level={level}
            data-sitecat-cta={cta}
            triggerType={triggerType}
            fixedTextLinkLabel={fixedTextLinkLabel}
            alwaysOpen={alwaysOpen}
            viewport={viewport}
            bold={bold}
            customChildrenTypography={customChildrenTypography}
            paddingTop={calcPaddingTop(viewport)}
            paddingBottom={calcPaddingBottom(viewport, opened || alwaysOpen)}
            paddingRight={calcTextPaddingRight(
              viewport,
              alwaysOpen,
              triggerType,
              triggerLinkWidth
            )}
            renderTriggerIcon={renderTriggerIcon ? true : false}
          >
            <ScreenReaderText id={this.accordionHeaderLabelId}>
              {childrenContent}
            </ScreenReaderText>
            {!alwaysOpen && (
              <TriggerComponentWrapper
                className="toggleIconWrapper"
                surface={surface}
                opened={opened}
                triggerType={triggerType}
                aria-hidden={triggerType === 'icon' && true}
                viewport={viewport}
                fixedTextLinkLabel={fixedTextLinkLabel}
                toggleIconTransitionTime={toggleIconTransitionTime}
                triggerPosition={calcPaddingTop(viewport)} // align with overall component padding-top
                {...{
                  [this.refPath]: elem => (this.triggerRef = elem),
                }}
              >
                {triggerType === 'link' && (
                  <TextLinkComponent
                    tabIndex={-1}
                    type="standAlone"
                    size={calcTextLinkSize(viewport)}
                    activeState={this.state.clicked}
                    surface={surface}
                  >
                    {this._getTriggerLabel()}
                  </TextLinkComponent>
                )}
                {triggerType === 'icon' &&
                  (renderTriggerIcon ? (
                    renderTriggerIcon(this.state.clicked)
                  ) : (
                    <ButtonIcon
                      tabIndex={-1}
                      kind="ghost"
                      href="javascript:void(0)"
                      role={'button'}
                      size={isMobile ? '24' : '28'}
                      surface={surface}
                      focusBorderPosition="inside"
                      iconOffset={{
                        x: 0,
                        y: isMobile ? (opened ? -1 : -1) : -2,
                      }}
                      onClick={_onClick}
                      renderIcon={() => (
                        <DownCaret
                          surface={surface}
                          size={isMobile ? '16' : 'medium'}
                        />
                      )}
                    />
                  ))}
              </TriggerComponentWrapper>
            )}
          </StyledAccordionButton>

          <InnerElementWrapper
            paddingTop={calcPaddingTop(viewport)}
            paddingBottom={calcPaddingBottom(viewport, opened || alwaysOpen)}
            paddingRight={calcTextPaddingRight(
              viewport,
              alwaysOpen,
              triggerType,
              triggerLinkWidth
            )}
            data-testid="date-test-id"
            surface={surface}
          >
            {React.Children.map(children, (child, index) => {
              if (
                child &&
                child.type &&
                child.type.displayName === 'AccordionTitle'
              ) {
                return React.cloneElement(child, {
                  ...child.props,
                  surface: surface,
                  viewport: viewport,
                  bold: bold,
                });
              } else if (
                child &&
                child.type &&
                child.type.displayName === 'AccordionSubTitle'
              ) {
                return React.cloneElement(child, {
                  ...child.props,
                  surface: surface,
                  viewport: viewport,
                });
              } else {
                return child;
              }
            })}
          </InnerElementWrapper>
        </OuterElementWrapper>
      </WrapperDiv>
    );
  }
}

AccordionHeader.defaultProps = defaultProps;
AccordionHeader.propTypes = propTypes;

export default AccordionHeader;
