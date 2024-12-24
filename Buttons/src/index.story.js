import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  select,
  boolean,
  text,
  number,
} from '@storybook/addon-knobs';
import { TextLink, TextLinkCaret, Button, ButtonGroup } from '.';
import { calculateRem } from '@uie/javascript-style-helpers';
import { Fonts } from '@vds-core/typography';
import { TypographyTokens } from '@vds-tokens/typography';
import { VDSManager } from '@vds-core/utilities';

const onClickButton = e => {
  alert('You pressed a button!');
  if (e.type === 'click' && e.detail !== 0) {
    e.currentTarget.blur();
  }
};
const onClickLink = e => {
  alert('You clicked a link to go somewhere!');
  if (e.type === 'click' && e.detail !== 0) {
    e.currentTarget.blur();
  }
};

const InvertedBackground = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  background: ${({ surface, disabled }) =>
    surface === 'dark' ? 'black' : 'white'};
`;

const ParentDiv = styled.span`
  display: block;
  color: ${({ surface, disabled }) => (surface === 'dark' ? 'white' : 'black')};
  font-size: ${calculateRem(TypographyTokens.fontsize.title[32].value)};
  font-family: ${Fonts.VerizonNHGeDS};
  font-weight: ${TypographyTokens.fontweight.regular.value};
  line-height: ${calculateRem(TypographyTokens.lineheight.title[36].value)};
  padding-bottom: ${calculateRem(20)};
