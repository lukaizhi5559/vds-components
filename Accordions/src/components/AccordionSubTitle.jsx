import React from 'react';
import PropTypes from 'prop-types';
import { getOS } from '@vds-core/utilities';
import { Body as CoreBody } from '@vds-core/typography';
import { ColorTokens } from '@vds-tokens/color';

const propTypes = {
  /**
   * Children for the AccordionTitle can be any type.
   */
  children: PropTypes.node.isRequired,
  /**
   * @ignore
   * Pass in a subtitle component. Defaults to Body
   */
  typographyComponent: PropTypes.func,
  /**
   * @Ignore
   * Pass in a subtitle component size. Defaults to Body small 3.0
   */
  typeSize: PropTypes.oneOf(['small', 'large']),
  /**
   * Set the styling of the component to the desktop, tablet, or mobile size based on passed prop.
   * Desktop and tablet are the same size.
   */
  viewport: PropTypes.oneOf(['desktop', 'mobile', 'tablet']),
  /**
   * @ignore
   * primaryColor option for 1.0. Defaults to secondary for 3.0
   */
  primaryColor: PropTypes.bool,
  /**
   * @ignore
   */
  surface: PropTypes.oneOf(['light', 'dark']),
};

const defaultProps = {
  surface: 'light',
  typographyComponent: CoreBody,
  primaryColor: false,
};

const AccordionSubTitle = props => {
  const {
    typeSize,
    typographyComponent,
    viewport,
    children,
    surface,
    primaryColor,
    ...rest
  } = props;

  const AccordionSubTitleStyled = typographyComponent;

  const isMobile = viewport === 'mobile';

  const _getBodySize = () => {
    if (typeSize) return typeSize; // Defaults to large for 1.0

    return isMobile ? 'small' : 'large'; // 3.0
  };

  const _getBodyColor = () => {
    // use primary color if 1.0
    if (primaryColor) {
      return surface === 'dark'
        ? ColorTokens.elements.primary.ondark.value
        : ColorTokens.elements.primary.onlight.value;
    }
    return surface === 'dark'
      ? ColorTokens.elements.secondary.ondark.value
      : ColorTokens.elements.secondary.onlight.value;
  };

  return (
    <AccordionSubTitleStyled
      surface={surface}
      viewport={viewport}
      color={_getBodyColor()}
      size={_getBodySize()}
      tabIndex={getOS() !== 'ios' && getOS() !== 'android' ? -1 : undefined} // To prevent double reading in nvda
      {...rest}
    >
      {children}
    </AccordionSubTitleStyled>
  );
};

AccordionSubTitle.propTypes = propTypes;
AccordionSubTitle.defaultProps = defaultProps;
AccordionSubTitle.displayName = 'AccordionSubTitle';

export default AccordionSubTitle;
