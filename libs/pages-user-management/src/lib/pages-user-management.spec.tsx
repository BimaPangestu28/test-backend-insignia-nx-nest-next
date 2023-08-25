import { render } from '@testing-library/react';

import PagesUserManagement from './pages-user-management';

describe('PagesUserManagement', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PagesUserManagement />);
    expect(baseElement).toBeTruthy();
  });
});
