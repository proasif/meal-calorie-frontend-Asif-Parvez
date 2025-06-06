import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Home from '@/app/page';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: vi.fn(), push: vi.fn() })
}));
vi.mock('next/link', () => ({
  __esModule: true,
  // pass through all props for accessibility tests
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>{children}</a>
  )
}));
vi.mock('@/stores/authStore', () => ({
  useAuthStore: (selector: (state: { token: string | null }) => unknown) =>
    selector({ token: null })
}));

describe('Home page', () => {
  it('shows login and register buttons', () => {
    render(<Home />);
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });
});
