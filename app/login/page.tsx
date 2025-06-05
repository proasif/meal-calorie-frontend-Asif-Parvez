import AuthForm from '@/components/AuthForm';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FaChevronLeft } from 'react-icons/fa';

// this login page just shows the AuthForm in "login" mode

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-indigo-100 via-pink-100 to-blue-100 dark:from-stone-200 dark:via-stone-500 dark:to-stone-800">
    <div className="relative bg-white/80 dark:bg-gray-400/80 p-8 rounded-lg shadow-xl backdrop-blur animate-fade">
        <Link
          href="/"
          aria-label="Back"
          title="Back"
          className="absolute top-0 left-0"
        >
          <Button size="sm" aria-label="Back" title="Back">
            <FaChevronLeft />
          </Button>
        </Link>
        <AuthForm mode="login" />
      </div>
    </div>
  );
}
