import { render, screen } from '@testing-library/react';
import { SiteHeader } from '@/components/site-header';

describe('SiteHeader', () => {
  it('renders navigation links', () => {
    render(<SiteHeader />);

    expect(screen.getByText('로컬 준비')).toBeInTheDocument();
    expect(screen.getByText('모델')).toBeInTheDocument();
    expect(screen.getByText('서비스')).toBeInTheDocument();
  });
});
