import { create } from 'zustand';
import { MealResponse } from '@/types/meal';

/**
 * simple zustand store that tracks previous calorie lookups.
 */

interface MealState {
  history: MealResponse[];
  addMeal: (meal: MealResponse) => void;
}

export const useMealStore = create<MealState>((set) => ({
  history: [],
  // put new meal at the front of the history array
  addMeal: (meal) => set((state) => ({ history: [meal, ...state.history] })),
}));
