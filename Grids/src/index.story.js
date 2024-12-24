import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import { withKnobs, boolean, select, number } from '@storybook/addon-knobs';
import { VDSManager } from '@vds-core/utilities';
import { Grid, Col, Row } from './index';

const StyledCol = styled(Col)`
  //background-color: blue;
  color: white;
`;

const BoxContent = styled.div`
  position: relative;
  box-sizing: border-box;
  min-height: 1rem;
  background: lightGray;
  overflow: hidden;
  text-align: center;
  color: gray;
  padding: 2rem 0;
  white-space: nowrap;
`;

const StyledContainer = styled.div`
  width: 100%;
  max-width: 1272px;
  background-color: white;
  border: 1px solid #747676;
`;

storiesOf('Brand3.0/Grids', module)
  .addDecorator(withKnobs)

  .add('Grid', () => {
    const colOptions = {
      range: true,
      min: 1,
      max: 12,
      step: 1,
    };
    const expandedKnob = boolean('expanded', false);
    const colSizesKnobs = {
      mobile: number('mobile col span', 2, colOptions),
      ...(expandedKnob && {
        mobileLarge: number('mobileLarge col span', 2, colOptions),
      }),
      tablet: number('tablet col span', 2, colOptions),
      ...(expandedKnob && {
        tabletLarge: number('tabletLarge col span', 2, colOptions),
      }),
      desktop: number('desktop col span', 2, colOptions),
      ...(expandedKnob && {
        desktopLarge: number('desktopLarge col span', 2, colOptions),
        desktopXLarge: number('desktopXLarge col span', 2, colOptions),
      }),
    };

    const label = 'number of children';
    const defaultValue = 4;
    const options = {
      range: true,
      min: 1,
      max: 12,
      step: 1,
    };

    const gutterOpts = ['0px', '10px', '10%'];

    const numberOfOptions = number(label, defaultValue, options);
    function _renderOptions(row) {
      let options = Array.from({ length: numberOfOptions }).map(
        (item, index) => {
          const Row = `Row- + ${row}`;
          return (
            <StyledCol key={index + Row} colSizes={colSizesKnobs}>
              <BoxContent>{Row}</BoxContent>
            </StyledCol>
          );
        }
      );
      return options;
    }

    let viewportShow = boolean('custom viewport', false);

    return (
      <VDSManager>
        <StyledContainer>
          <Grid
            rowGutter={select('row gutter', gutterOpts, '10px')}
            expanded={expandedKnob}
            viewport={
              !viewportShow
                ? undefined
                : select(
                    'viewport',
                    [
                      'desktopXLarge',
                      'desktopLarge',
                      'desktop',
                      'tablet',
                      'mobile',
                    ],
                    'desktop'
                  )
            }
          >
            <Row>{_renderOptions(1)}</Row>
            <Row>{_renderOptions(2)}</Row>
            <Row>{_renderOptions(3)}</Row>
            <Row>{_renderOptions(4)}</Row>
          </Grid>
        </StyledContainer>
      </VDSManager>
    );
  })

  .add('Grid - custom col sizes', () => {
    const viewportKnob = select(
      'viewport',
      ['desktop', 'tablet', 'mobile'],
      'desktop'
    );
    const maxCols = {
      mobile: 1,
      mobileLarge: 1,
      tablet: 3,
      tabletLarge: 3,
      desktop: 3,
      desktopLarge: 3,
      desktopXLarge: 3,
    };
    function mapMax(viewportKnob) {
      return maxCols[viewportKnob];
    }
    const colOptions = {
      range: true,
      min: 1,
      max: mapMax(viewportKnob),
      step: 1,
    };
    const colSizesKnobs = {
      mobile: number('mobile col span', 3, colOptions),
      mobileLarge: number('mobile col span', 3, colOptions),
      tablet: number('tablet col span', 3, colOptions),
      tabletLarge: number('mobile col span', 3, colOptions),
      desktop: number('desktop col span', 3, colOptions),
      desktopLarge: number('desktop col span', 3, colOptions),
      desktopXLarge: number('desktop col span', 3, colOptions),
    };

    const bleedKnob = select(
      'bleed',
      ['1920', '1600', '1440', 'full', '1272'],
      '1440'
    );
    return (
      <VDSManager>
        <StyledContainer>
          <Grid
            viewport={viewportKnob}
            bleed={bleedKnob}
            expanded={boolean('expanded', false)}
          >
            <Row>
              <StyledCol colSizes={colSizesKnobs}>
                <BoxContent>1</BoxContent>
              </StyledCol>
              <StyledCol colSizes={colSizesKnobs}>
                <BoxContent>2</BoxContent>
              </StyledCol>
              <StyledCol colSizes={colSizesKnobs}>
                <BoxContent>3</BoxContent>
              </StyledCol>
              <StyledCol colSizes={colSizesKnobs}>
                <BoxContent>3</BoxContent>
              </StyledCol>
            </Row>
          </Grid>
        </StyledContainer>
      </VDSManager>
    );
  });
