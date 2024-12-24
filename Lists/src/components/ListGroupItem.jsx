import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import {
  calculateRem,
  generateUUID,
  hexToRgba,
  getNodeText,
} from '@vds-core/utilities';
import { AccessibilityTokens } from '@vds-tokens/accessibility';
import { LayoutTokens } from '@vds-tokens/layout';
import { ColorTokens } from '@vds-tokens/color';
import { TextLink } from '@vds-core/buttons';
import { Checkbox } from '@vds-core/checkboxes';
import { Line } from '@vds-core/lines';
import { Toggle } from '@vds-core/toggles';
import { Body, Fonts } from '@vds-core/typography';
import { TypographyTokens } from '@vds-tokens/typography';
import { Icon } from '@vds-core/icons';
import { ButtonIcon } from '@vds-core/button-icons';

const paddingMobile = calculateRem(LayoutTokens.space['6X'].value);
const paddingNonMobile = calculateRem(LayoutTokens.space['8X'].value);

const actionElemPaddingMobile = calculateRem(LayoutTokens.space['3X'].value);
const actionElemPaddingNonMobile = calculateRem(LayoutTokens.space['4X'].value);

const leftElemPaddingMobile = calculateRem(LayoutTokens.space['4X'].value);
const leftElemPaddingNonMobile = calculateRem(LayoutTokens.space['6X'].value);

const actionElemPaddingRight = calculateRem(LayoutTokens.space['1X'].value);

/**
 * Helper function to manipulate hover & active
 * state of text link when hovering or clicking
 * the overall list item
 */
const _getTextLinkStyles = surface => {
  const color = {
    hover: ColorTokens.elements.primary[`on${surface}`].value,
    active: ColorTokens.interactive.active[`on${surface}`].value,
  };

  return color;
};

