import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Dashboard from '@/app/dashboard/page';

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>{children}</a>
  )
}));
vi.mock('@/lib/auth', () => ({
  useAuthGuard: () => {}
}));
vi.mock('@/stores/authStore', () => ({
  useAuthStore: (selector: (state: { user: { first_name: string } }) => unknown) =>
    selector({ user: { first_name: 'Jane' } })
}));

describe('Dashboard', () => {
  it('shows user greeting and CTA link', () => {
    render(<Dashboard />);
    expect(screen.getByText(/Welcome Jane/)).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /check your food calories now/i })
    ).toBeInTheDocument();
  });
});
