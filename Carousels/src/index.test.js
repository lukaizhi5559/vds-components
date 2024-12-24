import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import CarouselBars from './components/CarouselBars';
import CarouselIndicator from './components/CarouselIndicator';
import CarouselScrubber from './components/CarouselScrollbar';
import Carousel from './components/Carousel';

jest.mock('@vds-core/utilities', () => {
  // Require the original module to not be mocked...
  const originalModule = jest.requireActual('@vds-core/utilities');

  return {
    __esModule: true, // Use it when dealing with esModules
    ...originalModule,
    generateUUID: jest.fn(() => 'testScrubber'),
  };
});

describe('<CarouselBars />', () => {
  test('should render CarouselBars', () => {
    const selectedSlide = 1;
    const { container } = render(
      <CarouselBars
        uniqueId="test-1"
        slideCount={4}
        selectedSlide={selectedSlide}
        goToSlide={() => {}}
      />
    );

    const CarouselStyleEle = document.querySelector(
      '[class^="StyledSwiperDot"]'
    );
    const CarouselStyleEleStyles = window.getComputedStyle(
      CarouselStyleEle,
      '::before'
    );
    if (CarouselStyleEleStyles) {
      expect(CarouselStyleEleStyles['height']).toBe('0.25rem');
      expect(CarouselStyleEleStyles['width']).toBe('1.5rem');
    }

    const CarouselStyleEleSelected = document.querySelector(
      '[class^="StyledSwiperDot"][aria-selected="true"]'
    );
    fireEvent.click(container.firstChild.firstChild);
    const CarouselStyleEleStylesSelected = window.getComputedStyle(
      CarouselStyleEleSelected,
      '::after'
    );
    if (CarouselStyleEleStylesSelected) {
      const selectedBar = CarouselStyleEleStylesSelected.height;
      expect(selectedBar).toBe('0.25rem');
      const selectedBarwidth = CarouselStyleEleStylesSelected.width;
      expect(selectedBarwidth).toBe('1.5rem');
      const marginRightVal = CarouselStyleEleStylesSelected.marginRight;
      expect(marginRightVal).toBe('0.25rem');
    }

    expect(document.querySelector('[aria-controls="test-1"]')).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render CarouselBars for dark background', () => {
    const selectedSlide = 1;
    const { container } = render(
      <CarouselBars
        uniqueId="test-2"
        slideCount={4}
        surface="dark"
        selectedSlide={selectedSlide}
        goToSlide={() => {}}
      />
    );

    const CarouselStyleEle = document.querySelector(
      '[class^="StyledSwiperDot"]'
    );
    const CarouselStyleEleStyles = window.getComputedStyle(
      CarouselStyleEle,
      '::before'
    );
    if (CarouselStyleEleStyles) {
      expect(CarouselStyleEleStyles['height']).toBe('0.25rem');
      expect(CarouselStyleEleStyles['width']).toBe('1.5rem');
    }

    const CarouselStyleEleSelected = document.querySelector(
      '[class^="StyledSwiperDot"][aria-selected="true"]'
    );
    fireEvent.click(container.firstChild.firstChild);
    const CarouselStyleEleStylesSelected = window.getComputedStyle(
      CarouselStyleEleSelected,
      '::after'
    );
    if (CarouselStyleEleStylesSelected) {
      const selectedBar = CarouselStyleEleStylesSelected.height;
      expect(selectedBar).toBe('0.25rem');
      const selectedBarwidth = CarouselStyleEleStylesSelected.width;
      expect(selectedBarwidth).toBe('1.5rem');
      const marginRightVal = CarouselStyleEleStylesSelected.marginRight;
      expect(marginRightVal).toBe('0.25rem');
    }

    expect(document.querySelector('[aria-selected="true"]')).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render CarouselBars with second bar active', () => {
    const selectedSlide = 2;
    const { container } = render(
      <CarouselBars
        uniqueId="test-3"
        slideCount={4}
        selectedSlide={selectedSlide}
        goToSlide={() => {}}
      />
    );
    fireEvent.keyPress(container.firstChild.firstChild, {
      key: 'Enter',
      code: 13,
      charCode: 13,
    });
    expect(
      document
        .querySelector('[aria-selected="true"]')
        .getAttribute('data-index')
    ).toBe('2');
    expect(document.querySelector('[aria-selected="true"]')).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render CarouselBars - click event', () => {
    const selectedSlide = 1;
    const { container } = render(
      <CarouselBars
        uniqueId="test-1"
        slideCount={4}
        selectedSlide={selectedSlide}
        goToSlide={() => {}}
      />
    );
    fireEvent.click(container.firstChild.firstChild);
  });

  test('should render CarouselBars - keydown event', () => {
    const selectedSlide = 1;
    const { container } = render(
      <CarouselBars
        uniqueId="test-4"
        slideCount={4}
        selectedSlide={selectedSlide}
        goToSlide={() => {}}
        slideAriaLabel={() => {}}
        onChange={() => {}}
      />
    );
    fireEvent.keyDown(container.firstChild.firstChild, {
      key: 'Right Arrow',
      keyCode: 39,
      charCode: 39,
    });
    fireEvent.keyDown(container.firstChild.firstChild, {
      key: 'Left Arrow',
      keyCode: 37,
      charCode: 37,
    });
  });
  test('should render CarouselBars - MouseDown event', () => {
    const selectedSlide = 1;
    const { container } = render(
      <CarouselBars
        uniqueId="test-4"
        slideCount={4}
        selectedSlide={selectedSlide}
        goToSlide={() => {}}
      />
    );
    fireEvent.mouseDown(container.firstChild.firstChild);
  });

  test('should render CarouselBars - KeyDown event', () => {
    const selectedSlide = 1;
    const { container } = render(
      <CarouselBars
        uniqueId="test-4"
        slideCount={1}
        selectedSlide={selectedSlide}
        goToSlide={() => {}}
      />
    );
    fireEvent.keyDown(container.firstChild.firstChild, {
      key: 'Left Arrow',
      keyCode: 37,
      charCode: 37,
    });
    fireEvent.keyDown(container.firstChild.firstChild, {
      key: 'Right Arrow',
      keyCode: 39,
      charCode: 39,
    });
    fireEvent.keyDown(container.firstChild.firstChild, {
      key: 'Up Arrow',
      keyCode: 38,
      charCode: 38,
    });
  });
});

