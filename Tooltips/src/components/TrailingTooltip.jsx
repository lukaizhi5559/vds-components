import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Tooltip from './Tooltip';
import { ColorTokens } from '@vds-tokens/color';
import { Body, Title, Micro, Feature } from '@vds-core/typography';
import { TypographyTokens } from '@vds-tokens/typography';
import { withVDSManager } from '@vds-core/utilities';

const propTypes = {
  /**
   * Boolean that activates disabled state
   */
  disabled: PropTypes.bool,
  /**
   * Function that returns an HTML element or React component to be used as a custom anchor for the tooltip. The function is called with a React ref, and an object that will pass back aria-describedby, aria-expanded, and aria-label that has to be passed to the returned anchor element/component.
   */
  renderAnchorElement: PropTypes.func,
  /**
   * Content that will be passed to the typography.
   */
  children: PropTypes.node,
  /**
   * VDS Typography component that is used to render the text preceding the tooltip.
   */
  typographyType: PropTypes.oneOf(['title', 'body', 'micro', 'feature']),
  /**
   * Primitive used for the typgraphy.
   */
  typographyPrimitive: PropTypes.oneOf([
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'span',
    'p',
  ]),
  /**
   * Viewport the font styling is based on. Desktop and tablet are the same size.
   */
  viewport: PropTypes.oneOf(['desktop', 'tablet', 'mobile']),
  /**
   * Size of the typography component to be rendered.
   */
  typographySize: PropTypes.string,
  /**
   * Color of the typography component to be rendered.
   */
  typographyColor: PropTypes.string,
  /**
   * Adds a fontWeight of bold to the typography component, only valid for Body and Title typographyTypes.
   */
  bold: PropTypes.bool,
  /**
   * Determines the size of the tooltip.
   */
  tooltipSize: PropTypes.oneOf(['small', 'medium']),
  /**
   * Determines the content of the tooltip.
   */
  tooltipContent: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.node,
  ]),
  /**
   * Determines the title of the tooltip.
   */
  tooltipTitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.node,
  ]),
  /**
   * @ignore 3.x only
   * @deprecated
   * Determines the text for Close button of the tooltip on mobile/touch devices
   */
  tooltipButtonText: PropTypes.string,
  /**
   * @ignore
   */
  tooltipCloseButtonText: PropTypes.string,
  /**
   * Config object for tooltip option
   */
  tooltip: PropTypes.shape({
    renderAnchorElement: PropTypes.func,
    id: PropTypes.string,
    disabled: PropTypes.bool,
    containerId: PropTypes.string,
    ariaLabel: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium']),
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.node,
    ]),
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.node,
    ]),
    closeButtonText: PropTypes.string,
    'data-track': PropTypes.string,
    'data-track-ignore': PropTypes.string,
    'data-analyticstrack': PropTypes.string,
    'data-clickstream': PropTypes.string,
  }),
  /**
   * If provided, will render the tooltip when surface is light or dark.
   * @ignore
   */
  surface: PropTypes.oneOf(['light', 'dark']),
  /**
   * Allows a unique ID to be passed to the component.
   */
  id: PropTypes.string,
  /**
   * Allows a unique component ID to be passed to the component as a reference for positioning other than the window object.
   */
  containerId: PropTypes.string,
  /**
   * A String label that is required for accessibility, the should be very terse description ot the tooltips content.
   */
  ariaLabel: PropTypes.string,
  /**
   * Option to render icon element in brand colors
   * @note Providing a custom HEX value is also possible. brandHightlight is recommended to use on light surface only
   */
  iconFillColor: PropTypes.oneOfType([
    PropTypes.oneOf(['primary', 'secondary', 'brandHighlight']),
    PropTypes.string,
  ]),
  /**
   * @ignore Passes in Body component.
   */
  Body: PropTypes.func,
  /**
   * @ignore Passes in Title component.
   */
  Title: PropTypes.func,
  /**
   * @ignore Passes in Micro component
   */
  Micro: PropTypes.func,
  /**
   * @ignore Passes in Feature component
   */
  Feature: PropTypes.func,
  /**
   * @ignore
   * Used to render dialog style on mobile devices instead of Popover
   * Brand 3.0 only
   */
  renderTooltipDialog: PropTypes.bool,
};

