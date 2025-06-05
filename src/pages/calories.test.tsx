import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CaloriesPage from '@/app/calories/page';
import { MealResponse } from '@/types/meal';

const mockResult = {
  dish_name: 'Pizza',
  servings: 1,
  calories_per_serving: 300,
  total_calories: 300,
  source: 'test'
};

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>{children}</a>
  )
}));
vi.mock('@/lib/auth', () => ({
  useAuthGuard: () => {}
}));
vi.mock('@/components/MealForm', () => ({
  __esModule: true,
  default: ({ onResult }: { onResult: (r: MealResponse) => void }) => (
    <button onClick={() => onResult(mockResult)}>form</button>
  )
}));
vi.mock('@/components/ResultCard', () => ({
  __esModule: true,
  default: ({ result }: { result: MealResponse }) => (
    <div>result {result.dish_name}</div>
  )
}));

describe('CaloriesPage', () => {
  it('shows result after form action', () => {
    render(<CaloriesPage />);
    const btn = screen.getByText('form');
    fireEvent.click(btn);
    expect(screen.getByText(/result Pizza/)).toBeInTheDocument();
  });

  it('has back link to dashboard', () => {
    render(<CaloriesPage />);
    const link = screen.getByRole('link', { name: /go back to dashboard/i });
    expect(link).toHaveAttribute('href', '/dashboard');
  });
});
