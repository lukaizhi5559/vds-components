import { render } from '@testing-library/react';
import React from 'react';
import VDSManager from './components/AppManager/VDSManager';

describe('VDSManager ', () => {
  test('should render no props', () => {
    // const { container } = render(<VDSManager />);
    // expect(container.firstChild).toMatchSnapshot();
  });

  test('should render With Child', () => {
    // const { getByText, container } = render(
    //   <VDSManager>
    //     <div>Child container</div>
    //   </VDSManager>
    // );
    // const textElement = getByText('Child container');
    // expect(textElement).toBeTruthy();
  });
});