const defaultProps = {
  disabled: false,
  typographyType: 'body',
  viewport: 'desktop',
  typographySize: 'small',
  tooltipSize: 'small',
  Body: Body,
  Title: Title,
  Micro: Micro,
  Feature: Feature,
  iconFillColor: 'primary',
  renderTooltipDialog: true,
  surface: 'light',
  tooltipCloseButtonText: 'Close',
};

const ChildWrapper = styled.span`
  height: ${({ trailingElementHeight }) => trailingElementHeight};
  box-sizing: border-box;
  margin: 0;
  border: 0;
  padding: 0;
  display: inline-block;
`;

const TooltipContent = styled.span`
  font-weight: 400;
`;

const StyledSpan = styled.span`
  display: inline-block;
  outline: none;
`;

const InlineWrapper = styled.span`
  vertical-align: middle;
  font-size: ${({ tooltipSize }) =>
    tooltipSize === 'small' ? '1rem' : '1.25rem'};
`;

const InlineInnerWrapper = styled.span`
  vertical-align: middle;
  display: inline-block;
`;

function _formatChildren(childArray) {
  let textWithoutIcon = '';
  childArray.map((item, index) => {
    if (index !== childArray.length - 1) {
      textWithoutIcon += item + ' ';
    }
  });
  return textWithoutIcon;
}

function checkForNode(nodes) {
  let children =
    nodes.props && nodes.props.children
      ? ignoreFragments(nodes.props.children)
      : nodes;
  let lastIndex = children.length - 1, //number of last index in child array
    lastChild = children[lastIndex], //last child in child array
    isNode = typeof children[lastIndex] !== 'string', //if last child is node
    isString = typeof children === 'string', //if children are a string
    firstNodes = [];

  if (children.length === undefined || children.length <= 1)
    return { childArray: [], textWithIcon: children }; //if only one child put with caret and return

  if (isNode || !isString) {
    //if the last child is node or mixture put last with the caret
    children.map((child, index) => {
      //add all children to first nodes except the last one
      if (index !== lastIndex) firstNodes[index] = child;
    });
    return { childArray: firstNodes, textWithIcon: lastChild };
  }
  //if all children are "strings", put last word with caret
  let childArray = children.split(' ');
  let textWithIcon = childArray[childArray.length - 1];
  return {
    childArray: _formatChildren(childArray),
    textWithIcon: textWithIcon,
  };
}

const ignoreFragments = childrenArray => {
  if (!Array.isArray(childrenArray)) {
    return childrenArray;
  }
  return (
    childrenArray &&
    childrenArray
      .filter(child => typeof child !== 'boolean')
      .map(child => {
        if (child.type === React.Fragment) {
          return child.props.children instanceof Array
            ? child.props.children[0]
            : child.props.children;
        } else {
          return child;
        }
      })
  );
};

/**
 * this assigns the height of the trailing word + tooltip to the lineheight of the typography being used.
 * this approach is used because lineheight is ineffective on <span> elements.
 */
const _calcTrailingElementHeight = props => {
  const { typographyType: type, typographySize: size, viewport: vp } = props;
  if (type === 'micro') return TypographyTokens.lineheight.micro[16].value;
  if (type === 'body') {
    switch (size) {
      case 'medium':
        return TypographyTokens.lineheight.body[18].value;
      case 'large':
        return TypographyTokens.lineheight.body[20].value;
      case 'small':
      default:
        return TypographyTokens.lineheight.body[16].value;
    }
  }
  if (type === 'title') {
    switch (size) {
      case 'small':
        return vp === 'mobile'
          ? TypographyTokens.lineheight.title[20].value
          : TypographyTokens.lineheight.title[24].value;
      case 'large':
        return vp === 'mobile'
          ? TypographyTokens.lineheight.title[28].value
          : TypographyTokens.lineheight.title[36].value;
      case 'XLarge':
        return vp === 'mobile'
          ? TypographyTokens.lineheight.title[36].value
          : TypographyTokens.lineheight.title[48].value;
      case '2XLarge':
        return vp === 'mobile'
          ? TypographyTokens.lineheight.title[40].value
          : TypographyTokens.lineheight.title[64].value;
      case 'medium':
      default:
        return vp === 'mobile'
          ? TypographyTokens.lineheight.title[24].value
          : TypographyTokens.lineheight.title[28].value;
    }
  }
};

