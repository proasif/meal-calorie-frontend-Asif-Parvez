"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import ThemeToggle from "./theme-toggle";
import { Button } from "./ui/button";

export default function Header() {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const logout = useAuthStore((s) => s.logout);

  function handleLogout() {
    // navigate home first, then clear auth state so the guard doesn't redirect you
    router.push("/");
    setTimeout(() => logout(), 0);
  }

  return (
    <div className="p-4 flex justify-between items-center">
      <ThemeToggle />
      {token && (
        <Button
          onClick={handleLogout}
          className="bg-red-500 text-white shadow-md hover:bg-red-600"
        >
          Logout
        </Button>
      )}
    </div>
  );
}
