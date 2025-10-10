import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../../components/header/Header';
import { MemoryRouter } from 'react-router';

describe('Header component tests', () => {
  it('Components should be in the document', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Header role='header' />
      </MemoryRouter>
    );

    const header = getByRole('header');
    const h1 = getByRole('heading', { level: 1 });

    expect(header).toBeInTheDocument();
    expect(h1).toBeInTheDocument();
  });

  it('Side bar component and it`s elements should be hidden initially', () => {
    const { queryByRole, getByRole } = render(
      <MemoryRouter>
        <Header role='header' />
      </MemoryRouter>
    );

    const nav = getByRole('complementary', { hidden: true });
    const h2 = queryByRole('heading', { level: 2 });
    const expandBtn = getByRole('expand-button');

    expect(nav).toBeInTheDocument();
    expect(h2).not.toBeInTheDocument();
    expect(expandBtn).toBeInTheDocument();
  });

  it('After hamburger button is clicked side bar should expand', async () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Header role='header' />
      </MemoryRouter>
    );

    const expandBtn = getByRole('expand-button');
    const nav = getByRole('complementary', { hidden: true });

    await fireEvent.click(expandBtn);

    expect(nav).toHaveAttribute('aria-hidden', 'false');
    expect(nav).toBeVisible();
  });
});