const propTypes = {
  /**
   * If true, list group item will render custom children passed in and
   * will not render actionElement prop
   */
  custom: PropTypes.bool,
  /**
   * If provided, will render the ListGroupItem when surface is light or dark.
   */
  surface: PropTypes.oneOf(['light', 'dark']),
  /**
   * If true, will disable user from clicking the list group item
   */
  disabled: PropTypes.bool,
  /**
   * @ignore
   * If true, can only be used to display on first list group item in ListGroup component
   */
  topLine: PropTypes.bool,
  /**
   * @ignore
   * If true, can only be used to display on the last list group item in ListGroup component
   */
  bottomLine: PropTypes.bool,
  /**
   * If provided, hides aria attributes from a screen reader.
   */
  ariaHidden: PropTypes.string,
  /**
   * If provided, used as string that labels the element for accessibility.
   */
  ariaLabel: PropTypes.string,
  /**
   * If provided, used as string that defines the element's aria role for accessibility.
   */
  ariaRole: PropTypes.string,
  /**
   * If provided, list group item renders subtitle on the right before icon
   * or when actionElement is 'none'
   */
  subtitleRight: PropTypes.string,
  /**
   * Options to render actionElement. Defaults to icon
   */
  actionElement: PropTypes.oneOf([
    'none',
    'icon',
    'checkbox',
    'textLink',
    'toggle',
  ]),

  /**
   * Determines whether mobile, or desktop viewports are used.
   */
  viewport: PropTypes.oneOf(['mobile', 'tablet', 'desktop']),

  /**
   * Config object for toggle when actionElement is toggle
   */
  toggle: PropTypes.shape({
    on: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    id: PropTypes.string,
    inputId: PropTypes.string,
    onChange: PropTypes.func,
    showText: PropTypes.bool,
    statusText: PropTypes.func,
    'data-analyticstrack': PropTypes.string,
    'data-clickstream': PropTypes.string,
    'data-track': PropTypes.string,
    'data-track-ignore': PropTypes.string,
    'data-testid': PropTypes.string,
  }),

  /**
   * Config object for textLink when actionElement is textLink
   */
  textLink: PropTypes.shape({
    text: PropTypes.string,
    onClick: PropTypes.func,
    href: PropTypes.string,
    role: PropTypes.oneOf(['link', 'button']),
    'data-analyticstrack': PropTypes.string,
    'data-clickstream': PropTypes.string,
    'data-sitecat-cta': PropTypes.string,
    'data-sitecat-datatrack': PropTypes.string,
    'data-sitecat-level': PropTypes.string,
    'data-sitecat-position': PropTypes.string,
    'data-track': PropTypes.string,
    'data-track-ignore': PropTypes.string,
    'data-testid': PropTypes.string,
  }),

  /**
   * Config object for icon when actionElement is icon
   */
  icon: PropTypes.shape({
    onClick: PropTypes.func,
    'data-analyticstrack': PropTypes.string,
    'data-clickstream': PropTypes.string,
    'data-sitecat-cta': PropTypes.string,
    'data-sitecat-datatrack': PropTypes.string,
    'data-sitecat-level': PropTypes.string,
    'data-sitecat-position': PropTypes.string,
    'data-track': PropTypes.string,
    'data-track-ignore': PropTypes.string,
    'data-testid': PropTypes.string,
  }),

  /**
   * Config object for checkbox when actionElement is checkbox
   */
  checkbox: PropTypes.shape({
    selected: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    id: PropTypes.string,
    inputId: PropTypes.string,
    onChange: PropTypes.func,
    'data-analyticstrack': PropTypes.string,
    'data-clickstream': PropTypes.string,
    'data-track': PropTypes.string,
    'data-track-ignore': PropTypes.string,
    'data-testid': PropTypes.string,
  }),

  /**
   * Config object for descriptiveIcon. Can be used for all actionElement options
   */
  descriptiveIcon: PropTypes.shape({
    name: PropTypes.string,
    size: PropTypes.oneOfType([
      PropTypes.oneOf(['XSmall', 'small', 'medium', 'large', 'XLarge']),
      PropTypes.string,
    ]),
    color: PropTypes.string,
  }),
  /**
   * Function fired when list item is clicked
   * @note Providing the onClick prop will render the content as a link
   */
  onClick: PropTypes.func,
  /**
   * String, React Component, or HTML to render content of ListItem
   */
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.node,
  ]),
  /**
   * Allows a unique id to be passed to the component and applied to the outermost wrapper of list item.
   */
  id: PropTypes.string,
  /**
   * If provided, will determine the prominence of the title and subtitle positions in the list item
   */
  textHierarchy: PropTypes.oneOf(['titleProminent', 'subtitleProminent']),
  /**
   * Allows a string to be provided for analytics.
   */
  'data-analyticstrack': PropTypes.string,
  /**
   * Allows a string to be provided for analytics.
   */
  'data-track': PropTypes.string,
  /**
   * Allows a string to be provided for ignoring analytics tagging.
   */
  'data-track-ignore': PropTypes.string,
  /**
   * Allows a string to be provided for click stream.
   */
  'data-clickstream': PropTypes.string,
  /**
   * If true and actionElement is not ‘none’, will disable the click event of listGroupItem container hit area.
   */
  disableContainerHitArea: PropTypes.bool,
};

const defaultProps = {
  actionElement: 'icon',
  custom: false,
  surface: 'light',
  disabled: false,
  topLine: false,
  bottomLine: false,
  textHierarchy: 'titleProminent',
  onClick: undefined,
  disableContainerHitArea: false,
};

const ComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  pointer-events: auto;
`;

const HiddenLabel = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
  visibility: hidden;
`;

