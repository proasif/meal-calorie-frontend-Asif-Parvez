"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/button";

// home page sends you away if you're logged in
export default function Home() {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);

  // choose destination after the auth store has hydrated
  // Redirect authenticated users straight to the calories page
  useEffect(() => {
    if (token) {
      router.replace("/calories");
    }
  }, [token, router]);

  if (token) {
    return (
      <div className="flex items-center justify-center min-h-screen">Loading...</div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-gradient-to-br from-indigo-100 via-sky-100 to-blue-100 dark:from-stone-200 dark:via-stone-500 dark:to-stone-800">
    <h1 className="text-3xl font-semibold text-center animate-fade">Welcome to the MCal</h1>
    <p className="text-lg animate-fade">Your one stop calories calculator</p>
      <div className="flex gap-4 animate-fade">
        <Link href="/login">
          <Button className="shadow-md bg-blue-500">Login</Button>
        </Link>
        <Link href="/register">
          <Button variant="outline" className="shadow-md">Register</Button>
        </Link>
      </div>
    </div>
  );
}
