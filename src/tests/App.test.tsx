import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../components/App';
import { MemoryRouter } from 'react-router';

describe('App component', () => {
  it('header component should be in the doc', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('header')).toBeInTheDocument();
  });
});
