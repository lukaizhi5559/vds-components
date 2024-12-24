import React from 'react';
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';
import { withKnobs, number, boolean, select } from '@storybook/addon-knobs';
import styled from 'styled-components';
import { CarouselBars } from './index';
import { CarouselScrubber, Carousel } from './index';
import { CarouselIndicator } from './index';
import { Tilelet } from '@vds-core/tiles';
import { Title, Body } from '@vds-core/typography';

const TRACK_WIDTH = 96;
const surfaceOptions = ['light', 'dark'];

const options = {
  range: true,
  min: 1,
  max: 10,
  step: 1,
};

const scrubberOptions = {
  range: true,
  min: 0,
  max: TRACK_WIDTH,
  step: 0.5,
};

const Container = styled.div`
  position: absolute;
  top: 0.15rem;
  ul {
    padding: 1rem 2rem;
    margin: 0;
  }
`;

const ScrubberContainer = styled.div`
  height: 20px;
  display: flex;
`;

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

const CustomTile = styled.div`
  background: #d8dada;
  border-radius: 8px;
  padding: 16px;
  width: ${({ width }) => (width ? width : 'fit-content')};
  height: ${({ height }) => (height ? height : 'auto')};
`;

const _getSetCanFocus = focus =>
  focus && alert('Setting focus on the first visible slide.');

storiesOf('Brand3.0/Carousels', module)
  .addDecorator(withKnobs)

  .add(
    'CarouselBars',
    withState({ selectedSlide: 0 })(({ store }) => {
      const surfaceKnob = select('surface', surfaceOptions, 'light');

      const alertAndSelect = slide => {
        store.set({ selectedSlide: slide });
      };

      return (
        <React.Fragment>
          <InvertedBackground surface={surfaceKnob} />
          <Container>
            <CarouselIndicator
              // {...data}
              type="bars"
              focusState
              uniqueId="vds-carousel-bars-id"
              onChange={alertAndSelect}
              slideCount={number('slideCount', 3, options)}
              selectedSlide={number(
                'selectedSlide',
                store.state.selectedSlide,
                options
              )}
              surface={surfaceKnob}
              ariaLabel="Storybook Carousel"
              getSetCanFocus={_getSetCanFocus}
            />
          </Container>
        </React.Fragment>
      );
    })
  )

  .add(
    'Carousel Scrollbar',
    withState({ position: 0, right: 0 })(({ store }) => {
      const layoutOptions = ['1UP', '2UP', '3UP', '4UP', '5UP', '6UP', '8UP'];
      const surfaceKnob = select('surface', ['light', 'dark'], 'light');
      const numTilesKnob = number('numberOfSlides', 12);
      const layoutKnob = select('layout', layoutOptions, '3UP');
      const scrubberWidth = (parseInt(layoutKnob) / numTilesKnob) * TRACK_WIDTH;
      const scrubberOptions = {
        range: true,
        min: 0,
        max: TRACK_WIDTH - scrubberWidth,
        step: 1,
      };
      // (this.props.tilesVisible / this.props.numberOfTiles) * TRACK_WIDTH;
      const positionKnob = number(
        'position',
        store.state.position,
        scrubberOptions
      );
      const _onMoveForward = () => {
        if (
          store.state.position + scrubberWidth <=
          TRACK_WIDTH - scrubberWidth
        ) {
          store.set({ position: store.state.position + scrubberWidth });
        } else if (
          store.state.position + scrubberWidth >
          TRACK_WIDTH - scrubberWidth
        ) {
          store.set({
            position:
              store.state.position +
              (TRACK_WIDTH - scrubberWidth - store.state.position),
          });
        }
      };

      const _onMoveBackward = () => {
        if (store.state.position - scrubberWidth > 0) {
          store.set({ position: store.state.position - scrubberWidth });
        } else if (store.state.position - scrubberWidth <= 0) {
          store.set({ position: 0 });
        }
      };

      return (
        <React.Fragment>
          <InvertedBackground surface={surfaceKnob} />
          <ScrubberContainer>
            <CarouselScrubber
              surface={surfaceKnob}
              numberOfSlides={numTilesKnob}
              layout={layoutKnob}
              position={positionKnob / (TRACK_WIDTH - scrubberWidth)}
              scrubberCanFocus
              onMoveBackward={_onMoveBackward}
              onMoveForward={_onMoveForward}
              // enableThumbAnimation
              // getSetCanFocus={_getSetCanFocus}
              onScrubberDrag={dragPosition =>
                store.set({
                  position: dragPosition * (TRACK_WIDTH - scrubberWidth),
                })
              }
            />
          </ScrubberContainer>
        </React.Fragment>
      );
    })
  )
  .add('Carousel - with custom tile', () => {
    const slotVerticalAlignments = ['top', 'middle', 'bottom'];

    const slotHorizontalAlignments = ['left', 'center', 'right'];

    const slotVerticalAlignmentKnob = select(
      'slotAlignment vertical',
      slotVerticalAlignments,
      'top'
    );

    const slotHorizontalAlignmentKnob = select(
      'slotAlignment horizpntal',
      slotHorizontalAlignments,
      'left'
    );

    const data = [
      {
        children: (
          <div>
            <Title>Title</Title>
            <Body>Body Text</Body>
          </div>
        ),
        height: '200px',
        width: '75%',
      },
      {
        children: (
          <div>
            <Title>Title</Title>
            <Body>Body Text</Body>
          </div>
        ),
        height: '100px',
      },
      {
        children: (
          <div>
            <Title>Title</Title>
            <Body>Body Text</Body>
          </div>
        ),
        width: '85%',
      },
      {
        children: (
          <div>
            <Title>Title</Title>
            <Body>Body Text</Body>
          </div>
        ),
        height: '100px',
        width: '50%',
      },
    ];

    return (
      <Carousel
        layout="2UP"
        aspectRatio="16:9"
        data={data}
        slotAlignment={{
          vertical: slotVerticalAlignmentKnob,
          horizontal: slotHorizontalAlignmentKnob,
        }}
        renderItem={props => <CustomTile {...props} />}
      />
    );
  })
  .add('Carousel - with Tilelet', () => {
    const layoutOptions = ['1UP', '2UP', '3UP', '4UP', '6UP', '8UP'];
    const layoutKnob = select('layout', layoutOptions);
    const peekKnob = select(
      'peek',
      ['standard', 'minimum', 'none'],
      'standard'
    );
    return (
      <Carousel
        peek={peekKnob}
        layout={layoutKnob}
        gutter={'12px'}
        aspectRatio="16:9"
        // onChange={(e, selectedIndex) => console.log('SELECTED', selectedIndex)}
        data={Array(12).fill({
          title: { children: 'Hello' },
          backgroundColor: 'black',
          onClick: () => console.log('clicked'),
        })}
        renderItem={props => <Tilelet {...props} width="100%" />}
      />
    );
  });
