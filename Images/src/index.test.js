import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import Image from './components/Image';

const onClick = () => {};
const url =
  'https://cdn57.androidauthority.net/wp-content/uploads/2017/03/Verizon-logo-1-aa-gds-mwc17.jpg';
const webpUrl =
  'https://www.verizon.com/business/content/dam/img/campaigns/gateway.webp';

describe('<Image />', () => {
  test('should render image', () => {
    const { container } = render(
      <Image
        ratio={'16:9'}
        ariaLabel={'aria-label'}
        url={url}
        onClick={onClick}
      />
    );
    expect(container).toMatchSnapshot();
  });
  test('should render image with onclick and contraintToWidth', () => {
    const { container } = render(
      <Image
        ratio={'16:9'}
        ariaLabel={'aria-label'}
        url={url}
        constrainToWidth={true}
        hasAspectRatio={true}
        onClick={onClick}
      />
    );
    const imageDiv = container.firstChild;
    fireEvent.click(imageDiv);
    expect(container).toMatchSnapshot();
  });
  test('should render image with contraintToHeight and contraintToWidth as undefined', () => {
    const { container } = render(
      <Image
        ratio={'16:9'}
        ariaLabel={'aria-label'}
        url={url}
        constrainToHeight={undefined}
        hasAspectRatio={true}
        contraintToWidth={undefined}
        onClick={onClick}
      />
    );
    expect(container).toMatchSnapshot();
  });
  test('should render image with onclick and contraintToHeight', () => {
    const { container } = render(
      <Image
        ratio={'16:9'}
        ariaLabel={'aria-label'}
        url={url}
        constrainToHeight={true}
        hasAspectRatio={true}
        onClick={onClick}
      />
    );
    expect(container).toMatchSnapshot();
  });
  test('should render image with focusY and constrainToWidth as true', () => {
    const { container } = render(
      <Image
        ratio={'16:9'}
        ariaLabel={'aria-label'}
        url={url}
        hasAspectRatio={true}
        constrainToWidth={true}
        focusY={'top'}
      />
    );
    expect(container).toMatchSnapshot();
  });
  test('should render image with focusY as bottom and constrainToWidth as true', () => {
    const { container } = render(
      <Image
        ratio={'16:9'}
        ariaLabel={'aria-label'}
        url={url}
        hasAspectRatio={true}
        constrainToWidth={true}
        focusY={'bottom'}
      />
    );
    expect(container).toMatchSnapshot();
  });
  test('should render image with focusX as left and constrainToHeight as true', () => {
    const { container } = render(
      <Image
        ratio={'16:9'}
        ariaLabel={'aria-label'}
        url={url}
        hasAspectRatio={true}
        constrainToHeight={true}
        constrainToWidth={undefined}
        focusX={'left'}
      />
    );
    expect(container).toMatchSnapshot();
  });
  test('should render image with focusX as right and constrainToHeight as true', () => {
    const { container } = render(
      <Image
        ratio={'16:9'}
        ariaLabel={'aria-label'}
        url={url}
        hasAspectRatio={true}
        constrainToHeight={true}
        constrainToWidth={undefined}
        focusX={'right'}
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('should render image and onLoad function', () => {
    const { container, getByRole, rerender } = render(
      <Image
        ratio={'16:9'}
        ariaLabel={'aria-label'}
        url={webpUrl}
        focusX={'right'}
      />
    );
    const image = getByRole('img');

    fireEvent.load(image);
    rerender(
      <Image
        ratio={'16:9'}
        ariaLabel={'aria-label'}
        url={webpUrl}
        focusX={'right'}
      />
    );
    //expect(container).toMatchSnapshot();
  });

  test('should render image with sources', () => {
    const webpUrl =
      'https://www.verizon.com/business/content/dam/img/campaigns/gateway.webp';
    let sources = [
      //Prioritize Webp over jpeg
      {
        type: 'image/webp',
        srcset: webpUrl,
        maxViewport: 'mobile',
      },
    ];
    const { container } = render(
      <Image
        ratio={'16:9'}
        ariaLabel={'aria-label'}
        url={url}
        focusX={'center'}
        sources={sources}
      />
    );
    expect(container).toMatchSnapshot();
  });
  test('should render image with sources and maxViewport as desktop', () => {
    let sources = [
      //Prioritize Webp over jpeg
      {
        type: 'image/webp',
        srcset: webpUrl,
        maxViewport: 'desktop',
      },
    ];
    const { container } = render(
      <Image
        ratio={'16:9'}
        ariaLabel={'aria-label'}
        url={url}
        focusX={'center'}
        sources={sources}
      />
    );
    expect(container).toMatchSnapshot();
  });
  test('should render image with sources as empty', () => {
    const webpUrl =
      'https://www.verizon.com/business/content/dam/img/campaigns/gateway.webp';
    let sources = [
      //Prioritize Webp over jpeg
      {
        type: 'image/webp',
      },
    ];
    const { container } = render(
      <Image
        ratio={'16:9'}
        ariaLabel={'aria-label'}
        url={url}
        focusX={'center'}
        sources={sources}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
