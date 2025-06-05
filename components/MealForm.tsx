'use client';

/**
 * form for sending meal info and getting calories.
 * adds each successful lookup to the history
 * and passes the result back.
 */

import React, { FormEvent, useState } from 'react';
import { z } from 'zod';
import { getCalories } from '@/lib/api';
import { useMealStore } from '@/stores/mealStore';
import { MealResponse } from '@/types/meal';
import { Input } from './ui/input';
import { Button } from './ui/button';
import Toast from './Toast';

interface MealFormProps {
  onResult: (result: MealResponse) => void;
}

export default function MealForm({ onResult }: MealFormProps) {
  const addMeal = useMealStore((s) => s.addMeal);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const schema = z.object({
    dish_name: z.string().min(1, 'Dish name is required'),
    servings: z.coerce.number().int().positive('Servings must be at least 1'),
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // get the input values from the form
    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries());
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    const data = parsed.data;
    setLoading(true);
    setError('');
    try {
      // request calories from backend
      const res = await getCalories(data);
      // put it in history and tell parent
      addMeal(res);
      onResult(res);
      setToast({ message: 'Calories fetched successfully', type: 'success' });
    } catch (err: unknown) {
      // show a user friendly error if the request fails
      const message = err instanceof Error ? err.message : 'Error fetching calories';
      setError(message);
      setToast({ message, type: 'error' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm w-full">
        <Input required name="dish_name" placeholder="Dish Name" />
        <Input required type="number" min="1" name="servings" placeholder="Servings" />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white rounded p-2"
        >
          {loading ? 'Loading...' : 'Get Calories'}
        </Button>
      </form>
    </>
  );
}