function _renderWithIcon(props) {
  const {
    children,
    tooltipSize,
    tooltipTitle,
    tooltipContent,
    tooltipButtonText,
    tooltipCloseButtonText,
    tooltip,
    typographySize,
    typographyType,
    surface,
    containerId,
    ariaLabel,
    iconFillColor,
    renderAnchorElement,
    disabled,
    renderTooltipDialog,
    ...rest
  } = props;
  let childArray = children ? checkForNode(children).childArray : [];
  let textWithIcon = children ? checkForNode(children).textWithIcon : '';
  const trailingElementHeight = _calcTrailingElementHeight(props);

  return (
    <Fragment>
      <StyledSpan>
        {childArray}
        <ChildWrapper trailingElementHeight={trailingElementHeight}>
          {textWithIcon}
          <InlineWrapper
            tooltipSize={tooltip && tooltip.size ? tooltip.size : tooltipSize}
          >
            <InlineInnerWrapper>
              <Tooltip
                {...rest}
                renderTooltipDialog={renderTooltipDialog}
                disabled={disabled}
                size={tooltip && tooltip.size ? tooltip.size : tooltipSize}
                title={tooltip && tooltip.title ? tooltip.title : tooltipTitle}
                closeButtonText={
                  tooltip && tooltip.closeButtonText
                    ? tooltip.closeButtonText
                    : tooltipButtonText !== undefined
                    ? tooltipButtonText
                    : tooltipCloseButtonText
                }
                surface={surface}
                containerId={
                  tooltip && tooltip.containerId
                    ? tooltip.containerId
                    : containerId
                }
                ariaLabel={
                  tooltip && tooltip.ariaLabel ? tooltip.ariaLabel : ariaLabel
                }
                iconFillColor={iconFillColor}
                renderAnchorElement={
                  tooltip && tooltip.renderAnchorElement
                    ? tooltip.renderAnchorElement
                    : renderAnchorElement
                }
              >
                <TooltipContent>
                  {tooltip && tooltip.children
                    ? tooltip.children
                    : tooltipContent}
                </TooltipContent>
              </Tooltip>
            </InlineInnerWrapper>
          </InlineWrapper>
        </ChildWrapper>
      </StyledSpan>
    </Fragment>
  );
}

function _calcTypographyComponent(props) {
  const { Body, Title, Micro, Feature, typographyType } = props;
  let comp = Body;
  if (typographyType === 'title') comp = Title;
  if (typographyType === 'body') comp = Body;
  if (typographyType === 'micro') comp = Micro;
  if (typographyType === 'feature') comp = Feature;
  return comp;
}

const TrailingTooltip = props => {
  const {
    typographyPrimitive,
    viewport,
    typographySize,
    bold,
    typographyColor,
    surface,
    id,
  } = props;

  const TypographyComponent = _calcTypographyComponent(props);

  const _getTypographyColor = () => {
    if (!typographyColor) {
      return ColorTokens.elements.primary[`on${surface}`].value;
    } else {
      return typographyColor;
    }
  };

  return (
    <TypographyComponent
      primitive={typographyPrimitive}
      viewport={viewport}
      size={typographySize}
      color={_getTypographyColor()}
      bold={bold}
      id={id}
    >
      {_renderWithIcon(props)}
    </TypographyComponent>
  );
};

TrailingTooltip.defaultProps = defaultProps;
TrailingTooltip.propTypes = propTypes;

export default withVDSManager(TrailingTooltip);
