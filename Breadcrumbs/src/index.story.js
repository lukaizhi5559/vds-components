import React from 'react';
import styled from 'styled-components';
import { ColorTokens } from '@vds-tokens/color';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import { Breadcrumbs, BreadcrumbItem } from './index';

const urlString = 'https://www.verizonwireless.com/';
const surfaceOptions = ['light', 'dark'];

const InvertedBackground = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  background: ${({ surface }) =>
    surface === 'dark'
      ? ColorTokens.background.primary.dark.value
      : ColorTokens.background.primary.light.value};
`;

storiesOf('Brand3.0/Breadcrumbs', module)
  .addDecorator(withKnobs)
  .add('Breadcrumbs', () => {
    const surfaceOptionsKnob = select('surface', surfaceOptions, 'light');

    return (
      <InvertedBackground surface={surfaceOptionsKnob}>
        <Breadcrumbs surface={surfaceOptionsKnob}>
          <BreadcrumbItem ariaLabel="Go to Home" href={urlString}>
            {text('label - Crumb 1', 'Home')}
          </BreadcrumbItem>
          <BreadcrumbItem ariaLabel="Go to Support" href={urlString}>
            Support
          </BreadcrumbItem>
          <BreadcrumbItem ariaLabel="Go to Services & Apps" href={urlString}>
            Services & Apps
          </BreadcrumbItem>
          <BreadcrumbItem ariaLabel="Go to My Verizon" href={urlString}>
            My Verizon
          </BreadcrumbItem>
          <BreadcrumbItem ariaLabel="Go to Bill" href={urlString}>
            Bill
          </BreadcrumbItem>
          <BreadcrumbItem
            ariaLabel="Go to Billing statement FAQs"
            href={urlString}
          >
            Billing statement FAQs
          </BreadcrumbItem>
        </Breadcrumbs>
      </InvertedBackground>
    );
  });
