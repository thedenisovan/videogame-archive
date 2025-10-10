import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../components/App';

describe('App component', () => {
  it('header component should be in the document', () => {
    render(<App />);
    expect(screen.getByRole('header')).toBeInTheDocument();
  });
});
