import { render } from '@testing-library/react';

import PagesRegister from './pages-register';

describe('PagesRegister', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PagesRegister />);
    expect(baseElement).toBeTruthy();
  });
});