test('VDS CarouselBars', () => {
  const { container } = render(
    <CarouselBars
      focusState
      slideCount={4}
      uniqueId="carouselBar"
      selectedSlide={1}
    />
  );
  expect(container.firstChild).toMatchSnapshot();
});

test('VDS CarouselIndicator', () => {
  const { container } = render(
    <CarouselIndicator uniqueId="carouselBar" slideCount={3} type={'bars'} />
  );
  expect(container.firstChild).toMatchSnapshot();
});

test('VDS Carousel scrubber', () => {
  const { container } = render(
    <CarouselScrubber surface="dark" numberOfSlides="12" />
  );

  const scrubStyle = container.querySelector('.scrollbar-track ');
  const getscrubStyle = window.getComputedStyle(scrubStyle)._values;

  const thumbstyle = container.querySelector('[class^="Thumb"]');
  const getthumbstyle = window.getComputedStyle(thumbstyle)._values;

  if (getscrubStyle) {
    expect(getscrubStyle['width']).toBe('96px');
    expect(getscrubStyle['height']).toBe('4px');
    expect(getscrubStyle['background-color']).toBe('rgb(51, 51, 51)');
    expect(getscrubStyle['border-radius']).toBe('4px');
  }
  if (getthumbstyle) {
    expect(getthumbstyle['border-radius']).toBe('4px');
    expect(getthumbstyle['background-color']).toBe('rgb(167, 167, 167)');
    expect(getthumbstyle['height']).toBe('4px');
  }
  expect(container.firstChild).toMatchSnapshot();
});

describe('<Carousel />', () => {
  test('should render Carousel', () => {
    const { container } = render(
      <Carousel
        layout="2UP"
        aspectRatio="16:9"
        data={Array(12).fill({
          title: { children: 'Hello' },
          backgroundColor: 'black',
        })}
        renderItem={props => <div {...props} width="100%" />}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
