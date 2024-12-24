import React, { Fragment } from 'react';
import styled from 'styled-components';
import { calculateRem } from '@vds-core/utilities';
import { LayoutTokens } from '@vds-tokens/layout';
import { PaginationLink, PaginationListItem } from '../Controls';
import { sharedDefaultProps, sharedPropTypes } from '../utilities';

const heightPaginationNumber = '16px';
const minWidthPaginationNumber = '20px';

const PaginationNumbersContainer = styled(PaginationListItem)`
  display: flex;
  height: ${calculateRem(heightPaginationNumber)};
  justify-content: center;
  min-width: ${calculateRem(minWidthPaginationNumber)};

  ${({ index, startRange }) =>
    index !== startRange &&
    `margin-left: ${calculateRem(LayoutTokens.space['1X'].value)};`}
`;

const StyledSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  svg {
    margin-top: -1px;
  }
`;

/**
 * @ignore
 */
const PaginationNumbers = props => {
  const {
    total,
    selectedPage,
    baseUrl,
    selectPage,
    fixedWidth,
    surface,
    calculateRange,
    focusBorderRadius,
  } = props;

  const { startRange, endRange } = calculateRange(selectedPage, total);

  function _selected(page) {
    selectPage(page);
  }

  return (
    <Fragment>
      {Array.from({ length: total + 1 }, (v, i) => i).map((item, index) => {
        const isInRange =
          index >= startRange && index <= endRange && index !== 0;
        return (
          isInRange && (
            <PaginationNumbersContainer
              fixedWidth={fixedWidth}
              key={index}
              startRange={startRange}
              index={index}
            >
              <PaginationLink
                pageNumber={index}
                selectedPage={selectedPage}
                baseUrl={baseUrl}
                onClick={_selected}
                surface={surface}
                focusBorderRadius={focusBorderRadius}
                total={total}
              >
                <StyledSpan>{index}</StyledSpan>
              </PaginationLink>
            </PaginationNumbersContainer>
          )
        );
      })}
    </Fragment>
  );
};

PaginationNumbers.propTypes = sharedPropTypes;
PaginationNumbers.defaultProps = sharedDefaultProps;

export default PaginationNumbers;
