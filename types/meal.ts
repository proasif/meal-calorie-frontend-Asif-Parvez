/** Request payload for the calorie lookup endpoint */
export interface MealRequest {
  dish_name: string;
  servings: number;
}

/** Response structure returned by the calorie lookup endpoint */
export interface MealResponse extends MealRequest {
  calories_per_serving: number;
  total_calories: number;
  source: string;
}
