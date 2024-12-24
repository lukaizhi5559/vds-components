import styled from 'styled-components';
import React from 'react';

const PhantomLinkWrapper = styled.div`
  display: ${({ isSelected, isDesktop }) =>
    isSelected && isDesktop ? 'inherit' : 'none'};
  opacity: 1;
  position: absolute;
  top: ${({ position }) => position && `${position.top + 17}px`};
  left: ${({ position }) => position && `${position.left}px`};
`;

// Link used for accessibility purposes, will be selected only on desktop
// and when the content is focused from the selected tab item on the left.
const PhantomLink = ({
  ctaLink,
  isDesktop,
  isSelected,
  getPosition,
  onMouseEnter,
  onMouseLeave,
  TextLinkCaret,
}) => {
  const singleLinkPos = isSelected && getPosition();

  return (
    isDesktop && (
      <PhantomLinkWrapper
        position={singleLinkPos}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        isSelected={isSelected}
        isDesktop={isDesktop}
      >
        <TextLinkCaret
          ariaHidden={isSelected}
          disabled={!isSelected}
          {...ctaLink}
        />
      </PhantomLinkWrapper>
    )
  );
};

export default PhantomLink;
