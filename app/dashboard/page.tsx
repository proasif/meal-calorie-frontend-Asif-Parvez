'use client';
import { useAuthGuard } from '@/lib/auth';
import { useAuthStore } from '@/stores/authStore';
import Link from 'next/link';

// Protected dashboard after logging in

export default function Dashboard() {
  // redirect to login if not authenticated
  useAuthGuard();
  const user = useAuthStore((s) => s.user);

  return (
    <div className="flex flex-col items-center p-4 gap-6 min-h-screen bg-gradient-to-br from-indigo-100 via-sky-100 to-blue-100 dark:from-stone-200 dark:via-stone-500 dark:to-stone-800">
      <h1 className="text-2xl font-semibold animate-fade">Welcome {user?.first_name}</h1>
      <div className="bg-white/80 dark:bg-gray-400/80 p-4 rounded-lg shadow-lg backdrop-blur w-full max-w-md animate-fade">
        <h2 className="font-semibold mb-2">Community Feed</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>John just logged 350 calories for Salad</li>
          <li>Mike discovered his pizza has 700 calories</li>
          <li>Lisa checked 500 calories for a ice-cream bowl</li>
        </ul>
        <Link
          href="/calories"
          className="mt-4 block mx-auto bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 text-center"
        >
          Check your food calories now
        </Link>
      </div>
    </div>
  );
}
