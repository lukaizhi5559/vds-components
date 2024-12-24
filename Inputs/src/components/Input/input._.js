import { render } from '@testing-library/react';
import { Input } from '.';

describe('<Input> - Tests', () => {
  test('<Input - checkbox>', () => {
    const { container } = render(<Input type="checkbox" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('<Input - toggle>', () => {
    const { container } = render(
      <Input type="toggle" value="default toggle" />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('<Input - radioBox>', () => {
    const { container } = render(<Input type="radioBox" label="hello world" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('<Input - radioButton>', () => {
    const { container } = render(<Input type="radioButton" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('<Input - radio>', () => {
    const { container } = render(<Input type="radio" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('<Input - radioSwatch>', () => {
    const { container } = render(<Input type="radioSwatch" value="black" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('<Input - calendar>', () => {
    const { container } = render(<Input type="calendar" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('<Input - number>', () => {
    const { container } = render(<Input type="number" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('<Input - text>', () => {
    const { container } = render(<Input type="text" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('<Input - empty type>', () => {
    const { container } = render(<Input type="" />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
