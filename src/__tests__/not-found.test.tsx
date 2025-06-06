import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NotFound from '@/app/not-found';

describe('NotFound', () => {
  it('renders message', () => {
    render(<NotFound />);
    expect(screen.getByText(/Page Not Found/)).toBeInTheDocument();
  });
});
