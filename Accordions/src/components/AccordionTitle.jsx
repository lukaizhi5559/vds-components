import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { calculateRem, getOS } from '@vds-core/utilities';
import { Title as CoreTitle } from '@vds-core/typography';
import { LayoutTokens } from '@vds-tokens/layout';
import { ColorTokens } from '@vds-tokens/color';

const propTypes = {
  /**
   * Children for the AccordionHeader can be any type.
   */
  children: PropTypes.node.isRequired,
  /**
   * If enabled, title will be rendered in bold
   */
  bold: PropTypes.bool,
  /**
   * @Ignore
   * Pass in a title component. Defaults to Title for 3.0 and Body for 1.0
   */
  typographyComponent: PropTypes.func,
  /**
   * @Ignore
   * Pass in a title component size. Small and large
   */
  typeSize: PropTypes.oneOf(['small', 'large']),
  /**
   * Set the styling of the component to the desktop, tablet, or mobile size based on passed prop. Desktop and tablet are the same size.
   */
  viewport: PropTypes.oneOf(['desktop', 'mobile', 'tablet']),
  /**
   * @ignore
   */
  surface: PropTypes.oneOf(['light', 'dark']),
  /**
   * Allows an id to be passed to the title of the accordion
   */
  id: PropTypes.string,
};

const defaultProps = {
  surface: 'light',
  bold: false,
  typographyComponent: CoreTitle,
  typeSize: 'small',
};

const TitleWrapper = styled.div`
  padding-bottom: ${calculateRem(LayoutTokens.space['1X'].value)};
`;

const AccordionTitle = props => {
  const {
    typeSize,
    typographyComponent,
    surface,
    bold,
    children,
    viewport,
    ...rest
  } = props;

  const AccordionHeaderStyled = typographyComponent;

  return (
    <TitleWrapper>
      <AccordionHeaderStyled
        {...rest}
        color={
          surface === 'dark'
            ? ColorTokens.elements.primary.ondark.value
            : ColorTokens.elements.primary.onlight.value
        }
        size={typeSize}
        viewport={viewport}
        bold={bold}
        tabIndex={getOS() !== 'ios' && getOS() !== 'android' ? -1 : undefined} // To prevent double reading in nvda
      >
        {children}
      </AccordionHeaderStyled>
    </TitleWrapper>
  );
};

AccordionTitle.propTypes = propTypes;
AccordionTitle.defaultProps = defaultProps;
AccordionTitle.displayName = 'AccordionTitle';

export default AccordionTitle;
