import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Body } from '@vds-core/typography';
import { ColorTokens } from '@vds-tokens/color';
import { LayoutTokens } from '@vds-tokens/layout';

const propTypes = {
  selected: PropTypes.bool,
  children: PropTypes.string.isRequired,
};

const defaultProps = {
  selected: false,
};

const StyledBreadcrumbSpan = styled(Body)`
  cursor: default;
  transition: color 0.15s ease-out;
  padding-bottom: ${LayoutTokens.space['3X'].value};
`;

/**
 * @ignore
 */
const BreadcrumbSpan = ({
  selected,
  children,
  surface,
  ariaLabel,
  'data-analyticstrack': analyticsTrack,
  'data-track': track,
  'data-track-ignore': trackIgnore,
  'data-clickstream': clickStream,
}) => {
  function color() {
    if (selected && surface !== 'dark')
      return ColorTokens.elements.primary.onlight.value;
    else if (selected && surface === 'dark')
      return ColorTokens.elements.primary.ondark.value;
    else
      return surface === 'dark'
        ? ColorTokens.elements.secondary.ondark.value
        : ColorTokens.elements.secondary.onlight.value;
  }

  return (
    <StyledBreadcrumbSpan
      bold={selected}
      aria-label={ariaLabel}
      aria-selected={selected}
      aria-current={selected ? 'page' : null}
      selected={selected}
      primitive="span"
      size="small"
      color={color()}
      data-analyticstrack={analyticsTrack}
      data-track={track}
      data-track-ignore={trackIgnore}
      data-clickstream={clickStream}
    >
      {children}
    </StyledBreadcrumbSpan>
  );
};

BreadcrumbSpan.propTypes = propTypes;
BreadcrumbSpan.defaultProps = defaultProps;

export default BreadcrumbSpan;
