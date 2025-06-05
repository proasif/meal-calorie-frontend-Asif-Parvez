import Link from 'next/link'

// generic 404 page

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4">
      <h1 className="text-2xl font-semibold">Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link href="/" className="text-blue-600 underline">
        Return Home
      </Link>
    </div>
  )
}
