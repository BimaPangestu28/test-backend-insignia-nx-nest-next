import { render } from '@testing-library/react';

import PagesLogin from './pages-login';

describe('PagesLogin', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PagesLogin />);
    expect(baseElement).toBeTruthy();
  });
});
