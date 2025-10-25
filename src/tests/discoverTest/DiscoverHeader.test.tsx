import DiscoverHeader from '../../components/main/discoverPage/DiscoverHeader';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';

describe('discover header should be in doc', () => {
  it('all comps should be visible', () => {
    const { getByRole } = render(
      <DiscoverHeader headerText='Browse & Search' pText='' />
    );

    expect(getByRole('heading')).toBeInTheDocument();
    expect(getByRole('img')).toBeInTheDocument();
    expect(getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(getByRole('heading', { level: 2 }).textContent).toMatch(
      /Browse & Search/
    );
  });
});
