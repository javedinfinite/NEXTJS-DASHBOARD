'use client';

import { useEffect } from 'react';

import { lusitana } from '@/app/ui/fonts';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const isDatabaseError = error.message.includes('database');

  return (
    <main className="flex min-h-[60vh] items-center justify-center p-6">
      <div className="max-w-xl rounded-xl border border-red-200 bg-red-50 p-6 shadow-sm">
        <h1 className={`${lusitana.className} text-2xl text-red-900`}>
          Dashboard failed to load
        </h1>
        <p className="mt-3 text-sm leading-6 text-red-800">
          {isDatabaseError
            ? 'The app could not reach Postgres. Check that POSTGRES_URL points to a running database and then retry.'
            : 'An unexpected error occurred while loading the dashboard.'}
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-md bg-red-900 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800"
        >
          Try again
        </button>
      </div>
    </main>
  );
}