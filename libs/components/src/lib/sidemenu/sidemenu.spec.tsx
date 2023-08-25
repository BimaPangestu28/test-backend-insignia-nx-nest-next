import { render } from '@testing-library/react';

import Sidemenu from './sidemenu';

describe('Sidemenu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Sidemenu />);
    expect(baseElement).toBeTruthy();
  });
});
