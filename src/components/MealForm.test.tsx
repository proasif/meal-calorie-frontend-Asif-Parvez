import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import MealForm from '../../components/MealForm';
vi.mock('../../lib/api', () => ({
  getCalories: vi.fn(() => Promise.resolve({
    dish_name: 'Pizza',
    servings: 2,
    calories_per_serving: 300,
    total_calories: 600,
    source: 'test'
  }))
}))

describe('MealForm', () => {
  it('calls onResult with meal data', async () => {
    const user = userEvent.setup();
    const handleResult = vi.fn();
    render(<MealForm onResult={handleResult} />);

    const nameInput = screen.getByPlaceholderText('Dish Name');
    const caloriesInput = screen.getByPlaceholderText('Servings');

    await user.type(nameInput, 'Pizza');
    await user.type(caloriesInput, '300');

    await user.click(screen.getByRole('button', { name: /get calories/i }));

    expect(handleResult).toHaveBeenCalled();
  });
});
