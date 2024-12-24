import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import {
  withKnobs,
  text,
  select,
  boolean,
  number,
} from '@storybook/addon-knobs';
import {
  TitleLockup,
  TitleLockupTitle,
  TitleLockupSubtitle,
  TitleLockupEyebrow,
  RedText,
} from '.';
import { ColorTokens } from '@vds-tokens/color';
import { VDSManager } from '@vds-core/utilities';

const InvertedBackground = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  padding: 20px;
  background: ${({ surface, disabled }) =>
    surface === 'dark'
      ? ColorTokens.palette.black.value
      : ColorTokens.palette.white.value};
`;

const surfaceOptions = ['light', 'dark'];

storiesOf('Brand3.0/TypeLockups', module)
  .addDecorator(withKnobs)

  .add('TitleLockup', () => {
    const titleSizeList = select(
      'Title Size',
      [
        'bodySmall',
        'bodyMedium',
        'bodyLarge',
        'titleSmall',
        'titleMedium',
        'titleLarge',
        'titleXLarge',
        'title2XLarge',
        'featureXSmall',
        'featureSmall',
        'featureMedium',
      ],
      'titleLarge'
    );

    const listBody = ['bodySmall', 'bodyMedium', 'bodyLarge'];
    const listOne = ['bodySmall', 'bodyMedium', 'bodyLarge', 'titleSmall'];
    const listTwo = ['titleMedium', 'bodyLarge'];
    const listThree = ['bodyLarge', 'titleMedium', 'titleLarge'];
    const listFour = ['titleLarge', 'titleMedium', 'bodyLarge'];
    const listFive = ['bodyLarge', 'bodyMedium', 'titleMedium'];
    const listSix = ['titleLarge', 'titleXLarge', 'bodyLarge'];
    const listSeven = ['titleLarge', 'bodyLarge'];
    const listEight = ['bodySmall', 'bodyMedium'];
    const listNine = ['bodyLarge', 'bodySmall', 'bodyMedium', 'titleMedium'];
    const listTen = ['bodyLarge', 'bodySmall', 'bodyMedium', 'titleSmall'];

    function _determineDesktopSize() {
      switch (titleSizeList) {
        case 'bodySmall':
        case 'bodyMedium':
        case 'bodyLarge':
          return [titleSizeList];
        case 'titleSmall':
          return listOne;
        case 'titleMedium':
          return listBody;
        case 'titleLarge':
          return listTen;
        case 'titleXLarge':
          return listTwo;
        case 'title2XLarge':
        case 'featureXSmall':
          return listThree;
        default:
          return listFour;
      }
    }

    function _determineMobileSize() {
      switch (titleSizeList) {
        case 'bodySmall':
        case 'bodyMedium':
        case 'bodyLarge':
          return [titleSizeList];
        case 'titleSmall':
          return listEight;
        case 'titleMedium':
        case 'titleLarge':
          return listBody;
        case 'titleXLarge':
          return listNine;
        case 'title2XLarge':
        case 'featureXSmall':
          return listFive;
        case 'featureSmall':
          return listSeven;
        case 'featureMedium':
          return listSix;
      }
    }

    let desktopSize = _determineDesktopSize();
    let mobileMobile = _determineMobileSize();

    const viewportKnob = select('Viewport', ['mobile', 'desktop'], 'desktop');

    const mobileSizeSelect =
      viewportKnob === 'mobile' &&
      select(
        'subtitle/eyebrow size',
        _determineMobileSize(),
        mobileMobile[0],
        (onchange = sizeSelect = select('subtitle/eyebrow size', []))
      );
    const desktopSizeSelect =
      viewportKnob !== 'mobile' &&
      select(
        'subtitle/eyebrow size',
        _determineDesktopSize(),
        desktopSize[0],
        (onchange = sizeSelect = select('subtitle/eyebrow size', []))
      );

    let sizeSelect =
      viewportKnob === 'mobile' ? mobileSizeSelect : desktopSizeSelect;

    const textAlignment = select('Text Alignment', ['left', 'center']);

    const boldTitle = boolean('Title Bold', true);

    const boldEyebrow = boolean('Eyebrow Bold', false);

    const surfaceKnob = select('surface', surfaceOptions, 'light');

    const subtitleColor = select(
      'Subtitle Color',
      ['primary', 'secondary'],
      'primary'
    );

    return (
      <VDSManager>
        <InvertedBackground surface={surfaceKnob} />
        <TitleLockup
          textAlignment={textAlignment}
          surface={surfaceKnob}
          viewport={viewportKnob}
        >
          <TitleLockupEyebrow bold={boldEyebrow} size={sizeSelect}>
            Today only.
          </TitleLockupEyebrow>
          <TitleLockupTitle bold={boldTitle} size={titleSizeList}>
            And get more of our best
          </TitleLockupTitle>
          <TitleLockupSubtitle color={subtitleColor}>
            Get both of our best and pay less. Pair 5G Home Internet with
            Verizon mobile to save every month.
          </TitleLockupSubtitle>
        </TitleLockup>
      </VDSManager>
    );
  })

  .add('TitleLockup - Tooltip', () => {
    const titleSizeList = select(
      'Title Size',
      [
        'bodySmall',
        'bodyMedium',
        'bodyLarge',
        'titleSmall',
        'titleMedium',
        'titleLarge',
        'titleXLarge',
        'title2XLarge',
        'featureXSmall',
        'featureSmall',
        'featureMedium',
      ],
      'titleLarge'
    );

    const listBody = ['bodyLarge', 'bodySmall', 'bodyMedium'];
    const listOne = ['bodyLarge', 'bodySmall', 'bodyMedium', 'titleSmall'];
    const listTwo = ['titleMedium', 'bodyLarge'];
    const listThree = ['titleMedium', 'titleLarge', 'bodyLarge'];
    const listFour = ['titleLarge', 'titleMedium', 'bodyLarge'];
    const listFive = ['bodyLarge', 'bodyMedium', 'titleMedium'];
    const listSix = ['titleLarge', 'titleXLarge', 'bodyLarge'];
    const listSeven = ['titleLarge', 'bodyLarge'];
    const listEight = ['bodySmall', 'bodyMedium'];
    const listNine = ['bodyLarge', 'bodySmall', 'bodyMedium', 'titleMedium'];

    function _determineDesktopSize() {
      switch (titleSizeList) {
        case 'bodySmall':
        case 'bodyMedium':
        case 'bodyLarge':
          return [titleSizeList];
        case 'titleSmall':
        case 'titleMedium':
          return listBody;
        case 'titleLarge':
          return listOne;
        case 'titleXLarge':
          return listTwo;
        case 'title2XLarge':
        case 'featureXSmall':
          return listThree;
        default:
          return listFour;
      }
    }

    function _determineMobileSize() {
      switch (titleSizeList) {
        case 'bodySmall':
        case 'bodyMedium':
        case 'bodyLarge':
          return [titleSizeList];
        case 'titleSmall':
          return listEight;
        case 'titleMedium':
        case 'titleLarge':
          return listBody;
        case 'titleXLarge':
          return listNine;
        case 'title2XLarge':
        case 'featureXSmall':
          return listFive;
        case 'featureSmall':
          return listSeven;
        case 'featureMedium':
          return listSix;
      }
    }

    let desktopSize = _determineDesktopSize();
    let mobileMobile = _determineMobileSize();

    const viewportKnob = select('Viewport', ['mobile', 'desktop'], 'desktop');

    const mobileSizeSelect =
      viewportKnob === 'mobile' &&
      select(
        'subtitle/eyebrow size',
        _determineMobileSize(),
        mobileMobile[0],
        (onchange = sizeSelect = select('subtitle/eyebrow size', []))
      );
    const desktopSizeSelect =
      viewportKnob !== 'mobile' &&
      select(
        'subtitle/eyebrow size',
        _determineDesktopSize(),
        desktopSize[0],
        (onchange = sizeSelect = select('subtitle/eyebrow size', []))
      );

    let sizeSelect =
      viewportKnob === 'mobile' ? mobileSizeSelect : desktopSizeSelect;

    const textAlignment = select('Text Alignment', ['left', 'center']);

    const boldTitle = boolean('Title Bold', true);

    const boldEyebrow = boolean('Eyebrow Bold', false);

    const surfaceKnob = select('surface', surfaceOptions, 'light');

    const subtitleColor = select(
      'Subtitle Color',
      ['primary', 'secondary'],
      'primary'
    );

    return (
      <VDSManager>
        <InvertedBackground surface={surfaceKnob} />
        <div id="containerId">
          <TitleLockup
            textAlignment={textAlignment}
            surface={surfaceKnob}
            viewport={viewportKnob}
          >
            <TitleLockupEyebrow
              bold={boldEyebrow}
              size={sizeSelect}
              tooltip={{
                title: 'Eyebrow Tooltip',
                children: 'Tooltip content',
                closeButtonText: 'close',
              }}
            >
              Today only.
            </TitleLockupEyebrow>
            <TitleLockupTitle
              bold={boldTitle}
              size={titleSizeList}
              tooltip={{
                title: 'Title Tooltip',
                children: 'Tooltip content',
                closeButtonText: 'close',
                containerId: 'containerId',
              }}
            >
              And get more of our best
            </TitleLockupTitle>
            <TitleLockupSubtitle
              color={subtitleColor}
              size={sizeSelect}
              tooltip={{
                title: 'Subtitle Tooltip',
                children: 'Tooltip content',
                closeButtonText: 'close',
              }}
            >
              Get both of our best and pay less. Pair 5G Home Internet with
              Verizon mobile to save every month.
            </TitleLockupSubtitle>
          </TitleLockup>
        </div>
      </VDSManager>
    );
  })

  .add('TitleLockupEyebrow', () => {
    const sizeList = select('Size', [
      'bodySmall',
      'bodyMedium',
      'bodyLarge',
      'titleSmall',
      'titleMedium',
      'titleLarge',
    ]);
    const surfaceKnob = select('surface', surfaceOptions, 'light');
    const boldEyebrow = boolean('Eyebrow Bold', false);

    return (
      <VDSManager>
        <InvertedBackground surface={surfaceKnob} />
        <TitleLockupEyebrow
          size={sizeList}
          bold={boldEyebrow}
          surface={surfaceKnob}
        >
          TitleLockup Eyebrow
        </TitleLockupEyebrow>
      </VDSManager>
    );
  })

  .add('TitleLockupTitle', () => {
    const sizeList = select('Size', [
      'bodySmall',
      'bodyMedium',
      'bodyLarge',
      'titleSmall',
      'titleMedium',
      'titleLarge',
      'titleXLarge',
      'title2XLarge',
      'featureXSmall',
      'featureSmall',
      'featureMedium',
    ]);
    const surfaceKnob = select('surface', surfaceOptions, 'light');
    return (
      <VDSManager>
        <InvertedBackground surface={surfaceKnob} />
        <TitleLockupTitle size={sizeList} surface={surfaceKnob}>
          TitleLockup Title{' '}
        </TitleLockupTitle>
      </VDSManager>
    );
  })

  .add('TitleLockupSubtitle', () => {
    const sizeList = select('Size', [
      'bodySmall',
      'bodyMedium',
      'bodyLarge',
      'titleSmall',
      'titleMedium',
      'titleLarge',
    ]);
    const surfaceKnob = select('surface', surfaceOptions, 'light');
    return (
      <InvertedBackground surface={surfaceKnob}>
        <TitleLockupSubtitle size={sizeList} surface={surfaceKnob}>
          TitleLockup Subtitle
        </TitleLockupSubtitle>
      </InvertedBackground>
    );
  });
