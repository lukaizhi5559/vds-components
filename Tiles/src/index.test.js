import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { TileContainer, Tilelet, TileletGroup } from '.';
import AspectRatio from './components/wrappers/AspectRatioWrapper';
import { ColorTokens } from '@vds-tokens/color';

jest.mock('@vds-core/utilities', () => {
  // Require the original module to not be mocked...
  const originalModule = jest.requireActual('@vds-core/utilities');

  return {
    __esModule: true, // Use it when dealing with esModules
    ...originalModule,
    generateUUID: jest.fn(() => 'testTile'),
  };
});

describe('<Tilelet >', () => {
  test('render Tile with default props', () => {
    const { container } = render(<Tilelet />);

    expect(container).toMatchSnapshot();
  });

  test('test onClick on Tilelet', () => {
    const { container } = render(<Tilelet onClick={jest.fn()} />);
    fireEvent.keyDown(container);
    expect(container).toMatchSnapshot();
  });

  test('test tilelet with title prop ', () => {
    const titleJson = {
      size: 'titleSmall',
      primitive: 'h2',
      text: 'this is title text',
      surface: 'light',
    };
    const { container } = render(<Tilelet title={titleJson} />);
    //fireEvent.keyDown(container);
    expect(container).toMatchSnapshot();
    //expect(getByText('this is title text')).toBeTruthy();
  });

  test('test tilelet with title prop and size not in list ', () => {
    const titleJson = {
      size: 'title2xLarge',
      primitive: 'h2',
      text: 'this is title text',
      surface: 'light',
    };
    const { container } = render(<Tilelet title={titleJson} />);
    //fireEvent.keyDown(container);
    expect(container).toMatchSnapshot();
    //expect(getByText('this is title text')).toBeTruthy();
  });
  test('test tilelet with background and surface = white props', () => {
    const { container } = render(
      <Tilelet backgroundColor={'black'} surface={'light'} />
    );
    expect(container).toMatchSnapshot();
  });

  test('test tilelet with surface = black props', () => {
    const { container } = render(<Tilelet surface={'dark'} />);
    expect(container).toMatchSnapshot();
  });

  test('test tilelet with descriptiveIcon ', () => {
    const { container } = render(
      <Tilelet descriptiveIcon={{ size: 'medium' }} />
    );
    expect(container).toMatchSnapshot();
  });
  test('test tilelet with directionalIcon ', () => {
    const { container } = render(
      <Tilelet directionalIcon={{ size: 'medium' }} />
    );
    expect(container).toMatchSnapshot();
  });
  test('test tilelet with directionalIcon and descrptiveIcon ', () => {
    const { container } = render(
      <Tilelet
        directionalIcon={{ size: 'medium' }}
        descriptiveIcon={{ size: 'medium' }}
      />
    );
    expect(container).toMatchSnapshot();
  });
  test('test tilelet with descriptiveIcon and textPosition as bottom', () => {
    const { container } = render(
      <Tilelet descriptiveIcon={{ size: 'medium' }} textPosition="bottom" />
    );
    expect(container).toMatchSnapshot();
  });
  test('test tilelet with viewport Mobile ', () => {
    const { container } = render(<Tilelet viewport={'mobile'} />);
    expect(container).toMatchSnapshot();
  });

  test('test tilelet with viewport Mobile with innerPadding ', () => {
    const { container } = render(
      <Tilelet
        viewport={'mobile'}
        innerPadding={'12px'}
        directionalIcon={{ size: 'medium' }}
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('test tilelet with viewport Mobile and Icon size not medium ', () => {
    const { container } = render(
      <Tilelet viewport={'mobile'} directionalIcon={{ size: 'small' }} />
    );
    expect(container).toMatchSnapshot();
  });

  test('test tilelet with viewport Tablet and Icon size large ', () => {
    const { container } = render(
      <Tilelet viewport={'tablet'} directionalIcon={{ size: 'large' }} />
    );
    expect(container).toMatchSnapshot();
  });

  test('test tilelet with viewport Tablet ', () => {
    const { container } = render(<Tilelet viewport={'tablet'} />);
    expect(container).toMatchSnapshot();
  });

  test('test tilelet with viewport Tablet with innerPadding ', () => {
    const { container } = render(
      <Tilelet viewport={'tablet'} innerPadding={'16px'} />
    );
    expect(container).toMatchSnapshot();
  });

  test('test tilelet with  innerPadding 32px ', () => {
    const { container } = render(<Tilelet innerPadding={'32px'} />);
    expect(container).toMatchSnapshot();
  });

  test('test tilelet with  innerPadding 24px ', () => {
    const { container } = render(<Tilelet innerPadding={'24px'} />);
    expect(container).toMatchSnapshot();
  });

  test('test tilelet with title and children prop ', () => {
    const titleJson = {
      size: 'titleSmall',
      primitive: 'h2',
      text: 'this is title text',
      surface: 'light',
      children: `<span>New title text </span>`,
    };
    const { container } = render(<Tilelet title={titleJson} />);
    expect(container).toMatchSnapshot();
    //expect(getByText('this is title text')).toBeTruthy();
  });

  test('test tilelet with eyebrow, title and Subtitle prop ', () => {
    const eyebrowJson = {
      size: 'bodySmall',
      primitive: 'h2',
      surface: 'light',
      children: `eyebrow text`,
    };
    const titleJson = {
      size: 'titleSmall',
      primitive: 'h2',
      text: 'this is title text',
      surface: 'light',
      children: `<span>New title text </span>`,
    };
    const subTitleJson = {
      size: 'bodySmall',
      primitive: 'h2',
      text: 'this is title text',
      surface: 'light',
      children: `<span>New title text </span>`,
      color: 'primary',
    };
    const { container } = render(
      <Tilelet
        eyebrow={eyebrowJson}
        title={titleJson}
        subtitle={subTitleJson}
      />
    );
    expect(container).toMatchSnapshot();
    //expect(getByText('this is title text')).toBeTruthy();
  });
  test('test tilelet with title and Subtitle text only prop ', () => {
    const subTitleJson = {
      size: 'bodySmall',
      primitive: 'h2',
      text: 'this is title text',
      surface: 'light',
      color: 'primary',
    };
    const { container } = render(<Tilelet subtitle={subTitleJson} />);
    expect(container).toMatchSnapshot();
    //expect(getByText('this is title text')).toBeTruthy();
  });
  test('test uniform size - title and subtitle/eyebrow font size are same', () => {
    const eyebrowJson = {
      size: 'bodyLarge',
      primitive: 'h2',
      children: `eyebrow text`,
    };
    const titleJson = {
      size: 'bodyLarge',
      primitive: 'h2',
      children: `Title text`,
    };
    const subTitleJson = {
      size: 'bodyLarge',
      primitive: 'h2',
      children: `Subtitle text`,
    };
    const { container } = render(
      <Tilelet
        eyebrow={eyebrowJson}
        title={titleJson}
        subtitle={subTitleJson}
        backgroundColor={'white'}
      />
    );
    const title = container.querySelector('[class^="TitleWrapper"]');
    expect(title.firstChild).toHaveStyleRule('font-size', '1rem');
    const subtitle = container.querySelector('[class^="SubtitleWrapper"]');
    expect(subtitle.firstChild).toHaveStyleRule('font-size', '1rem');
    const eyebrow = container.querySelector('[class^="EyebrowWrapper"]');
    expect(eyebrow.firstChild).toHaveStyleRule('font-size', '1rem');
  });
  test('test - uniform size and title bold, eyebrow is always regular weight & secondary color', () => {
    const eyebrowJson = {
      size: 'bodyLarge',
      primitive: 'h2',
      children: `eyebrow text`,
    };
    const titleJson = {
      size: 'bodyLarge',
      primitive: 'h2',
      children: `Title text`,
    };
    const subTitleJson = {
      size: 'bodyLarge',
      primitive: 'h2',
      children: `Subtitle text`,
    };
    const { container } = render(
      <Tilelet
        eyebrow={eyebrowJson}
        title={titleJson}
        subtitle={subTitleJson}
        backgroundColor={'white'}
      />
    );
    const eyebrow = container.querySelector('[class^="EyebrowWrapper"]');
    expect(eyebrow.firstChild).toHaveStyleRule('color', '#6f7171');
    expect(eyebrow.firstChild).toHaveStyleRule('font-weight', '400');
  });
  test('test - uniform size and title as regular, eyebrow is always bold & primary color', () => {
    const eyebrowJson = {
      size: 'bodyLarge',
      primitive: 'h2',
      children: `eyebrow text`,
    };
    const titleJson = {
      size: 'bodyLarge',
      primitive: 'h2',
      children: `Title text`,
      bold: false,
    };
    const subTitleJson = {
      size: 'bodyLarge',
      primitive: 'h2',
      children: `Subtitle text`,
    };
    const { container } = render(
      <Tilelet
        eyebrow={eyebrowJson}
        title={titleJson}
        subtitle={subTitleJson}
        backgroundColor={'white'}
      />
    );
    const eyebrow = container.querySelector('[class^="EyebrowWrapper"]');
    expect(eyebrow.firstChild).toHaveStyleRule('color', '#000000');
    expect(eyebrow.firstChild).toHaveStyleRule('font-weight', '700');
  });
  test('test tileContainer on keydown', () => {
    const titleJson = {
      size: 'titleLarge',
      primitive: 'h2',
      text: 'this is title text',
      surface: 'light',
    };
    const { container } = render(
      <Tilelet title={titleJson} onClick={jest.fn()} />
    );
    fireEvent.click(container.firstChild);
    fireEvent.keyDown(container.firstChild, {
      key: 'Enter',
      code: 13,
      charCode: 13,
    });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('test tileContainer on mouseEnter ', () => {
    const titleJson = {
      size: 'titleLarge',
      primitive: 'h2',
      text: 'this is title text',
    };
    const { container } = render(<Tilelet title={titleJson} />);
    //const tileContainer = container.firstChild.;
    fireEvent.mouseEnter(container.firstChild.firstChild);
    expect(container).toMatchSnapshot();
  });

  test('test tiletet with badge prop', () => {
    const badgeJson = {
      fillColor: 'black',
      surface: 'light',
    };
    const { container } = render(<Tilelet badge={badgeJson} />);
    expect(container).toMatchSnapshot();
  });

  test('test tiletet with textPosition prop', () => {
    const { container } = render(<Tilelet textPosition={'bottom'} />);
    expect(container).toMatchSnapshot();
  });
  test('test tiletet with textPosition="middle"', () => {
    const { container } = render(<Tilelet textPosition={'middle'} />);
    expect(container).toMatchSnapshot();
  });
  test('test tilelet with directionalIcon and no badge ', () => {
    const { container } = render(
      <Tilelet
        directionalIcon={{ size: 'medium' }}
        surface={'dark'}
        backgroundColor={'gray'}
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('test tilelet with descriptiveIcon and no badge ', () => {
    const { container } = render(
      <Tilelet
        descriptiveIcon={{ size: 'medium' }}
        surface={'dark'}
        backgroundColor={'gray'}
      />
    );
    expect(container).toMatchSnapshot();
  });

  /** test cases for TileContainer */

  test('test TileContainer with background gray and surface light', () => {
    const { container } = render(
      <TileContainer backgroundColor={'gray'} surface={'light'} />
    );
    expect(container).toMatchSnapshot();
  });
  test('test TileContainer with background gray and surface dark', () => {
    const { container } = render(
      <TileContainer backgroundColor={'gray'} surface={'dark'} />
    );
    expect(container).toMatchSnapshot();
  });

  test('test TileContainer with background blue and surface dark', () => {
    const { container } = render(
      <TileContainer backgroundColor={'blue'} surface={'dark'} />
    );
    expect(container).toMatchSnapshot();
  });

  test('test TileContainer with background color token light and surface dark', () => {
    const { container } = render(
      <TileContainer
        backgroundColor={ColorTokens.background.secondary.dark.value}
        surface={'dark'}
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('test TileContainer with background color token light and surface dark', () => {
    const { container } = render(
      <TileContainer
        backgroundColor={ColorTokens.background.secondary.light.value}
        surface={'light'}
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('test TileContainer with showBorder and showDropShadow', () => {
    const { container } = render(
      <TileContainer
        backgroundColor={ColorTokens.background.secondary.light.value}
        surface={'light'}
        showBorder={true}
        showDropShadow={true}
      />
    );
    expect(container).toMatchSnapshot();
  });
  test('test TileContainer with showBorder false and showDropShadow', () => {
    const { container } = render(
      <TileContainer
        surface={'light'}
        showBorder={false}
        showDropShadow={true}
      />
    );
    expect(container).toMatchSnapshot();
  });
  test('test TileContainer with showBorder and surface dark ', () => {
    const { container } = render(
      <TileContainer surface={'dark'} showBorder={true} />
    );
    expect(container).toMatchSnapshot();
  });
  test('test TileContainer with imageFallBackColor and BackgroundImage', () => {
    const { container } = render(
      <TileContainer
        imageFallbackColor={'light'}
        backgroundImage={'image background'}
      />
    );
    expect(container).toMatchSnapshot();
  });
  test('test TileContainer with imageFallBackColor as light token', () => {
    const { container } = render(
      <TileContainer
        surface={'light'}
        imageFallbackColor={'dark'}
        backgroundImage={'image background'}
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('test TileContainer with background', () => {
    const { container } = render(
      <Tilelet background={'linear-gradient(to right, red, blue)'} />
    );
    expect(container).toMatchSnapshot();
  });

  test('test TileContainer with onFocus event prop', () => {
    const { container } = render(
      <TileContainer
        surface={'light'}
        imageFallbackColor={'light'}
        onClick={jest.fn()}
      />
    );

    fireEvent.focus(container.firstChild);
    fireEvent.blur(container.firstChild);
    fireEvent.keyDown(container.firstChild, {
      key: 'Enter',
      code: 13,
      charCode: 13,
    });
    fireEvent.keyDown(container.firstChild, {
      key: 'Space',
      code: 32,
      charCode: 32,
    });
    expect(container.firstChild).toMatchSnapshot();
  });
  test('test TileContainer with onMOuseEnter event prop', () => {
    const { container } = render(
      <TileContainer
        surface={'light'}
        imageFallbackColor={'light'}
        onClick={jest.fn()}
      />
    );

    fireEvent.mouseEnter(container.firstChild);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('test aspect Ratio component with default props', () => {
    const { container } = render(<AspectRatio />);
    expect(container).toMatchSnapshot();
  });
  test('test aspect Ratio component with inverted props', () => {
    const { container } = render(<AspectRatio surface="dark" />);
    expect(container).toMatchSnapshot();
  });

  test('test TileContainer with imageFallBackColor as light without background', () => {
    const { container } = render(
      <TileContainer surface={'light'} imageFallbackColor={'light'} />
    );
    expect(container).toMatchSnapshot();
  });

  test('test TileContainer with onFocus and hover effect', () => {
    const { rerender, container } = render(
      <TileContainer
        surface={'light'}
        showDropShadow={true}
        showBorder={false}
        onClick={jest.fn()}
      />
    );

    fireEvent.focus(container.firstChild);
    rerender(
      <TileContainer
        surface={'light'}
        showDropShadow={true}
        showBorder={false}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  //Tilelet Group test
  test('test tilelet group with data props', () => {
    const data = [
      {
        backgroundColor: 'white',
        height: '100px',
        width: '100px',
      },
    ];
    const { container } = render(<TileletGroup data={data} />);
    expect(container).toMatchSnapshot();
  });
  test('test tilelet group with data props and viewport mobile', () => {
    const data = [
      {
        backgroundColor: 'white',
        height: '100px',
        width: '100px',
      },
    ];
    const { container } = render(
      <TileletGroup data={data} viewport={'mobile'} />
    );
    expect(container).toMatchSnapshot();
  });
  test('test tilelet group with tileletWidht and tileletHeight ', () => {
    const data = [
      {
        backgroundColor: 'white',
        aspectRatio: '1',
      },
    ];
    const { container } = render(
      <TileletGroup
        data={data}
        tileletWidth={'100px'}
        tileletHeight={'100px'}
        gutterWidth={'24px'}
      />
    );
    expect(container).toMatchSnapshot();
  });
  test('test tilelet group with gutter width negative ', () => {
    const data = [
      {
        backgroundColor: 'white',
        aspectRatio: '1:1',
      },
    ];
    const { container } = render(
      <TileletGroup data={data} gutterWidth={'24px'} />
    );
    expect(container).toMatchSnapshot();
  });
  test('test tilelet group with viewportOverride  ', () => {
    const data = [
      {
        backgroundColor: 'white',
        aspectRatio: '1:1',
      },
    ];
    const viewportOverrideObj = {
      mobile: {
        width: '100px',
        height: '100px',
      },
    };
    const { container } = render(
      <TileletGroup
        data={data}
        viewport={'mobile'}
        viewportOverride={viewportOverrideObj}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
