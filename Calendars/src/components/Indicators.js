import React from 'react';
import styled from 'styled-components';
import { calculateRem } from '@vds-core/utilities';
import { ColorTokens } from '@vds-tokens/color';
import { TypographyTokens } from '@vds-tokens/typography';
import { Fonts } from '@vds-core/typography';

const getFillColor = (type, surface, isSelected) => {
  switch (type) {
    case 1:
      return surface === 'dark'
        ? ColorTokens.elements.secondary[isSelected ? 'onlight' : 'ondark']
            .value
        : ColorTokens.elements.secondary[isSelected ? 'ondark' : 'onlight']
            .value;
    case 2:
      return 'none;';
    case 3:
      return surface === 'dark'
        ? `linear-gradient(180deg, transparent 50%, ${ColorTokens.elements.secondary[isSelected ? 'onlight' : 'ondark'].value} 50%);`
        : `linear-gradient(180deg, transparent 50%, ${ColorTokens.elements.secondary[isSelected ? 'ondark' : 'onlight'].value} 50%);`;
  }
};
const StyledIndicatorWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  height: ${calculateRem(10)};
  padding-top: ${calculateRem(2)};
`;

const IndicatorOverallWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const Indicator = styled.span`
  border: ${({ surface, isSelected }) =>
    surface === 'dark'
      ? `${calculateRem(1)} solid ${
          ColorTokens.elements.secondary[isSelected ? 'onlight' : 'ondark']
            .value
        }`
      : `${calculateRem(1)} solid ${
          ColorTokens.elements.secondary[isSelected ? 'ondark' : 'onlight']
            .value
        }`};
  background: ${({ type, surface, isSelected }) =>
    getFillColor(type, surface, isSelected)};
  box-sizing: border-box;
  height: ${calculateRem(8)};
  width: ${calculateRem(8)};
  border-radius: 50%;
  margin: 0 ${calculateRem(1)};
  display: inline-block;
`;

export const LegendWrapper = styled.div`
  padding: 0 ${calculateRem(14)};
  max-width: 100%;
  max-height: 100%;
  box-sizing: border-box;
  line-height: 1.15;
  > span:last-child {
    padding-right: 0;
  }
`;

export const Legend = styled.span`
  padding-right: ${calculateRem(16)};
  max-width: 100%;
  overflow-x: hidden;
  white-space: nowrap;
  box-sizing: border-box;
  color: ${({ surface }) =>
    surface === 'dark'
      ? ColorTokens.elements.primary.ondark.value
      : ColorTokens.elements.primary.onlight.value};
  box-sizing: content-box;
  font-size: ${calculateRem(TypographyTokens.fontsize.body[12].value)};
  font-family: ${Fonts.VerizonNHGeTX};
  font-weight: ${TypographyTokens.fontweight.regular.value};
  //line-height: ${calculateRem(TypographyTokens.lineheight.body[16].value)};
  span {
    white-space: normal;
  }
  &:before {
    content: '';
    border: ${({ surface }) =>
      surface === 'dark'
        ? `${calculateRem(1)} solid ${
            ColorTokens.elements.secondary.ondark.value
          }`
        : `${calculateRem(1)} solid ${
            ColorTokens.elements.secondary.onlight.value
          }`};
    background: ${({ type, surface }) => getFillColor(type, surface)};
    box-sizing: border-box;
    height: ${calculateRem(8)};
    width: ${calculateRem(8)};
    border-radius: 50%;
    margin-right: ${calculateRem(8)};
    display: inline-block;
  }
`;

export const LegendContainer = styled.div`
  display: flex;
  align-items: flex-end;
  height: ${calculateRem(36)};
  overflow-y: hidden;
  padding-top: ${calculateRem(4)};
`;

export const IndicatorWrapper = props => (
  <IndicatorOverallWrapper>
    <StyledIndicatorWrapper>{props.children}</StyledIndicatorWrapper>
  </IndicatorOverallWrapper>
);
