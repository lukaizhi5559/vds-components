import React from 'react';
import styled from 'styled-components';
import { ButtonIcon } from '@vds-core/button-icons';
import Close from '@vds-core/icons/close';
import { checkIfMobileDevice } from '@vds-core/utilities';

const CloseButtonContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  button {
    ${({ viewport }) =>
      viewport === 'mobile'
        ? `&:hover {
      box-shadow: 0 0 0 0.5rem rgba(111, 113, 113, 0.06);
    }`
        : ``}

    ${({ viewport }) =>
      viewport === 'mobile'
        ? `&:hover:active {
      box-shadow: 0 0 0 0.5rem rgba(111, 113, 113, 0.06);
    }`
        : ``}

    ${({ viewport }) =>
      viewport === 'mobile'
        ? `:focus:not(:hover)::before {
        width: calc(100% + 0.75rem);
       height: calc(100% + 0.75rem);
    }`
        : ``}
  }
`;

const NotificationClose = props => {
  const {
    cta,
    level,
    position,
    dataTrack,
    id,
    surface,
    isFirstFocus,
    viewport,
    controlFunc,
  } = props;

  const _isMobileDevice = checkIfMobileDevice();
  return (
    <CloseButtonContainer viewport={viewport}>
      <ButtonIcon
        kind="ghost"
        size={viewport === 'mobile' ? '16px' : 'small'}
        surface={surface}
        id={id}
        focusBorderPosition="outside"
        fitToIcon={true}
        ariaLabel={
          _isMobileDevice && isFirstFocus
            ? 'Notification Close button'
            : 'Notification Close'
        }
        {...(_isMobileDevice && isFirstFocus && { 'aria-live': 'polite' })}
        data-testid="Notification-close-button"
        data-sitecat-level={level}
        data-sitecat-cta={cta}
        data-sitecat-datatrack={dataTrack}
        data-sitecat-position={position}
        renderIcon={props => (
          <Close {...props} size={viewport === 'mobile' ? 16 : 20} />
        )}
        onClick={e => controlFunc(e)}
      />
    </CloseButtonContainer>
  );
};

export default NotificationClose;
