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
import { TileContainer, Tilelet, TileletGroup, TileletCarousel } from './index';
import { ColorTokens } from '@vds-tokens/color';
import { tileletCarouselData, tileData } from './data';
import { Grid, Row, Col } from '@vds-core/grids';
import { Toggle } from '@vds-core/toggles';

const InvertedBackground = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -11;
  background: ${({ surfaceKnob }) =>
    surfaceKnob === 'dark'
      ? ColorTokens.palette.black.value
      : ColorTokens.palette.white.value};
`;

const CarouselWrapper = styled.div`
  border: 1px dashed ${ColorTokens.palette.blue38.value};
  width: 100%;
  max-width: 1274px; // plus 2px for the border
  display: flex;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  box-sizing: border-box;
`;

const Wrapper = styled.div`
  width: 500px;
`;

const onClickButton = e => {
  alert('Tiles are fun!');
  if (e.type === 'click' && e.detail !== 0) {
    e.currentTarget.blur();
  }
};

storiesOf('Brand3.0/Tiles', module)
  .addDecorator(withKnobs)

  .add('Tile Container', () => {
    const clickable = boolean('clickable', true);
    const paddingKnob = text('Padding', '20px');
    const customColorKnob = boolean('Custon background color', false);

    const backgroundColorKnob = customColorKnob
      ? text('Background Color hex', '#000000')
      : select('Background Color list', ['gray', 'white', 'black'], 'white');

    const customHeightKnob = boolean('Custom Height', false);

    const heightKnob = customHeightKnob ? text('Height', '80px') : undefined;

    const widthKnob = text('Width', '166px');

    const ratioOptionKnob =
      customHeightKnob === false &&
      select(
        'Aspect Ratio',
        ['2:1', '16:9', '3:2', '4:3', '1:2', '9:16', '2:3', '3:4', '1:1'],
        '1:1'
      );
    const surfaceKnob = select('Surface color', ['light', 'dark'], 'light');

    const backgroundImageKnob = boolean('Background Image', false);
    const showBorderKnob = boolean('Show Border', true);

    const ToggleWrapper = styled.div`
      pointer-events: auto;
    `;

    return (
      <Wrapper>
        <InvertedBackground surfaceKnob={surfaceKnob} />
        <TileContainer
          onClick={e => console.log(e.target, 'clicked the tile')}
          padding={paddingKnob}
          width={widthKnob}
          height={heightKnob}
          aspectRatio={ratioOptionKnob}
          // onClick={clickable ? onClickButton : undefined}
          backgroundColor={backgroundColorKnob}
          surface={surfaceKnob}
          showBorder={showBorderKnob}
          backgroundImage={
            backgroundImageKnob === true
              ? 'https://ss7.vzw.com/is/image/VerizonWireless/black-test'
              : undefined
          }
        >
          <ToggleWrapper>
            <Toggle
              onClick={e => console.log(e, 'hhhhh')}
              value="toggle"
              onChange={e => {
                e.stopPropagation();
                console.log(e.target, 'clicked the toggle');
              }}
            />
          </ToggleWrapper>{' '}
          h ifsgi sfig sfigfig
        </TileContainer>
      </Wrapper>
    );
  })

  .add('Tilelet', () => {
    const clickable = boolean('clickable', true);
    const paddingKnob = text('Padding', '20px');
    const customColorKnob = boolean('Custon background color', false);

    const backgroundColorKnob = customColorKnob
      ? text('Background Color hex', '#000000')
      : select(
          'Background Color list',
          ['gray', 'white', 'black', ''],
          'white'
        );

    const customHeightKnob = boolean('Custom Height', false);

    const heightKnob = customHeightKnob ? text('Height', '80px') : undefined;

    const widthKnob = text('Width', '300px');

    const ratioOptionKnob =
      customHeightKnob === false &&
      select(
        'Aspect Ratio',
        ['2:1', '16:9', '3:2', '4:3', '1:2', '9:16', '2:3', '3:4', '1:1'],
        '1:1'
      );
    const surfaceKnob = select('Surface color', ['light', 'dark'], 'light');

    const backgroundImageKnob = boolean('Background Image', false);

    const showBorderKnob = boolean('Show Border', true);

    const directionalIconSizeKnob = select(
      'Directional Icon Size',
      ['small', 'medium', 'large'],
      'medium'
    );

    const descriptiveIconSizeKnob = select(
      'Descriptive Icon Size',
      ['small', 'medium', 'large', 'XLarge'],
      'medium'
    );
    const viewportKnob = select('Viewport', ['mobile', 'desktop'], 'desktop');
    // START - TitleLockup data and pairing
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
      ],
      'bodyLarge'
    );

    const TileletTitleTextData = {
      size: titleSizeList,
      primitive: 'h1',
      children: 'Lorem',
      bold: boolean('title bold', true),
      tooltip: {
        title: 'Title Tooltip',
        children: 'Tooltip content',
        closeButtonText: 'close',
      },
    };

    const listBody = ['bodySmall', 'bodyMedium', 'bodyLarge'];
    const _determineDesktopSize = () => {
      switch (titleSizeList) {
        case 'bodySmall':
        case 'bodyMedium':
        case 'bodyLarge':
          return [titleSizeList];
        case 'titleSmall':
        case 'titleMedium':
          return listBody;
        case 'titleLarge':
          return ['bodyLarge', 'bodySmall', 'bodyMedium', 'titleSmall'];
        case 'titleXLarge':
          return ['titleMedium', 'bodyLarge'];
      }
    };
    const _determineMobileSize = () => {
      switch (titleSizeList) {
        case 'bodySmall':
        case 'bodyMedium':
        case 'bodyLarge':
          return [titleSizeList];
        case 'titleSmall':
          return ['bodySmall', 'bodyMedium'];
        case 'titleMedium':
        case 'titleLarge':
          return listBody;
        case 'titleXLarge':
          return ['bodyLarge', 'bodySmall', 'bodyMedium', 'titleMedium'];
      }
    };

    let desktopSize = _determineDesktopSize();
    let mobileMobile = _determineMobileSize();

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

    const subtitleColorKnob = select(
      'Subtitle color',
      ['secondary', 'primary'],
      'primary'
    );
    const eyeBrowBoldKnob = boolean('eyeBrow Bold', false);
    // END - TitleLockup data and pairing

    const DirectionalIconKnob = boolean('DirectionalIcon Knob', false);
    const DescriptiveIconKnob = boolean('DescriptiveIcon Knob', false);
    const BadgeKnob = boolean('Badge', false);
    const DirectionalIconData = {
      size: directionalIconSizeKnob,
    };

    const DescriptiveIconData = {
      size: descriptiveIconSizeKnob,
    };

    const BadgeData = {
      children: text('Badge Text', 'This is a badge!'),
      fillColor: 'red',
      maxWidth: text('Badge - maxWidth', ''),
      numberOfLines: text('Badge - numberOfLines', ''),
    };

    return (
      <Wrapper>
        <InvertedBackground surfaceKnob={surfaceKnob} />
        <Tilelet
          width={widthKnob}
          height={heightKnob}
          aspectRatio={ratioOptionKnob}
          //onClick={clickable ? onClickButton : undefined}
          href="https://www.verizon.com/"
          backgroundColor={
            backgroundColorKnob === '' ? undefined : backgroundColorKnob
          }
          surface={surfaceKnob}
          showBorder={showBorderKnob}
          eyebrow={{
            size: sizeSelect,
            primitive: 'h2',
            children: 'Lorem ipsum',
            bold: eyeBrowBoldKnob,
            tooltip: {
              title: 'Eyebrow Tooltip',
              children: 'Tooltip content',
              closeButtonText: 'close',
            },
          }}
          title={TileletTitleTextData}
          subtitle={{
            size: sizeSelect,
            color: subtitleColorKnob,
            primitive: 'h2',
            children: 'Lorem ipsum dolor sit amet, consec',
            tooltip: {
              title: 'Subtitle Tooltip',
              children: 'Tooltip content',
              closeButtonText: 'close',
            },
          }}
          directionalIcon={
            DirectionalIconKnob ? DirectionalIconData : undefined
          }
          descriptiveIcon={
            DescriptiveIconKnob ? DescriptiveIconData : undefined
          }
          badge={BadgeKnob ? BadgeData : undefined}
          innerPadding="32px"
          textAlignment={select('text alignment', ['left', 'center'], 'left')}
          textPosition={select(
            'text position',
            ['top', 'middle', 'bottom'],
            'bottom'
          )}
          backgroundImage={
            backgroundImageKnob === true
              ? 'https://ss7.vzw.com/is/image/VerizonWireless/black-test'
              : undefined
          }
          viewport={viewportKnob}
        />
      </Wrapper>
    );
  })

  .add('Tilelet Group', () => {
    const dataArray = [
      {
        // href: 'https://www.verizon.com/',
        backgroundColor: 'white',
        showBorder: true,
        eyebrow: {
          size: 'titleSmall',
          children: `Claim offers`,
          tooltip: {
            title: 'Eyebrow Tooltip',
            children: 'Tooltip content',
            closeButtonText: 'close',
          },
        },
        title: {
          size: 'titleLarge',
          children: 'Manage claimed offers',
          tooltip: {
            title: 'Title Tooltip',
            children: 'Tooltip content',
            closeButtonText: 'close',
          },
        },
        subtitle: {
          size: 'titleSmall',
          children: '$150',
          tooltip: {
            title: 'Subtitle Tooltip',
            children: 'Tooltip content',
            closeButtonText: 'close',
          },
        },
        directionalIcon: {
          size: 'medium',
        },
      },
      {
        // onClick: () => {},
        backgroundColor: 'black',

        title: {
          size: 'titleLarge',
          children: 'Manage your apps and add-ons',
          surface: 'dark',
        },
        directionalIcon: {
          size: 'medium',
          surface: 'dark',
        },
      },
      {
        onClick: () => {},
        backgroundColor: 'gray',

        title: {
          size: 'titleLarge',
          children: 'Use your Verizon Dollars',
        },
        subtitle: {
          size: 'titleSmall',
          children: '$150',
        },
        directionalIcon: {
          size: 'medium',
        },
      },
      {
        onClick: () => {},
        backgroundColor: 'gray',
        surface: 'dark',
        title: {
          size: 'titleLarge',
          children: 'Manage your TravelPass days',
        },
        subtitle: {
          size: 'titleSmall',
          children: '5 days',
        },
        directionalIcon: {
          size: 'medium',
        },
      },
      {
        backgroundImage:
          'https://ss7.vzw.com/is/image/VerizonWireless/white-test-2',
        onClick: () => {},
        title: {
          size: 'titleLarge',
          children: '$40 off Belkin earbuds',
        },
        subtitle: {
          size: 'bodySmall',
          children: 'Expires in 2 days,',
        },
      },
      {
        backgroundImage:
          'https://ss7.vzw.com/is/image/VerizonWireless/black-test',
        onClick: () => {},
        surface: 'dark',
        title: {
          size: 'titleLarge',
          children: '$10 off Selected Accessories',
          surface: 'dark',
        },
        subtitle: {
          size: 'bodySmall',
          children: 'Expires in 10 days,',
          surface: 'dark',
        },
      },
      {
        backgroundImage:
          'https://ss7.vzw.com/is/image/VerizonWireless/white-test-2',
        onClick: () => {},
        textPosition: 'bottom',
        title: {
          size: 'titleLarge',
          children: '$40 off Belkin earbuds',
        },
        subtitle: {
          size: 'bodySmall',
          children: 'Expires in 2 days,',
        },
        badge: {
          children: 'Included',
          display: 'inline',
        },
      },
      {
        backgroundImage:
          'https://ss7.vzw.com/is/image/VerizonWireless/black-test',
        onClick: () => {},
        textPosition: 'bottom',
        surface: 'dark',
        title: {
          size: 'titleLarge',
          children: '$10 off Selected Accessories',
          surface: 'dark',
        },
        subtitle: {
          size: 'bodySmall',
          children: 'Expires in 10 days,',
          surface: 'dark',
        },
        badge: {
          children: 'Included',
          maxWidth: 'auto',
          numberOfLines: 2,
          display: 'inline',
        },
      },
    ];

    const rowQuantityKnob = number('Row Quantity', 3);

    const viewportKnob = select(
      'Viewport',
      ['mobile', 'tablet', 'desktop'],
      'desktop'
    );

    const gutterWidthKnob =
      viewportKnob !== 'mobile' &&
      select('Gutter Width', ['24px', '40px'], '40px');

    const ratioOptionKnob = select(
      'Aspect Ratio',
      ['2:1', '16:9', '3:2', '4:3', '1:2', '9:16', '2:3', '3:4', '1:1'],
      '1:1'
    );

    return (
      <TileletGroup
        data={dataArray}
        rowQuantity={rowQuantityKnob === 0 ? undefined : rowQuantityKnob}
        gutterWidth={gutterWidthKnob}
        aspectRatio={ratioOptionKnob}
      />
    );
  })

  .add('Tilelet Carousel', () => {
    const viewportKnob = select(
      'Viewport',
      ['mobile', 'tablet', 'desktop'],
      'desktop'
    );
    const layoutOptions = [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
    ];
    const tilesDataOptions = {
      range: true,
      min: 1,
      max: 12,
      step: 1,
    };
    const numTiles = number('Number of Tiles', 12, tilesDataOptions);
    const surfaceKnob = select('Surface', ['light', 'dark'], 'light');
    const paginationKindKnob = select(
      'Pagination Kind',
      ['ghost', 'lowContrast', 'highContrast'],
      'lowContrast'
    );
    const hidePaginationBorderKnob = boolean('hidePaginationBorder', true);
    const paginationFloatKnob = boolean('Pagination float', true);
    const paginationInsetKnob = text('Pagination inset', '12px');
    const paginationDisplayKnob = select(
      'Pagination display',
      ['onHover', 'persistent', 'none'],
      'onHover'
    );
    const layoutKnob = select('Layout', layoutOptions, '3');
    const ratioOptionKnob = select(
      'Aspect Ratio',
      ['2:1', '16:9', '3:2', '4:3', '1:2', '9:16', '2:3', '3:4', '1:1', 'none'],
      '3:2'
    );
    const gutterKnob = select('Gutter', ['12px', '24px', '44px'], '24px');
    const peekKnob = select(
      'Peek',
      ['standard', 'minimum', 'none'],
      'standard'
    );
    const scrollBehaviorKnob = select(
      'Scroll Behavior',
      ['snap', 'normal'],
      'snap'
    );

    const viewportOverride = boolean('Viewport override', false);

    const viewportOverrideData = {
      mobile: {
        layout: '1',
        aspectRatio: '2:3',
        peek: 'minimum',
        paginationDisplay: 'persistent',
      },
      mobileLarge: {
        layout: '1',
        aspectRatio: '2:3',
        peek: 'minimum',
      },
      tablet: {
        layout: '2',
        gutter: '24px',
      },
      tabletLarge: {
        layout: '2',
        gutter: '24px',
      },
      desktop: {
        layout: '3',
        gutter: '24px',
      },
      desktopLarge: {
        layout: '4',
        gutter: '12px',
      },
      desktopXLarge: {
        layout: '5',
        gutter: '12px',
      },
    };

    const newData =
      numTiles === 12
        ? [...tileletCarouselData]
        : [...tileletCarouselData].slice(0, numTiles - 1);

    const GridComponent = (
      <Grid
        bleed="1272"
        gutterWidth="24px"
        colSizes={{
          mobile: 4,
          tablet: 1,
          desktop: 1,
        }}
      >
        <Row>
          <Col>
            <div
              style={{
                height: '50px',
                width: '100%',
                backgroundColor: '#0077B4',
              }}
            />
          </Col>
          <Col>
            <div
              style={{
                height: '50px',
                width: '100%',
                backgroundColor: '#0077B4',
              }}
            />
          </Col>
          <Col>
            <div
              style={{
                height: '50px',
                width: '100%',
                backgroundColor: '#0077B4',
              }}
            />
          </Col>
          <Col>
            <div
              style={{
                height: '50px',
                width: '100%',
                backgroundColor: '#0077B4',
              }}
            />
          </Col>
          <Col>
            <div
              style={{
                height: '50px',
                width: '100%',
                backgroundColor: '#0077B4',
              }}
            />
          </Col>
          <Col>
            <div
              style={{
                height: '50px',
                width: '100%',
                backgroundColor: '#0077B4',
              }}
            />
          </Col>
          <Col>
            <div
              style={{
                height: '50px',
                width: '100%',
                backgroundColor: '#0077B4',
              }}
            />
          </Col>
          <Col>
            <div
              style={{
                height: '50px',
                width: '100%',
                backgroundColor: '#0077B4',
              }}
            />
          </Col>
          <Col>
            <div
              style={{
                height: '50px',
                width: '100%',
                backgroundColor: '#0077B4',
              }}
            />
          </Col>
          <Col>
            <div
              style={{
                height: '50px',
                width: '100%',
                backgroundColor: '#0077B4',
              }}
            />
          </Col>
          <Col>
            <div
              style={{
                height: '50px',
                width: '100%',
                backgroundColor: '#0077B4',
              }}
            />
          </Col>
          <Col>
            <div
              style={{
                height: '50px',
                width: '100%',
                backgroundColor: '#0077B4',
              }}
            />
          </Col>
        </Row>
      </Grid>
    );

    return (
      <>
        <InvertedBackground surfaceKnob={surfaceKnob} />
        <>
          <CarouselWrapper>
            <TileletCarousel
              layout={layoutKnob}
              gutter={gutterKnob}
              peek={peekKnob}
              data={newData}
              scrollBehavior={scrollBehaviorKnob}
              surface={surfaceKnob}
              pagination={{
                kind: paginationKindKnob,
                hideBorder: hidePaginationBorderKnob,
                floating: paginationFloatKnob,
              }}
              paginationInset={paginationInsetKnob}
              paginationDisplay={paginationDisplayKnob}
              aspectRatio={ratioOptionKnob}
              viewport={viewportKnob}
              viewportOverride={
                viewportOverride ? viewportOverrideData : undefined
              }
            />
          </CarouselWrapper>
          {/* {GridComponent} */}
          <CarouselWrapper>
            <TileletCarousel
              viewport={viewportKnob}
              layout={layoutKnob}
              gutter={gutterKnob}
              // peek={peekKnob}
              peek="minimum"
              data={newData}
              scrollBehavior={scrollBehaviorKnob}
              surface={surfaceKnob}
              paginationInset={paginationInsetKnob}
              paginationDisplay={paginationDisplayKnob}
              aspectRatio={ratioOptionKnob}
              viewportOverride={
                viewportOverride ? viewportOverrideData : undefined
              }
              pagination={{
                kind: paginationKindKnob,
                hideBorder: hidePaginationBorderKnob,
                floating: paginationFloatKnob,
              }}
            />
          </CarouselWrapper>
          {/* {GridComponent} */}
          <CarouselWrapper>
            <TileletCarousel
              layout={layoutKnob}
              gutter={gutterKnob}
              // peek={peekKnob}
              peek="none"
              viewport={viewportKnob}
              data={newData}
              scrollBehavior={scrollBehaviorKnob}
              surface={surfaceKnob}
              paginationInset={paginationInsetKnob}
              paginationDisplay={paginationDisplayKnob}
              aspectRatio={ratioOptionKnob}
              viewportOverride={
                viewportOverride ? viewportOverrideData : undefined
              }
              pagination={{
                kind: paginationKindKnob,
                hideBorder: hidePaginationBorderKnob,
                floating: paginationFloatKnob,
              }}
            />
          </CarouselWrapper>
          {/* {GridComponent} */}
        </>
      </>
    );
  });
