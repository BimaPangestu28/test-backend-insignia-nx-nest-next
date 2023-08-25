import { render } from '@testing-library/react';

import PagesContactGroupManagement from './pages-contact-group-management';

describe('PagesContactGroupManagement', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PagesContactGroupManagement />);
    expect(baseElement).toBeTruthy();
  });
});
