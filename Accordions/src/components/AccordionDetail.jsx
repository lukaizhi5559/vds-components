import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components';
import { calculateRem, getOS } from '@vds-core/utilities';
import { Fonts } from '@vds-core/typography';
import AccordionAnimation from '../util/AccordionAnimation';
import { ColorTokens } from '@vds-tokens/color';
import { TypographyTokens } from '@vds-tokens/typography';
import { LayoutTokens } from '@vds-tokens/layout';

const PADDING_DEFAULT_MOBILE = LayoutTokens.space['6X'].value; // 24px
const PADDING_DEFAULT_NON_MOBILE = LayoutTokens.space['8X'].value; // 32px

const SlideOutContent = keyframes`
  from {
    transform: translateY(0px);
  }

  to {
    transform: translateY(-16px);
  }
`;

const SlideInContent = keyframes`
  from {
    transform: translateY(-20px);
  }

  to {
    transform: translateY(0px);
  }
`;

const _calcPaddingBottom = viewport => {
  const isMobile = viewport === 'mobile';
  return isMobile ? PADDING_DEFAULT_MOBILE : PADDING_DEFAULT_NON_MOBILE;
};

const propTypes = {
  /**
   * @ignore
   */
  opened: PropTypes.bool,
  /**
   * @ignore
   */
  children: PropTypes.node.isRequired,
  /**
   * @ignore
   */
  groupId: PropTypes.string,
  /**
   * @ignore
   */
  surface: PropTypes.oneOf(['light', 'dark']),
  /**
   * @ignore
   */
  viewport: PropTypes.oneOf(['mobile', 'desktop', 'tablet']),
  /**
   * @ignore
   */
  paddingTop: PropTypes.number,
  /**
   * @ignore
   * Typography styles for children passed in the component
   * Defaults to false for 3.0
   */
  customChildrenTypography: PropTypes.bool,
  /**
   * @ignore
   * Function to render padding bottom when accordion is opened
   */
  calcPaddingBottom: PropTypes.func,
};

const defaultProps = {
  opened: false,
  surface: 'light',
  groupId: null,
  viewport: 'desktop',
  //1.0,
  paddingTop: 6,
  calcPaddingBottom: _calcPaddingBottom,
};

const _getBodySize = (viewport, customChildrenTypography) => {
  const isMobile = viewport === 'mobile';

  if (customChildrenTypography) {
    return TypographyTokens.fontsize.body[16].value;
  }

  return isMobile
    ? TypographyTokens.fontsize.body[12].value
    : TypographyTokens.fontsize.body[16].value;
};

const _getBodyLineHeight = (viewport, customChildrenTypography) => {
  const isMobile = viewport === 'mobile';

  if (customChildrenTypography) {
    return TypographyTokens.lineheight.body[20].value;
  }

  return isMobile
    ? TypographyTokens.lineheight.body[16].value
    : TypographyTokens.lineheight.body[20].value;
};

const _getFontFamily = (viewport, customChildrenTypography) => {
  const isMobile = viewport === 'mobile';

  if (customChildrenTypography) return Fonts.VerizonNHGeDS;

  return isMobile ? Fonts.VerizonNHGeTX : Fonts.VerizonNHGeDS;
};

const ChildWrapper = styled.div`
  ${({ opened }) =>
    css`
      transition: padding 350ms ease;
      animation-name: ${opened ? SlideInContent : SlideOutContent};
      animation-duration: 350ms;
      animation-delay: 100ms;
      animation-timing-function: ease;
    `};
`;

const StyledAccordionDetail = styled.div`
  padding-top: ${({ opened, paddingTop }) =>
    opened ? calculateRem(paddingTop) : 0};
  color: ${({ surface }) =>
    surface === 'dark'
      ? ColorTokens.elements.primary.ondark.value
      : ColorTokens.elements.primary.onlight.value};
  ${({ viewport, customChildrenTypography }) => css`
    font-family: ${_getFontFamily(viewport, customChildrenTypography)};
    font-size: ${calculateRem(
      _getBodySize(viewport, customChildrenTypography)
    )};
    ${viewport !== 'mobile' &&
      `
      letter-spacing: ${calculateRem(
        TypographyTokens.letterspacing.wide.value
      )};`};
    line-height: ${calculateRem(
      _getBodyLineHeight(viewport, customChildrenTypography)
    )};
  `}
  word-wrap: break-word;
  overflow-wrap: break-word;
  transition: padding 350ms;
  > * {
    margin: 0;
    &:not(:last-child) {
      margin-bottom: ${calculateRem(8)};
    }
  }
  &:active,
  &:hover {
    outline: none;
  }
  ${({ opened, paddingBottom }) =>
    opened &&
    `
    padding-bottom: ${calculateRem(paddingBottom)};
    padding-top: 0;
  `};
`;

class AccordionDetail extends Component {
  static componentType = 'AccordionDetail';

  isAndroidDevice = (() =>
    typeof navigator !== 'undefined' &&
    navigator.userAgent.toLowerCase().indexOf('android') > -1)();
  isIos = getOS() === 'ios';
  componentDidMount() {
    const { groupId } = this.props;
    this.accordionDetailId = `accordionDetail_${groupId}`;
    this.accordionAliasId = `accordionHeaderLabel_${groupId}`;
  }

  render() {
    const {
      opened,
      children,
      groupId,
      surface,
      viewport,
      paddingTop,
      customChildrenTypography,
      calcPaddingBottom,
    } = this.props;

    const height = opened ? 'auto' : 0;
    return (
      <StyledAccordionDetail
        viewport={viewport}
        opened={opened}
        surface={surface}
        id={this.accordionDetailId}
        aria-labelledby={this.accordionAliasId}
        onClick={this._onClick}
        paddingTop={paddingTop}
        tabIndex={this.isIos || opened ? undefined : -1}
        role="region"
        aria-hidden={!opened && !this.isIos}
        customChildrenTypography={customChildrenTypography}
        paddingBottom={calcPaddingBottom(viewport)}
      >
        <AccordionAnimation height={height} opened={opened}>
          <ChildWrapper opened={opened}>{children}</ChildWrapper>
        </AccordionAnimation>
      </StyledAccordionDetail>
    );
  }
}

AccordionDetail.propTypes = propTypes;
AccordionDetail.defaultProps = defaultProps;

export default AccordionDetail;
