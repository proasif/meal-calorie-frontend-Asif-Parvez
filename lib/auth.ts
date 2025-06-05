import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';

/**
 * redirects the user to the login page if no auth token is present.
 * meant for client components that need authentication.
 */

export function useAuthGuard() {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const hasHydrated = useAuthStore.persist?.hasHydrated?.() ?? true;

  useEffect(() => {
    if (!hasHydrated) return;
    // redirect to login when there's no token
    if (!token) router.push('/login');
  }, [token, router, hasHydrated]);
}
