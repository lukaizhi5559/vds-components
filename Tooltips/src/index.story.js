import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import { Tooltip, TrailingTooltip } from '.';
import { Body } from '@vds-core/typography';
import { ColorTokens } from '@vds-tokens/color';

const longContent =
  ' Similique in velit vero, libero porro ut. Similique in velit vero, Similique in velit vero, libero porro ut.Similique in velit vero, libero porro ut.libero porro ut. Similique in velit vero, libero porro ut.Similique in velit vero, libero porro ut. Similique in velit vero, libero porro ut. Similique in velit vero, libero porro ut. Similique in velit vero, libero porro ut. Temporibus earum fuga error libero explicabo numquam officia libero explicabo numquam officiLg';

const shortContent =
  'Lorem ipsum dolor sit amet con adipisiLorem ipsum dolor sit amet con adipisicing elit.cing elit.';

const title = 'Tooltips are a common graphical element';

const CenterContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

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

const FakeMobileDevice = styled.div`
  height: 844px;
  width: 390px;
  border: 1px solid ${({ surface }) => (surface === 'dark' ? 'white' : 'black')};
  border-radius: 8px;
  display: flex;
  justify-content: center;
`;

const sizeOptions = {
  medium: 'medium',
  small: 'small',
};

const tooltipWithTextSizeOptions = ['small', 'large'];

const iconFillColorOptions = ['primary', 'secondary', 'brandHighlight'];

