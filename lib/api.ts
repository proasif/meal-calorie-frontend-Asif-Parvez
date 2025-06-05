import { MealRequest, MealResponse } from '@/types/meal';
import { AuthResponse } from '@/types/user';

// helper functions for talking to the backend

// base url loaded from env
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// generic request wrapper used everywhere
async function request<T>(url: string, options: RequestInit) {
  const res = await fetch(`${BASE_URL}${url}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  // turn non-2xx responses into Errors
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return (await res.json()) as T;
}

export function register(data: Record<string, unknown>) {
  // POST /register to create an account
  return request<AuthResponse>('/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function login(data: Record<string, unknown>) {
  // POST /login to get a token
  return request<AuthResponse>('/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function getCalories(data: MealRequest) {
  // POST /get-calories to fetch calorie info
  return request<MealResponse>('/get-calories', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