const StyledListItem = styled.div`
  position: relative;
  outline: none;
  list-style: none;
  padding-bottom: ${({ paddingBottom }) => paddingBottom};
  padding-top: ${({ paddingTop }) => paddingTop};
  width: 100%;

  ${({ surface, actionElement, onClick }) =>
    actionElement === 'none' &&
    css`
      &:focus:not(:hover) {
        &::before {
          border: ${AccessibilityTokens.focusring.borderwidth.value}
            ${AccessibilityTokens.focusring.borderstyle.value}
            ${AccessibilityTokens.color.focusring[`on${surface}`].value};
          border-radius: ${calculateRem(2)};
          content: '';
          position: absolute;
          pointer-events: none;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: calc(100% + 6px);
          height: calc(100% + 6px);
        }
      }
      &:focus:not(:focus-visible) {
        &::before {
          border: none;
        }
      }
    `};

  ${({ disabled, surface, actionElement, disableClickForHitArea, onClick }) =>
    !disabled &&
    !disableClickForHitArea &&
    onClick &&
    css`
      &:hover {
        cursor: pointer;
        ${actionElement === 'icon' &&
          `
          .actionIconSpan button {
            outline: none;
            box-shadow: 0 0 0 0.0625rem ${hexToRgba(
              ColorTokens.palette.gray44.value,
              surface == 'dark' ? 0.26 : 0.06
            )};
            background-color: ${hexToRgba(
              ColorTokens.palette.gray44.value,
              surface == 'dark' ? 0.26 : 0.06
            )};
          `}
      }
      &:active {
        ${actionElement === 'icon' &&
          `
          .actionIconSpan button {
            svg {
              path {
                fill: ${ColorTokens.interactive.active[`on${surface}`].value};
              }
            }
          }
          `};
        ${actionElement === 'textLink' &&
          `
          a {
            color: ${_getTextLinkStyles(surface).active};
            border-bottom-color: ${_getTextLinkStyles(surface).active};
          }
          `};
      }
    `};
`;

const ChildWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${({ custom, viewport }) =>
    custom &&
    css`
      font-family: ${Fonts.VerizonNHGeDS};
      font-size: ${viewport === 'mobile'
        ? TypographyTokens.fontsize.title[16].value
        : TypographyTokens.fontsize.title[20].value};
      line-height: ${viewport === 'mobile'
        ? TypographyTokens.lineheight.title[20].value
        : TypographyTokens.lineheight.title[24].value};
    `}
`;

const TextContainer = styled.span`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  overflow-wrap: break-word;
  word-break: break-word;
  ${({ hasMarginLeft, isMobile }) =>
    hasMarginLeft &&
    `margin-left: ${
      isMobile ? leftElemPaddingMobile : leftElemPaddingNonMobile
    };`}
`;

const SubtitleRightWithIconContainer = styled.span`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-align: end;
  max-width: ${({ isMobile }) => (isMobile ? '50%' : '25%')};
  padding-left: ${({ isMobile }) =>
    isMobile ? actionElemPaddingMobile : actionElemPaddingNonMobile};
  overflow-wrap: break-word;
  word-break: break-word;
  ${({ subtitleRight }) =>
    !subtitleRight && `padding-right: ${actionElemPaddingRight};`}
`;

/**
 * Must set span wrapper for text link's children to inline-block
 * and vertical-align to text-top to achieve overflow ellipsis
 */
const TextLinkContainer = styled.div`
  max-width: ${({ isMobile }) => (isMobile ? '50%' : '25%')};
  padding-left: ${({ isMobile }) =>
    isMobile ? actionElemPaddingMobile : actionElemPaddingNonMobile};
  span:last-child {
    height: 100%;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: text-top;
  }
`;

const ToggleContainer = styled.span`
  display: flex;
  max-width: ${({ isMobile }) =>
    isMobile ? `calc(50% - 12px)` : `calc(25% - 16px)`};
  margin-left: ${({ isMobile }) =>
    isMobile ? actionElemPaddingMobile : actionElemPaddingNonMobile};
`;

const SubtitleContainer = styled.div`
  ${({ paddingPosition }) => `
    padding-${paddingPosition}: ${calculateRem(LayoutTokens.space['1X'].value)};
  `}
`;

const IconSectionWrapper = styled.span`
  display: flex;
  justify-content: center;
  outline: none;
  list-style: none;
  
  ${({ surface }) => css`
    &.active {
      svg {
        path {
          fill: ${ColorTokens.interactive.active[`on${surface}`].value};
        }
      }
    }
  `}
  ${({ paddingLeft }) => paddingLeft && ` padding-left: ${paddingLeft}; `}
  ${({ paddingRight }) => paddingRight && ` padding-right: ${paddingRight}; `}
 
`;

const DescriptiveIconContainer = styled.span`
  display: flex;
  justify-content: center;
  margin-right: ${({ isMobile }) =>
    isMobile ? leftElemPaddingMobile : leftElemPaddingNonMobile};
