import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RegisterPage from '@/app/register/page';

vi.mock('@/components/AuthForm', () => ({
  __esModule: true,
  default: ({ mode }: { mode: string }) => <div>AUTH {mode}</div>
}));

describe('RegisterPage', () => {
  it('renders registration form and back button', () => {
    render(<RegisterPage />);
    expect(screen.getByText('AUTH register')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();
  });

  it('back button links to home', () => {
    render(<RegisterPage />);
    const link = screen.getByRole('link', { name: /back/i });
    expect(link).toHaveAttribute('href', '/');
  });

});
