import { vi, describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../../components/header/Header';
import { MemoryRouter } from 'react-router';
import { ThemeContext } from '../../components/App';

describe('Header component tests', () => {
  it('Components should be in the document', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const header = getByRole('heading');
    const h1 = getByRole('heading', { level: 1 });

    expect(header).toBeInTheDocument();
    expect(h1).toBeInTheDocument();
  });

  it('Side bar component and it`s elements should be hidden initially', () => {
    const { queryByRole, getByRole } = render(
      <MemoryRouter>
        <Header />
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
        <Header />
      </MemoryRouter>
    );

    const expandBtn = getByRole('expand-button');
    const nav = getByRole('complementary', { hidden: true });

    await fireEvent.click(expandBtn);

    expect(nav).toHaveAttribute('aria-hidden', 'false');
    expect(nav).toBeVisible();
  });
});

describe('Header tests for md < components', () => {
  it('Desktop comp buttons should be in the document', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(getByTestId('theme-button')).toBeInTheDocument();
    expect(getByTestId('browse-button')).toBeInTheDocument();
    expect(getByTestId('favorites-button')).toBeInTheDocument();
    expect(getByTestId('auth-button')).toBeInTheDocument();
  });

  it('Web page should have light theme initially', async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(getByTestId('browse-button')).toHaveClass('text-white');
    expect(getByTestId('auth-button')).toHaveClass('text-white');
  });

  it('Theme button should change element text color', async () => {
    const themeToggle = vi.fn();
    const toggleBg = vi.fn();
    const toggleText = vi.fn();

    const { getByTestId } = render(
      <ThemeContext
        value={{
          dark: false,
          toggleDark: themeToggle,
          themeBg: toggleBg,
          themeText: toggleText,
        }}
      >
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </ThemeContext>
    );

    const themeBtn = getByTestId('theme-button');

    await fireEvent.click(themeBtn);

    // check that toggleDark was called
    expect(themeToggle).toHaveBeenCalled();
  });
});
