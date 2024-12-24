import { render } from '@testing-library/react';
import React from 'react';
import { Grid, Row, Col } from '.';

const bleedTests = ['1440', '1272', 'full'];
const viewports = ['desktop', 'tablet', 'mobile'];

describe('<Grid>', () => {
  test('Grid', () => {
    const { container, getAllByText } = render(
      <Grid height="300px">
        <Col span="12">
          <div>12</div>
        </Col>
        <Col span="1">
          <div>1</div>
        </Col>
        <Col span="11">
          <div>11</div>
        </Col>
        <Col span="2">
          <div>2</div>
        </Col>
        <Col span="10">
          <div>10</div>
        </Col>
        <Col span="3">
          <div>3</div>
        </Col>
        <Col span="9">
          <div>9</div>
        </Col>
        <Col span="4">
          <div>4</div>
        </Col>
        <Col span="8">
          <div>8</div>
        </Col>
        <Col span="5">
          <div>5</div>
        </Col>
        <Col span="7">
          <div>7</div>
        </Col>
        <Col span="6">
          <div>6</div>
        </Col>
        <Col span="6">
          <div>6</div>
        </Col>
      </Grid>
    );

    expect(container).toMatchSnapshot();

    // Expect Grid to have 12 cols
    expect(container.firstChild.childNodes[0].childNodes.length).toBe(13);

    expect(container.firstChild.firstChild).toHaveStyle(
      `max-width: 1440px; height: 300px;`
    );

    // Expect text content to be in appropriate col
    for (let text = 1; text < 13; text++) {
      expect(
        getAllByText(text.toString())[0].parentNode.getAttribute('span')
      ).toBe(text.toString());
    }
  });

  test(`Grid test bleed`, () => {
    bleedTests.forEach(bleed => {
      const { container } = render(
        <Grid bleed={bleed}>
          <Row>
            <Col>
              <div>{`Test bleed = "${bleed}"`}</div>
            </Col>
          </Row>
        </Grid>
      );

      expect(container).toMatchSnapshot();
      expect(container.firstChild.firstChild).toHaveStyle(
        `max-width: ${
          bleed === 'full' ? '100%' : bleed === '1440' ? '1440px' : '1272px'
        };`
      );
    });
  });

  test(`Grid test viewports and falsy colGutter`, () => {
    viewports.forEach(viewport => {
      const { container } = render(
        <Grid viewport={viewport} colGutter={false}>
          <Row>
            <Col className="testCol">1</Col>
          </Row>
        </Grid>
      );
      const column = container.querySelector('.testCol');
      expect(container).toMatchSnapshot();
      expect(column).toHaveStyle(`padding-left: 0rem; padding-right: 0rem`);
    });
  });

  test(`Grid rowGutter and colGutter`, () => {
    viewports.forEach(viewport => {
      const { container } = render(
        <Grid
          viewport={viewport}
          rowGutter="10px"
          colGutter={true}
          colSizes={{
            mobile: 2,
            tablet: 6,
            desktop: 6,
          }}
        >
          <Row>
            <Col
              className="testClassA"
              colSizes={{
                mobile: 2,
                tablet: 5,
                desktop: 5,
              }}
            >
              <div style={{ width: '100%' }} />
            </Col>
            <Col>2</Col>
          </Row>
          <Row>
            <Col className="testClassB">1</Col>
            <Col>2</Col>
          </Row>
        </Grid>
      );
      const columnA = container.querySelector('.testClassA');
      const columnB = container.querySelector('.testClassB');
      expect(container).toMatchSnapshot();

      expect(columnA).toHaveStyle(
        `margin-bottom: 10px; padding-left: ${
          viewport === 'mobile' ? '0.375rem' : '1.25rem'
        }; padding-right: ${viewport === 'mobile' ? '0.375rem' : '1.25rem'}`
      );
      expect(columnB).toHaveStyle(
        `margin-bottom: 10px; padding-left: ${
          viewport === 'mobile' ? '0.375rem' : '1.25rem'
        }; padding-right: ${viewport === 'mobile' ? '0.375rem' : '1.25rem'}`
      );
    });
  });
});

test(`Grid container styles`, () => {
  const { container } = render(
    <Grid>
      <Row>
        <Col>1</Col>
      </Row>
    </Grid>
  );
  const gridContainer = container.querySelector(
    '[class^="StyledGridContainer"]'
  );
  expect(gridContainer).toHaveStyle(
    'width: 100%;max-width: 1440px;margin: 0 auto;height: 100%'
  );
});

test(`Grid row styles`, () => {
  const { container } = render(
    <Grid>
      <Row>
        <Col>1</Col>
      </Row>
    </Grid>
  );
  const rowWrapper = container.querySelector('[class^="StyledRow"]');
  expect(rowWrapper).toHaveStyle(
    'flex-direction: row;justify-content: flex-start;margin-right: auto;margin-left: auto;padding-right: 0px;padding-left: 0px;'
  );
});

test('Expect Grid column children to match passed styles', () => {
  const { container } = render(
    <Grid>
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
      </Row>
    </Grid>
  );
  const rowWrapper = container.querySelector('[class^="StyledRow"] > div');
  expect(rowWrapper.firstChild).toHaveStyle(
    'height: 50px; backgroundColor: #0077B4'
  );
});