`;

storiesOf('Brand3.0/Buttons', module)
  .addDecorator(withKnobs)

  .add('Button', () => {
    const useOptions = ['primary', 'secondary'];
    const sizeOptions = ['small', 'large'];
    const surfaceOptions = ['light', 'dark'];
    const surfaceKnob = select('surface', surfaceOptions, 'light');
    const displayOptions = ['flex', 'inline-block', 'block'];
    const marginOptions = ['auto', 'autoTight', '200px', '300px'];
    return (
      <React.Fragment>
        <InvertedBackground surface={surfaceKnob} />
        <Button
          // href="www.verizon.com"
          size={select('size', sizeOptions, 'large')}
          use={select('use', useOptions, 'primary')}
          display={select('display', displayOptions, 'flex')}
          width={text('width', 'auto')}
          disabled={boolean('disabled', false)}
          surface={surfaceKnob}
          onClick={onClickButton}
        >
          {text('label', 'Button')}
        </Button>
      </React.Fragment>
    );
  })

  .add('ButtonGroup', () => {
    const viewportOptions = [
      'desktopXLarge',
      'desktopLarge',
      'desktop',
      'tabletLarge',
      'tablet',
      'mobileLarge',
      'mobile',
    ];
    const buttonSizeOptions = ['large', 'small'];
    const alignmentOptions = ['left', 'right', 'center'];
    const surfaceOptions = ['light', 'dark'];
    const surfaceKnob = select('surface', surfaceOptions, 'light');
    const rowQuantityVals = {
      mobile: 1,
      tablet: 2,
      desktop: 3,
    };
    const options = [1, 2, 3];
    const childOptions = {
      range: true,
      min: 1,
      max: 8,
      step: 1,
    };

    const mobileRowQuantity = number('mobileRowQuantity', 1);
    const mobileLargeRowQuantity = number('mobileLargeRowQuantity', 1);
    const tabletRowQuantity = number('tabletRowQuantity', 2);
    const tabletLargeRowQuantity = number('tabletLargeRowQuantity', 2);
    const desktopRowQuantity = number('desktopRowQuantity', 3);
    const desktopLargeRowQuantity = number('desktopLargeRowQuantity', 4);
    const desktopXLargeRowQuantity = number('desktopXLargeRowQuantity', 5);

    let childLength = number('number of children', 4, childOptions),
      data = [];
    for (var i = 0; i < childLength; i++) {
      //Even return cancel
      if (i % 2 == 0) {
        data.push({
          children: 'Cancel',
          size: select('buttonSize', buttonSizeOptions, 'large'),
          use: 'secondary',
          onClick: () => alert('hi you activated me'),
          width: text(`button width ${i + 1}`, 'auto'),
        });
      } else {
        data.push({
          children: 'Submit',
          size: select('buttonSize', buttonSizeOptions, 'large'),
          use: 'primary',
          onClick: () => alert('hi you activated me'),
          width: text(`button width ${i + 1}`, 'auto'),
        });
      }
    }

    data = [
      ...data,
      {
        children: 'TextLink',
        size: select('buttonSize', buttonSizeOptions, 'large'),
        use: 'textLinkCaret',
        onClick: () => alert('hi you activated me'),
      },
      {
        children: 'TextLink',
        size: select('buttonSize', buttonSizeOptions, 'large'),
        use: 'textLink',
        onClick: () => alert('hi you activated me'),
      },
      {
        children: 'TextLink',
        size: select('buttonSize', buttonSizeOptions, 'large'),
        use: 'textLink',
        onClick: () => alert('hi you activated me'),
      },
    ];

    return (
      <div>
        <VDSManager />
        <InvertedBackground surface={surfaceKnob} />
        <ButtonGroup
          childWidth={text('group childWidth', 'auto')}
          surface={surfaceKnob}
          viewport={select('viewport', viewportOptions, 'desktop')}
          rowQuantity={{
            mobile: mobileRowQuantity,
            mobileLarge: mobileLargeRowQuantity,
            tablet: tabletRowQuantity,
            tabletLarge: tabletLargeRowQuantity,
            desktop: desktopRowQuantity,
            desktopLarge: desktopLargeRowQuantity,
            desktopXLarge: desktopXLargeRowQuantity,
          }}
          data={data}
          alignment={select('alignment', alignmentOptions, 'center')}
        />
      </div>
    );
  })

  .add('TextLink', () => {
    const viewportOptions = ['desktop', 'tablet', 'mobile'];
    const surfaceOptions = ['light', 'dark'];
    const roleOptions = ['link', 'button'];
    const disabledKnob = boolean('disabled', false);
    const surfaceKnob = select('surface', surfaceOptions, 'light');
    const typeKnob = select('type', ['inline', 'standAlone'], 'inline');
    const linkSizes = ['small', 'large'];
    const roleKnob = select('role', roleOptions, 'link');
    return (
      <React.Fragment>
        <InvertedBackground disabled={disabledKnob} surface={surfaceKnob} />
        {typeKnob === 'standAlone' && (
          <TextLink
            // href={'http://www.verizon.com'}
            size={select('size', linkSizes, 'large')}
            type="standAlone"
            viewport={select('viewport', viewportOptions, 'desktop')}
            onClick={onClickLink}
            surface={surfaceKnob}
            disabled={boolean('disabled', false)}
            children={text('text', '  Take me there!')}
            bold={boolean('bold', false)}
            role={roleKnob}
            ariaLabel={text('ariaLabel', ' take me there!')}
          />
        )}
        {typeKnob !== 'standAlone' && (
          <ParentDiv
            surface={surfaceKnob}
            disabled={boolean('disabled', false)}
          >
            {'Click here to go to verizon,  '}
            <TextLink
              //href={'http://www.verizon.com'}
              type="inline"
              onClick={onClickLink}
              surface={surfaceKnob}
              disabled={boolean('disabled', false)}
              children={text('text', '  Take me there!')}
              bold={boolean('bold', false)}
              role={roleKnob}
              ariaLabel={text('ariaLabel', ' take me there!')}
            />
            &nbsp;
            {'that can be inline with text'}
          </ParentDiv>
        )}
      </React.Fragment>
    );
  })

  .add('TextLinkCaret', () => {
    const viewportOptions = ['desktop', 'tablet', 'mobile'];
    const directions = ['left', 'right'];
    const surfaceOptions = ['light', 'dark'];
    const iconPositionOptions = ['left', 'right'];
    const roleOptions = ['link', 'button'];
    const disabledKnob = boolean('disabled', false);
    const surfaceKnob = select('surface', surfaceOptions, 'light');
    const iconPositionKnob = select(
      'iconPosition',
      iconPositionOptions,
      'right'
    );
    const roleKnob = select('role', roleOptions, 'link');
    const textKnob = text('text', 'Call to action');
    return (
      <React.Fragment>
        <InvertedBackground surface={surfaceKnob} />
        <TextLinkCaret
          onClick={() => {}}
          surface={surfaceKnob}
          role={roleKnob}
          iconPosition={iconPositionKnob}
          disabled={boolean('disabled', false)}
        >
          {textKnob}
        </TextLinkCaret>
      </React.Fragment>
    );
  });