`;

const CheckboxWrapper = styled.span`
  display: flex;
  margin-right: ${({ isMobile }) =>
    isMobile ? leftElemPaddingMobile : leftElemPaddingNonMobile};
`;

class ListGroupItem extends React.Component {
  static componentType = 'ListGroupItem';
  constructor(props) {
    super(props);
    this.actionElementInputId = `${generateUUID()}`;
    this.listItemId = `${generateUUID()}`;
    this.state = {
      selected: false,
      listItemTitle: '',
      listItemSubtitle: '',
    };
  }

  componentDidMount() {
    this._getTitleAndSubTitle();
    const { actionElement, toggle } = this.props;
    actionElement === 'toggle' &&
      toggle &&
      toggle.on &&
      this.setState({ selected: true });
  }

  _getTitleAndSubTitle = () => {
    const { children } = this.props;
    if (!children) return;
    const getChildren = child => {
      const childType = this._getChildType(child);
      if (childType === 'ListGroupItemTitle') {
        this.setState({
          listItemTitle: getNodeText(child.props.children),
        });
      } else if (childType === 'ListGroupItemSubtitle') {
        this.setState({
          listItemSubtitle: getNodeText(child.props.children),
        });
      }
    };

    if (children.length > 1) {
      children.map(child => {
        if (child && child.props && child.props.children) {
          getChildren(child);
        }
      });
    } else {
      getChildren(children);
    }
  };

  _getChildType = child => {
    return child &&
      React.isValidElement(child) &&
      child.type &&
      child.type.displayName
      ? child.type.displayName
      : '';
  };

  _onActionElementClick = () => {
    this.setState({ selected: !this.state.selected });
  };

  _handleOnClick = (e, actionElementClick) => {
    const { onClick, actionElement } = this.props;
    const hasInput = actionElement === 'toggle' || actionElement === 'checkbox';
    const hasToggle = actionElement === 'toggle';

    if (hasInput) this._onActionElementClick();

    if (actionElementClick) {
      actionElementClick(
        e,
        hasInput && {
          name: this.state.listItemTitle,
          selected: !this.state.selected,
          id: this.actionElementInputId,
        }
      );
    } else if (onClick) {
      hasToggle && e.preventDefault();
      onClick(
        e,
        hasInput && {
          name: this.state.listItemTitle,
          selected: !this.state.selected,
          id: this.actionElementInputId,
        }
      );
    }
  };

  _handleOnKeyDown = e => {
    const { onClick, actionElement } = this.props;
    const { keyCode } = e;
    const space = keyCode === 32;
    const enter = keyCode === 13;
    const hasInput = actionElement === 'toggle' || actionElement === 'checkbox';
    if (space) e.preventDefault();
    if (hasInput) this._onActionElementClick();
    if ((enter || space) && onClick)
      onClick(
        e,
        hasInput && {
          name: this.state.listItemTitle,
          selected: !this.state.selected,
          id: this.actionElementInputId,
        }
      );
  };

  _renderLine = () => {
    const { surface } = this.props;
    return <Line type="secondary" surface={surface} />;
  };

  _renderWithIcon = () => {
    const {
      surface,
      viewport,
      subtitleRight,
      disabled,
      ariaRole,
      ariaHidden,
      onClick,
      icon,
      disableContainerHitArea,
      actionElement,
    } = this.props;

    const isMobile = viewport === 'mobile';
    const paddingLeft = isMobile
      ? actionElemPaddingMobile
      : actionElemPaddingNonMobile;

    const disableClickForHitArea =
      actionElement === 'none' ? false : disableContainerHitArea;
    return (
      <IconSectionWrapper
        className="actionIconSpan"
        id="actionIconSpan"
        paddingLeft={subtitleRight && paddingLeft}
        paddingRight={subtitleRight && actionElemPaddingRight}
        surface={surface}
      >
        <ButtonIcon
          kind="ghost"
          size={viewport === 'mobile' ? '24' : '28'}
          surface={surface}
          id={this.actionElementInputId}
          disabled={disabled}
          focusBorderPosition="inside"
          fitToIcon={true}
          aria-hidden={ariaHidden}
          tabIndex={!disabled ? 0 : -1}
          ariaLabel={disabled ? undefined : this._calculateAriaLabel()}
          ariaHidden={ariaHidden}
          renderIcon={props => (
            <Icon
              name="right-arrow"
              {...props}
              size={isMobile ? 16 : 'medium'}
            />
          )}
          onClick={e =>
            !disabled &&
            this._handleOnClick(
              e,
              icon && icon.onClick ? icon.onClick : undefined
            )
          }
          data-analyticstrack={icon && icon['data-analyticstrack']}
          data-clickstream={icon && icon['data-clickstream']}
          data-sitecat-cta={icon && icon['data-sitecat-cta']}
          data-sitecat-datatrack={icon && icon['data-sitecat-datatrack']}
          data-sitecat-level={icon && icon['data-sitecat-level']}
          data-sitecat-position={icon && icon['data-sitecat-position']}
          data-track={icon && icon['data-track']}
          data-track-ignore={icon && icon['data-track-ignore']}
          role={
            disabled
              ? undefined
              : ariaRole
              ? ariaRole
              : onClick
              ? 'link'
              : 'button'
          }
        />
      </IconSectionWrapper>
    );
  };

  _renderWithSubtitleRight = () => {
    const { subtitleRight, viewport, surface } = this.props;
    const isMobile = viewport === 'mobile';
    const subtitleRightColor =
      ColorTokens.elements.primary[`on${surface}`].value;

    return (
      <Body
        color={subtitleRightColor}
        size={isMobile ? 'small' : 'large'}
        viewport={viewport}
      >
        {subtitleRight}
      </Body>
    );
  };

  _renderWithTextLink = () => {
    const { surface, disabled, viewport, textLink } = this.props;
    const isMobile = viewport === 'mobile';
    if (!textLink || !textLink.text) return null;
    return (
      <TextLinkContainer isMobile={isMobile}>
        <TextLink
          type="standAlone"
          size={isMobile ? 'small' : 'large'}
          surface={surface}
          disabled={disabled}
          viewport={viewport}
          href={textLink.href ? textLink.href : undefined}
          role={textLink && textLink.role ? textLink.role : 'link'}
          onClick={e =>
            this._handleOnClick(
              e,
              textLink && textLink.onClick ? textLink.onClick : undefined
            )
          }
          data-analyticstrack={textLink && textLink['data-analyticstrack']}
          data-clickstream={textLink && textLink['data-clickstream']}
          data-sitecat-cta={textLink && textLink['data-sitecat-cta']}
          data-sitecat-datatrack={
            textLink && textLink['data-sitecat-datatrack']
          }
          data-sitecat-level={textLink && textLink['data-sitecat-level']}
          data-sitecat-position={textLink && textLink['data-sitecat-position']}
          data-track={textLink && textLink['data-track']}
          data-track-ignore={textLink && textLink['data-track-ignore']}
          data-testid={textLink && textLink['data-testid']}
          ariaLabel={disabled ? undefined : this._calculateAriaLabel()}
          onKeyDown={e => {
            if (e.keyCode === 32) {
              e.preventDefault();
            }
          }}
        >
          {textLink.text}
        </TextLink>
      </TextLinkContainer>
    );
  };

  _renderWithToggle = () => {
    const { surface, disabled, viewport, toggle } = this.props;
    const isMobile = viewport === 'mobile';
    const _statusText =
      toggle && toggle.statusText ? on => toggle.statusText(on) : undefined;
    return (
      <ToggleContainer isMobile={isMobile}>
        <Toggle
          on={this.state.selected}
          showText={toggle && toggle.showText === false ? false : true}
          statusText={_statusText}
          textPosition="left"
          textSize={isMobile ? 'small' : 'large'}
          disabled={disabled}
          tabIndex={0}
          value={
            toggle && toggle.value ? toggle.value : this.state.listItemTitle
          }
          name={toggle && toggle.name ? toggle.name : this.state.listItemTitle}
          inputId={
            toggle && toggle.inputId
              ? toggle.inputId
              : this.actionElementInputId
          }
          onChange={e =>
            this._handleOnClick(
              e,
              toggle && toggle.onChange ? toggle.onChange : undefined
            )
          }
          surface={surface}
          data-analyticstrack={toggle && toggle['data-analyticstrack']}
          data-clickstream={toggle && toggle['data-clickstream']}
          data-track={toggle && toggle['data-track']}
          data-track-ignore={toggle && toggle['data-track-ignore']}
          data-testid={toggle && toggle['data-testid']}
        />
      </ToggleContainer>
    );
  };

  _renderWithDescriptiveIcon = () => {
    const { surface, viewport, descriptiveIcon } = this.props;
    const isMobile = viewport === 'mobile';

    const _getDescriptiveIconSize = () => {
      if (descriptiveIcon && descriptiveIcon.size) return descriptiveIcon.size;
      return isMobile ? 'large' : 'XLarge';
    };

    if (
      !descriptiveIcon ||
      !Object.keys(descriptiveIcon).length ||
      !descriptiveIcon.name
    )
      return null;

    return (
      <DescriptiveIconContainer isMobile={isMobile}>
        <Icon
          ariaHidden
          surface={surface}
          tabIndex={-1}
          size={_getDescriptiveIconSize()}
          name={descriptiveIcon.name}
          color={descriptiveIcon.color}
        />
      </DescriptiveIconContainer>
    );
  };

  _renderWithCheckbox = () => {
    const { viewport, surface, disabled, checkbox } = this.props;
    const isMobile = viewport === 'mobile';

    return (
      <CheckboxWrapper isMobile={isMobile}>
        <HiddenLabel htmlFor={this.actionElementInputId} />
        <Checkbox
          customLabel
          surface={surface}
          disabled={disabled}
          name={this.state.listItemTitle}
          value={this.state.listItemTitle}
          inputId={this.actionElementInputId}
          selected={this.state.selected}
          onChange={e =>
            this._handleOnClick(
              e,
              checkbox && checkbox.onChange ? checkbox.onChange : undefined
            )
          }
          ariaLabel={this._calculateAriaLabel()}
          data-analyticstrack={checkbox && checkbox['data-analyticstrack']}
          data-clickstream={checkbox && checkbox['data-clickstream']}
          data-track={checkbox && checkbox['data-track']}
          data-track-ignore={checkbox && checkbox['data-track-ignore']}
          data-testid={checkbox && checkbox['data-testid']}
        />
      </CheckboxWrapper>
    );
  };

  _renderRightSideElements = () => {
    const { actionElement, subtitleRight, viewport } = this.props;
    const isMobile = viewport === 'mobile';
    const hasIcon = actionElement === 'icon';

    switch (actionElement) {
      case 'textLink':
        return this._renderWithTextLink();

      case 'toggle':
        return this._renderWithToggle();

      case 'none':
        return !subtitleRight ? null : (
          <SubtitleRightWithIconContainer isMobile={isMobile}>
            {this._renderWithSubtitleRight()}
          </SubtitleRightWithIconContainer>
        );

      case 'checkbox':
        return null;

      case 'icon':
      default:
        return (
          <SubtitleRightWithIconContainer
            isMobile={isMobile}
            subtitleRight={subtitleRight}
          >
            {!!subtitleRight && this._renderWithSubtitleRight()}
            {hasIcon && this._renderWithIcon()}
          </SubtitleRightWithIconContainer>
        );
    }
  };

  _renderLeftSideElements = () => {
    const { actionElement } = this.props;

    return (
      <>
        {actionElement === 'checkbox' && this._renderWithCheckbox()}
        {this._renderWithDescriptiveIcon()}
      </>
    );
  };

  _renderChildrenSlots = () => {
    const {
      children,
      surface,
      viewport,
      textHierarchy,
      actionElement,
    } = this.props;

    const isMobile = viewport === 'mobile';
    let Title, Subtitle, ImageItem;

    React.Children.forEach(children, (child, index) => {
      const childType = this._getChildType(child);

      if (childType === 'ListGroupItemTitle') {
        Title = React.cloneElement(child, {
          ...child.props,
          viewport: viewport,
          surface: surface,
        });
      } else if (childType === 'ListGroupItemSubtitle') {
        Subtitle = (
          <SubtitleContainer
            paddingPosition={
              textHierarchy === 'titleProminent' ? 'top' : 'bottom'
            }
          >
            {React.cloneElement(child, {
              ...child.props,
              viewport: viewport,
              surface: surface,
            })}
          </SubtitleContainer>
        );
      } else if (childType === 'ListGroupItemImage') {
        ImageItem = child;
      }
    });

    const _renderTextHierarchy = () => {
      if (!!Title && !!Subtitle) {
        return textHierarchy === 'titleProminent' ? (
          <>
            {Title}
            {Subtitle}
          </>
        ) : (
          <>
            {Subtitle}
            {Title}
          </>
        );
      } else if (!!Title && !Subtitle) {
        return Title;
      } else if (!!Subtitle && !Title) {
        return Subtitle;
      }
    };

    return (
      <>
        {!!ImageItem && ImageItem}
        <TextContainer hasMarginLeft={!!ImageItem} isMobile={isMobile}>
          {_renderTextHierarchy()}
        </TextContainer>
      </>
    );
  };

  _calculateAriaLabel = () => {
    const { ariaLabel, subtitleRight, textLink, textHierarchy } = this.props;

    const getByTextHierarchy = () => {
      return textHierarchy === 'subtitleProminent' &&
        this.state.listItemSubtitle
        ? this.state.listItemSubtitle
        : this.state.listItemTitle;
    };

    if (ariaLabel) return ariaLabel;
    else if (subtitleRight)
      return `${this.state.listItemTitle} ${this.state.listItemSubtitle} ${subtitleRight}`;
    else if (textLink) return `${textLink.text} ${getByTextHierarchy()}`;
    else return `${getByTextHierarchy()}`;
  };

  render() {
    const {
      surface,
      disabled,
      topLine,
      bottomLine,
      viewport,
      children,
      custom,
      actionElement,
      onClick,
      id,
      'data-analyticstrack': analyticsTrack,
      'data-track': track,
      'data-track-ignore': ignoreTrack,
      'data-clickstream': clickStream,
      disableContainerHitArea,
    } = this.props;
    const isMobile = viewport === 'mobile';
    const role = onClick ? 'link' : '';
    const disableClickForHitArea =
      actionElement === 'none' ? false : disableContainerHitArea;
    return (
      <ComponentWrapper id={id}>
        {topLine && this._renderLine()}
        <StyledListItem
          id={this.listItemId}
          aria-label={
            actionElement === 'none' ? this._calculateAriaLabel() : undefined
          }
          actionElement={actionElement}
          disabled={disabled}
          surface={surface}
          paddingBottom={isMobile ? paddingMobile : paddingNonMobile}
          paddingTop={isMobile ? paddingMobile : paddingNonMobile}
          onClick={
            !disabled && !disableClickForHitArea && onClick
              ? this._handleOnClick
              : undefined
          }
          tabIndex={disabled || actionElement !== 'none' || !onClick ? -1 : 0} // Only allow to tab to the entire list item if actionElement is 'none'
          disableClickForHitArea={disableClickForHitArea}
          data-analyticstrack={analyticsTrack}
          data-track={track}
          data-track-ignore={ignoreTrack}
          data-clickstream={clickStream}
          {...(actionElement === 'none' && {
            onKeyDown: this._handleOnKeyDown,
          })}
        >
          <ChildWrapper custom={custom} viewport={viewport}>
            {!custom && this._renderLeftSideElements()}
            {!custom && this._renderChildrenSlots()}
            {custom &&
              React.Children.map(children, (child, index) => {
                const childType = this._getChildType(child);
                const isCustom =
                  childType !== 'ListGroupItemImage' &&
                  childType !== 'ListGroupItemTitle' &&
                  childType !== 'ListGroupItemSubtitle';

                if (!childType || isCustom) return child;
              })}
            {!custom && this._renderRightSideElements()}
          </ChildWrapper>
        </StyledListItem>
        {bottomLine && this._renderLine()}
      </ComponentWrapper>
    );
  }
}

ListGroupItem.propTypes = propTypes;
ListGroupItem.defaultProps = defaultProps;

export default ListGroupItem;
