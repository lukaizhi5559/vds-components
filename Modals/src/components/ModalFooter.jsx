import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { calculateRem } from '@vds-core/utilities';
import { ButtonGroup } from '@vds-core/buttons';

const propTypes = {
  /**
   * String, React components or HTML elements that will be rendered in the ModalBody.
   */
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.node,
  ]),
  /**
   * Primary and Close button data for modal button group
   */
  buttonData: PropTypes.shape({
    primary: PropTypes.shape({
      children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
      onClick: PropTypes.func,
      disabled: PropTypes.bool,
      ariaLabel: PropTypes.string,
      width: PropTypes.string,
      'data-analyticstrack': PropTypes.string,
      'data-track': PropTypes.string,
      'data-track-ignore': PropTypes.string,
      'data-clickstream': PropTypes.string,
    }),
    close: PropTypes.shape({
      children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
      onClick: PropTypes.func,
      disabled: PropTypes.bool,
      ariaLabel: PropTypes.string,
      width: PropTypes.string,
      'data-analyticstrack': PropTypes.string,
      'data-track': PropTypes.string,
      'data-track-ignore': PropTypes.string,
      'data-clickstream': PropTypes.string,
    }),
  }),
  /**
   * @ignore
   */
  toggleModal: PropTypes.func,
  /**
   * @ignore
   */
  ButtonGroup: PropTypes.func,
  /**
   * @ignore
   * Prop is cloned in Modal
   */
  fullWidthContent: PropTypes.bool,
};

const defaultProps = {
  toggleModal: () => {},
  ButtonGroup: ButtonGroup,
};

const StyledFooter = styled.div.attrs({
  'data-testid': 'modal-footer',
})`
  display: 'flex';
  width: 100%;
  flex-shrink: 0;
  ${({ fullWidthContent }) => fullWidthContent && 'box-sizing: border-box;'};
  padding: ${({ viewport, fullWidthContent }) =>
    viewport === 'mobile'
      ? calculateRem(48, 0, 16, 1)
      : fullWidthContent
      ? calculateRem(48, 4, 4, 4) // Add 4px to padding-right and left to account fo hover + focusring when content is fullwidth
      : calculateRem(48, 0, 4, 2)};

  /* Override Button group bottom padding */
  @media (min-width: 767px) {
    div {
      padding-bottom: 0 !important;
    }
  }
  order: ${({ closeButton, footerIndex, isMobileDevice }) =>
    closeButton === null && isMobileDevice && footerIndex};
`;

const ModalFooter = props => {
  const {
    buttonData,
    viewport,
    surface,
    toggleModal,
    ButtonGroup,
    closeButton, // To fix a screenreader issue on mobile
    footerIndex, // To fix a screenreader issue on mobile
    isMobileDevice, // To fix a screenreader issue on mobile
    fullWidthContent,
  } = props;
  const closeButtonFn = (function() {
    if (!buttonData || !buttonData.close) return false;

    const closeModal = (action = () => {}) => {
      if (toggleModal && typeof toggleModal === 'function') toggleModal();
      action();
    };

    const { children, onClick, ...rest } = buttonData.close;
    return {
      children: children,
      size: 'large',
      use: 'secondary',
      onClick: () => closeModal(onClick),
      noVerticalPadding: true,
      surface: surface,
      ...(viewport === 'mobile' && { width: '100%' }),
      ...rest,
    };
  })();

  const button = (function() {
    if (!buttonData || !buttonData.primary) return false;

    const { children, onClick, ...rest } = buttonData.primary;
    return {
      children: children,
      size: 'large',
      use: 'primary',
      onClick: onClick || (() => {}),
      noVerticalPadding: !closeButtonFn,
      surface: surface,
      ...(viewport === 'mobile' && { width: '100%' }),
      ...rest,
    };
  })();

  const buttonArray = [];
  if (button) buttonArray.push(button);
  if (closeButtonFn) buttonArray.push(closeButtonFn);

  const children = React.Children.map(props.children, (child, index) => {
    if (
      child &&
      React.isValidElement(child) &&
      child.type &&
      child.type.displayName === 'Button' &&
      child.props &&
      child.props.close
    ) {
      const closeModal = e => {
        child.props.onClick && child.props.onClick(e);
        toggleModal();
      };

      return React.cloneElement(child, {
        onClick: e => closeModal(e),
        key: index + 1,
      });
    } else {
      return child;
    }
  });

  return (
    <StyledFooter
      closeButton={closeButton ? closeButton['closeButton'] : null}
      footerIndex={footerIndex ? footerIndex['footerIndex'] : null}
      isMobileDevice={isMobileDevice ? isMobileDevice['isMobileDevice'] : null}
      fullWidthContent={fullWidthContent}
    >
      {children}
      {buttonArray && !!buttonArray.length && buttonArray.length > 0 && (
        <ButtonGroup
          viewport={viewport}
          rowQuantity={{
            mobile: 1,
            tablet: viewport === 'mobile' ? 1 : 2,
            desktop: viewport === 'mobile' ? 1 : 2,
          }}
          data={buttonArray}
          surface={surface}
          childWidth={'100%'}
        />
      )}
    </StyledFooter>
  );
};

ModalFooter.propTypes = propTypes;
ModalFooter.defaultProps = defaultProps;
ModalFooter.displayName = 'ModalFooter';

export default ModalFooter;