storiesOf('Brand3.0/Tooltips', module)
  .addDecorator(withKnobs)

  .add('Tooltip - text', () => {
    return (
      <div style={{ width: 100 }}>
        <Body
          tabIndex={0}
          size={select('size', tooltipWithTextSizeOptions, 'small')}
          primitive="span"
        >
          Here is some body text with a neat tooltip after it! You can even set
          a width for your text and the tooltip will follow! How neat!
          <Tooltip
            activeState
            size={select('size', tooltipWithTextSizeOptions, 'small')}
            // title={title}
            buttonText={text('buttonText - (mobile only)', 'Close')}
          >
            one line of text
          </Tooltip>
        </Body>
      </div>
    );
  })

  .add('Tooltip', () => {
    const surfaceKnob = select('surface', ['light', 'dark'], 'light');
    const iconFillColorKnob = select(
      'iconFillColor',
      iconFillColorOptions,
      'primary'
    );
    const disabledKnob = boolean('Disabled', false);
    return (
      <React.Fragment>
        <InvertedBackground surface={surfaceKnob} />
        <CenterContent>
          <Tooltip
            size={select('size', sizeOptions, 'medium')}
            surface={surfaceKnob}
            title={title}
            body="hello this is a body"
            ariaLabel={'tooltip'}
            iconFillColor={iconFillColorKnob}
            disabled={disabledKnob}
          >
            {shortContent}
          </Tooltip>
        </CenterContent>
      </React.Fragment>
    );
  })

  .add('Tooltip - Dialog Mobile', () => {
    const surfaceKnob = select('surface', ['light', 'dark'], 'light');
    const iconFillColorKnob = select(
      'iconFillColor',
      iconFillColorOptions,
      'primary'
    );
    const contentKnob = text('Content', longContent);
    const titleKnob = text('Title', title);
    const buttonLabelKnob = text('Button label', 'Close');

    return (
      <InvertedBackground surface={surfaceKnob}>
        <CenterContent>
          <FakeMobileDevice surface={surfaceKnob}>
            <Tooltip
              size={select('size', sizeOptions, 'medium')}
              surface={surfaceKnob}
              title={titleKnob}
              ariaLabel={'tooltip'}
              iconFillColor={iconFillColorKnob}
              fakeMobileDevice
              buttonText={buttonLabelKnob}
            >
              {contentKnob}
            </Tooltip>
          </FakeMobileDevice>
        </CenterContent>
      </InvertedBackground>
    );
  })

  .add('Tooltip - Scrollable', () => {
    const surfaceKnob = select('surface', ['light', 'dark'], 'light');
    const iconFillColorKnob = select(
      'iconFillColor',
      iconFillColorOptions,
      'primary'
    );

    return (
      <InvertedBackground surface={surfaceKnob}>
        <CenterContent>
          <Tooltip
            surface={surfaceKnob}
            title={title}
            iconFillColor={iconFillColorKnob}
          >
            {longContent}
          </Tooltip>
        </CenterContent>
      </InvertedBackground>
    );
  })

  .add('Tooltip - Trailing', () => {
    const surfaceKnob = select('surface', ['light', 'dark'], 'light');
    const iconFillColorKnob = select(
      'iconFillColor',
      iconFillColorOptions,
      'primary'
    );
    const typographyTypeKnob = select(
      'typographyType',
      ['body', 'title', 'micro', 'feature'],
      'body'
    );
    const primitive = select(
      'primitive',
      ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'p'],
      'span'
    );
    const titleSizes = [
      'XSmall',
      'small',
      'medium',
      'large',
      'XLarge',
      '2XLarge',
    ];
    const bodySizes = ['small', 'large'];
    const colorChoices = {
      '#000000': 'black',
      '#ffffff': 'white',
      '#f6f6f6': 'gray95',
      '#d8dada': 'gray85',
      '#a7a7a7': 'gray65',
      '#6F7171': 'gray44',
      '#333333': 'gray20',
      '#1b1d1f': 'gray11',
    };
    return (
      <React.Fragment>
        <InvertedBackground surface={surfaceKnob} />
        <TrailingTooltip
          typographySize={
            typographyTypeKnob === 'body'
              ? select('bodySize', bodySizes, 'small')
              : typographyTypeKnob === 'title'
              ? select('titleSizes', titleSizes, 'small')
              : null
          }
          iconFillColor={iconFillColorKnob}
          typographyPrimitive={primitive}
          typographyType={typographyTypeKnob}
          typographyColor={select('typographyColor', colorChoices, '#000000')}
          tooltipSize={select('tooltipSize', ['small', 'large'], 'small')}
          tooltipTitle={text('tooltipTitle', 'This is a tooltip title')}
          tooltipContent={text('tooltipContent', shortContent)}
          bold={boolean('bold', false)}
          surface={surfaceKnob}
        >
          {longContent}
        </TrailingTooltip>
      </React.Fragment>
    );
  })

  .add('Tooltip - Top', () => {
    const CustomWrapper = styled.span`
      display: flex;
      align-self: flex-start;
    `;

    return (
      <CenterContent>
        <CustomWrapper>
          <Tooltip size="small" title={title}>
            {shortContent}
          </Tooltip>
        </CustomWrapper>
      </CenterContent>
    );
  })

  .add('Tooltip - Left', () => {
    const CustomWrapper = styled.div`
      box-sizing: border-box;
      display: flex;
      justify-content: flex-start;
      width: 100vw;
      max-width: 100vw;
      padding: 50px;
    `;

    return (
      <CenterContent>
        <CustomWrapper>
          <Tooltip title={title}>{shortContent}</Tooltip>
        </CustomWrapper>
      </CenterContent>
    );
  })

  .add('Tooltip - Right', () => {
    const CustomWrapper = styled.div`
      box-sizing: border-box;
      display: flex;
      justify-content: flex-end;
      width: 100vw;
      max-width: 100vw;
      padding: 50px;
    `;

    return (
      <CenterContent>
        <CustomWrapper>
          <Tooltip title={title}>{shortContent}</Tooltip>
        </CustomWrapper>
      </CenterContent>
    );
  })

  .add('Tooltip - HTML element', () => {
    const StyledLink = styled.a`
      font-size: 14px;
      width: 160px;
      background: transparent;
      border: none;
      text-decoration: underline;
    `;

    return (
      <CenterContent>
        <Tooltip
          content={shortContent}
          renderAnchorElement={() => (
            <StyledLink aria-haspopup="true" tabIndex={0}>
              native hyperlink tooltip
            </StyledLink>
          )}
        >
          {longContent}
        </Tooltip>
      </CenterContent>
    );
  });
