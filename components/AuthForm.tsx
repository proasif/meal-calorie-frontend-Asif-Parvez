'use client';

/**
 * handles user authentication for both login and registration.
 * Submits form data to the right endpoint and stores
 * the auth token in the zustand store.
 */

import React, { FormEvent, useState } from 'react';
import { z } from 'zod'
import { login, register } from '@/lib/api';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'next/navigation';
import { Input } from './ui/input'
import { Button } from './ui/button'

interface AuthFormProps {
  mode: 'login' | 'register';
}

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const registerSchema = z.object({
    first_name: z.string().min(1, 'First name is required'),
    last_name: z.string().min(1, 'Last name is required'),
    email: z.string().email(),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  });

  const loginSchema = registerSchema.pick({ email: true, password: true });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // grab values from the form
    const form = e.currentTarget;
    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());
    const schema = mode === 'login' ? loginSchema : registerSchema;
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    const data = parsed.data;
    setLoading(true);
    setError('');
    try {
      // call the correct endpoint based on mode
      const res = mode === 'login' ? await login(data) : await register(data);
      setAuth(res);
      // once authenticated, go to the dashboard page
      router.push('/dashboard');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
      {mode === 'register' && (
        <>
          <Input required name="first_name" placeholder="First Name" />
          <Input required name="last_name" placeholder="Last Name" />
        </>
      )}
      <Input required type="email" name="email" placeholder="Email" />
      <Input required type="password" name="password" placeholder="Password" />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white rounded p-2"
      >
        {loading ? 'Loading...' : mode === 'login' ? 'Login' : 'Register'}
      </Button>
    </form>
  );
}
