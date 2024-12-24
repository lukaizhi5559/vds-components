import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { calculateRem } from '@vds-core/utilities';
import { ColorTokens } from '@vds-tokens/color';

const propTypes = {
  /**
   * @ignore
   */
  surface: PropTypes.oneOf(['light', 'dark']),
  /**
   * @ignore
   */
  carousel: PropTypes.bool,
  /**
   * @ignore
   */
  aspectRatio: PropTypes.string,
  /**
   * @ignore
   */
  flexBasis: PropTypes.string,
  /**
   * @ignore
   */
  minWidth: PropTypes.number,
  /**
   * @ignore
   */
  children: PropTypes.node,
};

const defaultProps = {
  aspectRatio: '100%',
  surface: 'light',
  carousel: false,
};

const CardWrapper = styled.div`
  display: flex;
  background-color: ${({ surface }) =>
    surface === 'dark'
      ? ColorTokens.palette.black.value
      : ColorTokens.palette.white.value};
  flex-grow: 1;
`;

const AspectRatioWrapper = styled.div`
  position: relative;
  height: 0px;
  padding-top: ${({ aspectRatio }) => aspectRatio};
  width: 100%;
`;

const Wrapper = styled.div`
  display: block;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  border: ${calculateRem(1)} solid
    ${({ surface }) =>
      surface === 'dark'
        ? ColorTokens.palette.white.value
        : ColorTokens.elements.lowcontrast.onlight.value};
  box-sizing: border-box;
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

const AspectRatio = props => {
  const { flexBasis, surface, carousel, aspectRatio, children } = props;

  return (
    <CardWrapper surface={surface} carousel={carousel}>
      <AspectRatioWrapper aspectRatio={aspectRatio}>
        <Wrapper surface={surface}>
          <Items>{children}</Items>
        </Wrapper>
      </AspectRatioWrapper>
    </CardWrapper>
  );
};

AspectRatio.propTypes = propTypes;
AspectRatio.defaultProps = defaultProps;

export default AspectRatio;
