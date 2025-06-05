import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LoginPage from '@/app/login/page';

vi.mock('@/components/AuthForm', () => ({
  __esModule: true,
  default: ({ mode }: { mode: string }) => <div>AUTH {mode}</div>
}));

describe('LoginPage', () => {
  it('renders login form and back button', () => {
    render(<LoginPage />);
    expect(screen.getByText('AUTH login')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();
  });

  it('back button links to home', () => {
    render(<LoginPage />);
    const link = screen.getByRole('link', { name: /back/i });
    expect(link).toHaveAttribute('href', '/');
  });

});
