import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import styled from 'styled-components';
import {
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  Cell,
} from './index';
import { VDSManager } from '@vds-core/utilities';

const StyledWrapper = styled.div`
  background-color: ${({ surface }) =>
    surface === 'dark' ? 'black' : 'white'};
  padding: 20px;
`;

const linesOptions = ['primary', 'secondary', 'none'];

storiesOf('Brand3.0/Tables', module)
  .addDecorator(withKnobs)

  .add('Table', () => {
    const surfaceKnob = select('surface', ['light', 'dark'], 'light');

    const bottomLineKnob = select('bottomLine', linesOptions, 'secondary');
    const headerBottomLineKnob = select(
      'bottomLine on header',
      [...linesOptions, ''],
      'primary'
    );
    const stripedKnob = boolean('striped', false);
    const paddingKnob = select('padding', ['standard', 'compact'], 'standard');
    const rowBottomLineKnob2 = select(
      'row 1 bottomLine',
      [...linesOptions, ''],
      ''
    );
    return (
      <VDSManager>
        <StyledWrapper surface={surfaceKnob}>
          <Table
            surface={surfaceKnob}
            bottomLine={bottomLineKnob}
            striped={stripedKnob}
            padding={paddingKnob}
          >
            <TableHead
              {...(!!headerBottomLineKnob && {
                bottomLine: headerBottomLineKnob,
              })}
            >
              <TableHeader>
                Lorem Ipsum on two lines to demonstrate how i behave.
              </TableHeader>
            </TableHead>
            <TableBody>
              <TableRow
                {...(rowBottomLineKnob2 && { bottomLine: rowBottomLineKnob2 })}
              >
                <Cell>Content goes here...</Cell>
                <Cell>
                  Lorem Ipsum on two lines to demonstrate how i behave
                </Cell>
                <Cell>Lorem</Cell>
              </TableRow>
              <TableRow>
                <Cell>Content goes here...</Cell>
                <Cell>
                  This is longer Content Goes Here Donec id elit non mi porta
                  gravida at eget metus.
                </Cell>
                <Cell>Lorem</Cell>
              </TableRow>
              <TableRow>
                <Cell>Content goes here...</Cell>
                <Cell>
                  This is longer Content Goes Here Donec id elit non mi porta
                  gravida at eget metus.
                </Cell>
                <Cell>Lorem</Cell>
              </TableRow>
              <TableRow>
                <Cell>Content goes here...</Cell>
                <Cell>
                  This is longer Content Goes Here Donec id elit non mi porta
                  gravida at eget metus.
                </Cell>
                <Cell>Lorem</Cell>
              </TableRow>
              <TableRow>
                <Cell>Content goes here...</Cell>
                <Cell>
                  This is longer Content Goes Here Donec id elit non mi porta
                  gravida at eget metus.
                </Cell>
                <Cell>Lorem</Cell>
              </TableRow>
            </TableBody>
          </Table>
        </StyledWrapper>
      </VDSManager>
    );
  });
