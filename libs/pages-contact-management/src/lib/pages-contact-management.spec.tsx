import { render } from '@testing-library/react';

import PagesContactManagement from './pages-contact-management';

describe('PagesContactManagement', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PagesContactManagement />);
    expect(baseElement).toBeTruthy();
  });
});
