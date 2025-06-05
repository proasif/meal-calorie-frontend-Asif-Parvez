'use client';
import { useState } from 'react';
import MealForm from '@/components/MealForm';
import ResultCard from '@/components/ResultCard';
import Link from 'next/link';
import { FaChevronLeft } from 'react-icons/fa';
import { MealResponse } from '@/types/meal';
import { useAuthGuard } from '@/lib/auth';

// page for entering a dish and showing calories

export default function CaloriesPage() {
  // make sure only logged-in users get here
  useAuthGuard();
  // holds the latest lookup result
  const [result, setResult] = useState<MealResponse | null>(null);

  return (
    <div className="flex flex-col items-center p-4 gap-6 min-h-screen bg-gradient-to-br from-indigo-100 via-sky-100 to-blue-100 dark:from-stone-200 dark:via-stone-500 dark:to-stone-800">
      <h1 className="text-2xl font-semibold animate-fade">What would you have today?</h1>
    <div className="relative bg-white/80 dark:bg-gray-400/80 p-8 rounded-lg shadow-xl backdrop-blur animate-fade">
      <Link
        href="/dashboard"
        className="absolute top-2 left-2 text-grey-100"
        aria-label="Go back to dashboard"
        title="Go back to dashboard"
      >
        <FaChevronLeft />
      </Link>
        <MealForm onResult={setResult} />
      </div>
      {result && (
        <div className="animate-fade">
          <ResultCard result={result} />
        </div>
      )}
    </div>
  );
}
