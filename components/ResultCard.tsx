import { MealResponse } from '@/types/meal';

/** Displays the calorie results returned from the API in a simple card. */

interface Props {
  result: MealResponse;
}

export default function ResultCard({ result }: Props) {
  return (
    <div
      className="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-4 rounded shadow max-w-md w-full"
    >
      <h2 className="font-semibold mb-2">{result.dish_name}</h2>
      <p>Servings: {result.servings}</p>
      <p>Calories per serving: {result.calories_per_serving}</p>
      <p>Total calories: {result.total_calories}</p>
      <p className="text-xs text-gray-500">Source: {result.source}</p>
    </div>
  );
}
